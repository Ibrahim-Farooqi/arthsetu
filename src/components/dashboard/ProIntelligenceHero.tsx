import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ArrowUpRight, ShieldCheck, AlertCircle, Eye, ArrowRight, Award, Zap } from 'lucide-react';

interface ProIntelligenceHeroProps {
  onSelectStock: (stock: any) => void;
}

export const ProIntelligenceHero: React.FC<ProIntelligenceHeroProps> = ({ onSelectStock }) => {
  const heroCandidates = [
    {
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries Ltd',
      price: '2,975.80',
      changePercent: 2.35,
      score: 82,
      view: 'Positive',
      viewColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      risk: 'Moderate',
      riskColor: 'text-amber-600',
      thesis: 'Q1 EBITDA expansion in retail & telecom + green hydrogen commissioning milestone.',
      catalyst: 'New Energy division spin-off evaluation in Q3.',
      sector: 'Energy & Conglomerate',
      marketCap: '₹20.13L Cr'
    },
    {
      symbol: 'TCS',
      companyName: 'Tata Consultancy Services',
      price: '3,842.50',
      changePercent: 1.84,
      score: 84,
      view: 'Positive',
      viewColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      risk: 'Low',
      riskColor: 'text-emerald-600',
      thesis: 'Strong TCV deal pipeline ($10.2B) with margin expansion above 26%.',
      catalyst: 'BFSI tech spending rebound across UK & Europe.',
      sector: 'Technology & Cloud',
      marketCap: '₹13.88L Cr'
    },
    {
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank Ltd',
      price: '1,684.20',
      changePercent: 1.12,
      score: 81,
      view: 'Watch',
      viewColor: 'bg-blue-50 text-blue-700 border-blue-200',
      risk: 'Low',
      riskColor: 'text-emerald-600',
      thesis: 'Deposit growth accelerating toward pre-merger trajectory + NIM stability.',
      catalyst: 'Subsidiary listing unlock over 12-18 months.',
      sector: 'Banking & Financials',
      marketCap: '₹12.82L Cr'
    },
    {
      symbol: 'DIXON',
      companyName: 'Dixon Technologies Ltd',
      price: '12,450.00',
      changePercent: 3.45,
      score: 88,
      view: 'Positive',
      viewColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      risk: 'Moderate',
      riskColor: 'text-amber-600',
      thesis: 'Mobile EMS export scaling under PLI scheme + laptop manufacturing contract win.',
      catalyst: 'Component localization margin boost.',
      sector: 'Electronics Manufacturing',
      marketCap: '₹74,500 Cr'
    }
  ];

  return (
    <div className="space-y-4">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#15519D] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>TODAY'S PRO INTELLIGENCE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
            Key Opportunities & Research Developments
          </h2>
        </div>
        <p className="text-xs text-slate-500 font-medium max-w-md">
          Curated research candidates selected by ArthSetu's quantitative models and fundamental research analysts.
        </p>
      </div>

      {/* INTELLIGENCE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {heroCandidates.map((stock) => (
          <motion.div
            key={stock.symbol}
            whileHover={{ y: -3 }}
            onClick={() => onSelectStock(stock)}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-sm hover:shadow-md hover:border-[#15519D]/50 transition-all cursor-pointer flex flex-col justify-between group"
          >
            {/* CARD TOP BAR */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#123B63] to-[#15519D] text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                    {stock.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#15519D] transition-colors leading-tight">
                      {stock.companyName}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      {stock.symbol} · {stock.sector}
                    </span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold border ${stock.viewColor} shrink-0`}>
                  {stock.view}
                </span>
              </div>

              {/* PRICE & SCORE STRIP */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <div className="text-base font-black text-slate-900">₹{stock.price}</div>
                  <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    +{stock.changePercent}% Today
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-[#15519D]">{stock.score}</div>
                  <div className="text-[9px] font-extrabold text-slate-400 uppercase">ArthSetu Score</div>
                </div>
              </div>

              {/* RATIONALE & CATALYST */}
              <div className="bg-[#F8FAFC] p-2.5 rounded-xl border border-slate-100 text-xs space-y-1.5">
                <p className="text-slate-700 font-medium text-[11px] leading-relaxed italic">
                  "{stock.thesis}"
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold pt-1 border-t border-slate-200/60">
                  <span>Catalyst: {stock.catalyst}</span>
                  <span className={`font-black ${stock.riskColor}`}>Risk: {stock.risk}</span>
                </div>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-[#15519D] group-hover:underline">
              <span>View Deep Research</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProIntelligenceHero;
