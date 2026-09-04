import React from 'react';
import { motion } from 'framer-motion';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6 auto-rows-[minmax(160px,auto)] ${className}`}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowSpan?: 1 | 2 | 3;
  glowColor?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'slate';
  onClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  colSpan = 4,
  rowSpan = 1,
  glowColor = 'blue',
  onClick,
}) => {
  const colSpanClasses: Record<number, string> = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
  };

  const rowSpanClasses: Record<number, string> = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
  };

  const glowBorderClasses: Record<string, string> = {
    blue: 'hover:border-primary/50 hover:shadow-[rgba(21,81,157,0.3)]/10',
    emerald: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    amber: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
    purple: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
    rose: 'hover:border-danger/50 hover:shadow-rose-500/10',
    slate: 'hover:border-slate-500/50 hover:shadow-slate-500/10',
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      onClick={onClick}
      className={`
        bg-[#1E293B] border border-white/[0.08] rounded-[20px] p-6
        transition-all duration-300 shadow-xl backdrop-blur-md relative overflow-hidden flex flex-col justify-between
        ${colSpanClasses[colSpan] || 'lg:col-span-4'}
        ${rowSpanClasses[rowSpan] || 'row-span-1'}
        ${glowBorderClasses[glowColor]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default BentoGrid;
