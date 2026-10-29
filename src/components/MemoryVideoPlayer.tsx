/**
 * MemoryVideoPlayer
 * -----------------
 * Scrapbook-styled inline video player for Memory scenes.
 * Wraps a single <video> in a Polaroid-like frame that matches the site theme.
 * Auto-detects portrait vs landscape ratio and supports expanding into full view.
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, AlertCircle, ZoomIn } from 'lucide-react';

interface MemoryVideoPlayerProps {
  src: string;
  poster?: string;
  dateLabel?: string;
  sticker?: string;
  tapeColor?: 'pink' | 'yellow' | 'blue' | 'green' | 'peach';
  rotation?: number;
  onOpenZoom?: () => void;
}

const WASHI_COLORS: Record<string, string> = {
  pink: 'bg-[#fbc5d0]/80 border-t border-b border-[#f49bb0]/50',
  yellow: 'bg-[#fef08a]/80 border-t border-b border-[#fde047]/50',
  blue: 'bg-[#bae6fd]/80 border-t border-b border-[#7dd3fc]/50',
  green: 'bg-[#bbf7d0]/80 border-t border-b border-[#86efac]/50',
  peach: 'bg-[#fed7aa]/80 border-t border-b border-[#fdba74]/50',
};

export const MemoryVideoPlayer: React.FC<MemoryVideoPlayerProps> = ({
  src,
  poster,
  dateLabel,
  sticker = '♡',
  tapeColor = 'pink',
  rotation = 0,
  onOpenZoom,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  // Stop video when unmounting or switching scenes
  useEffect(() => {
    const v = videoRef.current;
    setHasError(false);
    setIsPlaying(false);
    setProgress(0);

    return () => {
      if (v) {
        v.pause();
      }
      window.dispatchEvent(new CustomEvent('resume-bg-music'));
    };
  }, [src]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration || 0);
    setHasLoaded(true);

    // Auto-detect portrait (vertical e.g. 9:16) vs landscape
    if (v.videoHeight > v.videoWidth) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    window.dispatchEvent(new CustomEvent('resume-bg-music'));
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    const mediaErr = v.error;
    if (
      mediaErr &&
      (mediaErr.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED ||
        mediaErr.code === MediaError.MEDIA_ERR_NETWORK ||
        mediaErr.code === MediaError.MEDIA_ERR_DECODE)
    ) {
      setHasError(true);
    }
  };

  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play()
        .then(() => {
          setIsPlaying(true);
          window.dispatchEvent(new CustomEvent('pause-bg-music'));
        })
        .catch((err) => {
          if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
            setHasError(true);
          }
        });
    } else {
      v.pause();
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('resume-bg-music'));
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
    setProgress(ratio * 100);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const washiClass = WASHI_COLORS[tapeColor] ?? WASHI_COLORS.pink;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative w-64 sm:w-72 max-w-full"
    >
      {/* Washi tape on top */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className={`h-6 w-24 washi-tape ${washiClass} shadow-sm`}>
          <div className="w-full h-full opacity-40 flex items-center justify-around overflow-hidden">
            <span className="text-[9px] tracking-widest text-[#785b47] select-none font-cute">♡ ♡ ♡</span>
          </div>
        </div>
      </div>

      {/* Polaroid frame */}
      <div className="bg-white p-2.5 sm:p-3 pb-3 sm:pb-4 rounded-sm border border-[#ede3d4] shadow-polaroid hover:shadow-polaroid-hover transition-shadow">
        {/* Video container — adapts height to portrait vs landscape without stretching */}
        <div
          className={`relative bg-[#1c1412] rounded-xs overflow-hidden flex items-center justify-center border border-[#ece3d6] transition-all duration-300 ${
            isPortrait ? 'aspect-[3/4] max-h-[290px]' : 'aspect-[4/3] max-h-[260px]'
          }`}
          onClick={() => {
            if (onOpenZoom) onOpenZoom();
            else togglePlay();
          }}
        >
          {hasError ? (
            /* Error state */
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#ffe4e9] to-[#fff5f7] p-4 text-center">
              <AlertCircle size={28} className="text-pink-300" />
              <p className="font-cute text-xs text-[#9e8979] leading-relaxed">
                โหลดวิดีโอไม่สำเร็จ<br />
                <span className="text-[11px] text-[#c8b8ab]">ตรวจสอบไฟล์อีกครั้งนะคะ</span>
              </p>
            </div>
          ) : (
            <>
              {/* The Video Element */}
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                preload="metadata"
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onError={handleError}
                className="w-full h-full object-contain select-none cursor-pointer"
                controls={false}
              />

              {/* Cute Zoom Button on top-left of video */}
              {onOpenZoom && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // pause inline video before opening zoom modal
                    if (videoRef.current && !videoRef.current.paused) {
                      videoRef.current.pause();
                      setIsPlaying(false);
                    }
                    onOpenZoom();
                  }}
                  className="absolute top-2 left-2 z-30 px-2 py-1 rounded-full bg-white/90 hover:bg-white text-scrapbook-brown-dark shadow-xs flex items-center gap-1 font-cute text-[10px] transition-all hover:scale-105 active:scale-95 backdrop-blur-2xs border border-[#eddcd0]"
                  title="กดดูคลิปเต็มจอ"
                >
                  <ZoomIn size={12} className="text-scrapbook-pink-500" />
                  <span>ดูคลิปเต็ม ♡</span>
                </button>
              )}

              {/* Orientation pill indicator */}
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-white font-cute text-[9px] backdrop-blur-2xs z-20">
                {isPortrait ? 'แนวตั้ง 🎬' : 'วิดีโอ 🎬'}
              </div>

              {/* Play Overlay (when paused) */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 shadow-md border border-pink-100 text-pink-500 font-cute text-xs backdrop-blur-xs">
                    <Play size={14} fill="currentColor" />
                    <span>แตะเพื่อดูคลิป ♡</span>
                  </span>
                </div>
              )}

              {/* Bottom Control Bar */}
              {hasLoaded && (
                <div
                  className="absolute bottom-0 inset-x-0 px-2.5 pb-2 pt-6 z-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
                  }}
                >
                  <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Play / Pause toggle */}
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'หยุด' : 'เล่น'}
                      className="text-white hover:text-scrapbook-pink-200 flex-shrink-0 transition-colors"
                    >
                      {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
                    </button>

                    {/* Seek bar */}
                    <div
                      className="flex-1 h-1.5 rounded-full bg-white/30 hover:bg-white/50 cursor-pointer relative overflow-hidden"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full rounded-full bg-scrapbook-pink-400 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Time format */}
                    <span className="font-cute text-[9px] text-white/90 flex-shrink-0 tabular-nums">
                      {fmt(currentTime)}/{fmt(duration)}
                    </span>

                    {/* Mute toggle */}
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
                      className="text-white hover:text-scrapbook-pink-200 flex-shrink-0 transition-colors"
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Caption strip below video */}
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="font-hand text-sm sm:text-base text-scrapbook-brown-dark tracking-wide truncate">
            {dateLabel || 'Video Memory'}
          </span>
          <span className="text-scrapbook-pink-400 text-xs">{sticker}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryVideoPlayer;
