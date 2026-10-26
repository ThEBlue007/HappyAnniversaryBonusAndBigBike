import React, { useState } from 'react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { siteContent } from '../content';
import { DoodleHeart, DoodleFlower, DoodleSparkle, WashiTape } from './DoodleDecorations';

interface OpeningEnvelopeProps {
  onStartReading: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onStartReading }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const opening = siteContent.opening;
  const couple = siteContent.couple;

  const handleOpen = () => {
    setIsOpen(true);
    // Smooth delay before triggering scroll so the user can enjoy the flap opening animation
    setTimeout(() => {
      onStartReading();
    }, 800);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background doodles floating gently */}
      <div className="absolute top-10 left-6 sm:left-20 animate-float-slow opacity-60 pointer-events-none">
        <DoodleFlower className="w-8 h-8 sm:w-10 sm:h-10 text-scrapbook-pink-400" />
      </div>
      <div className="absolute bottom-16 left-8 sm:left-24 animate-pulse-gentle opacity-50 pointer-events-none">
        <DoodleHeart className="w-6 h-6 sm:w-8 sm:h-8" fill="#f8a5b7" />
      </div>
      <div className="absolute top-16 right-8 sm:right-24 animate-float-slow opacity-60 pointer-events-none" style={{ animationDelay: '2s' }}>
        <DoodleSparkle className="w-7 h-7 sm:w-9 sm:h-9" color="#f59e0b" />
      </div>
      <div className="absolute bottom-20 right-6 sm:right-20 animate-pulse-gentle opacity-50 pointer-events-none" style={{ animationDelay: '1s' }}>
        <DoodleHeart className="w-7 h-7 sm:w-9 sm:h-9" fill="#fbcdd7" />
      </div>

      {/* Main Scrapbook Cover Card */}
      <div className="w-full max-w-md bg-[#fffdfa] rounded-3xl p-6 sm:p-8 border-2 border-[#eddcd0] shadow-envelope relative transition-all duration-500">
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <WashiTape color="pink" rotation={-1} className="w-32" />
        </div>

        {/* Small Tag / Badge */}
        <div className="text-center pt-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs tracking-wide shadow-2xs">
            <Sparkles size={12} />
            <span>{opening.badge}</span>
            <Sparkles size={12} />
          </span>
        </div>

        {/* Main Cover Typography */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="font-serif italic text-2xl sm:text-3xl text-scrapbook-brown-dark tracking-tight leading-snug">
            {opening.title}
          </h1>
          <p className="font-cute text-base sm:text-lg text-scrapbook-brown leading-relaxed">
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
        <div className="relative mx-auto my-6 w-64 sm:w-72 h-44 cursor-pointer group" onClick={handleOpen}>
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-[#fbf6ee] rounded-xl border-2 border-[#e6d7c3] shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-lg">
            {/* Inner Letter Paper Peeking Out */}
            <div
              className={`absolute left-4 right-4 bg-white rounded-lg p-3 border border-[#ebdccb] shadow-xs transition-all duration-700 ease-out flex flex-col items-center justify-center ${
                isOpen ? '-top-16 opacity-100' : 'top-3 opacity-90 group-hover:top-1'
              }`}
            >
              <div className="font-hand text-scrapbook-pink-500 text-lg">
                For Sno ♡
              </div>
              <div className="font-cute text-[11px] text-scrapbook-brown-light">
                Our Little Storybook
              </div>
            </div>

            {/* Envelope Pocket Shading (Bottom & Sides Triangle effect) */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-[#f5ecdd] border-t border-[#e2d0b8]" 
                 style={{ clipPath: 'polygon(0% 100%, 50% 30%, 100% 100%)' }} 
            />
            <div className="absolute inset-0 bg-transparent border-t-[88px] border-t-transparent border-l-[140px] border-l-[#fbf4e8]/70 border-r-[140px] border-r-[#fbf4e8]/70 pointer-events-none" />

            {/* Envelope Flap (Top triangle) */}
            <div
              className={`absolute top-0 inset-x-0 h-24 bg-[#ebdccb] origin-top transition-transform duration-700 ease-in-out border-b border-[#dac5ae] flex items-center justify-center ${
                isOpen ? '-rotate-180 opacity-0 pointer-events-none' : 'rotate-0'
              }`}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              }}
            >
              {/* Wax Seal Heart in Flap Center */}
              <div className="w-9 h-9 rounded-full bg-scrapbook-pink-400 text-white flex items-center justify-center shadow-md transform -translate-y-2 group-hover:scale-110 transition-transform">
                <Heart size={16} fill="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleOpen}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto"
          >
            <Mail size={18} />
            <span>{opening.buttonText}</span>
          </button>
          
          <p className="font-body text-xs text-scrapbook-brown-light/80 mt-2.5">
            แตะที่ซองจดหมายหรือกดปุ่มเพื่อเริ่มอ่านนะ ♡
          </p>
        </div>

        {/* Bottom Corner Doodle */}
        <div className="absolute -bottom-2 -right-2">
          <DoodleFlower className="w-6 h-6 text-scrapbook-pink-300" />
        </div>
      </div>
    </section>
  );
};
