import React from 'react';
import { 
  BarChart3, Compass, Gem, Rocket, Sparkles, TrendingUp, ArrowUpRight, 
  Flame, Zap, Layers, ArrowRight, ShieldCheck, PieChart, Coins
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AllProductsTabProps {
  onSelectCategory: (categoryKey: string) => void;
  onSelectStock: (stock: any) => void;
  onTrade: (stock: any) => void;
}

export const AllProductsTab: React.FC<AllProductsTabProps> = ({
  onSelectCategory,
  onSelectStock,
  onTrade
}) => {
  const assetOverviewCards = [
    { key: 'stocks', title: 'Equities & Stocks', metric: '12,500+ Listed', trend: '+1.4% Today', icon: BarChart3, color: 'from-primary to-indigo-700', badge: 'Popular' },
    { key: 'mutual_funds', title: 'Mutual Funds & SIP', metric: '1,500+ Schemes', trend: 'Direct 0% Commission', icon: PieChart, color: 'from-emerald-600 to-teal-700', badge: 'High Yield' },
    { key: 'etfs', title: 'Exchange Traded Funds', metric: '320 Active ETFs', trend: 'Low Cost Indexing', icon: Layers, color: 'from-cyan-600 to-[#5A35F0]', badge: 'Passive' },
    { key: 'ipos', title: 'IPOs & New Listings', metric: '4 Open Today', trend: 'High GMP Signals', icon: Rocket, color: 'from-purple-600 to-indigo-800', badge: '4 Open' },
    { key: 'gold', title: 'Sovereign & Digital Gold', metric: '₹7,240 / gram', trend: '2.5% Govt Interest', icon: Gem, color: 'from-amber-500 to-orange-600', badge: 'Safe Haven' },
    { key: 'commodities', title: 'MCX Commodities', metric: '24 Futures & Options', trend: 'Crude & Silver Volatile', icon: Coins, color: 'from-[#172033] to-slate-900', badge: 'F&O' }
  ];

  const marketMovers = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', category: 'Stock', price: '₹2,934.50', change: '+1.25%', positive: true },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', category: 'Stock', price: '₹1,682.40', change: '+0.85%', positive: true },
    { symbol: 'NIFTYBEES', name: 'Nippon India Nifty ETF', category: 'ETF', price: '₹242.10', change: '+0.68%', positive: true },
    { symbol: 'GOLDBEES', name: 'Nippon Gold ETF', category: 'Gold ETF', price: '₹64.50', change: '+0.42%', positive: true },
    { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', category: 'Stock', price: '₹147.20', change: '+2.40%', positive: true }
  ];

  return (
    <div className="flex flex-col gap-8 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* 1.1 ASSET OVERVIEW CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-black text-[#172033] flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" /> Explore Asset Classes
          </h2>
          <span className="text-xs font-bold text-slate-400">SEBI Registered Investment Hub</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {assetOverviewCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.key}
                whileHover={{ y: -3 }}
                onClick={() => onSelectCategory(card.key)}
                className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-xl hover:border-primary-light transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase text-primary bg-primary-light border border-primary-light px-2.5 py-0.5 rounded-full">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-black text-lg text-[#172033] group-hover:text-primary transition-colors mb-1">
                    {card.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-500 block mb-2">{card.metric}</span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="text-emerald-600">{card.trend}</span>
                  <span className="text-primary font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 1.2 TOP MARKET MOVERS ACROSS ASSET CLASSES */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-sm text-[#172033] flex items-center gap-2">
            <Flame className="w-4 h-4 text-danger fill-rose-500" /> Top Market Movers Across Assets
          </h3>
          <span className="text-xs font-bold text-slate-400">Live Tickers</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {marketMovers.map((mover) => (
            <div
              key={mover.symbol}
              onClick={() => onSelectStock({ symbol: mover.symbol, company: mover.name })}
              className="p-3.5 bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl flex flex-col justify-between cursor-pointer transition"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-black text-xs text-[#172033]">{mover.symbol}</span>
                  <span className="text-[9px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 uppercase">
                    {mover.category}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium block truncate mb-2">{mover.name}</span>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-slate-200/60">
                <span className="text-xs font-black text-slate-900">{mover.price}</span>
                <span className="text-[10px] font-black text-emerald-600">{mover.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AllProductsTab;
