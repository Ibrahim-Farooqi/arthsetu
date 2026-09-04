import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, TrendingUp, Sparkles, FileText, UserCheck, 
  Building2, ArrowRight, CornerDownLeft, Clock, Zap, Loader2,
  PieChart, Rocket, ShieldCheck
} from 'lucide-react';

interface UniversalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock: (stock: any) => void;
  onSelectResearch: (research: any) => void;
  onSelectReport: (report: any) => void;
  onSelectAnalyst: (analyst: any) => void;
}

export const UniversalSearch: React.FC<UniversalSearchProps> = ({
  isOpen,
  onClose,
  onSelectStock,
  onSelectResearch,
  onSelectReport,
  onSelectAnalyst
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Recent Searches
  const [recentSearches, setRecentSearches] = useState([
    'RELIANCE', 'TCS', 'HDFC Bank', 'IT Sector Outlook', 'Aarav Mehta'
  ]);

  // Handle ⌘K shortcut globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Simulate debounced search typing
  useEffect(() => {
    if (!query) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  // Master Mock Database for Universal Search
  const mockDatabase = {
    stocks: [
      { type: 'stock', symbol: 'RELIANCE', company: 'Reliance Industries Ltd', price: '₹3,024.50', change: '+1.45%', logo: 'RL', sector: 'Energy' },
      { type: 'stock', symbol: 'TCS', company: 'Tata Consultancy Services', price: '₹4,185.10', change: '+0.82%', logo: 'TC', sector: 'IT Services' },
      { type: 'stock', symbol: 'HDFCBANK', company: 'HDFC Bank Limited', price: '₹1,682.40', change: '+0.85%', logo: 'HD', sector: 'Banking' },
      { type: 'stock', symbol: 'LT', company: 'Larsen & Toubro Ltd', price: '₹3,456.90', change: '+1.05%', logo: 'LT', sector: 'Capital Goods' }
    ],
    research: [
      { type: 'research', title: 'Reliance Industries Q1 Re-Rating Thesis', symbol: 'RELIANCE', rec: 'BUY', target: '₹3,375', confidence: 94, analyst: 'Rahul Sharma' },
      { type: 'research', title: 'IT Sector Rotation & Defensive Allocation', symbol: 'TCS', rec: 'HOLD', target: '₹4,400', confidence: 85, analyst: 'Aarav Mehta' },
      { type: 'research', title: 'HDFC Bank Margin Recovery & Deposit Growth', symbol: 'HDFCBANK', rec: 'BUY', target: '₹1,884', confidence: 91, analyst: 'Neha Shah' }
    ],
    funds: [
      { type: 'fund', name: 'Parag Parikh Flexi Cap Fund', return3Y: '24.8%', category: 'Equity Flexi Cap', rating: '5 Stars' },
      { type: 'fund', name: 'Nippon India Junior BeES ETF', price: '₹624.50', return3Y: '+18.2%', category: 'Index ETF', rating: 'High Liquidity' }
    ],
    ipos: [
      { type: 'ipo', name: 'Ola Electric Mobility IPO', price: '₹72 - 76', status: 'Bidding Open', expectedPremium: '+18%' }
    ],
    reports: [
      { type: 'report', title: 'IT Services Sector Outlook FY27', author: 'ArthSetu Quant Team', category: 'Sector Report', date: '18 Jul 2026' },
      { type: 'report', title: 'Energy Giga-factory Valuation Impact', author: 'Aarav Mehta', category: 'Fundamental Note', date: '15 Jul 2026' }
    ],
    analysts: [
      { type: 'analyst', name: 'Aarav Mehta', role: 'Head of Technical Research', acc: '84%', ret: '+18.4%' },
      { type: 'analyst', name: 'Neha Shah', role: 'Senior Fundamental Analyst', acc: '88%', ret: '+22.1%' }
    ]
  };

  // Filter items based on query
  const q = query.toLowerCase().trim();

  const filteredStocks = mockDatabase.stocks.filter(s => 
    !q || s.symbol.toLowerCase().includes(q) || s.company.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q)
  );

  const filteredResearch = mockDatabase.research.filter(r => 
    !q || r.title.toLowerCase().includes(q) || r.symbol.toLowerCase().includes(q) || r.analyst.toLowerCase().includes(q)
  );

  const filteredFunds = mockDatabase.funds.filter(f => 
    !q || f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
  );

  const filteredReports = mockDatabase.reports.filter(rep => 
    !q || rep.title.toLowerCase().includes(q) || rep.author.toLowerCase().includes(q)
  );

  const filteredAnalysts = mockDatabase.analysts.filter(a => 
    !q || a.name.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
  );

  const totalResultsCount = filteredStocks.length + filteredResearch.length + filteredFunds.length + filteredReports.length + filteredAnalysts.length;

  const handleSelectResult = (item: any) => {
    // Add to recent searches if string query
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches(prev => [query.trim(), ...prev.slice(0, 4)]);
    }

    onClose();

    if (item.type === 'stock' || item.type === 'fund') {
      onSelectStock(item);
    } else if (item.type === 'research') {
      onSelectResearch(item);
    } else if (item.type === 'report') {
      onSelectReport(item);
    } else if (item.type === 'analyst') {
      onSelectAnalyst(item);
    } else {
      onSelectStock(item);
    }
  };

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.15 }}
          className="w-full max-w-3xl bg-white rounded-[28px] border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] relative"
        >
          {/* SEARCH INPUT BAR */}
          <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3 bg-[#F8FAFC]">
            {isSearching ? (
              <Loader2 className="w-5 h-5 text-[#15519D] animate-spin shrink-0" />
            ) : (
              <Search className="w-5 h-5 text-[#15519D] shrink-0" />
            )}

            <input
              ref={inputRef}
              type="text"
              placeholder="Search stocks, research, reports, analysts, mutual funds, ETFs, IPOs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-[#172033] outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none border-none ring-0 placeholder:text-slate-400 placeholder:font-medium"
              style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
            />

            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-200 transition"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <kbd className="hidden sm:inline-block px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 shadow-xs">
              ESC
            </kbd>

            {/* Explicit Close Modal Cross Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 transition-colors cursor-pointer border border-slate-200/60 bg-white shadow-2xs shrink-0"
              title="Close Search Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* RECENT SEARCHES CHIPS (if no query) */}
          {!query && (
            <div className="px-6 py-4 border-b border-slate-100 bg-white flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Recent:
              </span>
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-slate-600 hover:text-primary hover:border-primary-light transition"
                >
                  {term}
                </button>
              ))}
            </div>
          )}

          {/* CATEGORIZED RESULTS LIST */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

            {/* STOCKS RESULTS */}
            {filteredStocks.length > 0 && (
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">
                  Stocks ({filteredStocks.length})
                </span>
                <div className="flex flex-col gap-2">
                  {filteredStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => handleSelectResult(stock)}
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between hover:border-primary-light hover:bg-primary-light/40 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#172033] text-white flex items-center justify-center font-black text-xs shrink-0">
                          {stock.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-[#172033] text-sm group-hover:text-primary transition">
                              {stock.company}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">NSE:{stock.symbol}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium">Sector: {stock.sector}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-sm text-[#172033] block">{stock.price}</span>
                        <span className="text-[10px] font-extrabold text-emerald-600">{stock.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RESEARCH CALLS RESULTS */}
            {filteredResearch.length > 0 && (
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">
                  Research Analysis ({filteredResearch.length})
                </span>
                <div className="flex flex-col gap-2">
                  {filteredResearch.map((res) => (
                    <div
                      key={res.title}
                      onClick={() => handleSelectResult(res)}
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between hover:border-primary-light hover:bg-primary-light/40 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                          res.rec === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {res.rec}
                        </span>
                        <div>
                          <h4 className="font-black text-[#172033] text-sm group-hover:text-primary transition">
                            {res.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">By {res.analyst} · Target: {res.target}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-primary bg-primary-light px-2 py-0.5 rounded">
                          {res.confidence}% AI
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MUTUAL FUNDS & ETFS */}
            {filteredFunds.length > 0 && (
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">
                  Funds & ETFs ({filteredFunds.length})
                </span>
                <div className="flex flex-col gap-2">
                  {filteredFunds.map((fund) => (
                    <div
                      key={fund.name}
                      onClick={() => handleSelectResult(fund)}
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between hover:border-primary-light hover:bg-primary-light/40 transition cursor-pointer group"
                    >
                      <div>
                        <h4 className="font-black text-[#172033] text-sm group-hover:text-primary transition">
                          {fund.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">{fund.category} · {fund.rating}</span>
                      </div>
                      <span className="text-xs font-black text-emerald-600">{fund.return3Y} 3Y CAGR</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REPORTS RESULTS */}
            {filteredReports.length > 0 && (
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">
                  Institutional Reports ({filteredReports.length})
                </span>
                <div className="flex flex-col gap-2">
                  {filteredReports.map((rep) => (
                    <div
                      key={rep.title}
                      onClick={() => handleSelectResult(rep)}
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between hover:border-primary-light hover:bg-primary-light/40 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <h4 className="font-black text-[#172033] text-sm group-hover:text-primary transition">
                            {rep.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">By {rep.author} · {rep.date}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                        {rep.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ANALYSTS RESULTS */}
            {filteredAnalysts.length > 0 && (
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-3">
                  Analyst Profiles ({filteredAnalysts.length})
                </span>
                <div className="flex flex-col gap-2">
                  {filteredAnalysts.map((an) => (
                    <div
                      key={an.name}
                      onClick={() => handleSelectResult(an)}
                      className="p-3.5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between hover:border-primary-light hover:bg-primary-light/40 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <h4 className="font-black text-[#172033] text-sm group-hover:text-primary transition">
                            {an.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">{an.role}</span>
                        </div>
                      </div>
                      <span className="text-xs font-black text-emerald-600">{an.acc} Accuracy</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {totalResultsCount === 0 && (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <Search className="w-10 h-10 text-slate-300 mb-3" />
                <h4 className="font-black text-base text-[#172033]">No Investment Matches Found</h4>
                <p className="text-xs text-slate-400 font-medium mt-1">Try searching for tickers like RELIANCE, TCS, or report keywords.</p>
              </div>
            )}

          </div>

          {/* FOOTER SHORTCUT HINT */}
          <div className="px-6 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-bold text-slate-400">
            <span>Universal Investment Search Engine</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1"><CornerDownLeft className="w-3 h-3" /> Select</span>
              <span>·</span>
              <span>⌘K to toggle</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
