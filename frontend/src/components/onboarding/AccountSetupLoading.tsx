import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface AccountSetupLoadingProps {
  planTier: string;
  onFinished: () => void;
}

export const AccountSetupLoading: React.FC<AccountSetupLoadingProps> = ({ planTier, onFinished }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const setupSteps = [
    'Creating your profile',
    'Personalizing your research & insights',
    'Setting up your watchlist experience',
    'Preparing your market dashboard',
    `Activating your ${planTier} plan`
  ];

  useEffect(() => {
    setupSteps.forEach((_, idx) => {
      setTimeout(() => {
        setCompletedSteps(prev => [...prev, idx]);
      }, (idx + 1) * 700);
    });

    const totalTimer = setTimeout(() => {
      onFinished();
    }, (setupSteps.length + 1) * 700);

    return () => clearTimeout(totalTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[28px] border border-[#E2E8F0] shadow-xl text-center space-y-8">
        
        {/* ANIMATED SPINNER OR BADGE */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#15519D] to-[#123B63] animate-pulse opacity-20" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#15519D] to-[#123B63] flex items-center justify-center text-white font-black text-2xl shadow-md">
            A
          </div>
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#15519D] text-xs font-black uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Account Setup
          </span>
          <h2 className="text-2xl font-black text-[#172033] tracking-tight">
            Setting up your ArthSetu experience
          </h2>
          <p className="text-xs text-[#64748B] font-medium">
            We are configuring your research feed and market intelligence engine.
          </p>
        </div>

        {/* PROGRESSIVE STATUS LIST */}
        <div className="space-y-3 text-left bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0]">
          {setupSteps.map((stepText, idx) => {
            const isDone = completedSteps.includes(idx);
            const isCurrent = completedSteps.length === idx;

            return (
              <div key={idx} className="flex items-center gap-3 text-xs font-bold transition-all">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                  isDone 
                    ? 'bg-emerald-600 text-white' 
                    : isCurrent 
                    ? 'bg-[#15519D] text-white animate-bounce' 
                    : 'bg-[#CBD5E1] text-white'
                }`}>
                  {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                </div>

                <span className={isDone ? 'text-[#172033]' : isCurrent ? 'text-[#15519D]' : 'text-[#94A3B8]'}>
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>

        {/* FINAL MANUAL GO TO DASHBOARD BUTTON */}
        <div className="pt-2">
          <button
            onClick={onFinished}
            className="w-full py-3.5 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Go to ArthSetu Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default AccountSetupLoading;
