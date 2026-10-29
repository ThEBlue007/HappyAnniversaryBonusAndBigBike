import React from 'react';
import { motion } from 'framer-motion';

interface RealisticOrchidProps {
  className?: string;
  isBlooming?: boolean;
}

export const RealisticOrchid: React.FC<RealisticOrchidProps> = ({
  className = 'w-48 h-48 sm:w-56 sm:h-56',
  isBlooming = true,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, rotate: -6 }}
      animate={
        isBlooming
          ? { scale: [0.6, 1.05, 1], opacity: 1, rotate: [ -6, 2, 0 ] }
          : { scale: 0.6, opacity: 0 }
      }
      transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Soft Ambient Floral Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-200/40 via-rose-100/30 to-amber-100/20 blur-xl pointer-events-none" />

      {/* Floating Sparkles around Orchid */}
      <motion.div
        animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1 -right-1 text-amber-300 text-sm pointer-events-none"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-8 -left-2 text-pink-300 text-xs pointer-events-none"
      >
        ✧
      </motion.div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], y: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-1 right-4 text-pink-400 text-xs pointer-events-none"
      >
        ✦
      </motion.div>

      {/* Exquisite Realistic Botanical Orchid SVG */}
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(226,72,111,0.22)]"
      >
        <defs>
          {/* Stem gradient */}
          <linearGradient id="orchidStemGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="50%" stopColor="#4d7c0f" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>

          {/* Bud gradient */}
          <linearGradient id="orchidBudGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fdf2f8" />
            <stop offset="60%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>

          {/* Dorsal Sepal (Top) Gradient */}
          <radialGradient id="topSepalGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#fff1f5" />
            <stop offset="85%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#f472b6" />
          </radialGradient>

          {/* Lateral Petals (Large Left & Right Wings) Gradient */}
          <radialGradient id="largePetalGrad" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#fff5f8" />
            <stop offset="80%" stopColor="#fce7f3" />
            <stop offset="95%" stopColor="#f9a8d4" />
            <stop offset="100%" stopColor="#ec4899" />
          </radialGradient>

          {/* Lower Sepals Gradient */}
          <radialGradient id="lowerSepalGrad" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fdf2f8" />
            <stop offset="90%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#f472b6" />
          </radialGradient>

          {/* Labellum (Lip) Center Magenta Gradient */}
          <radialGradient id="lipGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="40%" stopColor="#e11d48" />
            <stop offset="80%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#881337" />
          </radialGradient>

          {/* Golden Throat Gradient */}
          <radialGradient id="throatYellowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#fde047" />
            <stop offset="80%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>

          {/* Column Ivory Gradient */}
          <linearGradient id="columnGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#fff1f5" />
            <stop offset="100%" stopColor="#fbcfe8" />
          </linearGradient>

          {/* Soft Filter for Delicate Shadows */}
          <filter id="petalShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#831843" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* 1. Graceful Arching Stem in the background */}
        <path
          d="M 60 290 Q 110 240 145 195 T 195 90 T 240 40"
          stroke="url(#orchidStemGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Small unopened orchid buds on the upper stem */}
        {/* Bud 1 */}
        <g transform="translate(230, 42) rotate(-25)">
          <path
            d="M 0 0 C 4 -8, 14 -8, 18 0 C 14 10, 4 10, 0 0 Z"
            fill="url(#orchidBudGrad)"
            stroke="#4d7c0f"
            strokeWidth="0.8"
          />
          <path d="M 0 0 Q -4 4 -6 10" stroke="url(#orchidStemGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
        {/* Bud 2 */}
        <g transform="translate(195, 92) rotate(15)">
          <path
            d="M 0 0 C 6 -11, 20 -11, 24 0 C 18 12, 6 12, 0 0 Z"
            fill="url(#orchidBudGrad)"
            stroke="#4d7c0f"
            strokeWidth="0.8"
          />
          <path d="M 0 0 Q -3 5 -5 12" stroke="url(#orchidStemGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>

        {/* ── Main Bloom (Phalaenopsis Orchid) ── */}
        <g transform="translate(160, 180)">

          {/* 2. LOWER LATERAL SEPALS (Left & Right Bottom Background) */}
          {/* Lower Left Sepal */}
          <path
            d="M 0 5 
               C -35 25, -60 55, -68 88 
               C -72 105, -55 118, -35 110 
               C -15 102, -5 65, 0 10 Z"
            fill="url(#lowerSepalGrad)"
            filter="url(#petalShadow)"
            opacity="0.96"
          />
          {/* Lower Left Sepal Veins */}
          <path d="M -5 15 Q -40 60 -50 95" stroke="#f472b6" strokeWidth="0.6" strokeDasharray="2,3" opacity="0.35" fill="none" />

          {/* Lower Right Sepal */}
          <path
            d="M 0 5 
               C 35 25, 60 55, 68 88 
               C 72 105, 55 118, 35 110 
               C 15 102, 5 65, 0 10 Z"
            fill="url(#lowerSepalGrad)"
            filter="url(#petalShadow)"
            opacity="0.96"
          />
          {/* Lower Right Sepal Veins */}
          <path d="M 5 15 Q 40 60 50 95" stroke="#f472b6" strokeWidth="0.6" strokeDasharray="2,3" opacity="0.35" fill="none" />

          {/* 3. DORSAL SEPAL (Top Center Background) */}
          <path
            d="M -12 -5 
               C -32 -35, -35 -75, -20 -105 
               C -10 -125, 10 -125, 20 -105 
               C 35 -75, 32 -35, 12 -5 Z"
            fill="url(#topSepalGrad)"
            filter="url(#petalShadow)"
          />
          {/* Top Sepal Delicate Center Vein */}
          <path d="M 0 -15 Q 0 -65 0 -110" stroke="#f472b6" strokeWidth="0.8" opacity="0.4" fill="none" />

          {/* 4. LARGE LATERAL PETALS (The iconic wide round wings of Phalaenopsis) */}
          {/* Left Wing Petal */}
          <path
            d="M -8 -8 
               C -40 -35, -85 -45, -112 -25 
               C -135 -8, -135 28, -108 52 
               C -82 72, -42 55, -8 12 Z"
            fill="url(#largePetalGrad)"
            filter="url(#petalShadow)"
          />
          {/* Delicate Veins on Left Petal */}
          <path d="M -15 0 Q -65 5 -105 15" stroke="#ec4899" strokeWidth="0.7" opacity="0.3" fill="none" />
          <path d="M -15 -5 Q -65 -18 -98 -12" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.25" fill="none" />
          <path d="M -12 5 Q -60 30 -85 45" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.25" fill="none" />

          {/* Right Wing Petal */}
          <path
            d="M 8 -8 
               C 40 -35, 85 -45, 112 -25 
               C 135 -8, 135 28, 108 52 
               C 82 72, 42 55, 8 12 Z"
            fill="url(#largePetalGrad)"
            filter="url(#petalShadow)"
          />
          {/* Delicate Veins on Right Petal */}
          <path d="M 15 0 Q 65 5 105 15" stroke="#ec4899" strokeWidth="0.7" opacity="0.3" fill="none" />
          <path d="M 15 -5 Q 65 -18 98 -12" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.25" fill="none" />
          <path d="M 12 5 Q 60 30 85 45" stroke="#ec4899" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.25" fill="none" />

          {/* 5. THE LABELLUM (LIP) — The breathtaking intricate center */}
          {/* Side Lobes of the Lip (Golden Yellow with crimson spots) */}
          {/* Left Side Lobe */}
          <path
            d="M -4 5 C -18 2, -28 10, -26 22 C -24 32, -12 30, -3 20 Z"
            fill="url(#throatYellowGrad)"
            stroke="#be123c"
            strokeWidth="0.8"
          />
          {/* Right Side Lobe */}
          <path
            d="M 4 5 C 18 2, 28 10, 26 22 C 24 32, 12 30, 3 20 Z"
            fill="url(#throatYellowGrad)"
            stroke="#be123c"
            strokeWidth="0.8"
          />

          {/* Tiny crimson dots on yellow side lobes */}
          <circle cx="-16" cy="14" r="1.2" fill="#be123c" />
          <circle cx="-20" cy="18" r="1" fill="#be123c" />
          <circle cx="-13" cy="22" r="0.9" fill="#be123c" />
          <circle cx="16" cy="14" r="1.2" fill="#be123c" />
          <circle cx="20" cy="18" r="1" fill="#be123c" />
          <circle cx="13" cy="22" r="0.9" fill="#be123c" />

          {/* Mid-Lobe (The rich velvety magenta bottom lip) */}
          <path
            d="M 0 16 
               C -12 24, -22 36, -20 52 
               C -18 64, -8 68, 0 74 
               C 8 68, 18 64, 20 52 
               C 22 36, 12 24, 0 16 Z"
            fill="url(#lipGrad)"
            filter="url(#petalShadow)"
          />

          {/* Delicate whisker-like tendrils (Cirri) at the tip of the lip */}
          <path
            d="M -4 72 C -10 78, -16 82, -18 78 C -20 74, -14 70, -6 68"
            stroke="#9f1239"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 4 72 C 10 78, 16 82, 18 78 C 20 74, 14 70, 6 68"
            stroke="#9f1239"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Golden crest highlight on lip */}
          <path
            d="M -5 32 C -2 30, 2 30, 5 32 C 6 38, -6 38, -5 32 Z"
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="0.6"
          />

          {/* Crimson speckles inside the mid-lobe */}
          <circle cx="-6" cy="42" r="1" fill="#4c0519" />
          <circle cx="6" cy="42" r="1" fill="#4c0519" />
          <circle cx="-2" cy="48" r="1.1" fill="#4c0519" />
          <circle cx="2" cy="48" r="1.1" fill="#4c0519" />
          <circle cx="0" cy="55" r="1" fill="#4c0519" />

          {/* 6. THE COLUMN (Gynostegium) — sleek ivory beak at the very center */}
          <path
            d="M -5 -8 
               C -6 -18, -5 -22, 0 -24 
               C 5 -22, 6 -18, 5 -8 
               C 4 0, -4 0, -5 -8 Z"
            fill="url(#columnGrad)"
            stroke="#f472b6"
            strokeWidth="0.6"
          />
          {/* Anther cap tip (pale yellow cap) */}
          <ellipse cx="0" cy="-21" rx="3.5" ry="2.5" fill="#fef9c3" stroke="#eab308" strokeWidth="0.5" />
        </g>
      </svg>
    </motion.div>
  );
};
