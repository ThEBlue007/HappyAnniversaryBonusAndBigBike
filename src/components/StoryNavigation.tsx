import React from 'react';
import { ChevronLeft, Heart } from 'lucide-react';

interface StoryNavigationProps {
  currentScene: number;
  totalScenes: number;
  onPrevScene: () => void;
  canGoBack: boolean;
}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({
  currentScene,
  totalScenes,
  onPrevScene,
  canGoBack,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-4 py-3 flex items-center justify-between pointer-events-none">
      {/* Back Button */}
      <div className="pointer-events-auto">
        {canGoBack ? (
          <button
            onClick={onPrevScene}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md text-scrapbook-brown-dark hover:text-scrapbook-pink-600 border border-[#eddcd0] shadow-sm font-cute text-xs transition-all hover:scale-105 active:scale-95"
            title="ย้อนกลับฉากก่อนหน้า"
            aria-label="ย้อนกลับฉากก่อนหน้า"
          >
            <ChevronLeft size={15} />
            <span className="hidden sm:inline">ย้อนกลับ</span>
          </button>
        ) : (
          <div className="w-8" /> // spacer
        )}
      </div>

      {/* Progress Dots / Counter */}
      <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#eddcd0] shadow-sm">
        <Heart size={12} className="text-scrapbook-pink-500 fill-scrapbook-pink-400" />
        <span className="font-cute text-xs text-scrapbook-brown font-semibold tracking-wide">
          Our Story • {currentScene + 1}/{totalScenes}
        </span>

        {/* Mini progress line or dots */}
        <div className="hidden sm:flex items-center gap-1 ml-1 pl-1.5 border-l border-[#ecd9c6]">
          {Array.from({ length: totalScenes }).map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentScene
                  ? 'w-4 bg-scrapbook-pink-500'
                  : idx < currentScene
                  ? 'w-1.5 bg-scrapbook-pink-300'
                  : 'w-1.5 bg-[#e8ded0]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right spacer to balance center alignment */}
      <div className="w-8" />
    </header>
  );
};
