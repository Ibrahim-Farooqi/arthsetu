import React from 'react';
import { Gem, ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const GoldTab: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full font-sans text-slate-800 animate-in fade-in duration-300">
      
      {/* GOLD TICKER BANNER */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 rounded-[24px] shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
            <Gem className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-200 bg-black/20 px-2 py-0.5 rounded">Live 24K Gold Rate</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-black">₹7,240.00 / gram</span>
              <span className="text-xs font-bold text-amber-200">+₹42.50 (+0.58%)</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => toast.success('Digital Gold Buy Modal Triggered')}
          className="px-5 py-3 bg-white hover:bg-amber-50 text-amber-900 rounded-xl font-black text-xs transition shadow-xs cursor-pointer"
        >
          Buy Digital Gold (24K 99.9% Purity)
        </button>
      </div>

      {/* INVESTMENT OPTIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Option 1: SGB */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="font-black text-base text-[#172033] mb-1">Sovereign Gold Bonds (SGB)</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
              Issued by RBI on behalf of Govt of India. Earns 2.50% p.a. guaranteed interest + gold appreciation. Zero capital gains tax on maturity.
            </p>
          </div>
          <button
            onClick={() => toast.success('SGB Issue Tranche Selected')}
            className="w-full py-2.5 bg-[#172033] hover:bg-slate-800 text-white rounded-xl text-xs font-black transition cursor-pointer"
          >
            Invest in SGB (RBI Tranche)
          </button>
        </div>

        {/* Option 2: Gold ETFs */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-black text-base text-[#172033] mb-1">Gold ETFs (GOLDBEES)</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
              Trade physical gold backed units on NSE/BSE instantly with zero storage cost and high liquidity.
            </p>
          </div>
          <button
            onClick={() => toast.success('Order drawer triggered for GOLDBEES')}
            className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black transition cursor-pointer"
          >
            Trade GOLDBEES ETF
          </button>
        </div>

        {/* Option 3: Digital Gold */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="font-black text-base text-[#172033] mb-1">Digital Gold (From ₹10)</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
              Buy fractional 24K 99.9% pure physical gold stored safely in MMTC-PAMP vaults with 100% insurance.
            </p>
          </div>
          <button
            onClick={() => toast.success('Digital Gold Quick Buy Initiated')}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition cursor-pointer"
          >
            Buy 24K Digital Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoldTab;
