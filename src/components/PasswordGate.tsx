import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DoodleHeart, DoodleSparkle, DoodleFlower } from './DoodleDecorations';

interface PasswordGateProps {
  onUnlock: () => void;
}

const CORRECT_PASSWORD = '51168';
const NUM_DIGITS = 5;

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Animated heart-lock SVG that morphs open on unlock */
const HeartLock: React.FC<{ isUnlocking: boolean; isUnlocked: boolean }> = ({
  isUnlocking,
  isUnlocked,
}) => (
  <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
    {/* Glow ring */}
    <AnimatePresence>
      {isUnlocking && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.5, opacity: [0, 0.6, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full bg-pink-200"
        />
      )}
    </AnimatePresence>

    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md"
      animate={isUnlocking ? { scale: [1, 1.18, 1], rotate: [0, -6, 6, 0] } : {}}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Lock body */}
      <motion.rect
        x="14"
        y="30"
        width="36"
        height="26"
        rx="7"
        fill="#f8a5b7"
        stroke="#e2486f"
        strokeWidth="2"
        animate={isUnlocked ? { fill: '#fccdd7', stroke: '#f0718f' } : {}}
        transition={{ duration: 0.4 }}
      />
      {/* Lock shackle — moves up when unlocked */}
      <motion.path
        d={isUnlocked ? 'M22 30 V18 Q22 8 32 8 Q42 8 42 18 V28' : 'M22 30 V22 Q22 10 32 10 Q42 10 42 22 V30'}
        stroke="#e2486f"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        animate={isUnlocked ? { stroke: '#f0718f', d: 'M22 30 V18 Q22 8 32 8 Q42 8 42 18 V22' } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      {/* Heart keyhole */}
      <motion.path
        d="M32 38 C32 38 27 34 27 31.5 C27 29.5 28.8 28 30.5 28.5 C31.2 28.7 31.7 29.1 32 29.6 C32.3 29.1 32.8 28.7 33.5 28.5 C35.2 28 37 29.5 37 31.5 C37 34 32 38 32 38Z"
        fill="white"
        opacity="0.85"
        animate={isUnlocked ? { opacity: 1, fill: '#fff5f7' } : {}}
        transition={{ duration: 0.3 }}
      />
      {/* Keyhole stem */}
      <rect x="30.5" y="37" width="3" height="5" rx="1.5" fill="white" opacity="0.85" />
    </motion.svg>

    {/* Star sparks that appear on unlock */}
    <AnimatePresence>
      {isUnlocked && (
        <>
          {[
            { x: -28, y: -20, delay: 0.1 },
            { x: 28, y: -24, delay: 0.15 },
            { x: -32, y: 10, delay: 0.05 },
            { x: 32, y: 8, delay: 0.2 },
            { x: 0, y: -36, delay: 0.08 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.1, 0], x: pos.x, y: pos.y }}
              transition={{ duration: 0.7, delay: pos.delay, ease: 'easeOut' }}
              className="absolute text-yellow-400 text-xs pointer-events-none"
            >
              ✦
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  </div>
);

/** Individual digit input box */
const DigitBox: React.FC<{
  value: string;
  isFocused: boolean;
  isError: boolean;
  isSuccess: boolean;
  index: number;
}> = ({ value, isFocused, isError, isSuccess, index }) => (
  <motion.div
    animate={
      isError
        ? { x: [0, -6, 6, -5, 5, -3, 3, 0], borderColor: ['#f0718f', '#f8a5b7', '#f0718f'] }
        : isSuccess
          ? { scale: [1, 1.12, 1], borderColor: '#f0718f' }
          : {}
    }
    transition={{ duration: isError ? 0.45 : 0.3, delay: isError ? index * 0.03 : 0 }}
    className={`
      relative w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center
      text-2xl sm:text-3xl font-hand font-bold transition-all duration-200
      ${isSuccess
        ? 'bg-pink-50 border-pink-400 text-pink-500 shadow-[0_0_16px_4px_rgba(240,113,143,0.25)]'
        : isError
          ? 'bg-pink-50 border-pink-300 text-pink-400'
          : isFocused
            ? 'bg-white border-pink-400 shadow-[0_0_0_3px_rgba(240,113,143,0.18)] text-pink-500'
            : value
              ? 'bg-white border-pink-300 text-pink-500 shadow-soft'
              : 'bg-white/80 border-[#eddcd0] text-transparent'
      }
    `}
  >
    {value ? (
      <span className="select-none">{value}</span>
    ) : (
      <span
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          isFocused ? 'bg-pink-300 scale-100' : 'bg-[#eddcd0] scale-75'
        }`}
      />
    )}
    {/* bottom accent line */}
    <span
      className={`absolute bottom-1.5 left-3 right-3 h-0.5 rounded-full transition-all duration-200 ${
        isFocused ? 'bg-pink-300' : 'bg-transparent'
      }`}
    />
  </motion.div>
);

// ─── Floating hearts on unlock ────────────────────────────────────────────────
const FloatingHearts: React.FC = () => (
  <>
    {[
      { x: '-60%', delay: 0, size: 'text-xl' },
      { x: '55%', delay: 0.12, size: 'text-base' },
      { x: '-20%', delay: 0.22, size: 'text-2xl' },
      { x: '30%', delay: 0.08, size: 'text-sm' },
      { x: '-45%', delay: 0.18, size: 'text-base' },
      { x: '70%', delay: 0.28, size: 'text-xl' },
    ].map((h, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 0, x: h.x, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0], y: -120, scale: [0.5, 1, 0.8] }}
        transition={{ duration: 1.2, delay: h.delay, ease: 'easeOut' }}
        className={`absolute pointer-events-none ${h.size}`}
        style={{ left: '50%' }}
      >
        ♡
      </motion.div>
    ))}
  </>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [digits, setDigits] = useState<string[]>(Array(NUM_DIGITS).fill(''));
  const [status, setStatus] = useState<'idle' | 'error' | 'unlocking' | 'unlocked'>('idle');
  const [errorMsg, setErrorMsg] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  // Single hidden input trick: one <input> captures all keystrokes → distribute to digit boxes
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = Math.min(digits.filter(Boolean).length, NUM_DIGITS - 1);
  // If all digits filled, focus stays "after" last box
  const focusedIndex = digits.every((d) => d !== '') ? NUM_DIGITS : currentIndex;

  // focus the hidden input whenever user taps the digit area
  const focusInput = useCallback(() => {
    hiddenInputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Auto-focus on mount (best-effort; mobile may require gesture)
    const t = setTimeout(() => hiddenInputRef.current?.focus(), 300);
    return () => clearTimeout(t);
  }, []);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (status === 'unlocking' || status === 'unlocked') return;

      const raw = e.target.value.replace(/\D/g, '').slice(0, NUM_DIGITS);
      e.target.value = ''; // always keep hidden input empty; state holds truth

      if (!raw) return;

      setDigits((prev) => {
        const next = [...prev];
        for (let i = 0; i < raw.length; i++) {
          const slot = prev.findIndex((d) => d === '');
          if (slot === -1) break;
          next[slot] = raw[i];
        }
        return next;
      });
      setStatus('idle');
      setErrorMsg(false);
    },
    [status],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (status === 'unlocking' || status === 'unlocked') return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        setDigits((prev) => {
          const next = [...prev];
          // Remove last filled digit
          for (let i = NUM_DIGITS - 1; i >= 0; i--) {
            if (next[i] !== '') {
              next[i] = '';
              break;
            }
          }
          return next;
        });
        setStatus('idle');
        setErrorMsg(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, digits],
  );

  const handleSubmit = useCallback(() => {
    if (status === 'unlocking' || status === 'unlocked') return;
    const entered = digits.join('');
    if (entered.length < NUM_DIGITS) return;

    if (entered === CORRECT_PASSWORD) {
      setStatus('unlocking');
      setErrorMsg(false);

      // Step sequence
      setTimeout(() => setStatus('unlocked'), 300);
      setTimeout(() => setShowSuccessMsg(true), 600);
      setTimeout(() => onUnlock(), 2600);
    } else {
      setStatus('error');
      setErrorMsg(true);

      setTimeout(() => {
        setDigits(Array(NUM_DIGITS).fill(''));
        setStatus('idle');
        hiddenInputRef.current?.focus();
      }, 1000);
    }
  }, [digits, status, onUnlock]);

  // Auto-submit when all digits filled
  useEffect(() => {
    if (digits.every((d) => d !== '') && status === 'idle') {
      const t = setTimeout(handleSubmit, 120);
      return () => clearTimeout(t);
    }
  }, [digits, status, handleSubmit]);

  const isError = status === 'error';
  const isSuccess = status === 'unlocked' || status === 'unlocking';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 w-full h-[100dvh] flex items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #fff5f7 0%, #fdf2f4 30%, #fefcf8 60%, #fff8f2 100%)',
      }}
    >
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#f8a5b7 0.6px, transparent 0.6px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Floating decorative doodles */}
      <motion.div
        animate={{ y: [-5, 7, -5], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-8 left-5 sm:left-16 opacity-50 pointer-events-none"
      >
        <DoodleFlower className="w-9 h-9 sm:w-12 sm:h-12 text-pink-300" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute top-10 right-6 sm:right-20 opacity-40 pointer-events-none"
      >
        <DoodleSparkle className="w-8 h-8 sm:w-10 sm:h-10" color="#f8a5b7" />
      </motion.div>

      <motion.div
        animate={{ y: [4, -6, 4], rotate: [0, -4, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-16 left-5 sm:left-20 opacity-45 pointer-events-none"
      >
        <DoodleHeart className="w-7 h-7 sm:w-9 sm:h-9" fill="#fccdd7" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 right-6 sm:right-16 opacity-40 pointer-events-none"
      >
        <DoodleHeart className="w-8 h-8 sm:w-10 sm:h-10" fill="#f8a5b7" />
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 8, 0, -8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-3 sm:left-10 opacity-30 pointer-events-none"
      >
        <DoodleSparkle className="w-6 h-6" color="#fbbf24" />
      </motion.div>

      {/* ── Main Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.93 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        className="relative z-10 w-full max-w-xs sm:max-w-sm mx-4"
        ref={containerRef}
      >
        {/* Card */}
        <div
          className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-pink-100 shadow-envelope overflow-hidden"
          style={{ boxShadow: '0 8px 32px -4px rgba(240,113,143,0.18), 0 2px 12px -2px rgba(240,113,143,0.1)' }}
        >
          {/* Top washi-tape strip */}
          <div
            className="absolute -top-0 left-0 right-0 h-2 opacity-60"
            style={{
              background: 'repeating-linear-gradient(90deg, #fccdd7 0px, #fccdd7 18px, #f8a5b7 18px, #f8a5b7 36px, #fbcfe8 36px, #fbcfe8 54px)',
            }}
          />

          <div className="px-6 pt-8 pb-7 sm:px-8 sm:pt-9 sm:pb-8 flex flex-col items-center gap-5">

            {/* Lock icon area */}
            <div className="relative flex flex-col items-center gap-2">
              <HeartLock isUnlocking={status === 'unlocking'} isUnlocked={status === 'unlocked'} />

              {/* Floating hearts on unlock */}
              <AnimatePresence>
                {status === 'unlocked' && (
                  <div className="absolute inset-0 pointer-events-none text-pink-400">
                    <FloatingHearts />
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Title */}
            <AnimatePresence mode="wait">
              {!showSuccessMsg ? (
                <motion.div
                  key="title"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-center space-y-1.5"
                >
                  <h1 className="font-serif italic text-xl sm:text-2xl text-[#45352b] tracking-tight leading-snug">
                    A Little Secret Just for You
                  </h1>
                  <p className="font-cute text-sm text-[#9e8979] leading-relaxed">
                    ก่อนจะเข้าไปดู มีคำถามเล็ก ๆ ให้อ้วนนนนนตอบด้วยนะคะ ♡
                  </p>
                  <p className="font-hand text-base text-pink-400 mt-0.5">
                    จำวันครบรอบของเราได้ไหมเคะอ้วน ? 🤍
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center space-y-2"
                >
                  <p className="font-hand text-2xl sm:text-3xl text-pink-500">
                    เย้ จำได้ด้วยยย ♡
                  </p>
                  <p className="font-cute text-sm text-[#9e8979] leading-relaxed">
                    งั้นเราเข้าไปดูเรื่องราวของเรากันนะ 💌
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Digit boxes */}
            <AnimatePresence>
              {!showSuccessMsg && (
                <motion.div
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hidden real input — captures all keyboard/mobile typing */}
                  <input
                    ref={hiddenInputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    maxLength={NUM_DIGITS}
                    value=""
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    aria-label="รหัสผ่านวันที่สำคัญ"
                    className="absolute opacity-0 w-0 h-0 pointer-events-none"
                    style={{ position: 'absolute', left: '-9999px' }}
                  />

                  {/* Visual digit boxes — tap to focus hidden input */}
                  <div
                    className="flex gap-2 sm:gap-3 cursor-text"
                    onClick={focusInput}
                    role="button"
                    tabIndex={0}
                    onFocus={focusInput}
                    aria-label="กดเพื่อพิมพ์รหัสผ่าน"
                  >
                    {digits.map((d, i) => (
                      <DigitBox
                        key={i}
                        index={i}
                        value={d}
                        isFocused={i === focusedIndex}
                        isError={isError}
                        isSuccess={isSuccess}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="font-cute text-sm text-pink-400 text-center -mt-1"
                >
                  อุ๊ย ยังไม่ใช่น้า ลองนึกอีกนิดสิคะ 🥺
                </motion.p>
              )}
            </AnimatePresence>

            {/* Confirm button */}
            <AnimatePresence>
              {!showSuccessMsg && (
                <motion.button
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => {
                    focusInput();
                    handleSubmit();
                  }}
                  disabled={digits.join('').length < NUM_DIGITS || status === 'unlocking'}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.03 }}
                  className={`
                    w-full py-3 rounded-full font-cute text-sm sm:text-base font-semibold
                    transition-all duration-300 flex items-center justify-center gap-2
                    ${digits.join('').length === NUM_DIGITS && status !== 'unlocking'
                      ? 'bg-pink-400 hover:bg-pink-500 text-white shadow-md hover:shadow-lg'
                      : 'bg-pink-100 text-pink-300 cursor-not-allowed'
                    }
                  `}
                >
                  <span>ปลดล็อกเรื่องราวของเรา</span>
                  <span>💌</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Subtle bottom note */}
            {!showSuccessMsg && (
              <p className="font-body text-[10px] text-[#c8b8ab] text-center -mt-2">
                ใส่รหัส 5 หลัก แล้วกดปุ่มหรือ Enter ♡
              </p>
            )}
          </div>
        </div>

        {/* Tiny decorative stars around card */}
        <div className="absolute -top-3 -right-3 text-yellow-300 text-lg pointer-events-none animate-pulse-gentle">✦</div>
        <div className="absolute -bottom-2 -left-2 text-pink-300 text-sm pointer-events-none animate-float-slow">✦</div>
      </motion.div>
    </motion.div>
  );
};

export default PasswordGate;
