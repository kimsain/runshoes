'use client';

import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: 'nike' | 'adidas' | 'asics' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  tilt = false,
  glow = 'none',
  padding = 'none',
  radius = '2xl',
  onClick,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowStyles = {
    nike: 'hover:shadow-[0_0_40px_rgba(250,84,0,0.3)]',
    adidas: 'hover:shadow-[0_0_40px_rgba(20,40,160,0.3)]',
    asics: 'hover:shadow-[0_0_40px_rgba(213,0,50,0.3)]',
    none: '',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const radiusStyles = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={
        tilt
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
          : {}
      }
      className={cn(
        'bg-white/5 backdrop-blur-sm border border-white/10 transition-shadow duration-300',
        radiusStyles[radius],
        paddingStyles[padding],
        glowStyles[glow],
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div style={tilt ? { transform: 'translateZ(50px)' } : {}}>
        {children}
      </div>
    </motion.div>
  );
}
