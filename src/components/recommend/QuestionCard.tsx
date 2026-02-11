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
      <div className="text-center mb-10">
        <span className="text-sm text-gray-500 mb-4 block">
          질문 {stepNumber} / {totalSteps}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onAnswer(option.id)}
            className={`group relative w-full text-left p-6 rounded-2xl border transition-all ${
              selectedAnswer === option.id
                ? 'bg-white/10 border-white/30'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{option.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {option.label}
                </h3>
                <p className="text-gray-400 text-sm">{option.description}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedAnswer === option.id
                    ? 'border-white bg-white'
                    : 'border-gray-600 group-hover:border-gray-400'
                }`}
              >
                {selectedAnswer === option.id && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 text-black"
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
        <div className="mt-8 text-center">
          <button
            onClick={onPrevious}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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
