import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { siteContent } from '../content';
import { DoodleHeart, DoodleFlower, DoodleSparkle } from './DoodleDecorations';

interface SceneFinalScreenProps {
  onRestart: () => void;
}

export const SceneFinalScreen: React.FC<SceneFinalScreenProps> = ({ onRestart }) => {
  const data = siteContent.finalScreen;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-sm sm:max-w-md text-center space-y-5"
      >
        {/* Doodles */}
        <div className="flex justify-center items-center gap-3">
          <DoodleSparkle className="w-5 h-5 text-amber-400" />
          <DoodleHeart className="w-6 h-6 text-scrapbook-pink-400" />
          <DoodleFlower className="w-6 h-6 text-scrapbook-pink-300" />
        </div>

        <div className="space-y-2">
          <h2 className="font-serif italic text-2xl sm:text-3xl text-scrapbook-brown-dark tracking-tight">
            {data.quoteEn}
          </h2>
          <p className="font-cute text-base sm:text-lg text-scrapbook-brown">
            {data.quoteTh}
          </p>
        </div>

        <div className="pt-2">
          <p className="font-hand text-base sm:text-lg text-scrapbook-pink-500">
            {data.madeWithLove}
          </p>
        </div>

        {/* Replay Button */}
        <div className="pt-6">
          <button
            onClick={onRestart}
            className="px-6 py-2.5 rounded-full bg-white/80 hover:bg-white text-scrapbook-brown-dark border border-[#ecd9c6] shadow-2xs hover:shadow-xs font-cute text-xs transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-1.5"
          >
            <RotateCcw size={13} className="text-scrapbook-pink-400" />
            <span>{data.replayButtonText}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
