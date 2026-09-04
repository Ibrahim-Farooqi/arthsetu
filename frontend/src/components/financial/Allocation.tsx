import React from 'react';
import { cn } from '../../utils/cn';

export interface AllocationItem {
  assetClass: string;
  percentage: number;
  value: number;
  color: string;
}

export interface AllocationProps {
  items: AllocationItem[];
  currency?: string;
  className?: string;
}

export const Allocation: React.FC<AllocationProps> = ({
  items,
  currency = '₹',
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      <h4 className="text-sm font-semibold text-brand-navy dark:text-dark-text">
        Portfolio Allocation
      </h4>

      {/* Stacked Bar Chart */}
      <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
            className="h-full transition-all duration-300"
            title={`${item.assetClass}: ${item.percentage}%`}
          />
        ))}
      </div>

      {/* Allocation List */}
      <div className="flex flex-col gap-2.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-brand-navy dark:text-dark-text">
                {item.assetClass}
              </span>
              <span className="text-brand-secondary">
                {item.percentage}%
              </span>
            </div>
            <span className="font-semibold text-brand-navy dark:text-dark-text">
              {currency}{item.value.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
