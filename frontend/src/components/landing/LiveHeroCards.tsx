import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChartPoint {
  x: number;
  y: number;
}

interface AiSignal {
  symbol: string;
  name: string;
  action: 'BUY' | 'SELL';
  conviction: number;
  pattern: string;
  target: string;
  change: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const AI_SIGNALS: AiSignal[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', action: 'BUY', conviction: 96, pattern: 'Cup & Handle', target: '₹3,120', change: 1.18 },
  { symbol: 'TCS', name: 'Tata Consultancy', action: 'BUY', conviction: 91, pattern: 'Breakout', target: '₹4,280', change: 0.72 },
  { symbol: 'INFY', name: 'Infosys Ltd', action: 'BUY', conviction: 88, pattern: 'Bull Flag', target: '₹1,620', change: 0.85 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', action: 'BUY', conviction: 94, pattern: 'Golden Cross', target: '₹1,720', change: 0.95 },
  { symbol: 'TATASTEEL', name: 'Tata Steel', action: 'SELL', conviction: 82, pattern: 'Head & Shoulders', target: '₹140', change: -1.12 },
  { symbol: 'WIPRO', name: 'Wipro Ltd', action: 'BUY', conviction: 87, pattern: 'Ascending Triangle', target: '₹520', change: 0.64 },
];

const CHART_TABS = ['1D', '1W', '1M', '3M', '1Y', 'MAX'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateInitialPoints(count = 20): ChartPoint[] {
  const pts: ChartPoint[] = [];
  let y = 30;
  for (let i = 0; i < count; i++) {
    y = Math.max(5, Math.min(55, y + (Math.random() - 0.42) * 8));
    pts.push({ x: (i / (count - 1)) * 120, y: 60 - y });
  }
  return pts;
}

function pointsToPath(pts: ChartPoint[]): string {
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

function formatIndian(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export const LiveHeroCards: React.FC = () => {
  const navigate = useNavigate();

  // Portfolio state
  const [chartPoints, setChartPoints] = useState<ChartPoint[]>(generateInitialPoints());
  const [portfolioValue, setPortfolioValue] = useState(1248420);
  const [todayPnL, setTodayPnL] = useState(18420);
  const [overallReturn, setOverallReturn] = useState(22.84);
  const [activeTab, setActiveTab] = useState('1M');

  // Market size state
  const [aiCallsToday, setAiCallsToday] = useState(1240);
  const [activeInvestors, setActiveInvestors] = useState(50000);

  // AI Signal state
  const [signalIndex, setSignalIndex] = useState(0);
  const [signalFading, setSignalFading] = useState(false);

  // ── Tick portfolio chart every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setChartPoints(prev => {
        const last = prev[prev.length - 1];
        const newY = Math.max(5, Math.min(58, last.y + (Math.random() - 0.45) * 5));
        const shifted = prev.slice(1).map((p, i) => ({
          x: (i / (prev.length - 1)) * 120,
          y: p.y,
        }));
        return [
          ...shifted,
          { x: 120, y: newY },
        ];
      });

      // Tick P&L
      setTodayPnL(prev => {
        const delta = Math.round((Math.random() - 0.45) * 180);
        return Math.max(0, prev + delta);
      });
      setPortfolioValue(prev => {
        const delta = Math.round((Math.random() - 0.45) * 600);
        return Math.max(1200000, prev + delta);
      });
      setOverallReturn(prev => {
        const delta = (Math.random() - 0.48) * 0.05;
        return Math.max(18, parseFloat((prev + delta).toFixed(2)));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ── Increment AI calls every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAiCallsToday(prev => prev + Math.floor(Math.random() * 3) + 1);
      setActiveInvestors(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ── Rotate AI signal every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalFading(true);
      setTimeout(() => {
        setSignalIndex(prev => (prev + 1) % AI_SIGNALS.length);
        setSignalFading(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const signal = AI_SIGNALS[signalIndex];
  const chartPath = pointsToPath(chartPoints);
  const lastPoint = chartPoints[chartPoints.length - 1];
  const isPortfolioPositive = todayPnL >= 0;

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* ── Card 1: Total Market Size ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 flex flex-col gap-3"
      >
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Market Size</span>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-3xl font-black text-white">₹42.7T</span>
            <span className="block text-[10px] text-slate-400 mt-1">NSE + BSE Combined</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block">Live as of</span>
            <span className="text-[10px] text-emerald-400 font-bold block animate-pulse">Today</span>
          </div>
        </div>

        {/* Sub-card */}
        <div className="mt-1 bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
          <div>
            <span className="text-[10px] text-slate-500 block font-semibold">Total Managed</span>
            <span className="text-xl font-black text-slate-900">₹500Cr+</span>
          </div>
          <div className="flex -space-x-1.5">
            {['bg-primary', 'bg-emerald-500', 'bg-amber-500'].map((c, i) => (
              <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-white`} />
            ))}
            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center">
              <span className="text-[8px] font-black text-slate-600">+</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Card 2: Live Portfolio Chart ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 flex flex-col gap-2"
      >
        <div className="flex items-start justify-between">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Portfolio Value</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            overallReturn >= 0 ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
          }`}>
            {overallReturn >= 0 ? '+' : ''}{overallReturn.toFixed(2)}%
          </span>
        </div>

        <motion.span
          key={portfolioValue}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-black text-white"
        >
          {formatIndian(portfolioValue)}
        </motion.span>

        <motion.span
          key={todayPnL}
          initial={{ scale: 0.96 }}
          animate={{ scale: 1 }}
          className={`text-xs font-semibold ${isPortfolioPositive ? 'text-emerald-400' : 'text-red-400'}`}
        >
          {isPortfolioPositive ? '+' : '-'}{formatIndian(Math.abs(todayPnL))} today
          {isPortfolioPositive
            ? <TrendingUp className="inline w-3 h-3 ml-1" />
            : <TrendingDown className="inline w-3 h-3 ml-1" />
          }
        </motion.span>

        {/* Animated SVG Chart */}
        <svg viewBox="0 0 120 60" className="w-full h-12 mt-1" preserveAspectRatio="none">
          <defs>
            <linearGradient id="liveChartGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#15519D" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="liveAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Area fill */}
          <path
            d={`${chartPath} L120,60 L0,60 Z`}
            fill="url(#liveAreaGrad)"
          />
          {/* Line */}
          <path
            d={chartPath}
            fill="none"
            stroke="url(#liveChartGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Live dot */}
          <circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill="#10B981">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Time tabs */}
        <div className="flex justify-between text-[9px] font-mono mt-0.5">
          {CHART_TABS.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-1 py-0.5 rounded transition cursor-pointer ${
                activeTab === t
                  ? 'text-[#64748B] font-bold bg-blue-400/10'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Card 3: AI Signal Feed ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 flex flex-col gap-3"
      >
        {/* Invest input bar */}
        <div className="flex items-center gap-0 rounded-xl overflow-hidden border border-white/10 bg-white/5">
          <span className="text-white font-black text-sm px-3 py-2.5 whitespace-nowrap">Invest</span>
          <span className="flex-1 text-slate-400 text-xs px-1 py-2.5 truncate">{signal.symbol}, NIFTY50</span>
          <button
            onClick={() => navigate('/signup')}
            className="shrink-0 m-1 px-3 py-2 bg-white text-slate-900 text-xs font-black rounded-lg cursor-pointer flex items-center gap-1"
          >
            Start <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Live AI Signal */}
        <motion.div
          animate={{ opacity: signalFading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="border-t border-white/10 pt-2.5 space-y-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-semibold">AI Signal — Live</span>
            <span className="text-[9px] text-slate-500 font-mono">
              #{signalIndex + 1}/{AI_SIGNALS.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${signal.action === 'BUY' ? 'bg-emerald-400' : 'bg-red-400'}`} />
            <span className="text-white font-bold text-sm">{signal.symbol}</span>
            <span className={`text-xs font-black ml-auto px-2 py-0.5 rounded-full ${
              signal.action === 'BUY'
                ? 'text-emerald-400 bg-emerald-400/15'
                : 'text-red-400 bg-red-400/15'
            }`}>
              {signal.action} {signal.conviction}%
            </span>
          </div>
          <span className="text-slate-400 text-[11px] block">{signal.pattern} · Target {signal.target}</span>
          <span className={`text-[11px] font-semibold ${signal.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {signal.change >= 0 ? '↑' : '↓'} {Math.abs(signal.change)}% today
          </span>
        </motion.div>

        <div className="border-t border-white/10 pt-2">
          <h3 className="text-white font-black text-sm leading-snug">Better investments<br />with Univest AI.</h3>
        </div>
      </motion.div>

      {/* ── Card 4: SEBI Stats ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">SEBI Registered</span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono -mt-1">RA: INH000009821</span>

        <div className="space-y-2.5 mt-0.5">
          {[
            { label: 'Active Investors', value: activeInvestors.toLocaleString('en-IN') + '+', live: true },
            { label: 'Research Accuracy', value: '98.4%', green: true },
            { label: 'Monthly Volume', value: '₹500Cr+' },
            { label: 'AI Calls Today', value: aiCallsToday.toLocaleString('en-IN'), green: true, live: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1">
                {item.live && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                )}
                {item.label}
              </span>
              <motion.span
                key={`${item.label}-${item.value}`}
                initial={{ opacity: 0.6, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-xs font-black ${item.green ? 'text-emerald-400' : 'text-white'}`}
              >
                {item.value}
              </motion.span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LiveHeroCards;
