import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Sparkles, TrendingUp, AlertCircle, ArrowRight, Bookmark, 
  Clock, BarChart3, Calendar, Layers, Activity, FileText, ArrowUpRight, 
  ArrowDownRight, Download, BookOpen, Share2, Award, Zap, ChevronRight, X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { NewsDetail } from './NewsDetail';

interface MarketIntelligenceCenterProps {
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (tradeData: any) => void;
}

export const MarketIntelligenceCenter: React.FC<MarketIntelligenceCenterProps> = ({
  onSelectStock,
  onSelectResearch,
  onTrade
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Markets' | 'Companies' | 'Corporate Actions' | 'Economy' | 'AI Brief' | 'Saved'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['news-1', 'news-3']);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string | null>(null);

  // Mock Market Data Snapshot
  const marketSnapshot = [
    { name: 'NIFTY 50', value: '24,586.20', change: '+142.50', percent: '+0.58%', isPositive: true, sparkline: [10, 15, 8, 12, 18, 25, 20, 30] },
    { name: 'SENSEX', value: '80,716.40', change: '+485.10', percent: '+0.61%', isPositive: true, sparkline: [12, 18, 14, 22, 20, 28, 26, 32] },
    { name: 'BANK NIFTY', value: '52,380.90', change: '+610.40', percent: '+1.18%', isPositive: true, sparkline: [8, 10, 15, 12, 22, 18, 25, 35] },
    { name: 'NASDAQ', value: '17,842.10', change: '-94.30', percent: '-0.53%', isPositive: false, sparkline: [25, 22, 28, 20, 18, 15, 12, 10] },
    { name: 'Gold (10g)', value: '₹72,450', change: '+180', percent: '+0.25%', isPositive: true, sparkline: [15, 18, 16, 20, 22, 21, 24, 25] },
    { name: 'USD/INR', value: '₹83.68', change: '-0.02', percent: '-0.02%', isPositive: false, sparkline: [18, 17, 19, 18, 17, 16, 17, 16] }
  ];

  // News Database
  const articles = [
    {
      id: 'news-1',
      headline: 'RBI Policy: Repo Rate Kept Unchanged at 6.5% as Inflation Target Remains Priority',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
      source: 'Bloomberg India',
      time: '12 min ago',
      readTime: '4 min read',
      category: 'Economy',
      sentiment: 'Bullish',
      stocks: ['HDFCBANK', 'ICICIBANK', 'SBIN'],
      sectors: ['Financials', 'Banking'],
      summary: 'The RBI kept interest rates steady for the 7th consecutive policy meeting. Commercial banks gain headroom to improve core margins without deposit rate hikes.',
      isHero: true,
      impact: 'High Positive Impact on banking stocks. Nifty Bank gains 1.2% matching historic post-policy margins.'
    },
    {
      id: 'news-2',
      headline: 'Reliance Green Hydrogen Gigafactory Phase-1 Commissioning Approaching Target Date',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop',
      source: 'Reuters Financial',
      time: '45 min ago',
      readTime: '3 min read',
      category: 'Companies',
      sentiment: 'Bullish',
      stocks: ['RELIANCE', 'LT'],
      sectors: ['Energy', 'Utilities'],
      summary: 'Reliance Industries is preparing for commercial green hydrogen electrolyzer production. Institutional brokerages project a long-term enterprise valuation re-rating.',
      isHero: false,
      impact: 'Positive. Enhances ESG metrics and offers long term alternative fuel upside.'
    },
    {
      id: 'news-3',
      headline: 'IT Exports Face Temp Headwinds as US CPI Inflation Softens to 2.9%',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
      source: 'Wall Street Journal',
      time: '2 hrs ago',
      readTime: '5 min read',
      category: 'Economy',
      sentiment: 'Bearish',
      stocks: ['TCS', 'INFY', 'WIPRO'],
      sectors: ['Technology', 'IT Services'],
      summary: 'Lower US yields bode well for Indian IT exporters as US enterprise software spending resumes momentum in Q3 FY26.',
      isHero: false,
      impact: 'Marginal Negative. High beta tech positions might witness consolidation.'
    },
    {
      id: 'news-4',
      headline: 'HDFC Bank Announces Q1 Board Meeting for ₹19.5 Dividend Proposal',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600&auto=format&fit=crop',
      source: 'Economic Times',
      time: '3 hrs ago',
      readTime: '2 min read',
      category: 'Corporate Actions',
      sentiment: 'Bullish',
      stocks: ['HDFCBANK'],
      sectors: ['Financials'],
      summary: 'HDFC Bank’s board plans a payout review. Market yield expected to improve significantly.',
      isHero: false,
      impact: 'Bullish. High dividend yield attraction for retail investors.'
    },
    {
      id: 'news-5',
      headline: 'Adani Green Energy Secures $1.36 Billion International Credit Facility',
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=600&auto=format&fit=crop',
      source: 'Bloomberg India',
      time: '5 hrs ago',
      readTime: '4 min read',
      category: 'Companies',
      sentiment: 'Bullish',
      stocks: ['ADANIENT'],
      sectors: ['Energy'],
      summary: 'The new credit lines will support the Khavda renewable energy park construction phases.',
      isHero: false,
      impact: 'Bullish. Accelerates project timelines and secures funding.'
    }
  ];

  // Corporate Actions Database
  const corporateActions = [
    { id: 'ca-1', type: 'Dividend', company: 'Larsen & Toubro Ltd', symbol: 'LT', detail: '₹28.00 per share', date: 'Ex-Date Tomorrow', badge: 'High Yield' },
    { id: 'ca-2', type: 'Quarterly Results', company: 'Reliance Industries Ltd', symbol: 'RELIANCE', detail: 'Q1 Earnings Release (After Close)', date: 'Today', badge: 'High Impact' },
    { id: 'ca-3', type: 'Bonus Issue', company: 'Tata Power Company', symbol: 'TATAPOWER', detail: '1:1 Bonus Shares Approved', date: 'Record Date 28 Jul', badge: 'Bonus' },
    { id: 'ca-4', type: 'Buyback', company: 'TCS Ltd', symbol: 'TCS', detail: '₹4,150 Tender Offer Active', date: 'Open Now', badge: 'Premium' }
  ];

  // Suggestions search list
  const allSuggestions = [
    { text: 'Reliance Industries', type: 'Company', symbol: 'RELIANCE' },
    { text: 'Reliance Q1 Results', type: 'Corporate Actions', symbol: 'RELIANCE' },
    { text: 'Reliance Dividend', type: 'Corporate Actions', symbol: 'RELIANCE' },
    { text: 'NIFTY 50', type: 'Index', symbol: 'NIFTY' },
    { text: 'RBI Policy Review', type: 'Economy', symbol: 'RBI' },
    { text: 'TCS Buyback', type: 'Corporate Actions', symbol: 'TCS' },
    { text: 'IT Sector Index', type: 'Sector', symbol: 'INFY' },
    { text: 'HDFC Bank Dividend', type: 'Corporate Actions', symbol: 'HDFCBANK' },
    { text: 'Adani Energy Credit', type: 'Company', symbol: 'ADANIENT' }
  ];

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    return allSuggestions.filter(item => 
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const trendingCompanies = [
    { name: 'Reliance', symbol: 'RELIANCE' },
    { name: 'TCS', symbol: 'TCS' },
    { name: 'Infosys', symbol: 'INFY' },
    { name: 'HDFC Bank', symbol: 'HDFCBANK' },
    { name: 'ICICI Bank', symbol: 'ICICIBANK' },
    { name: 'Tata Motors', symbol: 'TATAMOTORS' },
    { name: 'Adani Ent', symbol: 'ADANIENT' }
  ];

  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    
    // Find matching article or filter to symbol
    const foundArticle = articles.find(art => 
      art.stocks.includes(suggestion.symbol) || 
      art.headline.toLowerCase().includes(suggestion.text.toLowerCase())
    );

    if (foundArticle) {
      setSelectedArticle(foundArticle);
    } else {
      setSelectedCompanyFilter(suggestion.symbol);
      toast.success(`Filtered feed for ${suggestion.symbol}`);
    }
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        toast.success('Removed from Saved Intelligence');
        return prev.filter(i => i !== id);
      } else {
        toast.success('Article saved to Saved Intelligence');
        return [...prev, id];
      }
    });
  };

  // Filter articles based on activeTab, searchQuery, and companyFilter
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      // Saved tab filter
      if (activeTab === 'Saved') {
        if (!bookmarkedIds.includes(art.id)) return false;
      } else if (activeTab === 'AI Brief') {
        // AI brief custom display
        return true;
      } else if (activeTab !== 'All') {
        if (art.category !== activeTab) return false;
      }

      // Company Filter Chip
      if (selectedCompanyFilter) {
        if (!art.stocks.includes(selectedCompanyFilter)) return false;
      }

      // Search Query Filter
      if (searchQuery && !showSuggestions) {
        const query = searchQuery.toLowerCase();
        const matchesHeadline = art.headline.toLowerCase().includes(query);
        const matchesSummary = art.summary.toLowerCase().includes(query);
        const matchesStocks = art.stocks.some(st => st.toLowerCase().includes(query));
        const matchesSectors = art.sectors.some(sec => sec.toLowerCase().includes(query));
        return matchesHeadline || matchesSummary || matchesStocks || matchesSectors;
      }

      return true;
    });
  }, [activeTab, searchQuery, selectedCompanyFilter, bookmarkedIds, showSuggestions]);

  // Find the top hero story
  const heroArticle = useMemo(() => {
    return articles.find(art => art.isHero) || articles[0];
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500 pb-16">
      
      {/* 1. PREMIUM STICKY SEARCH BAR */}
      <section className="relative z-30 w-full bg-white border border-slate-200 rounded-[24px] shadow-xs p-1">
        <div className="flex items-center gap-3 px-4 py-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search companies, news, sectors, earnings, IPOs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 font-bold"
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCompanyFilter(null);
                setShowSuggestions(false);
              }}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suggestion Dropdown */}
        <AnimatePresence>
          {showSuggestions && searchQuery && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-[20px] shadow-lg overflow-hidden z-40 max-h-72 overflow-y-auto"
            >
              <div className="p-2 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider px-3">Suggestions</span>
                <button 
                  onClick={() => setShowSuggestions(false)} 
                  className="text-[10px] text-primary font-black hover:underline px-3 cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="py-1">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSuggestionClick(item)}
                    className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-extrabold text-xs text-slate-800">{item.text}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      <span className="text-[10px] font-black text-primary bg-primary-light px-2 py-0.5 rounded">
                        ${item.symbol}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. FILTER BAR */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          {(['All', 'Markets', 'Companies', 'Corporate Actions', 'Economy', 'AI Brief', 'Saved'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedCompanyFilter(null);
                }}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'text-white bg-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab === 'AI Brief' && <Sparkles className="w-3 h-3 inline mr-1 fill-[#64748B] text-[#64748B] animate-pulse" />}
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TRENDING COMPANIES CHIPS */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trending Companies</span>
          {selectedCompanyFilter && (
            <button 
              onClick={() => setSelectedCompanyFilter(null)}
              className="text-[10px] font-black text-danger hover:underline flex items-center gap-1"
            >
              Clear Filter <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {trendingCompanies.map((comp) => {
            const isSelected = selectedCompanyFilter === comp.symbol;
            return (
              <button
                key={comp.symbol}
                onClick={() => {
                  if (isSelected) {
                    setSelectedCompanyFilter(null);
                  } else {
                    setSelectedCompanyFilter(comp.symbol);
                    toast.success(`Filtering stories containing ${comp.name}`);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black border transition cursor-pointer shrink-0 ${
                  isSelected 
                    ? 'bg-primary-light border-primary text-primary shadow-xs' 
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                {comp.name} <span className="text-[9px] text-slate-400 font-bold ml-0.5">${comp.symbol}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. MAIN LAYOUT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle Column (Hero + Breaking News / AI Brief View) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* AI BRIEF DEDICATED TRAY */}
          {activeTab === 'AI Brief' ? (
            <section className="bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary fill-primary/20 animate-pulse" />
                  <div>
                    <h3 className="text-xl font-black text-[#172033]">AI Daily Intelligence Brief</h3>
                    <span className="text-xs text-slate-400 font-bold">SEBI-Compliant Automated Market Synthesis</span>
                  </div>
                </div>
                <span className="text-xs font-black bg-primary-light text-primary-dark border border-[#E2E8F0] px-3 py-1 rounded-full">
                  08:30 AM IST
                </span>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl flex flex-col gap-3">
                <h4 className="text-xs font-black text-primary uppercase tracking-wider">Executive Synthesis</h4>
                <p className="text-sm text-slate-800 font-medium leading-relaxed">
                  Indian markets continue to consolidate with minor bullish bias near record highs. FII support in financial services provides a solid valuation floor. Short-term volatility levels are low, favoring active rotation into quality banking and green energy conglomerates.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
                  <span className="text-[10px] font-black text-emerald-700 uppercase block mb-1">Top Opportunity</span>
                  <strong className="text-sm font-black text-slate-800 block">Accumulating Tier-1 Financials</strong>
                  <span className="text-xs text-slate-500 mt-1 block">Yield compression margins favor core commercial lenders on policy support.</span>
                </div>
                <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100">
                  <span className="text-[10px] font-black text-rose-700 uppercase block mb-1">Biggest Risk Factor</span>
                  <strong className="text-sm font-black text-slate-800 block">Sub-Monsoon Consolidation</strong>
                  <span className="text-xs text-slate-500 mt-1 block">Monsoon deficits might introduce temporary supply constraints in food staples.</span>
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200 flex flex-col gap-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tomorrow's Core Catalyst Events</span>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="font-extrabold text-slate-700">US Core Consumer Inflation (CPI)</span>
                    <span className="font-black text-primary bg-primary-light px-2 py-0.5 rounded">High Impact</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-extrabold text-slate-700">Infosys Q1 Earnings Release</span>
                    <span className="font-black text-primary bg-primary-light px-2 py-0.5 rounded">High Impact</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-primary-light/40 border border-[#E2E8F0] rounded-xl p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] text-primary-dark font-black uppercase tracking-wider">Market Sentiment Bias</span>
                  <span className="text-xs font-bold text-slate-700">Bullish setup backed by institutional inflows.</span>
                </div>
                <span className="text-xs font-black text-primary bg-white border border-primary-light px-3 py-1.5 rounded-lg shrink-0">
                  92% Conviction
                </span>
              </div>
            </section>
          ) : (
            <>
              {/* HERO SECTION - ONLY SHOW WHEN "All" TAB AND NO SPECIFIC STOCK FILTER */}
              {activeTab === 'All' && !selectedCompanyFilter && !searchQuery && (
                <section className="flex flex-col gap-3">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Today's Market Intelligence</h3>
                  <div 
                    onClick={() => setSelectedArticle(heroArticle)}
                    className="group bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col"
                  >
                    <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
                      <img
                        src={heroArticle.image}
                        alt={heroArticle.headline}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                          {heroArticle.category}
                        </span>
                        <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                          {heroArticle.sentiment} Impact
                        </span>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 flex flex-col justify-end">
                        <span className="text-[9px] text-[#64748B] font-black uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" /> Lead Editorial Analysis
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          {heroArticle.headline}
                        </h2>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col gap-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-b border-slate-100 pb-3">
                        <span>{heroArticle.source} • {heroArticle.time}</span>
                        <span>{heroArticle.readTime}</span>
                      </div>

                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {heroArticle.summary}
                      </p>

                      <div className="bg-primary-light/60 border border-[#E2E8F0] rounded-2xl p-4 flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-primary fill-primary/20" />
                          <span className="text-[10px] text-primary font-black uppercase tracking-wider">AI Impact Forecast</span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                          {heroArticle.impact}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        <div className="flex items-center gap-1.5">
                          {heroArticle.stocks.map(st => (
                            <span 
                              key={st}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectStock) onSelectStock({ symbol: st, company: st });
                              }}
                              className="text-[10px] font-black bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 px-2 py-0.5 rounded cursor-pointer"
                            >
                              ${st}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={(e) => toggleBookmark(heroArticle.id, e)}
                            className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-primary hover:bg-primary-light/30 transition cursor-pointer"
                          >
                            <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(heroArticle.id) ? 'fill-primary text-primary' : ''}`} />
                          </button>
                          <button className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition cursor-pointer">
                            Read Analysis
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* BREAKING NEWS LIST */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    {activeTab === 'Saved' ? 'Saved Intelligence' : 'Market Intelligence Feed'}
                  </h3>
                  <span className="text-xs font-bold text-slate-400">{filteredArticles.length} Stories</span>
                </div>

                {filteredArticles.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {filteredArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className="group bg-white border border-slate-200 rounded-3xl p-4.5 cursor-pointer hover:border-slate-400 hover:shadow-xs transition duration-200 flex flex-col sm:flex-row gap-5"
                      >
                        {/* Thumbnail */}
                        <div className="w-full sm:w-40 h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                          <img
                            src={art.image}
                            alt={art.headline}
                            className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between gap-2.5">
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-bold">
                              <span>{art.source} • {art.time}</span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                art.sentiment === 'Bullish' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-danger border border-rose-100'
                              }`}>
                                {art.sentiment}
                              </span>
                            </div>
                            
                            <h4 className="font-black text-sm sm:text-base text-slate-900 leading-snug group-hover:text-primary transition-colors mt-1">
                              {art.headline}
                            </h4>
                            
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2 mt-1">
                              {art.summary}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-2.5">
                            <div className="flex items-center gap-1">
                              {art.stocks.map(st => (
                                <span 
                                  key={st}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onSelectStock) onSelectStock({ symbol: st, company: st });
                                  }}
                                  className="text-[9px] font-black bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded hover:bg-slate-100 cursor-pointer"
                                >
                                  ${st}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => toggleBookmark(art.id, e)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-primary transition cursor-pointer"
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${bookmarkedIds.includes(art.id) ? 'fill-primary text-primary' : ''}`} />
                              </button>
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-[28px] p-12 text-center flex flex-col items-center justify-center gap-2.5">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <span className="text-xs text-slate-500 font-black">No intelligence feeds match your criteria</span>
                    <button 
                      onClick={() => {
                        setActiveTab('All');
                        setSelectedCompanyFilter(null);
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </section>
            </>
          )}

        </div>

        {/* Right Sidebar Column (Market Snapshot + AI Daily Brief Widget + Corporate Actions Timeline) */}
        <div className="flex flex-col gap-6">

          {/* MARKET SNAPSHOT WIDGET */}
          <section className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-primary" /> Live Market Indices
              </span>
              <span className="text-[9px] text-emerald-600 font-black bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md animate-pulse">LIVE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
              {marketSnapshot.map((idx) => (
                <div key={idx.name} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-1.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase">{idx.name}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-800">{idx.value}</span>
                    <span className={`text-[9px] font-bold ${idx.isPositive ? 'text-emerald-600' : 'text-danger'}`}>
                      {idx.change} ({idx.percent})
                    </span>
                  </div>
                  
                  {/* Inline Sparkline SVG */}
                  <svg className="w-full h-5 mt-1 opacity-70" viewBox="0 0 100 20">
                    <path
                      d={`M ${idx.sparkline.map((val, i) => `${(i / (idx.sparkline.length - 1)) * 100} ${20 - val}`).join(' L ')}`}
                      fill="none"
                      stroke={idx.isPositive ? '#10B981' : '#DC2626'}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </section>
          
          {/* AI DAILY BRIEF SIDEBAR WIDGET */}
          {activeTab !== 'AI Brief' && (
            <section className="bg-gradient-to-br from-blue-900 to-slate-950 text-white rounded-[28px] p-6 shadow-md border border-slate-800 relative overflow-hidden flex flex-col gap-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#64748B] fill-[#64748B] animate-pulse" />
                  <div>
                    <h4 className="text-xs font-black tracking-widest text-slate-200 uppercase">AI Intelligence Brief</h4>
                    <span className="text-[8px] text-slate-400 font-bold uppercase block mt-0.5">Updated 08:30 AM IST</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-[#64748B] font-black uppercase tracking-wider">Today's Market Summary</span>
                <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                  Markets consolidate near record high following robust FII flows in financials. Short term momentum favors large caps as corporate actions support yields.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[8px] text-emerald-400 font-black uppercase tracking-wider block mb-0.5">Top Opportunity</span>
                  <strong className="text-[11px] text-slate-200">Banking Value</strong>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[8px] text-rose-400 font-black uppercase tracking-wider block mb-0.5">Biggest Risk</span>
                  <strong className="text-[11px] text-slate-200">Monsoon Delay</strong>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[8px] text-blue-300 font-black uppercase tracking-wider block mb-0.5">Sector Spotlight</span>
                  <strong className="text-[11px] text-slate-200">Green Hydrogen</strong>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[8px] text-amber-300 font-black uppercase tracking-wider block mb-0.5">Tomorrow's Event</span>
                  <strong className="text-[11px] text-slate-200">US CPI Data</strong>
                </div>
              </div>

              <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                <span className="text-[9px] text-slate-400 font-black uppercase">Market Sentiment</span>
                <span className="text-[10px] text-emerald-400 font-black">BULLISH (92% Conf.)</span>
              </div>

              <button 
                onClick={() => {
                  setActiveTab('AI Brief');
                  toast.success('Navigated to full AI Intelligence digest');
                }}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                Read Full Intelligence Report <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </section>
          )}

          {/* CORPORATE ACTIONS TIMELINE */}
          <section className="bg-white border border-slate-200 rounded-[28px] p-5 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" /> Corporate Actions Timeline
              </span>
              <span className="text-[9px] text-slate-500 font-bold">This Week</span>
            </div>

            <div className="flex flex-col gap-4 relative pl-3 before:absolute before:inset-y-1 before:left-0.5 before:w-0.5 before:bg-slate-100">
              {corporateActions.map((ca) => (
                <div key={ca.id} className="relative flex flex-col gap-1">
                  <div className="absolute -left-[14.5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white bg-primary shadow-xs" />
                  
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[8px] font-black bg-primary-light text-primary border border-[#E2E8F0] px-1.5 py-0.2 rounded uppercase">
                      {ca.type}
                    </span>
                    <span className="text-[9px] text-slate-400 font-bold">{ca.date}</span>
                  </div>
                  
                  <h5 className="font-extrabold text-xs text-slate-800 leading-tight">
                    {ca.company} (${ca.symbol})
                  </h5>
                  
                  <div className="flex items-center justify-between gap-4 mt-0.5">
                    <span className="text-[10px] text-slate-500 font-bold">{ca.detail}</span>
                    <button 
                      onClick={() => {
                        if (onSelectStock) onSelectStock({ symbol: ca.symbol, company: ca.company });
                      }}
                      className="text-[9px] font-black text-primary hover:underline flex items-center cursor-pointer"
                    >
                      Workspace <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>

      {/* ARTICLE DETAIL FULL PAGE MODAL */}
      <AnimatePresence>
        {selectedArticle && (
          <NewsDetail
            isOpen={true}
            onClose={() => setSelectedArticle(null)}
            newsItem={selectedArticle}
            onOpenCompany={(sym) => {
              setSelectedArticle(null);
              if (onSelectStock) onSelectStock({ symbol: sym, company: sym });
            }}
            onOpenResearch={(res) => {
              setSelectedArticle(null);
              if (onSelectResearch) onSelectResearch(res);
            }}
            onTrade={(tr) => {
              setSelectedArticle(null);
              if (onTrade) onTrade(tr);
            }}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default MarketIntelligenceCenter;
