import React, { useState } from 'react';
import { Mail, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../content';
import { DoodleHeart, DoodleFlower, WashiTape } from './DoodleDecorations';

export const FinalLetterEnvelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const letterData = siteContent.finalLetter;

  const handleOpenLetter = () => {
    setIsOpen(true);

    // Launch gentle romantic confetti
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#fccdd7', '#f8a5b7', '#ffe4e9', '#fef08a', '#fdfbf7'],
        disableForReducedMotion: true,
      });
      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#fbc5d0', '#ffd1dc', '#fff'],
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#fbc5d0', '#ffd1dc', '#fff'],
          disableForReducedMotion: true,
        });
      }, 400);
    } catch {
      // safe fallback if confetti fails
    }
  };

  return (
    <section 
      id="final-letter-section" 
      className="py-20 px-4 min-h-screen flex flex-col items-center justify-center relative transition-colors duration-1000 bg-gradient-to-b from-transparent via-[#fff5f7]/70 to-[#faf4ea]"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-10 left-8 sm:left-16 pointer-events-none opacity-40">
        <DoodleFlower className="w-8 h-8 text-scrapbook-pink-300" />
      </div>
      <div className="absolute top-16 right-8 sm:right-20 pointer-events-none opacity-40">
        <DoodleHeart className="w-6 h-6 text-scrapbook-pink-400" />
      </div>

      <div className="w-full max-w-2xl mx-auto">
        {!isOpen ? (
          // Envelope State (Before Opening)
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs">
                <Sparkles size={12} />
                <span>{letterData.envelopeTitleEn}</span>
                <Sparkles size={12} />
              </span>
              <h2 className="font-cute text-2xl sm:text-3xl text-scrapbook-brown-dark font-bold">
                {letterData.envelopeTitleTh}
              </h2>
            </div>

            {/* Big Handmade Envelope Graphic */}
            <div 
              onClick={handleOpenLetter}
              className="relative mx-auto w-72 sm:w-88 h-48 sm:h-56 bg-[#fcf8f2] rounded-2xl border-2 border-[#e6d5bf] shadow-envelope cursor-pointer group hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              {/* Pink Ribbon Across Envelope */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-[#fcd5dc]/80 border-x border-[#f4b8c3]/60 shadow-xs z-10 pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-[#fcd5dc]/80 border-y border-[#f4b8c3]/60 shadow-xs z-10 pointer-events-none" />

              {/* Envelope Flap Triangles */}
              <div 
                className="absolute inset-0 bg-[#f5ecde] border-b border-[#ddc8af]"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)' }}
              />

              {/* Heart Wax Seal in the center of ribbon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-scrapbook-pink-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Heart size={20} fill="white" />
              </div>

              {/* Bottom Envelope Pocket Shape */}
              <div 
                className="absolute inset-0 bg-[#faf3e8]"
                style={{ clipPath: 'polygon(0% 100%, 50% 45%, 100% 100%)' }}
              />

              <div className="absolute bottom-3 inset-x-0 text-center font-cute text-xs text-scrapbook-brown-light z-20">
                แตะเพื่อเปิดอ่าน ♡
              </div>
            </div>

            {/* Open Button */}
            <div>
              <button
                onClick={handleOpenLetter}
                className="px-8 py-3.5 rounded-full bg-scrapbook-pink-500 hover:bg-scrapbook-pink-600 text-white font-cute text-base font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <Mail size={18} />
                <span>{letterData.openButtonText}</span>
              </button>
            </div>
          </div>
        ) : (
          // Unfolded Letter State
          <div className="bg-[#fffefb] rounded-3xl p-6 sm:p-10 border-2 border-[#ede0d2] shadow-letter relative animate-in fade-in zoom-in-95 duration-700">
            {/* Top Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
              <WashiTape color="pink" rotation={-0.5} className="w-36" />
            </div>

            {/* Corner Floral Doodles */}
            <div className="absolute top-4 right-4 opacity-40">
              <DoodleFlower className="w-7 h-7 text-scrapbook-pink-300" />
            </div>

            {/* Letter Header */}
            <div className="border-b border-[#f0e4d7] pb-4 mb-6">
              <h3 className="font-cute text-2xl sm:text-3xl font-bold text-scrapbook-brown-dark tracking-wide">
                {letterData.letterHeader}
              </h3>
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 font-body text-base sm:text-lg text-scrapbook-brown leading-relaxed sm:leading-loose">
              {letterData.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="indent-4">
                  {paragraph}
                </p>
              ))}

              {/* CAKE CLUE / PHYSICAL SURPRISE SECTION */}
              <div className="my-8 pt-6 pb-6 px-5 sm:px-7 rounded-2xl bg-[#fff3f5] border-2 border-dashed border-scrapbook-pink-300 shadow-xs relative">
                {/* Little heart badge */}
                <div className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-scrapbook-pink-400 text-white font-cute text-xs shadow-2xs">
                  A Little Surprise 🎂🤍
                </div>

                <p className="font-cute text-sm sm:text-base text-scrapbook-brown-light mb-2">
                  {letterData.cakeCluePrefix}
                </p>

                {/* The Crucial Clue Sentence */}
                <p className="font-cute text-lg sm:text-2xl text-scrapbook-pink-600 font-bold leading-normal tracking-wide">
                  {letterData.cakeClue}
                </p>

                <p className="font-cute text-xs sm:text-sm text-scrapbook-brown-light mt-2 italic">
                  {letterData.cakeClueSuffix}
                </p>
              </div>

              {/* Signoff */}
              <div className="pt-6 border-t border-[#f0e4d7] flex flex-col items-end space-y-1">
                <span className="font-cute text-base sm:text-lg text-scrapbook-pink-500 font-semibold">
                  {letterData.loveNote}
                </span>
                <span className="font-hand text-2xl sm:text-3xl text-scrapbook-brown-dark font-bold tracking-wider">
                  {letterData.signOff}
                </span>
              </div>
            </div>

            {/* Bottom Floral Accent */}
            <div className="absolute bottom-4 left-6 opacity-40">
              <DoodleHeart className="w-5 h-5 text-scrapbook-pink-400" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
