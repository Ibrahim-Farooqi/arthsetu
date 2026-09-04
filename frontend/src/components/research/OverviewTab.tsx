import React, { useState, useEffect } from 'react';
import { 
  Sparkles, TrendingUp, TrendingDown, ArrowRight, ShieldCheck, 
  Activity, Star, BarChart3, AlertCircle, Flame, Globe, 
  Zap, Target, CheckCircle2, Clock, Radio, RefreshCw, Inbox
} from 'lucide-react';
import { motion } from 'framer-motion';
import marketService, { type MarketIndex, type ResearchCallData, type SectorData } from '../../services/market.service';

interface OverviewTabProps {
  onNavigateTab?: (tabId: string) => void;
  onOpenAiAdvisor?: (advisorId?: string) => void;
  onSelectResearchCall?: (call: any) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onSelectResearchCall }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [researchCalls, setResearchCalls] = useState<ResearchCallData[]>([]);
  const [sectors, setSectors] = useState<SectorData[]>([]);

  const fetchOverviewData = async () => {
    setLoading(true);
    try {
      const [fetchedIndices, fetchedCalls, fetchedSectors] = await Promise.all([
        marketService.getIndices(),
        marketService.getResearchCalls(),
        marketService.getSectors()
      ]);

      setIndices(fetchedIndices || []);
      setResearchCalls(fetchedCalls || []);
      setSectors(fetchedSectors || []);
    } catch (err) {
      console.error('Error fetching overview data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const marketSnapshot = indices.map(idx => ({
    label: idx.name,
    value: `₹${idx.value.toLocaleString('en-IN')}`,
    change: idx.change >= 0 ? `+${idx.change.toFixed(2)}` : `${idx.change.toFixed(2)}`,
    pct: idx.changePercent >= 0 ? `+${idx.changePercent.toFixed(2)}%` : `${idx.changePercent.toFixed(2)}%`,
    positive: idx.changePercent >= 0
  }));

  const quickInsights = sectors.length > 0 ? [
    { title: 'Most Bullish Sector', value: sectors[0]?.name || '--', icon: TrendingUp, change: `${sectors[0]?.changePercent ? (sectors[0].changePercent >= 0 ? '+' : '') + sectors[0].changePercent + '%' : '--'}`, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', badge: 'Outperforming' },
    { title: 'Most Bearish Sector', value: sectors[sectors.length - 1]?.name || '--', icon: TrendingDown, change: `${sectors[sectors.length - 1]?.changePercent ? sectors[sectors.length - 1].changePercent + '%' : '--'}`, color: 'text-danger', bg: 'bg-rose-50', border: 'border-rose-100', badge: 'Underperforming' },
    { title: 'Best Momentum', value: sectors[1]?.name || sectors[0]?.name || '--', icon: Zap, change: `${sectors[1]?.changePercent ? '+' + sectors[1].changePercent + '%' : '--'}`, color: 'text-primary', bg: 'bg-primary-light', border: 'border-[#E2E8F0]', badge: 'Strong Inflows' },
    { title: 'Top Volume', value: sectors[2]?.name || sectors[0]?.name || '--', icon: BarChart3, change: `${sectors[2]?.changePercent ? '+' + sectors[2].changePercent + '%' : '--'}`, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', badge: 'FII Buying' },
  ] : [];

  const featuredReports = researchCalls.slice(0, 3).map(call => ({
    company: call.companyName,
    symbol: call.symbol,
    sector: call.sector,
    rating: call.recommendation,
    target: `₹${call.targetPrice}`,
    current: `₹${call.currentPrice}`,
    upside: `+${call.potentialReturn}%`,
    risk: call.riskLevel,
    confidence: call.confidenceScore,
    horizon: call.horizon,
    analyst: call.analyst,
    publishedAt: call.publishedTime,
    summary: call.summary,
    thesis: call.thesis,
    gradient: 'from-primary to-indigo-700',
    accentBg: 'bg-primary-light',
    accentText: 'text-primary',
    accentBorder: 'border-[#E2E8F0]'
  }));

  const todayPicks = researchCalls.map(call => ({
    company: call.companyName,
    symbol: call.symbol,
    rating: call.recommendation,
    current: `₹${call.currentPrice}`,
    target: `₹${call.targetPrice}`,
    upside: `+${call.potentialReturn}%`,
    confidence: call.confidenceScore,
    risk: call.riskLevel,
    horizon: call.horizon,
    analyst: call.analyst
  }));

  return (
    <div className="flex flex-col gap-10 w-full text-slate-800 pb-16 animate-in fade-in duration-500">

      {/* ── 1. HERO EDITORIAL BANNER ── */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#060D1F] text-white border border-slate-800/60 shadow-2xl min-h-[280px] flex flex-col justify-between">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-primary/25 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',backgroundSize:'40px 40px'}} />

        <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-8 md:px-12 py-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Live Research Feed</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-xs font-bold text-slate-400">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <button 
            onClick={fetchOverviewData} 
            disabled={loading}
            className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/25 px-3 py-1.5 rounded-full hover:bg-emerald-500/25 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-[11px] font-black text-emerald-400">
              {loading ? 'Fetching Backend Data...' : 'API Integration Ready'}
            </span>
          </button>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 px-8 md:px-12 py-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase text-[#64748B] tracking-widest block mb-2">Research Dashboard</span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white leading-[1.1] mb-3">
              Stock Research & Advisory Hub
            </h1>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
              Connected directly to backend market data APIs and Groq AI research feeds.
            </p>
          </div>

          <div className="flex flex-col gap-4 shrink-0 w-full lg:w-auto">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Active Research Calls', value: `${researchCalls.length}`, icon: Radio },
                { label: 'Market Indices', value: `${indices.length}`, icon: Activity },
                { label: 'Sector Feeds', value: `${sectors.length}`, icon: BarChart3 },
                { label: 'API Status', value: loading ? 'Syncing...' : 'Connected', icon: ShieldCheck },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white/8 border border-white/12 p-3.5 rounded-2xl backdrop-blur-sm">
                    <Icon className="w-4 h-4 text-[#64748B] mb-1.5" />
                    <div className="text-lg font-black text-white">{stat.value}</div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. LIVE MARKET SNAPSHOT STRIP ── */}
      <div className="bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Live Market Snapshot</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
            {indices.length} Indices Loaded
          </div>
        </div>
        {marketSnapshot.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {marketSnapshot.map((item, i) => (
              <div key={i} className="flex flex-col gap-1 p-3.5 bg-slate-50/60 border border-slate-100 rounded-2xl hover:border-primary-light transition">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{item.label}</span>
                <span className="text-sm font-black text-slate-900">{item.value}</span>
                <div className="flex items-center gap-1">
                  {item.positive
                    ? <TrendingUp className="w-3 h-3 text-emerald-500" />
                    : <TrendingDown className="w-3 h-3 text-danger" />
                  }
                  <span className={`text-[10px] font-black ${item.positive ? 'text-emerald-600' : 'text-danger'}`}>
                    {item.pct}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
            <Inbox className="w-6 h-6 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-500">No live market indices returned from API</p>
            <p className="text-[10px] text-slate-400 mt-1">Backend endpoint: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700">/api/v1/market/indices</code></p>
          </div>
        )}
      </div>

      {/* ── 3. FEATURED RESEARCH CARDS ── */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Featured Research Reports</h2>
              <span className="text-[10px] text-slate-400 font-bold">Top analyst picks from backend feed</span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-400">Showing {featuredReports.length} calls</span>
        </div>

        {featuredReports.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredReports.map((r, i) => (
              <motion.div
                key={r.symbol + i}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -6 }}
                onClick={() => onSelectResearchCall?.(r)}
                className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group relative"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${r.gradient}`} />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${r.accentBg} ${r.accentText} ${r.accentBorder}`}>
                        {r.rating}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg">
                        {r.horizon}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] font-bold text-slate-400">AI:</span>
                      <span className="text-[10px] font-black text-slate-900">{r.confidence}%</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                      {r.company}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-slate-400">{r.symbol}</span>
                      <span className="text-slate-200">•</span>
                      <span className="text-[10px] font-bold text-slate-400">{r.sector}</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 font-medium mb-4">
                    {r.summary}
                  </p>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 p-3 rounded-2xl mb-5">
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block font-black mb-0.5">Current</span>
                      <span className="text-xs font-black text-slate-900">{r.current}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block font-black mb-0.5">Target</span>
                      <span className="text-xs font-black text-emerald-600">{r.target}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-slate-400 block font-black mb-0.5">Upside</span>
                      <span className="text-xs font-black text-emerald-600">{r.upside}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-black text-slate-700 block leading-none">{r.analyst}</span>
                    </div>
                    <span className="text-xs font-black text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
                      Full Report <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white border border-dashed border-slate-200 rounded-[28px] p-8">
            <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-black text-slate-700">No active research reports returned</p>
            <p className="text-xs text-slate-400 mt-1">Backend endpoint: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">/api/v1/research/calls</code></p>
          </div>
        )}
      </div>

      {/* ── 4. AI QUICK INSIGHTS ── */}
      {quickInsights.length > 0 && (
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-600" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">AI Sector Intelligence</h2>
              <span className="text-[10px] text-slate-400 font-bold">Real-time sector & flow analysis</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickInsights.map((insight, idx) => {
              const Icon = insight.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-[22px] p-5 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${insight.bg} ${insight.border}`}>
                      <Icon className={`w-4.5 h-4.5 ${insight.color}`} />
                    </div>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${insight.bg} ${insight.color} ${insight.border}`}>
                      {insight.badge}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block mb-1">{insight.title}</span>
                    <span className="text-lg font-black text-slate-900 block">{insight.value}</span>
                    <span className={`text-sm font-black ${insight.color} block mt-0.5`}>{insight.change}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 5. TODAY'S RESEARCH PICKS — TABLE ── */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Research Call Table</h2>
              <span className="text-[10px] text-slate-400 font-bold">Direct backend advisory feed</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              {todayPicks.length} Calls Active
            </span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-xs">
          {todayPicks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60">
                    <th className="py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Company</th>
                    <th className="py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Signal</th>
                    <th className="py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Current</th>
                    <th className="py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Target</th>
                    <th className="py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Upside</th>
                    <th className="py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">Risk</th>
                    <th className="py-4 px-6 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {todayPicks.map((pick, i) => (
                    <tr key={i} className="hover:bg-primary-light/30 transition group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                            {pick.symbol.substring(0, 2)}
                          </div>
                          <div>
                            <span className="text-xs font-black text-slate-900 block">{pick.company}</span>
                            <span className="text-[10px] text-slate-400 font-bold">{pick.symbol} · {pick.analyst}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${
                          pick.rating === 'BUY' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          pick.rating === 'SELL' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {pick.rating}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs font-black text-slate-700">{pick.current}</td>
                      <td className="py-4 px-6 text-xs font-black text-slate-900">{pick.target}</td>
                      <td className="py-4 px-6 text-xs font-black text-emerald-600">{pick.upside}</td>
                      <td className="py-4 px-6">
                        <span className="text-[9px] font-black px-2 py-0.5 rounded border bg-slate-50 text-slate-700 border-slate-200">{pick.risk}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => onSelectResearchCall?.(pick)}
                          className="text-[10px] font-black text-primary hover:text-primary-dark inline-flex items-center gap-1 bg-primary-light hover:bg-primary-light px-3 py-1.5 rounded-xl transition cursor-pointer"
                        >
                          Read Report <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center p-8">
              <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-black text-slate-700">No active research call items</p>
              <p className="text-xs text-slate-400 mt-1">Backend endpoint: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">GET /api/v1/research/calls</code></p>
            </div>
          )}

          <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400">All calls fetched dynamically from backend endpoints.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
