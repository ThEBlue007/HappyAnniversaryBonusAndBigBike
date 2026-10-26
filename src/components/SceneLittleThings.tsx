import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { siteContent } from '../content';
import { DoodleHeart } from './DoodleDecorations';

interface SceneLittleThingsProps {
  onNext: () => void;
}

export const SceneLittleThings: React.FC<SceneLittleThingsProps> = ({ onNext }) => {
  const sectionData = siteContent.reasonsSection;

  const noteStyles = [
    { bg: 'bg-[#fff5f7]', border: 'border-[#fccdd7]', tape: 'bg-[#fbc5d0]/70', rotation: -1.2, icon: '🌷' },
    { bg: 'bg-[#fffdf5]', border: 'border-[#fef08a]', tape: 'bg-[#fef08a]/70', rotation: 1.5, icon: '✨' },
    { bg: 'bg-[#f8fafc]', border: 'border-[#bae6fd]', tape: 'bg-[#bae6fd]/70', rotation: -1.0, icon: '☕' },
    { bg: 'bg-[#fdf8f6]', border: 'border-[#fed7aa]', tape: 'bg-[#fed7aa]/70', rotation: 1.8, icon: '💖' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 relative select-none">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-1"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs">
            <Heart size={11} fill="currentColor" />
            <span>{sectionData.titleEn}</span>
          </span>
          <h2 className="font-cute text-lg sm:text-xl text-scrapbook-brown-dark font-bold">
            {sectionData.titleTh}
          </h2>
        </motion.div>

        {/* 2x2 Grid of Note Cards */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-4">
          {sectionData.reasons.map((reason, index) => {
            const style = noteStyles[index % noteStyles.length];

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                style={{ transform: `rotate(${style.rotation}deg)` }}
                className={`relative ${style.bg} rounded-xl p-3 sm:p-4 border ${style.border} shadow-2xs hover:shadow-xs transition-all hover:rotate-0 flex flex-col justify-between min-h-[105px] sm:min-h-[120px]`}
              >
                {/* Washi Tape Strip */}
                <div
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-14 ${style.tape} rounded-2xs shadow-2xs`}
                />

                <div className="flex items-center justify-between mb-1">
                  <span className="font-cute text-[10px] text-scrapbook-brown-light font-semibold">
                    Note #{index + 1}
                  </span>
                  <span className="text-sm">{style.icon}</span>
                </div>

                <p className="font-body text-xs sm:text-sm text-scrapbook-brown leading-snug">
                  “{reason.text}”
                </p>

                <div className="flex justify-end mt-1 opacity-40">
                  <DoodleHeart className="w-3.5 h-3.5 text-scrapbook-pink-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-hand text-sm sm:text-base text-scrapbook-pink-500/90 text-center"
        >
          ...และยังมีอีกหลายอย่างมาก ๆ ที่ชอบในตัวสโน ♡
        </motion.p>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full pt-1"
        >
          <button
            onClick={onNext}
            className="w-full py-3 px-6 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{sectionData.buttonText}</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
