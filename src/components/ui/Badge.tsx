'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'nike' | 'adidas' | 'asics' | 'daily' | 'super-trainer' | 'racing' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-white',
    nike: 'bg-[#FA5400]/20 text-[#FA5400] border border-[#FA5400]/30',
    adidas: 'bg-[#1428A0]/20 text-[#6B7BDB] border border-[#1428A0]/30',
    asics: 'bg-[#D50032]/20 text-[#D50032] border border-[#D50032]/30',
    daily: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'super-trainer': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    racing: 'bg-red-500/20 text-red-400 border border-red-500/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  };

  const sizes = {
    sm: 'h-5 px-2 text-xs',
    md: 'h-6 px-3 text-sm',
    lg: 'h-7 px-4 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
