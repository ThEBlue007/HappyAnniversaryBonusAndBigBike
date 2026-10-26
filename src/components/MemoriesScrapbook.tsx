import React, { useState } from 'react';
import { Camera, Calendar } from 'lucide-react';
import { siteContent } from '../content';
import type { MemoryItem } from '../types';
import { WashiTape, DoodleHeart, DoodleFlower, DoodleSparkle, PolaroidPlaceholder } from './DoodleDecorations';

interface MemoriesScrapbookProps {
  customImages?: Record<number, string>;
  onTriggerImagePicker?: (memoryId: number) => void;
}

export const MemoriesScrapbook: React.FC<MemoriesScrapbookProps> = ({ 
  customImages = {},
  onTriggerImagePicker
}) => {
  const header = siteContent.memoriesHeader;
  const memories = siteContent.memories;

  return (
    <section id="memories-section" className="py-16 px-4 max-w-5xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center mb-16 space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs">
          <Camera size={12} />
          <span>{header.titleEn}</span>
        </span>
        <h2 className="font-cute text-2xl sm:text-3xl text-scrapbook-brown-dark font-bold">
          {header.titleTh}
        </h2>
        <p className="font-body text-sm sm:text-base text-scrapbook-brown-light max-w-md mx-auto">
          {header.subtitle}
        </p>
        <div className="w-16 h-0.5 bg-scrapbook-pink-200 mx-auto mt-2 rounded-full" />
      </div>

      {/* Memory Cards Timeline / Scrapbook Flow */}
      <div className="space-y-16 sm:space-y-24">
        {memories.map((item, index) => {
          const isEven = index % 2 === 1;
          const imageSrc = customImages[item.id] || item.image || (item.images && item.images[0]) || '/images/photo-1.jpg';

          return (
            <MemoryCard
              key={item.id}
              item={item}
              index={index}
              isEven={isEven}
              imageSrc={imageSrc}
              onTriggerPicker={() => onTriggerImagePicker?.(item.id)}
            />
          );
        })}
      </div>
    </section>
  );
};

// Sub-component for individual memory card
const MemoryCard: React.FC<{
  item: MemoryItem;
  index: number;
  isEven: boolean;
  imageSrc: string;
  onTriggerPicker?: () => void;
}> = ({ item, index, isEven, imageSrc, onTriggerPicker }) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 relative`}>
      {/* Decorative side doodles */}
      {index === 0 && (
        <div className="hidden lg:block absolute -left-12 top-4 pointer-events-none opacity-60">
          <DoodleFlower className="w-8 h-8 text-scrapbook-pink-400" />
        </div>
      )}
      {index === 2 && (
        <div className="hidden lg:block absolute -right-10 top-8 pointer-events-none opacity-50">
          <DoodleSparkle className="w-8 h-8 text-amber-400" />
        </div>
      )}
      {index === 4 && (
        <div className="hidden lg:block absolute -left-10 bottom-6 pointer-events-none opacity-60">
          <DoodleHeart className="w-7 h-7 text-scrapbook-pink-400" />
        </div>
      )}

      {/* 1. Polaroid Photo Side */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div
          style={{ transform: `rotate(${item.rotation || 0}deg)` }}
          className="relative group transition-all duration-300 hover:rotate-0 hover:scale-[1.02]"
        >
          {/* Washi Tape on Polaroid top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
            <WashiTape color={item.tapeColor || 'pink'} rotation={index % 2 === 0 ? -1.5 : 2} className="w-24 sm:w-28" />
          </div>

          {/* Polaroid Frame */}
          <div className="bg-white p-3 sm:p-4 pb-6 sm:pb-7 rounded-sm shadow-polaroid hover:shadow-polaroid-hover transition-shadow border border-[#ede3d4] w-72 sm:w-84 max-w-full">
            {/* Photo Container with fixed aspect ratio to prevent distortion */}
            <div className="relative aspect-[4/3] bg-[#f7f2ea] rounded-xs overflow-hidden flex items-center justify-center border border-[#ece3d6]">
              {imgError ? (
                // Graceful fallback to cute illustrated placeholder
                <PolaroidPlaceholder 
                  index={item.id} 
                  label={item.date} 
                  onClickChange={onTriggerPicker}
                />
              ) : (
                <img
                  src={imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                  onError={() => setImgError(true)}
                  loading="lazy"
                />
              )}

              {/* Click to preview/replace button overlay (for Blue's convenience) */}
              {!imgError && onTriggerPicker && (
                <button
                  onClick={onTriggerPicker}
                  className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-cute"
                  title="เปลี่ยนรูปภาพพรีวิว"
                >
                  <Camera size={10} />
                  <span>ลองเปลี่ยนรูป</span>
                </button>
              )}
            </div>

            {/* Handwritten note beneath photo */}
            <div className="mt-3.5 flex items-center justify-between px-1">
              <span className="font-hand text-base sm:text-lg text-scrapbook-brown-dark tracking-wide">
                {item.date || `Memory #${item.id}`}
              </span>
              <span className="text-scrapbook-pink-400 text-xs">
                {item.sticker === 'flower' ? '🌸' : item.sticker === 'camera' ? '📷' : item.sticker === 'star' ? '⭐' : '♡'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Story Text Side */}
      <div className="w-full md:w-1/2">
        <div className="bg-[#fffdfa] rounded-2xl p-6 sm:p-7 border border-[#ede1d3] shadow-soft relative">
          {/* Subtle note pin / clip */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-scrapbook-pink-300" />
            <span className="font-cute text-xs text-scrapbook-pink-500 font-semibold tracking-wide">
              {item.title}
            </span>
          </div>

          {/* Main Story Caption */}
          <p className="font-body text-base sm:text-lg text-scrapbook-brown leading-relaxed mb-4">
            “{item.caption}”
          </p>

          {/* Date / Detail Footer */}
          {item.date && (
            <div className="flex items-center gap-1.5 pt-3 border-t border-[#f4ebe0] font-cute text-xs text-scrapbook-brown-light">
              <Calendar size={13} className="text-scrapbook-pink-400" />
              <span>{item.date}</span>
            </div>
          )}

          {/* Bottom subtle heart */}
          <div className="absolute bottom-3 right-4 opacity-40">
            <span className="font-hand text-scrapbook-pink-400 text-xs">♡</span>
          </div>
        </div>
      </div>
    </div>
  );
};
