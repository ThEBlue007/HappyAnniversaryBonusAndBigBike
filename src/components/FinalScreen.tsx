import React from 'react';
import { siteContent } from '../content';
import { DoodleHeart, DoodleFlower, DoodleSparkle } from './DoodleDecorations';

export const FinalScreen: React.FC = () => {
  const data = siteContent.finalScreen;

  return (
    <footer className="py-24 px-4 text-center relative overflow-hidden bg-gradient-to-b from-transparent to-[#f5ecde]/50">
      {/* Decorative Accents */}
      <div className="flex justify-center items-center gap-3 mb-6">
        <DoodleSparkle className="w-4 h-4 text-amber-400" />
        <DoodleHeart className="w-5 h-5 text-scrapbook-pink-400" />
        <DoodleFlower className="w-5 h-5 text-scrapbook-pink-300" />
      </div>

      <div className="space-y-3 max-w-md mx-auto">
        <h4 className="font-serif italic text-xl sm:text-2xl text-scrapbook-brown-dark tracking-tight">
          {data.quoteEn}
        </h4>
        <p className="font-cute text-base sm:text-lg text-scrapbook-brown">
          {data.quoteTh}
        </p>

        <div className="pt-6">
          <p className="font-hand text-base text-scrapbook-pink-500">
            {data.madeWithLove}
          </p>
        </div>
      </div>
    </footer>
  );
};
