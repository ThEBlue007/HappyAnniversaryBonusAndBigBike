import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Camera, Heart, ZoomIn } from 'lucide-react';
import type { MemoryItem } from '../types';
import { WashiTape, PolaroidPlaceholder } from './DoodleDecorations';
import { ImageZoomModal } from './ImageZoomModal';

interface SceneMemoryProps {
  item: MemoryItem;
  customImages?: Record<string, string>; // key can be image path e.g. '/images/photo-2-1.jpg'
  onNext: () => void;
  onTriggerPicker?: (imagePath: string) => void;
}

export const SceneMemory: React.FC<SceneMemoryProps> = ({
  item,
  customImages = {},
  onNext,
  onTriggerPicker,
}) => {
  // Support both images array and legacy single image
  const photoList = item.images && item.images.length > 0 
    ? item.images 
    : [item.image || '/images/photo-1.jpg'];

  const isMultiple = photoList.length > 1;
  const [frontIndex, setFrontIndex] = useState<number>(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  const handleImageError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Stack styling configurations for 3 photos
  const getStackStyle = (index: number) => {
    if (!isMultiple) {
      return {
        x: 0,
        y: 0,
        rotate: item.rotation || 0,
        scale: 1,
        zIndex: 20,
      };
    }

    // Relative position from the front card
    const diff = (index - frontIndex + photoList.length) % photoList.length;

    if (diff === 0) {
      // Front active card
      return {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        zIndex: 30,
        shadow: '0 12px 28px -2px rgba(107, 84, 68, 0.22)',
      };
    } else if (diff === 1) {
      // Right card behind
      return {
        x: 28,
        y: -4,
        rotate: 6,
        scale: 0.92,
        zIndex: 10,
        shadow: '0 6px 14px -2px rgba(107, 84, 68, 0.12)',
      };
    } else {
      // Left card behind
      return {
        x: -28,
        y: -4,
        rotate: -6,
        scale: 0.92,
        zIndex: 15,
        shadow: '0 6px 14px -2px rgba(107, 84, 68, 0.12)',
      };
    }
  };

  // Resolved image sources (applying custom previews if any)
  const resolvedImages = photoList.map((p) => customImages[p] || p);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 relative select-none">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center space-y-3.5">
        
        {/* 1. Polaroid Photos Area */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[260px] sm:min-h-[290px]">
          {photoList.map((photoPath, idx) => {
            const currentImgSrc = customImages[photoPath] || photoPath;
            const style = getStackStyle(idx);
            const isFront = isMultiple ? idx === frontIndex : true;

            return (
              <motion.div
                key={photoPath}
                layout
                initial={false}
                animate={{
                  x: style.x,
                  y: style.y,
                  rotate: style.rotate,
                  scale: style.scale,
                  zIndex: style.zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 24,
                }}
                onClick={() => {
                  if (isMultiple && !isFront) {
                    setFrontIndex(idx);
                  } else if (!imgErrors[idx]) {
                    // Clicking front photo also opens zoom modal!
                    setIsZoomOpen(true);
                  }
                }}
                className={`w-64 sm:w-72 max-w-full cursor-pointer transition-shadow ${
                  isMultiple ? 'absolute' : 'relative'
                }`}
              >
                {/* Washi Tape on Polaroid top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                  <WashiTape
                    color={item.tapeColor || 'pink'}
                    rotation={idx % 2 === 0 ? -1.5 : 2}
                    className="w-22 sm:w-26"
                  />
                </div>

                {/* Polaroid Frame */}
                <div 
                  className={`bg-white p-2.5 sm:p-3 pb-4 sm:pb-5 rounded-sm border border-[#ede3d4] transition-all ${
                    isFront 
                      ? 'shadow-polaroid hover:shadow-polaroid-hover' 
                      : 'shadow-sm opacity-90 hover:opacity-100 hover:scale-[0.95]'
                  }`}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] bg-[#f7f2ea] rounded-xs overflow-hidden flex items-center justify-center border border-[#ece3d6]">
                    {imgErrors[idx] ? (
                      <PolaroidPlaceholder
                        index={item.id}
                        label={`${item.date || 'Memory'} ${isMultiple ? `(${idx + 1}/3)` : ''}`}
                        onClickChange={() => onTriggerPicker?.(photoPath)}
                      />
                    ) : (
                      <img
                        src={currentImgSrc}
                        alt={`${item.title} - ${idx + 1}`}
                        className="w-full h-full object-cover select-none"
                        onError={() => handleImageError(idx)}
                      />
                    )}

                    {/* Cute Zoom Button on front photo */}
                    {isFront && !imgErrors[idx] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFrontIndex(idx);
                          setIsZoomOpen(true);
                        }}
                        className="absolute top-2 left-2 z-30 px-2 py-1 rounded-full bg-white/90 hover:bg-white text-scrapbook-brown-dark shadow-xs flex items-center gap-1 font-cute text-[10px] transition-all hover:scale-105 active:scale-95 backdrop-blur-2xs border border-[#eddcd0]"
                        title="กดซูมดูรูปขนาดใหญ่"
                      >
                        <ZoomIn size={12} className="text-scrapbook-pink-500" />
                        <span>ซูมดูรูป ♡</span>
                      </button>
                    )}

                    {/* Blue's Quick Image Upload Overlay */}
                    {!imgErrors[idx] && onTriggerPicker && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTriggerPicker(photoPath);
                        }}
                        className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-[10px] px-2 py-0.5 rounded-full opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-cute z-30"
                      >
                        <Camera size={10} />
                        <span>เปลี่ยนรูป</span>
                      </button>
                    )}

                    {/* Multi-photo indicator pill on front card */}
                    {isMultiple && isFront && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-white font-cute text-[10px] backdrop-blur-2xs z-20">
                        {idx + 1}/{photoList.length}
                      </div>
                    )}
                  </div>

                  {/* Caption under photo */}
                  <div className="mt-2 flex items-center justify-between px-1">
                    <span className="font-hand text-sm sm:text-base text-scrapbook-brown-dark tracking-wide truncate">
                      {item.date || `Memory #${item.id}`}
                    </span>
                    <span className="text-scrapbook-pink-400 text-xs">
                      {item.sticker === 'flower'
                        ? '🌸'
                        : item.sticker === 'camera'
                        ? '📷'
                        : item.sticker === 'star'
                        ? '⭐'
                        : '♡'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Multi-Photo Switcher Hint & Heart Dots (Only when > 1 photo) */}
        {isMultiple && (
          <div className="flex flex-col items-center gap-1 pt-1">
            <div className="flex items-center gap-2">
              {photoList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFrontIndex(i)}
                  className={`transition-all ${
                    i === frontIndex
                      ? 'scale-125 text-scrapbook-pink-500'
                      : 'scale-90 text-[#d4c2b2] hover:text-scrapbook-pink-300'
                  }`}
                  title={`ดูรูปที่ ${i + 1}`}
                >
                  <Heart
                    size={14}
                    className={i === frontIndex ? 'fill-scrapbook-pink-400' : ''}
                  />
                </button>
              ))}
            </div>
            <span className="font-cute text-[11px] text-scrapbook-pink-500/80 animate-pulse">
              แตะรูปเพื่อซูม หรือแตะเพื่อสลับดูรูปอื่นได้นะ ♡
            </span>
          </div>
        )}

        {/* Single Photo zoom hint */}
        {!isMultiple && (
          <div className="text-center pt-0.5">
            <span className="font-cute text-[11px] text-scrapbook-brown-light/70">
              แตะที่รูปเพื่อซูมดูรูปใหญ่ได้นะ ♡
            </span>
          </div>
        )}

        {/* 2. Story Caption Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
          className="w-full bg-[#fffdfa] rounded-2xl p-3.5 sm:p-4 border border-[#ede1d3] shadow-soft relative"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-cute text-xs text-scrapbook-pink-500 font-semibold tracking-wide">
              {item.title}
            </span>
            {item.date && (
              <span className="flex items-center gap-1 font-cute text-[11px] text-scrapbook-brown-light">
                <Calendar size={11} className="text-scrapbook-pink-400" />
                <span>{item.date}</span>
              </span>
            )}
          </div>

          <p className="font-body text-sm sm:text-base text-scrapbook-brown leading-relaxed">
            “{item.caption}”
          </p>
        </motion.div>

        {/* 3. Continue Button */}
        <div className="w-full pt-1">
          <button
            onClick={onNext}
            className="w-full py-3 px-6 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{item.buttonText || 'ไปต่อกันเถอะ 💗'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Fullscreen Image Zoom Modal */}
      <ImageZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        images={resolvedImages}
        currentIndex={frontIndex}
        onIndexChange={(newIdx) => setFrontIndex(newIdx)}
        title={item.title}
        date={item.date}
        caption={item.caption}
      />
    </div>
  );
};
