import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, TrendingUp, Briefcase, Newspaper, BarChart3, Star, 
  Target, Sparkles, Zap, Shield, Flame, Activity, Compass, Clock, CheckCircle2
} from 'lucide-react';

interface AiMarketCoreGalaxyProps {
  theme?: 'dark' | 'light';
  onModuleClick?: (moduleName: string) => void;
}

export const AiMarketCoreGalaxy: React.FC<AiMarketCoreGalaxyProps> = ({
  theme = 'dark',
  onModuleClick,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSignal, setActiveSignal] = useState<{ symbol: string; confidence: number; action: string } | null>({
    symbol: 'RELIANCE',
    confidence: 96,
    action: 'Cup & Handle Breakout Buy'
  });

  // Cycle AI Signal Toasts every 5s
  useEffect(() => {
    const signals = [
      { symbol: 'RELIANCE', confidence: 96, action: 'Cup & Handle Breakout Buy' },
      { symbol: 'TATAMOTORS', confidence: 94, action: 'Golden Crossover Target ₹1,080' },
      { symbol: 'INFY', confidence: 92, action: 'Falling Wedge Breakout Target ₹1,640' },
      { symbol: 'HDFCBANK', confidence: 95, action: 'Institutional Accumulation' }
    ];
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % signals.length;
      setActiveSignal(signals[idx]);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full max-w-2xl mx-auto h-[520px] flex items-center justify-center select-none overflow-hidden"
    >
      {/* 1. DEEP MESH GRADIENT & BACKGROUND PARTICLES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-primary/15 via-purple-600/10 to-emerald-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-2xl" />
      </div>

      {/* 2. ORBIT RINGS (3 MULTI-LAYER GALAXY ORBITS) */}
      <svg viewBox="0 0 540 540" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="ringGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15519D" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#15519D" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="ringGrad2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Inner Orbit Line (R=120) */}
        <circle cx="270" cy="270" r="120" stroke="url(#ringGrad1)" strokeWidth="1.5" strokeDasharray="6 6" fill="none" opacity="0.6" />

        {/* Middle Orbit Line (R=180) */}
        <circle cx="270" cy="270" r="185" stroke="url(#ringGrad2)" strokeWidth="1.5" strokeDasharray="8 8" fill="none" opacity="0.5" />

        {/* Outer Orbit Line (R=245) */}
        <circle cx="270" cy="270" r="245" stroke="#475569" strokeWidth="1" strokeDasharray="3 9" fill="none" opacity="0.35" />

        {/* Connection Lines from Center to Orbiting Modules */}
        <line x1="270" y1="270" x2="180" y2="175" stroke="#15519D" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
        <line x1="270" y1="270" x2="360" y2="180" stroke="#10B981" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
        <line x1="270" y1="270" x2="150" y2="350" stroke="#06B6D4" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
        <line x1="270" y1="270" x2="390" y2="340" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4" strokeDasharray="3 3" />
      </svg>

      {/* 3. CENTERPIECE: THE GLOWING AI MARKET CORE ORB */}
      <motion.div
        style={{
          transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="relative z-20 w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center cursor-pointer group"
      >
        {/* Outer Pulsing Glass Ring */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: 360 }}
          transition={{
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 45, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 via-emerald-500/20 to-purple-600/30 backdrop-blur-2xl border border-white/20 shadow-[0_0_60px_rgba(21,81,157,0.4)]"
        />

        {/* Inner Rotating Energy Core */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full bg-gradient-to-br from-[#172033] via-[#1E293B] to-[#172033] border border-primary-light/40 overflow-hidden flex items-center justify-center"
        >
          {/* Internal Plasma Glows */}
          <div className="absolute w-32 h-32 bg-primary/40 rounded-full blur-xl animate-pulse" />
          <div className="absolute w-24 h-24 bg-emerald-400/30 rounded-full blur-lg top-2 right-2" />
          <div className="absolute w-20 h-20 bg-purple-500/30 rounded-full blur-md bottom-2 left-2" />

          {/* Central AI Nucleus Icon */}
          <div className="relative z-10 text-center space-y-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-[rgba(21,81,157,0.3)]/50 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7" />
            </div>
            <span className="font-mono text-[10px] font-black tracking-widest text-emerald-400 block uppercase">
              AI CORE V4
            </span>
            <span className="font-mono text-[9px] text-slate-300 block">
              ● 2.4B Ticks/sec
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 4. ORBITING ECOSYSTEM MODULE CARDS (3 ORBITAL LAYERS) */}

      {/* LAYER 1: INNER ORBIT MODULES */}
      {/* Portfolio Module (Top Left) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -18}px)` }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => onModuleClick?.('portfolio')}
        className="absolute top-16 left-8 sm:left-14 z-30 bg-[#172033]/90 backdrop-blur-xl border border-emerald-500/40 p-3 sm:p-3.5 rounded-2xl shadow-xl hover:border-emerald-400 hover:scale-105 transition cursor-pointer font-mono"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">PORTFOLIO</span>
            <span className="font-black text-xs text-white block">₹12.4L</span>
            <span className="text-[10px] text-emerald-400 font-bold">▲ +18.4% CAGR</span>
          </div>
        </div>
      </motion.div>

      {/* AI Advisors Module (Top Right) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * -15}px)` }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        onClick={() => onModuleClick?.('ai-advisors')}
        className="absolute top-16 right-8 sm:right-14 z-30 bg-[#172033]/90 backdrop-blur-xl border border-purple-500/40 p-3 sm:p-3.5 rounded-2xl shadow-xl hover:border-purple-400 hover:scale-105 transition cursor-pointer font-mono"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">AI ADVISORS</span>
            <span className="font-black text-xs text-white block">3 Copilots</span>
            <span className="text-[10px] text-purple-400 font-bold">96% Accuracy</span>
          </div>
        </div>
      </motion.div>

      {/* LAYER 2: MIDDLE ORBIT MODULES */}
      {/* Stocks & Tickers (Bottom Left) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * -22}px, ${mousePos.y * 18}px)` }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        onClick={() => onModuleClick?.('stocks')}
        className="absolute bottom-16 left-6 sm:left-12 z-30 bg-[#172033]/90 backdrop-blur-xl border border-primary/40 p-3 sm:p-3.5 rounded-2xl shadow-xl hover:border-primary-light hover:scale-105 transition cursor-pointer font-mono"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/20 text-[#64748B] flex items-center justify-center shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">EQUITIES</span>
            <span className="font-black text-xs text-white block">NIFTY 50</span>
            <span className="text-[10px] text-emerald-400 font-bold">24,520 (+0.84%)</span>
          </div>
        </div>
      </motion.div>

      {/* Research & SEBI Calls (Bottom Right) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * 24}px, ${mousePos.y * 20}px)` }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        onClick={() => onModuleClick?.('research')}
        className="absolute bottom-16 right-6 sm:right-12 z-30 bg-[#172033]/90 backdrop-blur-xl border border-amber-500/40 p-3 sm:p-3.5 rounded-2xl shadow-xl hover:border-amber-400 hover:scale-105 transition cursor-pointer font-mono"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">SEBI RESEARCH</span>
            <span className="font-black text-xs text-white block">RA: INH000009821</span>
            <span className="text-[10px] text-amber-400 font-bold">14 Active Calls</span>
          </div>
        </div>
      </motion.div>

      {/* LAYER 3: OUTER ORBIT SATELLITE CHIPS */}
      {/* Gold & Commodities (Top Center) */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-[#172033]/90 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 shadow-md flex items-center gap-1.5"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>GOLD 24K: <strong className="text-amber-400">₹7,240/g</strong></span>
      </motion.div>

      {/* Trending IPO (Bottom Center) */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-[#172033]/90 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 shadow-md flex items-center gap-1.5"
      >
        <Flame className="w-3 h-3 text-rose-400" />
        <span>OLA IPO GMP: <strong className="text-emerald-400">+38.5% Gain</strong></span>
      </motion.div>

      {/* 5. AI OPPORTUNITY TOAST SIGNAL NOTIFICATION */}
      <AnimatePresence mode="wait">
        {activeSignal && (
          <motion.div
            key={activeSignal.symbol}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="absolute bottom-28 z-40 bg-gradient-to-r from-blue-900/90 via-[#172033] to-emerald-900/90 border border-primary/50 backdrop-blur-2xl px-4 py-2 rounded-2xl shadow-2xl font-mono text-xs text-white flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xs text-white">AI SIGNAL DETECTED: {activeSignal.symbol}</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  {activeSignal.confidence}% Conviction
                </span>
              </div>
              <span className="text-[10px] text-slate-300 font-sans block">{activeSignal.action}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AiMarketCoreGalaxy;
