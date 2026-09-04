import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, TrendingUp, Award, ShieldAlert, ArrowUpRight, ArrowRight, ChevronRight, Zap } from 'lucide-react';

interface SmallCapIntelligenceProps {
  onSelectStock: (stock: any) => void;
}

export const SmallCapIntelligence: React.FC<SmallCapIntelligenceProps> = ({ onSelectStock }) => {
  const [activeLens, setActiveLens] = useState<'Emerging' | 'Growth' | 'Momentum' | 'Value' | 'Quality'>('Emerging');

  const lensData: Record<string, any[]> = {
    Emerging: [
      { symbol: 'KAYNES', companyName: 'Kaynes Technology India', price: '4,850.00', return1Y: '+84.2%', mcap: '₹28,400 Cr', revGrowth: '+42.5%', profitGrowth: '+58.1%', roe: '21.4%', debt: '0.18', score: 86, risk: 'Moderate', riskBadge: 'bg-amber-50 text-amber-700' },
      { symbol: 'NETWEB', companyName: 'Netweb Technologies Ltd', price: '2,420.00', return1Y: '+112.5%', mcap: '₹13,600 Cr', revGrowth: '+68.2%', profitGrowth: '+74.0%', roe: '28.9%', debt: '0.05', score: 87, risk: 'Moderate', riskBadge: 'bg-amber-50 text-amber-700' },
      { symbol: 'DATAATT', companyName: 'Data Patterns (India) Ltd', price: '3,140.00', return1Y: '+46.8%', mcap: '₹17,500 Cr', revGrowth: '+31.4%', profitGrowth: '+39.2%', roe: '22.8%', debt: '0.02', score: 83, risk: 'Low', riskBadge: 'bg-emerald-50 text-emerald-700' },
      { symbol: 'PARAS', companyName: 'Paras Defence & Space', price: '1,120.00', return1Y: '+62.4%', mcap: '₹4,370 Cr', revGrowth: '+38.0%', profitGrowth: '+44.5%', roe: '18.2%', debt: '0.12', score: 81, risk: 'Elevated', riskBadge: 'bg-rose-50 text-rose-700' }
    ],
    Growth: [
      { symbol: 'NETWEB', companyName: 'Netweb Technologies Ltd', price: '2,420.00', return1Y: '+112.5%', mcap: '₹13,600 Cr', revGrowth: '+68.2%', profitGrowth: '+74.0%', roe: '28.9%', debt: '0.05', score: 87, risk: 'Moderate', riskBadge: 'bg-amber-50 text-amber-700' },
      { symbol: 'SYRMA', companyName: 'Syrma SGS Technology Ltd', price: '645.00', return1Y: '+38.6%', mcap: '₹11,400 Cr', revGrowth: '+48.5%', profitGrowth: '+52.1%', roe: '19.8%', debt: '0.24', score: 82, risk: 'Moderate', riskBadge: 'bg-amber-50 text-amber-700' },
      { symbol: 'IDEAFORGE', companyName: 'ideaForge Technology Ltd', price: '780.00', return1Y: '+24.1%', mcap: '₹3,340 Cr', revGrowth: '+35.2%', profitGrowth: '+41.0%', roe: '16.5%', debt: '0.08', score: 78, risk: 'Elevated', riskBadge: 'bg-rose-50 text-rose-700' }
    ],
    Momentum: [
      { symbol: 'KAYNES', companyName: 'Kaynes Technology India', price: '4,850.00', return1Y: '+84.2%', mcap: '₹28,400 Cr', revGrowth: '+42.5%', profitGrowth: '+58.1%', roe: '21.4%', debt: '0.18', score: 86, risk: 'Moderate', riskBadge: 'bg-amber-50 text-amber-700' },
      { symbol: 'ELECTCAST', companyName: 'Electrosteel Castings Ltd', price: '198.50', return1Y: '+142.0%', mcap: '₹12,100 Cr', revGrowth: '+28.4%', profitGrowth: '+64.2%', roe: '24.1%', debt: '0.45', score: 84, risk: 'Moderate', riskBadge: 'bg-amber-50 text-amber-700' }
    ],
    Value: [
      { symbol: 'APARINDS', companyName: 'Apar Industries Ltd', price: '8,450.00', return1Y: '+54.2%', mcap: '₹34,200 Cr', revGrowth: '+26.4%', profitGrowth: '+32.8%', roe: '29.4%', debt: '0.15', score: 85, risk: 'Low', riskBadge: 'bg-emerald-50 text-emerald-700' },
      { symbol: 'NEWGEN', companyName: 'Newgen Software Tech Ltd', price: '1,240.00', return1Y: '+72.8%', mcap: '₹8,700 Cr', revGrowth: '+28.0%', profitGrowth: '+35.4%', roe: '25.6%', debt: '0.01', score: 84, risk: 'Low', riskBadge: 'bg-emerald-50 text-emerald-700' }
    ],
    Quality: [
      { symbol: 'NEWGEN', companyName: 'Newgen Software Tech Ltd', price: '1,240.00', return1Y: '+72.8%', mcap: '₹8,700 Cr', revGrowth: '+28.0%', profitGrowth: '+35.4%', roe: '25.6%', debt: '0.01', score: 84, risk: 'Low', riskBadge: 'bg-emerald-50 text-emerald-700' },
      { symbol: 'DATAATT', companyName: 'Data Patterns (India) Ltd', price: '3,140.00', return1Y: '+46.8%', mcap: '₹17,500 Cr', revGrowth: '+31.4%', profitGrowth: '+39.2%', roe: '22.8%', debt: '0.02', score: 83, risk: 'Low', riskBadge: 'bg-emerald-50 text-emerald-700' }
    ]
  };

  const currentStocks = lensData[activeLens] || lensData.Emerging;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-2xs">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#15519D] uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>SMALL-CAP INTELLIGENCE</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
            Small-Cap Watch & Fundamental Discovery
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Discover smaller companies exhibiting accelerating earnings, balance sheet strength, or valuation resets.
          </p>
        </div>

        {/* LENS SEGMENTED TABS */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto">
          {[
            { id: 'Emerging', label: 'Emerging Leaders' },
            { id: 'Growth', label: 'Growth Watch' },
            { id: 'Momentum', label: 'Momentum Watch' },
            { id: 'Value', label: 'Value Watch' },
            { id: 'Quality', label: 'Quality Watch' }
          ].map((l) => (
            <button
              key={l.id}
              onClick={() => setActiveLens(l.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeLens === l.id
                  ? 'bg-[#15519D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE WORKSPACE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3">Company & Ticker</th>
              <th className="py-3 px-3">Market Cap</th>
              <th className="py-3 px-3">Current Price</th>
              <th className="py-3 px-3">1Y Return</th>
              <th className="py-3 px-3">Rev Growth</th>
              <th className="py-3 px-3">Profit Growth</th>
              <th className="py-3 px-3">ROE</th>
              <th className="py-3 px-3">Debt/Eq</th>
              <th className="py-3 px-3">ArthSetu Score</th>
              <th className="py-3 px-3">Risk Level</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {currentStocks.map((st) => (
              <tr
                key={st.symbol}
                onClick={() => onSelectStock(st)}
                className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-3">
                  <div className="font-extrabold text-slate-900 text-xs group-hover:text-[#15519D]">
                    {st.companyName}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 font-mono">{st.symbol}</div>
                </td>
                <td className="py-3.5 px-3 font-bold text-slate-600">{st.mcap}</td>
                <td className="py-3.5 px-3 font-extrabold text-slate-900">₹{st.price}</td>
                <td className="py-3.5 px-3 font-extrabold text-emerald-600">{st.return1Y}</td>
                <td className="py-3.5 px-3 font-bold text-slate-800">{st.revGrowth}</td>
                <td className="py-3.5 px-3 font-bold text-slate-800">{st.profitGrowth}</td>
                <td className="py-3.5 px-3 font-bold text-slate-800">{st.roe}</td>
                <td className="py-3.5 px-3 font-bold text-slate-600">{st.debt}</td>
                <td className="py-3.5 px-3">
                  <span className="font-black text-[#15519D] bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {st.score}/100
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${st.riskBadge}`}>
                    {st.risk}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button className="text-[#15519D] font-extrabold text-xs inline-flex items-center gap-1 group-hover:underline">
                    <span>Research</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SmallCapIntelligence;
