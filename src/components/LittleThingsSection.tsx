import React from 'react';
import { Heart } from 'lucide-react';
import { siteContent } from '../content';
import { DoodleHeart } from './DoodleDecorations';

export const LittleThingsSection: React.FC = () => {
  const sectionData = siteContent.reasonsSection;

  // Aesthetic pastel sticky note themes
  const noteStyles = [
    { bg: 'bg-[#fff5f7]', border: 'border-[#fccdd7]', tape: 'bg-[#fbc5d0]/70', rotation: -1.2, icon: '🌷' },
    { bg: 'bg-[#fffdf5]', border: 'border-[#fef08a]', tape: 'bg-[#fef08a]/70', rotation: 1.5, icon: '✨' },
    { bg: 'bg-[#f8fafc]', border: 'border-[#bae6fd]', tape: 'bg-[#bae6fd]/70', rotation: -1.0, icon: '☕' },
    { bg: 'bg-[#fdf8f6]', border: 'border-[#fed7aa]', tape: 'bg-[#fed7aa]/70', rotation: 1.8, icon: '💖' },
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative">
      {/* Header */}
      <div className="text-center mb-14 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs">
          <Heart size={12} fill="currentColor" />
          <span>{sectionData.titleEn}</span>
        </span>
        <h2 className="font-cute text-2xl sm:text-3xl text-scrapbook-brown-dark font-bold">
          {sectionData.titleTh}
        </h2>
        <div className="w-12 h-0.5 bg-scrapbook-pink-200 mx-auto mt-2 rounded-full" />
      </div>

      {/* Grid of Note Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {sectionData.reasons.map((reason, index) => {
          const style = noteStyles[index % noteStyles.length];

          return (
            <div
              key={reason.id}
              style={{ transform: `rotate(${style.rotation}deg)` }}
              className={`relative ${style.bg} rounded-2xl p-6 sm:p-7 border ${style.border} shadow-sm hover:shadow-md transition-all duration-300 hover:rotate-0 hover:-translate-y-1 group`}
            >
              {/* Cute Washi Tape Strip at top */}
              <div 
                className={`absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-20 ${style.tape} rounded-xs shadow-2xs`}
              />

              {/* Note Number & Icon */}
              <div className="flex items-center justify-between mb-3 pt-1">
                <span className="font-cute text-xs text-scrapbook-brown-light font-semibold">
                  Note #{index + 1}
                </span>
                <span className="text-lg group-hover:scale-125 transition-transform">
                  {style.icon}
                </span>
              </div>

              {/* Note Content */}
              <p className="font-body text-base sm:text-lg text-scrapbook-brown leading-relaxed min-h-[52px]">
                “{reason.text}”
              </p>

              {/* Corner decorative heart doodle */}
              <div className="flex justify-end mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <DoodleHeart className="w-4 h-4 text-scrapbook-pink-400" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle bottom note decoration */}
      <div className="mt-12 text-center">
        <p className="font-hand text-lg text-scrapbook-pink-500/80">
          ...และยังมีอีกหลายอย่างมาก ๆ ที่ชอบในตัวสโน ♡
        </p>
      </div>
    </section>
  );
};
