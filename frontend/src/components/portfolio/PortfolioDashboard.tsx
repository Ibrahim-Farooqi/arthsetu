import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coins, Sparkles, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  ShieldCheck, Plus, ChevronRight, CheckCircle2, FlaskConical,
  PieChart, Activity, BookOpen, Trophy, Info, Search, X, Check, ArrowRight,
  HelpCircle, Shield, Award, Calendar, Clock, Lock, RefreshCw, BarChart2, Layers,
  Zap, Eye, Lightbulb, UserCheck, LayoutDashboard, Filter, MessageSquare, ArrowLeft,
  DollarSign, ArrowUp, ArrowDown, ShoppingCart, Minus, Sliders, AlertTriangle, Scale
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';

import LabCapitalSetupModal from './LabCapitalSetupModal';
import LabInvestTransactionModal from './LabInvestTransactionModal';
import HoldingDetailModal from './HoldingDetailModal';
import api from '../../services/api';
import marketService from '../../services/market.service';

interface PortfolioDashboardProps {
  onSelectStock?: (stock: any) => void;
  onOpenPricingModal?: () => void;
}

export interface LabHolding {
  symbol: string;
  name: string;
  investedTokens: number;
  currentValueTokens: number;
  returnTokens: number;
  returnPercent: number;
  isPositive: boolean;
  weight: number;
  avgPrice: number;
  currentPrice: number;
  holdingDays: number;
  status: 'Performing Well' | 'Thesis On Track' | 'Underperforming';
  statusDesc: string;
  thesisReason: string;
  thesisText: string;
  buyDate: string;
  decisionScore: number;
  thesisState: '🟢 Still Playing Out' | '🟡 Thesis Weakened' | '🔴 Thesis Invalidated';
}

export const PortfolioDashboard: React.FC<PortfolioDashboardProps> = ({ onSelectStock }) => {
  const [startingCapital, setStartingCapital] = useState<number>(100000);
  const [holdings, setHoldings] = useState<LabHolding[]>([]);
  const [availableTokens, setAvailableTokens] = useState<number>(100000);
  const [searchableStocks, setSearchableStocks] = useState<any[]>([]);
  const [isLoadingLab, setIsLoadingLab] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<'overview' | 'holdings' | 'performance' | 'insights' | 'journal'>('overview');

  const [isCapitalModalOpen, setIsCapitalModalOpen] = useState<boolean>(false);
  const [isInvestModalOpen, setIsInvestModalOpen] = useState<boolean>(false);
  const [selectedStockForBuy, setSelectedStockForBuy] = useState<any>(null);
  const [buyShareQty, setBuyShareQty] = useState<number>(10);
  const [userThesisText, setUserThesisText] = useState<string>('Strong business fundamentals and long-term sector growth potential.');

  const [selectedHoldingForAttribution, setSelectedHoldingForAttribution] = useState<LabHolding | null>(null);
  const [selectedHoldingForSell, setSelectedHoldingForSell] = useState<LabHolding | null>(null);
  const [selectedHoldingForDetail, setSelectedHoldingForDetail] = useState<LabHolding | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLabData = async () => {
      try {
        const [overviewRes, stocks] = await Promise.all([
          api.get('/lab/overview').catch((err) => {
            if (err?.response?.status === 404) {
              return { data: null, isNew: true };
            }
            return null;
          }),
          marketService.getStocks(),
        ]);
        if (isMounted) {
          if (stocks && stocks.length > 0) {
            const mappedStocks = stocks.map(s => ({
              symbol: s.symbol,
              name: s.companyName,
              price: s.lastPrice,
              change: (s.changePercent >= 0 ? '+' : '') + s.changePercent.toFixed(2) + '%',
              score: '82/100',
            }));
            setSearchableStocks(mappedStocks);
            setSelectedStockForBuy(mappedStocks[0]);
          }
          if (overviewRes && overviewRes.data) {
            const data = overviewRes.data;
            setStartingCapital(data.starting_capital || 100000);
            setAvailableTokens(data.available_tokens ?? 100000);
            if (data.holdings && Array.isArray(data.holdings)) {
              const mappedHoldings: LabHolding[] = data.holdings.map((h: any) => ({
                symbol: h.symbol,
                name: h.name || h.symbol,
                investedTokens: h.avg_entry_price * h.quantity,
                currentValueTokens: h.current_value || (h.current_price * h.quantity),
                returnTokens: h.pnl || 0,
                returnPercent: h.pnl_pct || 0,
                isPositive: (h.pnl || 0) >= 0,
                weight: 10,
                avgPrice: h.avg_entry_price,
                currentPrice: h.current_price,
                holdingDays: 1,
                status: (h.pnl || 0) >= 0 ? 'Performing Well' : 'Underperforming',
                statusDesc: (h.pnl || 0) >= 0 ? 'Positive return trajectory' : 'Short-term volatility',
                thesisReason: 'Long-Term Growth',
                thesisText: h.thesis || 'Research-backed thesis',
                buyDate: new Date(h.opened_at || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                decisionScore: 80,
                thesisState: '🟢 Still Playing Out',
              }));
              setHoldings(mappedHoldings);
            }
          }
          setIsLoadingLab(false);
        }
      } catch (e) {
        if (isMounted) setIsLoadingLab(false);
      }
    };
    fetchLabData();
  }, []);

  const handleUpdateThesis = (symbol: string, newThesisText: string) => {
    setHoldings(prev => prev.map(h => {
      if (h.symbol === symbol) {
        return { ...h, thesisText: newThesisText };
      }
      return h;
    }));
  };

  // Compute Lab Values
  const currentHoldingsValue = holdings.reduce((sum, h) => sum + h.currentValueTokens, 0);
  const totalInvestedValue = holdings.reduce((sum, h) => sum + h.investedTokens, 0);
  const totalLabValue = currentHoldingsValue + availableTokens;
  const totalReturnTokens = totalLabValue - startingCapital;
  const totalReturnPercent = (totalReturnTokens / startingCapital) * 100;
  const isOverallPositive = totalReturnTokens >= 0;

  const handleUpdateCapital = (newCap: number) => {
    setStartingCapital(newCap);
    const diff = newCap - totalLabValue;
    setAvailableTokens(prev => Math.max(0, prev + diff));
    localStorage.setItem('arthsetu_lab_capital', newCap.toString());
  };

  const handleModalConfirmBuy = (stock: any, shares: number, thesisText: string) => {
    const requiredTokens = Math.round(stock.price * shares);
    if (requiredTokens > availableTokens) return;

    const existingHoldingIndex = holdings.findIndex(h => h.symbol === stock.symbol);
    if (existingHoldingIndex >= 0) {
      setHoldings(prev => prev.map(h => {
        if (h.symbol === stock.symbol) {
          const newInvested = h.investedTokens + requiredTokens;
          const newCurrent = h.currentValueTokens + requiredTokens;
          return {
            ...h,
            investedTokens: newInvested,
            currentValueTokens: newCurrent,
            thesisText: thesisText || h.thesisText
          };
        }
        return h;
      }));
    } else {
      const newHolding: LabHolding = {
        symbol: stock.symbol,
        name: stock.name,
        investedTokens: requiredTokens,
        currentValueTokens: requiredTokens,
        returnTokens: 0,
        returnPercent: 0,
        isPositive: true,
        weight: 10,
        avgPrice: stock.price,
        currentPrice: stock.price,
        holdingDays: 1,
        status: 'Thesis On Track',
        statusDesc: 'New investment entered with fresh thesis.',
        thesisReason: 'Long-Term Growth',
        thesisText: thesisText || 'Research-backed entry strategy.',
        buyDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        decisionScore: 80,
        thesisState: '🟢 Still Playing Out'
      };
      setHoldings(prev => [newHolding, ...prev]);
    }

    setAvailableTokens(prev => Math.max(0, prev - requiredTokens));
    toast.success(`Invested ₹${requiredTokens.toLocaleString('en-IN')} Tokens into ${stock.symbol}!`);
  };

  const handleModalConfirmSell = (symbol: string, sharesToSell: number) => {
    const targetHolding = holdings.find(h => h.symbol === symbol);
    if (!targetHolding) return;

    const ownedShares = Math.round(targetHolding.currentValueTokens / targetHolding.currentPrice) || 10;
    const saleRatio = Math.min(1, sharesToSell / ownedShares);
    const saleTokens = Math.round(targetHolding.currentValueTokens * saleRatio);

    if (sharesToSell >= ownedShares) {
      setHoldings(prev => prev.filter(h => h.symbol !== symbol));
    } else {
      setHoldings(prev => prev.map(h => {
        if (h.symbol === symbol) {
          return {
            ...h,
            investedTokens: Math.round(h.investedTokens * (1 - saleRatio)),
            currentValueTokens: Math.round(h.currentValueTokens * (1 - saleRatio)),
          };
        }
        return h;
      }));
    }

    setAvailableTokens(prev => prev + saleTokens);
    toast.success(`Sold ${sharesToSell} shares of ${symbol}. ₹${saleTokens.toLocaleString('en-IN')} Tokens returned.`);
    setSelectedHoldingForSell(null);
  };

  return (
    <div className="flex flex-col gap-8 w-full font-sans text-[#172033] pb-16">
      
      {/* 1. PREMIUM INVESTMENT LAB HERO HEADER */}
      <section className="bg-gradient-to-br from-[#123B63] to-[#15519D] text-white rounded-[28px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          {/* LEFT: TITLE & DESCRIPTION */}
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-white/20">
                <FlaskConical className="w-3.5 h-3.5 fill-current" /> Premium Simulation & Decision Intelligence
              </span>
              <button
                onClick={() => setIsCapitalModalOpen(true)}
                className="text-[11px] font-bold text-blue-200 hover:text-white underline cursor-pointer transition"
              >
                Change Starting Capital
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ArthSetu Investment Lab
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/90 font-medium leading-relaxed">
              Test investment ideas with virtual capital, evaluate thesis progression, understand stock performance drivers, and improve your investment quality.
            </p>
          </div>

          {/* RIGHT: MAIN LAB METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 shrink-0">
            {/* TOTAL LAB VALUE */}
            <div className="space-y-1 min-w-[120px]">
              <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-wider block">Total Lab Value</span>
              <div className="text-base sm:text-lg font-black text-white leading-none">₹{totalLabValue.toLocaleString('en-IN')}</div>
              <div className={`text-[10px] font-extrabold flex items-center gap-0.5 ${isOverallPositive ? 'text-emerald-300' : 'text-rose-300'}`}>
                {isOverallPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{isOverallPositive ? '+' : ''}{totalReturnPercent.toFixed(2)}% (₹{totalReturnTokens.toLocaleString('en-IN')})</span>
              </div>
            </div>

            {/* STARTING CAPITAL */}
            <div className="space-y-1 min-w-[120px]">
              <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-wider block">Starting Capital</span>
              <div className="text-base sm:text-lg font-black text-white leading-none">₹{startingCapital.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-blue-200/80 font-semibold block">Configured Tokens</span>
            </div>

            {/* INVESTED VALUE */}
            <div className="space-y-1 min-w-[120px]">
              <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-wider block">Invested Value</span>
              <div className="text-base sm:text-lg font-black text-white leading-none">₹{currentHoldingsValue.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-blue-200/80 font-semibold block">{holdings.length} Active Positions</span>
            </div>

            {/* AVAILABLE TOKENS */}
            <div className="space-y-1 min-w-[120px]">
              <span className="text-[10px] font-extrabold text-blue-200 uppercase tracking-wider block">Available Tokens</span>
              <div className="text-base sm:text-lg font-black text-amber-300 leading-none">₹{availableTokens.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-blue-200/80 font-semibold block">Ready to Allocate</span>
            </div>
          </div>
        </div>

        {/* PRIMARY ACTIONS ROW */}
        <div className="pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 mt-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInvestModalOpen(true)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Invest Tokens
            </button>

            <button
              onClick={() => setActiveTab('journal')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-xl border border-white/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" /> Review My Decisions
            </button>
          </div>

          <div className="text-xs text-blue-200/90 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Persistent Virtual Tokens · Sell holdings to free up capital</span>
          </div>
        </div>
      </section>

      {/* 2. TAB NAVIGATION STRIP */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { id: 'holdings', label: `Holdings (${holdings.length})`, icon: Layers },
          { id: 'performance', label: 'Performance & Attribution', icon: Activity },
          { id: 'insights', label: 'AI Insights & Profile', icon: Sparkles },
          { id: 'journal', label: 'Decision Journal', icon: BookOpen },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === t.id
                ? 'bg-[#15519D] text-white shadow-md'
                : 'bg-white text-[#64748B] hover:text-[#172033] border border-[#E2E8F0]'
            }`}
          >
            <t.icon className="w-4 h-4" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* 3. TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* PERFORMANCE CHART + KEY OBSERVATION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            <div className="lg:col-span-2 bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#64748B] uppercase">Lab Growth Trajectory</span>
                  <h3 className="text-xl font-black text-[#172033]">Portfolio Value vs NIFTY 50</h3>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#15519D]" /> Your Lab (+12.28%)</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> NIFTY 50 (+8.41%)</div>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { day: 'May 24', lab: 150000, nifty: 150000 },
                    { day: 'Jun 10', lab: 154200, nifty: 152100 },
                    { day: 'Jun 25', lab: 158900, nifty: 154800 },
                    { day: 'Jul 15', lab: 163400, nifty: 157200 },
                    { day: 'Aug 01', lab: 161200, nifty: 159000 },
                    { day: 'Aug 28', lab: 168420, nifty: 162615 }
                  ]}>
                    <defs>
                      <linearGradient id="labColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#15519D" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#15519D" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} domain={['auto', 'auto']} />
                    <Tooltip />
                    <Area type="monotone" dataKey="lab" stroke="#15519D" strokeWidth={3} fillOpacity={1} fill="url(#labColor)" />
                    <Area type="monotone" dataKey="nifty" stroke="#16A34A" strokeWidth={2} strokeDasharray="4 4" fill="none" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* QUICK AI SUMMARY CARD */}
            <div className="bg-[#123B63] text-white rounded-[28px] p-6 shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-black uppercase">
                  <Sparkles className="w-3.5 h-3.5" /> Latest Decision Summary
                </div>
                <h3 className="text-2xl font-black">Outperforming Benchmark by +3.87%</h3>
                <p className="text-xs text-blue-100/80 leading-relaxed font-medium">
                  Your Reliance and HDFC Bank entries have driven strong positive returns. However, your Tech allocation is approaching 41% portfolio concentration.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-blue-200">Average Decision Quality:</span>
                  <span className="text-amber-300 font-black">77.5 / 100</span>
                </div>
                <button
                  onClick={() => setActiveTab('performance')}
                  className="w-full py-3 bg-white text-[#123B63] font-black text-xs rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Explore Full Performance →</span>
                </button>
              </div>
            </div>

          </div>

          {/* ACTIVE HOLDINGS SNAPSHOT */}
          <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-[#172033]">Active Lab Holdings Snapshot</h3>
              <button onClick={() => setActiveTab('holdings')} className="text-xs font-extrabold text-[#15519D] hover:underline cursor-pointer">
                View All Holdings →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {holdings.map(h => (
                <div
                  key={h.symbol}
                  onClick={() => setSelectedHoldingForDetail(h)}
                  className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-blue-50/40 hover:border-[#15519D] transition cursor-pointer space-y-3 group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-black text-base text-[#172033] group-hover:text-[#15519D] transition-colors">{h.symbol}</span>
                      <span className="text-[11px] text-[#64748B] block font-medium truncate max-w-[150px]">{h.name}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                      h.isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {h.isPositive ? '+' : ''}{h.returnPercent}%
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-[#E2E8F0]">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Invested</span>
                      <div className="font-extrabold text-xs text-[#172033]">₹{h.investedTokens.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="text-right space-y-0.5">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase">Current Value</span>
                      <div className="font-black text-sm text-[#15519D]">₹{h.currentValueTokens.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 4. TAB 2: HOLDINGS */}
      {activeTab === 'holdings' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#172033]">Your Simulated Holdings</h2>
              <p className="text-xs text-[#64748B] font-medium">Click any holding to open detailed intelligence, charts, and position breakdown.</p>
            </div>
            <button
              onClick={() => setIsInvestModalOpen(true)}
              className="px-5 py-2.5 bg-[#15519D] text-white font-extrabold text-xs rounded-xl shadow-md hover:bg-[#123B63] transition cursor-pointer"
            >
              + Invest Tokens
            </button>
          </div>

          <div className="space-y-4">
            {holdings.map(h => (
              <div
                key={h.symbol}
                onClick={() => setSelectedHoldingForDetail(h)}
                className="bg-white rounded-[24px] border border-[#E2E8F0] hover:border-[#15519D] transition-all p-6 shadow-sm space-y-4 cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xl text-[#172033] group-hover:text-[#15519D] transition-colors">{h.symbol}</span>
                      <span className="text-xs text-[#64748B] font-medium">• {h.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
                      <span>Holding Period: <strong className="text-[#172033]">{h.holdingDays} Days</strong></span>
                      <span>•</span>
                      <span>Bought: <strong className="text-[#172033]">{h.buyDate}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase block">Invested</span>
                      <span className="font-extrabold text-sm text-[#172033]">₹{h.investedTokens.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase block">Current Value</span>
                      <span className="font-black text-lg text-[#15519D]">₹{h.currentValueTokens.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase block">Return</span>
                      <span className={`font-black text-base ${h.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {h.isPositive ? '+' : ''}{h.returnPercent}% (₹{h.returnTokens.toLocaleString('en-IN')})
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHoldingForSell(h);
                      }}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs rounded-xl transition cursor-pointer"
                    >
                      Sell & Reallocate
                    </button>
                  </div>
                </div>

                {/* INTELLIGENCE STATUS LAYER */}
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#64748B]">Investment Status:</span>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-black ${
                        h.status === 'Performing Well' ? 'bg-emerald-100 text-emerald-800' :
                        h.status === 'Thesis On Track' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {h.status}
                      </span>
                      <span className="text-xs font-bold text-[#15519D]">{h.thesisState}</span>
                    </div>
                    <p className="text-xs text-[#64748B] font-medium">{h.statusDesc}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedHoldingForDetail(h);
                      }}
                      className="text-xs font-extrabold text-[#15519D] hover:underline cursor-pointer"
                    >
                      View Holding Details & Charts →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 3: PERFORMANCE & ATTRIBUTION */}
      {activeTab === 'performance' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* PERFORMANCE HERO COMPARISON */}
          <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#64748B] uppercase">Decision Evaluation</span>
              <h2 className="text-2xl font-black text-[#172033]">How good have my investment decisions been?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0]">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#64748B]">Your Lab Return</span>
                <div className="text-3xl font-black text-[#15519D]">+12.28%</div>
                <span className="text-xs text-emerald-600 font-bold">+₹18,420 Profit</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#64748B]">NIFTY 50 Benchmark</span>
                <div className="text-3xl font-black text-slate-700">+8.41%</div>
                <span className="text-xs text-slate-500 font-bold">Standard Market Benchmark</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#64748B]">Relative Outperformance</span>
                <div className="text-3xl font-black text-emerald-600">+3.87%</div>
                <span className="text-xs text-emerald-700 font-bold">Alpha Generated Over Market</span>
              </div>
            </div>
          </div>

          {/* WHAT CREATED YOUR RETURNS? (RETURN ATTRIBUTION) */}
          <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 space-y-4">
            <h3 className="text-xl font-black text-[#172033]">What Created Your Returns?</h3>
            <p className="text-xs text-[#64748B] font-medium">Click on any holding to see chronological drivers (earnings, sector momentum, valuation).</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {holdings.map(h => (
                <div
                  key={h.symbol}
                  onClick={() => setSelectedHoldingForDetail(h)}
                  className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-blue-50/40 hover:border-[#15519D] transition cursor-pointer space-y-3 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-black text-base text-[#172033] group-hover:text-[#15519D] transition-colors">{h.symbol}</span>
                    <span className={`font-black text-sm ${h.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {h.isPositive ? '+' : ''}₹{h.returnTokens.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-xs text-[#64748B] space-y-1 font-medium">
                    <div>Decision Score: <strong className="text-[#172033]">{h.decisionScore}/100</strong></div>
                    <div>Thesis: <strong className="text-[#15519D]">{h.thesisState}</strong></div>
                  </div>

                  <button className="text-[11px] font-extrabold text-[#15519D] hover:underline block pt-2 border-t border-[#E2E8F0] w-full text-left">
                    Why did {h.symbol} move? →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* WAS THIS A GOOD INVESTMENT? (DECISION QUALITY VS OUTCOME) */}
          <div className="bg-[#123B63] text-white rounded-[28px] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase">Core Lab Principle</span>
              <h3 className="text-2xl font-black">Was This a Good Investment? (Decision Quality: 82/100)</h3>
              <p className="text-xs text-blue-100/80 font-medium">
                ArthSetu evaluates the reasoning, entry valuation, risk management, and thesis clarity alongside eventual return outcome.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-2">
                <h4 className="font-black text-sm text-emerald-300">What You Got Right</h4>
                <ul className="text-xs text-blue-50 font-medium space-y-1.5">
                  <li>• <strong>Strong Business Quality:</strong> Selected companies with solid balance sheets & cash flows.</li>
                  <li>• <strong>Positive Growth Thesis:</strong> Earnings trajectory matched expected catalysts.</li>
                  <li>• <strong>Disciplined Entry:</strong> Reliance entry occurred prior to momentum expansion.</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-2">
                <h4 className="font-black text-sm text-amber-300">What Could Have Been Better</h4>
                <ul className="text-xs text-blue-50 font-medium space-y-1.5">
                  <li>• <strong>Entry Valuation:</strong> Infosys entered at 26x TTM earnings with minimal margin of safety.</li>
                  <li>• <strong>Portfolio Concentration:</strong> Technology sector reached 41% total allocation.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* WHAT ELSE COULD YOU HAVE CONSIDERED? (ALTERNATIVE ANALYSIS) */}
          <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 space-y-4">
            <h3 className="text-xl font-black text-[#172033]">What Else Could You Have Considered?</h3>
            <p className="text-xs text-[#64748B] font-medium">Compare your holding performance against research-backed alternatives over the same holding period.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase font-bold">
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Your Holding Return</th>
                    <th className="py-3 px-4">Alternative Return</th>
                    <th className="py-3 px-4">ArthSetu View</th>
                    <th className="py-3 px-4">Risk & Volatility Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  <tr className="hover:bg-[#F8FAFC]">
                    <td className="py-3 px-4 font-black text-[#172033]">RELIANCE (Your Holding)</td>
                    <td className="py-3 px-4 font-black text-emerald-600">+14.20%</td>
                    <td className="py-3 px-4 text-[#64748B]">—</td>
                    <td className="py-3 px-4 font-bold text-[#15519D]">78/100</td>
                    <td className="py-3 px-4 text-[#64748B]">Low Risk / Monopoly Moat</td>
                  </tr>
                  <tr className="hover:bg-[#F8FAFC]">
                    <td className="py-3 px-4 font-bold text-[#172033]">ONGC (Alternative A)</td>
                    <td className="py-3 px-4 text-[#64748B]">—</td>
                    <td className="py-3 px-4 font-black text-emerald-600">+18.40%</td>
                    <td className="py-3 px-4 font-bold text-[#15519D]">81/100</td>
                    <td className="py-3 px-4 text-[#64748B]">Higher crude volatility, higher dividend yield</td>
                  </tr>
                  <tr className="hover:bg-[#F8FAFC]">
                    <td className="py-3 px-4 font-bold text-[#172033]">BPCL (Alternative B)</td>
                    <td className="py-3 px-4 text-[#64748B]">—</td>
                    <td className="py-3 px-4 font-black text-emerald-600">+9.70%</td>
                    <td className="py-3 px-4 font-bold text-[#15519D]">74/100</td>
                    <td className="py-3 px-4 text-[#64748B]">Lower return but stable cashflows</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 6. TAB 4: INSIGHTS & PROFILE */}
      {activeTab === 'insights' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* PERSONAL INVESTOR PROFILE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 space-y-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#64748B] uppercase">Your Investment Style</span>
                <h3 className="text-2xl font-black text-[#172033]">Growth-Oriented Investor</h3>
                <p className="text-xs text-[#64748B] font-medium">Based on your holdings duration, allocation behavior, and thesis notes.</p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { label: 'Growth Focus', score: 82, color: 'bg-emerald-600' },
                  { label: 'Value Focus', score: 54, color: 'bg-blue-600' },
                  { label: 'Momentum', score: 71, color: 'bg-indigo-600' },
                  { label: 'Dividend / Income', score: 32, color: 'bg-amber-600' },
                  { label: 'Risk Appetite', score: 68, color: 'bg-rose-600' },
                ].map(bar => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-[#172033]">{bar.label}</span>
                      <span className="text-[#64748B]">{bar.score}/100</span>
                    </div>
                    <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                      <div className={`h-full ${bar.color}`} style={{ width: `${bar.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PORTFOLIO HEALTH SCORE */}
            <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 space-y-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-[#64748B] uppercase">Portfolio Health</span>
                  <h3 className="text-2xl font-black text-[#172033]">78 / 100</h3>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-black rounded-full uppercase">
                  Healthy Balance
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { label: 'Diversification', val: '81/100' },
                  { label: 'Risk Balance', val: '73/100' },
                  { label: 'Valuation Safety', val: '69/100' },
                  { label: 'Concentration Risk', val: '62/100' },
                  { label: 'Business Quality', val: '86/100' },
                  { label: 'Decision Discipline', val: '84/100' },
                ].map(item => (
                  <div key={item.label} className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-0.5">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">{item.label}</span>
                    <div className="font-extrabold text-sm text-[#172033]">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* AI DECISION INSIGHTS */}
          <div className="bg-[#123B63] text-white rounded-[28px] p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-2xl font-black">AI Decision Insights</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-2">
                <span className="text-amber-300 font-extrabold text-xs uppercase">Insight 01</span>
                <h4 className="font-extrabold text-sm text-white">Strongest at Quality Companies</h4>
                <p className="text-xs text-blue-100/80 font-medium leading-relaxed">
                  Your investments in companies with AAA balance sheets generated better risk-adjusted outcomes than speculative plays.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-2">
                <span className="text-amber-300 font-extrabold text-xs uppercase">Insight 02</span>
                <h4 className="font-extrabold text-sm text-white">Entry After Momentum Expansion</h4>
                <p className="text-xs text-blue-100/80 font-medium leading-relaxed">
                  3 of your last 4 entries occurred after the stock gained &gt;8% over the previous month.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 space-y-2">
                <span className="text-amber-300 font-extrabold text-xs uppercase">Insight 03</span>
                <h4 className="font-extrabold text-sm text-white">Technology Sector Concentration</h4>
                <p className="text-xs text-blue-100/80 font-medium leading-relaxed">
                  Technology represents 30% of your holdings. Exploring Healthcare & Capital Goods could enhance diversification.
                </p>
              </div>
            </div>
          </div>

          {/* "WHAT IF?" DECISION SIMULATOR */}
          <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#15519D] uppercase">Alternative Scenario Testing</span>
              <h3 className="text-2xl font-black text-[#172033]">What If? Scenario Simulator</h3>
              <p className="text-xs text-[#64748B] font-medium">Explore hypothetical outcomes of alternative investment choices.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
                <h4 className="font-extrabold text-sm text-[#172033]">What if I invested in NIFTY 50 instead?</h4>
                <p className="text-xs text-[#64748B]">Simulated return: +8.41% (₹12,615 gain)</p>
                <div className="text-xs font-bold text-[#15519D]">Your Lab Outperformed by +₹5,805</div>
              </div>

              <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
                <h4 className="font-extrabold text-sm text-[#172033]">What if I entered 1 month later?</h4>
                <p className="text-xs text-[#64748B]">Simulated return: +7.20% (Missed early entry surge)</p>
                <div className="text-xs font-bold text-amber-700">Early entry added +₹6,200 value</div>
              </div>

              <div className="p-5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
                <h4 className="font-extrabold text-sm text-[#172033]">What if I allocated 50% capital?</h4>
                <p className="text-xs text-[#64748B]">Simulated return: +14.20% but higher portfolio volatility</p>
                <div className="text-xs font-bold text-[#15519D]">Current allocation offered better risk balance</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 7. TAB 5: DECISION JOURNAL */}
      {activeTab === 'journal' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#172033]">Decision Journal</h2>
            <p className="text-xs text-[#64748B] font-medium">Your investment memory — thesis notes, chronological developments, and post-decision reviews.</p>
          </div>

          <div className="space-y-6">
            {holdings.map(h => (
              <div
                key={h.symbol}
                onClick={() => setSelectedHoldingForDetail(h)}
                className="bg-white rounded-[28px] border border-[#E2E8F0] hover:border-[#15519D] transition-all p-6 space-y-4 shadow-sm cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-4 gap-2">
                  <div>
                    <span className="font-black text-xl text-[#172033] group-hover:text-[#15519D] transition-colors">{h.symbol}</span>
                    <span className="text-xs text-[#64748B] font-medium ml-2">{h.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="bg-blue-50 text-[#15519D] px-3 py-1 rounded-full">Decision Score: {h.decisionScore}/100</span>
                    <span className="text-[#64748B]">Entered: {h.buyDate}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#64748B] uppercase">Your Original Thesis Notes</span>
                  <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] text-xs font-medium text-[#172033] italic">
                    "{h.thesisText}"
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#64748B] uppercase">Post-Investment Review</span>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-[#64748B]">Would you make this decision again?</span>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">Yes, with same thesis</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. MODAL: SIMPLIFIED 2-STAGE INVEST / BUY-SELL TRANSACTION */}
      <LabInvestTransactionModal
        isOpen={isInvestModalOpen || !!selectedHoldingForSell}
        onClose={() => {
          setIsInvestModalOpen(false);
          setSelectedHoldingForSell(null);
        }}
        availableTokens={availableTokens}
        existingHolding={selectedHoldingForSell}
        onConfirmBuy={handleModalConfirmBuy}
        onConfirmSell={handleModalConfirmSell}
      />

      {/* 10. CAPITAL SETUP MODAL */}
      <LabCapitalSetupModal
        isOpen={isCapitalModalOpen}
        onClose={() => setIsCapitalModalOpen(false)}
        onConfirmCapital={handleUpdateCapital}
        initialAmount={startingCapital}
      />

      {/* 11. HOLDING DETAIL MODAL */}
      <HoldingDetailModal
        isOpen={!!selectedHoldingForDetail}
        onClose={() => setSelectedHoldingForDetail(null)}
        holding={selectedHoldingForDetail}
        onBuyMore={(holding) => {
          setSelectedHoldingForDetail(null);
          setIsInvestModalOpen(true);
        }}
        onSellHolding={(holding) => {
          setSelectedHoldingForDetail(null);
          setSelectedHoldingForSell(holding);
        }}
        onUpdateThesis={handleUpdateThesis}
      />
    </div>
  );
};

export default PortfolioDashboard;
