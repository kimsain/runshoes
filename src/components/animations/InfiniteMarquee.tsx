'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InfiniteMarqueeProps {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export default function InfiniteMarquee({
  children,
  direction = 'left',
  speed = 30,
  className = '',
}: InfiniteMarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
