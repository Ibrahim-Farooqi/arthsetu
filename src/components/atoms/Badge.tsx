import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps {
  variant: 'buy' | 'sell' | 'hold' | 'risk-low' | 'risk-medium' | 'risk-high' | 'ai-confidence' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  className,
  glow = true,
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full select-none';

  const variants = {
    buy: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30',
    sell: 'bg-rose-50 dark:bg-rose-950/30 text-danger dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30',
    hold: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30',
    
    'risk-low': 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/30',
    'risk-medium': 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30',
    'risk-high': 'bg-rose-50 dark:bg-rose-950/30 text-danger dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/30',
    
    'ai-confidence': 'bg-gradient-to-r from-primary/10 to-indigo-500/10 text-primary dark:text-[#64748B] border border-primary/20 dark:border-primary/30',
    
    success: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/30',
    warning: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/30',
    info: 'bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/30',
  };

  const glows = {
    buy: 'shadow-[0_0_12px_rgba(22,163,74,0.15)]',
    sell: 'shadow-[0_0_12px_rgba(239,68,68,0.15)]',
    hold: 'shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    'risk-low': '',
    'risk-medium': '',
    'risk-high': '',
    'ai-confidence': 'shadow-[0_0_12px_rgba(21,81,157,0.15)]',
    success: '',
    warning: '',
    info: '',
  };

  return (
    <span className={cn(baseStyles, variants[variant], glow && glows[variant], className)}>
      {variant === 'ai-confidence' && (
        <svg className="w-3.5 h-3.5 mr-1 animate-pulse text-primary dark:text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.813 15.904L9 21l8.904-4.473L21 9l-3.096-3.096L9.813 15.904z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 21l3-9-3 3-6-3 6-3 3 9-3-3z" />
        </svg>
      )}
      {children}
    </span>
  );
};
