import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Compass, TrendingUp, Newspaper, Briefcase, Gem, 
  Search, Sparkles, Bell, ChevronDown, ArrowRight, Plus, 
  Settings, MoreVertical, Star, ChevronRight, User, ShieldCheck, FlaskConical,
  PanelRightClose, PanelRightOpen
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

import LiveStockTicker from '../components/dashboard/LiveStockTicker';
import HomeDashboard from '../components/dashboard/HomeDashboard';
import MarketsCenter from '../components/dashboard/MarketsCenter';
import ResearchCenter from '../components/dashboard/ResearchCenter';
import NewsCenter from '../components/dashboard/NewsCenter';
import PortfolioDashboard from '../components/portfolio/PortfolioDashboard';
import ProCenter from '../components/dashboard/ProCenter';

import { StockDetail } from '../components/dashboard/StockDetail';
import { ResearchDetail } from '../components/dashboard/ResearchDetail';
import { UniversalSearch } from '../components/dashboard/UniversalSearch';
import { UserMenuDropdown } from '../components/dashboard/UserMenuDropdown';
import { PremiumPricingModal } from '../components/dashboard/PremiumPricingModal';
import { AiCopilotModal } from '../components/ai/AiCopilotModal';
import marketService from '../services/market.service';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('Home');
  const [selectedStock, setSelectedStock] = useState<any | null>(null);
  const [selectedResearch, setSelectedResearch] = useState<any | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(true);
  const [liveWatchlist, setLiveWatchlist] = useState<any[]>([]);

  React.useEffect(() => {
    let isMounted = true;
    const loadWatchlist = async () => {
      try {
        const stocks = await marketService.getStocks();
        if (stocks && stocks.length > 0 && isMounted) {
          const colors = [
            'bg-emerald-100 text-emerald-800',
            'bg-purple-100 text-purple-800',
            'bg-sky-100 text-sky-800',
            'bg-pink-100 text-pink-800',
            'bg-rose-100 text-rose-800',
            'bg-[#E0F2FE] text-[#15519D]',
            'bg-amber-100 text-amber-800',
          ];
          const mapped = stocks.slice(0, 10).map((st, idx) => ({
            symbol: st.symbol,
            name: st.companyName,
            price: st.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            changePercent: st.changePercent,
            isPositive: st.changePercent >= 0,
            badgeBg: colors[idx % colors.length],
          }));
          setLiveWatchlist(mapped);
        }
      } catch (e) {}
    };
    loadWatchlist();
    const interval = setInterval(loadWatchlist, 20000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const todayFormatted = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  const navTabs = [
    { name: 'Home', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { name: 'Markets', icon: <Compass className="w-5 h-5" />, label: 'Markets' },
    { name: 'Research', icon: <TrendingUp className="w-5 h-5" />, label: 'Research' },
    { name: 'News', icon: <Newspaper className="w-5 h-5" />, label: 'News' },
    { name: 'Portfolio', icon: <FlaskConical className="w-5 h-5" />, label: 'Investment Lab' },
    { name: 'Pro', icon: <Gem className="w-5 h-5" />, label: 'Pro Arth' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#172033] flex flex-col">
      
      {/* 1. MOVING LIVE STOCK TICKER STRIP FIXED AT VERY TOP */}
      <div className="sticky top-0 z-50">
        <LiveStockTicker onSelectStock={(symbol) => setSelectedStock({ symbol })} />
      </div>

      <div className="flex-1 flex w-full relative">
        
        {/* 2. LEFT SIDEBAR — PERMANENTLY FIXED ON SCREEN (240px Width) */}
        <aside className="fixed top-[28px] left-0 bottom-0 w-[240px] bg-white border-r border-[#E2E8F0] hidden lg:flex flex-col z-30 shadow-2xs justify-between overflow-y-auto scrollbar-none">
          <div>
            {/* Brand Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col gap-0.5 cursor-pointer" onClick={() => setActiveTab('Home')}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#15519D] to-[#123B63] text-white font-black text-xl flex items-center justify-center shadow-md">
                  A
                </div>
                <span className="font-black text-xl tracking-tight text-[#172033]">ARTHSETU</span>
              </div>
              <span className="text-[10px] font-extrabold text-[#64748B] tracking-tight mt-1">
                Investment Intelligence. Made Clear.
              </span>
            </div>

            {/* Nav Items */}
            <nav className="p-4 space-y-1.5">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.name;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-extrabold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#15519D] text-white shadow-md shadow-blue-900/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span className="shrink-0">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Upgrade & Profile Area */}
          <div className="p-4 space-y-4 border-t border-slate-100 bg-white">
            {/* Upgrade to Pro Banner */}
            <div className="p-4 bg-gradient-to-br from-amber-500/10 via-amber-50 to-blue-50 rounded-2xl border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                <Gem className="w-4 h-4 text-amber-600 fill-current" />
                <span>Upgrade to Pro</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium leading-tight">
                Unlock expert research, stock scores, pro picks & more.
              </p>
              <button
                onClick={() => setIsPricingOpen(true)}
                className="w-full py-2 bg-[#15519D] hover:bg-[#123B63] text-white text-xs font-extrabold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <span>Go Pro</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* User Profile Chip */}
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#15519D] text-white font-black text-xs flex items-center justify-center uppercase">
                  {user?.full_name ? user.full_name.substring(0, 2) : 'ME'}
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 truncate max-w-[120px]">{user?.full_name || 'My Account'}</div>
                  <div className="text-[10px] font-bold text-emerald-600">Free Plan</div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </aside>

        {/* 3. MAIN CENTER & RIGHT WATCHLIST WRAPPER (PADDED FOR FIXED NAV BAR) */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-[240px]">
          
          {/* GLOBAL TOP HEADER STICKY BELOW TICKER */}
          <header className="h-14 bg-white border-b border-[#E2E8F0] sticky top-[28px] z-40 px-4 sm:px-6 flex items-center justify-between shadow-2xs gap-4">
            {/* Left Date & Market Open Indicator */}
            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500 shrink-0">
              <span className="font-extrabold text-slate-900 text-xs whitespace-nowrap">{todayFormatted}</span>
              <span className="inline-flex items-center gap-1 font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-200/60 whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Market Open
              </span>
              <span className="text-slate-400 font-bold text-[10px] whitespace-nowrap hidden xl:inline">• NSE</span>
              <span className="text-slate-400 font-bold text-[10px] whitespace-nowrap hidden xl:inline">• BSE</span>
            </div>

            {/* Center Universal Search Bar */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 px-3.5 py-1.5 bg-slate-100/90 hover:bg-slate-200/70 rounded-xl text-xs font-medium text-slate-500 w-44 sm:w-60 md:w-80 lg:w-96 transition-all border border-slate-200/80 shadow-2xs group"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
              <span className="truncate whitespace-nowrap">Search stocks, sectors...</span>
            </button>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsWatchlistOpen(!isWatchlistOpen)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
                  isWatchlistOpen
                    ? 'bg-blue-50 border-blue-200 text-[#15519D]'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title={isWatchlistOpen ? "Minimize Watchlist" : "Open Watchlist"}
              >
                {isWatchlistOpen ? <PanelRightClose className="w-3.5 h-3.5 shrink-0" /> : <PanelRightOpen className="w-3.5 h-3.5 text-[#15519D] shrink-0" />}
                <span className="whitespace-nowrap font-extrabold text-xs">Watchlist</span>
              </button>

              <button
                onClick={() => setIsAiOpen(true)}
                className="px-3.5 py-1.5 bg-[#15519D] hover:bg-[#123B63] text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="whitespace-nowrap font-extrabold text-xs">AI Copilot</span>
              </button>

              <button className="relative p-2 rounded-xl border border-slate-200/80 text-slate-600 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer shrink-0">
                <Bell className="w-4 h-4 text-slate-700" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              </button>

              <div className="relative shrink-0">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 p-1 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer border border-slate-200/60 shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#15519D] text-white text-[11px] font-black flex items-center justify-center shadow-xs uppercase">
                    {user?.full_name ? user.full_name.substring(0, 2) : 'ME'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 pr-0.5" />
                </button>

                <UserMenuDropdown
                  isOpen={isUserMenuOpen}
                  onClose={() => setIsUserMenuOpen(false)}
                  onNavigateTab={(tb) => setActiveTab(tb)}
                  onOpenWorkspace={() => {}}
                  onAddFunds={() => setIsPricingOpen(true)}
                  isAuthenticated={isAuthenticated}
                  user={user}
                  onLogout={logout}
                />
              </div>
            </div>
          </header>

          {/* MAIN WORKSPACE GRID: CENTER CONTENT + RIGHT WATCHLIST PANEL */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-0 relative">
            
            {/* CENTER PRIMARY VIEW AREA (EXPANDS TO 12 COLS WHEN WATCHLIST MINIMIZED) */}
            <main className={`${isWatchlistOpen ? 'xl:col-span-8 2xl:col-span-9' : 'xl:col-span-12 2xl:col-span-12 max-w-full'} p-6 max-w-[1400px] w-full mx-auto transition-all duration-300`}>
              {children ? (
                children
              ) : (
                <>
                  {activeTab === 'Home' && (
                    <HomeDashboard
                      onSelectStock={(st) => setSelectedStock(st)}
                      onSelectResearch={(res) => setSelectedResearch(res)}
                      onNavigateTab={(tb) => setActiveTab(tb)}
                      onOpenPricing={() => setIsPricingOpen(true)}
                    />
                  )}

                  {activeTab === 'Markets' && (
                    <MarketsCenter
                      onSelectStock={(st) => setSelectedStock(st)}
                    />
                  )}

                  {activeTab === 'Research' && (
                    <ResearchCenter
                      onSelectStock={(st) => setSelectedStock(st)}
                    />
                  )}

                  {activeTab === 'News' && (
                    <NewsCenter
                      onSelectStock={(st) => setSelectedStock(st)}
                    />
                  )}

                  {activeTab === 'Portfolio' && (
                    <PortfolioDashboard
                      onSelectStock={(st) => setSelectedStock(st)}
                    />
                  )}

                  {activeTab === 'Pro' && (
                    <ProCenter
                      onSelectStock={(st) => setSelectedStock(st)}
                      onOpenPricingModal={() => setIsPricingOpen(true)}
                    />
                  )}
                </>
              )}
            </main>

            {/* RIGHT SIDEBAR — PERSISTENT WATCHLIST PANEL (3-4 COLS ON DESKTOP) */}
            {isWatchlistOpen ? (
              <aside className="xl:col-span-4 2xl:col-span-3 bg-white border-l border-[#E2E8F0] p-6 space-y-6 hidden xl:block shrink-0 shadow-2xs sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto scrollbar-none transition-all duration-300">
                
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-slate-900 text-base">My Watchlists</h3>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#15519D] text-[10px] font-black">Live</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <button className="p-1 hover:text-slate-700 cursor-pointer" title="Add Stock"><Plus className="w-4 h-4" /></button>
                      <button className="p-1 hover:text-slate-700 cursor-pointer" title="Watchlist Settings"><Settings className="w-4 h-4" /></button>
                      <button
                        onClick={() => setIsWatchlistOpen(false)}
                        className="p-1 hover:text-[#15519D] hover:bg-blue-50 text-slate-500 rounded-lg transition-colors cursor-pointer ml-1"
                        title="Minimize Watchlist"
                      >
                        <PanelRightClose className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <select className="w-full appearance-none bg-slate-100 text-slate-800 text-xs font-extrabold py-2 px-3.5 rounded-xl cursor-pointer border border-slate-200/80 focus:outline-hidden">
                      <option>Default</option>
                      <option>Long Term Compounders</option>
                      <option>Tech & SaaS</option>
                      <option>High Growth Defense</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                {/* Watchlist Table */}
                <div className="space-y-3">
                  <div className="grid grid-cols-12 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
                    <span className="col-span-5">Stock</span>
                    <span className="col-span-3 text-right">Price</span>
                    <span className="col-span-2 text-right">Change</span>
                    <span className="col-span-2 text-right">1D Chart</span>
                  </div>

                  <div className="space-y-2">
                    {liveWatchlist.map((stk) => (
                      <div
                        key={stk.symbol}
                        onClick={() => setSelectedStock({ symbol: stk.symbol, name: stk.name, price: stk.price })}
                        className="grid grid-cols-12 items-center py-2 px-2 hover:bg-slate-50/90 rounded-xl transition-colors cursor-pointer group"
                      >
                        {/* Symbol & Initial Badge */}
                        <div className="col-span-5 flex items-center gap-2 min-w-0">
                          <div className={`w-7 h-7 rounded-lg font-black text-[10px] flex items-center justify-center shrink-0 ${stk.badgeBg}`}>
                            {stk.symbol.substring(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-extrabold text-slate-900 text-xs truncate group-hover:text-[#15519D] transition-colors">{stk.symbol}</div>
                            {stk.name && <div className="text-[9px] text-slate-400 truncate">{stk.name}</div>}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-3 text-right font-extrabold text-slate-900 text-xs font-mono">
                          ₹{stk.price}
                        </div>

                        {/* Change % */}
                        <div className={`col-span-2 text-right font-extrabold text-[11px] ${stk.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                          {stk.isPositive ? `+${stk.changePercent}%` : `${stk.changePercent}%`}
                        </div>

                        {/* Sparkline */}
                        <div className="col-span-2 flex justify-end">
                          <svg className="w-10 h-4 overflow-visible" viewBox="0 0 30 12">
                            <polyline
                              fill="none"
                              stroke={stk.isPositive ? '#16A34A' : '#DC2626'}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              points={stk.isPositive ? "0,10 10,8 20,9 30,2" : "0,2 10,6 20,5 30,10"}
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center border-t border-slate-100">
                    <button
                      onClick={() => setActiveTab('Markets')}
                      className="text-xs font-extrabold text-[#15519D] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View all watchlists</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* QUICK INSIGHTS PANEL */}
                <div className="p-4 bg-[#F8FAFC] rounded-[16px] border border-slate-200/80 space-y-3">
                  <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Quick Insights</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Nifty up 170 pts led by Banking & IT.
                  </p>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                      <span>6 / 10 stocks in watchlist are up today</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>

              </aside>
            ) : (
              /* COLLAPSED WATCHLIST FLOATING SIDE TAB */
              <button
                onClick={() => setIsWatchlistOpen(true)}
                className="hidden xl:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#15519D] hover:bg-[#123B63] text-white p-3 rounded-l-2xl shadow-2xl transition-all items-center gap-2 cursor-pointer group hover:pl-4 border-l border-t border-b border-white/20"
                title="Expand Watchlist"
              >
                <div className="flex flex-col items-center gap-2">
                  <PanelRightOpen className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 py-1">
                    WATCHLIST
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </button>
            )}
          </div>

          {/* DISCLAIMER FOOTER */}
          <footer className="p-4 text-center border-t border-slate-200 bg-white text-[11px] text-slate-400 font-medium">
            Disclaimer: Investments in securities market are subject to market risks. Read all the related documents carefully before investing. ArthSetu is an investment intelligence platform, not a broker.
          </footer>

        </div>
      </div>

      {/* MODALS */}
      <UniversalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectStock={(st) => setSelectedStock(st)}
        onSelectResearch={(res) => setSelectedResearch(res)}
        onSelectReport={() => {}}
        onSelectAnalyst={() => {}}
      />

      <StockDetail
        isOpen={!!selectedStock}
        onClose={() => setSelectedStock(null)}
        stock={selectedStock}
      />

      <ResearchDetail
        isOpen={!!selectedResearch}
        onClose={() => setSelectedResearch(null)}
        researchItem={selectedResearch}
      />

      <PremiumPricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />

      <AiCopilotModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onSelectStock={(st) => setSelectedStock(st)}
      />
    </div>
  );
};

export default DashboardLayout;
