import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteContent } from '../content';

interface SceneQuestionProps {
  selectedOptionId: number | null;
  onSelectOption: (id: number) => void;
  onNext: () => void;
}

export const SceneQuestion: React.FC<SceneQuestionProps> = ({
  selectedOptionId,
  onSelectOption,
  onNext,
}) => {
  const qData = siteContent.questionSection;
  const selectedOption = qData.options.find((opt) => opt.id === selectedOptionId);

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
          <h2 className="font-cute text-base sm:text-lg text-scrapbook-brown-dark font-bold leading-snug px-2">
            “{qData.question}”
          </h2>
        </motion.div>

        {/* 4 Interactive Option Cards */}
        <div className="w-full space-y-2">
          {qData.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                onClick={() => onSelectOption(option.id)}
                className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-[#fff0f3] border-scrapbook-pink-400 shadow-md scale-[1.02]'
                    : 'bg-[#fffdfa] border-[#ede3d5] hover:border-scrapbook-pink-200 hover:bg-[#fff9fa] shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-cute font-bold transition-colors ${
                      isSelected
                        ? 'bg-scrapbook-pink-500 text-white'
                        : 'bg-[#f4ece1] text-scrapbook-brown group-hover:bg-scrapbook-pink-100 group-hover:text-scrapbook-pink-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className={`font-body text-sm sm:text-base transition-colors ${
                      isSelected
                        ? 'text-scrapbook-pink-600 font-bold'
                        : 'text-scrapbook-brown group-hover:text-scrapbook-brown-dark'
                    }`}
                  >
                    {option.text}
                  </span>
                </div>

                <div className="text-scrapbook-pink-400">
                  {isSelected ? (
                    <CheckCircle2 size={18} className="fill-scrapbook-pink-400 text-white" />
                  ) : (
                    <Heart size={15} className="opacity-30 group-hover:opacity-70 transition-opacity" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Response Message (Revealed upon selection) */}
        <div className="w-full min-h-[56px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedOption && (
              <motion.div
                key={selectedOption.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full p-2.5 sm:p-3 rounded-xl bg-[#fff5f7] border border-scrapbook-pink-200 text-center shadow-2xs"
              >
                <p className="font-cute text-xs sm:text-sm text-scrapbook-pink-600 font-semibold leading-relaxed">
                  {selectedOption.response}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue Button (Disabled until an option is selected, with gentle pulse) */}
        <motion.div className="w-full pt-1">
          <button
            onClick={onNext}
            disabled={!selectedOptionId}
            className={`w-full py-3 px-6 rounded-full font-cute text-sm sm:text-base font-semibold shadow-md flex items-center justify-center gap-2 transition-all duration-300 ${
              selectedOptionId
                ? 'bg-scrapbook-pink-400 hover:bg-scrapbook-pink-500 text-white hover:scale-[1.02] active:scale-98 cursor-pointer'
                : 'bg-[#eadecf] text-[#a89b8d] cursor-not-allowed opacity-75'
            }`}
          >
            <span>{selectedOptionId ? qData.buttonText : 'เลือกคำตอบที่ชอบก่อนน้า ♡'}</span>
            {selectedOptionId && <ArrowRight size={16} />}
          </button>
        </motion.div>
      </div>
    </div>
  );
};
