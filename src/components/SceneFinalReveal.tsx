import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { siteContent } from '../content';
import { DoodleHeart, DoodleFlower } from './DoodleDecorations';

interface SceneFinalRevealProps {
  onNext: () => void;
}

export const SceneFinalReveal: React.FC<SceneFinalRevealProps> = ({ onNext }) => {
  const revealData = siteContent.finalReveal;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative select-none">
      {/* Decorative Doodles */}
      <div className="absolute top-12 left-8 opacity-40 pointer-events-none">
        <DoodleFlower className="w-8 h-8 text-scrapbook-pink-300" />
      </div>
      <div className="absolute bottom-14 right-8 opacity-40 pointer-events-none">
        <DoodleHeart className="w-7 h-7 text-scrapbook-pink-400" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-sm sm:max-w-md bg-[#fffdfa] rounded-3xl p-6 sm:p-8 border-2 border-scrapbook-pink-200 shadow-letter relative text-center"
      >
        {/* Surprise Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs shadow-2xs">
            <Sparkles size={11} />
            <span>{revealData.badge}</span>
            <Sparkles size={11} />
          </span>
        </div>

        {/* Intro Prefix */}
        <p className="font-cute text-sm sm:text-base text-scrapbook-brown-light mb-4">
          {revealData.prefix}
        </p>

        {/* The Crucial Highlight Clue */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="my-5 p-5 sm:p-6 rounded-2xl bg-[#fff2f5] border-2 border-dashed border-scrapbook-pink-300 shadow-soft"
        >
          <h2 className="font-cute text-xl sm:text-2xl text-scrapbook-pink-600 font-bold leading-normal sm:leading-relaxed tracking-wide">
            {revealData.cakeClue}
          </h2>
        </motion.div>

        {/* Suffix Note */}
        <p className="font-cute text-xs sm:text-sm text-scrapbook-brown-light italic mb-6">
          {revealData.suffix}
        </p>

        {/* Final Button */}
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
    </div>
  );
};
