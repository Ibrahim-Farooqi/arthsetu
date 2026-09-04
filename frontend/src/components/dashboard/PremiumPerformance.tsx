import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, TrendingUp, CheckCircle2, ShieldCheck, 
  BarChart3, Calendar, ArrowUpRight, ArrowDownRight, Filter
} from 'lucide-react';

export interface PerformanceIdea {
  id: string;
  symbol: string;
  name: string;
  pubDate: string;
  entryPrice: string;
  currentPrice: string;
  returnPercent: number;
  durationDays: number;
  status: 'Active' | 'Target Met' | 'Closed';
  convictionTier: string;
}

const PERFORMANCE_HISTORY: PerformanceIdea[] = [
  { id: 'p1', symbol: 'HAL', name: 'Hindustan Aeronautics', pubDate: '12 Jan 2025', entryPrice: '2,420.00', currentPrice: '4,650.00', returnPercent: 92.15, durationDays: 180, status: 'Target Met', convictionTier: 'High Conviction' },
  { id: 'p2', symbol: 'RELIANCE', name: 'Reliance Industries', pubDate: '01 Mar 2025', entryPrice: '2,410.00', currentPrice: '2,934.50', returnPercent: 21.76, durationDays: 130, status: 'Active', convictionTier: 'Long Term' },
  { id: 'p3', symbol: 'TATASTEEL', name: 'Tata Steel Limited', pubDate: '15 Feb 2025', entryPrice: '122.50', currentPrice: '147.20', returnPercent: 20.16, durationDays: 145, status: 'Active', convictionTier: 'Value' },
  { id: 'p4', symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', pubDate: '10 Nov 2024', entryPrice: '980.00', currentPrice: '1,495.00', returnPercent: 52.55, durationDays: 240, status: 'Target Met', convictionTier: 'Momentum' },
  { id: 'p5', symbol: 'INFY', name: 'Infosys Limited', pubDate: '18 Apr 2025', entryPrice: '1,620.00', currentPrice: '1,562.10', returnPercent: -3.57, durationDays: 90, status: 'Active', convictionTier: 'Growth' },
  { id: 'p6', symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', pubDate: '05 Jan 2025', entryPrice: '985.00', currentPrice: '1,215.80', returnPercent: 23.43, durationDays: 190, status: 'Active', convictionTier: 'High Conviction' }
];

export const PremiumPerformance: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Completed'>('All');
  const [timeframeFilter, setTimeframeFilter] = useState<'All' | '1M' | '3M' | '6M' | '1Y'>('All');

  const filteredIdeas = PERFORMANCE_HISTORY.filter(idea => {
    const matchesStatus = filterStatus === 'All' || 
                          (filterStatus === 'Active' && idea.status === 'Active') ||
                          (filterStatus === 'Completed' && idea.status === 'Target Met');
    return matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#16A34A] mb-1">
          <Award className="w-4 h-4" />
          <span>Verifiable Track Record</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          ArthSetu Research Performance & Transparency
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Every investment thesis published on ArthSetu is independently timestamped and tracked against real market prices.
        </p>
      </div>

      {/* Overview Cards Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Total Published</span>
          <div className="text-2xl font-black text-slate-900 mt-1">48 Ideas</div>
          <span className="text-[11px] text-slate-500">Since inception</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Active Research</span>
          <div className="text-2xl font-black text-[#15519D] mt-1">32 Active</div>
          <span className="text-[11px] text-slate-500">Under tracking</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Completed Ideas</span>
          <div className="text-2xl font-black text-slate-900 mt-1">16 Closed</div>
          <span className="text-[11px] text-[#16A34A] font-bold">Target achieved</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Average Return</span>
          <div className="text-2xl font-black text-[#16A34A] mt-1">+26.4%</div>
          <span className="text-[11px] text-slate-500">Across all picks</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Best Performer</span>
          <div className="text-2xl font-black text-[#16A34A] mt-1">+92.1%</div>
          <span className="text-[11px] text-slate-500">HAL (180 days)</span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Success Win Rate</span>
          <div className="text-2xl font-black text-[#16A34A] mt-1">84.6%</div>
          <span className="text-[11px] text-slate-500">Positive thesis</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Status:</span>
          {['All', 'Active', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Period:</span>
          {['All', '1M', '3M', '6M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframeFilter(tf as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframeFilter === tf
                  ? 'bg-[#15519D] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Historical Performance Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Company & Thesis</th>
              <th className="py-4 px-4">Publication Date</th>
              <th className="py-4 px-4">Entry Ref Price</th>
              <th className="py-4 px-4">Current Price</th>
              <th className="py-4 px-4">Return</th>
              <th className="py-4 px-4">Duration</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredIdeas.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-extrabold text-slate-900">{item.symbol}</div>
                  <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                    <span>{item.name}</span> • <span className="text-[#15519D] font-bold">{item.convictionTier}</span>
                  </div>
                </td>

                <td className="py-4 px-4 font-medium text-slate-600 text-xs font-mono">
                  {item.pubDate}
                </td>

                <td className="py-4 px-4 font-bold text-slate-700">
                  ₹{item.entryPrice}
                </td>

                <td className="py-4 px-4 font-extrabold text-slate-900">
                  ₹{item.currentPrice}
                </td>

                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-0.5 text-xs font-black px-2.5 py-1 rounded-lg ${
                    item.returnPercent >= 0 
                      ? 'bg-emerald-50 text-[#16A34A]' 
                      : 'bg-rose-50 text-[#DC2626]'
                  }`}>
                    {item.returnPercent >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {item.returnPercent >= 0 ? `+${item.returnPercent}%` : `${item.returnPercent}%`}
                  </span>
                </td>

                <td className="py-4 px-4 font-medium text-slate-500 text-xs">
                  {item.durationDays} Days
                </td>

                <td className="py-4 px-6 text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Target Met' 
                      ? 'bg-emerald-100 text-[#16A34A]' 
                      : 'bg-blue-100 text-[#15519D]'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PremiumPerformance;
