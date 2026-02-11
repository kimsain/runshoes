'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep) / totalSteps) * 100;

  return (
    <div className="relative">
      {/* Background */}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-orange-500 via-blue-500 to-red-500 rounded-full"
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${
              index < currentStep
                ? 'bg-white text-black'
                : index === currentStep
                ? 'bg-white/20 text-white ring-2 ring-white/50'
                : 'bg-white/5 text-gray-500'
            }`}
          >
            {index < currentStep ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
