import React, { useState, useEffect } from 'react';
import { 
  Sun, Activity, Sunset, Globe, Landmark, Calendar, Eye,
  TrendingUp, TrendingDown, RefreshCw, ArrowUpRight, ArrowDownRight,
  Zap, BarChart3, AlertTriangle, Clock, Target, Shield, Inbox
} from 'lucide-react';
import { motion } from 'framer-motion';
import marketService, { type MarketOutlookData } from '../../services/market.service';

export const MarketOutlookTab: React.FC = () => {
  const [activeSegment, setActiveSegment] = useState<'morning' | 'midday' | 'closing'>('morning');
  const [liveOutlook, setLiveOutlook] = useState<MarketOutlookData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOutlook = async () => {
    setLoading(true);
    try {
      const data = await marketService.getMarketOutlook();
      setLiveOutlook(data);
    } catch (err) {
      console.error('Error fetching market outlook:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutlook();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 animate-in fade-in duration-300 pb-16">

      {/* ── 1. DAILY HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary-light border border-[#E2E8F0] px-3 py-1.5 rounded-xl">Daily Market Outlook</span>
          <span className="text-xs font-bold text-slate-400 hidden sm:block">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchOutlook}
            disabled={loading}
            className="flex items-center gap-2 text-xs font-black text-primary bg-primary-light border border-[#E2E8F0] px-3 py-1.5 rounded-xl hover:bg-primary-light transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Fetching Outlook...' : 'Refresh Feed'}
          </button>
        </div>
      </div>

      {/* ── 2. MAIN OUTLOOK DATA ── */}
      {liveOutlook ? (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">NIFTY 50 Trend</span>
              <h3 className="text-xl font-black text-slate-900">{liveOutlook.niftyTrend || 'Neutral'}</h3>
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block">Support</span>
                  <span className="font-black text-slate-900">{liveOutlook.niftySupport || '--'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block">Resistance</span>
                  <span className="font-black text-slate-900">{liveOutlook.niftyResistance || '--'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">BANK NIFTY Trend</span>
              <h3 className="text-xl font-black text-slate-900">{liveOutlook.bankNiftyTrend || 'Neutral'}</h3>
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block">Support</span>
                  <span className="font-black text-slate-900">{liveOutlook.bankNiftySupport || '--'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block">Resistance</span>
                  <span className="font-black text-slate-900">{liveOutlook.bankNiftyResistance || '--'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Market Sentiment</span>
              <h3 className="text-xl font-black text-slate-900">{liveOutlook.marketSentiment || 'Neutral'}</h3>
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block">INDIA VIX</span>
                  <span className="font-black text-slate-900">{liveOutlook.vixValue || '--'}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 block">PCR Ratio</span>
                  <span className="font-black text-slate-900">{liveOutlook.pcrRatio || '--'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-xs">
            <h3 className="text-base font-black text-slate-900 mb-4">FII / DII Flows & Calendar Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">FII Liquidity Flow</span>
                <span className="text-base font-black text-slate-900">{liveOutlook.fiiFlow || 'Awaiting API data'}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">DII Liquidity Flow</span>
                <span className="text-base font-black text-slate-900">{liveOutlook.diiFlow || 'Awaiting API data'}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-dashed border-slate-200 rounded-[28px] p-8">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-base font-black text-slate-800">No Market Outlook Data Returned</p>
          <p className="text-xs text-slate-400 mt-1">Awaiting backend response from endpoint: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">GET /api/v1/market/outlook</code></p>
        </div>
      )}
    </div>
  );
};

export default MarketOutlookTab;
