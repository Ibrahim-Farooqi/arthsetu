import React, { useState } from 'react';
import { Coins, Flame, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const CommoditiesTab: React.FC<{
  onTrade: (item: any) => void;
}> = ({ onTrade }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const commodities = [
    { id: 'comm-1', name: 'Crude Oil Futures', symbol: 'CRUDEOIL', category: 'Energy', exchange: 'MCX', price: '₹6,480.00', unit: '100 BBL', change: '+1.85%', volume: '142K' },
    { id: 'comm-2', name: 'Silver Futures', symbol: 'SILVER', category: 'Metals', exchange: 'MCX', price: '₹88,450.00', unit: '30 KG', change: '+1.10%', volume: '88K' },
    { id: 'comm-3', name: 'Natural Gas Futures', symbol: 'NATURALGAS', category: 'Energy', exchange: 'MCX', price: '₹194.20', unit: '1250 mmBtu', change: '-2.40%', volume: '210K' },
    { id: 'comm-4', name: 'Copper Futures', symbol: 'COPPER', category: 'Metals', exchange: 'MCX', price: '₹842.10', unit: '2500 KG', change: '+0.75%', volume: '45K' }
  ];

  const filteredCommodities = commodities.filter((c) => selectedCategory === 'All' || c.category === selectedCategory);

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* CATEGORY FILTER BAR */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 shadow-xs flex items-center gap-2 overflow-x-auto text-xs font-bold no-scrollbar">
        {['All', 'Energy', 'Metals'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#172033] text-white font-black'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat} Commodities
          </button>
        ))}
      </div>

      {/* COMMODITY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCommodities.map((comm) => (
          <motion.div
            key={comm.id}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase bg-[#172033] text-white px-2 py-0.5 rounded">
                  MCX {comm.category}
                </span>
                <span className="text-xs font-mono font-black text-slate-900">{comm.symbol}</span>
              </div>

              <h3 className="font-black text-base text-[#172033] mb-3">{comm.name}</h3>

              <div className="flex items-baseline justify-between mb-4">
                <span className="text-2xl font-black text-slate-900">{comm.price}</span>
                <span className={`text-xs font-black ${comm.change.startsWith('+') ? 'text-emerald-600' : 'text-danger'}`}>
                  {comm.change}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl text-xs font-bold">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Lot Unit</span>
                  <span className="text-slate-900 font-black">{comm.unit}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Daily Volume</span>
                  <span className="text-slate-900 font-black">{comm.volume}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => onTrade({ symbol: comm.symbol, company: comm.name })}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black cursor-pointer shadow-xs"
              >
                Trade MCX Futures
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommoditiesTab;
