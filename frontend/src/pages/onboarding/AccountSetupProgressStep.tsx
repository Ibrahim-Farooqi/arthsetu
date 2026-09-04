import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck, UserCheck, Building2, Lock, RefreshCw } from 'lucide-react';

interface AccountSetupProgressStepProps {
  onComplete: () => void;
}

export const AccountSetupProgressStep: React.FC<AccountSetupProgressStepProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 35); // 3.5 seconds total for 0-100

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 25 && stage < 2) setStage(2);
    if (progress >= 55 && stage < 3) setStage(3);
    if (progress >= 85 && stage < 4) setStage(4);
    if (progress === 100 && stage < 5) setStage(5);
  }, [progress, stage]);

  const milestones = [
    { id: 1, title: 'KYC Application Verified', desc: 'Aadhaar & PAN cross-verified with Income Tax & UIDAI', icon: ShieldCheck },
    { id: 2, title: 'Demat & Trading Account Created', desc: 'SEBI compliant account registered under your credentials', icon: Building2 },
    { id: 3, title: 'Digital E-Signatures Recorded', desc: 'Legal account opening agreements secured & encrypted', icon: Lock },
    { id: 4, title: 'Account Initialization Complete', desc: 'Ready to customize investment preferences & AI parameters', icon: UserCheck }
  ];

  return (
    <div className="w-full max-w-lg mx-auto py-2 text-center">
      {/* Top Graphic Header */}
      <div className="relative mb-6 flex justify-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-primary text-white flex items-center justify-center shadow-lg shadow-[rgba(21,81,157,0.3)]/20 relative">
          <Sparkles className="w-8 h-8 animate-pulse" />
          
          {/* Animated Spinner Ring */}
          <div className="absolute inset-0 -m-1.5 rounded-[22px] border-[2.5px] border-primary/20 border-t-blue-600 animate-spin" />
        </div>
      </div>

      {/* Main Title */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-primary-light mb-2">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>Stage 2 · Setting Up Your Account</span>
        </span>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Setting Up Your Account
        </h2>
        <p className="text-xs text-slate-500 font-normal mt-1 max-w-sm mx-auto leading-relaxed">
          Application submitted successfully! We are provisioning your SEBI-registered trading account and initializing your profile.
        </p>
      </motion.div>

      {/* Progress Bar & Percentage */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 shadow-xs">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1.5">
          <span>ACCOUNT PROVISIONING</span>
          <span className="text-primary font-mono text-xs">{progress}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Milestone Checklists */}
      <div className="space-y-2.5 text-left mb-8">
        {milestones.map((m) => {
          const isDone = progress >= m.id * 25 || progress === 100;
          const isCurrent = !isDone && progress >= (m.id - 1) * 25;

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: m.id * 0.1 }}
              className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                isDone 
                  ? 'bg-emerald-50/50 border-emerald-200 text-slate-900'
                  : isCurrent 
                  ? 'bg-primary-light/60 border-blue-300 shadow-xs'
                  : 'bg-white border-slate-100 opacity-50'
              }`}
            >
              <div className="mt-0.5">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                    <m.icon className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className={`text-xs font-bold ${isDone ? 'text-slate-900' : isCurrent ? 'text-primary-dark' : 'text-slate-500'}`}>
                  {m.title}
                </h4>
                <p className="text-[10px] text-slate-500 font-normal mt-0.5 leading-snug">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Button once ready */}
      <motion.div 
        animate={{ opacity: progress >= 100 ? 1 : 0.8, scale: progress >= 100 ? 1 : 0.98 }}
      >
        <button
          onClick={onComplete}
          disabled={progress < 100}
          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            progress >= 100
              ? 'bg-primary hover:bg-primary-dark text-white shadow-md shadow-[rgba(21,81,157,0.3)]/25 active:scale-[0.98]'
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>{progress < 100 ? 'Setting Up Your Account...' : 'Continue to Account Setup Questions'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
