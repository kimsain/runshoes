'use client';

import { ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: 'nike' | 'adidas' | 'asics' | 'none';
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  tilt = false,
  glow = 'none',
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
      className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl transition-shadow duration-300 ${glowStyles[glow]} ${className}`}
    >
      <div style={tilt ? { transform: 'translateZ(50px)' } : {}}>
        {children}
      </div>
    </motion.div>
  );
}
