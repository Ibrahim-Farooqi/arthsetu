import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Sparkles, ShieldCheck, Clock, 
  ArrowUpRight, ArrowDownRight, ChevronRight, Award, Bookmark, Filter, Search
} from 'lucide-react';
import ResearchDetail from './ResearchDetail';

interface ResearchCenterProps {
  onSelectStock?: (stock: any) => void;
  onInvestViaBroker?: (stock: any) => void;
}

export interface UnivestPick {
  id: string;
  symbol: string;
  companyName: string;
  category: 'High Conviction' | 'Growth' | 'Value' | 'Momentum' | 'Long Term';
  datePublished: string;
  returnPercent: number;
  risk: string;
  horizon: string;
  convictionScore: number;
  summary: string;
}

const PICKS_DATABASE: UnivestPick[] = [
  {
    id: 'pk-1',
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Ltd',
    category: 'High Conviction',
    datePublished: '01 Mar 2025',
    returnPercent: 21.75,
    risk: 'Low Risk',
    horizon: '6 - 12 Months',
    convictionScore: 92,
    summary: 'Telecommunications tariff hikes and expanding refining margins driver.'
  },
  {
    id: 'pk-2',
    symbol: 'HAL',
    companyName: 'Hindustan Aeronautics Ltd',
    category: 'Growth',
    datePublished: '12 Jan 2025',
    returnPercent: 92.15,
    risk: 'Moderate Risk',
    horizon: '1 - 3 Years',
    convictionScore: 95,
    summary: 'Record defense order book pipeline for indigenous fighter jets.'
  },
  {
    id: 'pk-3',
    symbol: 'TATASTEEL',
    companyName: 'Tata Steel Limited',
    category: 'Value',
    datePublished: '15 Feb 2025',
    returnPercent: 20.16,
    risk: 'Moderate Risk',
    horizon: '6 - 12 Months',
    convictionScore: 81,
    summary: 'European restructuring costs bottoming; Indian domestic margins expanding.'
  },
  {
    id: 'pk-4',
    symbol: 'BHARTIARTL',
    companyName: 'Bharti Airtel Ltd',
    category: 'Momentum',
    datePublished: '10 Nov 2024',
    returnPercent: 52.55,
    risk: 'Low Risk',
    horizon: '3 - 6 Months',
    convictionScore: 88,
    summary: 'ARPU expansion and 5G enterprise monetization acceleration.'
  },
  {
    id: 'pk-5',
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Ltd',
    category: 'Long Term',
    datePublished: '05 Jan 2025',
    returnPercent: 18.50,
    risk: 'Low Risk',
    horizon: '3+ Years',
    convictionScore: 90,
    summary: 'Loan-to-deposit ratio normalization generating steady NIM expansion.'
  }
];

export const ResearchCenter: React.FC<ResearchCenterProps> = ({
  onSelectStock,
  onInvestViaBroker
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedResearch, setSelectedResearch] = useState<UnivestPick | null>(null);

  const filteredPicks = PICKS_DATABASE.filter(pick => 
    selectedCategory === 'All' || pick.category === selectedCategory
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#15519D] mb-1">
          <TrendingUp className="w-4 h-4" />
          <span>High-Conviction Investment Intelligence</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          ArthSetu Premium Research Picks
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          In-depth fundamental research theses backed by transparent performance timelines and catalyst tracking.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {['All', 'High Conviction', 'Growth', 'Value', 'Momentum', 'Long Term'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#15519D] text-white shadow-md shadow-blue-500/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Picks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPicks.map((pick) => (
          <div
            key={pick.id}
            onClick={() => setSelectedResearch(pick)}
            className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-50 text-[#15519D] font-extrabold text-xs rounded-full">
                  {pick.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {pick.datePublished}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#15519D] transition-colors">
                {pick.symbol}
              </h3>
              <p className="text-xs text-slate-400 font-medium">{pick.companyName}</p>

              <p className="text-xs text-slate-700 mt-3 line-clamp-2 leading-relaxed font-medium">
                "{pick.summary}"
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Return</span>
                  <div className="text-xs font-black text-[#16A34A]">+{pick.returnPercent}%</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Conviction</span>
                  <div className="text-xs font-extrabold text-slate-900">{pick.convictionScore}/100</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Horizon</span>
                  <div className="text-xs font-extrabold text-slate-900">{pick.horizon}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#15519D] group-hover:translate-x-1 transition-transform">
              <span>Read Complete Thesis & Timeline</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* FULL RESEARCH MODAL */}
      {selectedResearch && (
        <ResearchDetail
          isOpen={!!selectedResearch}
          onClose={() => setSelectedResearch(null)}
          researchItem={selectedResearch}
          onSelectStock={onSelectStock}
          onInvestViaBroker={onInvestViaBroker}
        />
      )}
    </div>
  );
};

export default ResearchCenter;
