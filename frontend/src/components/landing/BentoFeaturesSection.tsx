import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, CandlestickChart, Briefcase, Zap,
  Activity
} from 'lucide-react';

// ─── Real UI Mockups ─────────────────────────────────────────────────────────

function AISignalsMockup() {
  return (
    <div className="absolute top-2 left-6 right-0 bottom-0 sm:left-8">
      <div className="w-full h-full bg-[#172033] border-t border-l border-slate-700/50 rounded-tl-2xl shadow-2xl overflow-hidden group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500 flex flex-col">
        <div className="px-3 py-2 border-b border-slate-800 flex justify-between items-center bg-[#1E293B]/50 shrink-0">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="text-[10px] font-semibold text-slate-200 uppercase tracking-wider">Alpha Scanner</span>
          </div>
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </div>
        <div className="p-2.5 flex flex-col gap-1.5 flex-1 min-h-0 overflow-hidden">
          {[
            { sym: 'RELIANCE', act: 'BUY', price: '₹3,120', prob: '96%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
            { sym: 'TCS', act: 'BUY', price: '₹4,280', prob: '91%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
            { sym: 'INFY', act: 'BUY', price: '₹1,620', prob: '88%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
          ].map((s, i) => (
            <div key={i} className="flex justify-between items-center p-1.5 rounded-md bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700/30">
              <div>
                <div className="text-[11px] font-bold text-white leading-none">{s.sym}</div>
                <div className="text-[9px] text-slate-400 mt-1">Target: {s.price}</div>
              </div>
              <div className="text-right">
                <div className={`inline-block text-[9px] font-black px-1.5 py-0.5 rounded ${s.bg} ${s.color}`}>
                  {s.act}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartingMockup() {
  return (
    <div className="absolute bottom-0 left-6 right-6 sm:left-8 sm:right-8 top-2 bg-[#172033] border-t border-x border-slate-700/50 rounded-t-2xl overflow-hidden group-hover:-translate-y-2 transition-transform duration-500">
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDM5LjVoNDBWNDBoLTQweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA0KSIvPjxwYXRoIGQ9Ik0zOS41IDB2NDBoLjVWMEgzOS41eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA0KSIvPjwvc3ZnPg==')] opacity-30" />
      
      {/* Candles */}
      <div className="absolute inset-0 flex items-end justify-between px-3 pb-2 pt-6 gap-1.5">
        {[40, 50, 45, 60, 55, 70, 65, 80, 85, 75, 90].map((h, i) => {
          const isUp = i === 0 || h >= [40, 50, 45, 60, 55, 70, 65, 80, 85, 75, 90][i - 1];
          return (
            <div key={i} className="relative flex flex-col items-center justify-end h-full flex-1">
              <div className={`absolute w-[1px] h-full ${isUp ? 'bg-purple-500/50' : 'bg-danger/50'}`} style={{ maxHeight: `${h + 15}%` }} />
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className={`relative w-full max-w-[8px] rounded-sm ${isUp ? 'bg-purple-500' : 'bg-danger'}`}
              />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#172033] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

function LatencyMockup() {
  const [latency, setLatency] = useState(8);
  useEffect(() => {
    const t = setInterval(() => setLatency(Math.floor(Math.random() * 5) + 6), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      <div className="flex items-end justify-center gap-2 mb-2 z-10 relative">
        <span className="text-4xl font-black text-white tracking-tighter tabular-nums drop-shadow-lg">
          {latency}
        </span>
        <span className="text-emerald-400 font-bold mb-1 drop-shadow-md text-sm">ms</span>
      </div>
      <div className="w-full flex gap-1 h-14 items-end px-6 sm:px-8 opacity-70 group-hover:opacity-100 transition-opacity">
        {[4,7,5,8,6,9,5,7,4,6,8,5,10,6,8,7].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: h * 3 }}
            animate={{ height: [h * 3, h * 4, h * 2.5, h * 3] }}
            transition={{ duration: 1.5 + (i * 0.1), repeat: Infinity, repeatType: 'reverse' }}
            className="flex-1 bg-emerald-500/20 rounded-t-sm"
          />
        ))}
      </div>
    </div>
  );
}

function PortfolioMockup() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500 pb-2">
      <div className="w-24 h-24 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-xl">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#1E293B" strokeWidth="12" />
          <motion.circle
            cx="50" cy="50" r="40" fill="none" stroke="#F59E0B" strokeWidth="12"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            whileInView={{ strokeDashoffset: 251.2 * 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
          <motion.circle
            cx="50" cy="50" r="40" fill="none" stroke="#15519D" strokeWidth="12"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            whileInView={{ strokeDashoffset: 251.2 * 0.7 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="origin-center rotate-[144deg]"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
          <span className="text-[9px] text-slate-400 font-bold tracking-wider mb-0.5">CAGR</span>
          <span className="text-base font-black text-white leading-none">24.5%</span>
        </div>
      </div>
      <div className="w-full mt-3 flex justify-center gap-4 text-[10px]">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/20"/> <span className="text-slate-300">Equities</span> <span className="text-white font-bold">60%</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-[rgba(21,81,157,0.3)]/20"/> <span className="text-slate-300">Debt</span> <span className="text-white font-bold">40%</span></div>
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
interface Props { theme: 'dark' | 'light' }

export const BentoFeaturesSection: React.FC<Props> = ({ theme }) => {
  const dark = theme === 'dark';

  const cardBase = `relative rounded-[1.5rem] flex flex-col overflow-hidden transition-all duration-500 group ${
    dark
      ? 'bg-[#0B1120] border border-slate-800 hover:border-slate-700 shadow-2xl'
      : 'bg-white border border-slate-200/60 hover:border-slate-300 shadow-xl'
  }`;

  return (
    <section id="capabilities" className="space-y-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
          Platform Capabilities
        </span>
        <h2 className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
          Everything to Generate Alpha
        </h2>
        <p className={`text-sm font-medium mx-auto max-w-lg ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Engineered for elite traders and investors. Real-time data, AI-driven insights, and professional-grade charting.
        </p>
      </div>

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-[22rem] gap-6">

        {/* ── Card 1: AI Signal Engine ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`${cardBase} bg-gradient-to-br from-[#0B1120] to-blue-900/10`}
        >
          <div className="p-6 sm:p-8 z-10 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <h3 className={`text-xl font-black mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Autonomous AI Engine
            </h3>
            <p className={`text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Scans candlestick patterns, volume surges, and RSI breakouts across 4,000+ Indian stocks in real time.
            </p>
          </div>
          <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-br-[1.5rem]">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/30 transition-colors duration-700" />
            <AISignalsMockup />
          </div>
        </motion.div>

        {/* ── Card 2: Pro Charting ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${cardBase} bg-gradient-to-br from-[#0B1120] to-purple-900/10`}
        >
          <div className="p-6 sm:p-8 z-10 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <CandlestickChart className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className={`text-xl font-black mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Pro Charting
            </h3>
            <p className={`text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Institutional-grade technical charts with RSI, MACD, Moving Averages, and fundamental ratio overlays.
            </p>
          </div>
          <div className="relative flex-1 min-h-0 w-full overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/30 transition-colors duration-700" />
            <ChartingMockup />
          </div>
        </motion.div>

        {/* ── Card 3: Latency ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${cardBase} bg-gradient-to-br from-[#0B1120] to-emerald-900/10`}
        >
          <div className="p-6 sm:p-8 z-10 flex items-start justify-between shrink-0">
            <div className="pr-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className={`text-xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>
                Sub-Second Feeds
              </h3>
              <p className={`text-xs mt-2 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                Direct exchange tick streaming for instantaneous order execution.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 tracking-widest">LIVE</span>
            </div>
          </div>
          <div className="relative flex-1 min-h-0 w-full overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />
            <LatencyMockup />
          </div>
        </motion.div>

        {/* ── Card 4: Portfolio ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`${cardBase} bg-gradient-to-br from-[#0B1120] to-amber-900/10`}
        >
          <div className="p-6 sm:p-8 z-10 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Briefcase className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className={`text-xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>
              Auto-Rebalance
            </h3>
            <p className={`text-xs mt-2 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Risk-adjusted CAGR optimization algorithm to keep allocations on track.
            </p>
          </div>
          <div className="relative flex-1 min-h-0 w-full overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
            <PortfolioMockup />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default BentoFeaturesSection;
