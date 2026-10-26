import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { siteContent } from '../content';
import { DoodleHeart, DoodleFlower, DoodleSparkle, WashiTape } from './DoodleDecorations';

interface SceneOpeningProps {
  onNext: () => void;
}

export const SceneOpening: React.FC<SceneOpeningProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const opening = siteContent.opening;
  const couple = siteContent.couple;

  const handleOpenAndNext = () => {
    setIsOpen(true);
    setTimeout(() => {
      onNext();
    }, 650);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Decorative Floating Doodles */}
      <motion.div
        animate={{ y: [-4, 6, -4], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-6 sm:left-20 opacity-60 pointer-events-none"
      >
        <DoodleFlower className="w-8 h-8 sm:w-10 sm:h-10 text-scrapbook-pink-400" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-14 left-8 sm:left-24 opacity-50 pointer-events-none"
      >
        <DoodleHeart className="w-6 h-6 sm:w-8 sm:h-8" fill="#f8a5b7" />
      </motion.div>

      <motion.div
        animate={{ y: [4, -6, 4], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-16 right-8 sm:right-24 opacity-60 pointer-events-none"
      >
        <DoodleSparkle className="w-7 h-7 sm:w-9 sm:h-9" color="#f59e0b" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-16 right-8 sm:right-20 opacity-50 pointer-events-none"
      >
        <DoodleHeart className="w-7 h-7 sm:w-8 sm:h-8" fill="#fbcdd7" />
      </motion.div>

      {/* Main Scrapbook Cover Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm sm:max-w-md bg-[#fffdfa] rounded-3xl p-6 sm:p-8 border-2 border-[#eddcd0] shadow-envelope relative"
      >
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <WashiTape color="pink" rotation={-1} className="w-32" />
        </div>

        {/* Small Tag / Badge */}
        <div className="text-center pt-1 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs tracking-wide shadow-2xs">
            <Sparkles size={11} />
            <span>{opening.badge}</span>
            <Sparkles size={11} />
          </span>
        </div>

        {/* Typography */}
        <div className="text-center space-y-1.5 mb-5">
          <h1 className="font-serif italic text-2xl sm:text-3xl text-scrapbook-brown-dark tracking-tight leading-snug">
            {opening.title}
          </h1>
          <p className="font-cute text-sm sm:text-base text-scrapbook-brown leading-relaxed">
            {opening.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="h-px w-8 bg-[#eddcd0]" />
            <span className="font-hand text-base text-scrapbook-pink-400">
              {couple.boyfriendName} & {couple.girlfriendName}
            </span>
            <span className="h-px w-8 bg-[#eddcd0]" />
          </div>
        </div>

        {/* Realistic Handmade Envelope Container */}
        <div
          className="relative mx-auto my-4 w-60 sm:w-68 h-38 sm:h-42 cursor-pointer group"
          onClick={handleOpenAndNext}
        >
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-[#fbf6ee] rounded-xl border-2 border-[#e6d7c3] shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg">
            {/* Inner Letter Paper Peeking Out */}
            <div
              className={`absolute left-4 right-4 bg-white rounded-lg p-3 border border-[#ebdccb] shadow-2xs transition-all duration-500 ease-out flex flex-col items-center justify-center ${
                isOpen ? '-top-14 opacity-100' : 'top-2 opacity-90 group-hover:top-0'
              }`}
            >
              <div className="font-hand text-scrapbook-pink-500 text-base sm:text-lg">
                For Sno ♡
              </div>
              <div className="font-cute text-[10px] text-scrapbook-brown-light">
                Our Little Storybook
              </div>
            </div>

            {/* Envelope Pocket Shading */}
            <div
              className="absolute bottom-0 inset-x-0 h-24 bg-[#f5ecdd] border-t border-[#e2d0b8]"
              style={{ clipPath: 'polygon(0% 100%, 50% 30%, 100% 100%)' }}
            />
            <div className="absolute inset-0 bg-transparent border-t-[75px] border-t-transparent border-l-[120px] border-l-[#fbf4e8]/70 border-r-[120px] border-r-[#fbf4e8]/70 pointer-events-none" />

            {/* Envelope Flap */}
            <div
              className={`absolute top-0 inset-x-0 h-22 bg-[#ebdccb] origin-top transition-transform duration-500 ease-in-out border-b border-[#dac5ae] flex items-center justify-center ${
                isOpen ? '-rotate-180 opacity-0 pointer-events-none' : 'rotate-0'
              }`}
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
            >
              <div className="w-8 h-8 rounded-full bg-scrapbook-pink-400 text-white flex items-center justify-center shadow-md transform -translate-y-2 group-hover:scale-110 transition-transform">
                <Heart size={14} fill="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-5">
          <button
            onClick={handleOpenAndNext}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto"
          >
            <span>{opening.buttonText}</span>
            <ArrowRight size={16} />
          </button>
          <p className="font-body text-[11px] text-scrapbook-brown-light/80 mt-2">
            แตะที่ซองจดหมายหรือกดปุ่มเพื่อเริ่มเรื่องราว ♡
          </p>
        </div>
      </motion.div>
    </div>
  );
};
