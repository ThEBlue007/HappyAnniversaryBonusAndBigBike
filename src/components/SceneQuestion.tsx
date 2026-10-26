import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Edit3, Send, CheckCircle2 } from 'lucide-react';
import { siteContent } from '../content';

interface SceneQuestionProps {
  onNext: () => void;
  savedAnswer?: string;
  onSaveAnswer?: (answer: string) => void;
}

export const SceneQuestion: React.FC<SceneQuestionProps> = ({
  onNext,
  savedAnswer = '',
  onSaveAnswer,
}) => {
  const qData = siteContent.questionSection;
  
  // Local state for the typed text
  const [inputText, setInputText] = useState<string>(savedAnswer || '');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // Load from localStorage or props on mount
  useEffect(() => {
    if (savedAnswer) {
      setInputText(savedAnswer);
      setIsSubmitted(true);
    } else {
      const stored = localStorage.getItem('sno_surprise_answer');
      if (stored) {
        setInputText(stored);
        setIsSubmitted(true);
        onSaveAnswer?.(stored);
      }
    }
  }, [savedAnswer]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) {
      setShowWarning(true);
      return;
    }
    setShowWarning(false);
    setIsSubmitted(true);

    // Save to localStorage & notify parent
    localStorage.setItem('sno_surprise_answer', inputText.trim());
    localStorage.setItem('sno_answer_time', new Date().toISOString());
    onSaveAnswer?.(inputText.trim());
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 relative select-none">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center space-y-3.5">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-1"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-scrapbook-pink-100 text-scrapbook-pink-500 font-cute text-xs">
            <Sparkles size={11} />
            <span>{qData.badge}</span>
            <Sparkles size={11} />
          </span>
          <p className="font-cute text-xs sm:text-sm text-scrapbook-brown-light">
            {qData.intro}
          </p>
          <h2 className="font-cute text-base sm:text-lg text-scrapbook-brown-dark font-bold leading-snug px-1">
            “{qData.question}”
          </h2>
        </motion.div>

        {/* Interactive Answer Area (Stationery Diary Card) */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              // 1. Textarea Form Stage (When Sno is writing)
              <motion.div
                key="writing"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="w-full bg-[#fffdf9] rounded-2xl p-4 border-2 border-[#eddcd0] shadow-soft relative"
              >
                {/* Diary paper lines effect */}
                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (showWarning && e.target.value.trim()) {
                        setShowWarning(false);
                      }
                    }}
                    rows={4}
                    placeholder={qData.placeholder}
                    className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none font-body text-sm sm:text-base text-scrapbook-brown-dark placeholder:text-scrapbook-brown-light/60 resize-none leading-relaxed"
                    autoFocus
                  />
                </div>

                {/* Counter & Warning */}
                <div className="flex items-center justify-between pt-2 border-t border-[#f4ebe0] text-xs">
                  {showWarning ? (
                    <span className="font-cute text-scrapbook-pink-500 animate-pulse font-semibold">
                      {qData.emptyWarningText}
                    </span>
                  ) : (
                    <span className="font-cute text-scrapbook-brown-light/70 text-[11px]">
                      {inputText.length > 0 ? `${inputText.length} ตัวอักษร` : 'เขียนจากใจได้เลยนะ ♡'}
                    </span>
                  )}

                  {/* Submit Button */}
                  <button
                    onClick={() => handleSubmit()}
                    className="px-4 py-1.5 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-xs font-semibold shadow-xs hover:shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{qData.submitButtonText}</span>
                    <Send size={11} />
                  </button>
                </div>
              </motion.div>
            ) : (
              // 2. Submitted Stage (Sealed Answer Note)
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full bg-[#fff5f7] rounded-2xl p-4 sm:p-5 border-2 border-scrapbook-pink-300 shadow-soft relative"
              >
                {/* Stamp Seal Badge */}
                <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-scrapbook-pink-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-scrapbook-pink-500 fill-scrapbook-pink-100" />
                    <span className="font-cute text-xs text-scrapbook-pink-600 font-bold">
                      {qData.successBadge}
                    </span>
                  </div>

                  <button
                    onClick={handleEdit}
                    className="font-cute text-[11px] text-scrapbook-brown-light hover:text-scrapbook-pink-600 flex items-center gap-1 transition-colors"
                    title="แก้ไขข้อความที่พิมพ์"
                  >
                    <Edit3 size={11} />
                    <span>{qData.editButtonText}</span>
                  </button>
                </div>

                {/* Sno's Answer Quote */}
                <div className="bg-white/80 rounded-xl p-3 border border-scrapbook-pink-100 shadow-2xs mb-3">
                  <p className="font-body text-sm sm:text-base text-scrapbook-brown-dark leading-relaxed italic">
                    “{inputText}”
                  </p>
                </div>

                {/* Blue's Warm Reaction */}
                <div className="flex items-start gap-2 pt-1 text-xs font-cute text-scrapbook-pink-600">
                  <Heart size={14} className="fill-scrapbook-pink-400 text-scrapbook-pink-500 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{qData.replyFromBoyfriend}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue Button (Enabled when submitted) */}
        <motion.div className="w-full pt-1">
          <button
            onClick={() => {
              if (!isSubmitted) {
                handleSubmit();
              } else {
                onNext();
              }
            }}
            className="w-full py-3 px-6 rounded-full bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white font-cute text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isSubmitted ? qData.continueButtonText : qData.submitButtonText}</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
