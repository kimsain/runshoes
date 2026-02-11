'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'nike' | 'adidas' | 'asics' | 'daily' | 'super-trainer' | 'racing';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-white',
    nike: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    adidas: 'bg-blue-600/20 text-blue-400 border border-blue-600/30',
    asics: 'bg-red-600/20 text-red-400 border border-red-600/30',
    daily: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'super-trainer': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    racing: 'bg-red-500/20 text-red-400 border border-red-500/30',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}
