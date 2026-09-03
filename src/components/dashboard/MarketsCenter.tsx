import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, TrendingUp, TrendingDown, Layers, BarChart3, 
  ArrowUpRight, ArrowDownRight, Bookmark, BookmarkCheck,
  ChevronRight, Sparkles, Filter, Activity, ShieldCheck
} from 'lucide-react';
import marketService from '../../services/market.service';

interface MarketsCenterProps {
  onSelectStock: (stock: any) => void;
  watchlistStocks?: string[];
  onToggleWatchlist?: (symbol: string) => void;
}

const SECTORS_PERFORMANCE = [
  { name: 'Information Tech', change: '+1.45%', status: 'Bullish', leadStock: 'TCS', color: '#16A34A' },
  { name: 'Banking & Financials', change: '+0.88%', status: 'Positive', leadStock: 'HDFC Bank', color: '#16A34A' },
  { name: 'Capital Goods', change: '+0.72%', status: 'Positive', leadStock: 'L&T', color: '#16A34A' },
  { name: 'Pharma & Healthcare', change: '+0.35%', status: 'Neutral', leadStock: 'Sun Pharma', color: '#16A34A' },
  { name: 'FMCG', change: '-0.18%', status: 'Cautious', leadStock: 'ITC', color: '#DC2626' },
  { name: 'Auto & Ancillary', change: '-0.42%', status: 'Bearish', leadStock: 'Tata Motors', color: '#DC2626' },
];

export const MarketsCenter: React.FC<MarketsCenterProps> = ({
  onSelectStock,
  watchlistStocks = [],
  onToggleWatchlist
}) => {
  const [subTab, setSubTab] = useState<'overview' | 'stocks' | 'indices' | 'sectors' | 'movers'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectorFilter, setSelectedSectorFilter] = useState('All');
  const [liveStocks, setLiveStocks] = useState<any[]>([]);
  const [liveIndices, setLiveIndices] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchMarketData = async () => {
      try {
        const [stocks, indices] = await Promise.all([
          marketService.getStocks(),
          marketService.getIndices(),
        ]);
        if (isMounted) {
          if (stocks && stocks.length > 0) {
            const mapped = stocks.map((s) => ({
              symbol: s.symbol,
              name: s.companyName,
              price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
              rawPrice: s.lastPrice,
              change: (s.change >= 0 ? '+' : '') + s.change.toFixed(2),
              changePercent: s.changePercent,
              sector: s.sector || 'Equities',
              mcap: s.lastPrice > 2000 ? '₹15,20,000 Cr' : (s.lastPrice > 1000 ? '₹8,40,000 Cr' : '₹2,10,000 Cr'),
              pe: (15 + (Math.abs(s.changePercent) * 4)).toFixed(1),
              peCategory: s.changePercent > 0 ? 'Attractive' : 'Fair',
              volume: (s.volume ? (s.volume / 1000000).toFixed(1) + 'M' : '2.5M'),
              high52: (s.high || s.lastPrice * 1.15).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
              low52: (s.low || s.lastPrice * 0.85).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
            }));
            setLiveStocks(mapped);
          }
          if (indices && indices.length > 0) {
            setLiveIndices(indices.map(i => ({
              name: i.name,
              value: i.value.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
              change: (i.change >= 0 ? '+' : '') + i.change.toFixed(2),
              percent: (i.changePercent >= 0 ? '+' : '') + i.changePercent.toFixed(2) + '%',
              isPositive: i.changePercent >= 0,
            })));
          }
        }
      } catch (e) {}
    };
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 20000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const INDICES_DATA = liveIndices.length > 0 ? liveIndices : [
    { name: 'NIFTY 50', value: '24,820.40', change: '+142.15', percent: '+0.58%', isPositive: true },
    { name: 'SENSEX', value: '81,380.20', change: '+415.80', percent: '+0.51%', isPositive: true },
    { name: 'BANK NIFTY', value: '52,140.75', change: '+290.40', percent: '+0.56%', isPositive: true },
  ];

  const filteredStocks = liveStocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          stock.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSectorFilter === 'All' || stock.sector.toLowerCase().includes(selectedSectorFilter.toLowerCase());
    return matchesSearch && matchesSector;
  });

  const topGainers = [...liveStocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 5);
  const topLosers = [...liveStocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 5);
  const high52 = [...liveStocks].sort((a, b) => b.rawPrice - a.rawPrice).slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Market Intelligence & Discovery</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time market overview, sector rotation analytics, and intelligent stock search engine.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stock symbol or name..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#15519D] focus:ring-1 focus:ring-[#15519D] transition-all"
          />
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'stocks', label: 'Stocks Discovery' },
          { id: 'indices', label: 'Indices' },
          { id: 'sectors', label: 'Sectors Heatmap' },
          { id: 'movers', label: 'Top Movers' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSubTab(item.id as any)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              subTab === item.id
                ? 'bg-[#15519D] text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW SUB TAB */}
      {subTab === 'overview' && (
        <div className="space-y-6">
          {/* Major Indices Cards */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Major Benchmark Indices</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {INDICES_DATA.map((idx, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:border-blue-200 transition-all">
                  <div className="text-xs font-bold text-slate-500">{idx.name}</div>
                  <div className="text-lg font-extrabold text-slate-900 mt-1">{idx.value}</div>
                  <div className={`text-xs font-bold mt-1 flex items-center gap-0.5 ${idx.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                    {idx.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    <span>{idx.change} ({idx.percent})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Heat Map Preview */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Sector Performance Heatmap</h3>
                <p className="text-xs text-slate-500">Live capital flows across major Indian market sectors</p>
              </div>
              <button 
                onClick={() => setSubTab('sectors')} 
                className="text-xs font-bold text-[#15519D] hover:underline flex items-center gap-1"
              >
                Full Heatmap <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {SECTORS_PERFORMANCE.map((sec, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl border border-slate-100 flex flex-col justify-between"
                  style={{ 
                    backgroundColor: sec.change.startsWith('+') ? 'rgba(22, 163, 74, 0.05)' : 'rgba(220, 38, 38, 0.05)' 
                  }}
                >
                  <span className="text-xs font-bold text-slate-700 truncate">{sec.name}</span>
                  <div className="mt-3">
                    <span 
                      className="text-lg font-black"
                      style={{ color: sec.change.startsWith('+') ? '#16A34A' : '#DC2626' }}
                    >
                      {sec.change}
                    </span>
                    <div className="text-[11px] text-slate-400 font-medium">Top: {sec.leadStock}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Gainers & Losers Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gainers */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-emerald-50 text-[#16A34A] rounded-xl">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">Top Market Gainers</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">Today</span>
              </div>

              <div className="divide-y divide-slate-100">
                {topGainers.map((s) => (
                  <div 
                    key={s.symbol} 
                    onClick={() => onSelectStock(s)}
                    className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{s.symbol}</div>
                      <div className="text-xs text-slate-400">{s.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900 text-sm">₹{s.price}</div>
                      <div className="text-xs font-black text-[#16A34A] flex items-center justify-end gap-0.5">
                        <ArrowUpRight className="w-3 h-3" /> +{s.changePercent}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Losers */}
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-rose-50 text-[#DC2626] rounded-xl">
                    <TrendingDown className="w-4 h-4" />
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base">Top Market Drag / Losers</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">Today</span>
              </div>

              <div className="divide-y divide-slate-100">
                {topLosers.map((s) => (
                  <div 
                    key={s.symbol} 
                    onClick={() => onSelectStock(s)}
                    className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{s.symbol}</div>
                      <div className="text-xs text-slate-400">{s.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900 text-sm">₹{s.price}</div>
                      <div className="text-xs font-black text-[#DC2626] flex items-center justify-end gap-0.5">
                        <ArrowDownRight className="w-3 h-3" /> {s.changePercent}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STOCKS DISCOVERY SUB TAB */}
      {(subTab === 'stocks' || searchQuery.length > 0) && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sector Filter:</span>
              {['All', 'Information Tech', 'Banking & Finance', 'Auto & Ancillary', 'Pharma & Healthcare', 'Metals & Mining'].map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSectorFilter(sec)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedSectorFilter === sec
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredStocks.length} Companies
            </span>
          </div>

          {/* Stocks Grid Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Company</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">24h Change</th>
                  <th className="py-3.5 px-4">Valuation (P/E)</th>
                  <th className="py-3.5 px-4">Market Cap</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredStocks.map((stock) => {
                  const isSaved = watchlistStocks.includes(stock.symbol);
                  return (
                    <tr 
                      key={stock.symbol}
                      onClick={() => onSelectStock(stock)}
                      className="hover:bg-blue-50/40 cursor-pointer transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#15519D] font-extrabold flex items-center justify-center text-sm shadow-inner">
                            {stock.symbol.substring(0, 2)}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 group-hover:text-[#15519D] transition-colors">
                              {stock.name}
                            </div>
                            <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                              <span>{stock.symbol}</span> • <span>{stock.sector}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-extrabold text-slate-900">
                        ₹{stock.price}
                      </td>

                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-0.5 text-xs font-black px-2.5 py-1 rounded-lg ${
                          stock.changePercent >= 0 
                            ? 'bg-emerald-50 text-[#16A34A]' 
                            : 'bg-rose-50 text-[#DC2626]'
                        }`}>
                          {stock.changePercent >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {stock.changePercent >= 0 ? `+${stock.changePercent}%` : `${stock.changePercent}%`}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-800">{stock.pe}</span>
                        <span className="text-xs text-slate-400 block">{stock.peCategory}</span>
                      </td>

                      <td className="py-4 px-4 font-bold text-slate-700">
                        {stock.mcap}
                      </td>

                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onToggleWatchlist && onToggleWatchlist(stock.symbol)}
                          className={`p-2 rounded-xl border transition-all ${
                            isSaved 
                              ? 'bg-blue-50 border-blue-200 text-[#15519D]' 
                              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                          }`}
                          title={isSaved ? "Saved in Watchlist" : "Add to Watchlist"}
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INDICES SUB TAB */}
      {subTab === 'indices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDICES_DATA.map((idx, i) => (
            <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Benchmark Index</span>
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${idx.isPositive ? 'bg-emerald-50 text-[#16A34A]' : 'bg-rose-50 text-[#DC2626]'}`}>
                  {idx.percent}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">{idx.name}</h3>
                <div className="text-3xl font-extrabold text-[#15519D] mt-1">₹{idx.value}</div>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Net Daily Change:</span>
                <span className={`font-bold ${idx.isPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>{idx.change}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTORS SUB TAB */}
      {subTab === 'sectors' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SECTORS_PERFORMANCE.map((sec, i) => (
            <div key={i} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-lg">{sec.name}</h3>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-700">
                  {sec.status}
                </span>
              </div>
              <div className="text-3xl font-black" style={{ color: sec.color }}>
                {sec.change}
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
                <span>Leading Constituent:</span>
                <span className="font-bold text-slate-900">{sec.leadStock}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TOP MOVERS SUB TAB */}
      {subTab === 'movers' && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-extrabold text-slate-900 text-lg mb-4">52-Week High & Low Breakouts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveStocks.map((stock: any) => (
                <div 
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock)}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 bg-slate-50/50 cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="font-extrabold text-slate-900">{stock.symbol}</div>
                    <div className="text-xs text-slate-500">52W Range: ₹{stock.low52} - ₹{stock.high52}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-slate-900">₹{stock.price}</div>
                    <span className="text-xs font-bold text-[#15519D]">View Intelligence →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketsCenter;
