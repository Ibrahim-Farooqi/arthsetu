import React, { useState, useEffect } from 'react';
import { 
  X, Clock, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, 
  Layers, Sun, Moon, ArrowRight, Zap, Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TradingHoursModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TradingHoursModal: React.FC<TradingHoursModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeSegment, setActiveSegment] = useState<'Equity' | 'MCX' | 'Currency' | 'Block' | 'Settlement'>('Equity');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  // Format current IST time
  const istTimeStr = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-white rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col my-auto font-sans text-slate-800"
        >
          {/* Header */}
          <div className="bg-[#172033] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute right-5 top-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/20 text-[#64748B] border border-primary-light/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#64748B]" /> SEBI Approved Session Timings
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  <Clock className="w-6 h-6 text-[#64748B]" /> Indian Stock Market Trading Hours
                </h2>
                <p className="text-slate-400 text-xs mt-1">Official trading session hours, pre-open timings & block deal windows</p>
              </div>

              {/* Live Clock Badge */}
              <div className="p-3 bg-white/10 border border-white/15 rounded-2xl flex items-center gap-3 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Current IST Time</span>
                  <span className="text-sm font-mono font-black text-white">{istTimeStr}</span>
                </div>
              </div>
            </div>

            {/* Segment Selector Tabs */}
            <div className="flex flex-wrap gap-2 mt-5 pt-3 border-t border-white/10 text-xs font-bold">
              {[
                { id: 'Equity', label: 'Equity & F&O (NSE/BSE)' },
                { id: 'MCX', label: 'Commodities (MCX)' },
                { id: 'Currency', label: 'Currency (CDS)' },
                { id: 'Block', label: 'Block Deal Windows' },
                { id: 'Settlement', label: 'T+1 Settlement' },
              ].map((seg) => (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegment(seg.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeSegment === seg.id
                      ? 'bg-primary text-white font-black shadow-sm'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {seg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto max-h-[460px] flex flex-col gap-6">
            
            {/* SEGMENT 1: EQUITY & F&O */}
            {activeSegment === 'Equity' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-[#172033] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> NSE & BSE Equity & F&O Timings
                  </h3>
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Monday to Friday
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Pre-Open */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Pre-Open Session</span>
                      <span className="text-lg font-black text-[#172033] block">09:00 AM – 09:08 AM</span>
                      <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                        09:00 - 09:07 AM: Order entry & cancellation. 09:07 - 09:08 AM: Equilibrium price matching.
                      </p>
                    </div>
                    <span className="text-[10px] font-extrabold text-primary mt-3 block">Price Discovery Window</span>
                  </div>

                  {/* Normal Trading */}
                  <div className="p-4 bg-primary-light/70 border border-primary-light rounded-2xl flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-primary">Normal Continuous Trading</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <span className="text-xl font-black text-blue-950 block">09:15 AM – 03:30 PM</span>
                      <p className="text-[11px] text-primary-dark font-medium mt-1 leading-relaxed">
                        Continuous matching session for Cash Equity, Equity Futures & Options contracts.
                      </p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 mt-3 block">Primary Active Trading Session</span>
                  </div>

                  {/* Post-Closing */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Post-Closing Session</span>
                      <span className="text-lg font-black text-[#172033] block">03:40 PM – 04:00 PM</span>
                      <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                        Orders placed at the calculated closing VWAP price. No price discovery occurs.
                      </p>
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-600 mt-3 block">Closing Price Execution</span>
                  </div>

                </div>

                {/* Timeline Breakdown Graphic */}
                <div className="bg-[#172033] text-white p-4 rounded-2xl flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Equity Day Timeline</span>
                  <div className="grid grid-cols-5 text-center text-[10px] font-bold gap-1">
                    <div className="p-2 bg-slate-800 rounded-xl">
                      <span className="block text-slate-400">09:00 - 09:08 AM</span>
                      <span className="text-[#64748B] font-black">Pre-Open</span>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-xl">
                      <span className="block text-slate-400">09:08 - 09:15 AM</span>
                      <span className="text-amber-400 font-black">Buffer Break</span>
                    </div>
                    <div className="col-span-2 p-2 bg-primary text-white rounded-xl font-black">
                      <span className="block text-blue-200">09:15 AM - 03:30 PM</span>
                      <span>Normal Market Open</span>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-xl">
                      <span className="block text-slate-400">03:40 - 04:00 PM</span>
                      <span className="text-slate-300 font-black">Post Close</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEGMENT 2: MCX COMMODITIES */}
            {activeSegment === 'MCX' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm text-[#172033] flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" /> MCX Commodity Market Timings
                  </h3>
                  <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Extended Hours
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Morning Session (Agri & Metals)</span>
                      <span className="text-xl font-black text-[#172033] block">09:00 AM – 05:00 PM</span>
                      <p className="text-xs text-slate-500 font-medium mt-2">
                        Agricultural commodities (Guar, Cotton, Jeera) and initial metals session.
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 mt-4 block">Domestic Session</span>
                  </div>

                  <div className="p-4 bg-primary-light/70 border border-indigo-200 rounded-2xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">Evening Session (US Sync)</span>
                        <Moon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-xl font-black text-indigo-950 block">05:00 PM – 11:30 / 11:55 PM</span>
                      <p className="text-xs text-primary-dark font-medium mt-2">
                        Gold, Silver, Crude Oil, Natural Gas, Copper synced with US NYMEX / COMEX markets.
                      </p>
                    </div>
                    <span className="text-[10px] font-black text-primary mt-4 block">Global US Market Alignment</span>
                  </div>
                </div>
              </div>
            )}

            {/* SEGMENT 3: CURRENCY DERIVATIVES */}
            {activeSegment === 'Currency' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-black text-sm text-[#172033] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" /> Currency Derivatives (NSE CDS & BSE CDS)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">USD-INR / EUR-INR / GBP-INR / JPY-INR</span>
                    <span className="text-xl font-black text-[#172033] block">09:00 AM – 05:00 PM</span>
                    <p className="text-xs text-slate-500 font-medium mt-2">
                      Standard Indian Rupee currency pairs continuous trading window.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Cross Currency Pairs (EUR-USD, GBP-USD, USD-JPY)</span>
                    <span className="text-xl font-black text-[#172033] block">09:00 AM – 07:30 PM</span>
                    <p className="text-xs text-slate-500 font-medium mt-2">
                      Extended trading window for international cross-currency derivatives.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SEGMENT 4: BLOCK DEAL WINDOWS */}
            {activeSegment === 'Block' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-black text-sm text-[#172033] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" /> SEBI Block Deal Execution Windows
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Block deals require a minimum trade value of ₹10 Crores and are executed in two specific dedicated windows:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary-light border border-primary-light rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-primary tracking-wider block mb-1">Morning Block Window</span>
                    <span className="text-xl font-black text-blue-950 block">08:45 AM – 09:00 AM</span>
                    <p className="text-xs text-primary-dark font-medium mt-2">
                      Reference price: Previous day's closing price (±1% tolerance).
                    </p>
                  </div>

                  <div className="p-4 bg-primary-light border border-primary-light rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-primary tracking-wider block mb-1">Afternoon Block Window</span>
                    <span className="text-xl font-black text-blue-950 block">02:05 PM – 02:20 PM</span>
                    <p className="text-xs text-primary-dark font-medium mt-2">
                      Reference price: Volume Weighted Average Price (VWAP) between 01:45 PM and 02:00 PM.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SEGMENT 5: T+1 SETTLEMENT */}
            {activeSegment === 'Settlement' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-black text-sm text-[#172033] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> T+1 Rolling Settlement Schedule
                </h3>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-emerald-950">Fastest Settlement Standard Globally</span>
                    <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded uppercase">SEBI Mandate</span>
                  </div>
                  <p className="text-xs text-emerald-900 font-medium leading-relaxed">
                    India operates on a <strong>T+1 settlement cycle</strong> for all equity cash stocks. Shares bought today (Day T) are credited to your Demat account on the next business day (Day T+1) before 11:00 AM.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer Note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-[11px]">
              <Info className="w-3.5 h-3.5 text-primary shrink-0" /> Market closed on Saturdays, Sundays and SEBI-notified holidays.
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#172033] hover:bg-slate-800 text-white rounded-xl font-black transition cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TradingHoursModal;
