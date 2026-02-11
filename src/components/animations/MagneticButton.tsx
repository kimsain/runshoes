'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disabled?: boolean;
  as?: 'button' | 'div';
}

export default function MagneticButton({
  children,
  className,
  strength = 0.5,
  onClick,
  disabled = false,
  as = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;

    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const MotionComponent = as === 'button' ? motion.button : motion.div;

  return (
    <MotionComponent
      ref={ref as React.RefObject<HTMLButtonElement & HTMLDivElement>}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={disabled ? undefined : onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={cn(
        'inline-flex items-center justify-center',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...(as === 'button' && { disabled })}
    >
      <motion.span
        animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className="inline-flex items-center justify-center"
      >
        {children}
      </motion.span>
    </MotionComponent>
  );
}
