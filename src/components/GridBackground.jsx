'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

export function GridBackground({
  variant = 'square',
  size = 25,
  opacity = 0.12,
  className = '',
  children,
  maskType = 'breathing',
  noMask = false,
}) {
  // Memoized square grid style
  const squareGridStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
      backgroundSize: `${size}px ${size}px`,
    }),
    [opacity, size]
  );

  // Memoized hexagon grid style
  const hexagonGridStyle = useMemo(() => {
    const hexColor = `rgba(255,255,255,${opacity})`;
    const hexWidth = size * 1.732;
    const hexHeight = size * 1.5;
    const radius = size * 0.7;

    const getHexagonPoints = (centerX, centerY) => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 2 * Math.PI) / 6 + Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push(`${x},${y}`);
      }
      return points.join(' ');
    };

    return {
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
        <svg width="${hexWidth}" height="${hexHeight}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagon" x="0" y="0" width="${hexWidth}" height="${hexHeight}" patternUnits="userSpaceOnUse">
              <polygon points="${getHexagonPoints(hexWidth / 2, hexHeight / 4)}" 
                       fill="none" 
                       stroke="${hexColor}" 
                       stroke-width="1"/>
              <polygon points="${getHexagonPoints(0, (3 * hexHeight) / 4)}" 
                       fill="none" 
                       stroke="${hexColor}" 
                       stroke-width="1"/>
              <polygon points="${getHexagonPoints(hexWidth, (3 * hexHeight) / 4)}" 
                       fill="none" 
                       stroke="${hexColor}" 
                       stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon)"/>
        </svg>
      `)}")`,
      backgroundSize: `${hexWidth}px ${hexHeight}px`,
    };
  }, [opacity, size]);

  const backgroundStyle = useMemo(
    () => (variant === 'hexagon' ? hexagonGridStyle : squareGridStyle),
    [variant, hexagonGridStyle, squareGridStyle]
  );

  const AnimatedMask = () => {
    if (noMask || maskType !== 'breathing') return null;

    return (
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle,
            transparent 20%,
            rgba(0,0,0,0.3) 40%,
            rgba(0,0,0,0.6) 60%,
            rgba(0,0,0,0.8) 80%)`,
        }}
        animate={{
          backgroundSize: ['150% 150%', '200% 200%', '150% 150%'],
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  };

  const StaticMask = () => {
    if (noMask || maskType !== 'radial') return null;

    return (
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%,
            transparent 20%,
            rgba(0,0,0,0.3) 40%,
            rgba(0,0,0,0.6) 60%,
            rgba(0,0,0,0.8) 80%)`,
        }}
      />
    );
  };

  return (
    <>
      {/* Fixed grid background - behind content, static noise on top of everything */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none ${className}`}
        style={backgroundStyle}
      >
        <AnimatedMask />
        <StaticMask />
      </div>
      {children}
    </>
  );
}

export default GridBackground;

