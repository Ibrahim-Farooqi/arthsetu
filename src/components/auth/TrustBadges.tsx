import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface TrustBadgesProps {
  light?: boolean;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ light = false }) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 pt-4 border-t text-[11px] font-bold ${
      light ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
    }`}>
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
        light ? 'bg-slate-50 border-slate-200/60' : 'bg-slate-900/60 border-slate-800'
      }`}>
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>SEBI Registered (RA: INH000009821)</span>
      </div>

      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
        light ? 'bg-slate-50 border-slate-200/60' : 'bg-slate-900/60 border-slate-800'
      }`}>
        <Lock className="w-4 h-4 text-primary" />
        <span>256-Bit SSL Encrypted</span>
      </div>

      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${
        light ? 'bg-slate-50 border-slate-200/60' : 'bg-slate-900/60 border-slate-800'
      }`}>
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        <span>BSE / NSE Verified</span>
      </div>
    </div>
  );
};

export default TrustBadges;
