import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  variant?: 'FullPage' | 'Inline' | 'Overlay';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  variant = 'Inline',
  size = 'md',
  label,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  };

  const spinnerIcon = (
    <Loader2 className={`${sizeMap[size]} animate-spin text-primary ${className}`} />
  );

  if (variant === 'FullPage') {
    return (
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-3">
        <div className="p-4 bg-white rounded-2xl shadow-2xl flex flex-col items-center gap-3">
          {spinnerIcon}
          {label && <span className="text-xs font-bold text-slate-700">{label}</span>}
        </div>
      </div>
    );
  }

  if (variant === 'Overlay') {
    return (
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-2 rounded-[inherit]">
        {spinnerIcon}
        {label && <span className="text-xs font-bold text-slate-700">{label}</span>}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      {spinnerIcon}
      {label && <span className="text-xs font-bold text-slate-700">{label}</span>}
    </div>
  );
};

export default Spinner;
