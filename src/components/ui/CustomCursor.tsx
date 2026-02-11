'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      );

      setIsPointer(isInteractive);

      if (target.dataset.cursor === 'hover') {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY]);

  const baseCursorStyles = cn(
    'fixed top-0 left-0',
    'pointer-events-none',
    'hidden md:block'
  );

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={cn(baseCursorStyles, 'z-[9999] mix-blend-difference')}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : isPointer ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center justify-center"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-4 h-4 bg-white rounded-full" />
        </motion.div>
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className={cn(baseCursorStyles, 'z-[9998]')}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          className="relative"
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-1 h-1 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </>
  );
}
