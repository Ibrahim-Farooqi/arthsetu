import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, Sparkles, Clock, Calendar, 
  TrendingUp, ArrowUpRight, ArrowDownRight, FileText, CheckCircle2, Bookmark, Share2, ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ResearchDetailProps {
  isOpen: boolean;
  onClose: () => void;
  researchItem?: any;
  onSelectStock?: (stock: any) => void;
  onInvestViaBroker?: (stock: any) => void;
}

export const ResearchDetail: React.FC<ResearchDetailProps> = ({
  isOpen,
  onClose,
  researchItem,
  onSelectStock,
  onInvestViaBroker
}) => {
  if (!isOpen) return null;

  const symbol = researchItem?.symbol || 'RELIANCE';
  const companyName = researchItem?.company || researchItem?.companyName || 'Reliance Industries Ltd';
  const category = researchItem?.category || 'High Conviction';
  const pubDate = researchItem?.datePublished || '01 Mar 2025';
  const returnPercent = researchItem?.returnPercent ?? 21.75;
  const risk = researchItem?.risk || 'Low Risk';
  const horizon = researchItem?.horizon || '6 - 12 Months';
  const convictionScore = researchItem?.convictionScore ?? 92;

  const timelineEvents = researchItem?.timeline || [
    { date: '01 Mar 2025', event: 'Research Thesis Published', change: 'Initiated High-Conviction stance at ₹2,410 ref price.', thesisStatus: 'Maintained' },
    { date: '15 Apr 2025', event: 'Q4 Financial Results Review', change: 'EBITDA beat consensus by 4.2% driven by retail division.', thesisStatus: 'Upgraded Targets' },
    { date: '10 Jun 2025', event: 'New Energy Giga-Factory Update', change: 'Commissioning timeline confirmed for Q3. Capex on track.', thesisStatus: 'Conviction Re-affirmed' },
    { date: '01 Aug 2025', event: 'Telecom Tariff Hike Implemented', change: 'ARPU uplift expected to boost annual cashflow by ₹8,500 Cr.', thesisStatus: 'Maintained' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md overflow-hidden">
        {/* Backdrop click listener */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative bg-[#F8FAFC] rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden my-auto z-10"
        >
          {/* HEADER */}
          <div className="p-5 md:p-6 bg-white border-b border-slate-200 shrink-0 flex items-center justify-between gap-4 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-colors"
                title="Close"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-[#15519D] font-extrabold text-xs rounded-full">
                    {category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Published: {pubDate}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">{companyName} ({symbol})</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  if (onInvestViaBroker) onInvestViaBroker({ symbol, companyName });
                }}
                className="px-4 sm:px-5 py-2.5 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Invest via Broker</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="p-6 md:p-8 space-y-8 overflow-y-auto flex-1 scrollbar-thin">
            {/* Top Key Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Performance Since Pub</span>
                <div className="text-xl font-black text-[#16A34A] flex items-center gap-0.5 mt-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+{returnPercent}%</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Conviction Score</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">{convictionScore} / 100</div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Risk Level</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">{risk}</div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Target Horizon</span>
                <div className="text-xl font-black text-slate-900 mt-0.5">{horizon}</div>
              </div>
            </div>

            {/* Research Summary Card */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#15519D]" />
                Investment Thesis Executive Summary
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                "{companyName} is positioned for multi-year earnings compounding driven by domestic market leadership, cash flow diversification into clean energy, and significant pricing power across retail and digital services."
              </p>
            </div>

            {/* WHY THIS & WHY NOW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50/70 rounded-3xl border border-blue-100 space-y-2">
                <h4 className="font-extrabold text-[#15519D] text-sm uppercase tracking-wider">Why This Company?</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Dominant market share across high-entry-barrier industries. High Return on Invested Capital (ROIC) coupled with strong institutional sponsorship.
                </p>
              </div>

              <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-lg space-y-2">
                <h4 className="font-extrabold text-amber-300 text-sm uppercase tracking-wider">Why Now?</h4>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Valuation multiple compression over recent quarters presents an asymmetric risk-reward entry before major operational catalyst triggers occur.
                </p>
              </div>
            </div>

            {/* KEY CATALYSTS & RISKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-extrabold text-[#16A34A] text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Key Positive Catalysts
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside font-medium">
                  <li>Listing demerger of core retail subsidiary</li>
                  <li>Tariff monetization boosting ARPU to ₹220+</li>
                  <li>Free cashflow turning positive in green energy unit</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h4 className="font-extrabold text-[#DC2626] text-sm uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Key Investment Risks
                </h4>
                <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside font-medium">
                  <li>Global macroeconomic slowdown affecting export refining</li>
                  <li>Capex inflation in international technology procurement</li>
                </ul>
              </div>
            </div>

            {/* RESEARCH JOURNEY TIMELINE */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#15519D]" />
                  Transparent Research Journey Timeline
                </h3>
                <span className="text-xs text-slate-400 font-mono">Verifiable Records</span>
              </div>

              <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {timelineEvents.map((ev: any, idx: number) => (
                  <div key={idx} className="relative pl-8 space-y-1">
                    <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#15519D] ring-4 ring-blue-50" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900">{ev.event}</span>
                      <span className="font-mono text-slate-400">{ev.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{ev.change}</p>
                    <div className="text-[10px] font-bold text-[#15519D] inline-block px-2 py-0.5 bg-blue-50 rounded">
                      Status: {ev.thesisStatus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResearchDetail;
