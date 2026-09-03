import React, { useState } from 'react';
import { Layers, ArrowUpRight, Search, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const ETFsTab: React.FC<{
  onTrade: (etf: any) => void;
}> = ({ onTrade }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const etfs = [
    { id: 'etf-1', name: 'Nippon India Nifty 50 BeES ETF', symbol: 'NIFTYBEES', category: 'Index', price: 242.10, change: '+0.68%', trackingError: '0.04%', expense: '0.05%', aum: '₹18,400 Cr' },
    { id: 'etf-2', name: 'Nippon India Gold ETF BeES', symbol: 'GOLDBEES', category: 'Gold', price: 64.50, change: '+0.42%', trackingError: '0.02%', expense: '0.10%', aum: '₹9,800 Cr' },
    { id: 'etf-3', name: 'SBI Nifty Bank ETF', symbol: 'BANKBEES', category: 'Sector', price: 482.50, change: '+0.45%', trackingError: '0.06%', expense: '0.15%', aum: '₹12,100 Cr' },
    { id: 'etf-4', name: 'Motilal Oswal Nasdaq 100 ETF', symbol: 'MON100', category: 'International', price: 142.80, change: '+1.40%', trackingError: '0.12%', expense: '0.50%', aum: '₹6,400 Cr' }
  ];

  const filteredEtfs = etfs.filter((e) => selectedCategory === 'All' || e.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* CATEGORY BAR */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 shadow-xs flex items-center gap-2 overflow-x-auto text-xs font-bold no-scrollbar">
        {['All', 'Index', 'Gold', 'Sector', 'International'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#172033] text-white font-black'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat} ETFs
          </button>
        ))}
      </div>

      {/* ETF CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEtfs.map((etf) => (
          <motion.div
            key={etf.id}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded border border-cyan-200">
                  {etf.category} ETF
                </span>
                <span className="text-xs font-mono font-black text-slate-900">{etf.symbol}</span>
              </div>

              <h3 className="font-black text-base text-[#172033] mb-3">{etf.name}</h3>

              <div className="flex items-baseline justify-between mb-4">
                <span className="text-2xl font-black text-slate-900">₹{etf.price.toFixed(2)}</span>
                <span className="text-xs font-black text-emerald-600">{etf.change}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl text-xs font-bold">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Expense</span>
                  <span className="text-slate-900 font-black">{etf.expense}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Tracking Error</span>
                  <span className="text-slate-900 font-black">{etf.trackingError}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">AUM</span>
                  <span className="text-slate-900 font-black">{etf.aum}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => onTrade({ symbol: etf.symbol, company: etf.name })}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                Trade ETF
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ETFsTab;
