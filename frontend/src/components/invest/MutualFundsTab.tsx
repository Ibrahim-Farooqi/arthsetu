import React, { useState } from 'react';
import { 
  PieChart, Star, ShieldCheck, ArrowRight, Zap, RefreshCw, Filter, Search, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const MutualFundsTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const funds = [
    {
      id: 'mf-1',
      name: 'Quant Small Cap Fund Direct-Growth',
      category: 'Small Cap',
      amc: 'Quant AMC',
      rating: 5,
      aum: '₹14,580 Cr',
      expenseRatio: '0.77%',
      return3Y: '38.4%',
      minSIP: '₹500',
      risk: 'Very High'
    },
    {
      id: 'mf-2',
      name: 'Parag Parikh Flexi Cap Fund Direct-Growth',
      category: 'Flexi Cap',
      amc: 'PPFAS AMC',
      rating: 5,
      aum: '₹62,400 Cr',
      expenseRatio: '0.62%',
      return3Y: '24.2%',
      minSIP: '₹1,000',
      risk: 'Moderate'
    },
    {
      id: 'mf-3',
      name: 'Mirae Asset Large Cap Fund Direct-Growth',
      category: 'Large Cap',
      amc: 'Mirae Asset AMC',
      rating: 4,
      aum: '₹38,200 Cr',
      expenseRatio: '0.54%',
      return3Y: '18.6%',
      minSIP: '₹500',
      risk: 'Low'
    },
    {
      id: 'mf-4',
      name: 'Axis ELSS Tax Saver Fund Direct-Growth',
      category: 'ELSS Tax Saver',
      amc: 'Axis AMC',
      rating: 4,
      aum: '₹31,500 Cr',
      expenseRatio: '0.72%',
      return3Y: '16.8%',
      minSIP: '₹500',
      risk: 'Moderate'
    }
  ];

  const filteredFunds = funds.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.amc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* 3.1 CATEGORY & SEARCH BAR */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold w-full md:w-auto no-scrollbar">
          {['All', 'Flexi Cap', 'Small Cap', 'Large Cap', 'ELSS Tax Saver'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#172033] text-white font-black'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search mutual funds or AMC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
          />
        </div>
      </div>

      {/* 3.3 FUND CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFunds.map((fund) => (
          <motion.div
            key={fund.id}
            whileHover={{ y: -3 }}
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-primary bg-primary-light border border-primary-light px-2 py-0.5 rounded">
                    {fund.category}
                  </span>
                  <h3 className="font-black text-base text-[#172033] mt-1.5 leading-snug">{fund.name}</h3>
                </div>

                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{fund.rating}.0</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl my-4 text-xs font-bold">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">3Y Annual Return</span>
                  <span className="text-emerald-600 font-black text-sm">{fund.return3Y}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Min Monthly SIP</span>
                  <span className="text-slate-900 font-black">{fund.minSIP}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Expense Ratio</span>
                  <span className="text-slate-700 font-black">{fund.expenseRatio}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">AUM: {fund.aum}</span>
              <button
                onClick={() => toast.success(`SIP Registration Initiated for ${fund.name}`)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
              >
                Start SIP (0% Fee)
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MutualFundsTab;
