import React, { useState } from 'react';
import { 
  Bookmark, FileText, Sparkles, Clock, ChevronRight, 
  Share2, Trash2, Download, Search, Filter, Eye, 
  Star, TrendingUp, BarChart3, ArrowRight, CheckCircle2,
  BookOpen, Radio, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SavedReport {
  id: string;
  title: string;
  company: string;
  symbol: string;
  type: 'Equity Research' | 'Sector Report' | 'AI Brief' | 'F&O Strategy' | 'Macro Report';
  date: string;
  size: string;
  rating: string;
  target: string;
  analyst: string;
  tag: string;
  isNew: boolean;
}

interface SavedBrief {
  id: string;
  title: string;
  date: string;
  length: string;
  topic: string;
  keyInsight: string;
}

interface BookmarkedCall {
  id: string;
  symbol: string;
  company: string;
  callType: string;
  price: string;
  target: string;
  pnl: string;
  pnlPositive: boolean;
  status: 'Active' | 'Closed';
  savedAt: string;
}

const SAVED_REPORTS: SavedReport[] = [
  {
    id: 'r1',
    title: 'Reliance Industries Q1 FY27 Earnings Analysis & Valuation Model',
    company: 'Reliance Industries',
    symbol: 'RELIANCE',
    type: 'Equity Research',
    date: 'Saved 2 days ago',
    size: '2.4 MB',
    rating: 'BUY',
    target: '₹3,375',
    analyst: 'Priya Mehta',
    tag: 'High Conviction',
    isNew: false
  },
  {
    id: 'r2',
    title: 'Indian Banking Sector: Rising Credit Demand & Improving Asset Quality',
    company: 'Sector Report',
    symbol: 'BANKEX',
    type: 'Sector Report',
    date: 'Saved 1 week ago',
    size: '4.1 MB',
    rating: 'Overweight',
    target: 'Sector Positive',
    analyst: 'Raj Malhotra',
    tag: 'Sector Thesis',
    isNew: false
  },
  {
    id: 'r3',
    title: 'HAL Defence CAPEX 10-Year Order Book Sustainability Analysis',
    company: 'Hindustan Aeronautics',
    symbol: 'HAL',
    type: 'Equity Research',
    date: 'Saved 3 days ago',
    size: '1.8 MB',
    rating: 'BUY',
    target: '₹4,600',
    analyst: 'Suresh Iyer',
    tag: 'Long Term',
    isNew: true
  },
  {
    id: 'r4',
    title: 'Nifty Bank Options Strategy for RBI Policy Week — Straddle Setup',
    company: 'Index Derivatives',
    symbol: 'BANKNIFTY',
    type: 'F&O Strategy',
    date: 'Saved 5 days ago',
    size: '0.9 MB',
    rating: 'Strategy',
    target: 'Risk-Neutral',
    analyst: 'Kavya Nair',
    tag: 'F&O Play',
    isNew: false
  },
  {
    id: 'r5',
    title: 'FY27 India Macro Outlook: GDP Growth, Inflation & Rate Trajectory',
    company: 'Macro Research',
    symbol: 'MACRO',
    type: 'Macro Report',
    date: 'Saved 2 weeks ago',
    size: '5.2 MB',
    rating: 'Positive',
    target: 'India Overweight',
    analyst: 'Ravi Kumar',
    tag: 'Macro View',
    isNew: false
  }
];

const SAVED_BRIEFS: SavedBrief[] = [
  {
    id: 'b1',
    title: 'Automotive Sector EV Transition: What it means for your portfolio',
    date: 'Generated 24 Jul 2026',
    length: '5 min read',
    topic: 'Sector Analysis',
    keyInsight: 'EV adoption crossing 10% of total PV sales — OEM margins improving structurally.'
  },
  {
    id: 'b2',
    title: 'FII Buying Trends in H1 FY27: Tracking smart money flows',
    date: 'Generated 18 Jul 2026',
    length: '3 min read',
    topic: 'Institutional Flows',
    keyInsight: 'FIIs deployed ₹82,000 Cr into Indian equities in H1 — 3rd highest ever recorded.'
  },
  {
    id: 'b3',
    title: 'RBI Policy Impact: How rate decisions affect your equity holdings',
    date: 'Generated 12 Jul 2026',
    length: '4 min read',
    topic: 'Macro Impact',
    keyInsight: 'Every 25 bps rate cut historically drives NIFTY 3–5% higher over next 60 days.'
  },
  {
    id: 'b4',
    title: 'Green Energy Stocks: Screening for the best CAPEX beneficiaries',
    date: 'Generated 8 Jul 2026',
    length: '6 min read',
    topic: 'Thematic Brief',
    keyInsight: 'NTPC, Power Grid and CESC among top beneficiaries of ₹15L Cr clean energy policy.'
  }
];

const BOOKMARKED_CALLS: BookmarkedCall[] = [
  { id: 'bc1', symbol: 'TATASTEEL', company: 'Tata Steel Ltd', callType: 'Technical BUY', price: '₹138.20', target: '₹156.00', pnl: '+₹17.80 (+12.9%)', pnlPositive: true, status: 'Active', savedAt: '2 weeks ago' },
  { id: 'bc2', symbol: 'TATAMOTORS', company: 'Tata Motors Ltd', callType: 'Fundamental BUY', price: '₹920.00', target: '₹1,180', pnl: '+₹76.10 (+8.3%)', pnlPositive: true, status: 'Active', savedAt: '3 weeks ago' },
  { id: 'bc3', symbol: 'INFY', company: 'Infosys Ltd', callType: 'Swing HOLD', price: '₹1,560.00', target: '₹1,620', pnl: '+₹2.10 (+0.1%)', pnlPositive: true, status: 'Active', savedAt: '1 month ago' },
  { id: 'bc4', symbol: 'SBIN', company: 'State Bank of India', callType: 'Value BUY', price: '₹745.00', target: '₹840', pnl: '+₹12.80 (+1.7%)', pnlPositive: true, status: 'Active', savedAt: '2 months ago' },
];

const recentlyViewed = [
  { symbol: 'HDFCBANK', title: 'HDFC Bank Q1 NIM Analysis — Targeting ₹1,950', type: 'Equity Report' },
  { symbol: 'HAL', title: 'HAL Defence Order Book Update — Record High', type: 'News Brief' },
  { symbol: 'NTPC', title: 'NTPC Green Energy CAPEX — Deep Dive Analysis', type: 'Sector Brief' },
];

const typeColor = (type: string) => {
  if (type === 'Equity Research') return 'bg-primary-light text-primary border-[#E2E8F0]';
  if (type === 'Sector Report') return 'bg-violet-50 text-violet-700 border-violet-100';
  if (type === 'AI Brief') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (type === 'F&O Strategy') return 'bg-rose-50 text-rose-700 border-rose-100';
  return 'bg-amber-50 text-amber-700 border-amber-100';
};

export const SavedTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'Equity Research' | 'Sector Report' | 'F&O Strategy' | 'Macro Report'>('ALL');
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const filteredReports = SAVED_REPORTS.filter(r => {
    if (deletedIds.includes(r.id)) return false;
    const matchQuery = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === 'ALL' || r.type === activeFilter;
    return matchQuery && matchFilter;
  });

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 animate-in fade-in duration-300 pb-16">

      {/* ── STATS HEADER ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Saved Reports', value: SAVED_REPORTS.length, icon: FileText, color: 'text-primary', bg: 'bg-primary-light', border: 'border-[#E2E8F0]' },
          { label: 'AI Briefs', value: SAVED_BRIEFS.length, icon: Sparkles, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
          { label: 'Bookmarked Calls', value: BOOKMARKED_CALLS.length, icon: Bookmark, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Recently Viewed', value: recentlyViewed.length, icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-xs flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${stat.bg} ${stat.border} shrink-0`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">{stat.label}</span>
                <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── SEARCH & FILTER ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved reports, briefs, symbols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-primary-light shadow-xs transition"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
          {(['ALL', 'Equity Research', 'Sector Report', 'F&O Strategy', 'Macro Report'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black whitespace-nowrap transition cursor-pointer ${
                activeFilter === f ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── SAVED REPORTS ── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary-light border border-[#E2E8F0] flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">Saved Research Reports</h3>
            <span className="text-[10px] text-slate-400 font-bold">PDF research notes, institutional reports & analysis</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {filteredReports.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                whileHover={{ y: -2 }}
                className="bg-white border border-slate-200 rounded-[22px] p-5 hover:border-primary-light hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* File icon */}
                    <div className="w-12 h-14 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center shrink-0 group-hover:border-primary-light transition">
                      <FileText className="w-5 h-5 text-slate-500 mb-0.5" />
                      <span className="text-[8px] font-black text-slate-400 uppercase">PDF</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${typeColor(r.type)}`}>{r.type}</span>
                        <span className="text-[9px] font-black px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200">{r.tag}</span>
                        {r.isNew && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">NEW</span>
                        )}
                      </div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-1.5 line-clamp-2">
                        {r.title}
                      </h4>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-slate-900 text-white text-[7px] font-black flex items-center justify-center">
                            {r.analyst.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">{r.analyst}</span>
                        </div>
                        <span className="text-slate-200">·</span>
                        <span className="text-[10px] font-bold text-slate-400">{r.date}</span>
                        <span className="text-slate-200">·</span>
                        <span className="text-[10px] font-bold text-slate-400">{r.size}</span>
                        {r.rating !== 'Strategy' && r.rating !== 'Macro View' && (
                          <>
                            <span className="text-slate-200">·</span>
                            <span className="text-[10px] font-black text-emerald-600">Target: {r.target}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="p-2 hover:bg-primary-light border border-slate-200 hover:border-primary-light rounded-xl text-slate-400 hover:text-primary transition cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-2 hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-700 transition cursor-pointer">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeletedIds(prev => [...prev, r.id]); }}
                      className="p-2 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl text-slate-400 hover:text-danger transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredReports.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200 rounded-[22px]">
              <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-black text-slate-400">No reports match your search</p>
              <p className="text-xs font-medium text-slate-300 mt-1">Try adjusting your filter or search term</p>
            </div>
          )}
        </div>
      </div>

      {/* ── AI BRIEFS + BOOKMARKED CALLS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* AI Briefs */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Saved AI Briefs</h3>
              <span className="text-[10px] text-slate-400 font-bold">AI-generated summaries and briefings</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {SAVED_BRIEFS.map((brief, i) => (
              <motion.div
                key={brief.id}
                whileHover={{ y: -2 }}
                className="bg-white border border-slate-200 rounded-[20px] p-5 hover:border-violet-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 group-hover:border-violet-300 transition">
                    <Sparkles className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-black text-violet-600 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded">
                        {brief.topic}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                        <Clock className="w-3 h-3" /> {brief.length}
                      </div>
                    </div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-violet-600 transition-colors leading-tight mb-1.5">
                      {brief.title}
                    </h4>
                    <div className="bg-violet-50 border border-violet-100 rounded-xl p-2.5 mb-2">
                      <p className="text-[10px] font-bold text-violet-800 leading-snug">
                        💡 {brief.keyInsight}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-slate-400">{brief.date}</span>
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition cursor-pointer">
                          <Share2 className="w-3 h-3" />
                        </button>
                        <button className="p-1.5 hover:bg-rose-50 border border-slate-100 rounded-lg text-slate-400 hover:text-danger transition cursor-pointer">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bookmarked Research Calls */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Bookmarked Research Calls</h3>
              <span className="text-[10px] text-slate-400 font-bold">Calls you're tracking from the research feed</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {BOOKMARKED_CALLS.map((call) => (
              <motion.div
                key={call.id}
                whileHover={{ y: -2 }}
                className="bg-white border border-slate-200 rounded-[20px] p-5 hover:border-amber-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      {call.symbol.substring(0, 2)}
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-900 block group-hover:text-amber-600 transition">{call.symbol}</span>
                      <span className="text-[9px] font-bold text-slate-400">{call.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                      {call.status}
                    </span>
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3 mb-3">
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase block">Entry</span>
                    <span className="text-xs font-black text-slate-900">{call.price}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase block">Target</span>
                    <span className="text-xs font-black text-emerald-600">{call.target}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase block">Current P&L</span>
                    <span className={`text-xs font-black ${call.pnlPositive ? 'text-emerald-600' : 'text-danger'}`}>{call.pnl}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold">
                  <span>{call.callType}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Bookmarked {call.savedAt}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECENTLY VIEWED ── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
            <Eye className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">Recently Viewed</h3>
            <span className="text-[10px] text-slate-400 font-bold">Continue where you left off</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recentlyViewed.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="bg-white border border-slate-200 p-4 rounded-[20px] flex items-center justify-between hover:border-primary-light hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                  {item.symbol.substring(0, 2)}
                </div>
                <div>
                  <span className="text-[9px] font-black text-slate-400 block uppercase">{item.type}</span>
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-primary transition line-clamp-1">{item.title}</h4>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── QUICK ACTIONS BAR ── */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <h3 className="text-base font-black text-white mb-1">Explore More Research</h3>
          <p className="text-xs font-medium text-slate-400">Browse 200+ live research calls, sector reports and AI briefs</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/10 border border-white/20 text-white text-xs font-black rounded-xl hover:bg-white/20 transition cursor-pointer">
            <Radio className="w-3.5 h-3.5" /> Live Calls
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-black rounded-xl transition cursor-pointer shadow-md">
            <Sparkles className="w-3.5 h-3.5" /> AI Research Brief <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedTab;
