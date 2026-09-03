import React from 'react';
import { ShieldCheck, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

export interface ResearchCall {
  id: string;
  symbol: string;
  companyName: string;
  category: 'Short Term' | 'Intraday' | 'Positional' | 'F&O' | 'Commodity';
  recommendation: 'buy' | 'sell' | 'hold';
  entryPriceRange: string;
  targetPrice: number;
  stopLoss: number;
  potentialUpside: number;
  confidenceScore: number; // e.g. 94 for 94%
  publishedDate: string;
  risk: 'Low' | 'Moderate' | 'High' | 'Very High';
}

export interface ResearchCardProps {
  call: ResearchCall;
  onTrack?: () => void;
}

export const ResearchCard: React.FC<ResearchCardProps> = ({ call, onTrack }) => {
  return (
    <div className="bg-white dark:bg-dark-card border border-brand-border dark:border-dark-border rounded-card p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 flex flex-col gap-5">
      {/* Header Info */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-brand-secondary tracking-wider uppercase mb-1">
            {call.category}
          </span>
          <h4 className="text-lg font-bold text-brand-navy dark:text-dark-text leading-snug">
            {call.symbol}
          </h4>
          <span className="text-xs text-brand-secondary truncate max-w-[180px]">
            {call.companyName}
          </span>
        </div>
        
        <div className="flex flex-col items-end gap-1.5">
          <Badge variant={call.recommendation}>
            {call.recommendation.toUpperCase()}
          </Badge>
          <span className="text-xs font-bold text-success">
            +{call.potentialUpside}% Upside
          </span>
        </div>
      </div>

      {/* Target details */}
      <div className="grid grid-cols-3 gap-3.5 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-button border border-brand-border/40 dark:border-dark-border/40">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">Entry</span>
          <span className="text-sm font-bold text-brand-navy dark:text-dark-text mt-0.5">{call.entryPriceRange}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">Target</span>
          <span className="text-sm font-bold text-success mt-0.5">₹{call.targetPrice}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">Stop Loss</span>
          <span className="text-sm font-bold text-danger mt-0.5">₹{call.stopLoss}</span>
        </div>
      </div>

      {/* Trust factors (AI confidence, SEBI, Date) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-brand-border/60 dark:border-dark-border/60 text-xs">
        <div className="flex items-center gap-1.5 text-brand-secondary">
          <Calendar className="w-3.5 h-3.5" />
          <span>{call.publishedDate}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="ai-confidence" glow={false}>
            AI: {call.confidenceScore}% Confidence
          </Badge>
          <div className="flex items-center gap-1 text-slate-400" title="SEBI Registered Advisory Call">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>

      {/* Button action */}
      <Button
        variant="secondary"
        className="w-full text-xs py-2.5 flex items-center justify-center gap-1"
        onClick={onTrack}
      >
        <span>Analyze Signal Details</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};
