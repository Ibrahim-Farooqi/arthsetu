import api from '../../services/api';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, CandlestickChart, Wallet, Gem, Fuel, Rocket, 
  Layers, Landmark, Shield, MoreHorizontal, Sparkles, TrendingUp,
  SlidersHorizontal, ArrowRight, Bookmark, ArrowUpDown, RefreshCw,
  Calculator, CheckCircle2, ShieldCheck, Zap, AlertCircle, HelpCircle,
  X, Filter, Compass, Plus, ExternalLink, ChevronLeft, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AllProductsTab } from '../invest/AllProductsTab';
import { StocksTab } from '../invest/StocksTab';
import { MutualFundsTab } from '../invest/MutualFundsTab';
import { ETFsTab } from '../invest/ETFsTab';
import { IPOsTab } from '../invest/IPOsTab';
import { GoldTab } from '../invest/GoldTab';
import { CommoditiesTab } from '../invest/CommoditiesTab';

export interface InvestHubProps {
  activeCategory?: string;
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (trade: any) => void;
}

export const InvestHub: React.FC<InvestHubProps> = ({
  activeCategory = 'all',
  onSelectStock,
  onSelectResearch,
  onTrade
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory === 'stocks' ? 'stocks' : 'all');
  const [activeCollection, setActiveCollection] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('Popularity');
  const [bookmarkedItems, setBookmarkedItems] = useState<Record<string, boolean>>({});

  const [trendingFunds, setTrendingFunds] = useState<any[]>([]);
  const [trendingIPOs, setTrendingIPOs] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const [fundsRes, iposRes] = await Promise.all([
          api.get('/mutual-funds/'),
          api.get('/ipos/upcoming')
        ]);
        
        setTrendingFunds(fundsRes.data.map((mf: any) => ({
          name: mf.fund_name,
          symbol: mf.id,
          price: `NAV: ₹${mf.nav}`,
          change: `${mf.one_year_return || 0}% 1Y`,
          risk: mf.category || 'Moderate',
          logo: mf.fund_name.substring(0, 2).toUpperCase()
        })));

        setTrendingIPOs(iposRes.data.map((ipo: any) => ({
          name: ipo.company_name,
          symbol: ipo.id,
          price: `₹${ipo.issue_price_min} - ${ipo.issue_price_max}`,
          change: `GMP ₹${ipo.current_gmp || 0}`,
          status: 'Bidding Open',
          logo: ipo.company_name.substring(0, 2).toUpperCase()
        })));
      } catch (error) {
        console.error("Failed to fetch marketplace data", error);
      }
    };
    fetchMarketplace();
  }, []);

  // Scroll Container Ref for Minimalist Asset Classes Navigation
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

    // Tool Calculator Modal State
  const [activeToolModal, setActiveToolModal] = useState<string | null>(null);
  
  // SIP Calculator State
  const [sipMonthly, setSipMonthly] = useState<number>(10000);
  const [sipYears, setSipYears] = useState<number>(10);
  const [sipReturnRate, setSipReturnRate] = useState<number>(14);

  // Lumpsum Calculator State
  const [lumpsumPrincipal, setLumpsumPrincipal] = useState<number>(100000);
  const [lumpsumYears, setLumpsumYears] = useState<number>(10);
  const [lumpsumReturnRate, setLumpsumReturnRate] = useState<number>(12);

  // Goal Planner State
  const [goalTarget, setGoalTarget] = useState<number>(5000000);
  const [goalYears, setGoalYears] = useState<number>(15);
  const [goalReturnRate, setGoalReturnRate] = useState<number>(12);
  const [goalInflation, setGoalInflation] = useState<number>(6);
  const [goalType, setGoalType] = useState<'retirement' | 'house' | 'education' | 'car'>('retirement');

  // Tax Estimator State
  const [taxIncome, setTaxIncome] = useState<number>(1200000);
  const [taxDeductions80C, setTaxDeductions80C] = useState<number>(150000);
  const [taxDeductionsOther, setTaxDeductionsOther] = useState<number>(50000);

  // Toggle Bookmark
  const toggleBookmark = (id: string, name: string) => {
    const nextState = !bookmarkedItems[id];
    setBookmarkedItems(prev => ({ ...prev, [id]: nextState }));
    toast.success(nextState ? `Saved ${name} to Workspace` : `Removed ${name}`);
  };

    // SIP Calculator Math
  const sipMonths = sipYears * 12;
  const sipI = sipReturnRate / 12 / 100;
  const sipInvested = sipMonthly * sipMonths;
  const sipMaturity = Math.round(sipMonthly * ((Math.pow(1 + sipI, sipMonths) - 1) / sipI) * (1 + sipI));
  const sipGain = Math.max(0, sipMaturity - sipInvested);

  // Lumpsum Calculator Math
  const lumpsumInvested = lumpsumPrincipal;
  const lumpsumMaturity = Math.round(lumpsumPrincipal * Math.pow(1 + lumpsumReturnRate / 100, lumpsumYears));
  const lumpsumGain = Math.max(0, lumpsumMaturity - lumpsumInvested);

  // Goal Planner Math
  const inflationAdjustedTarget = Math.round(goalTarget * Math.pow(1 + goalInflation / 100, goalYears));
  const goalMonths = goalYears * 12;
  const goalMonthlyRate = goalReturnRate / 12 / 100;
  const goalRequiredMonthly = Math.round((inflationAdjustedTarget * goalMonthlyRate) / ((Math.pow(1 + goalMonthlyRate, goalMonths) - 1) * (1 + goalMonthlyRate)));

  // Tax Estimator Math (India Old vs New Tax Regime)
  const calculateOldTax = (income: number, deductions80C: number, otherDeductions: number) => {
    const taxable = Math.max(0, income - 50000 - Math.min(deductions80C, 150000) - otherDeductions);
    if (taxable <= 500000) return 0;

    let tax = 0;
    if (taxable > 250000) {
      if (taxable <= 500000) {
        tax += (taxable - 250000) * 0.05;
      } else {
        tax += 250000 * 0.05;
        if (taxable <= 1000000) {
          tax += (taxable - 500000) * 0.20;
        } else {
          tax += 500000 * 0.20;
          tax += (taxable - 1000000) * 0.30;
        }
      }
    }
    return Math.round(tax * 1.04);
  };

  const calculateNewTax = (income: any) => {
    const taxable = Math.max(0, income - 75000);
    if (taxable <= 700000) return 0;

    let tax = 0;
    if (taxable > 300000) {
      if (taxable <= 700000) {
        tax += (taxable - 300000) * 0.05;
      } else {
        tax += 400000 * 0.05;
        if (taxable <= 1000000) {
          tax += (taxable - 700000) * 0.10;
        } else {
          tax += 300000 * 0.10;
          if (taxable <= 1400000) {
            tax += (taxable - 1000000) * 0.15;
          } else {
            tax += 400000 * 0.15;
            if (taxable <= 1500000) {
              tax += (taxable - 1400000) * 0.20;
            } else {
              tax += 100000 * 0.20;
              tax += (taxable - 1500000) * 0.30;
            }
          }
        }
      }
    }
    return Math.round(tax * 1.04);
  };

  const oldTaxVal = calculateOldTax(taxIncome, taxDeductions80C, taxDeductionsOther);
  const newTaxVal = calculateNewTax(taxIncome);
  const taxSavings = Math.abs(oldTaxVal - newTaxVal);
  const recommendedRegime = oldTaxVal < newTaxVal ? 'Old Tax Regime' : 'New Tax Regime';

  // Categories Data
  const categoriesList = [
    { id: 'all', name: 'All Products', count: 'Explore All', icon: <Compass className="w-5 h-5 text-primary" /> },
    { id: 'stocks', name: 'Stocks', count: '12,500+ Companies', icon: <BarChart3 className="w-5 h-5 text-primary" /> },
    { id: 'funds', name: 'Mutual Funds', count: '1,500+ Funds', icon: <Wallet className="w-5 h-5 text-emerald-600" /> },
    { id: 'etf', name: 'ETFs', count: '320 Available', icon: <Layers className="w-5 h-5 text-primary" /> },
    { id: 'ipo', name: 'IPO', count: '4 Open Today', icon: <Rocket className="w-5 h-5 text-amber-600" /> },
    { id: 'gold', name: 'Gold', count: '₹7,240 / gram', icon: <Gem className="w-5 h-5 text-amber-500" /> },
    { id: 'commodities', name: 'Commodities', count: 'MCX Live', icon: <Fuel className="w-5 h-5 text-danger" /> },
    { id: 'bonds', name: 'FD & Bonds', count: '7.35% Yield', icon: <Landmark className="w-5 h-5 text-teal-600" /> },
    { id: 'nps', name: 'NPS', count: 'Tax Free', icon: <Shield className="w-5 h-5 text-primary" /> },
    { id: 'more', name: 'More', count: 'PMS & Smallcase', icon: <MoreHorizontal className="w-5 h-5 text-slate-500" /> }
  ];

  // Featured Opportunities
  const featuredOpportunities = [
    {
      id: 'f1',
      name: 'Reliance Industries Ltd',
      symbol: 'RELIANCE',
      category: 'Stocks',
      price: '₹3,024.50',
      change: '+1.45%',
      isPositive: true,
      aiBadge: '94% AI Confidence',
      risk: 'Low Risk',
      returnRange: '+14% Expected',
      logo: 'RL',
      desc: 'Consolidation breakout verified on daily frames. Hydrogen commissioning projected for late Q3.'
    },
    {
      id: 'f2',
      name: 'Parag Parikh Flexi Cap Fund',
      symbol: 'PPFCF',
      category: 'Mutual Funds',
      price: 'NAV: ₹74.85',
      change: '+24.8% 3Y CAGR',
      isPositive: true,
      aiBadge: '5★ Rated Fund',
      risk: 'Moderate Risk',
      returnRange: '24.8% Annual',
      logo: 'PP',
      desc: 'Diversified allocation across top Indian market leaders and international tech giants.'
    },
    {
      id: 'f3',
      name: 'Ola Electric Mobility IPO',
      symbol: 'OLA-IPO',
      category: 'IPO',
      price: '₹72 - ₹76',
      change: 'GMP +18%',
      isPositive: true,
      aiBadge: '4.2★ Rating',
      risk: 'Moderate Risk',
      returnRange: 'Listing Premium',
      logo: 'OE',
      desc: 'India’s largest EV 2-wheeler manufacturer opening for retail subscription bidding.'
    }
  ];

  // Trending Investments
  const trendingStocks = [
    { name: 'HDFC Bank Ltd', symbol: 'HDFCBANK', price: '₹1,682.40', change: '+0.85%', '1m': '+4.2%', risk: 'Low', logo: 'HD' },
    { name: 'Larsen & Toubro Ltd', symbol: 'LT', price: '₹3,456.90', change: '+1.05%', '1m': '+6.8%', risk: 'Low', logo: 'LT' },
    { name: 'Tata Consultancy Services', symbol: 'TCS', price: '₹4,185.10', change: '+0.82%', '1m': '+3.5%', risk: 'Low', logo: 'TC' }
  ];

  const trendingGold = [
    { name: 'Sovereign Gold Bonds (SGB Series III)', symbol: 'SGB-2026', price: '₹6,840 / g', change: '2.5% p.a. Interest', status: 'Tax Free at Exit', logo: 'GB' },
    { name: '24K Digital Gold Vault (99.9%)', symbol: 'DIGI-GOLD', price: '₹7,240 / g', change: 'Pure 24K Vault', status: 'Instant Liquidity', logo: 'DG' }
  ];

  // Curated Collections
  const collections = [
    { id: 'All', label: 'All Collections' },
    { id: 'Beginner', label: 'Beginner Friendly' },
    { id: 'LongTerm', label: 'Long Term Wealth' },
    { id: 'HighGrowth', label: 'High Growth' },
    { id: 'Dividend', label: 'Dividend Income' },
    { id: 'LowRisk', label: 'Low Risk' },
    { id: 'TaxSaving', label: 'Tax Saving (80C)' }
  ];

  // AI Personal Suggestions
  const aiRecommendations = [
    {
      title: 'HDFC Bank Accumulation Setup',
      reason: 'Institutional net accumulation near multi-month support bounds aligned with your conservative profile.',
      confidence: 96,
      horizon: '3 - 6 Months',
      risk: 'Low Risk',
      symbol: 'HDFCBANK',
      logo: 'HD'
    },
    {
      title: 'Parag Parikh Flexi Cap SIP',
      reason: 'Ideal for long-term equity growth with automated global technology exposure.',
      confidence: 94,
      horizon: '3+ Years',
      risk: 'Moderate Risk',
      symbol: 'PPFCF',
      logo: 'PP'
    }
  ];

  return (
    <div className="flex flex-col gap-8 w-full pb-16">
      
      {/* PAGE HEADER */}
      <div className="w-full pt-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#172033] mb-2">
            Invest
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Discover investment opportunities across multiple asset classes in one marketplace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-2xl text-xs font-black text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Market Status: LIVE</span>
          </div>

          <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 shadow-xs">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <span>Sort:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-transparent font-black text-[#172033] outline-none cursor-pointer"
            >
              <option>Popularity</option>
              <option>Highest Return</option>
              <option>Lowest Risk</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* 1. HERO MESH GRADIENT BANNER */}
      <section className="bg-[#172033] text-white rounded-[28px] p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute left-10 bottom-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#64748B]" />
              <span className="text-xs font-black text-[#64748B] uppercase tracking-wider">INVESTMENT MARKETPLACE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
              Good Morning. Ready to invest today?
            </h2>

            <p className="text-sm text-slate-300 font-medium leading-relaxed max-w-xl mb-6">
              Browse curated stocks, high-yield mutual funds, ETFs, open IPOs, and digital gold. Backed by quantitative AI screening and SEBI compliance.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setSelectedCategory('stocks')}
                className="bg-primary hover:bg-primary-dark text-white font-black px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2 text-sm"
              >
                Explore Opportunities <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  if (onTrade) onTrade(featuredOpportunities[0]);
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/20 transition text-sm flex items-center gap-2"
              >
                Start Investing
              </button>
            </div>
          </div>

          {/* Quick Metrics Overlay Widget */}
          <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-md flex flex-col gap-4">
            <span className="text-xs font-black uppercase text-[#64748B] tracking-wider">Market Intelligence Snapshot</span>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Market Mood</span>
                <span className="text-base font-black text-emerald-400 mt-0.5 block">Bullish</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">AI Setups</span>
                <span className="text-base font-black text-blue-300 mt-0.5 block">14 Available</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Open IPOs</span>
                <span className="text-base font-black text-amber-400 mt-0.5 block">4 Subscriptions</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <span className="text-slate-400 text-[10px] font-bold block uppercase">Gold Yield</span>
                <span className="text-base font-black text-white mt-0.5 block">2.5% + Capital</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INVESTMENT CATEGORIES (MINIMALIST COMPACT SMOOTH SLIDER) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-[#172033]">Browse Asset Classes</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">9 Categories</span>
          </div>

          {/* Smooth Scroll Navigation Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('left')}
              className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] text-slate-600 hover:text-primary hover:border-blue-300 flex items-center justify-center transition shadow-xs active:scale-95 cursor-pointer"
              title="Scroll Left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] text-slate-600 hover:text-primary hover:border-blue-300 flex items-center justify-center transition shadow-xs active:scale-95 cursor-pointer"
              title="Scroll Right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimalist Compact Horizontal Scroll Bar */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2.5 overflow-x-auto pb-2 scroll-smooth scrollbar-none no-scrollbar select-none"
        >
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all border shadow-xs cursor-pointer ${
                  isActive
                    ? 'bg-[#172033] text-white border-[#172033] shadow-md ring-2 ring-primary/20'
                    : 'bg-white text-[#172033] border-[#E2E8F0] hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <span className={`p-1 rounded-lg ${isActive ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  {cat.icon}
                </span>
                <span className="whitespace-nowrap">{cat.name}</span>
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md whitespace-nowrap ${
                    isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* 3. DYNAMIC ASSET CLASS TAB CONTENT */}
      <div className="w-full">
        {(selectedCategory === 'all' || selectedCategory === 'more' || selectedCategory === 'bonds' || selectedCategory === 'nps') && (
          <AllProductsTab
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSelectStock={(stk) => onSelectStock && onSelectStock(stk)}
            onTrade={(tr) => onTrade && onTrade(tr)}
          />
        )}
        {selectedCategory === 'stocks' && (
          <StocksTab
            onSelectStock={(stk) => onSelectStock && onSelectStock(stk)}
            onTrade={(tr) => onTrade && onTrade(tr)}
          />
        )}
        {selectedCategory === 'funds' && <MutualFundsTab />}
        {selectedCategory === 'etf' && (
          <ETFsTab onTrade={(etf) => onTrade && onTrade(etf)} />
        )}
        {selectedCategory === 'ipo' && <IPOsTab />}
        {selectedCategory === 'gold' && <GoldTab />}
        {selectedCategory === 'commodities' && (
          <CommoditiesTab onTrade={(comm) => onTrade && onTrade(comm)} />
        )}
      </div>

      {/* 5. CURATED COLLECTIONS */}
      <section className="flex flex-col gap-4">
        <h3 className="text-xl font-black text-[#172033]">Curated Investment Collections</h3>
        
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(col.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition shrink-0 ${
                activeCollection === col.id
                  ? 'bg-[#172033] text-white shadow-sm'
                  : 'bg-white border border-[#E2E8F0] text-slate-600 hover:bg-slate-50'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>
      </section>

      {/* 6. AI RECOMMENDATIONS ("RECOMMENDED FOR YOU") */}
      <section className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-black text-base">
            <Sparkles className="w-5 h-5 fill-primary" /> Recommended For You (AI Match)
          </div>
          <span className="text-[10px] font-bold text-slate-400">Based on Risk Profile & Portfolio</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiRecommendations.map((ai) => (
            <div key={ai.symbol} className="p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] flex flex-col justify-between gap-4">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-[#172033] text-base">{ai.title}</h4>
                  <span className="text-xs font-black text-primary bg-primary-light px-2.5 py-1 rounded-lg">
                    {ai.confidence}% Confidence
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                  {ai.reason}
                </p>
                <div className="flex gap-4 text-xs font-bold text-slate-400">
                  <span>Horizon: <strong className="text-[#172033]">{ai.horizon}</strong></span>
                  <span>Risk: <strong className="text-[#172033]">{ai.risk}</strong></span>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-200">
                <button
                  onClick={() => {
                    if (onSelectResearch) onSelectResearch(ai);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-[#E2E8F0] text-slate-700 font-bold text-xs hover:bg-white transition"
                >
                  Research
                </button>
                <button
                  onClick={() => {
                    if (onTrade) onTrade(ai);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition shadow-sm"
                >
                  Invest Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE INVESTMENT TOOLS */}
      <section className="flex flex-col gap-5">
        <h3 className="text-xl font-black text-[#172033]">Interactive Investment Tools</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { id: 'sip', title: 'SIP Calculator', desc: 'Calculate wealth gain over time' },
            { id: 'lumpsum', title: 'Lumpsum Return', desc: 'Single deposit growth tool' },
            { id: 'goal', title: 'Goal Planner', desc: 'Retirement & house targets' },
            { id: 'tax', title: 'Tax Estimator', desc: '80C & SGB tax savings' }
          ].map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveToolModal(tool.id)}
              className="bg-white rounded-[24px] border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition cursor-pointer group hover:border-blue-300 flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-[#172033] group-hover:text-primary transition mb-1">{tool.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium">{tool.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

            {/* INTERACTIVE INVESTMENT TOOLS MODALS */}
      {activeToolModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-6"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                <h3 className="font-black text-lg text-[#172033]">
                  {activeToolModal === 'sip' && 'SIP Wealth Calculator'}
                  {activeToolModal === 'lumpsum' && 'Lumpsum Return Calculator'}
                  {activeToolModal === 'goal' && 'AI Goal Planner'}
                  {activeToolModal === 'tax' && 'Tax Regime Estimator'}
                </h3>
              </div>
              <button onClick={() => setActiveToolModal(null)} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content - SIP */}
            {activeToolModal === 'sip' && (
              <div className="flex flex-col gap-5 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">Monthly SIP Amount</span>
                    <span className="font-black text-[#172033]">₹{sipMonthly.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">Investment Horizon</span>
                    <span className="font-black text-[#172033]">{sipYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">Expected Annual Return</span>
                    <span className="font-black text-emerald-600">{sipReturnRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={sipReturnRate}
                    onChange={(e) => setSipReturnRate(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="p-5 bg-[#172033] text-white rounded-2xl grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Invested</span>
                    <span className="text-base font-black">₹{sipInvested.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Est. Total Wealth</span>
                    <span className="text-xl font-black text-emerald-400">₹{sipMaturity.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content - LUMPSUM */}
            {activeToolModal === 'lumpsum' && (
              <div className="flex flex-col gap-5 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">One-Time Deposit</span>
                    <span className="font-black text-[#172033]">₹{lumpsumPrincipal.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="10000000"
                    step="5000"
                    value={lumpsumPrincipal}
                    onChange={(e) => setLumpsumPrincipal(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">Horizon</span>
                    <span className="font-black text-[#172033]">{lumpsumYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={lumpsumYears}
                    onChange={(e) => setLumpsumYears(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">Expected Annual Return</span>
                    <span className="font-black text-emerald-600">{lumpsumReturnRate}% p.a.</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    value={lumpsumReturnRate}
                    onChange={(e) => setLumpsumReturnRate(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="p-5 bg-[#172033] text-white rounded-2xl grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Invested</span>
                    <span className="text-base font-black">₹{lumpsumInvested.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Est. Total Wealth</span>
                    <span className="text-xl font-black text-emerald-400">₹{lumpsumMaturity.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content - GOAL PLANNER */}
            {activeToolModal === 'goal' && (
              <div className="flex flex-col gap-5 text-xs">
                <div>
                  <label className="font-black text-slate-400 uppercase block mb-1">Select Goal Type</label>
                  <select
                    value={goalType}
                    onChange={(e) => setGoalType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-black text-[#172033]"
                  >
                    <option value="retirement">Retirement Wealth Target</option>
                    <option value="house">Dream Home Purchase</option>
                    <option value="education">Children Higher Education</option>
                    <option value="car">Vehicle / Luxury Purchase</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">Target Value (Present Cost)</span>
                    <span className="font-black text-[#172033]">₹{goalTarget.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="50000000"
                    step="50000"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">Time Horizon</span>
                    <span className="font-black text-[#172033]">{goalYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={goalYears}
                    onChange={(e) => setGoalYears(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span className="text-slate-400">Expected Inflation</span>
                      <span className="font-black text-danger">{goalInflation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={goalInflation}
                      onChange={(e) => setGoalInflation(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span className="text-slate-400">Expected Return</span>
                      <span className="font-black text-emerald-600">{goalReturnRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      value={goalReturnRate}
                      onChange={(e) => setGoalReturnRate(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#172033] text-white rounded-2xl grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Inflation Adjusted Target</span>
                    <span className="text-sm font-black">₹{inflationAdjustedTarget.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Req. Monthly SIP</span>
                    <span className="text-base font-black text-emerald-400">₹{goalRequiredMonthly.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content - TAX ESTIMATOR */}
            {activeToolModal === 'tax' && (
              <div className="flex flex-col gap-4 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-slate-400">Annual Gross Salary (CTC)</span>
                    <span className="font-black text-[#172033]">₹{taxIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="50000"
                    value={taxIncome}
                    onChange={(e) => setTaxIncome(Number(e.target.value))}
                    className="w-full accent-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span className="text-slate-400">80C Deductions</span>
                      <span className="font-black text-[#172033]">₹{taxDeductions80C.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="5000"
                      value={taxDeductions80C}
                      onChange={(e) => setTaxDeductions80C(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span className="text-slate-400">Other Deductions (80D/HRA)</span>
                      <span className="font-black text-[#172033]">₹{taxDeductionsOther.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="5000"
                      value={taxDeductionsOther}
                      onChange={(e) => setTaxDeductionsOther(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Old Tax Regime</span>
                    <span className="text-sm font-black text-slate-900 mt-1 block">₹{oldTaxVal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">New Tax Regime</span>
                    <span className="text-sm font-black text-slate-900 mt-1 block">₹{newTaxVal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="p-4 bg-[#172033] text-white rounded-2xl flex flex-col gap-1 items-center text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Recommended Choice</span>
                  <span className="text-sm font-black text-emerald-400">{recommendedRegime}</span>
                  {taxSavings > 0 ? (
                    <span className="text-[10px] text-slate-300 font-medium">Saves you ₹{taxSavings.toLocaleString('en-IN')} in tax liability</span>
                  ) : (
                    <span className="text-[10px] text-slate-300 font-medium">Both regimes offer zero tax liability</span>
                  )}
                </div>
              </div>
            )}

            {/* Modal Footer / Action Button */}
            <button
              onClick={() => setActiveToolModal(null)}
              className="w-full py-3.5 rounded-xl bg-primary text-white font-black text-xs hover:bg-primary transition cursor-pointer"
            >
              {activeToolModal === 'sip' && 'Done & Explore SIP Mutual Funds'}
              {activeToolModal === 'lumpsum' && 'Done & Explore Lumpsum Mutual Funds'}
              {activeToolModal === 'goal' && 'Done & Explore Long-Term Baskets'}
              {activeToolModal === 'tax' && 'Done & Explore Tax Saving Mutual Funds'}
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default InvestHub;