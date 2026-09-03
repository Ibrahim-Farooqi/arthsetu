import React from 'react';
import { cn } from '../../utils/cn';

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High';

export interface RiskMeterProps {
  level: RiskLevel;
  className?: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ level, className }) => {
  const levels: Record<RiskLevel, { percent: number; color: string; label: string }> = {
    'Low': { percent: 15, color: 'bg-emerald-500', label: 'Low Risk' },
    'Moderate': { percent: 45, color: 'bg-sky-500', label: 'Moderate Risk' },
    'High': { percent: 75, color: 'bg-amber-500', label: 'High Risk' },
    'Very High': { percent: 95, color: 'bg-danger', label: 'High Risk' },
  };

  const current = levels[level];

  return (
    <div className={cn("flex flex-col gap-2.5 w-full", className)}>
      <div className="flex items-center justify-between text-xs font-semibold text-brand-secondary">
        <span>Risk Profile</span>
        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white",
            current.color
          )}
        >
          {level.toUpperCase()}
        </span>
      </div>
      
      {/* Gauge bar */}
      <div className="relative w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        {/* Track segments */}
        <div className="absolute inset-0 flex">
          <div className="w-[30%] h-full bg-emerald-500/20 border-r border-white/10" />
          <div className="w-[30%] h-full bg-sky-500/20 border-r border-white/10" />
          <div className="w-[20%] h-full bg-amber-500/20 border-r border-white/10" />
          <div className="w-[20%] h-full bg-danger/20" />
        </div>

        {/* Active meter indicator */}
        <div
          className={cn("absolute top-0 bottom-0 left-0 rounded-full transition-all duration-500", current.color)}
          style={{ width: `${current.percent}%` }}
        />
      </div>

      <div className="flex justify-between text-[10px] font-bold text-brand-secondary/60">
        <span>LOW</span>
        <span>MODERATE</span>
        <span>HIGH</span>
        <span>RISKY</span>
      </div>
    </div>
  );
};
