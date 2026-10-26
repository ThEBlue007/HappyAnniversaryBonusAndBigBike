import React from 'react';
import { ArrowDown, Heart } from 'lucide-react';
import { siteContent } from '../content';
import { DoodleFlower, DoodleHeart } from './DoodleDecorations';

interface IntermissionNoteProps {
  onProceedToLetter: () => void;
}

export const IntermissionNote: React.FC<IntermissionNoteProps> = ({ onProceedToLetter }) => {
  const data = siteContent.intermission;

  return (
    <section className="py-24 px-4 min-h-[70vh] flex flex-col items-center justify-center relative">
      {/* Serene Scrapbook Page Container */}
      <div className="w-full max-w-2xl bg-[#fffdf9] rounded-3xl p-8 sm:p-12 border-2 border-[#eee3d5] shadow-sm relative text-center">
        {/* Corner Doodles */}
        <div className="absolute top-4 left-4 opacity-50">
          <DoodleFlower className="w-7 h-7 text-scrapbook-pink-300" />
        </div>
        <div className="absolute top-4 right-4 opacity-40">
          <DoodleHeart className="w-5 h-5 text-scrapbook-pink-400" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-40">
          <DoodleHeart className="w-5 h-5 text-scrapbook-pink-300" />
        </div>
        <div className="absolute bottom-4 right-4 opacity-50">
          <DoodleFlower className="w-7 h-7 text-amber-300" />
        </div>

        {/* Content */}
        <div className="space-y-6 max-w-lg mx-auto py-4">
          <div className="w-8 h-8 rounded-full bg-scrapbook-pink-50 text-scrapbook-pink-400 mx-auto flex items-center justify-center">
            <Heart size={16} fill="currentColor" />
          </div>

          <p className="font-cute text-lg sm:text-xl text-scrapbook-brown-dark leading-relaxed">
            “{data.quote1}”
          </p>

          <p className="font-cute text-xl sm:text-2xl text-scrapbook-pink-500 font-bold leading-relaxed">
            “{data.quote2}”
          </p>

          <div className="pt-6">
            <button
              onClick={onProceedToLetter}
              className="px-7 py-3 rounded-full bg-[#fdf2f4] hover:bg-scrapbook-pink-100 text-scrapbook-pink-600 font-cute text-sm sm:text-base font-semibold border border-scrapbook-pink-200 shadow-xs hover:shadow-md transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              <span>{data.buttonText}</span>
              <ArrowDown size={15} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
