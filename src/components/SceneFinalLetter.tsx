import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../content';
import { DoodleHeart, DoodleFlower, WashiTape } from './DoodleDecorations';

interface SceneFinalLetterProps {
  onNext: () => void;
}

export const SceneFinalLetter: React.FC<SceneFinalLetterProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const letterData = siteContent.finalLetter;

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#fccdd7', '#f8a5b7', '#ffe4e9', '#fef08a'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }
  };

  const isLastPage = pageIndex >= letterData.pages.length - 1;

  const handleNextPageOrProceed = () => {
    if (!isLastPage) {
      setPageIndex((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 relative select-none">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
        {!isOpen ? (
          // Sealed Big Envelope Stage
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full text-center space-y-4"
          >
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs">
                <Sparkles size={11} />
                <span>{letterData.envelopeTitleEn}</span>
                <Sparkles size={11} />
              </span>
              <h2 className="font-cute text-xl sm:text-2xl text-scrapbook-brown-dark font-bold">
                {letterData.envelopeTitleTh}
              </h2>
            </div>

            {/* Envelope Graphic */}
            <div
              onClick={handleOpenEnvelope}
              className="relative mx-auto w-64 sm:w-76 h-42 sm:h-48 bg-[#fcf8f2] rounded-2xl border-2 border-[#e6d5bf] shadow-envelope cursor-pointer group hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              {/* Ribbon */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-7 bg-[#fcd5dc]/80 border-x border-[#f4b8c3]/60 z-10 pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-7 bg-[#fcd5dc]/80 border-y border-[#f4b8c3]/60 z-10 pointer-events-none" />

              {/* Envelope Flap */}
              <div
                className="absolute inset-0 bg-[#f5ecde] border-b border-[#ddc8af]"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)' }}
              />

              {/* Heart Wax Seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-scrapbook-pink-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Heart size={18} fill="white" />
              </div>

              {/* Pocket Shape */}
              <div
                className="absolute inset-0 bg-[#faf3e8]"
                style={{ clipPath: 'polygon(0% 100%, 50% 45%, 100% 100%)' }}
              />

              <div className="absolute bottom-2.5 inset-x-0 text-center font-cute text-[11px] text-scrapbook-brown-light z-20">
                แตะเพื่อเปิดอ่านจดหมาย ♡
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleOpenEnvelope}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                <span>{letterData.openButtonText}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          // Unfolded Letter Stage
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full bg-[#fffefb] rounded-3xl p-5 sm:p-7 border-2 border-[#ede0d2] shadow-letter relative flex flex-col justify-between"
          >
            {/* Top Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <WashiTape color="pink" rotation={-0.5} className="w-28 sm:w-32" />
            </div>

            {/* Corner Floral Doodles */}
            <div className="absolute top-3.5 right-4 opacity-40 pointer-events-none">
              <DoodleFlower className="w-6 h-6 text-scrapbook-pink-300" />
            </div>

            {/* Letter Header */}
            <div className="border-b border-[#f0e4d7] pb-2.5 mb-3 flex items-center justify-between">
              <h3 className="font-cute text-xl sm:text-2xl font-bold text-scrapbook-brown-dark tracking-wide">
                {letterData.letterHeader}
              </h3>
              <span className="font-cute text-xs text-scrapbook-pink-500 font-semibold">
                หน้า {pageIndex + 1}/{letterData.pages.length}
              </span>
            </div>

            {/* Letter Body (Paging to prevent long scrolling on mobile) */}
            <div className="min-h-[175px] sm:min-h-[200px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pageIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3 font-body text-sm sm:text-base text-scrapbook-brown leading-relaxed"
                >
                  {letterData.pages[pageIndex].map((para, idx) => (
                    <p key={idx} className="indent-4">
                      {para}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Signoff on the last page */}
              {isLastPage && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="pt-3 border-t border-[#f0e4d7] flex flex-col items-end"
                >
                  <span className="font-cute text-xs sm:text-sm text-scrapbook-pink-500 font-semibold">
                    {letterData.loveNote}
                  </span>
                  <span className="font-hand text-xl sm:text-2xl text-scrapbook-brown-dark font-bold">
                    {letterData.signOff}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={handleNextPageOrProceed}
                className="w-full py-3 px-6 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
              >
                <span>
                  {!isLastPage
                    ? letterData.nextPageButtonText
                    : letterData.proceedToClueButtonText}
                </span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Bottom Corner Doodle */}
            <div className="absolute bottom-3 left-4 opacity-40 pointer-events-none">
              <DoodleHeart className="w-4 h-4 text-scrapbook-pink-400" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
