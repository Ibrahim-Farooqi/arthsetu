import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, ShieldCheck, TrendingUp, Sparkles, X, ChevronRight, 
  PieChart, BarChart3, Clock, AlertTriangle, ArrowUpRight, CheckCircle2, Bookmark
} from 'lucide-react';
import toast from 'react-hot-toast';

interface CollectionsCenterProps {
  onSelectStock: (stock: any) => void;
  onInvestViaBroker: (collection: any) => void;
}

export interface CollectionItem {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  risk: 'Low' | 'Moderate' | 'High';
  horizon: string;
  cagr3Y: string;
  stocksCount: number;
  description: string;
  whyExists: string;
  strategy: string;
  sectorAllocation: { sector: string; percentage: number; color: string }[];
  stocks: {
    symbol: string;
    name: string;
    weight: string;
    price: string;
    rationale: string;
  }[];
  rebalancingHistory: { date: string; action: string; stock: string }[];
}

const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: 'next-growth',
    title: 'Next Growth Leaders',
    tagline: 'High-conviction mid-cap market leaders poised for exponential earnings expansion.',
    badge: 'Growth Strategy',
    risk: 'High',
    horizon: '3 - 5 Years',
    cagr3Y: '+28.4%',
    stocksCount: 8,
    description: 'Targeted exposure to tech innovators, specialty chemical leaders, and renewable energy pioneers capturing market share rapidly.',
    whyExists: 'Traditional large caps offer stability, but dynamic mid-caps delivering 20%+ return on equity (ROE) generate generational wealth over multi-year cycles.',
    strategy: 'We select asset-light businesses with expanding margins, low debt-to-equity (<0.5), and strong institutional buying pressure.',
    sectorAllocation: [
      { sector: 'Technology & SaaS', percentage: 35, color: '#15519D' },
      { sector: 'Specialty Chemicals', percentage: 25, color: '#387ED1' },
      { sector: 'Renewables & Green Tech', percentage: 25, color: '#16A34A' },
      { sector: 'Consumer Discretionary', percentage: 15, color: '#F59E0B' },
    ],
    stocks: [
      { symbol: 'TATAELXSI', name: 'Tata Elxsi Ltd', weight: '18%', price: '6,920.00', rationale: 'Leading automotive software design partner with high R&D margins.' },
      { symbol: 'DEEPAKNTR', name: 'Deepak Nitrite Ltd', weight: '15%', price: '2,480.00', rationale: 'Import substitution play in advanced intermediates with strong pricing power.' },
      { symbol: 'KPIGREEN', name: 'KPI Green Energy Ltd', weight: '14%', price: '890.50', rationale: 'Robust solar & hybrid power commissioning pipeline in industrial Gujarat.' },
      { symbol: 'DIXON', name: 'Dixon Technologies', weight: '13%', price: '12,450.00', rationale: 'Primary beneficiary of India electronic manufacturing PLI schemes.' },
    ],
    rebalancingHistory: [
      { date: '15 Jul 2026', action: 'Increased Weight (+3%)', stock: 'KPI Green Energy' },
      { date: '01 May 2026', action: 'Trimmed Weight (-2%)', stock: 'Tata Elxsi' },
    ]
  },
  {
    id: 'india-market-leaders',
    title: 'India\'s Market Leaders',
    tagline: 'Monopolistic and oligopolistic blue-chips dominating critical economic sectors.',
    badge: 'Core Wealth',
    risk: 'Low',
    horizon: '5+ Years',
    cagr3Y: '+18.2%',
    stocksCount: 10,
    description: 'Foundation portfolio focused on industry titans with untouchable moats, resilient cashflows, and dominant market shares.',
    whyExists: 'Provides downside protection during volatility while capturing steady compounding from India\'s macroeconomic expansion.',
    strategy: '100% allocation to Top-100 Nifty market cap leaders possessing strong pricing power and dividend consistency.',
    sectorAllocation: [
      { sector: 'Banking & Financials', percentage: 40, color: '#15519D' },
      { sector: 'Conglomerates & Energy', percentage: 30, color: '#123B63' },
      { sector: 'Information Tech', percentage: 20, color: '#387ED1' },
      { sector: 'FMCG', percentage: 10, color: '#F59E0B' },
    ],
    stocks: [
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', weight: '22%', price: '2,934.50', rationale: 'Market leader in telecom, retail cash cow, and green energy investments.' },
      { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: '20%', price: '1,682.40', rationale: 'Unrivaled private sector loan book and retail deposit franchise.' },
      { symbol: 'TCS', name: 'Tata Consultancy Services', weight: '18%', price: '4,185.10', rationale: 'Industry benchmark for IT services margins and capital return.' },
      { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', weight: '15%', price: '1,215.80', rationale: 'Industry-leading ROA driven by digital underwriting efficiency.' },
    ],
    rebalancingHistory: [
      { date: '10 Jun 2026', action: 'Rebalanced Sector Weights', stock: 'HDFC Bank & ICICI Bank' },
    ]
  },
  {
    id: 'steady-compounders',
    title: 'Steady Compounders',
    tagline: 'Low-beta dividend aristocrats delivering predictable cash return and capital growth.',
    badge: 'Consistent Returns',
    risk: 'Low',
    horizon: '3+ Years',
    cagr3Y: '+16.5%',
    stocksCount: 7,
    description: 'Resilient companies with predictable earnings cycles, low leverage, and reliable annual dividend increases.',
    whyExists: 'Designed for capital preservation with high inflation-beating total returns without portfolio anxiety.',
    strategy: 'Companies evaluated on 10-year free cash flow consistency, minimum 2% dividend yield, and debt-free balance sheets.',
    sectorAllocation: [
      { sector: 'Consumer Staples & FMCG', percentage: 45, color: '#16A34A' },
      { sector: 'IT Services', percentage: 30, color: '#15519D' },
      { sector: 'Infrastructure & Ports', percentage: 25, color: '#64748B' },
    ],
    stocks: [
      { symbol: 'ITC', name: 'ITC Limited', weight: '25%', price: '495.20', rationale: 'High cashflow generation, hotel demerger upside, and 3.8% dividend yield.' },
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', weight: '20%', price: '2,710.00', rationale: 'Unmatched rural FMCG distribution net across 9 million outlets.' },
      { symbol: 'INFY', name: 'Infosys Limited', weight: '20%', price: '1,562.10', rationale: 'High payout ratio (85% FCF returned via dividend & buybacks).' },
    ],
    rebalancingHistory: [
      { date: '01 Aug 2026', action: 'Added Dividend Reinvestment', stock: 'ITC' },
    ]
  },
  {
    id: 'future-of-india',
    title: 'Future of India',
    tagline: 'Pioneering enterprises capitalising on defense modernization, EV transition, and AI.',
    badge: 'Thematic Basket',
    risk: 'Moderate',
    horizon: '3 - 5 Years',
    cagr3Y: '+32.1%',
    stocksCount: 9,
    description: 'Thematic investments tracking Government Make-in-India mandates, infrastructure modernization, and clean energy adoption.',
    whyExists: 'Capitalizes on multi-decade structural policy shifts that create massive order book visibility for domestic players.',
    strategy: 'Selection filtered by government order execution track record, export potential, and proprietary technological moats.',
    sectorAllocation: [
      { sector: 'Defense & Aerospace', percentage: 40, color: '#123B63' },
      { sector: 'Infrastructure & Capital Goods', percentage: 35, color: '#15519D' },
      { sector: 'Electric Mobility', percentage: 25, color: '#16A34A' },
    ],
    stocks: [
      { symbol: 'HAL', name: 'Hindustan Aeronautics Ltd', weight: '25%', price: '4,650.00', rationale: 'Record ₹94,000 Cr order book for indigenous fighter jets & helicopters.' },
      { symbol: 'BEL', name: 'Bharat Electronics Ltd', weight: '22%', price: '295.40', rationale: 'Dominant supplier of defense radars, electronic warfare systems, and avionics.' },
      { symbol: 'LT', name: 'Larsen & Toubro Ltd', weight: '20%', price: '3,456.90', rationale: 'Lead EPC contractor for high-speed rail, mega ports, and nuclear reactors.' },
    ],
    rebalancingHistory: [
      { date: '20 Jun 2026', action: 'Increased Target Allocation (+5%)', stock: 'HAL' },
    ]
  },
  {
    id: 'value-opportunities',
    title: 'Value Opportunities',
    tagline: 'Undervalued businesses trading at deep discount relative to intrinsic cashflow value.',
    badge: 'Deep Value',
    risk: 'Moderate',
    horizon: '2 - 4 Years',
    cagr3Y: '+24.8%',
    stocksCount: 8,
    description: 'Contrarian value plays exhibiting strong balance sheets temporarily depressed by short-term cyclical headwinds.',
    whyExists: 'Exploits market overreactions to capture asymmetric risk-reward with high margin of safety.',
    strategy: 'Screened for low P/E (<15), P/B under historical averages, and upcoming catalyst drivers like asset monetization or cyclical recovery.',
    sectorAllocation: [
      { sector: 'Metals & Mining', percentage: 35, color: '#64748B' },
      { sector: 'Public Sector Banks', percentage: 35, color: '#15519D' },
      { sector: 'Power Generation', percentage: 30, color: '#F59E0B' },
    ],
    stocks: [
      { symbol: 'TATASTEEL', name: 'Tata Steel Ltd', weight: '25%', price: '147.20', rationale: 'UK blast furnace transition reduces drag; domestic margins expanding.' },
      { symbol: 'SBIN', name: 'State Bank of India', weight: '25%', price: '820.40', rationale: 'Lowest credit costs in 15 years; trading at attractive 1.2x P/BV.' },
      { symbol: 'NTPC', name: 'NTPC Limited', weight: '20%', price: '410.20', rationale: 'Massive thermal capacity base cashflow funding green energy subsidiary listing.' },
    ],
    rebalancingHistory: [
      { date: '05 Jul 2026', action: 'Thesis Confirmed & Maintained', stock: 'Tata Steel' },
    ]
  }
];

export const CollectionsCenter: React.FC<CollectionsCenterProps> = ({
  onSelectStock,
  onInvestViaBroker
}) => {
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="border-b border-slate-200/80 pb-5">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#15519D] mb-1">
          <Layers className="w-4 h-4" />
          <span>Curated Investment Baskets</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          ArthSetu Investment Collections
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Structured, research-backed investment strategies built for long-term compounding. Not random stock lists.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLLECTIONS_DATA.map((col) => (
          <div
            key={col.id}
            onClick={() => setSelectedCollection(col)}
            className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#15519D] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-50 text-[#15519D] font-bold text-xs rounded-full">
                  {col.badge}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                  col.risk === 'Low' ? 'bg-emerald-50 text-[#16A34A]' :
                  col.risk === 'Moderate' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-[#DC2626]'
                }`}>
                  {col.risk} Risk
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#15519D] transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                {col.tagline}
              </p>

              {/* Key Stats Pill */}
              <div className="grid grid-cols-3 gap-2 my-5 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">3Y CAGR</span>
                  <div className="text-sm font-black text-[#16A34A]">{col.cagr3Y}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Constituents</span>
                  <div className="text-sm font-extrabold text-slate-900">{col.stocksCount} Stocks</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Horizon</span>
                  <div className="text-sm font-extrabold text-slate-900">{col.horizon}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#15519D] group-hover:translate-x-1 transition-transform">
              <span>View Full Strategy & Allocation</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* COLLECTION DETAIL MODAL / DRAWER */}
      <AnimatePresence>
        {selectedCollection && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-[#15519D] text-white rounded-2xl shadow-md">
                    <Layers className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-slate-900">{selectedCollection.title}</h2>
                      <span className="px-2.5 py-0.5 bg-blue-100 text-[#15519D] font-bold text-xs rounded-full">
                        {selectedCollection.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedCollection.tagline}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCollection(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Scrollable */}
              <div className="p-6 overflow-y-auto space-y-8">
                {/* Metrics Highlights Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">3-Year Performance</span>
                    <div className="text-xl font-black text-[#16A34A]">{selectedCollection.cagr3Y} CAGR</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Risk Tier</span>
                    <div className="text-xl font-black text-slate-900">{selectedCollection.risk} Risk</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Holding Horizon</span>
                    <div className="text-xl font-black text-slate-900">{selectedCollection.horizon}</div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Number of Stocks</span>
                    <div className="text-xl font-black text-slate-900">{selectedCollection.stocksCount} Companies</div>
                  </div>
                </div>

                {/* Why Exists & Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <h4 className="font-extrabold text-[#15519D] text-sm uppercase tracking-wider mb-2">
                      Why This Collection Exists
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {selectedCollection.whyExists}
                    </p>
                  </div>

                  <div className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl">
                    <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-2">
                      The Investment Strategy
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {selectedCollection.strategy}
                    </p>
                  </div>
                </div>

                {/* Sector Allocation Breakdown */}
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-3 flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-[#15519D]" />
                    Sector Exposure Breakdown
                  </h4>

                  <div className="space-y-3">
                    {selectedCollection.sectorAllocation.map((sec, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-700">{sec.sector}</span>
                          <span className="text-slate-900">{sec.percentage}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${sec.percentage}%`, backgroundColor: sec.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Allocation Table */}
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#15519D]" />
                    Stock Constituents & Rationales
                  </h4>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase">
                          <th className="py-3 px-4">Stock</th>
                          <th className="py-3 px-3">Weight</th>
                          <th className="py-3 px-3">Price</th>
                          <th className="py-3 px-4">Why Included</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {selectedCollection.stocks.map((stock) => (
                          <tr key={stock.symbol} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-slate-900">{stock.symbol}</div>
                              <div className="text-[11px] text-slate-400">{stock.name}</div>
                            </td>
                            <td className="py-3.5 px-3 font-bold text-[#15519D]">{stock.weight}</td>
                            <td className="py-3.5 px-3 font-extrabold text-slate-900">₹{stock.price}</td>
                            <td className="py-3.5 px-4 text-slate-600 font-medium leading-normal">
                              {stock.rationale}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedCollection(null);
                                  onSelectStock(stock);
                                }}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#15519D] rounded-lg font-bold transition-colors"
                              >
                                Detail
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Rebalancing History */}
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    Rebalancing & Update History
                  </h4>

                  <div className="space-y-2">
                    {selectedCollection.rebalancingHistory.map((reb, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                          <span className="font-bold text-slate-900">{reb.stock}</span>
                          <span className="text-slate-500 font-medium">({reb.action})</span>
                        </div>
                        <span className="text-slate-400 font-mono">{reb.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between sticky bottom-0 z-10">
                <span className="text-xs text-slate-500 font-medium">
                  Discipline over impulse: Review complete thesis before investing.
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      toast.success(`Virtually allocated ${selectedCollection.stocksCount} stocks from "${selectedCollection.title}" to your Investment Lab!`);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-50 text-[#16A34A] border border-emerald-200 font-extrabold text-xs hover:bg-emerald-100 transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Add All to Investment Lab</span>
                  </button>

                  <button
                    onClick={() => {
                      const col = selectedCollection;
                      setSelectedCollection(null);
                      onInvestViaBroker(col);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <span>Invest via Preferred Broker</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionsCenter;
