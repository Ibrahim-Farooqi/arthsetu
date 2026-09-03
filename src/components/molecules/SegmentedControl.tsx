import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface SegmentedControlProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedValue,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "inline-flex p-1 bg-slate-100 dark:bg-slate-900 rounded-button border border-brand-border/40 dark:border-dark-border/40 select-none",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.value === selectedValue;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-button transition-colors duration-200 focus:outline-none",
              isActive ? "text-brand-navy dark:text-dark-text" : "text-brand-secondary hover:text-brand-navy dark:hover:text-dark-text"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-segment"
                className="absolute inset-0 bg-white dark:bg-dark-card rounded-button shadow-premium-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
