import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart3, Search, Filter, ShieldCheck, ArrowUpRight, 
  ChevronRight, Bookmark, ArrowRight, Zap, RefreshCw, LayoutGrid, List
} from 'lucide-react';
import { motion } from 'framer-motion';
import marketService from '../../services/market.service';

export interface StockItem {
  id: string;
  symbol: string;
  companyName: string;
  sector: string;
  marketCapTier: 'Large' | 'Mid' | 'Small' | 'Micro';
  marketCap: number; // Cr
  currentPrice: number;
  changePercent: number;
  peRatio: number;
  dividendYield: number;
  isFNO: boolean;
  isMomentum: boolean;
  volume: string;
}

export const StocksTab: React.FC<{
  onSelectStock: (stock: StockItem) => void;
  onTrade: (stock: StockItem) => void;
}> = ({ onSelectStock, onTrade }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [stocksList, setStocksList] = useState<StockItem[]>([]);
  

  const categories = [
    { key: 'All', label: 'All Stocks' },
    { key: 'Large', label: 'Large Cap' },
    { key: 'Mid', label: 'Mid Cap' },
    { key: 'Momentum', label: 'Momentum Stocks' },
    { key: 'FNO', label: 'F&O Stocks' },
    { key: 'Dividend', label: 'High Dividend' }
  ];

  const sectors = ['All', 'Banking', 'IT', 'Energy', 'Metals', 'Capital Goods', 'Pharma'];

  const { data: fetchedStocks, isLoading } = useQuery({
    queryKey: ['stocks', selectedCategory, searchQuery],
    queryFn: async () => {
      let results;
      if (searchQuery.trim().length > 0) {
        results = await marketService.searchStocks(searchQuery);
      } else {
        results = await marketService.getStocks(selectedCategory.toLowerCase());
      }
      
      if (!results) return [];
      
      return results.map((stk: any, idx: number) => ({
        id: String(idx + 1),
        symbol: stk.symbol,
        companyName: stk.companyName || stk.symbol,
        sector: stk.sector || 'Equities',
        marketCapTier: (stk.marketCap && parseInt(stk.marketCap) > 100000 ? 'Large' : 'Mid') as any,
        marketCap: stk.marketCap ? parseFloat(stk.marketCap) : 50000,
        currentPrice: stk.currentPrice || stk.lastPrice || 0,
        changePercent: stk.changePercent || 0,
        peRatio: stk.peRatio || 20,
        dividendYield: 0.5,
        isFNO: true,
        isMomentum: (stk.changePercent || 0) > 1.0,
        volume: stk.volume ? `${(stk.volume / 1000000).toFixed(1)}M` : '1.0M'
      }));
    }
  });

  const filteredStocks = useMemo(() => {
    let list = fetchedStocks || [];
    if (selectedSector !== 'All') {
      list = list.filter((s: any) => s.sector.toLowerCase().includes(selectedSector.toLowerCase()) || selectedSector.toLowerCase().includes(s.sector.toLowerCase()));
    }
    
    return list.filter((stk) => {
      let matchesCat = true;
      if (selectedCategory === 'Large') matchesCat = stk.marketCapTier === 'Large';
      if (selectedCategory === 'Mid') matchesCat = stk.marketCapTier === 'Mid';
      if (selectedCategory === 'Momentum') matchesCat = stk.isMomentum;
      if (selectedCategory === 'FNO') matchesCat = stk.isFNO;
      if (selectedCategory === 'Dividend') matchesCat = stk.dividendYield > 1.0;

      const matchesSec = selectedSector === 'All' || stk.sector.toLowerCase() === selectedSector.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        stk.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
        stk.companyName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSec && matchesSearch;
    });
  }, [stocksList, selectedCategory, selectedSector, searchQuery]);

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* 2.1 CATEGORY & SECTOR FILTER BAR */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.key
                  ? 'bg-[#172033] text-white font-black'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            {sectors.map((sec) => (
              <option key={sec} value={sec}>Sector: {sec}</option>
            ))}
          </select>

          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
            />
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-white text-primary shadow-2xs' : 'text-slate-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white text-primary shadow-2xs' : 'text-slate-500'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RESULT METRICS */}
      <div className="flex justify-between items-center text-xs font-bold text-slate-500">
        <span>Showing {filteredStocks.length} NSE/BSE Listed Equities</span>
        <span>SEBI Regulated Order Execution</span>
      </div>

      {/* 2.3 STOCK LIST VIEW */}
      {viewMode === 'list' ? (
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs font-medium border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase border-b border-slate-200">
                <th className="py-3.5 px-5">Symbol & Company</th>
                <th className="py-3.5 px-4">Sector</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Change</th>
                <th className="py-3.5 px-4">P/E Ratio</th>
                <th className="py-3.5 px-4">Div Yield</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStocks.map((stk) => (
                <tr key={stk.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-5 cursor-pointer" onClick={() => onSelectStock(stk)}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#172033] text-white font-black text-[11px] flex items-center justify-center">
                        {stk.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-black text-[#172033] text-sm block">{stk.symbol}</span>
                        <span className="text-[10px] text-slate-400 font-medium block truncate max-w-[160px]">{stk.companyName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                      {stk.sector}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900">₹{stk.currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</td>
                  <td className={`py-3.5 px-4 font-black ${stk.changePercent >= 0 ? 'text-emerald-600' : 'text-danger'}`}>
                    {stk.changePercent >= 0 ? `+${stk.changePercent.toFixed(2)}%` : `${stk.changePercent.toFixed(2)}%`}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">{stk.peRatio ? stk.peRatio : 'N/A'}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">{stk.dividendYield}%</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onTrade(stk)}
                      className="px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-black text-xs transition cursor-pointer shadow-2xs"
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStocks.map((stk) => (
            <motion.div
              key={stk.id}
              whileHover={{ y: -3 }}
              className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-black text-base text-[#172033]">{stk.symbol}</h3>
                    <span className="text-xs text-slate-400 font-medium block truncate max-w-[160px]">{stk.companyName}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {stk.sector}
                  </span>
                </div>

                <div className="my-4 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-[#172033]">₹{stk.currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</span>
                  <span className={`text-xs font-black ${stk.changePercent >= 0 ? 'text-emerald-600' : 'text-danger'}`}>
                    {stk.changePercent >= 0 ? `+${stk.changePercent.toFixed(2)}%` : `${stk.changePercent.toFixed(2)}%`}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button onClick={() => onSelectStock(stk)} className="text-xs font-black text-slate-600 hover:text-primary cursor-pointer">
                  Details
                </button>
                <button onClick={() => onTrade(stk)} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black cursor-pointer shadow-xs">
                  Trade
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StocksTab;
