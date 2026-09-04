import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles, Shield, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface LiveMovingGraphAnimationProps {
  theme?: 'dark' | 'light';
  activeSignal?: {
    symbol: string;
    conviction: number;
    target: string;
    pattern: string;
  };
}

export const LiveMovingGraphAnimation: React.FC<LiveMovingGraphAnimationProps> = ({
  theme = 'dark',
  activeSignal = {
    symbol: 'RELIANCE',
    conviction: 96,
    target: '₹3,120',
    pattern: 'Cup & Handle Breakout',
  },
}) => {
  // Live price history (12 points)
  const [dataPoints, setDataPoints] = useState<number[]>([
    2850, 2870, 2840, 2890, 2910, 2885, 2920, 2940, 2915, 2950, 2934.5, 2960
  ]);
  const [currentPrice, setCurrentPrice] = useState<number>(2934.50);
  const [baselinePrice] = useState<number>(2850.00); // Initial entry price
  const [flashType, setFlashType] = useState<'profit' | 'loss' | null>(null);

  // Live simulation tick every 1.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const lastVal = prev[prev.length - 1];
        // Generate realistic fluctuation (-0.4% to +0.6% bias towards gain)
        const changePercent = (Math.random() * 0.9 - 0.35) / 100;
        const newVal = Math.max(2700, Math.min(3200, lastVal * (1 + changePercent)));
        
        setCurrentPrice(newVal);
        setFlashType(newVal >= lastVal ? 'profit' : 'loss');

        // Shift data array
        const newArr = [...prev.slice(1), newVal];
        return newArr;
      });

      setTimeout(() => setFlashType(null), 600);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // P&L Calculations
  const pnlAmount = (currentPrice - baselinePrice) * 100; // 100 shares quantity
  const pnlPercent = ((currentPrice - baselinePrice) / baselinePrice) * 100;
  const isProfit = pnlAmount >= 0;

  // SVG Path generation for 400x220 canvas
  const minVal = Math.min(...dataPoints) * 0.98;
  const maxVal = Math.max(...dataPoints) * 1.02;
  const width = 380;
  const height = 180;
  const margin = 20;

  const points = dataPoints.map((val, idx) => {
    const x = margin + (idx / (dataPoints.length - 1)) * (width - margin * 2);
    const y = height - margin - ((val - minVal) / (maxVal - minVal)) * (height - margin * 2);
    return { x, y };
  });

  // Construct smooth SVG path string
  const pathString = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
  }, '');

  // Area path for gradient fill
  const areaString = `${pathString} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const lastPt = points[points.length - 1] || { x: 340, y: 50 };

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      
      {/* TOP FLOATING LIVE P&L HEADER BADGE */}
      <div className="flex items-center justify-between mb-4 font-mono">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isProfit ? 'bg-emerald-500 animate-ping' : 'bg-danger animate-ping'}`} />
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            LIVE P&L ADVISORY MONITOR
          </span>
        </div>

        <motion.div
          animate={{ scale: flashType ? [1, 1.06, 1] : 1 }}
          className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 shadow-md ${
            isProfit
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-danger/10 border-danger/30 text-rose-400'
          }`}
        >
          {isProfit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{isProfit ? 'PROFIT' : 'LOSS'}: </span>
          <span>
            {isProfit ? '+' : ''}₹{Math.abs(pnlAmount).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
          <span className="text-[10px] opacity-80">({isProfit ? '+' : ''}{pnlPercent.toFixed(2)}%)</span>
        </motion.div>
      </div>

      {/* GRAPH CANVAS & ANIMATED SVG (Free Floating) */}
      <div className="relative p-2 overflow-visible bg-transparent">
        <svg viewBox="0 0 380 200" className="w-full h-auto overflow-visible">
          <defs>
            {/* Profit Area Gradient */}
            <linearGradient id="profitAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>

            {/* Loss Area Gradient */}
            <linearGradient id="lossAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
            </linearGradient>

            {/* Background Grid Pattern */}
            <pattern id="graphGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke={theme === 'dark' ? '#334155' : '#CBD5E1'} strokeWidth="0.6" opacity="0.3" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width="100%" height="100%" fill="url(#graphGrid)" />

          {/* Baseline Reference Line */}
          <line x1="10" y1="140" x2="370" y2="140" stroke="#64748B" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <text x="15" y="135" fill="#64748B" fontSize="9" fontFamily="monospace">Entry: ₹2,850.00</text>

          {/* Candlestick Bars */}
          {points.map((pt, i) => {
            if (i % 2 !== 0) return null;
            const candleHeight = 20 + (i % 3) * 10;
            const isGreenCandle = i % 4 !== 0;
            return (
              <g key={i}>
                <line x1={pt.x} y1={pt.y - candleHeight / 2} x2={pt.x} y2={pt.y + candleHeight / 2} stroke="#64748B" strokeWidth="1.5" />
                <rect
                  x={pt.x - 5}
                  y={pt.y - candleHeight / 3}
                  width="10"
                  height={candleHeight / 1.5}
                  fill={isGreenCandle ? "#10B981" : "#F43F5E"}
                  rx="2"
                  opacity="0.85"
                />
              </g>
            );
          })}

          {/* Area Gradient Fill */}
          <motion.path
            d={areaString}
            fill={isProfit ? 'url(#profitAreaGrad)' : 'url(#lossAreaGrad)'}
            transition={{ duration: 0.5 }}
          />

          {/* Animated Smooth Line Path */}
          <motion.path
            d={pathString}
            fill="none"
            stroke={isProfit ? '#10B981' : '#F43F5E'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            transition={{ duration: 0.5 }}
          />

          {/* AI Prediction Curve overlay (Blue dotted line) */}
          <motion.path
            d={pathString}
            fill="none"
            stroke="#15519D"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.7"
          />

          {/* Live Pulsing Head Circle on Latest Price */}
          <circle cx={lastPt.x} cy={lastPt.y} r="8" fill={isProfit ? '#10B981' : '#F43F5E'} className="animate-ping" opacity="0.6" />
          <circle cx={lastPt.x} cy={lastPt.y} r="5" fill={isProfit ? '#10B981' : '#F43F5E'} stroke="#FFFFFF" strokeWidth="2" />
        </svg>

        {/* FLOATING LIVE PRICE BADGE OVERLAPPING LATEST TICK */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800 font-mono text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">CURRENT TICK PRICE</span>
            <span className="font-black text-white text-base">
              ₹{currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="text-right">
            <span className="text-slate-400 block text-[10px]">AI CONVICTION SIGNAL</span>
            <span className="text-emerald-400 font-bold text-xs flex items-center gap-1 justify-end">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> {activeSignal.symbol} ({activeSignal.conviction}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMovingGraphAnimation;
