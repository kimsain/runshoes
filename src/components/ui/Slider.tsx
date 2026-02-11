'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface SliderProps {
  children: ReactNode[];
  className?: string;
}

export default function Slider({ children, className = '' }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const handleDragEnd = () => {
    const dragDistance = x.get();
    const threshold = 100;

    if (dragDistance < -threshold && currentIndex < children.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (dragDistance > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Slider container */}
      <div ref={constraintsRef} className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={constraintsRef}
          onDragEnd={handleDragEnd}
          animate={{ x: -currentIndex * 100 + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="flex"
          style={{ x }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-6">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index
                ? 'w-6 bg-white'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      {currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {currentIndex < children.length - 1 && (
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
