import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Camera } from 'lucide-react';
import type { MemoryItem } from '../types';
import { WashiTape, PolaroidPlaceholder } from './DoodleDecorations';

interface SceneMemoryProps {
  item: MemoryItem;
  imageSrc: string;
  onNext: () => void;
  onTriggerPicker?: () => void;
}

export const SceneMemory: React.FC<SceneMemoryProps> = ({
  item,
  imageSrc,
  onNext,
  onTriggerPicker,
}) => {
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 relative select-none">
      {/* Container for Polaroid and Caption, sized to fit comfortably inside 100dvh */}
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center space-y-4">
        {/* 1. Polaroid Card with Scrapbook Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotate: (item.rotation || 0) * 2, y: 20 }}
          animate={{ opacity: 1, scale: 1, rotate: item.rotation || 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -15 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative group w-full flex justify-center"
        >
          {/* Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
            <WashiTape color={item.tapeColor || 'pink'} rotation={-1.5} className="w-24 sm:w-28" />
          </div>

          {/* Polaroid Frame */}
          <div className="bg-white p-3 sm:p-4 pb-5 sm:pb-6 rounded-sm shadow-polaroid hover:shadow-polaroid-hover transition-shadow border border-[#ede3d4] w-68 sm:w-76 max-w-full">
            {/* Photo Box */}
            <div className="relative aspect-[4/3] bg-[#f7f2ea] rounded-xs overflow-hidden flex items-center justify-center border border-[#ece3d6]">
              {imgError ? (
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
                />
              )}

              {/* Try Image Overlay Button for Blue */}
              {!imgError && onTriggerPicker && (
                <button
                  onClick={onTriggerPicker}
                  className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-[10px] px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-cute"
                >
                  <Camera size={10} />
                  <span>ลองเปลี่ยนรูป</span>
                </button>
              )}
            </div>

            {/* Handwritten Note under Photo */}
            <div className="mt-2.5 flex items-center justify-between px-1">
              <span className="font-hand text-base sm:text-lg text-scrapbook-brown-dark tracking-wide">
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

        {/* 2. Story Caption Card (Fades in just after polaroid) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
          className="w-full bg-[#fffdfa] rounded-2xl p-4 sm:p-5 border border-[#ede1d3] shadow-soft relative"
        >
          {/* Header & Title */}
          <div className="flex items-center justify-between mb-2">
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

          {/* Story Caption */}
          <p className="font-body text-sm sm:text-base text-scrapbook-brown leading-relaxed">
            “{item.caption}”
          </p>
        </motion.div>

        {/* 3. Action / Continue Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="w-full pt-1"
        >
          <button
            onClick={onNext}
            className="w-full py-3 px-6 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{item.buttonText || 'ไปต่อกันเถอะ 💗'}</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
