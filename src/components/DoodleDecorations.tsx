import React from 'react';

// Cute hand-drawn heart
export const DoodleHeart: React.FC<{ className?: string; fill?: string }> = ({ 
  className = "w-5 h-5", 
  fill = "#f0718f" 
}) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill={fill}
      stroke="#b24d67"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Cute hand-drawn flower (Daisy)
export const DoodleFlower: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="16" cy="16" r="4" fill="#fed7aa" stroke="#c27d38" strokeWidth="1.5" />
    <path d="M16 4C14.5 7 14.5 10 16 12C17.5 10 17.5 7 16 4Z" fill="#fff" stroke="#d5b99a" strokeWidth="1.2" />
    <path d="M16 20C14.5 22 14.5 25 16 28C17.5 25 17.5 22 16 20Z" fill="#fff" stroke="#d5b99a" strokeWidth="1.2" />
    <path d="M4 16C7 14.5 10 14.5 12 16C10 17.5 7 17.5 4 16Z" fill="#fff" stroke="#d5b99a" strokeWidth="1.2" />
    <path d="M20 16C22 14.5 25 14.5 28 16C25 17.5 22 17.5 20 16Z" fill="#fff" stroke="#d5b99a" strokeWidth="1.2" />
    <path d="M7.5 7.5C9.5 9.5 11 11.5 13 13C11.5 11 9.5 9.5 7.5 7.5Z" fill="#fff" stroke="#d5b99a" strokeWidth="1.2" />
    <path d="M19 19C21 20.5 22.5 22.5 24.5 24.5C22.5 22.5 20.5 21 19 19Z" fill="#fff" stroke="#d5b99a" strokeWidth="1.2" />
    <path d="M24.5 7.5C22.5 9.5 21 11.5 19 13C20.5 11 22.5 9.5 24.5 7.5Z" fill="#fff" stroke="#d5b99a" strokeWidth="1.2" />
    <path d="M13 19C11 20.5 9.5 22.5 7.5 24.5C9.5 22.5 11.5 21 13 19Z" fill="#fff" stroke="#d5b99a" strokeWidth="1.2" />
  </svg>
);

// Cute hand-drawn sparkle / 4-point star
export const DoodleSparkle: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-5 h-5", 
  color = "#f59e0b" 
}) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z"
      fill={color}
      opacity="0.85"
    />
  </svg>
);

// Cute Washi Tape Strip
export const WashiTape: React.FC<{
  color?: 'pink' | 'yellow' | 'blue' | 'green' | 'peach';
  className?: string;
  rotation?: number;
}> = ({ color = 'pink', className = '', rotation = 0 }) => {
  const colorMap = {
    pink: 'bg-[#fbc5d0]/80 border-t border-b border-[#f49bb0]/50',
    yellow: 'bg-[#fef08a]/80 border-t border-b border-[#fde047]/50',
    blue: 'bg-[#bae6fd]/80 border-t border-b border-[#7dd3fc]/50',
    green: 'bg-[#bbf7d0]/80 border-t border-b border-[#86efac]/50',
    peach: 'bg-[#fed7aa]/80 border-t border-b border-[#fdba74]/50',
  };

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`h-6 w-24 washi-tape ${colorMap[color]} shadow-sm pointer-events-none ${className}`}
    >
      {/* Decorative dashed edge simulation */}
      <div className="w-full h-full opacity-40 flex items-center justify-around overflow-hidden">
        <span className="text-[9px] tracking-widest text-[#785b47] select-none font-cute">♡ ♡ ♡</span>
      </div>
    </div>
  );
};

// Cute Polaroid Placeholder Illustration (เมื่อยังไม่ได้ใส่รูปจริง)
export const PolaroidPlaceholder: React.FC<{
  index: number;
  label?: string;
  onClickChange?: () => void;
}> = ({ index, label, onClickChange }) => {
  const themes = [
    { bg: 'from-[#ffe4e9] to-[#fff5f7]', icon: '📸', sub: 'ภาพแรกที่เราเริ่มคุยกัน' },
    { bg: 'from-[#fef3c7] to-[#fefce8]', icon: '✨', sub: 'ช่วงเวลาดี ๆ ของเรา' },
    { bg: 'from-[#fce7f3] to-[#fdf2f8]', icon: '🌷', sub: 'รอยยิ้มที่ชอบที่สุด' },
    { bg: 'from-[#e0f2fe] to-[#f0f9ff]', icon: '☕', sub: 'ที่ที่เราไปด้วยกัน' },
    { bg: 'from-[#dcfce7] to-[#f0fdf4]', icon: '🌿', sub: 'ความสุขในวันธรรมดา' },
    { bg: 'from-[#fed7aa] to-[#fff7ed]', icon: '💖', sub: 'เรื่องราวบทต่อไป' },
  ];

  const currentTheme = themes[(index - 1) % themes.length];

  return (
    <div 
      onClick={onClickChange}
      className={`w-full aspect-[4/3] rounded-sm bg-gradient-to-br ${currentTheme.bg} flex flex-col items-center justify-center p-6 text-center cursor-pointer group transition-all duration-300 hover:brightness-95 border border-[#ede3d4] relative overflow-hidden`}
    >
      {/* Subtle paper grain circles */}
      <div className="absolute top-2 right-2 text-xs opacity-30 select-none">✦</div>
      <div className="absolute bottom-2 left-2 text-xs opacity-30 select-none">✦</div>
      
      <div className="w-14 h-14 rounded-full bg-white/70 shadow-sm flex items-center justify-center text-2xl mb-2.5 group-hover:scale-110 transition-transform">
        <span>{currentTheme.icon}</span>
      </div>

      <div className="font-cute text-sm text-scrapbook-brown-dark font-semibold">
        {label || `รูปภาพความทรงจำที่ ${index}`}
      </div>
      
      <div className="font-body text-xs text-scrapbook-brown-light mt-1">
        {currentTheme.sub}
      </div>

      <div className="mt-3 px-2.5 py-1 rounded-full bg-white/80 border border-[#e8ded0] text-[11px] font-cute text-scrapbook-pink-500 opacity-90 group-hover:bg-scrapbook-pink-100 group-hover:text-scrapbook-pink-600 transition-colors shadow-2xs">
        แตะเพื่อใส่รูป / พรีวิวรูปนี้ ♡
      </div>
    </div>
  );
};
