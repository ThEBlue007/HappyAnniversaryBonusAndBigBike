import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Gift, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../content';
import { DoodleHeart, DoodleFlower, WashiTape } from './DoodleDecorations';
import { RealisticOrchid } from './RealisticOrchid';

interface SceneFinalRevealProps {
  onNext: () => void;
}

export const SceneFinalReveal: React.FC<SceneFinalRevealProps> = ({ onNext }) => {
  const revealData = siteContent.finalReveal;
  const [isOpened, setIsOpened] = useState<boolean>(false);

  // Trigger romantic confetti and unwrap gift
  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Fire floral pink & golden confetti
    try {
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.62 },
        colors: ['#f472b6', '#fbcfe8', '#fda4af', '#fef08a', '#ffffff', '#e11d48'],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.65 },
          colors: ['#f9a8d4', '#f43f5e', '#fef9c3', '#ffffff'],
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.65 },
          colors: ['#f9a8d4', '#f43f5e', '#fef9c3', '#ffffff'],
        });
      }, 250);
    } catch {
      // ignore in environments without canvas
    }
  };

  const handleReset = () => {
    setIsOpened(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-4 relative select-none">
      {/* Background Decorative Doodles */}
      <motion.div
        animate={{ y: [-4, 6, -4], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-6 sm:left-14 opacity-50 pointer-events-none"
      >
        <DoodleFlower className="w-8 h-8 sm:w-10 sm:h-10 text-scrapbook-pink-300" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-12 right-6 sm:right-16 opacity-50 pointer-events-none"
      >
        <DoodleHeart className="w-7 h-7 sm:w-8 sm:h-8 text-scrapbook-pink-400" />
      </motion.div>

      {/* Main Surprise Scrapbook Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="w-full max-w-sm sm:max-w-md bg-[#fffdfa] rounded-3xl p-5 sm:p-7 border-2 border-[#ede0d2] shadow-envelope relative text-center max-h-[88vh] overflow-y-auto"
      >
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
          <WashiTape color="pink" rotation={-1} className="w-28 sm:w-32" />
        </div>

        {/* Surprise Badge */}
        <div className="pt-1 mb-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-600 font-cute text-xs shadow-2xs">
            <Sparkles size={11} className="text-scrapbook-pink-400" />
            <span>{revealData.badge}</span>
            <Sparkles size={11} className="text-scrapbook-pink-400" />
          </span>
        </div>

        {/* Intro Prefix */}
        <p className="font-cute text-xs sm:text-sm text-scrapbook-brown-light mb-3">
          {revealData.prefix}
        </p>

        {/* ═══════════════════════════════════════════════════════════════════
            INTERACTIVE KRAFT GIFT PARCEL / REALISTIC ORCHID REVEAL
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="my-2 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[240px]">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              /* ── STATE 1: Brown Kraft Paper Gift Box (ก่อนแกะ) ── */
              <motion.div
                key="kraft-box"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.82, rotate: -4 }}
                transition={{ duration: 0.4 }}
                onClick={handleOpenGift}
                className="cursor-pointer group flex flex-col items-center py-2"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleOpenGift();
                }}
              >
                {/* 3D Kraft Parcel Box */}
                <motion.div
                  whileHover={{ scale: 1.04, rotate: 1 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative w-56 h-44 sm:w-64 sm:h-48 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden border border-[#9b7653] transition-all"
                  style={{
                    // Authentic Kraft paper texture with gradient folds
                    background:
                      'radial-gradient(ellipse at 35% 25%, #d8baa0 0%, #c49e79 45%, #b28a64 85%, #9e7651 100%)',
                    boxShadow:
                      '0 12px 25px -4px rgba(107, 76, 50, 0.35), 0 4px 10px -2px rgba(107, 76, 50, 0.2)',
                  }}
                >
                  {/* Subtle Kraft Paper Grain and Creases */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(#3a2514 0.75px, transparent 0.75px), radial-gradient(#3a2514 0.75px, transparent 0.75px)',
                      backgroundSize: '16px 16px',
                      backgroundPosition: '0 0, 8px 8px',
                    }}
                  />

                  {/* Horizontal Kraft Paper Crease / Seam */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#845e3c]/40 border-b border-[#ffd7b2]/30 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#845e3c]/40 border-r border-[#ffd7b2]/30 pointer-events-none" />

                  {/* Hemp Twine Cord Ribbon (เชือกป่านผูกกล่อง) */}
                  {/* Vertical Twine */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 bg-[#ecd6be] shadow-[0_1px_4px_rgba(0,0,0,0.3)] border-l border-r border-[#967657]/70" />
                  {/* Horizontal Twine */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 bg-[#ecd6be] shadow-[0_1px_4px_rgba(0,0,0,0.3)] border-t border-b border-[#967657]/70" />

                  {/* Twine Bow Knot in the Center */}
                  <div className="relative z-10 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f5e6d3] border-2 border-[#b89574] shadow-md flex items-center justify-center text-scrapbook-pink-500"
                    >
                      <Gift size={20} className="text-scrapbook-pink-500 animate-pulse" />
                    </motion.div>
                  </div>

                  {/* Rustic Kraft Gift Tag (ป้ายห้อยของขวัญ) */}
                  <motion.div
                    animate={{ rotate: [-3, 3, -3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-3 right-3 z-15 bg-[#fbf5ed] border border-[#c2a488] rounded-md px-2.5 py-1 shadow-md transform origin-top-left -rotate-6"
                  >
                    <div className="flex items-center gap-1 font-cute text-[10px] sm:text-[11px] text-[#6b4c32] font-semibold">
                      <span>For You ♡</span>
                      <span>🏷️</span>
                    </div>
                  </motion.div>

                  {/* Stamp mark on Kraft paper */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded border border-[#8f6a49]/50 text-[#8f6a49] font-cute text-[9px] -rotate-12 opacity-80 pointer-events-none">
                    SPECIAL ✦
                  </div>
                </motion.div>

                {/* Tap to Open Prompt */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="mt-3.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-scrapbook-pink-100 hover:bg-scrapbook-pink-200 text-scrapbook-pink-600 font-cute text-xs font-semibold shadow-2xs transition-all group-hover:scale-105"
                >
                  <Sparkles size={13} className="text-scrapbook-pink-500 animate-spin-slow" />
                  <span>แตะเพื่อแกะของขวัญนะคะ 🎁</span>
                </motion.div>
              </motion.div>
            ) : (
              /* ── STATE 2: Unwrapped! Realistic Pink & White Orchid Blooms ── */
              <motion.div
                key="bloomed-orchid"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex flex-col items-center py-1 w-full"
              >
                {/* The Exquisite Realistic Pink & White Orchid */}
                <RealisticOrchid
                  isBlooming={true}
                  className="w-44 h-44 sm:w-52 sm:h-52 my-1"
                />

                {/* Orchid Caption Label */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-50 via-white to-pink-50 border border-pink-200 shadow-2xs mt-1 mb-2"
                >
                  <span className="font-hand text-sm sm:text-base text-scrapbook-pink-600 font-bold">
                    ดอกกล้วยไม้แทนใจ เพื่อรอยยิ้มของอ้วน 🌸🤍
                  </span>
                </motion.div>

                {/* Re-wrap Gift Button (Small icon button to replay) */}
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 font-cute text-[11px] text-scrapbook-brown-light/70 hover:text-scrapbook-pink-500 transition-colors pt-0.5"
                  title="ห่อของขวัญใหม่อีกรอบ"
                >
                  <RotateCcw size={11} />
                  <span>ห่อของขวัญอีกรอบ ↺</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            REVEAL CLUE: Highlight box for car drawer (always visible or revealed)
        ═══════════════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
            >
              {/* The Crucial Highlight Clue */}
              <div className="my-3 p-4 sm:p-5 rounded-2xl bg-[#fff2f5] border-2 border-dashed border-scrapbook-pink-300 shadow-soft">
                <h2 className="font-cute text-lg sm:text-2xl text-scrapbook-pink-600 font-bold leading-normal sm:leading-relaxed tracking-wide">
                  {revealData.cakeClue}
                </h2>
              </div>

              {/* Suffix Note */}
              <p className="font-cute text-xs sm:text-sm text-scrapbook-brown-light italic mb-4">
                {revealData.suffix}
              </p>

              {/* Final Continue Button */}
              <div>
                <button
                  onClick={onNext}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
                >
                  <Heart size={16} fill="white" />
                  <span>{revealData.buttonText}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SceneFinalReveal;
