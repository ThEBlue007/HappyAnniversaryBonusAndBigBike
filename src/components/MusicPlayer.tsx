import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { siteContent } from '../content';

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
            console.log("Audio play prevented:", err);
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
      // Loop smoothly
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
      <div className="fixed bottom-4 right-4 z-40 max-w-[90vw] transition-all duration-300">
        {!isExpanded ? (
          // Compact Mini Pill / Badge
          <div className="flex items-center gap-2 bg-[#fdfbf7]/95 backdrop-blur-md border border-[#ecd9c6] rounded-full p-1.5 pr-3 shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
            {/* Spinning Vinyl Button */}
            <button
              onClick={togglePlay}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center bg-[#2d221c] text-white shadow-sm overflow-hidden transition-all ${
                isPlaying ? 'animate-spin-slow' : ''
              }`}
              title={isPlaying ? "หยุดเพลง" : "กดเปิดเพลง"}
              aria-label="Toggle play music"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-1 rounded-full border border-white/20 border-dashed pointer-events-none" />
              <div className="absolute inset-2.5 rounded-full border border-white/10 pointer-events-none" />
              <div className="w-3.5 h-3.5 rounded-full bg-scrapbook-pink-400 border border-white flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
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
                {isPlaying ? musicData.artist : 'แตะเพื่อเปิดเพลงคลอเบา ๆ ♡'}
              </span>
            </div>

            {/* Quick Play/Pause button */}
            <button
              onClick={togglePlay}
              className="w-7 h-7 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-600 flex items-center justify-center hover:bg-scrapbook-pink-200 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
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
                  เครื่องเล่นเพลงความทรงจำ
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-scrapbook-brown-light hover:text-scrapbook-brown p-1 rounded-full hover:bg-[#faf4ea]"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Album Cover & Titles */}
            <div className="flex items-center gap-3.5 mb-3">
              <div 
                className={`w-14 h-14 rounded-full overflow-hidden shadow-md border-2 border-white flex-shrink-0 relative ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                <img
                  src={musicData.albumCover}
                  alt={musicData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-3.5 h-3.5 rounded-full bg-white border border-[#4a3a30]" />
                </div>
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
              {isPlaying ? '♪ เพลงกำลังเล่นคลอเบา ๆ ให้บรรยากาศอบอุ่นขึ้นนะ' : 'แตะ "เปิดเพลงคลอ" เพื่อฟังเพลงเบา ๆ ไปพร้อมกับการอ่านนะ ♡'}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
