import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface IndexCardProps {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  sparklineData: number[]; // e.g. [10, 15, 8, 20, 22]
  className?: string;
}

export const IndexCard: React.FC<IndexCardProps> = ({
  name,
  value,
  change,
  changePercent,
  sparklineData,
  className,
}) => {
  const isPositive = change >= 0;

  // Simple SVG path generation for the sparkline
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min === 0 ? 1 : max - min;
  
  const width = 100;
  const height = 30;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * height + 2; // pad top/bottom slightly
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className={cn("bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-card p-5 shadow-premium flex items-center justify-between gap-4 select-none", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-brand-secondary">
          {name}
        </span>
        <span className="text-lg font-bold text-brand-navy dark:text-dark-text">
          {value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
        <div
          className={cn(
            "flex items-center gap-0.5 text-xs font-semibold",
            isPositive ? "text-success" : "text-danger"
          )}
        >
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>
            {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Sparkline Visualizer */}
      <div className="w-24 h-10 flex items-center">
        <svg width="100%" height="32" viewBox={`0 0 ${width} ${height + 4}`} className="overflow-visible">
          <polyline
            fill="none"
            stroke={isPositive ? 'var(--success)' : 'var(--danger)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
};
