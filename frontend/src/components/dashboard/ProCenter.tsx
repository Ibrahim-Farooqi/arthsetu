import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Gem, TrendingUp, Layers, Radio, Lock, Unlock, 
  ArrowRight, Award, CheckCircle2, ChevronRight, Sparkles, Filter, AlertCircle, RefreshCw, Bell, Search, Activity, ArrowUpRight, ArrowDownRight, Eye, Check
} from 'lucide-react';
import ProIntelligenceHero from './ProIntelligenceHero';
import SmallCapIntelligence from './SmallCapIntelligence';
import RisingRadarTracker from './RisingRadarTracker';
import SectorIntelligenceRankings from './SectorIntelligenceRankings';

interface ProCenterProps {
  onSelectStock: (stock: any) => void;
  onOpenPricingModal?: () => void;
}

export const ProCenter: React.FC<ProCenterProps> = ({
  onSelectStock,
  onOpenPricingModal
}) => {
  // Demo Access State Toggle: 'Active' allows owner to review all Pro screens without real payment
  const [proState, setProState] = useState<'Active' | 'Locked'>('Active');
  const [leaderTimeframe, setLeaderTimeframe] = useState<'Today' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const [returnFilter, setReturnFilter] = useState<'1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y'>('1Y');

  // Market Leaders Data
  const marketLeaders = [
    { symbol: 'TCS', companyName: 'Tata Consultancy Services', price: '3,842.50', returnVal: '+8.42%', mcap: '₹13.88L Cr', sector: 'Technology', score: 84 },
    { symbol: 'RELIANCE', companyName: 'Reliance Industries Ltd', price: '2,975.80', returnVal: '+6.15%', mcap: '₹20.13L Cr', sector: 'Energy', score: 82 },
    { symbol: 'BHARTIARTL', companyName: 'Bharti Airtel Ltd', price: '1,450.20', returnVal: '+12.40%', mcap: '₹8.45L Cr', sector: 'Telecom', score: 86 },
    { symbol: 'ICICIBANK', companyName: 'ICICI Bank Ltd', price: '1,180.00', returnVal: '+7.80%', mcap: '₹8.28L Cr', sector: 'Banking', score: 85 }
  ];

  // Highest Returns & Risk Matrix
  const highestReturnsData = [
    { symbol: 'SUZLON', companyName: 'Suzlon Energy Ltd', price: '72.40', return1Y: '+184.2%', cagr3Y: '64.5%', volatility: '34.2%', maxDrawdown: '-18.5%', mcap: '₹98,400 Cr', score: 78, risk: 'Elevated' },
    { symbol: 'BHEL', companyName: 'Bharat Heavy Electricals', price: '294.00', return1Y: '+142.8%', cagr3Y: '48.2%', volatility: '28.4%', maxDrawdown: '-14.2%', mcap: '₹1.02L Cr', score: 81, risk: 'Moderate' },
    { symbol: 'TRENT', companyName: 'Trent Ltd', price: '7,120.00', return1Y: '+118.5%', cagr3Y: '52.1%', volatility: '21.8%', maxDrawdown: '-9.8%', mcap: '₹2.53L Cr', score: 89, risk: 'Low' },
    { symbol: 'HAL', companyName: 'Hindustan Aeronautics Ltd', price: '4,650.00', return1Y: '+94.5%', cagr3Y: '58.4%', volatility: '22.5%', maxDrawdown: '-11.2%', mcap: '₹3.11L Cr', score: 88, risk: 'Low' }
  ];

  // Pro Featured Research Picks with Scenario Analysis
  const featuredPicks = [
    {
      symbol: 'DIXON',
      companyName: 'Dixon Technologies Ltd',
      score: 88,
      view: 'Strong Positive',
      price: '12,450.00',
      thesis: 'Mobile EMS export scaling under PLI scheme + laptop manufacturing contract win.',
      catalyst: 'Component localization margin boost over 4 quarters.',
      bullCase: 'Target ₹16,500 (+32.5%) — Accelerated laptop exports & 40% EPS CAGR.',
      baseCase: 'Target ₹14,200 (+14.0%) — Steady EMS execution & 28% EPS CAGR.',
      bearCase: 'Target ₹10,800 (-13.2%) — Order deferral & margin contraction.',
      risk: 'Moderate Volatility'
    },
    {
      symbol: 'TRENT',
      companyName: 'Trent Ltd (Westside & Zudio)',
      score: 89,
      view: 'Strong Positive',
      price: '7,120.00',
      thesis: 'Unmatched retail store economics with Zudio store payback under 18 months.',
      catalyst: 'International store expansion across GCC markets.',
      bullCase: 'Target ₹9,200 (+29.2%) — 400 new Zudio stores & Star Bazaar profitability.',
      baseCase: 'Target ₹8,100 (+13.7%) — 250 store additions & 32% SSSG growth.',
      bearCase: 'Target ₹6,000 (-15.7%) — Apparel demand slowdown & retail inflation.',
      risk: 'High Valuation Safety'
    }
  ];

  return (
    <div className="space-y-8 pb-16 font-sans">
      
      {/* 1. PRO PAGE HEADER & DEMO SWITCHER */}
      <div className="bg-gradient-to-r from-slate-950 via-[#123B63] to-[#15519D] p-6 sm:p-8 rounded-[28px] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        
        <div className="space-y-2 max-w-2xl z-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
              <Gem className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>ARTHSETU PRO INTELLIGENCE</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              PRO ACTIVE
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Go beyond the market.
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
            Curated research, advanced stock intelligence, and opportunities selected for deeper analysis.
          </p>

          <div className="text-[11px] font-semibold text-slate-300 pt-1 flex items-center gap-3">
            <span>● Market Open</span>
            <span>• Data updated 2 min ago</span>
          </div>
        </div>

        {/* DEMO REVIEW SWITCHER */}
        <div className="z-10 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex flex-col items-center gap-2 shrink-0">
          <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">Developer Access Switcher</span>
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setProState('Active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                proState === 'Active'
                  ? 'bg-[#16A34A] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Pro Active</span>
            </button>

            <button
              onClick={() => setProState('Locked')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                proState === 'Locked'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Free Preview</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. PREMIUM SCALE STRIP */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 divide-x divide-slate-100 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Analysed</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">2,400+ Stocks</div>
          </div>
          <div className="pl-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Pro Opportunities</span>
            <div className="text-lg font-black text-[#15519D] mt-0.5">126 Identified</div>
          </div>
          <div className="pl-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">High-Conviction Ideas</span>
            <div className="text-lg font-black text-emerald-600 mt-0.5">38 Research Picks</div>
          </div>
          <div className="pl-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Monitored Sectors</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">17 Sectors</div>
          </div>
          <div className="pl-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Fresh Research Updates</span>
            <div className="text-lg font-black text-amber-600 mt-0.5">24 Today</div>
          </div>
        </div>
      </div>

      {/* PRO STATE LOCKED BANNER */}
      {proState === 'Locked' && (
        <div className="p-6 bg-gradient-to-r from-amber-500/10 via-amber-50 to-blue-50 rounded-3xl border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-black text-amber-700 uppercase tracking-wider">Unlock ArthSetu Pro</span>
            <h3 className="text-xl font-black text-slate-900">Access Full Pro Intelligence & Small-Cap Discovery</h3>
            <p className="text-xs text-slate-600 font-medium">Get deep research, scenario analysis, peer matrices, and radar signals.</p>
          </div>

          <button
            onClick={onOpenPricingModal}
            className="px-6 py-3 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer shrink-0"
          >
            Upgrade to Pro
          </button>
        </div>
      )}

      {/* 3. TODAY'S PRO INTELLIGENCE (HERO SECTION) */}
      <ProIntelligenceHero onSelectStock={onSelectStock} />

      {/* 4. MARKET LEADERS & SEGMENTED PERFORMANCE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Market Leaders</h2>
            <p className="text-xs text-slate-500 font-medium">Stocks delivering the strongest price performance across the market.</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['Today', '1W', '1M', '3M', '1Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setLeaderTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  leaderTimeframe === tf ? 'bg-[#15519D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketLeaders.map((ml) => (
            <div
              key={ml.symbol}
              onClick={() => onSelectStock(ml)}
              className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200/80 hover:border-[#15519D] transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#15519D]">{ml.companyName}</h3>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">{ml.symbol} · {ml.sector}</span>
                </div>
                <span className="text-xs font-black text-[#15519D] bg-blue-50 px-2 py-0.5 rounded-md">
                  {ml.score}/100
                </span>
              </div>

              <div className="flex justify-between items-end pt-2">
                <div>
                  <div className="text-base font-black text-slate-900">₹{ml.price}</div>
                  <span className="text-xs font-extrabold text-emerald-600">{ml.returnVal} ({leaderTimeframe})</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{ml.mcap}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. HIGHEST RETURNS & RISK MATRIX */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Highest Returns & Risk Matrix</h2>
            <p className="text-xs text-slate-500 font-medium">Historical return leaders coupled with volatility & drawdown risk metrics.</p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['1M', '3M', '6M', '1Y', '3Y', '5Y'] as const).map((rFilter) => (
              <button
                key={rFilter}
                onClick={() => setReturnFilter(rFilter)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  returnFilter === rFilter ? 'bg-[#15519D] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {rFilter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Company & Ticker</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Return ({returnFilter})</th>
                <th className="py-3 px-3">CAGR (3Y)</th>
                <th className="py-3 px-3">Volatility</th>
                <th className="py-3 px-3">Max Drawdown</th>
                <th className="py-3 px-3">Market Cap</th>
                <th className="py-3 px-3">Score</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {highestReturnsData.map((hr) => (
                <tr
                  key={hr.symbol}
                  onClick={() => onSelectStock(hr)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-3">
                    <div className="font-extrabold text-slate-900 text-xs group-hover:text-[#15519D]">{hr.companyName}</div>
                    <div className="text-[10px] text-slate-400 font-mono font-bold">{hr.symbol}</div>
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-slate-900">₹{hr.price}</td>
                  <td className="py-3.5 px-3 font-extrabold text-emerald-600">{hr.return1Y}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-800">{hr.cagr3Y}</td>
                  <td className="py-3.5 px-3 font-bold text-amber-600">{hr.volatility}</td>
                  <td className="py-3.5 px-3 font-bold text-rose-600">{hr.maxDrawdown}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-600">{hr.mcap}</td>
                  <td className="py-3.5 px-3 font-black text-[#15519D]">{hr.score}/100</td>
                  <td className="py-3.5 px-3 text-right">
                    <button className="text-[#15519D] font-extrabold text-xs inline-flex items-center gap-1 group-hover:underline">
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. SMALL-CAP INTELLIGENCE */}
      <SmallCapIntelligence onSelectStock={onSelectStock} />

      {/* 7. RISING ON THE ARTHSETU RADAR */}
      <RisingRadarTracker onSelectStock={onSelectStock} />

      {/* 8. SECTOR INTELLIGENCE */}
      <SectorIntelligenceRankings />

      {/* 9. PRO RESEARCH PICKS WITH SCENARIO ANALYSIS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-2xs">
        <div className="border-b border-slate-100 pb-4">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 font-extrabold text-xs rounded-full uppercase">
            PREMIUM FEATURED IDEAS
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1.5">
            ArthSetu Pro Research & Scenario Analysis
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Deep-dive research candidates evaluated across Bull, Base, and Bear scenario models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPicks.map((pick) => (
            <div
              key={pick.symbol}
              onClick={() => onSelectStock(pick)}
              className="p-5 bg-[#F8FAFC] rounded-2xl border border-slate-200/90 space-y-4 hover:border-[#15519D] transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-[#15519D] transition-colors">{pick.companyName}</h3>
                  <span className="text-xs font-mono font-bold text-slate-400">{pick.symbol} · ₹{pick.price}</span>
                </div>
                <span className="px-3 py-1 bg-[#15519D] text-white font-black text-xs rounded-xl shadow-xs">
                  {pick.score}/100 Score
                </span>
              </div>

              <p className="text-xs text-slate-700 font-medium leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200/80">
                "{pick.thesis}"
              </p>

              {/* SCENARIO BOXES */}
              <div className="space-y-2 pt-1 text-xs">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Scenario Valuation Range:</span>
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 font-medium">
                  <strong className="font-black text-emerald-800">Bull Case: </strong>{pick.bullCase}
                </div>
                <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 font-medium">
                  <strong className="font-black text-blue-800">Base Case: </strong>{pick.baseCase}
                </div>
                <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 font-medium">
                  <strong className="font-black text-rose-800">Bear Case: </strong>{pick.bearCase}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-[#15519D] group-hover:underline">
                <span>Read Full Research Report</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProCenter;
