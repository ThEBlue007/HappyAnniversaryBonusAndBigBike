/**
 * MemoryVideoPlayer
 * -----------------
 * Scrapbook-styled inline video player for Memory scenes.
 * Wraps a single <video> in a Polaroid-like frame that matches the site theme.
 *
 * Usage:
 *   <MemoryVideoPlayer src="/videos/memory-2.mp4" poster="/images/memory-2-cover.jpg" />
 *
 * File placement:
 *   • Video  → public/videos/<filename>.mp4
 *   • Poster → public/images/<filename>.jpg  (optional but recommended)
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';

interface MemoryVideoPlayerProps {
  src: string;
  poster?: string;
  /** Label shown in bottom-left of the polaroid frame (replaces the date text) */
  dateLabel?: string;
  /** Emoji sticker shown in bottom-right of the frame */
  sticker?: string;
  /** Washi tape colour to use on top of the frame */
  tapeColor?: 'pink' | 'yellow' | 'blue' | 'green' | 'peach';
  rotation?: number;
}

const WASHI_COLORS: Record<string, string> = {
  pink:  'bg-[#fbc5d0]/80 border-t border-b border-[#f49bb0]/50',
  yellow:'bg-[#fef08a]/80 border-t border-b border-[#fde047]/50',
  blue:  'bg-[#bae6fd]/80 border-t border-b border-[#7dd3fc]/50',
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
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Stop / clean up when component unmounts (e.g. user navigates away mid-play)
  useEffect(() => {
    const v = videoRef.current;
    return () => {
      if (v) {
        v.pause();
        v.src = '';
        v.load();
      }
    };
  }, []);

  // Keep progress bar in sync
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
    setHasLoaded(true);
  };

  const handleEnded = () => setIsPlaying(false);

  // Only treat it as a fatal error when the video *source* itself fails to load.
  // `<video>` fires onerror for poster-image failures too (especially on Safari),
  // so we inspect networkState/error.code to distinguish the two.
  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const v = e.currentTarget;
    // NETWORK_NO_SOURCE (3) or a MediaError means the video src itself is broken
    const mediaErr = v.error;
    if (mediaErr && (mediaErr.code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED ||
                     mediaErr.code === MediaError.MEDIA_ERR_NETWORK ||
                     mediaErr.code === MediaError.MEDIA_ERR_DECODE)) {
      setHasError(true);
    }
    // Otherwise (e.g. poster failed) — silently ignore, the video can still play
  };

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch((err) => {
        // Only show error for real failures, not browser-policy interruptions
        if (err.name !== 'AbortError' && err.name !== 'NotAllowedError') {
          setHasError(true);
        }
      });
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
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
    setProgress(ratio);
  }, []);

  // Formatted time helper
  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const currentTime = videoRef.current?.currentTime ?? 0;
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
      <div className="bg-white p-2.5 sm:p-3 pb-4 sm:pb-5 rounded-sm border border-[#ede3d4] shadow-polaroid hover:shadow-polaroid-hover transition-shadow">

        {/* Video container — maintains 4:3 ratio */}
        <div className="relative aspect-[4/3] bg-[#1a1210] rounded-xs overflow-hidden flex items-center justify-center border border-[#ece3d6]">

          {hasError ? (
            /* ── Error state ── */
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#ffe4e9] to-[#fff5f7] p-4 text-center">
              <AlertCircle size={28} className="text-pink-300" />
              <p className="font-cute text-xs text-[#9e8979] leading-relaxed">
                โหลดวิดีโอไม่สำเร็จ<br />
                <span className="text-[11px] text-[#c8b8ab]">ตรวจสอบไฟล์อีกครั้งนะคะ</span>
              </p>
            </div>
          ) : (
            <>
              {/* The actual video element */}
              <video
                src={src}
                poster={poster}
                controls
                playsInline
                preload="metadata"
                onError={(e) => {
                  const video = e.currentTarget;

                  console.error('Memory Video Error:', {
                    src: video.currentSrc || video.src,
                    errorCode: video.error?.code,
                    errorMessage: video.error?.message,
                    networkState: video.networkState,
                    readyState: video.readyState,
                  });
                }}
              />

              {/* Big play overlay (shown when paused / not yet played) */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  aria-label="เล่นวิดีโอ"
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  {/* Semi-transparent backdrop */}
                  <span className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  {/* Play button pill */}
                  <span className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-md border border-pink-100 text-pink-500 font-cute text-xs group-hover:bg-white group-hover:scale-105 transition-all">
                    <Play size={16} fill="currentColor" />
                    <span>เล่นวิดีโอ ♡</span>
                  </span>
                </button>
              )}

              {/* Tap-to-pause overlay (shown while playing) */}
              {isPlaying && (
                <button
                  onClick={togglePlay}
                  aria-label="หยุดวิดีโอ"
                  className="absolute inset-0 z-10 flex items-end justify-end p-2"
                  style={{ background: 'transparent' }}
                />
              )}

              {/* Bottom control bar (visible when video has loaded metadata) */}
              {hasLoaded && (
                <div
                  className="absolute bottom-0 left-0 right-0 px-2 pb-1.5 pt-6 z-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)',
                  }}
                >
                  <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Play / Pause button */}
                    <button
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'หยุด' : 'เล่น'}
                      className="text-white/90 hover:text-white flex-shrink-0 transition-colors"
                    >
                      {isPlaying
                        ? <Pause size={14} fill="currentColor" />
                        : <Play size={14} fill="currentColor" />
                      }
                    </button>

                    {/* Seek bar */}
                    <div
                      className="flex-1 h-1 rounded-full bg-white/30 cursor-pointer relative overflow-hidden"
                      onClick={handleSeek}
                      role="slider"
                      aria-label="ตำแหน่งวิดีโอ"
                      aria-valuenow={Math.round(progress * 100)}
                    >
                      <div
                        className="h-full rounded-full bg-pink-300 transition-all"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>

                    {/* Time */}
                    <span className="font-cute text-[9px] text-white/80 flex-shrink-0 tabular-nums">
                      {fmt(currentTime)}/{fmt(duration)}
                    </span>

                    {/* Mute toggle */}
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
                      className="text-white/90 hover:text-white flex-shrink-0 transition-colors"
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Caption strip below video (mirrors the photo caption area) */}
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="font-hand text-sm sm:text-base text-scrapbook-brown-dark tracking-wide truncate">
            {dateLabel || 'Video Memory'}
          </span>
          <span className="text-scrapbook-pink-400 text-xs">
            {sticker}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryVideoPlayer;
