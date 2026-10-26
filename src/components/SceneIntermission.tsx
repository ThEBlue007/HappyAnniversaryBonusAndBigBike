import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import { siteContent } from '../content';
import { DoodleFlower, DoodleHeart } from './DoodleDecorations';

interface SceneIntermissionProps {
  onNext: () => void;
}

export const SceneIntermission: React.FC<SceneIntermissionProps> = ({ onNext }) => {
  const data = siteContent.intermission;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -15 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm sm:max-w-md bg-[#fffdf9] rounded-3xl p-6 sm:p-8 border-2 border-[#eee3d5] shadow-envelope relative text-center"
      >
        {/* Corner Doodles */}
        <div className="absolute top-3.5 left-4 opacity-50 pointer-events-none">
          <DoodleFlower className="w-6 h-6 text-scrapbook-pink-300" />
        </div>
        <div className="absolute top-3.5 right-4 opacity-40 pointer-events-none">
          <DoodleHeart className="w-5 h-5 text-scrapbook-pink-400" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-40 pointer-events-none">
          <DoodleHeart className="w-5 h-5 text-scrapbook-pink-300" />
        </div>
        <div className="absolute bottom-4 right-4 opacity-50 pointer-events-none">
          <DoodleFlower className="w-6 h-6 text-amber-300" />
        </div>

        {/* Heart Icon */}
        <div className="w-9 h-9 rounded-full bg-scrapbook-pink-50 text-scrapbook-pink-400 mx-auto flex items-center justify-center mb-4 shadow-2xs">
          <Heart size={18} fill="currentColor" />
        </div>

        {/* Content */}
        <div className="space-y-4 my-4">
          <p className="font-cute text-base sm:text-lg text-scrapbook-brown-dark leading-relaxed">
            “{data.quote1}”
          </p>

          <p className="font-cute text-lg sm:text-xl text-scrapbook-pink-500 font-bold leading-relaxed">
            “{data.quote2}”
          </p>
        </div>

        {/* Button */}
        <div className="pt-3">
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
          >
            <Mail size={16} />
            <span>{data.buttonText}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
