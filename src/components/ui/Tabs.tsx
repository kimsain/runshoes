'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'underline';
}

export default function Tabs({
  tabs,
  defaultTab,
  className,
  size = 'md',
  variant = 'default',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  const containerStyles = {
    default: 'flex gap-1 p-1 bg-white/5 rounded-full w-fit',
    underline: 'flex gap-4 border-b border-white/10 w-full',
  };

  const buttonStyles = {
    default: 'rounded-full',
    underline: 'rounded-none border-b-2 border-transparent -mb-px',
  };

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div className={containerStyles[variant]}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative inline-flex items-center justify-center font-medium transition-colors',
              sizeStyles[size],
              buttonStyles[variant],
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-400 hover:text-white'
            )}
          >
            {activeTab === tab.id && variant === 'default' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            {activeTab === tab.id && variant === 'underline' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            initial={false}
            animate={{
              opacity: activeTab === tab.id ? 1 : 0,
              y: activeTab === tab.id ? 0 : 10,
              display: activeTab === tab.id ? 'block' : 'none',
            }}
            transition={{ duration: 0.2 }}
          >
            {tab.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
