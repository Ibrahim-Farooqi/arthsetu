import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight, ArrowDownRight, ChevronRight, Activity, Sparkles } from 'lucide-react';

interface SectorIntelligenceRankingsProps {
  onSelectSector?: (sectorName: string) => void;
}

export const SectorIntelligenceRankings: React.FC<SectorIntelligenceRankingsProps> = ({ onSelectSector }) => {
  const sectors = [
    {
      name: 'Technology & Cloud',
      change: '+4.8%',
      isPositive: true,
      view: 'Positive Outlook',
      viewBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      momentum: 'Strong Bullish',
      earningsTrend: 'Accelerating',
      breadth: '82% stocks above 50 MA',
      summary: 'Strong deal TCV wins across US/EU, expanding AI services demand, and margin recovery.'
    },
    {
      name: 'Financials & Banking',
      change: '+3.2%',
      isPositive: true,
      view: 'Positive Outlook',
      viewBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      momentum: 'Moderate Bullish',
      earningsTrend: 'Stable',
      breadth: '74% stocks above 50 MA',
      summary: 'Deposit growth stabilizing post-merger; NIM contraction slowing down across private lenders.'
    },
    {
      name: 'Industrials & Defense',
      change: '+2.7%',
      isPositive: true,
      view: 'Positive Outlook',
      viewBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      momentum: 'Strong Bullish',
      earningsTrend: 'Robust',
      breadth: '88% stocks above 50 MA',
      summary: 'Government capex execution accelerating + record order book visibility for EMS and Defense.'
    },
    {
      name: 'Healthcare & Pharma',
      change: '+1.4%',
      isPositive: true,
      view: 'Neutral View',
      viewBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      momentum: 'Neutral',
      earningsTrend: 'Moderate',
      breadth: '58% stocks above 50 MA',
      summary: 'US generic pricing pressure easing; domestic formulation growth steady at 8-10%.'
    },
    {
      name: 'Consumer FMCG',
      change: '-0.8%',
      isPositive: false,
      view: 'Cautious View',
      viewBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      momentum: 'Weakening',
      earningsTrend: 'Subdued',
      breadth: '36% stocks above 50 MA',
      summary: 'Rural demand recovery remains slow while raw material inflation squeezes gross margins.'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#15519D] uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>SECTOR INTELLIGENCE & MOMENTUM</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
            Sector Rankings & Earnings Breadth
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Comparative sector momentum, institutional flows, and earnings outlook across 17 monitored sectors.
          </p>
        </div>

        <button className="text-xs font-extrabold text-[#15519D] hover:underline inline-flex items-center gap-1">
          <span>Explore All 17 Sectors</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {sectors.map((sec, idx) => (
          <div
            key={sec.name}
            onClick={() => onSelectSector && onSelectSector(sec.name)}
            className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#15519D] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3.5 min-w-[240px]">
              <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center shrink-0">
                #{idx + 1}
              </span>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#15519D] transition-colors">
                  {sec.name}
                </h3>
                <span className={`text-xs font-extrabold ${sec.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {sec.change} 1M Performance
                </span>
              </div>
            </div>

            <div className="flex-1 text-xs text-slate-600 font-medium">
              <p className="line-clamp-2 italic text-slate-700 font-normal">"{sec.summary}"</p>
            </div>

            <div className="flex items-center gap-4 shrink-0 text-right">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Breadth</span>
                <span className="text-xs font-extrabold text-slate-800">{sec.breadth}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-extrabold border ${sec.viewBadge}`}>
                {sec.view}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorIntelligenceRankings;
