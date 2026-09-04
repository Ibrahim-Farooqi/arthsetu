import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, TrendingUp, Sparkles, Shield, Newspaper, Star, 
  Target, Zap, ArrowUpRight, ChevronRight, Activity, ArrowRight, Eye
} from 'lucide-react';

interface FloatingWorkspaceHeroProps {
  theme?: 'dark' | 'light';
  onModuleClick?: (moduleName: string) => void;
}

export const FloatingWorkspaceHero: React.FC<FloatingWorkspaceHeroProps> = ({
  theme = 'dark',
  onModuleClick,
}) => {
  const [portfolioValue, setPortfolioValue] = useState(1248420.00);
  const [todayProfit, setTodayProfit] = useState(18420.00);
  const [activeStep, setActiveStep] = useState(0); // Data flow sequence step
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  // Sub-second live micro-ticks for portfolio value
  useEffect(() => {
    const tickInterval = setInterval(() => {
      const delta = (Math.random() * 180 - 75);
      setPortfolioValue((prev) => Math.max(1240000, prev + delta));
      setTodayProfit((prev) => prev + delta);
    }, 1800);
    return () => clearInterval(tickInterval);
  }, []);

  // Neural Data Flow Sequence Simulation (News -> Research -> AI -> Portfolio -> Orders)
  useEffect(() => {
    const sequenceInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2200);
    return () => clearInterval(sequenceInterval);
  }, []);

  // Mouse Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const isGain = todayProfit >= 0;

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full max-w-4xl mx-auto h-[560px] flex items-center justify-center select-none overflow-hidden"
    >
      {/* 1. CINEMATIC LUXURY MESH BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/15 via-purple-600/10 to-emerald-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[280px] h-[280px] bg-cyan-500/10 rounded-full blur-2xl" />
      </div>

      {/* 2. NEURAL DATA FLOW SVG CONNECTION LINES */}
      <svg viewBox="0 0 740 560" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="workspaceLineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15519D" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Dynamic Connection Paths between Modules */}
        {/* News -> Research */}
        <line x1="160" y1="280" x2="220" y2="120" stroke="url(#workspaceLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
        {/* Research -> AI Advisor */}
        <line x1="220" y1="120" x2="540" y2="280" stroke="url(#workspaceLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
        {/* AI Advisor -> Portfolio */}
        <line x1="540" y1="280" x2="370" y2="280" stroke="url(#workspaceLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
        {/* Portfolio -> Orders */}
        <line x1="370" y1="280" x2="210" y2="440" stroke="url(#workspaceLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
        {/* Watchlist -> Portfolio */}
        <line x1="520" y1="120" x2="370" y2="280" stroke="url(#workspaceLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

        {/* Active Traveling Neural Particle */}
        {activeStep === 0 && <circle cx="160" cy="280" r="5" fill="#38BDF8" className="animate-ping" />}
        {activeStep === 1 && <circle cx="220" cy="120" r="5" fill="#F59E0B" className="animate-ping" />}
        {activeStep === 2 && <circle cx="540" cy="280" r="5" fill="#8B5CF6" className="animate-ping" />}
        {activeStep === 3 && <circle cx="370" cy="280" r="5" fill="#10B981" className="animate-ping" />}
        {activeStep === 4 && <circle cx="210" cy="440" r="5" fill="#15519D" className="animate-ping" />}
      </svg>

      {/* 3. FLOATING INVESTMENT WORKSPACE MODULES */}

      {/* CENTER ANCHOR MODULE: PORTFOLIO OVERVIEW (Depth Z-Index 30) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * 4}px, ${mousePos.y * 4}px)` }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        onMouseEnter={() => setHoveredModule('portfolio')}
        onMouseLeave={() => setHoveredModule(null)}
        onClick={() => onModuleClick?.('portfolio')}
        className={`absolute z-30 w-72 sm:w-80 bg-[#1E293B]/95 backdrop-blur-2xl border border-white/15 p-5 rounded-[28px] shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer font-mono ${
          hoveredModule === 'portfolio' ? 'scale-105 border-emerald-400 shadow-emerald-500/20' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black text-white uppercase tracking-wider">Portfolio Overview</span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
            ● LIVE
          </span>
        </div>

        <div className="my-2">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Net Portfolio Wealth</span>
          <div className="text-2xl font-black text-white tracking-tight">
            ₹{portfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl my-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">TODAY'S RETURN</span>
            <span className="font-bold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +₹{todayProfit.toLocaleString('en-IN', { maximumFractionDigits: 2 })} (+1.42%)
            </span>
          </div>
          <div className="text-right border-l border-slate-800 pl-3">
            <span className="text-[10px] text-slate-400 block font-semibold">AI HEALTH</span>
            <span className="font-bold text-white">94% (Excellent)</span>
          </div>
        </div>

        {/* Mini Live Sparkline */}
        <div className="h-7 w-full overflow-hidden">
          <svg viewBox="0 0 240 30" className="w-full h-full">
            <path d="M 0 25 Q 40 5, 80 18 T 160 10 T 240 4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </motion.div>


      {/* MODULE 2: AI RESEARCH INTELLIGENCE (Floating Above-Left, Z-Index 20) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        onMouseEnter={() => setHoveredModule('research')}
        onMouseLeave={() => setHoveredModule(null)}
        onClick={() => onModuleClick?.('research')}
        className={`absolute top-6 left-4 sm:left-12 z-20 w-60 sm:w-64 bg-[#172033]/90 backdrop-blur-xl border border-amber-500/30 p-4 rounded-2xl shadow-xl transition-all duration-300 cursor-pointer font-mono ${
          hoveredModule === 'research' ? 'scale-105 border-amber-400 shadow-amber-500/20' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[11px] font-black uppercase tracking-wider">AI RESEARCH</span>
          </div>
          <span className="text-[9px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold">
            94% CONFIDENCE
          </span>
        </div>

        <div className="bg-amber-950/30 border border-amber-500/20 p-2.5 rounded-xl my-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
            <span>RELIANCE</span>
            <span className="text-emerald-400 font-mono">BUY</span>
          </div>
          <div className="text-[10px] text-slate-300">
            Target: <strong className="text-emerald-400">₹3,375</strong> • SEBI RA Compliant
          </div>
        </div>
        <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1">
          <span>Updated 3 mins ago</span>
          <span className="text-amber-400 font-bold flex items-center gap-0.5">Read Analysis <ArrowRight className="w-2.5 h-2.5" /></span>
        </div>
      </motion.div>


      {/* MODULE 3: WATCHLIST (Floating Above-Right, Z-Index 20) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * 8}px, ${mousePos.y * -6}px)` }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        onMouseEnter={() => setHoveredModule('watchlist')}
        onMouseLeave={() => setHoveredModule(null)}
        onClick={() => onModuleClick?.('watchlist')}
        className={`absolute top-6 right-4 sm:right-12 z-20 w-56 sm:w-60 bg-[#172033]/90 backdrop-blur-xl border border-primary/30 p-3.5 rounded-2xl shadow-xl transition-all duration-300 cursor-pointer font-mono ${
          hoveredModule === 'watchlist' ? 'scale-105 border-primary-light shadow-[rgba(21,81,157,0.3)]/20' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-[#64748B]">
            <Star className="w-3.5 h-3.5" />
            <span className="text-[11px] font-black uppercase tracking-wider">WATCHLIST</span>
          </div>
          <span className="text-[9px] text-slate-400">18 Stocks</span>
        </div>

        <div className="space-y-1 text-[11px]">
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900/80">
            <span className="font-bold text-white">RELIANCE</span>
            <span className="text-emerald-400 font-bold">+1.42% ▲</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900/80">
            <span className="font-bold text-white">TCS</span>
            <span className="text-emerald-400 font-bold">+0.82% ▲</span>
          </div>
          <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-900/80">
            <span className="font-bold text-white">INFY</span>
            <span className="text-rose-400 font-bold">-0.35% ▼</span>
          </div>
        </div>
      </motion.div>


      {/* MODULE 4: MARKET INTELLIGENCE (Floating Left, Z-Index 15) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * 5}px)` }}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        onMouseEnter={() => setHoveredModule('news')}
        onMouseLeave={() => setHoveredModule(null)}
        onClick={() => onModuleClick?.('news')}
        className={`absolute bottom-24 left-2 sm:left-8 z-15 w-52 sm:w-56 bg-[#172033]/90 backdrop-blur-xl border border-cyan-500/30 p-3.5 rounded-2xl shadow-xl transition-all duration-300 cursor-pointer font-mono ${
          hoveredModule === 'news' ? 'scale-105 border-cyan-400 shadow-cyan-500/20' : ''
        }`}
      >
        <div className="flex items-center gap-1.5 text-cyan-400 mb-1.5">
          <Newspaper className="w-3.5 h-3.5" />
          <span className="text-[11px] font-black uppercase tracking-wider">MARKET INTEL</span>
        </div>
        <div className="text-[11px] font-bold text-white mb-1">
          Market Mood: <span className="text-emerald-400">Bullish 🔥</span>
        </div>
        <div className="text-[10px] text-slate-300 bg-slate-900 p-2 rounded-lg leading-tight">
          RBI Policy Tomorrow • Banking Sector in Focus
        </div>
      </motion.div>


      {/* MODULE 5: AI COPILOT ADVISOR (Floating Right, Z-Index 15) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 7}px)` }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        onMouseEnter={() => setHoveredModule('ai-advisor')}
        onMouseLeave={() => setHoveredModule(null)}
        onClick={() => onModuleClick?.('ai-advisor')}
        className={`absolute bottom-24 right-2 sm:right-8 z-15 w-56 sm:w-60 bg-[#172033]/90 backdrop-blur-xl border border-purple-500/30 p-3.5 rounded-2xl shadow-xl transition-all duration-300 cursor-pointer font-mono ${
          hoveredModule === 'ai-advisor' ? 'scale-105 border-purple-400 shadow-purple-500/20' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-purple-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-wider">AI COPILOT</span>
          </div>
          <span className="text-[9px] text-purple-400 font-bold">92% CONFIDENCE</span>
        </div>
        <div className="text-[10px] text-slate-200 bg-purple-950/40 border border-purple-500/20 p-2 rounded-lg leading-tight">
          "Healthcare sector looks undervalued today. Rebalance suggested."
        </div>
      </motion.div>


      {/* MODULE 6: ORDERS EXECUTION (Floating Bottom Left, Z-Index 10) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * -6}px, ${mousePos.y * 10}px)` }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        onClick={() => onModuleClick?.('orders')}
        className="absolute bottom-4 left-16 sm:left-24 z-10 bg-[#172033]/90 backdrop-blur-xl border border-emerald-500/30 px-3 py-1.5 rounded-full font-mono text-[10px] text-slate-300 shadow-lg flex items-center gap-2"
      >
        <Zap className="w-3 h-3 text-emerald-400" />
        <span>3 Open Orders • <strong className="text-emerald-400">BUY TCS Filled</strong></span>
      </motion.div>


      {/* MODULE 7: WEALTH GOALS (Floating Bottom Right, Z-Index 10) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 10}px)` }}
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 3.9, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
        onClick={() => onModuleClick?.('goals')}
        className="absolute bottom-4 right-16 sm:right-24 z-10 bg-[#172033]/90 backdrop-blur-xl border border-amber-500/30 px-3 py-1.5 rounded-full font-mono text-[10px] text-slate-300 shadow-lg flex items-center gap-2"
      >
        <Target className="w-3 h-3 text-amber-400" />
        <span>Retirement Goal: <strong className="text-amber-400">68% Complete (2039)</strong></span>
      </motion.div>

    </div>
  );
};

export default FloatingWorkspaceHero;
