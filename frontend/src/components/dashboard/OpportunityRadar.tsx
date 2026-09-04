import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, Sparkles, TrendingUp, AlertCircle, Eye, ShieldAlert, 
  ArrowUpRight, ChevronRight, Zap, Filter, Search
} from 'lucide-react';

interface OpportunityRadarProps {
  onSelectStock: (stock: any) => void;
}

export interface RadarSignal {
  id: string;
  symbol: string;
  name: string;
  price: string;
  changePercent: number;
  category: 'HIGH CONVICTION' | 'BUILDING MOMENTUM' | 'VALUE OPPORTUNITY' | 'WORTH WATCHING' | 'RISK RISING';
  signalReason: string;
  keyTrigger: string;
  timeframe: string;
  convictionScore: number; // 0-100
  badgeColor: string;
  borderColor: string;
}

const RADAR_SIGNALS: RadarSignal[] = [
  {
    id: 'sig-1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: '2,934.50',
    changePercent: 1.25,
    category: 'HIGH CONVICTION',
    signalReason: 'Telecom tariff hikes combined with margin expansion in oil-to-chemicals segment.',
    keyTrigger: 'Q1 EBITDA expansion + New energy giga-factory commissioning schedule.',
    timeframe: '6 - 12 Months',
    convictionScore: 92,
    badgeColor: 'bg-emerald-50 text-[#16A34A] border-emerald-200',
    borderColor: 'border-emerald-200 hover:border-[#16A34A]'
  },
  {
    id: 'sig-2',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd',
    price: '985.40',
    changePercent: -1.28,
    category: 'BUILDING MOMENTUM',
    signalReason: 'Positive domestic EV market share and improving technical relative strength breakout.',
    keyTrigger: 'JLR free cashflow generation target achieved 2 quarters ahead of guidance.',
    timeframe: '3 - 6 Months',
    convictionScore: 84,
    badgeColor: 'bg-blue-50 text-[#15519D] border-blue-200',
    borderColor: 'border-blue-200 hover:border-[#15519D]'
  },
  {
    id: 'sig-3',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    price: '1,682.40',
    changePercent: 0.86,
    category: 'VALUE OPPORTUNITY',
    signalReason: 'Post-merger loan-to-deposit normalization creating attractive valuation entry point.',
    keyTrigger: 'Net Interest Margin (NIM) bottomed out at 3.63%; gradual expansion expected.',
    timeframe: '12+ Months',
    convictionScore: 88,
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    borderColor: 'border-purple-200 hover:border-purple-600'
  },
  {
    id: 'sig-4',
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd',
    price: '1,495.00',
    changePercent: 1.50,
    category: 'WORTH WATCHING',
    signalReason: 'ARPU expansion trend following recent price hikes across prepaid circles.',
    keyTrigger: 'Consolidated ARPU crossing ₹230 target barrier.',
    timeframe: '3 - 6 Months',
    convictionScore: 78,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    borderColor: 'border-amber-200 hover:border-amber-500'
  },
  {
    id: 'sig-5',
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: '1,562.10',
    changePercent: -0.85,
    category: 'RISK RISING',
    signalReason: 'Discretionary tech spending softness in North American banking vertical.',
    keyTrigger: 'Large deal TCV conversion delays reported in recent client checks.',
    timeframe: 'Immediate Caution',
    convictionScore: 45,
    badgeColor: 'bg-rose-50 text-[#DC2626] border-rose-200',
    borderColor: 'border-rose-200 hover:border-[#DC2626]'
  },
  {
    id: 'sig-6',
    symbol: 'TATASTEEL',
    name: 'Tata Steel Ltd',
    price: '147.20',
    changePercent: 2.40,
    category: 'VALUE OPPORTUNITY',
    signalReason: 'European restructuring costs bottoming while Indian domestic steel demand peaks.',
    keyTrigger: 'Kalinganagar phase-2 expansion commissioning underway.',
    timeframe: '6 - 12 Months',
    convictionScore: 81,
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    borderColor: 'border-purple-200 hover:border-purple-600'
  }
];

export const OpportunityRadar: React.FC<OpportunityRadarProps> = ({ onSelectStock }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredSignals = RADAR_SIGNALS.filter(sig => 
    selectedCategory === 'ALL' || sig.category === selectedCategory
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#123B63] to-[#15519D] p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-wider text-blue-200 mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>ArthSetu Opportunity Radar</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">
            Market Signals Requiring Attention Right Now
          </h1>
          <p className="text-sm text-slate-200 mt-2 leading-relaxed">
            The Radar continuously scans structural catalysts, earnings surprises, technical momentum shifts, and risk flags across 500+ securities.
          </p>
        </div>

        {/* Decorative Radar Circle Background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-white/10 flex items-center justify-center opacity-30 pointer-events-none">
          <div className="w-60 h-60 rounded-full border border-white/15 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-white/20" />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'ALL', label: 'All Radar Signals' },
          { id: 'HIGH CONVICTION', label: 'High Conviction' },
          { id: 'BUILDING MOMENTUM', label: 'Building Momentum' },
          { id: 'VALUE OPPORTUNITY', label: 'Value Opportunity' },
          { id: 'WORTH WATCHING', label: 'Worth Watching' },
          { id: 'RISK RISING', label: 'Risk Rising' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSignals.map((sig) => (
          <div
            key={sig.id}
            onClick={() => onSelectStock(sig)}
            className={`group bg-white rounded-3xl border ${sig.borderColor} p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer`}
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className={`px-3 py-1 text-[11px] font-extrabold rounded-full border ${sig.badgeColor}`}>
                  {sig.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <span>Score</span>
                  <span className="px-2 py-0.5 bg-slate-100 rounded-md font-mono text-slate-900 font-extrabold">
                    {sig.convictionScore}/100
                  </span>
                </div>
              </div>

              {/* Company Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#15519D] transition-colors">
                    {sig.symbol}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">{sig.name}</p>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-slate-900">₹{sig.price}</div>
                  <div className={`text-xs font-extrabold ${sig.changePercent >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {sig.changePercent >= 0 ? `+${sig.changePercent}%` : `${sig.changePercent}%`}
                  </div>
                </div>
              </div>

              {/* Signal Explanation */}
              <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400">Why On Radar</span>
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed mt-0.5">
                    "{sig.signalReason}"
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-extrabold uppercase text-[#15519D]">Key Catalyst Trigger</span>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {sig.keyTrigger}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#15519D]">
              <span className="text-slate-400 font-medium">Horizon: {sig.timeframe}</span>
              <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Examine Thesis</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpportunityRadar;
