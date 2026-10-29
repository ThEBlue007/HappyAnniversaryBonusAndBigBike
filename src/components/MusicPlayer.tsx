import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { siteContent } from '../content';

// Reusable Romantic Vinyl Record Disc Component
const VinylDisc: React.FC<{
  isPlaying: boolean;
  size?: 'sm' | 'md';
  coverUrl?: string;
}> = ({ isPlaying, size = 'md', coverUrl }) => {
  // Check if coverUrl is a valid image (not an audio file like .mp3)
  const isImageValid = Boolean(
    coverUrl &&
    coverUrl.trim() !== '' &&
    !coverUrl.match(/\.(mp3|wav|ogg|m4a|aac)$/i)
  );

  const [imgError, setImgError] = useState<boolean>(false);

  const sizeClasses = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14 sm:w-16 sm:h-16';
  const centerSizes = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6 sm:w-7 sm:h-7';

  return (
    <div
      className={`relative ${sizeClasses} rounded-full flex items-center justify-center bg-gradient-to-tr from-[#140e0b] via-[#2a1e17] to-[#120d0a] shadow-md border-2 border-[#fffdfa] flex-shrink-0 overflow-hidden ${
        isPlaying ? 'animate-spin-slow' : ''
      }`}
    >
      {/* Vinyl Grooves (Concentric Circles) */}
      <div className="absolute inset-1 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute inset-2 rounded-full border border-white/15 border-dashed pointer-events-none" />
      <div className="absolute inset-3 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />

      {/* Vinyl Light Glare / Sheen effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.2) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.2) 225deg, transparent 270deg)',
        }}
      />

      {/* Center Label (Sticker / Image) */}
      {isImageValid && !imgError ? (
        <div className={`relative ${centerSizes} rounded-full overflow-hidden border border-white shadow-xs`}>
          <img
            src={coverUrl}
            alt="Album Cover"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-[#fdfbf7] border border-[#3a281e]" />
          </div>
        </div>
      ) : (
        /* Cute Romantic Vinyl Sticker Label with Heart */
        <div className={`relative ${centerSizes} rounded-full bg-gradient-to-br from-[#ffd5df] to-[#f8a5b7] border border-[#f0718f]/70 flex flex-col items-center justify-center shadow-xs`}>
          <span className="text-[8px] sm:text-[9px] text-[#8a334d] font-cute select-none leading-none">
            ♡
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#fdfbf7] border border-[#52291d] mt-0.5" />
        </div>
      )}
    </div>
  );
};

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicData = siteContent.music;

  // Handle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log('Audio play prevented:', err);
            setIsPlaying(false);
          });
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // Track if music was playing before a video paused it
  const wasPlayingBeforeVideoRef = useRef<boolean>(false);

  // Listen for global video play/pause events to pause/resume background music automatically
  useEffect(() => {
    const handlePauseBgMusic = () => {
      if (audioRef.current && isPlaying) {
        wasPlayingBeforeVideoRef.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleResumeBgMusic = () => {
      if (audioRef.current && wasPlayingBeforeVideoRef.current) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
        wasPlayingBeforeVideoRef.current = false;
      }
    };

    window.addEventListener('pause-bg-music', handlePauseBgMusic);
    window.addEventListener('resume-bg-music', handleResumeBgMusic);

    return () => {
      window.removeEventListener('pause-bg-music', handlePauseBgMusic);
      window.removeEventListener('resume-bg-music', handleResumeBgMusic);
    };
  }, [isPlaying]);

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <>
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={musicData.audioSrc}
        preload="metadata"
        loop
      />

      {/* Floating Scrapbook Music Player */}
      <div className="fixed bottom-4 right-4 z-40 max-w-[90vw] transition-all duration-300 select-none">
        {!isExpanded ? (
          // Compact Mini Pill / Badge
          <div className="flex items-center gap-2 bg-[#fdfbf7]/95 backdrop-blur-md border border-[#ecd9c6] rounded-full p-1.5 pr-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
            {/* Spinning Vinyl Record Disc */}
            <button
              onClick={togglePlay}
              className="relative p-0 border-0 bg-transparent cursor-pointer rounded-full"
              title={isPlaying ? 'หยุดเพลง' : 'กดเปิดเพลง'}
              aria-label="Toggle play music"
            >
              <VinylDisc isPlaying={isPlaying} size="sm" coverUrl={musicData.albumCover} />
            </button>

            {/* Song Info & Quick Play */}
            <div
              className="flex flex-col cursor-pointer max-w-[130px] sm:max-w-[160px]"
              onClick={() => setIsExpanded(true)}
            >
              <div className="flex items-center gap-1">
                <span className="font-cute text-xs text-scrapbook-brown font-semibold truncate">
                  {musicData.title}
                </span>
                {isPlaying && (
                  <span className="flex space-x-0.5 items-end h-3">
                    <span className="w-0.5 h-2 bg-scrapbook-pink-500 animate-pulse" />
                    <span className="w-0.5 h-3 bg-scrapbook-pink-400 animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-scrapbook-pink-500 animate-pulse delay-150" />
                  </span>
                )}
              </div>
              <span className="font-body text-[10px] text-scrapbook-brown-light truncate">
                {isPlaying ? musicData.artist : (musicData.floatingPrompt || 'แตะเพื่อเปิดเพลงคลอเบา ๆ ♡')}
              </span>
            </div>

            {/* Quick Play/Pause button */}
            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-600 flex items-center justify-center hover:bg-scrapbook-pink-200 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
            </button>

            {/* Expand details button */}
            <button
              onClick={() => setIsExpanded(true)}
              className="text-scrapbook-brown-light hover:text-scrapbook-brown p-1"
              title="ขยายเครื่องเล่นเพลง"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        ) : (
          // Expanded Player Card
          <div className="w-72 sm:w-80 bg-[#fffdf9] rounded-2xl border-2 border-[#ecd9c6] p-4 shadow-xl relative animate-in fade-in duration-200">
            {/* Header with minimize button */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#f4ece1]">
              <div className="flex items-center gap-1.5">
                <Music size={14} className="text-scrapbook-pink-500" />
                <span className="font-cute text-xs text-scrapbook-brown font-semibold">
                  เครื่องเล่นแผ่นเสียงความทรงจำ
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-scrapbook-brown-light hover:text-scrapbook-brown p-1 rounded-full hover:bg-[#faf4ea]"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Vinyl Record Disc & Titles */}
            <div className="flex items-center gap-3.5 mb-3">
              <div
                className="cursor-pointer"
                onClick={togglePlay}
                title={isPlaying ? 'แตะเพื่อหยุดเพลง' : 'แตะเพื่อเล่นเพลง'}
              >
                <VinylDisc isPlaying={isPlaying} size="md" coverUrl={musicData.albumCover} />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-cute text-sm font-bold text-scrapbook-brown-dark truncate">
                  {musicData.title}
                </h4>
                <p className="font-body text-xs text-scrapbook-brown-light truncate">
                  {musicData.artist}
                </p>
                <p className="font-hand text-xs text-scrapbook-pink-500 mt-0.5">
                  Our Special Song ♡
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#f4ece1] h-1.5 rounded-full overflow-hidden mb-3">
              <div
                className="bg-scrapbook-pink-400 h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls: Play/Pause and Volume */}
            <div className="flex items-center justify-between gap-3">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-scrapbook-pink-500 text-white font-cute text-xs font-semibold shadow hover:bg-scrapbook-pink-600 transition-all hover:scale-105 active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Pause size={13} />
                    <span>หยุดเพลง</span>
                  </>
                ) : (
                  <>
                    <Play size={13} className="ml-0.5" />
                    <span>เปิดเพลงคลอ ♡</span>
                  </>
                )}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 flex-1 max-w-[120px]">
                <button
                  onClick={toggleMute}
                  className="text-scrapbook-brown-light hover:text-scrapbook-brown transition-colors p-1"
                >
                  {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-scrapbook-pink-500 h-1 bg-[#ede3d4] rounded-lg cursor-pointer"
                  title="ปรับความดังเสียง"
                />
              </div>
            </div>

            {/* Small Hint for Sno */}
            <div className="mt-2.5 pt-2 border-t border-[#f4ece1] text-center font-body text-[11px] text-scrapbook-brown-light/80">
              {isPlaying
                ? '♪ แผ่นเสียงกำลังหมุนเล่นเพลงคลอเบา ๆ ให้บรรยากาศอบอุ่นขึ้นนะ'
                : 'แตะ "เปิดเพลงคลอ" เพื่อฟังเพลงเบา ๆ ไปพร้อมกับการอ่านนะ ♡'}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
