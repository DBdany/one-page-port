'use client';
import { useState, useEffect } from 'react';

export default function Guestbook({ hideTitle = false }) {
  const [entries, setEntries] = useState([]);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [dbUnavailable, setDbUnavailable] = useState(false);

  // Fetch entries on mount
  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const res = await fetch('/api/guestbook');
      if (!res.ok) {
        setDbUnavailable(true);
        return;
      }
      const data = await res.json();
      if (data.entries) {
        setEntries(data.entries);
      }
    } catch (err) {
      console.error('Failed to fetch entries:', err);
      setDbUnavailable(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to submit');
        return;
      }

      // Add new entry to the top of the list
      setEntries([data.entry, ...entries]);
      setMessage('');
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const wordCount = message.trim() ? message.trim().split(/\s+/).length : 0;
  const wordsRemaining = 15 - wordCount;

  return (
    <div className={`${hideTitle ? '' : 'mt-6'} max-h-64 overflow-y-auto custom-scrollbar`}>
      {!hideTitle && <h3 className="text-base font-semibold font-orbitron mb-3 text-purple-200">Guestbook</h3>}
      
      {/* Submit Form */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Nickname (optional)"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={50}
          className="w-full bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm font-plexmono placeholder:text-white/40 focus:outline-none focus:border-purple-400"
        />
        
        <div className="relative">
          <textarea
            placeholder="Leave a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            required
            className="w-full bg-black/50 border border-white/20 rounded px-3 py-1.5 text-sm font-plexmono placeholder:text-white/40 focus:outline-none focus:border-purple-400 resize-none"
          />
          <span className={`absolute bottom-2 right-2 text-xs ${wordsRemaining < 5 ? 'text-red-400' : 'text-white/40'}`}>
            {wordsRemaining} words
          </span>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !message.trim() || dbUnavailable || wordCount > 15}
          className="w-full py-1.5 text-sm font-orbitron border border-purple-400 rounded hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Posting...' : 'Post'}
        </button>
      </form>

      {/* Entries List */}
      <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
        {loading ? (
          <p className="text-xs text-white/40 font-plexmono">Loading...</p>
        ) : dbUnavailable ? (
          <p className="text-xs text-white/40 font-plexmono">Guestbook is offline ✨</p>
        ) : entries.length === 0 ? (
          <p className="text-xs text-white/40 font-plexmono">No entries yet. Be the first!</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="border-b border-white/10 pb-2">
              <div className="flex items-start gap-2">
                {entry.sticker && <span className="text-lg">{entry.sticker}</span>}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-purple-300 font-orbitron">{entry.nickname || 'Anonymous'}</p>
                  <p className="text-sm font-plexmono text-white/80 break-words">{entry.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

