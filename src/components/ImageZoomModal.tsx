import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
  title: string;
  date?: string;
  caption?: string;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  title,
  date,
  caption,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && images.length > 1) {
        onIndexChange?.((currentIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft' && images.length > 1) {
        onIndexChange?.((currentIndex - 1 + images.length) % images.length);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex] || images[0];
  const hasMultiple = images.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange?.((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange?.((currentIndex + 1) % images.length);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      >
        {/* Close Button Top-Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          title="ปิดหน้าต่างรูปภาพ (Esc)"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Previous Image Arrow */}
        {hasMultiple && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            title="รูปก่อนหน้า"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Next Image Arrow */}
        {hasMultiple && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            title="รูปถัดไป"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full flex flex-col items-center select-none"
        >
          {/* Framed Polaroid-style Zoom Box */}
          <div className="bg-white p-3 sm:p-4 pb-4 sm:pb-5 rounded-2xl shadow-2xl max-w-full flex flex-col items-center border border-white/20">
            {/* The Zoomed Image */}
            <div className="relative max-h-[62vh] sm:max-h-[68vh] rounded-xl overflow-hidden flex items-center justify-center bg-[#1a1412]">
              <img
                src={currentImage}
                alt={title}
                className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-xl select-none"
              />

              {/* Photo Counter Pill (for multi-photo) */}
              {hasMultiple && (
                <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-full bg-black/60 text-white font-cute text-xs backdrop-blur-xs">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Photo Caption & Info Below Photo */}
            <div className="w-full pt-3 px-1 text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="font-cute text-xs text-scrapbook-pink-500 font-semibold">
                  {title}
                </span>
                {date && (
                  <span className="flex items-center gap-1 font-cute text-xs text-scrapbook-brown-light">
                    <Calendar size={11} className="text-scrapbook-pink-400" />
                    <span>{date}</span>
                  </span>
                )}
              </div>

              {caption && (
                <p className="font-body text-xs sm:text-sm text-scrapbook-brown leading-relaxed max-w-md mx-auto">
                  “{caption}”
                </p>
              )}

              {/* Multi-photo switcher heart dots */}
              {hasMultiple && (
                <div className="flex items-center justify-center gap-2 pt-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => onIndexChange?.(idx)}
                      className={`transition-all ${
                        idx === currentIndex
                          ? 'scale-125 text-scrapbook-pink-500'
                          : 'scale-90 text-[#d4c2b2] hover:text-scrapbook-pink-300'
                      }`}
                    >
                      <Heart
                        size={14}
                        className={idx === currentIndex ? 'fill-scrapbook-pink-400' : ''}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="font-cute text-[11px] text-white/70 mt-3 text-center">
            แตะที่ว่างนอกรูป หรือกดปุ่ม ✕ เพื่อปิด ♡
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
