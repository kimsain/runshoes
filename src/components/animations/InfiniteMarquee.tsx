'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InfiniteMarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast' | number;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
  pauseOnHover?: boolean;
}

export default function InfiniteMarquee({
  children,
  direction = 'left',
  speed = 'normal',
  className,
  gap = 'md',
  pauseOnHover = false,
}: InfiniteMarqueeProps) {
  const speedValues = {
    slow: 50,
    normal: 30,
    fast: 15,
  };

  const gapStyles = {
    sm: 'gap-4',
    md: 'gap-8',
    lg: 'gap-12',
  };

  const duration = typeof speed === 'number' ? speed : speedValues[speed];

  return (
    <div
      className={cn(
        'overflow-hidden',
        pauseOnHover && 'group',
        className
      )}
    >
      <motion.div
        className={cn(
          'flex',
          gapStyles[gap],
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <div className={cn('flex shrink-0', gapStyles[gap])}>{children}</div>
        <div className={cn('flex shrink-0', gapStyles[gap])}>{children}</div>
      </motion.div>
    </div>
  );
}
