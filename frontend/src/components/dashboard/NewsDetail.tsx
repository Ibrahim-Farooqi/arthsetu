import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, Bookmark, Share2, Wallet, 
  ArrowRight, CheckCircle2, Zap, ShieldCheck, BarChart3,
  Building2, ChevronRight, Sparkles, AlertCircle, FileText,
  BookmarkCheck, Star, ArrowUpRight, ArrowDownRight, Layers, DollarSign, Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

interface NewsDetailProps {
  isOpen: boolean;
  onClose: () => void;
  newsItem: any;
  onOpenCompany?: (symbol: string) => void;
  onOpenResearch?: (researchData: any) => void;
  onTrade?: (tradeData: any) => void;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({
  isOpen,
  onClose,
  newsItem,
  onOpenCompany,
  onOpenResearch,
  onTrade
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top when article opens
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setScrollProgress(0);
    }
  }, [newsItem]);

  if (!isOpen || !newsItem) return null;

  const headline = newsItem.headline || newsItem.title || 'RBI Policy: Repo Rate Kept Unchanged at 6.5% as Inflation Target Remains Priority';
  const source = newsItem.source || 'Bloomberg Intelligence';
  const time = newsItem.time || '15 min ago';
  const readTime = newsItem.readTime || '4 min read';
  const category = newsItem.category || 'Economy & Policy';
  const image = newsItem.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop';
  const sentiment = newsItem.sentiment || 'Bullish';
  const affectedStocks = newsItem.stocks || ['HDFCBANK', 'RELIANCE', 'LT'];
  const summary = newsItem.summary || 'The Reserve Bank of India maintained its key policy rates unchanged while reiterating commitment to bring retail inflation closer to the 4% target. Banking stocks responded positively to liquidity measures.';
  const primaryStock = affectedStocks[0] || 'RELIANCE';

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from Bookmarks' : 'Saved to Market Intelligence Bookmarks');
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  // Mock Company Details for Sticky Sidebar
  const companySnapshots: Record<string, any> = {
    'RELIANCE': { logo: 'R', price: '₹2,940.35', change: '+2.45%', isPositive: true, mcap: '₹19.89 L Cr', pe: '26.4', high52: '₹3,024.90', low52: '₹2,221.05' },
    'HDFCBANK': { logo: 'H', price: '₹1,610.15', change: '+1.82%', isPositive: true, mcap: '₹12.24 L Cr', pe: '18.9', high52: '₹1,794.00', low52: '₹1,363.55' },
    'ICICIBANK': { logo: 'I', price: '₹1,180.20', change: '+1.54%', isPositive: true, mcap: '₹8.28 L Cr', pe: '17.2', high52: '₹1,240.80', low52: '₹915.20' },
    'TCS': { logo: 'T', price: '₹4,120.45', change: '-0.85%', isPositive: false, mcap: '₹14.98 L Cr', pe: '29.8', high52: '₹4,254.75', low52: '₹3,070.30' },
    'INFY': { logo: 'In', price: '₹1,560.50', change: '-0.92%', isPositive: false, mcap: '₹6.48 L Cr', pe: '23.4', high52: '₹1,733.00', low52: '₹1,355.00' },
    'ADANIENT': { logo: 'A', price: '₹2,842.10', change: '+3.15%', isPositive: true, mcap: '₹3.24 L Cr', pe: '82.5', high52: '₹3,450.00', low52: '₹1,850.20' }
  };

  const defaultSnapshot = { logo: primaryStock.substring(0, 2), price: '₹752.40', change: '+1.20%', isPositive: true, mcap: '₹8,520 Cr', pe: '21.2', high52: '₹840.00', low52: '₹590.10' };
  const companyData = companySnapshots[primaryStock] || defaultSnapshot;

  // News Timelines per Stock
  const newsTimelines: Record<string, Array<{ date: string; title: string; summary: string; price: string; change: string; isPositive: boolean }>> = {
    'RELIANCE': [
      { date: 'Today', title: 'Green Hydrogen Gigafactory Commissioning Approaches', summary: 'Phase-1 electrolyzer production setup finalized at Jamnagar complex.', price: '₹2,940.35', change: '+2.45%', isPositive: true },
      { date: '3 Days Ago', title: 'Retail FMCG Distribution Expansion', summary: 'Launches southern regional central hub to cut inventory days by 15%.', price: '₹2,910.10', change: '+1.10%', isPositive: true },
      { date: '1 Week Ago', title: 'Jio Announces Average Revenue (ARPU) Surge', summary: 'Premium tier data subscriptions drive tariff improvements.', price: '₹2,880.00', change: '+3.80%', isPositive: true },
      { date: '1 Month Ago', title: 'Q4 Consol Net Profit Outperforms Consensus', summary: 'Upstream oil & gas fields gas pricing offsets refinery margins.', price: '₹2,790.00', change: '+4.50%', isPositive: true }
    ],
    'HDFCBANK': [
      { date: 'Today', title: 'Board Finalizes ₹19.5 Dividend Payout', summary: 'High dividend payout record ratio to support stock price accumulation.', price: '₹1,610.15', change: '+1.82%', isPositive: true },
      { date: '3 Days Ago', title: 'ADR Gains 4% on NYSE', summary: 'Global institutional flow increases banking allocations post policy.', price: '₹1,580.00', change: '+2.20%', isPositive: true },
      { date: '1 Week Ago', title: 'RBI Repo Rate Pause Stabilizes Yields', summary: 'Provides HDFC Bank headroom to balance net interest margin contraction.', price: '₹1,560.50', change: '+1.05%', isPositive: true },
      { date: '1 Month Ago', title: 'Monthly Credit Book Update Shows 16% YoY Expansion', summary: 'Retail mortgage portfolios maintain leadership positions.', price: '₹1,510.00', change: '+3.50%', isPositive: true }
    ],
    'TCS': [
      { date: 'Today', title: 'Consolidation on Yield Yield Headwinds', summary: 'Softening US inflation leads to minor IT sector profit booking.', price: '₹4,120.45', change: '-0.85%', isPositive: false },
      { date: '3 Days Ago', title: 'Azure Generative AI Enterprise Cloud Launch', summary: 'Partnership expected to generate $120M annual recurring revenue.', price: '₹4,150.00', change: '+1.50%', isPositive: true },
      { date: '1 Week Ago', title: '₹4,150 Share Buyback Offer Opens', summary: 'Retail eligibility ratio projected at favorable 15%.', price: '₹4,100.00', change: '+2.80%', isPositive: true },
      { date: '1 Month Ago', title: 'New Deal Pipelines TCV Hits $4.2B', summary: 'Mega scale public sector modernization wins in Europe.', price: '₹3,950.00', change: '+4.20%', isPositive: true }
    ]
  };

  const defaultTimeline = [
    { date: 'Today', title: 'Strategic Product Expansion Announced', summary: 'Launches next-gen investment product offering to advisors.', price: '₹752.40', change: '+1.20%', isPositive: true },
    { date: '1 Week Ago', title: 'Institutional Block Deal Completed', summary: 'Fidelity and Templeton increase stake by combined 1.8%.', price: '₹740.00', change: '+3.00%', isPositive: true },
    { date: '1 Month Ago', title: 'AGM Shareholders Meet Highlights', summary: 'Board clarifies debt-reduction targets for next fiscal cycles.', price: '₹710.00', change: '+5.00%', isPositive: true }
  ];

  const timelineData = newsTimelines[primaryStock] || defaultTimeline;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-[#F8FAFC] overflow-y-auto flex flex-col justify-between"
      onScroll={handleScroll}
      ref={containerRef}
    >
      {/* READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-1 bg-primary transition-all duration-75 z-[110]" style={{ width: `${scrollProgress}%` }} />

      {/* STICKY HEADER */}
      <header className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between z-30 shadow-xs gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black bg-primary-light text-primary px-2.5 py-1 rounded-lg border border-[#E2E8F0] uppercase">
              {category}
            </span>
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              {source} · {time} · {readTime}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBookmark}
            className={`w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center transition cursor-pointer ${
              isBookmarked ? 'bg-primary-light text-primary border-primary-light' : 'text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Bookmark className="w-4.5 h-4.5" fill={isBookmarked ? '#15519D' : 'none'} />
          </button>
          <button
            onClick={() => toast.success('Article link copied to clipboard')}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition cursor-pointer"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => {
              if (onOpenCompany) onOpenCompany(primaryStock);
            }}
            className="px-4 py-2.5 rounded-xl bg-[#172033] text-white font-black text-xs hover:bg-slate-800 transition cursor-pointer"
          >
            Open Workspace
          </button>
        </div>
      </header>

      {/* ARTICLE WRAPPER GRID */}
      <main className="max-w-7xl mx-auto w-full p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        
        {/* LEFT COLUMN: EDITORIAL CONTENT (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Header Title */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase ${
                sentiment === 'Bullish' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {sentiment} Impact
              </span>
              <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Market Intelligence Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-4.5xl font-black text-[#172033] leading-tight">
              {headline}
            </h1>
          </div>

          {/* Large Hero Image */}
          <div className="relative h-80 sm:h-110 w-full rounded-[28px] overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
            <img src={image} alt={headline} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
              <span className="text-white text-xs font-bold bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                Source: {source} Bureau
              </span>
            </div>
          </div>

          {/* AI SUMMARY HIGHLIGHTED CARD */}
          <section className="bg-primary-light/70 border border-primary-light/80 rounded-[28px] p-6 sm:p-8 flex flex-col gap-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <span className="text-xs font-black text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary fill-primary/10 animate-pulse" /> AI INVESTMENT THESIS & CRITICAL TAKEAWAYS
              </span>
              <span className="text-[10px] font-black text-primary bg-white border border-primary-light px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>

            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Key Recommendation</span>
                <strong className="text-slate-800">Accumulate core Large-Caps on target consolidation</strong>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Estimated Short-Term Impact</span>
                <strong className="text-emerald-700">Moderate Bullish (+1.5% to +2.0% sector swing)</strong>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0]">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Estimated Long-Term Impact</span>
                <strong className="text-primary">Highly Favorable structural margins re-rating</strong>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">Risk Rating</span>
                  <strong className="text-slate-800">Low Volatility</strong>
                </div>
                <div className="px-2.5 py-1 rounded bg-primary-light text-primary-dark font-black text-[9px] uppercase">
                  LOW RISK
                </div>
              </div>
            </div>
          </section>

          {/* EDITORIAL FULL TEXT */}
          <section className="bg-white rounded-[28px] border border-slate-200 p-8 shadow-xs text-slate-700 leading-relaxed text-sm font-medium flex flex-col gap-6 max-w-none">
            <h3 className="text-lg font-black text-[#172033] border-b border-slate-100 pb-3">Strategic Intelligence Breakdown</h3>
            <p>
              In a comprehensive policy evaluation, banking regulators kept standard repo rates stable. Bank executives cited the policy as highly supportive of net interest margin sustainability, ensuring deposit costs are held constant.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 py-1.5 italic text-slate-800 font-extrabold bg-slate-50 rounded-r-xl pr-4 my-2">
              "The current liquidity setup provides banks with a solid structural base to expand credit portfolios while minimizing cost-of-fund spikes over Q3."
            </blockquote>
            <p>
              Institutional inflows (FII) into financial services expanded. Market makers expect high stability index configurations. Sector updates point to a favorable environment for large-cap banking assets.
            </p>
          </section>

          {/* NEWS TIMELINE ⭐ */}
          <section className="bg-white rounded-[28px] border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-[#172033] leading-tight">Company News Evolution</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">Timeline & stock price reaction history for ${primaryStock}</span>
              </div>
              <span className="text-[10px] text-primary bg-primary-light border border-primary-light px-3 py-1 rounded-full font-black">AI Correlated</span>
            </div>

            <div className="flex flex-col gap-6 relative pl-6 before:absolute before:inset-y-1 before:left-2 before:w-0.5 before:bg-slate-100">
              {timelineData.map((item, idx) => (
                <div key={idx} className="relative flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50 hover:bg-slate-100/75 border border-slate-100 rounded-2xl p-4.5 transition">
                  <div className="absolute -left-[28.5px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white bg-primary shadow-xs" />
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                    </div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                      {item.summary}
                    </p>
                  </div>

                  {/* Stock price response */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0 gap-1 border-t sm:border-t-0 border-slate-200 pt-2 sm:pt-0">
                    <span className="text-xs font-black text-slate-800">{item.price}</span>
                    <span className={`text-[10px] font-black flex items-center ${item.isPositive ? 'text-emerald-600' : 'text-danger'}`}>
                      {item.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 inline" /> : <ArrowDownRight className="w-3.5 h-3.5 inline" />} {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RELATED INFORMATION */}
          <section className="bg-white rounded-[28px] border border-slate-200 p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-sm font-black text-[#172033]">Related Research & Intelligence</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => {
                  if (onOpenResearch) onOpenResearch({ symbol: primaryStock, company: primaryStock });
                }}
                className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-300 transition cursor-pointer flex justify-between items-center"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-primary font-black uppercase">RESEARCH REPORT</span>
                  <span className="font-extrabold text-xs text-slate-800">SEBI Registered Research Report</span>
                  <span className="text-[10px] text-slate-400">Target upside +18.4%</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div 
                onClick={() => toast.success('Related Corporate split details loaded')}
                className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-300 transition cursor-pointer flex justify-between items-center"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-primary font-black uppercase">CORPORATE ACTION</span>
                  <span className="font-extrabold text-xs text-slate-800">Dividend history details FY25-26</span>
                  <span className="text-[10px] text-slate-400">Payout record dates details</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: STICKY COMPANY SNAPSHOT SIDEBAR (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 flex flex-col gap-6">
            
            {/* STICKY COMPANY CARD */}
            <div className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-xs flex flex-col gap-5">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black text-lg flex items-center justify-center shadow-xs">
                  {companyData.logo}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-black text-base text-slate-900 leading-tight">{primaryStock}</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">National Stock Exchange</span>
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">{companyData.price}</span>
                <span className={`text-xs font-black flex items-center ${companyData.isPositive ? 'text-emerald-600' : 'text-danger'}`}>
                  {companyData.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />} {companyData.change}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">Market Cap</span>
                  <span className="font-extrabold text-slate-800">{companyData.mcap}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">P/E Ratio</span>
                  <span className="font-extrabold text-slate-800">{companyData.pe}</span>
                </div>
                <div className="pt-2.5 border-t border-slate-200/60">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">52 Week High</span>
                  <span className="font-extrabold text-emerald-600">{companyData.high52}</span>
                </div>
                <div className="pt-2.5 border-t border-slate-200/60">
                  <span className="text-[9px] text-slate-400 font-black uppercase tracking-wider block">52 Week Low</span>
                  <span className="font-extrabold text-danger">{companyData.low52}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    if (onTrade) onTrade({ symbol: primaryStock, company: primaryStock, rec: sentiment === 'Bullish' ? 'BUY' : 'SELL' });
                  }}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Trade Stock
                </button>
                
                <button
                  onClick={() => {
                    if (onOpenCompany) onOpenCompany(primaryStock);
                  }}
                  className="w-full py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-black text-xs transition cursor-pointer"
                >
                  Open Workspace
                </button>

                <button
                  onClick={() => {
                    if (onOpenResearch) onOpenResearch({ symbol: primaryStock, company: primaryStock });
                  }}
                  className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition cursor-pointer"
                >
                  View Research Report
                </button>

                <button
                  onClick={() => toast.success(`${primaryStock} added to active watchlists`)}
                  className="w-full py-3 rounded-xl bg-white border border-dashed border-slate-300 hover:border-slate-400 text-slate-500 hover:text-slate-700 font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add to Watchlist
                </button>
              </div>

            </div>

          </div>
        </div>

      </main>

      {/* FOOTER ACTION BAR */}
      <footer className="sticky bottom-0 bg-white border-t border-slate-200 p-5 z-30 flex items-center justify-between gap-4 shadow-lg">
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500">
          <span>Primary Impact:</span>
          <span className="font-black text-slate-900">${primaryStock} (NSE)</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              if (onOpenResearch) onOpenResearch({ symbol: primaryStock, company: primaryStock });
            }}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition cursor-pointer"
          >
            Advisory Research
          </button>

          <button
            onClick={() => {
              if (onTrade) onTrade({ symbol: primaryStock, company: primaryStock, rec: sentiment === 'Bullish' ? 'BUY' : 'SELL' });
            }}
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition cursor-pointer shadow-md"
          >
            Trade {primaryStock}
          </button>
        </div>
      </footer>

    </motion.div>
  );
};

export default NewsDetail;
