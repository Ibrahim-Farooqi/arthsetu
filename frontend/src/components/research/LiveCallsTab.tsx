import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Radio, ShieldCheck, ArrowRight, Clock, Star,
  TrendingUp, TrendingDown, Target, Zap, Filter,
  ChevronDown, AlertTriangle, CheckCircle2, BarChart3,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import marketService from '../../services/market.service';
import wsService from '../../services/websocket.service';

export interface ResearchCallItem {
  id: string;
  symbol: string;
  companyName: string;
  sector: string;
  exchange: 'NSE' | 'BSE' | 'MCX';
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  entryRange: string;
  targetPrice: number;
  stopLoss: number;
  currentPrice: number;
  potentialReturn: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  confidenceScore: number;
  horizon: string;
  summary: string;
  thesis: string;
  status: 'ACTIVE' | 'TARGET_HIT' | 'STOP_LOSS_HIT';
  publishedTime: string;
  analyst: string;
  analystAccuracy: string;
  technicals: { rsi: number; macd: string; trend: string };
}

interface LiveCallsTabProps {
  onSelectCall: (call: any) => void;
  onTradeCall: (call: any) => void;
  calls?: any[];
}

export const LiveCallsTab: React.FC<LiveCallsTabProps> = ({ onSelectCall, onTradeCall, calls: initialCalls }) => {
  const [filter, setFilter] = useState<'ALL' | 'BUY' | 'SELL' | 'HOLD'>('ALL');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'Low' | 'Medium' | 'High'>('ALL');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [researchCalls, setResearchCalls] = useState<ResearchCallItem[]>([]);

  const { data: fetchedCalls } = useQuery({
    queryKey: ['researchCalls'],
    queryFn: async () => {
      const fetched = await marketService.getResearchCalls();
      return fetched || [];
    },
    refetchInterval: 120000,
  });

  useEffect(() => {
    if (initialCalls && initialCalls.length > 0) {
      setResearchCalls(initialCalls);
    } else if (fetchedCalls) {
      setResearchCalls(fetchedCalls);
    }
  }, [initialCalls, fetchedCalls]);

  useEffect(() => {
    const handlePriceUpdate = (prices: Record<string, any>) => {
      setResearchCalls((prev) =>
        prev.map((call) => {
          const live = prices[call.symbol.toUpperCase()];
          if (live && live.lastPrice) {
            return { ...call, currentPrice: live.lastPrice };
          }
          return call;
        })
      );
    };

    wsService.addListener(handlePriceUpdate);
    researchCalls.forEach((call) => wsService.subscribe(call.symbol));

    return () => {
      wsService.removeListener(handlePriceUpdate);
    };
  }, [researchCalls.length]);

  const filteredCalls = useMemo(() => {
    return researchCalls.filter(call => {
      const recMatch = filter === 'ALL' || call.recommendation === filter;
      const riskMatch = riskFilter === 'ALL' || call.riskLevel === riskFilter;
      return recMatch && riskMatch;
    });
  }, [researchCalls, filter, riskFilter]);

  const toggleWatchlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const stats = useMemo(() => {
    const total = researchCalls.length || 1;
    return {
      total: researchCalls.length,
      buy: researchCalls.filter(c => c.recommendation === 'BUY').length,
      hold: researchCalls.filter(c => c.recommendation === 'HOLD').length,
      avgReturn: (researchCalls.reduce((s, c) => s + c.potentialReturn, 0) / total).toFixed(1),
      avgConfidence: Math.round(researchCalls.reduce((s, c) => s + c.confidenceScore, 0) / total),
    };
  }, [researchCalls]);

  const recColor = (rec: string) => {
    if (rec === 'BUY') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (rec === 'SELL') return 'bg-rose-50 text-rose-700 border-rose-100';
    return 'bg-amber-50 text-amber-700 border-amber-100';
  };
  const riskColor = (r: string) => {
    if (r === 'Low') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (r === 'High') return 'text-danger bg-rose-50 border-rose-100';
    return 'text-amber-600 bg-amber-50 border-amber-100';
  };

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 animate-in fade-in duration-300">

      {/* ── STATS STRIP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Active Calls', value: stats.total, icon: Radio, color: 'text-primary', bg: 'bg-primary-light', border: 'border-[#E2E8F0]' },
          { label: 'Buy Signals', value: stats.buy, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Hold Signals', value: stats.hold, icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Avg Upside', value: `+${stats.avgReturn}%`, icon: Target, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
          { label: 'Avg AI Score', value: `${stats.avgConfidence}%`, icon: ShieldCheck, color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`bg-white border border-slate-200 rounded-[20px] p-4 shadow-xs flex items-center gap-3`}>
              <div className={`p-2.5 rounded-xl border ${s.bg} ${s.border} shrink-0`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{s.label}</span>
                <span className={`text-lg font-black ${s.color}`}>{s.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FILTER BAR ── */}
      <div className="bg-white border border-slate-200 rounded-[20px] p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
            {(['ALL', 'BUY', 'SELL', 'HOLD'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                  filter === r ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-1 rounded-xl">
            <span className="text-[9px] font-black text-slate-400 ml-2">RISK:</span>
            {(['ALL', 'Low', 'Medium', 'High'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRiskFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
                  riskFilter === r ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-400">{filteredCalls.length} calls</span>
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-1 rounded-xl">
            {(['card', 'table'] as const).map(m => (
              <button key={m} onClick={() => setViewMode(m)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black capitalize transition cursor-pointer ${viewMode === m ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredCalls.length === 0 && (
        <div className="py-16 text-center bg-white border border-dashed border-slate-200 rounded-[28px] p-8">
          <Activity className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-base font-black text-slate-800">No Live Research Calls Found</p>
          <p className="text-xs text-slate-400 mt-1">Awaiting active research call recommendations from backend endpoint: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">GET /api/v1/research/calls</code></p>
        </div>
      )}

      {/* ── CARD VIEW ── */}
      {viewMode === 'card' && filteredCalls.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCalls.map((call) => {
            const isExpanded = expandedId === call.id;
            return (
              <motion.div
                key={call.id}
                layout
                whileHover={{ y: -3 }}
                className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                {/* Recommendation color strip */}
                <div className={`h-1 w-full ${
                  call.recommendation === 'BUY' ? 'bg-emerald-500' :
                  call.recommendation === 'SELL' ? 'bg-danger' : 'bg-amber-400'
                }`} />

                <div className="p-6">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shadow-sm shrink-0">
                        {call.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 leading-tight">{call.companyName}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[9px] font-bold text-slate-400">{call.symbol}</span>
                          <span className="text-slate-200">·</span>
                          <span className="text-[9px] font-bold text-slate-400">{call.sector}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${recColor(call.recommendation)}`}>
                        {call.recommendation}
                      </span>
                      <button
                        onClick={(e) => toggleWatchlist(call.id, e)}
                        className="p-1.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition cursor-pointer"
                      >
                        <Star className={`w-3.5 h-3.5 ${watchlist.includes(call.id) ? 'fill-yellow-400 text-yellow-500' : 'text-slate-400'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Price Grid */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-50 border border-slate-100 p-3.5 rounded-2xl mb-4">
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block font-black mb-0.5">Current</span>
                      <span className="text-xs font-black text-slate-900">₹{call.currentPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block font-black mb-0.5">Target</span>
                      <span className="text-xs font-black text-emerald-600">₹{call.targetPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block font-black mb-0.5">Stop Loss</span>
                      <span className="text-xs font-black text-danger">₹{call.stopLoss.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block font-black mb-0.5">Upside</span>
                      <span className="text-xs font-black text-emerald-600">+{call.potentialReturn}%</span>
                    </div>
                  </div>

                  {/* AI Confidence bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] font-black text-slate-400 uppercase">AI Confidence</span>
                      <span className="text-xs font-black text-slate-900">{call.confidenceScore}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${call.confidenceScore}%` }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary to-primary rounded-full"
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-500 text-xs leading-relaxed font-medium mb-4 line-clamp-2">{call.summary}</p>

                  {/* Meta row */}
                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-black ${riskColor(call.riskLevel)}`}>{call.riskLevel} Risk</span>
                      <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded text-slate-600">{call.horizon}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {call.publishedTime}
                    </div>
                  </div>

                  {/* Expandable technicals */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-slate-100 pt-4 mb-4">
                          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-3">Technical Snapshot</h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                              <span className="text-[8px] font-black text-slate-400 block">RSI (14)</span>
                              <span className="text-sm font-black text-slate-900">{call.technicals.rsi}</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                              <span className="text-[8px] font-black text-slate-400 block">MACD</span>
                              <span className="text-xs font-black text-slate-700">{call.technicals.macd}</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                              <span className="text-[8px] font-black text-slate-400 block">Trend</span>
                              <span className="text-xs font-black text-emerald-600">{call.technicals.trend}</span>
                            </div>
                          </div>
                          <div className="mt-3 p-3 bg-primary-light border border-[#E2E8F0] rounded-xl">
                            <p className="text-[10px] font-bold text-primary-dark leading-relaxed">
                              <strong>Investment Thesis:</strong> {call.thesis}
                            </p>
                          </div>
                          <div className="mt-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                            <span className="text-[9px] text-slate-500 font-bold">Entry Range: {call.entryRange}</span>
                            <span className="text-[9px] text-slate-700 font-black">Analyst: {call.analyst} ({call.analystAccuracy} acc.)</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA Buttons */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : call.id)}
                      className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-900 transition cursor-pointer"
                    >
                      {isExpanded ? 'Less Detail' : 'More Detail'}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectCall(call)}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-[10px] font-extrabold transition cursor-pointer"
                      >
                        Full Report
                      </button>
                      <button
                        onClick={() => onTradeCall(call)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-[10px] font-black transition cursor-pointer shadow-xs"
                      >
                        Trade Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── TABLE VIEW ── */}
      {viewMode === 'table' && (
        <div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  {['Company', 'Signal', 'Entry Zone', 'Target', 'Stop Loss', 'Upside', 'AI Score', 'Risk', 'Action'].map(h => (
                    <th key={h} className="py-4 px-5 text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {filteredCalls.map((call) => (
                  <tr key={call.id} className="hover:bg-primary-light/30 transition">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">{call.symbol.substring(0, 2)}</div>
                        <div>
                          <span className="text-xs font-black text-slate-900 block">{call.companyName}</span>
                          <span className="text-[9px] text-slate-400 font-bold">{call.symbol} · {call.analyst}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${recColor(call.recommendation)}`}>{call.recommendation}</span>
                    </td>
                    <td className="py-4 px-5 text-[10px] font-bold text-slate-600 whitespace-nowrap">{call.entryRange}</td>
                    <td className="py-4 px-5 text-xs font-black text-emerald-600">₹{call.targetPrice.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-5 text-xs font-black text-danger">₹{call.stopLoss.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-5 text-xs font-black text-emerald-600">+{call.potentialReturn}%</td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${call.confidenceScore}%` }} />
                        </div>
                        <span className="text-xs font-black text-slate-900">{call.confidenceScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${riskColor(call.riskLevel)}`}>{call.riskLevel}</span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <button onClick={() => onSelectCall(call)} className="text-[10px] font-black text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg transition cursor-pointer">Report</button>
                        <button onClick={() => onTradeCall(call)} className="text-[10px] font-black text-white bg-primary hover:bg-primary-dark px-3 py-1.5 rounded-lg transition cursor-pointer">Trade</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── DISCLAIMER ── */}
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[10px] font-medium text-amber-800 leading-relaxed">
          <strong>Risk Disclosure:</strong> All research recommendations are for educational and informational purposes. Investments in securities are subject to market risk. Please read all associated documents carefully before investing. Past performance is not indicative of future returns. SEBI Registered Investment Advisor.
        </p>
      </div>
    </div>
  );
};

export default LiveCallsTab;
