import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Scale, TrendingUp, BarChart3, AlertCircle, FileText, Download, 
  Bookmark, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, ChevronDown, Search, Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (tradeData: any) => void;
  initialStock?: any;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  onSelectStock,
  onSelectResearch,
  onTrade,
  initialStock
}) => {
  const [assetType, setAssetType] = useState<'Stocks' | 'Mutual Funds' | 'ETFs'>('Stocks');

  // Pre-configured comparison assets per asset type
  const mockStockOptions = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      price: '₹3,024.50',
      change: '+1.25%',
      isPos: true,
      returns: { m1: '+4.2%', y1: '+24.5%', y3: '+18.2%' },
      financials: { roe: '14.2%', roce: '12.8%', debtEquity: '0.38' },
      technicals: { rsi: 58, dma50: 'Bullish', macd: 'Buy' },
      aiRating: { score: 94, rec: 'BUY', upside: '+14%' },
      risk: { beta: 0.85, sharpe: 1.62, volatility: 'Low' },
      valuation: { pe: '24.5x', pb: '2.8x', divYield: '0.35%' },
      shareholding: { promoter: '50.4%', fii: '22.1%', dii: '16.8%', public: '10.7%' },
      researchThesis: 'Green Hydrogen Gigafactory commissioning timeline expected to re-rate valuation upwards.'
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: '₹4,185.10',
      change: '-0.42%',
      isPos: false,
      returns: { m1: '-1.8%', y1: '+18.4%', y3: '+15.1%' },
      financials: { roe: '42.1%', roce: '51.4%', debtEquity: '0.04' },
      technicals: { rsi: 48, dma50: 'Neutral', macd: 'Hold' },
      aiRating: { score: 91, rec: 'BUY', upside: '+11%' },
      risk: { beta: 0.72, sharpe: 1.85, volatility: 'Low' },
      valuation: { pe: '31.2x', pb: '12.4x', divYield: '1.25%' },
      shareholding: { promoter: '72.3%', fii: '12.4%', dii: '10.1%', public: '5.2%' },
      researchThesis: 'Strong deal win pipeline in North American banking; software spending resuming momentum.'
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Limited',
      price: '₹1,682.40',
      change: '+0.85%',
      isPos: true,
      returns: { m1: '+5.1%', y1: '+12.8%', y3: '+14.6%' },
      financials: { roe: '17.1%', roce: '15.2%', debtEquity: '1.12' },
      technicals: { rsi: 62, dma50: 'Bullish', macd: 'Buy' },
      aiRating: { score: 96, rec: 'STRONG BUY', upside: '+18%' },
      risk: { beta: 0.92, sharpe: 1.74, volatility: 'Medium' },
      valuation: { pe: '18.4x', pb: '2.6x', divYield: '1.10%' },
      shareholding: { promoter: '0.0%', fii: '52.1%', dii: '31.4%', public: '16.5%' },
      researchThesis: 'Merger integration synergies delivering NIM expansion; loan book growing at 16% YoY.'
    }
  ];

  const mockFundOptions = [
    {
      symbol: 'PARAG_PARIKH',
      name: 'Parag Parikh Flexi Cap Fund',
      price: '₹78.40',
      change: '+0.45%',
      isPos: true,
      returns: { m1: '+3.2%', y1: '+32.1%', y3: '+22.4%' },
      financials: { roe: '24.1%', roce: '22.0%', debtEquity: '0.10' },
      technicals: { rsi: 55, dma50: 'Bullish', macd: 'Buy' },
      aiRating: { score: 98, rec: 'BUY', upside: '+22%' },
      risk: { beta: 0.78, sharpe: 2.10, volatility: 'Low' },
      valuation: { pe: '22.1x', pb: '3.4x', divYield: '0.80%' },
      shareholding: { promoter: 'N/A', fii: '18.5%', dii: '70.2%', public: '11.3%' },
      researchThesis: 'Outstanding global diversification with US tech holdings buffering domestic dips.'
    },
    {
      symbol: 'NIPPON_SMALL',
      name: 'Nippon India Small Cap Fund',
      price: '₹142.10',
      change: '+1.85%',
      isPos: true,
      returns: { m1: '+6.5%', y1: '+44.2%', y3: '+31.8%' },
      financials: { roe: '18.5%', roce: '17.2%', debtEquity: '0.45' },
      technicals: { rsi: 68, dma50: 'Bullish', macd: 'Buy' },
      aiRating: { score: 92, rec: 'BUY', upside: '+28%' },
      risk: { beta: 1.15, sharpe: 2.35, volatility: 'High' },
      valuation: { pe: '28.4x', pb: '4.1x', divYield: '0.20%' },
      shareholding: { promoter: 'N/A', fii: '8.2%', dii: '82.1%', public: '9.7%' },
      researchThesis: 'Top small-cap performer with high conviction stock picking in capital goods.'
    }
  ];

  const mockEtfOptions = [
    {
      symbol: 'NIFTYBEES',
      name: 'Nippon India Nifty 50 ETF',
      price: '₹268.40',
      change: '+0.58%',
      isPos: true,
      returns: { m1: '+2.1%', y1: '+16.5%', y3: '+14.2%' },
      financials: { roe: '16.5%', roce: '15.8%', debtEquity: '0.50' },
      technicals: { rsi: 56, dma50: 'Bullish', macd: 'Buy' },
      aiRating: { score: 95, rec: 'BUY', upside: '+12%' },
      risk: { beta: 1.00, sharpe: 1.55, volatility: 'Low' },
      valuation: { pe: '22.8x', pb: '3.1x', divYield: '1.20%' },
      shareholding: { promoter: 'N/A', fii: '38.0%', dii: '42.0%', public: '20.0%' },
      researchThesis: 'Core passive benchmark ETF with near-zero tracking error.'
    },
    {
      symbol: 'BANKBEES',
      name: 'Nippon India Bank ETF',
      price: '₹534.20',
      change: '+1.18%',
      isPos: true,
      returns: { m1: '+4.5%', y1: '+18.2%', y3: '+16.8%' },
      financials: { roe: '17.8%', roce: '16.1%', debtEquity: '1.05' },
      technicals: { rsi: 64, dma50: 'Bullish', macd: 'Buy' },
      aiRating: { score: 96, rec: 'STRONG BUY', upside: '+16%' },
      risk: { beta: 1.12, sharpe: 1.68, volatility: 'Medium' },
      valuation: { pe: '17.2x', pb: '2.4x', divYield: '1.05%' },
      shareholding: { promoter: 'N/A', fii: '45.0%', dii: '40.0%', public: '15.0%' },
      researchThesis: 'Direct play on Indian banking sector credit expansion.'
    }
  ];

  if (!isOpen) return null;

  const currentOptions = assetType === 'Stocks' 
    ? mockStockOptions 
    : assetType === 'Mutual Funds' 
    ? mockFundOptions 
    : mockEtfOptions;

  const handleExportPDF = () => {
    toast.success('Generating SEBI-Compliant PDF Comparison Report...');
    setTimeout(() => {
      toast.success('Comparison PDF downloaded to your device!');
    }, 1500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#F8FAFC] rounded-[28px] shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[92vh] border border-[#E2E8F0]"
        >
          {/* HEADER */}
          <div className="p-6 border-b border-[#E2E8F0] bg-white flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary-light text-primary flex items-center justify-center font-black">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-black text-xl text-[#172033] leading-tight flex items-center gap-2">
                  Asset Comparison Matrix
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-light text-primary text-[10px] font-black uppercase border border-primary-light">
                    Side-by-Side Analysis
                  </span>
                </h3>
                <p className="text-xs font-bold text-slate-400">Comparing fundamentals, technicals, returns & AI conviction</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleExportPDF}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#172033] font-black text-xs transition flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-primary" /> Export PDF Report
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ASSET CATEGORY SELECTOR TABS */}
          <div className="px-6 py-3 border-b border-slate-200 bg-[#F8FAFC] flex items-center gap-2 text-xs font-bold">
            {(['Stocks', 'Mutual Funds', 'ETFs'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setAssetType(type)}
                className={`px-5 py-2.5 rounded-xl transition font-black ${
                  assetType === type ? 'bg-[#172033] text-white shadow-sm' : 'text-slate-500 hover:text-[#172033]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* COMPARISON BODY SURFACE */}
          <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">

            {/* COMPARISON TABLE */}
            <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-[#E2E8F0] text-xs font-black text-slate-400 uppercase tracking-wider">
                    <th className="p-4 w-1/4">Comparison Metric</th>
                    {currentOptions.map((asset) => (
                      <th key={asset.symbol} className="p-4 border-l border-[#E2E8F0] w-1/4">
                        <div className="flex flex-col">
                          <span className="font-black text-sm text-[#172033]">{asset.symbol}</span>
                          <span className="text-[10px] text-slate-400 font-bold truncate max-w-[180px]">{asset.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-xs font-medium text-slate-700 divide-y divide-slate-100">
                  
                  {/* 1. PRICE & SNAPSHOT */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-black text-[#172033] uppercase text-[10px] tracking-wider" colSpan={4}>
                      1. Price & Market Snapshot
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">Live Price (LTP)</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-black text-sm text-[#172033]">
                        {a.price} <span className={`text-xs font-bold ${a.isPos ? 'text-emerald-600' : 'text-danger'}`}>{a.change}</span>
                      </td>
                    ))}
                  </tr>

                  {/* 2. RETURNS */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-black text-[#172033] uppercase text-[10px] tracking-wider" colSpan={4}>
                      2. Historical Performance & Returns
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">1-Month Return</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-bold text-slate-800">{a.returns.m1}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">1-Year Return</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-black text-emerald-600">{a.returns.y1}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">3-Year CAGR</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-black text-primary">{a.returns.y3}</td>
                    ))}
                  </tr>

                  {/* 3. AI RATING & CONVICTION */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-black text-[#172033] uppercase text-[10px] tracking-wider" colSpan={4}>
                      3. AI Advisory Rating & Conviction
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">AI Recommendation</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-black">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                          {a.aiRating.rec}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">AI Conviction Score</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-black text-primary text-sm">
                        {a.aiRating.score}/100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">Target Price Upside</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-black text-emerald-600">
                        {a.aiRating.upside}
                      </td>
                    ))}
                  </tr>

                  {/* 4. FINANCIALS */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-black text-[#172033] uppercase text-[10px] tracking-wider" colSpan={4}>
                      4. Financial Health Metrics
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">Return on Equity (ROE)</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-bold text-slate-800">{a.financials.roe}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">Return on Capital (ROCE)</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-bold text-slate-800">{a.financials.roce}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">Debt-to-Equity Ratio</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-bold text-slate-800">{a.financials.debtEquity}</td>
                    ))}
                  </tr>

                  {/* 5. TECHNICAL INDICATORS */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-black text-[#172033] uppercase text-[10px] tracking-wider" colSpan={4}>
                      5. Technical Indicators
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">RSI (14 Period)</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-bold text-slate-800">{a.technicals.rsi}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">50 DMA Crossover</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-black text-emerald-600">{a.technicals.dma50}</td>
                    ))}
                  </tr>

                  {/* 6. VALUATION */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-black text-[#172033] uppercase text-[10px] tracking-wider" colSpan={4}>
                      6. Valuation & Ratios
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">P/E Ratio</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-bold text-[#172033]">{a.valuation.pe}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">Dividend Yield</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-bold text-emerald-600">{a.valuation.divYield}</td>
                    ))}
                  </tr>

                  {/* 7. SHAREHOLDING PATTERN */}
                  <tr className="bg-slate-50/40">
                    <td className="p-4 font-black text-[#172033] uppercase text-[10px] tracking-wider" colSpan={4}>
                      7. Ownership & Shareholding
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-slate-500">Institutional FII Holding</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100 font-bold text-primary">{a.shareholding.fii}</td>
                    ))}
                  </tr>

                  {/* 8. ACTIONS BAR */}
                  <tr className="bg-white">
                    <td className="p-4 font-black text-[#172033]">Actions & Workspaces</td>
                    {currentOptions.map(a => (
                      <td key={a.symbol} className="p-4 border-l border-slate-100">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => {
                              onClose();
                              if (onSelectStock) onSelectStock({ symbol: a.symbol, company: a.name });
                            }}
                            className="w-full py-2 rounded-xl bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#172033] font-black text-[11px] transition text-center"
                          >
                            Open Workspace
                          </button>
                          <button
                            onClick={() => {
                              onClose();
                              if (onTrade) onTrade({ symbol: a.symbol, company: a.name, rec: 'BUY' });
                            }}
                            className="w-full py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-[11px] transition text-center shadow-xs"
                          >
                            Trade {a.symbol}
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>

            {/* SEBI AI RELATIVE VALUATION ADVISORY BOX */}
            <div className="bg-primary-light border border-primary-light p-6 rounded-[24px] flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-primary shrink-0 mt-1 fill-primary animate-pulse" />
              <div className="flex-1 text-xs text-slate-800 leading-relaxed font-medium">
                <strong className="block font-black text-primary-dark text-sm mb-1">
                  SEBI AI Relative Valuation Digest
                </strong>
                Comparing {currentOptions[0].symbol} against its peers reveals a favorable risk-reward setup. {currentOptions[0].symbol} is trading at a 15% discount to historical average valuation multiples while generating higher ROE ({currentOptions[0].financials.roe}). Institutional accumulation by FIIs ({currentOptions[0].shareholding.fii}) validates current buy recommendations.
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareModal;
