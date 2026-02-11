'use client';

import { motion } from 'framer-motion';

interface Option {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswer: (optionId: string) => void;
  onPrevious: () => void;
  showPrevious: boolean;
  stepNumber: number;
  totalSteps: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
  onPrevious,
  showPrevious,
  stepNumber,
  totalSteps,
}: QuestionCardProps) {
  return (
    <div>
      {/* Question */}
      <div className="text-center mb-8 md:mb-10">
        <span className="text-xs md:text-sm text-gray-500 mb-3 md:mb-4 block">
          질문 {stepNumber} / {totalSteps}
        </span>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug px-2">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid gap-3 md:gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onAnswer(option.id)}
            className={`group relative w-full text-left p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all ${
              selectedAnswer === option.id
                ? 'bg-white/10 border-white/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 active:bg-white/15'
            }`}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <span className="text-2xl md:text-3xl flex-shrink-0">{option.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-semibold text-white mb-0.5 md:mb-1">
                  {option.label}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{option.description}</p>
              </div>
              <div
                className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                  selectedAnswer === option.id
                    ? 'border-white bg-white'
                    : 'border-gray-600 group-hover:border-gray-400'
                }`}
              >
                {selectedAnswer === option.id && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 md:w-4 md:h-4 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </motion.svg>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Navigation */}
      {showPrevious && (
        <div className="mt-6 md:mt-8 text-center">
          <button
            onClick={onPrevious}
            className="inline-flex items-center gap-2 text-sm md:text-base text-gray-400 hover:text-white active:text-gray-200 transition-colors py-2 px-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            이전 질문
          </button>
        </div>
      )}
    </div>
  );
}
