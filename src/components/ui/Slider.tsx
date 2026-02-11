'use client';

import { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SliderProps {
  children: ReactNode[];
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  gap?: 'sm' | 'md' | 'lg';
}

export default function Slider({
  children,
  className,
  showDots = true,
  showArrows = true,
  gap = 'md',
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const gapStyles = {
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
  };

  const handleDragEnd = () => {
    const dragDistance = x.get();
    const threshold = 100;

    if (dragDistance < -threshold && currentIndex < children.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (dragDistance > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const arrowButtonStyles = cn(
    'absolute top-1/2 -translate-y-1/2',
    'w-10 h-10 rounded-full',
    'inline-flex items-center justify-center',
    'bg-white/10 hover:bg-white/20',
    'transition-colors duration-200'
  );

  return (
    <div className={cn('relative', className)}>
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
            <div key={index} className={cn('w-full flex-shrink-0', gapStyles[gap])}>
              {child}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      {showDots && children.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-200',
                currentIndex === index
                  ? 'w-6 bg-white'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              )}
            />
          ))}
        </div>
      )}

      {/* Navigation arrows */}
      {showArrows && currentIndex > 0 && (
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          aria-label="Previous slide"
          className={cn(arrowButtonStyles, 'left-0')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {showArrows && currentIndex < children.length - 1 && (
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          aria-label="Next slide"
          className={cn(arrowButtonStyles, 'right-0')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
