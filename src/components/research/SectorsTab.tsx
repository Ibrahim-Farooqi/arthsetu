import React, { useState, useEffect } from 'react';
import marketService from '../../services/market.service';
import { 
  Building2, ArrowUpRight, ArrowDownRight, ChevronRight, TrendingUp,
  Inbox, RefreshCw
} from 'lucide-react';

export interface SectorConfig {
  id: string;
  name: string;
  icon?: any;
  overview?: string;
  performance?: string;
  weekPerformance?: string;
  monthPerformance?: string;
  positive?: boolean;
  marketCap?: string;
  stockCount?: number;
  topCompanies?: Array<{ name: string; symbol: string; change: string; positive: boolean; mktCap: string }>;
  latestResearch?: Array<{ title: string; target: string; upside: string; rating: string; analyst: string }>;
  keyDrivers?: string[];
  keyRisks?: string[];
  aiOutlook?: string;
  aiSentiment?: 'Bullish' | 'Neutral' | 'Bearish';
  confidenceScore?: number;
}

export const SectorsTab: React.FC = () => {
  const [sectors, setSectors] = useState<SectorConfig[]>([]);
  const [selectedSector, setSelectedSector] = useState<SectorConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSectors = async () => {
    setLoading(true);
    try {
      const data = await marketService.getSectors();
      if (data && data.length > 0) {
        setSectors(data.map((d) => ({
          id: (d.name || (d as any).companyName || (d as any).symbol || '').toLowerCase().replace(/\s+/g, '-'),
          name: d.name || (d as any).companyName || (d as any).symbol || 'Unknown',
          performance: `${d.changePercent >= 0 ? '+' : ''}${d.changePercent.toFixed(2)}%`,
          positive: d.changePercent >= 0,
          marketCap: d.marketCap || '--',
          stockCount: 0,
          aiOutlook: `Backend AI sentiment: ${d.trend}`,
          aiSentiment: d.trend,
          confidenceScore: d.momentumScore || 80
        })));
      } else {
        setSectors([]);
      }
    } catch (err) {
      console.error('Error fetching sector data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 animate-in fade-in duration-300 pb-16">

      {/* ── 1. HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-[24px] p-5 shadow-xs">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary-light border border-[#E2E8F0] px-3 py-1.5 rounded-xl">Sector Performance</span>
          <h2 className="text-xl font-black text-slate-900 mt-2">Industry & Sector Analysis</h2>
        </div>
        <button
          onClick={fetchSectors}
          disabled={loading}
          className="flex items-center gap-2 text-xs font-black text-primary bg-primary-light border border-[#E2E8F0] px-3.5 py-2 rounded-xl hover:bg-primary-light transition cursor-pointer w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading Sectors...' : 'Refresh Sectors'}
        </button>
      </div>

      {/* ── 2. SECTORS GRID ── */}
      {sectors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sec) => (
            <div 
              key={sec.id}
              onClick={() => setSelectedSector(sec)}
              className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-xs hover:shadow-lg transition cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-base font-black text-slate-900 group-hover:text-primary transition-colors">{sec.name}</span>
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${sec.positive ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
                  {sec.performance}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-t border-slate-100 pt-4">
                <span>Market Cap: {sec.marketCap}</span>
                <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition-all">
                  Details <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white border border-dashed border-slate-200 rounded-[28px] p-8">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-base font-black text-slate-800">No Sector Data Available</p>
          <p className="text-xs text-slate-400 mt-1">Awaiting response from backend endpoint: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">GET /api/v1/market/sectors</code></p>
        </div>
      )}
    </div>
  );
};

export default SectorsTab;
