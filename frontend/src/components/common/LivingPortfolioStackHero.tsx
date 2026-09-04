import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, ArrowUpRight, Sparkles, Shield, Briefcase, Zap, 
  Layers, CircleDollarSign, CheckCircle2, ChevronRight, Activity, Wallet
} from 'lucide-react';

interface LivingPortfolioStackHeroProps {
  theme?: 'dark' | 'light';
  onActionClick?: (action: string) => void;
}

export const LivingPortfolioStackHero: React.FC<LivingPortfolioStackHeroProps> = ({
  theme = 'dark',
  onActionClick,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0); // 0: Summary, 1: AI Insight, 2: Holdings
  const [portfolioValue, setPortfolioValue] = useState(1248420.25);
  const [todayPnl, setTodayPnl] = useState(18942.50);
  const [todayPnlPercent, setTodayPnlPercent] = useState(1.42);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Rotate Stack Cards every 8 seconds
  useEffect(() => {
    const stackTimer = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(stackTimer);
  }, []);

  // Live Micro Ticks for Portfolio Value every 2 seconds
  useEffect(() => {
    const tickTimer = setInterval(() => {
      const delta = (Math.random() * 240 - 90);
      setPortfolioValue((prev) => Math.max(1240000, prev + delta));
      setTodayPnl((prev) => prev + delta);
      setTodayPnlPercent((prev) => ((prev + delta / 1000) > 0 ? (prev + delta / 1000) : 0.8));
    }, 2000);
    return () => clearInterval(tickTimer);
  }, []);

  // Parallax mouse handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  // 3D Card Stack Order Resolver
  const getCardProps = (cardId: number) => {
    // Offset in stack
    const offset = (cardId - activeCardIndex + 3) % 3;
    if (offset === 0) {
      // FRONT CARD
      return {
        zIndex: 30,
        scale: 1,
        y: 0,
        rotateX: 0,
        opacity: 1,
      };
    } else if (offset === 1) {
      // MIDDLE CARD (Slightly behind, shifted down)
      return {
        zIndex: 20,
        scale: 0.94,
        y: 22,
        rotateX: -4,
        opacity: 0.85,
      };
    } else {
      // BACK CARD (Deep in stack, shifted further down)
      return {
        zIndex: 10,
        scale: 0.88,
        y: 44,
        rotateX: -8,
        opacity: 0.65,
      };
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full max-w-2xl mx-auto h-[540px] flex items-center justify-center select-none overflow-hidden"
    >
      {/* BACKGROUND AMBIENT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-gradient-to-tr from-primary/15 via-emerald-500/15 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* SATELLITE FLOATING WIDGET 1: PORTFOLIO ALLOCATION (Top Left) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -16}px)` }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-6 left-2 sm:left-6 z-40 bg-[#172033]/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-xl font-mono text-xs text-white"
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Allocation</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span>Stocks <strong className="text-emerald-400">72%</strong></span>
          <span className="text-slate-600">|</span>
          <span>MFs <strong className="text-[#64748B]">18%</strong></span>
          <span className="text-slate-600">|</span>
          <span>ETF <strong className="text-purple-400">10%</strong></span>
        </div>
      </motion.div>

      {/* SATELLITE FLOATING WIDGET 2: AVAILABLE CASH (Top Right) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * 18}px, ${mousePos.y * -14}px)` }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-6 right-2 sm:right-6 z-40 bg-[#172033]/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-xl font-mono text-xs text-white"
      >
        <div className="flex items-center gap-2">
          <Wallet className="w-3.5 h-3.5 text-[#64748B]" />
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Available Cash</span>
            <span className="font-black text-xs text-white">₹84,250.00</span>
          </div>
        </div>
      </motion.div>

      {/* SATELLITE FLOATING WIDGET 3: AI CONFIDENCE (Bottom Right) */}
      <motion.div
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 18}px)` }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-6 right-2 sm:right-6 z-40 bg-[#172033]/90 backdrop-blur-xl border border-emerald-500/30 p-3 rounded-2xl shadow-xl font-mono text-xs text-white"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Market Mood</span>
            <span className="font-black text-xs text-emerald-400">Bullish 🔥 (96% Confidence)</span>
          </div>
        </div>
      </motion.div>

      {/* 3D LIVING PORTFOLIO STACK CONTAINER */}
      <div className="relative w-[340px] sm:w-[440px] h-[380px] flex items-center justify-center">
        
        {/* CARD 0: LIVE PORTFOLIO SUMMARY (Front / Stackable) */}
        <motion.div
          animate={getCardProps(0)}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setActiveCardIndex(0)}
          style={{ transformOrigin: 'top center' }}
          className="absolute inset-0 bg-[#1E293B]/95 backdrop-blur-2xl border border-white/15 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between cursor-pointer group"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black tracking-wider text-slate-300 uppercase">
                Good Evening, Omar
              </span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              11:42 AM IST ● LIVE
            </span>
          </div>

          {/* Main Portfolio Value */}
          <div className="my-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
              Net Portfolio Wealth
            </span>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                ₹{portfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                +22.84% Overall
              </span>
            </div>
          </div>

          {/* Today's Profit & Health Row */}
          <div className="grid grid-cols-2 gap-3 bg-slate-900/60 border border-slate-800 p-3 rounded-2xl font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">TODAY'S P&L</span>
              <span className="text-sm font-black text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +₹{todayPnl.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-emerald-500 font-bold">(+{todayPnlPercent.toFixed(2)}%)</span>
            </div>

            <div className="border-l border-slate-800 pl-3">
              <span className="text-[10px] text-slate-400 block font-semibold">PORTFOLIO HEALTH</span>
              <span className="text-sm font-black text-white">94%</span>
              <span className="text-[10px] text-[#64748B] font-bold">AI Status: Excellent</span>
            </div>
          </div>

          {/* Mini Sparkline Curve */}
          <div className="h-9 w-full my-1 overflow-hidden">
            <svg viewBox="0 0 300 40" className="w-full h-full">
              <path
                d="M 0 35 Q 50 10, 100 25 T 200 15 T 300 5"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M 0 35 Q 50 10, 100 25 T 200 15 T 300 5 L 300 40 L 0 40 Z"
                fill="url(#sparklineGrad)"
                opacity="0.25"
              />
              <defs>
                <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Quick Action Floating Pills */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
            <button 
              onClick={(e) => { e.stopPropagation(); onActionClick?.('portfolio'); }}
              className="flex-1 py-1.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Portfolio</span>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onActionClick?.('trade'); }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition cursor-pointer"
            >
              Trade
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onActionClick?.('research'); }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition cursor-pointer"
            >
              Research
            </button>
          </div>
        </motion.div>


        {/* CARD 1: AI INSIGHT OF THE MOMENT (Middle / Stackable) */}
        <motion.div
          animate={getCardProps(1)}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setActiveCardIndex(1)}
          style={{ transformOrigin: 'top center' }}
          className="absolute inset-0 bg-[#172033]/95 backdrop-blur-2xl border border-purple-500/30 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between font-mono">
            <div className="flex items-center gap-2 text-purple-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-black tracking-wider uppercase">AI COPILOT INSIGHT</span>
            </div>
            <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 font-mono">
              96% Conviction
            </span>
          </div>

          <div className="my-4 space-y-3 font-mono">
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30">
              <span className="text-[10px] text-purple-300 font-bold block uppercase tracking-wider mb-1">
                SEBI AI SIGNAL RECOMMENDATION
              </span>
              <p className="text-xs text-white leading-relaxed font-sans">
                "Reliance Industries has triggered a <strong>Cup & Handle Breakout</strong> pattern. Target: <strong>₹3,120 (+5.8%)</strong>. Stoploss: ₹2,890."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">SEBI RA ID</span>
                <span className="text-emerald-400 font-bold">INH000009821</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">TIME FRAME</span>
                <span className="text-white font-bold">Swing (1-3 Wks)</span>
              </div>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); onActionClick?.('ai-signal'); }}
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-primary hover:from-purple-500 hover:to-primary text-white font-mono font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Execute AI Trade Order</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>


        {/* CARD 2: TOP LIVE HOLDINGS (Back / Stackable) */}
        <motion.div
          animate={getCardProps(2)}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setActiveCardIndex(2)}
          style={{ transformOrigin: 'top center' }}
          className="absolute inset-0 bg-[#172033]/95 backdrop-blur-2xl border border-emerald-500/30 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-black tracking-wider uppercase">TOP LIVE HOLDINGS</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">3 Stocks</span>
          </div>

          <div className="space-y-2.5 my-3 font-mono text-xs">
            {/* Holding 1 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <span className="font-black text-white block">RELIANCE</span>
                <span className="text-[10px] text-slate-400">120 Shares</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white block">₹3,024.20</span>
                <span className="text-[10px] text-emerald-400 font-bold">+2.40% ▲</span>
              </div>
            </div>

            {/* Holding 2 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <span className="font-black text-white block">TCS</span>
                <span className="text-[10px] text-slate-400">45 Shares</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white block">₹4,185.10</span>
                <span className="text-[10px] text-emerald-400 font-bold">+1.80% ▲</span>
              </div>
            </div>

            {/* Holding 3 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <span className="font-black text-white block">HDFCBANK</span>
                <span className="text-[10px] text-slate-400">180 Shares</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white block">₹1,682.40</span>
                <span className="text-[10px] text-emerald-400 font-bold">+0.75% ▲</span>
              </div>
            </div>
          </div>

          <div className="text-center font-mono text-[10px] text-slate-400 pt-1">
            Tap stack to rotate views • Auto-shuffles every 8s
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LivingPortfolioStackHero;
