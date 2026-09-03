import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles, Activity, ShieldCheck } from 'lucide-react';

interface RealisticLiveMovingChartProps {
  theme?: 'dark' | 'light';
  symbol?: string;
  baselinePrice?: number;
}

export const RealisticLiveMovingChart: React.FC<RealisticLiveMovingChartProps> = ({
  theme = 'dark',
  symbol = 'RELIANCE',
  baselinePrice = 2850.00,
}) => {
  // We keep a sliding window of 40 data points
  const MAX_POINTS = 35;
  const [data, setData] = useState<number[]>(() => {
    // Generate realistic initial wave
    const initial: number[] = [];
    let price = baselinePrice;
    for (let i = 0; i < MAX_POINTS; i++) {
      const step = (Math.random() * 8 - 3.5);
      price = Math.max(2750, Math.min(3150, price + step));
      initial.push(price);
    }
    return initial;
  });

  const [currentPrice, setCurrentPrice] = useState<number>(2934.50);
  const [trend, setTrend] = useState<'up' | 'down'>('up');

  // Smooth update loop (Every 1.2s for calm, realistic stock movement)
  useEffect(() => {
    const timer = setInterval(() => {
      setData((prev) => {
        const lastVal = prev[prev.length - 1] || 2900;
        // Realistic calm stock fluctuation
        const delta = (Math.random() * 8 - 3.2);
        const newVal = Math.max(2780, Math.min(3100, lastVal + delta));

        setCurrentPrice(newVal);
        setTrend(delta >= 0 ? 'up' : 'down');

        // Shift queue left
        const updated = [...prev.slice(1), newVal];
        return updated;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  // Compute P&L
  const pnlVal = (currentPrice - baselinePrice) * 100;
  const pnlPercent = ((currentPrice - baselinePrice) / baselinePrice) * 100;
  const isGain = pnlVal >= 0;

  // Chart Geometry Calculations
  const minPrice = Math.min(...data) - 15;
  const maxPrice = Math.max(...data) + 15;
  const svgWidth = 460;
  const svgHeight = 220;
  const paddingX = 30;
  const paddingY = 30;

  const points = data.map((val, i) => {
    const x = paddingX + (i / (MAX_POINTS - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - ((val - minPrice) / (maxPrice - minPrice)) * (svgHeight - paddingY * 2);
    return { x, y, val };
  });

  // Calculate smooth SVG path line using cubic bezier smoothing
  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
  }, '');

  // Fill gradient area below line
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  const rawLastPt = points[points.length - 1] || { x: svgWidth - paddingX, y: 100 };
  // Clamp tip point safely within container boundaries
  const lastPt = {
    x: Math.min(svgWidth - 25, Math.max(25, rawLastPt.x)),
    y: Math.min(svgHeight - 25, Math.max(25, rawLastPt.y)),
  };

  return (
    <div className="relative w-full max-w-xl mx-auto select-none overflow-hidden p-1">
      
      {/* REAL-TIME HEADER P&L STATUS DISPLAY */}
      <div className="flex items-center justify-between mb-3 font-mono">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-[#64748B]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-white">{symbol}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ● LIVE FEED
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-sans">NSE Real-Time Stream</span>
          </div>
        </div>

        {/* Live P&L Box */}
        <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold font-mono transition-colors shadow-lg ${
          isGain
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-danger/10 border-danger/30 text-rose-400'
        }`}>
          <div className="text-[10px] opacity-70 uppercase tracking-wider">Unrealized P&L</div>
          <div className="text-sm font-black flex items-center gap-1">
            {isGain ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{isGain ? '+' : ''}₹{Math.abs(pnlVal).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            <span className="text-[10px]">({isGain ? '+' : ''}{pnlPercent.toFixed(2)}%)</span>
          </div>
        </div>
      </div>

      {/* FREE-FLOATING REALISTIC ANIMATED GRAPH CANVAS */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-hidden">
          <defs>
            {/* Green Profit Gradient */}
            <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>

            {/* Red Loss Gradient */}
            <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
            </linearGradient>

            {/* Subtle Grid Lines */}
            <pattern id="chartGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.6" opacity="0.2" />
            </pattern>
          </defs>

          {/* Grid Background */}
          <rect width="100%" height={svgHeight - paddingY} fill="url(#chartGrid)" />

          {/* Entry Baseline Reference Line */}
          <line
            x1={paddingX}
            y1={svgHeight - paddingY - ((baselinePrice - minPrice) / (maxPrice - minPrice)) * (svgHeight - paddingY * 2)}
            x2={svgWidth - paddingX}
            y2={svgHeight - paddingY - ((baselinePrice - minPrice) / (maxPrice - minPrice)) * (svgHeight - paddingY * 2)}
            stroke="#64748B"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <text
            x={paddingX + 5}
            y={svgHeight - paddingY - ((baselinePrice - minPrice) / (maxPrice - minPrice)) * (svgHeight - paddingY * 2) - 5}
            fill="#94A3B8"
            fontSize="9"
            fontFamily="monospace"
          >
            Baseline: ₹{baselinePrice.toFixed(2)}
          </text>

          {/* Area Gradient Fill */}
          <path
            d={areaD}
            fill={isGain ? 'url(#profitGrad)' : 'url(#lossGrad)'}
            style={{ transition: 'd 1.1s ease-in-out' }}
          />

          {/* Dotted AI Signal Prediction Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#15519D"
            strokeWidth="2"
            strokeDasharray="5 5"
            opacity="0.5"
            style={{ transition: 'd 1.1s ease-in-out' }}
          />

          {/* Main Solid Ticking Price Line */}
          <path
            d={pathD}
            fill="none"
            stroke={isGain ? '#10B981' : '#F43F5E'}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'd 1.1s ease-in-out' }}
          />

          {/* Safe Tip Glow Circles (Contained inside canvas) */}
          <circle
            cx={lastPt.x}
            cy={lastPt.y}
            r="8"
            fill={isGain ? '#10B981' : '#F43F5E'}
            opacity="0.3"
          />
          <circle
            cx={lastPt.x}
            cy={lastPt.y}
            r="4.5"
            fill={isGain ? '#10B981' : '#F43F5E'}
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {/* Floating Price Tag Box inside SVG Bounds */}
          <g transform={`translate(${Math.min(svgWidth - 95, Math.max(10, lastPt.x - 40))}, ${Math.min(svgHeight - 35, Math.max(10, lastPt.y - 28))})`}>
            <rect
              width="80"
              height="22"
              rx="6"
              fill={isGain ? '#10B981' : '#F43F5E'}
            />
            <text
              x="40"
              y="15"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              ₹{currentPrice.toFixed(2)}
            </text>
          </g>
        </svg>

        {/* BOTTOM METRICS BAR */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-slate-400">AI Conviction:</span>
            <span className="text-white font-bold">96% (Bullish Breakout)</span>
          </div>

          <div className="text-slate-400">
            Target: <span className="text-emerald-400 font-bold">₹3,120.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealisticLiveMovingChart;
