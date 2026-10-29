import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Calendar } from 'lucide-react';

interface VideoZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  title: string;
  date?: string;
  caption?: string;
  sticker?: string;
}

export const VideoZoomModal: React.FC<VideoZoomModalProps> = ({
  isOpen,
  onClose,
  src,
  poster,
  title,
  date,
  caption,
  sticker = '♡',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const hideControlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && isOpen) {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Reset state and stop video when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setProgress(0);
      setHasError(false);
      setShowControls(true);
      // Wait for mount then auto play or wait for user click
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsPlaying(true);
            window.dispatchEvent(new CustomEvent('pause-bg-music'));
          }).catch(() => {
            // Browser autoplay restrictions - user will tap to play
            setIsPlaying(false);
          });
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('resume-bg-music'));
    }
  }, [isOpen, src]);

  // Make sure background music is resumed on unmount
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('resume-bg-music'));
    };
  }, []);

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration || 0);
    // Detect aspect ratio: vertical vs horizontal
    if (v.videoHeight > v.videoWidth) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setCurrentTime(v.currentTime);
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
    window.dispatchEvent(new CustomEvent('resume-bg-music'));
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
        .catch(() => {
          setHasError(true);
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

  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const elem = containerRef.current || videoRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, []);

  // Format seconds to mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Activity timer to auto-hide controls while playing
  const handleUserActivity = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    if (isPlaying) {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none overflow-y-auto"
        onClick={onClose}
        onMouseMove={handleUserActivity}
        onTouchStart={handleUserActivity}
      >
        {/* Close Button Top-Right */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
          title="ปิด (Esc)"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 12 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full flex flex-col items-center my-auto"
        >
          {/* Framed Polaroid-style Zoom Box */}
          <div className="bg-white p-3 sm:p-4 pb-4 rounded-2xl shadow-2xl max-w-full w-full flex flex-col items-center border border-white/20">
            {/* The Video Container with Auto-detected Aspect Ratio */}
            <div
              ref={containerRef}
              className={`relative rounded-xl overflow-hidden flex items-center justify-center bg-[#150f0e] shadow-inner group w-full ${
                isPortrait
                  ? 'max-h-[58vh] sm:max-h-[64vh] aspect-[9/16]'
                  : 'max-h-[55vh] sm:max-h-[60vh] aspect-video'
              }`}
            >
              {hasError ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-white/80 gap-2">
                  <p className="font-cute text-sm text-pink-300">ขออภัย โหลดคลิปไม่สำเร็จ</p>
                  <p className="font-body text-xs text-white/50">{src}</p>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={src}
                    poster={poster}
                    preload="auto"
                    playsInline
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onError={() => setHasError(true)}
                    onClick={() => togglePlay()}
                    className="w-full h-full object-contain cursor-pointer"
                  />

                  {/* Big Play Button Overlay when paused */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer group"
                      aria-label="Play video"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-scrapbook-pink-500/90 hover:bg-scrapbook-pink-500 text-white flex items-center justify-center shadow-lg backdrop-blur-xs pl-1"
                      >
                        <Play size={28} fill="currentColor" />
                      </motion.div>
                    </button>
                  )}

                  {/* Romantic Custom Controls Bar */}
                  <div
                    className={`absolute bottom-0 inset-x-0 p-3 pt-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col gap-2 transition-opacity duration-300 pointer-events-auto ${
                      showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {/* Progress Bar / Seekbar */}
                    <div
                      className="w-full h-1.5 hover:h-2.5 bg-white/30 hover:bg-white/40 rounded-full cursor-pointer relative overflow-hidden transition-all"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-scrapbook-pink-400 to-scrapbook-pink-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-3">
                        {/* Play/Pause */}
                        <button
                          onClick={togglePlay}
                          className="hover:text-scrapbook-pink-300 transition-colors p-1"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
                        </button>

                        {/* Mute/Unmute */}
                        <button
                          onClick={toggleMute}
                          className="hover:text-scrapbook-pink-300 transition-colors p-1"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                        </button>

                        {/* Time stamp */}
                        <span className="font-cute text-[11px] text-white/80 tabular-nums">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Portrait / Landscape badge */}
                        <span className="px-2 py-0.5 rounded-full bg-white/15 text-white/80 font-cute text-[10px]">
                          {isPortrait ? 'แนวตั้ง ♡' : 'แนวนอน ♡'}
                        </span>

                        {/* Fullscreen button */}
                        <button
                          onClick={toggleFullscreen}
                          className="hover:text-scrapbook-pink-300 transition-colors p-1"
                          title="เต็มหน้าจอ"
                          aria-label="Fullscreen"
                        >
                          <Maximize2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Video Caption & Story Info Below Video */}
            <div className="w-full pt-3 px-1 text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="font-cute text-xs sm:text-sm text-scrapbook-pink-500 font-semibold">
                  {title}
                </span>
                {date && (
                  <span className="flex items-center gap-1 font-cute text-xs text-scrapbook-brown-light">
                    <Calendar size={11} className="text-scrapbook-pink-400" />
                    <span>{date}</span>
                  </span>
                )}
                <span className="text-scrapbook-pink-400 text-xs">{sticker}</span>
              </div>

              {caption && (
                <p className="font-body text-xs sm:text-sm text-scrapbook-brown leading-relaxed max-w-md mx-auto line-clamp-3">
                  “{caption}”
                </p>
              )}
            </div>
          </div>

          <p className="font-cute text-[11px] text-white/70 mt-2.5 text-center">
            แตะที่ว่างนอกคลิป หรือกดปุ่ม ✕ เพื่อปิด ♡
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
