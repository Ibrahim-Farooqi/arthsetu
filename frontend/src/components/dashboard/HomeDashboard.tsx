import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, ArrowUpRight, ArrowDownRight, ChevronRight, 
  ChevronLeft, SlidersHorizontal, Lock, Award, Star, MoreVertical, Edit2, Plus, Filter, Sparkles, Activity
} from 'lucide-react';
import toast from 'react-hot-toast';
import marketService from '../../services/market.service';

interface HomeDashboardProps {
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onNavigateTab?: (tab: string) => void;
  onInvestViaBroker?: (stock: any) => void;
  onOpenPricing?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onSelectStock,
  onNavigateTab,
  onOpenPricing
}) => {
  const [activeExchange, setActiveExchange] = useState<'NSE' | 'BSE'>('NSE');
  const [activeMoverCategory, setActiveMoverCategory] = useState<string>('Top Gainers');
  const [activeWatchlistTab, setActiveWatchlistTab] = useState<string>('Default');

  const [liveIndices, setLiveIndices] = useState<any[]>([]);
  const [liveStocks, setLiveStocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const secondaryIndicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMarketData = async () => {
      try {
        const [indicesData, stocksData] = await Promise.all([
          marketService.getIndices(),
          marketService.getStocks(),
        ]);
        if (isMounted) {
          if (indicesData && indicesData.length > 0) {
            setLiveIndices(indicesData);
          }
          if (stocksData && stocksData.length > 0) {
            setLiveStocks(stocksData);
          }
          setIsLoading(false);
        }
      } catch (e) {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 20000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const scrollSecondaryIndices = (direction: 'left' | 'right') => {
    if (secondaryIndicesRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      secondaryIndicesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Primary 3 indices from live data or 0s fallback
  const mapIndex = (symbol: string, defaultName: string) => {
    const found = liveIndices.find((i: any) => i.symbol === symbol || i.name?.includes(defaultName));
    if (found) {
      return {
        name: found.name || defaultName,
        value: found.lastPrice || 0,
        change: found.change || 0,
        changePercent: found.changePercent || 0,
        isPositive: (found.changePercent || 0) >= 0,
        symbol: found.symbol
      };
    }
    return { name: defaultName, value: 0, change: 0, changePercent: 0, isPositive: true, symbol: '' };
  };

  const niftyIndex = mapIndex('NIFTY', 'NIFTY 50');
  const sensexIndex = mapIndex('SENSEX', 'SENSEX');
  const bankNiftyIndex = mapIndex('BANKNIFTY', 'BANK NIFTY');

  // Secondary indices from liveIndices or empty
  const secondaryIndices = liveIndices.length > 3 ? liveIndices.slice(3).map((idx: any) => ({
    name: idx.name || idx.symbol,
    exchange: 'NSE',
    value: idx.lastPrice ? idx.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0',
    changePercent: idx.changePercent || 0,
    changePoint: idx.change > 0 ? `+${idx.change}` : `${idx.change}`,
    isPositive: (idx.changePercent || 0) >= 0
  })) : [];

  const colors = [
    'bg-emerald-100 text-emerald-800',
    'bg-purple-100 text-purple-800',
    'bg-sky-100 text-sky-800',
    'bg-pink-100 text-pink-800',
    'bg-rose-100 text-rose-800',
    'bg-[#E0F2FE] text-[#15519D]',
  ];

  // Dynamic movers calculated from live stocks
  const sortedGainers = [...liveStocks].sort((a, b) => b.changePercent - a.changePercent);
  const sortedLosers = [...liveStocks].sort((a, b) => a.changePercent - b.changePercent);

  const moversMap: Record<string, any[]> = {
    'Top Gainers': sortedGainers.slice(0, 6).map((s, idx) => ({
      symbol: s.symbol,
      name: s.companyName,
      price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      changePercent: s.changePercent,
      isPositive: s.changePercent >= 0,
      badgeBg: colors[idx % colors.length],
    })),
    'Top Losers': sortedLosers.slice(0, 6).map((s, idx) => ({
      symbol: s.symbol,
      name: s.companyName,
      price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      changePercent: s.changePercent,
      isPositive: s.changePercent >= 0,
      badgeBg: 'bg-rose-100 text-rose-800',
    })),
    'All-Time High': sortedGainers.slice(0, 6).map((s, idx) => ({
      symbol: s.symbol,
      name: s.companyName,
      price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      changePercent: s.changePercent,
      isPositive: s.changePercent >= 0,
      badgeBg: colors[idx % colors.length],
    })),
    '52-Week High': sortedGainers.slice(0, 5).map((s, idx) => ({
      symbol: s.symbol,
      name: s.companyName,
      price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      changePercent: s.changePercent,
      isPositive: s.changePercent >= 0,
      badgeBg: colors[idx % colors.length],
    })),
    '52-Week Low': sortedLosers.slice(0, 5).map((s, idx) => ({
      symbol: s.symbol,
      name: s.companyName,
      price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      changePercent: s.changePercent,
      isPositive: s.changePercent >= 0,
      badgeBg: 'bg-rose-100 text-rose-800',
    })),
    'Most Active': sortedGainers.slice(0, 6).map((s, idx) => ({
      symbol: s.symbol,
      name: s.companyName,
      price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      changePercent: s.changePercent,
      isPositive: s.changePercent >= 0,
      badgeBg: colors[idx % colors.length],
    })),
  };

  const currentMovers = moversMap[activeMoverCategory] || moversMap['Top Gainers'] || [];

  const centerWatchlist = liveStocks.slice(0, 8).map((s, idx) => ({
    symbol: s.symbol,
    name: s.companyName,
    price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
    changePercent: s.changePercent,
    isPositive: s.changePercent >= 0,
    mcap: s.lastPrice > 2000 ? '₹15.2 L Cr' : (s.lastPrice > 1000 ? '₹8.4 L Cr' : '₹2.1 L Cr'),
    badgeBg: colors[idx % colors.length],
  }));

  return (
    <div className="space-y-6 pb-12 font-sans text-[#172033]">
      
      {/* 1. PREMIUM 2-ROW MARKET INDICES CONTAINER */}
      <div className="bg-white p-6 md:p-7 rounded-[28px] border border-[#E2E8F0] shadow-2xs space-y-6">
        
        {/* ROW 1 — PRIMARY MARKET INDICES */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          
          {/* Left: Exchange Selector & Market Status */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Segmented Exchange Control */}
            <div className="p-1 bg-slate-100 rounded-xl border border-slate-200/80 flex items-center gap-1">
              <button
                onClick={() => setActiveExchange('NSE')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeExchange === 'NSE'
                    ? 'bg-white text-[#15519D] shadow-xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeExchange === 'NSE' ? 'bg-[#15519D]' : 'bg-transparent border border-slate-400'}`} />
                <span>NSE</span>
              </button>

              <button
                onClick={() => setActiveExchange('BSE')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeExchange === 'BSE'
                    ? 'bg-white text-[#15519D] shadow-xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeExchange === 'BSE' ? 'bg-[#15519D]' : 'bg-transparent border border-slate-400'}`} />
                <span>BSE</span>
              </button>
            </div>

            {/* Market Status */}
            <div className="flex flex-col border-l border-slate-200 pl-4">
              {(() => {
                const now = new Date();
                const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
                const day = ist.getDay();
                const h = ist.getHours();
                const m = ist.getMinutes();
                const totalMins = h * 60 + m;
                const timeStr = ist.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();
                let status = 'closed', label = 'Market Closed', dotClass = 'bg-slate-400', pingClass = '';
                if (day !== 0 && day !== 6) {
                  if (totalMins >= 540 && totalMins < 555) { status = 'preopen'; label = 'Pre-Open'; dotClass = 'bg-amber-500'; pingClass = 'animate-ping'; }
                  else if (totalMins >= 555 && totalMins < 930) { status = 'open'; label = 'Market Open'; dotClass = 'bg-emerald-500'; pingClass = 'animate-ping'; }
                  else if (totalMins >= 930 && totalMins < 1080) { status = 'afterhours'; label = 'After Hours'; dotClass = 'bg-blue-400'; pingClass = ''; }
                }
                const textColor = status === 'open' ? 'text-emerald-700' : status === 'preopen' ? 'text-amber-700' : status === 'afterhours' ? 'text-blue-700' : 'text-slate-500';
                return (
                  <>
                    <div className={`flex items-center gap-1.5 font-extrabold text-xs ${textColor}`}>
                      <span className={`w-2 h-2 rounded-full ${dotClass} ${pingClass}`} />
                      <span>{label}</span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">{timeStr} IST</span>
                  </>
                );
              })()}
            </div>

            <div className="h-8 w-px bg-slate-200 hidden lg:block" />
          </div>

          {/* Primary Indices Layout (NIFTY 50, SENSEX, BANK NIFTY) */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            
            {/* NIFTY 50 */}
            <div 
              onClick={() => onSelectStock && onSelectStock({ symbol: niftyIndex.symbol, name: niftyIndex.name, price: niftyIndex.value.toLocaleString('en-IN') })}
              className="flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="space-y-0.5">
                <div className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">{niftyIndex.name}</div>
                <div className="text-xl font-black text-slate-900 font-mono tracking-tight group-hover:text-[#15519D] transition-colors">
                  {niftyIndex.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className={`font-extrabold ${niftyIndex.changePercent >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {niftyIndex.changePercent >= 0 ? `↑ +${niftyIndex.changePercent}%` : `↓ ${niftyIndex.changePercent}%`}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {niftyIndex.change >= 0 ? `+${niftyIndex.change}` : niftyIndex.change}
                  </span>
                </div>
              </div>

              {/* Sparkline Aligned Right */}
              <svg className="w-16 h-8 overflow-visible shrink-0" viewBox="0 0 50 20">
                <polyline fill="none" stroke={niftyIndex.changePercent >= 0 ? "#16A34A" : "#DC2626"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" points={niftyIndex.changePercent >= 0 ? "0,16 12,13 25,14 38,7 50,3" : "0,3 12,7 25,8 38,14 50,18"} />
              </svg>
            </div>

            {/* SENSEX */}
            <div 
              onClick={() => onSelectStock && onSelectStock({ symbol: sensexIndex.symbol, name: sensexIndex.name, price: sensexIndex.value.toLocaleString('en-IN') })}
              className="flex items-center justify-between gap-3 cursor-pointer group sm:border-l sm:border-slate-200 sm:pl-6"
            >
              <div className="space-y-0.5">
                <div className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">{sensexIndex.name}</div>
                <div className="text-xl font-black text-slate-900 font-mono tracking-tight group-hover:text-[#15519D] transition-colors">
                  {sensexIndex.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className={`font-extrabold ${sensexIndex.changePercent >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {sensexIndex.changePercent >= 0 ? `↑ +${sensexIndex.changePercent}%` : `↓ ${sensexIndex.changePercent}%`}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {sensexIndex.change >= 0 ? `+${sensexIndex.change}` : sensexIndex.change}
                  </span>
                </div>
              </div>

              {/* Sparkline Aligned Right */}
              <svg className="w-16 h-8 overflow-visible shrink-0" viewBox="0 0 50 20">
                <polyline fill="none" stroke={sensexIndex.changePercent >= 0 ? "#16A34A" : "#DC2626"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" points={sensexIndex.changePercent >= 0 ? "0,17 12,14 25,12 38,8 50,4" : "0,4 12,8 25,12 38,14 50,17"} />
              </svg>
            </div>

            {/* BANK NIFTY */}
            <div 
              onClick={() => onSelectStock && onSelectStock({ symbol: bankNiftyIndex.symbol, name: bankNiftyIndex.name, price: bankNiftyIndex.value.toLocaleString('en-IN') })}
              className="flex items-center justify-between gap-3 cursor-pointer group sm:border-l sm:border-slate-200 sm:pl-6"
            >
              <div className="space-y-0.5">
                <div className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">{bankNiftyIndex.name}</div>
                <div className="text-xl font-black text-slate-900 font-mono tracking-tight group-hover:text-[#15519D] transition-colors">
                  {bankNiftyIndex.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span className={`font-extrabold ${bankNiftyIndex.changePercent >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {bankNiftyIndex.changePercent >= 0 ? `↑ +${bankNiftyIndex.changePercent}%` : `↓ ${bankNiftyIndex.changePercent}%`}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {bankNiftyIndex.change >= 0 ? `+${bankNiftyIndex.change}` : bankNiftyIndex.change}
                  </span>
                </div>
              </div>

              {/* Sparkline Aligned Right */}
              <svg className="w-16 h-8 overflow-visible shrink-0" viewBox="0 0 50 20">
                <polyline fill="none" stroke={bankNiftyIndex.changePercent >= 0 ? "#16A34A" : "#DC2626"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" points={bankNiftyIndex.changePercent >= 0 ? "0,16 12,13 25,10 38,6 50,2" : "0,2 12,6 25,10 38,13 50,16"} />
              </svg>
            </div>


          </div>
        </div>

        {/* ROW 2 — EXPLORE MORE INDICES */}
        <div className="border-t border-slate-100 pt-5 space-y-4">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#15519D]" />
              <span>Explore More Indices</span>
            </h3>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateTab && onNavigateTab('Markets')}
                className="text-xs font-extrabold text-[#15519D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>All Indices</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Circular Left & Right Scroll Arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => scrollSecondaryIndices('left')}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollSecondaryIndices('right')}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Continuous Single Horizontal Line Scroll Row */}
          <div 
            ref={secondaryIndicesRef}
            className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-2 pt-1 snap-x scroll-smooth"
          >
            {secondaryIndices.map((idx, index) => (
              <div
                key={idx.name}
                onClick={() => onSelectStock && onSelectStock({ symbol: idx.name, name: `${idx.name} Index`, price: idx.value })}
                className={`shrink-0 snap-start flex items-center gap-4 cursor-pointer group pr-6 ${
                  index !== secondaryIndices.length - 1 ? 'border-r border-slate-200' : ''
                }`}
              >
                <div className="space-y-0.5 min-w-[140px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black text-slate-900 truncate group-hover:text-[#15519D] transition-colors">{idx.name}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{idx.exchange}</span>
                  </div>

                  <div className="text-sm font-black text-slate-900 font-mono">{idx.value}</div>

                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span className={idx.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}>
                      {idx.isPositive ? `↑ +${idx.changePercent}%` : `↓ ${idx.changePercent}%`}
                    </span>
                    <span className="text-slate-400 font-medium">{idx.changePoint}</span>
                  </div>
                </div>

                {/* Compact Sparkline */}
                <svg className="w-12 h-6 overflow-visible shrink-0" viewBox="0 0 40 16">
                  <polyline
                    fill="none"
                    stroke={idx.isPositive ? '#16A34A' : '#DC2626'}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    points={idx.isPositive ? "0,14 13,11 26,12 40,4" : "0,4 13,7 26,6 40,14"}
                  />
                </svg>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 2. TRUST STRIP */}
      <div className="px-5 py-3 bg-[#EBF3FC] border border-[#B3D4F5] rounded-[16px] flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
        <div className="flex items-center gap-2 text-[#15519D]">
          <ShieldCheck className="w-4.5 h-4.5 text-[#15519D] shrink-0" />
          <span className="font-extrabold">Trusted by Thousands of Investors</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-700 font-medium">
            1,240 research calls tracked · <strong className="text-slate-900 font-extrabold">71% positive</strong> at 6 months, avg <strong className="text-emerald-700 font-extrabold">+18.4%</strong> gain
          </span>
        </div>
        <button
          onClick={() => onNavigateTab && onNavigateTab('Research')}
          className="text-[#15519D] font-extrabold hover:underline flex items-center gap-1 shrink-0"
        >
          <span>Track Record Since Jan 2022</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. TODAY'S MARKET BRIEF */}
      <div className="p-6 bg-white rounded-[24px] border border-[#E2E8F0] shadow-2xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#15519D]" />
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Today's Market Brief</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Editorial Narrative Left */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Markets opened higher following positive global cues and strong buying in banking & IT stocks. Midcaps are outperforming while PSU banks see profit booking.
            </p>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Stay selective. Focus on quality and earnings visibility.
            </p>
          </div>

          {/* 4 Tinted Micro-Cards Right */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Card 1: Market Mood */}
            <div className="p-3.5 bg-emerald-50/80 rounded-[16px] border border-emerald-200/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black">
                😊
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Market Mood</div>
                <div className="text-sm font-black text-emerald-800 mt-0.5">Positive</div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">Rising for 3rd day</div>
              </div>
            </div>

            {/* Card 2: Sector In Focus */}
            <div className="p-3.5 bg-blue-50/80 rounded-[16px] border border-blue-200/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                🛍️
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Sector In Focus</div>
                <div className="text-sm font-black text-[#15519D] mt-0.5">IT Services</div>
                <div className="text-[11px] text-blue-700 font-bold mt-0.5">+1.93% today</div>
              </div>
            </div>

            {/* Card 3: Opportunity To Watch */}
            <div className="p-3.5 bg-amber-50/80 rounded-[16px] border border-amber-200/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
                ⭐
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Opportunity To Watch</div>
                <div className="text-sm font-black text-amber-900 mt-0.5">Capital Goods</div>
                <div className="text-[11px] text-amber-800 font-medium mt-0.5">Strong order book</div>
              </div>
            </div>

            {/* Card 4: Important Risk */}
            <div className="p-3.5 bg-rose-50/80 rounded-[16px] border border-rose-200/80 space-y-2">
              <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black">
                🛡️
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Important Risk</div>
                <div className="text-sm font-black text-rose-800 mt-0.5">Rising Crude Oil</div>
                <div className="text-[11px] text-rose-700 font-medium mt-0.5">Watch inflation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MARKET MOVERS */}
      <div className="p-6 bg-white rounded-[24px] border border-[#E2E8F0] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Market Movers</h2>
          <button
            onClick={() => onNavigateTab && onNavigateTab('Markets')}
            className="text-xs font-extrabold text-[#15519D] hover:underline flex items-center gap-1 self-end sm:self-auto"
          >
            <span>View all in Markets</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {['All-Time High', '52-Week High', '52-Week Low', 'Top Gainers', 'Top Losers', 'Most Active'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveMoverCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all whitespace-nowrap ${
                activeMoverCategory === cat
                  ? 'bg-[#15519D] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Cards Row */}
        <div className="flex items-center gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x pt-1">
          {currentMovers.map((stk) => (
            <div
              key={stk.symbol}
              onClick={() => onSelectStock && onSelectStock({ symbol: stk.symbol, name: stk.name, price: stk.price })}
              className="w-[175px] shrink-0 snap-start p-4 bg-white hover:bg-slate-50/90 rounded-[16px] border border-[#E2E8F0] hover:border-blue-300 transition-all cursor-pointer space-y-3 shadow-2xs group"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${stk.badgeBg}`}>
                  {stk.symbol.substring(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-slate-900 text-xs truncate group-hover:text-[#15519D] transition-colors">{stk.symbol}</div>
                  <div className="text-[10px] text-slate-400 font-bold truncate">₹{stk.price}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`text-xs font-black ${stk.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                  {stk.isPositive ? `+${stk.changePercent}%` : `${stk.changePercent}%`}
                </span>

                <svg className="w-12 h-5 overflow-visible" viewBox="0 0 35 15">
                  <polyline
                    fill="none"
                    stroke={stk.isPositive ? '#16A34A' : '#DC2626'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    points={stk.isPositive ? "0,13 12,10 24,11 35,3" : "0,3 12,7 24,6 35,13"}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. MAIN CENTER WATCHLIST TABLE */}
      <div className="p-6 bg-white rounded-[24px] border border-[#E2E8F0] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">My Watchlists</h2>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs">
              {['Default', 'Long Term', 'Tech', 'High Growth Defense'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveWatchlistTab(tab)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    activeWatchlistTab === tab
                      ? 'bg-[#15519D] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-slate-400">
            <button className="p-1.5 hover:text-slate-700" title="Edit Watchlist"><Edit2 className="w-4 h-4" /></button>
            <button className="p-1.5 hover:text-slate-700" title="Add Stock"><Plus className="w-4 h-4" /></button>
            <button className="p-1.5 hover:text-slate-700" title="More Options"><MoreVertical className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Watchlist Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-2.5 px-3">Stock</th>
                <th className="py-2.5 px-3">Price</th>
                <th className="py-2.5 px-3">Change</th>
                <th className="py-2.5 px-3">1D Chart</th>
                <th className="py-2.5 px-3">Market Cap</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {centerWatchlist.map((row) => (
                <tr
                  key={row.symbol}
                  onClick={() => onSelectStock && onSelectStock({ symbol: row.symbol, name: row.name, price: row.price })}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${row.badgeBg}`}>
                        {row.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-xs group-hover:text-[#15519D] transition-colors">{row.symbol}</div>
                        <div className="text-[11px] text-slate-400 truncate">{row.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-extrabold text-slate-900 font-mono text-xs">₹{row.price}</td>
                  <td className={`py-3 px-3 font-extrabold text-xs ${row.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {row.isPositive ? `+${row.changePercent}%` : `${row.changePercent}%`}
                  </td>
                  <td className="py-3 px-3">
                    <svg className="w-16 h-5 overflow-visible" viewBox="0 0 40 15">
                      <polyline
                        fill="none"
                        stroke={row.isPositive ? '#16A34A' : '#DC2626'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        points={row.isPositive ? "0,12 10,9 20,10 40,3" : "0,3 10,7 20,6 40,12"}
                      />
                    </svg>
                  </td>
                  <td className="py-3 px-3 text-slate-600 font-bold">{row.mcap}</td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <Star className="w-4 h-4 hover:text-amber-400 fill-transparent transition-colors" />
                      <MoreVertical className="w-4 h-4 hover:text-slate-700" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => onNavigateTab && onNavigateTab('Markets')}
            className="text-xs font-extrabold text-[#15519D] hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            <span>View all watchlists</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6. BOTTOM PROMOTIONAL SECTION (DUAL CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ARTHSETU SCREENER CARD */}
        <div 
          onClick={() => onNavigateTab && onNavigateTab('Markets')}
          className="p-7 bg-gradient-to-br from-[#1E293B] via-[#1E1B4B] to-[#312E81] text-white rounded-[24px] border border-indigo-900/50 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group cursor-pointer"
        >
          <div className="space-y-3 z-10">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-indigo-400" />
              <span className="font-extrabold text-base tracking-tight text-white">ArthSetu Screener</span>
            </div>

            <h3 className="text-2xl font-black text-white leading-tight">
              Filter. Discover. Invest.
            </h3>

            <p className="text-xs text-indigo-200 font-medium leading-relaxed max-w-sm">
              Screen over 2,400+ NSE stocks based on your strategy, valuation metrics, and sector rotation.
            </p>
          </div>

          <div className="pt-4 z-10">
            <button className="px-5 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2">
              <span>Go to Screener</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Background Vector Graphic */}
          <div className="absolute right-[-10px] bottom-[-20px] opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity">
            <Filter className="w-56 h-56 text-indigo-300" />
          </div>
        </div>

        {/* PRO OPPORTUNITY PREVIEW CARD */}
        <div className="p-7 bg-[#123B63] text-white rounded-[24px] border border-slate-700 shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-black text-lg text-white">Pro Opportunity Preview</h3>
            <span className="px-2.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-md">
              PRO
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left Metrics */}
            <div className="space-y-3 text-xs font-medium text-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Category</span>
                <span className="font-bold text-white">High Growth</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Pitch</span>
                <span className="font-bold text-white">Strong earnings momentum with sector tailwinds</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Risk Level</span>
                <span className="font-bold text-amber-400 flex items-center gap-1">● Moderate</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Investment Horizon</span>
                <span className="font-bold text-white">12 – 18 Months</span>
              </div>

              <div className="pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Potential Return</span>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-black text-xs inline-block mt-1">
                  +24% to +35%
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Track Record</span>
                <span className="font-bold text-emerald-400">72% Positive ℹ️</span>
              </div>
            </div>

            {/* Right Locked Research Area */}
            <div className="bg-slate-900/60 backdrop-blur-xs p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                Complete research available for Premium members
              </p>
              <button
                onClick={() => onOpenPricing ? onOpenPricing() : onNavigateTab && onNavigateTab('Pro')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View research</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HomeDashboard;
