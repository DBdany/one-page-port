import pool, { initGuestbookTable } from '@/lib/db';
import { headers } from 'next/headers';
import crypto from 'crypto';

// Hash IP for privacy
function hashIP(ip) {
  return crypto.createHash('sha256').update(ip || 'unknown').digest('hex');
}

// GET - Fetch recent guestbook entries
export async function GET() {
  try {
    await initGuestbookTable();
    
    const result = await pool.query(
      'SELECT id, nickname, message, sticker, created_at FROM guestbook ORDER BY created_at DESC LIMIT 50'
    );
    
    return Response.json({ entries: result.rows });
  } catch (error) {
    console.error('Guestbook GET error:', error);
    return Response.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}

// POST - Submit new guestbook entry
export async function POST(request) {
  try {
    await initGuestbookTable();
    
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const ipHash = hashIP(ip);
    
    const body = await request.json();
    const { nickname, message, sticker } = body;
    
    // Validate message
    if (!message || typeof message !== 'string') {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }
    
    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount > 15) {
      return Response.json({ error: 'Message must be 15 words or less' }, { status: 400 });
    }
    
    // Validate nickname
    const cleanNickname = nickname?.slice(0, 50) || 'Anonymous';
    
    // Rate limiting: Check if user has posted 2+ times today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM guestbook WHERE ip_hash = $1 AND created_at >= $2',
      [ipHash, today]
    );
    
    const todayCount = parseInt(countResult.rows[0].count);
    
    if (todayCount >= 2) {
      return Response.json({ 
        error: 'You can only post 2 entries per day. Come back tomorrow!' 
      }, { status: 429 });
    }
    
    // Insert the entry
    const result = await pool.query(
      'INSERT INTO guestbook (nickname, message, sticker, ip_hash) VALUES ($1, $2, $3, $4) RETURNING id, nickname, message, sticker, created_at',
      [cleanNickname, message.trim(), sticker || null, ipHash]
    );
    
    return Response.json({ entry: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Guestbook POST error:', error);
    return Response.json({ error: 'Failed to submit entry' }, { status: 500 });
  }
}

