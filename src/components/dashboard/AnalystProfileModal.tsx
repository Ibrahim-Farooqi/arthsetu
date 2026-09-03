import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ShieldCheck, Award, TrendingUp, CheckCircle2, 
  FileText, Users, ArrowUpRight, Bookmark, Share2, Radio,
  Sparkles
} from 'lucide-react';

interface AnalystProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyst: any;
  onSelectResearch?: (research: any) => void;
}

export const AnalystProfileModal: React.FC<AnalystProfileModalProps> = ({
  isOpen,
  onClose,
  analyst,
  onSelectResearch
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'calls' | 'reports' | 'bio'>('calls');

  if (!isOpen || !analyst) return null;

  const mockActiveCalls = [
    {
      company: 'Reliance Industries Ltd',
      symbol: 'RELIANCE',
      rec: 'BUY',
      price: '₹2,934.50',
      target: '₹3,160',
      return: '+14%',
      risk: 'Low',
      confidence: 92,
      time: '42 min ago',
      logo: 'RL',
      summary: 'Consolidation breakout verified on daily frames. Hydrogen commissioning projected to trigger re-rating.'
    },
    {
      company: 'Tata Consultancy Services',
      symbol: 'TCS',
      rec: 'HOLD',
      price: '₹4,185.10',
      target: '₹4,400',
      return: '+7%',
      risk: 'Low',
      confidence: 85,
      time: '5 hrs ago',
      logo: 'TC',
      summary: 'Sector rotation towards defensives continues. Wait for decisive breakout above 4250.'
    }
  ];

  const mockReports = [
    {
      title: 'Energy Giga-factory Valuation Impact & Green Hydrogen Outlook',
      date: '15 Jul 2026',
      category: 'Fundamental Note',
      readTime: '8 Min Read'
    },
    {
      title: 'Large-Cap Banking Margin Recovery Thesis Q2 FY27',
      date: '08 Jul 2026',
      category: 'Sector Outlook',
      readTime: '12 Min Read'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header Bar */}
          <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-primary-light text-primary">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-black text-lg text-[#172033]">SEBI Registered Analyst Profile</h3>
                <span className="text-xs font-bold text-slate-400">Reg. No: INH000008492</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Content Body */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
            
            {/* Hero Profile Card */}
            <div className="bg-[#172033] text-white p-6 rounded-[24px] relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-lg">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary to-primary flex items-center justify-center text-3xl font-black text-white shrink-0 border-2 border-white/20 shadow-xl">
                {analyst.name ? analyst.name.split(' ').map((n: string) => n[0]).join('') : 'AM'}
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">{analyst.name || 'Aarav Mehta'}</h2>
                    <span className="text-xs font-bold text-[#64748B] block mt-0.5">{analyst.role || 'Senior Research Analyst · Capital Goods & Energy'}</span>
                  </div>
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all shadow-sm ${
                      isFollowing
                        ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                        : 'bg-primary hover:bg-primary-dark text-white'
                    }`}
                  >
                    {isFollowing ? '✓ Following' : '+ Follow Analyst'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-white/10 text-center">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Accuracy</span>
                    <span className="text-lg font-black text-emerald-400">{analyst.acc || '84%'}</span>
                  </div>
                  <div className="border-x border-white/10">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Avg Return</span>
                    <span className="text-lg font-black text-white">{analyst.ret || '+18.4%'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Followers</span>
                    <span className="text-lg font-black text-white">14.2K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400">Expertise:</span>
              {['Large-Cap Equities', 'Capital Goods', 'Energy & Green Hydrogen', 'Swing Trading', 'SEBI Compliance'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#172033]">
                  {tag}
                </span>
              ))}
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
              <button
                onClick={() => setActiveSubTab('calls')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeSubTab === 'calls' ? 'bg-[#172033] text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Live Calls ({mockActiveCalls.length})
              </button>
              <button
                onClick={() => setActiveSubTab('reports')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeSubTab === 'reports' ? 'bg-[#172033] text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Published Reports ({mockReports.length})
              </button>
              <button
                onClick={() => setActiveSubTab('bio')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeSubTab === 'bio' ? 'bg-[#172033] text-white' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Biography & Methodology
              </button>
            </div>

            {/* Tab Contents */}
            {activeSubTab === 'calls' && (
              <div className="flex flex-col gap-4">
                {mockActiveCalls.map((call) => (
                  <div key={call.symbol} className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 hover:border-blue-300 transition shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] flex items-center justify-center font-black text-slate-500 text-xs shrink-0 border border-slate-100">
                        {call.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-[#172033] text-base">{call.company}</h4>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-extrabold text-[10px] rounded">
                            {call.rec}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-1 max-w-md">
                          {call.summary}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Target</span>
                        <span className="font-black text-[#172033] text-sm">{call.target} ({call.return})</span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          if (onSelectResearch) onSelectResearch(call);
                        }}
                        className="px-4 py-2 rounded-xl bg-primary-light text-primary hover:bg-primary-light font-bold text-xs transition"
                      >
                        Read Analysis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSubTab === 'reports' && (
              <div className="flex flex-col gap-4">
                {mockReports.map((report, idx) => (
                  <div key={idx} className="bg-white border border-[#E2E8F0] rounded-[20px] p-5 hover:border-blue-300 transition shadow-sm flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-black uppercase text-primary bg-primary-light px-2 py-0.5 rounded mb-2 inline-block">
                        {report.category}
                      </span>
                      <h4 className="font-black text-[#172033] text-base">{report.title}</h4>
                      <span className="text-xs text-slate-400 font-medium mt-1 block">{report.date} · {report.readTime}</span>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-[#172033] text-white font-bold text-xs hover:bg-slate-800 transition">
                      View Report
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSubTab === 'bio' && (
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] p-6 text-sm text-slate-600 font-medium leading-relaxed flex flex-col gap-4">
                <h4 className="font-black text-[#172033] text-base">Investment Philosophy & Analytical Track Record</h4>
                <p>
                  With over 12+ years of equity research experience covering Large-Cap Capital Goods and Energy sectors, Aarav Mehta combines quantitative factor screening with deep fundamental supply-chain validation.
                </p>
                <p>
                  Every research call published adheres to strict risk-to-reward ratios (minimum 1:2.5) with predefined stop-loss invalidation thresholds and SEBI Research Analyst guidelines.
                </p>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#172033] text-white font-bold text-xs hover:bg-slate-800 transition"
            >
              Close Profile
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
