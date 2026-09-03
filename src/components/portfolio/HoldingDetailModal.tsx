import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, X, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  ShieldCheck, Plus, Sparkles, CheckCircle2, DollarSign, Activity,
  PieChart, BookOpen, Clock, Calendar, AlertTriangle, Layers, Zap,
  Check, Edit2, BarChart2, Award, ExternalLink
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

export interface LabHolding {
  symbol: string;
  name: string;
  investedTokens: number;
  currentValueTokens: number;
  returnTokens: number;
  returnPercent: number;
  isPositive: boolean;
  weight: number;
  avgPrice: number;
  currentPrice: number;
  holdingDays: number;
  status: 'Performing Well' | 'Thesis On Track' | 'Underperforming';
  statusDesc: string;
  thesisReason: string;
  thesisText: string;
  buyDate: string;
  decisionScore: number;
  thesisState: '🟢 Still Playing Out' | '🟡 Thesis Weakened' | '🔴 Thesis Invalidated';
}

interface HoldingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  holding: LabHolding | null;
  onBuyMore: (holding: LabHolding) => void;
  onSellHolding: (holding: LabHolding) => void;
  onUpdateThesis: (symbol: string, newThesis: string) => void;
}

export const HoldingDetailModal: React.FC<HoldingDetailModalProps> = ({
  isOpen,
  onClose,
  holding,
  onBuyMore,
  onSellHolding,
  onUpdateThesis
}) => {
  const [chartInterval, setChartInterval] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const [isEditingThesis, setIsEditingThesis] = useState<boolean>(false);
  const [editedThesisText, setEditedThesisText] = useState<string>('');

  if (!isOpen || !holding) return null;

  // Mock performance comparison points vs NIFTY 50 benchmark
  const mockChartDataMap: Record<string, any[]> = {
    '1D': [
      { time: '09:15', holdingVal: 100, niftyVal: 100 },
      { time: '11:30', holdingVal: 101.2, niftyVal: 100.4 },
      { time: '13:45', holdingVal: 102.5, niftyVal: 100.8 },
      { time: '15:30', holdingVal: 103.1, niftyVal: 101.1 }
    ],
    '1W': [
      { time: 'Mon', holdingVal: 100, niftyVal: 100 },
      { time: 'Tue', holdingVal: 102.4, niftyVal: 101.0 },
      { time: 'Wed', holdingVal: 101.8, niftyVal: 100.5 },
      { time: 'Thu', holdingVal: 104.2, niftyVal: 101.8 },
      { time: 'Fri', holdingVal: 105.6, niftyVal: 102.2 }
    ],
    '1M': [
      { time: 'Week 1', holdingVal: 100, niftyVal: 100 },
      { time: 'Week 2', holdingVal: 104.5, niftyVal: 101.5 },
      { time: 'Week 3', holdingVal: 108.2, niftyVal: 103.0 },
      { time: 'Week 4', holdingVal: 114.2, niftyVal: 104.8 }
    ],
    '3M': [
      { time: 'Month 1', holdingVal: 100, niftyVal: 100 },
      { time: 'Month 2', holdingVal: 109.2, niftyVal: 103.8 },
      { time: 'Month 3', holdingVal: 118.5, niftyVal: 106.2 }
    ],
    '1Y': [
      { time: 'Q1', holdingVal: 100, niftyVal: 100 },
      { time: 'Q2', holdingVal: 112.4, niftyVal: 105.2 },
      { time: 'Q3', holdingVal: 122.8, niftyVal: 109.4 },
      { time: 'Q4', holdingVal: 134.5, niftyVal: 112.8 }
    ]
  };

  const chartData = mockChartDataMap[chartInterval] || mockChartDataMap['1M'];

  const sharesOwned = Math.round(holding.currentValueTokens / holding.currentPrice) || 10;
  const isPositive = holding.isPositive;

  const handleSaveThesis = () => {
    onUpdateThesis(holding.symbol, editedThesisText);
    setIsEditingThesis(false);
    toast.success('Investment thesis updated!');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-hidden font-sans">
        {/* Backdrop listener */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative bg-[#F8FAFC] rounded-[28px] shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden my-auto z-10"
        >
          {/* 1. STICKY COMPACT HEADER */}
          <div className="p-4 sm:p-5 bg-white border-b border-slate-200 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 z-20">
            
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition cursor-pointer"
                title="Back to Holdings"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#15519D] text-white font-black text-sm flex items-center justify-center shadow-md shrink-0">
                  {holding.symbol.substring(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-extrabold text-[#172033]">{holding.name}</h1>
                    <span className="px-2 py-0.5 bg-slate-100 text-[#64748B] font-mono font-bold text-xs rounded-lg">
                      {holding.symbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] mt-0.5">
                    <span>NSE India</span> • <span className="text-[#16A34A] font-bold">● Active Holding Position</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
              <div className="text-left md:text-right mr-2">
                <div className="text-xl sm:text-2xl font-black text-[#172033] leading-none">
                  ₹{holding.currentPrice.toLocaleString('en-IN')}
                </div>
                <div className={`text-xs font-extrabold flex items-center gap-0.5 mt-1 ${isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                  {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>{isPositive ? '+' : ''}{holding.returnPercent}% Total Return</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <button
                onClick={() => {
                  onClose();
                  onBuyMore(holding);
                }}
                className="px-4 py-2.5 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Buy More Shares</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onSellHolding(holding);
                }}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs rounded-xl border border-rose-200 transition cursor-pointer"
              >
                Sell & Reallocate
              </button>

              <button
                onClick={onClose}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition cursor-pointer ml-1"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* 2. MAIN WORKSPACE CONTAINER */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* SECTION 1: 7 POSITION SUMMARY METRICS CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-0.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Invested Tokens</span>
                <div className="font-extrabold text-sm text-[#172033]">₹{holding.investedTokens.toLocaleString('en-IN')}</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-0.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Current Value</span>
                <div className="font-black text-sm text-[#15519D]">₹{holding.currentValueTokens.toLocaleString('en-IN')}</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-0.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Total Return</span>
                <div className={`font-black text-sm ${isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                  {isPositive ? '+' : ''}₹{holding.returnTokens.toLocaleString('en-IN')} ({holding.returnPercent}%)
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-0.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Shares Owned</span>
                <div className="font-extrabold text-sm text-[#172033]">{sharesOwned} Shares</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-0.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Avg Buy Price</span>
                <div className="font-extrabold text-sm text-[#172033]">₹{holding.avgPrice}</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-0.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Holding Days</span>
                <div className="font-extrabold text-sm text-[#172033]">{holding.holdingDays} Days</div>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-0.5">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Portfolio Weight</span>
                <div className="font-black text-sm text-[#15519D]">{holding.weight}%</div>
              </div>
            </div>

            {/* SECTION 2: PERFORMANCE vs BENCHMARK CHART & STATUS RATIONALE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* INTERACTIVE PERFORMANCE CHART (2 COLS) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#15519D]" />
                    <h3 className="font-black text-base text-[#172033]">Holding Trajectory vs NIFTY 50 Benchmark</h3>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    {(['1D', '1W', '1M', '3M', '1Y'] as const).map((inter) => (
                      <button
                        key={inter}
                        onClick={() => setChartInterval(inter)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                          chartInterval === inter
                            ? 'bg-[#15519D] text-white shadow-xs'
                            : 'text-[#64748B] hover:text-[#172033]'
                        }`}
                      >
                        {inter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-52 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="holdingCurveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#15519D" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#15519D" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} domain={['auto', 'auto']} />
                      <Tooltip />
                      <Area type="monotone" dataKey="holdingVal" name={`${holding.symbol} Return`} stroke="#15519D" strokeWidth={2.5} fill="url(#holdingCurveGrad)" />
                      <Area type="monotone" dataKey="niftyVal" name="NIFTY 50 Benchmark" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="3 3" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* EVIDENCE-BASED STATUS & RATIONALE (1 COL) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider">INVESTMENT STATUS</span>
                    <span className="px-3 py-1 bg-blue-50 text-[#15519D] font-black text-xs rounded-full">
                      Score: {holding.decisionScore || 82}/100
                    </span>
                  </div>

                  <div>
                    <span className={`px-3 py-1 text-xs font-extrabold rounded-lg ${
                      holding.status === 'Performing Well' ? 'bg-emerald-100 text-emerald-800' :
                      holding.status === 'Thesis On Track' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {holding.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#172033] font-medium leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{holding.statusDesc}"
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase block">Thesis Status Tracker</span>
                    <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">{holding.thesisState}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-[#64748B] flex items-center justify-between">
                  <span>Entry Date: {holding.buyDate}</span>
                  <span className="text-[#15519D] font-extrabold">Active Simulation</span>
                </div>
              </div>

            </div>

            {/* SECTION 3: DECISION JOURNAL ORIGINAL THESIS & RETURN DRIVERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* ORIGINAL THESIS JOURNAL ENTRY */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#15519D]" />
                    <h3 className="font-black text-base text-[#172033]">Your Original Investment Thesis</h3>
                  </div>

                  {!isEditingThesis ? (
                    <button
                      onClick={() => {
                        setEditedThesisText(holding.thesisText);
                        setIsEditingThesis(true);
                      }}
                      className="text-xs font-extrabold text-[#15519D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Thesis
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveThesis}
                      className="px-3 py-1 bg-[#15519D] text-white font-extrabold text-xs rounded-lg cursor-pointer"
                    >
                      Save Thesis
                    </button>
                  )}
                </div>

                {isEditingThesis ? (
                  <textarea
                    rows={3}
                    value={editedThesisText}
                    onChange={e => setEditedThesisText(e.target.value)}
                    className="w-full p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs font-medium outline-none focus:border-[#15519D]"
                  />
                ) : (
                  <p className="text-xs text-[#172033] font-medium leading-relaxed italic bg-[#F8FAFC] p-4 rounded-xl border border-slate-100">
                    "{holding.thesisText}"
                  </p>
                )}

                <div className="text-[11px] text-[#64748B] font-semibold flex items-center gap-2">
                  <span>Primary Reason: <strong className="text-[#172033]">{holding.thesisReason}</strong></span>
                  <span>• Saved to Decision Journal</span>
                </div>
              </div>

              {/* RETURN DRIVERS ATTRIBUTION */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-black text-base text-[#172033]">Return Drivers Attribution</h3>
                  <p className="text-xs text-[#64748B] font-medium">What factors generated performance for this holding?</p>
                </div>

                <div className="space-y-2.5 text-xs">
                  {[
                    { driver: 'Earnings Growth', pct: 45, color: 'bg-emerald-500' },
                    { driver: 'Sector Momentum', pct: 25, color: 'bg-blue-500' },
                    { driver: 'Valuation Multiple Expansion', pct: 15, color: 'bg-indigo-500' },
                    { driver: 'Market Sentiment', pct: 15, color: 'bg-amber-500' }
                  ].map((d) => (
                    <div key={d.driver} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>{d.driver}</span>
                        <span className="text-[#15519D] font-extrabold">{d.pct}% Contribution</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HoldingDetailModal;
