import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, Check, Award, ChevronRight, Activity, Sparkles } from 'lucide-react';

interface RisingRadarTrackerProps {
  onSelectStock: (stock: any) => void;
}

export const RisingRadarTracker: React.FC<RisingRadarTrackerProps> = ({ onSelectStock }) => {
  const radarUpgrades = [
    {
      symbol: 'ABC',
      companyName: 'ABC Heavy Engineering',
      prevScore: 68,
      currScore: 76,
      change: '+8',
      price: '1,420.00',
      changePercent: 3.12,
      reasons: [
        'Quarterly earnings momentum accelerated +24% YoY',
        'Debt-to-equity declined from 0.65 to 0.28',
        'Industrial sector order inflow momentum strengthened'
      ],
      tag: 'Fundamentals Improving'
    },
    {
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank Ltd',
      prevScore: 72,
      currScore: 81,
      change: '+9',
      price: '1,684.20',
      changePercent: 1.12,
      reasons: [
        'Deposit growth trajectory normalized post-merger',
        'Net interest margin stabilized at 3.65%',
        'Valuation safety margin expanded at current P/B'
      ],
      tag: 'Upgraded'
    },
    {
      symbol: 'TATASTEEL',
      companyName: 'Tata Steel Ltd',
      prevScore: 64,
      currScore: 73,
      change: '+9',
      price: '168.40',
      changePercent: 2.45,
      reasons: [
        'UK Port Talbot green transition subsidy approved',
        'Domestic steel realization prices improved +4.2%',
        'Operating margin expanded 180 bps QoQ'
      ],
      tag: 'Momentum Improving'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#15519D] uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>ARTHSETU RADAR SIGNALS</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
            Rising on the ArthSetu Radar
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Companies demonstrating fundamental upgrades, debt reduction, or earnings revisions across quantitative models.
          </p>
        </div>

        <button className="text-xs font-extrabold text-[#15519D] hover:underline inline-flex items-center gap-1">
          <span>View All Radar Upgrades</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {radarUpgrades.map((item) => (
          <div
            key={item.symbol}
            onClick={() => onSelectStock(item)}
            className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/90 space-y-3 hover:border-[#15519D] transition-all cursor-pointer group"
          >
            {/* TOP TITLE & SCORE Trajectory */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="px-2 py-0.5 bg-blue-50 text-[#15519D] text-[10px] font-extrabold rounded-md uppercase">
                  {item.tag}
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#15519D] transition-colors mt-1">
                  {item.companyName}
                </h3>
              </div>

              <div className="text-right">
                <div className="text-xs font-extrabold text-slate-400">
                  {item.prevScore} → <strong className="text-base text-[#15519D]">{item.currScore}</strong>
                </div>
                <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  ↑ {item.change} pts
                </span>
              </div>
            </div>

            {/* REASONS BULLET LIST */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200/60 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Why it moved up:</span>
              {item.reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-1.5 text-slate-700 text-[11px] font-medium leading-tight">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-[#15519D] group-hover:underline">
              <span>Inspect Upgrade Thesis</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RisingRadarTracker;
