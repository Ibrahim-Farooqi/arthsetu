import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Sparkles, Newspaper, TrendingUp, TrendingDown, 
  ArrowUpRight, ArrowDownRight, Filter, ChevronRight, Bookmark, AlertCircle
} from 'lucide-react';
import NewsDetail from './NewsDetail';

interface NewsCenterProps {
  onSelectStock: (stock: any) => void;
}

export interface MarketNewsArticle {
  id: string;
  headline: string;
  source: string;
  time: string;
  category: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  summary: string;
  whyItMatters: string;
  impactLevel: 'High' | 'Medium' | 'Low';
  positiveStocks: string[];
  negativeStocks: string[];
  image?: string;
}

const NEWS_DATABASE: MarketNewsArticle[] = [
  {
    id: 'news-1',
    headline: 'RBI Maintains Repo Rate at 6.50%; Signals Focus on Liquidity & Growth',
    source: 'Bloomberg Intelligence',
    time: '15 mins ago',
    category: 'Monetary Policy',
    sentiment: 'Bullish',
    summary: 'The Monetary Policy Committee voted unanimously to keep policy rates unchanged while maintaining liquidity support for retail banking.',
    whyItMatters: 'Lower funding costs and stable interest rate trajectory provide net interest margin (NIM) relief for private sector banks and stimulate commercial credit demand.',
    impactLevel: 'High',
    positiveStocks: ['HDFCBANK', 'ICICIBANK', 'SBIN'],
    negativeStocks: ['IT Sector (Dollar Softness)'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'news-2',
    headline: 'Reliance Industries Commissioning Phase-1 Green Hydrogen Electrolyzer Plant',
    source: 'Financial Express',
    time: '1 hour ago',
    category: 'Energy & Commodities',
    sentiment: 'Bullish',
    summary: 'Reliance confirms initial trial runs at the Jamnagar gigafactory complex, marking India\'s largest clean energy transition milestone.',
    whyItMatters: 'Captures government PLI incentives and lowers captive energy costs for oil-to-chemicals refining operations over the next 5 years.',
    impactLevel: 'High',
    positiveStocks: ['RELIANCE', 'KPIGREEN'],
    negativeStocks: ['Coal Thermal Utilities'],
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'news-3',
    headline: 'US Fed Rate Cut Expectations Shift IT Sector Demand Guidance',
    source: 'Economic Times',
    time: '3 hours ago',
    category: 'Global Markets',
    sentiment: 'Neutral',
    summary: 'North American banking clients delay discretionary IT spend decisions pending US election policy clarity.',
    whyItMatters: 'May cause near-term revenue growth moderation for tier-1 Indian IT service exporters before Q3 budget ramp-ups.',
    impactLevel: 'Medium',
    positiveStocks: ['TCS (Defensive Cash Flow)'],
    negativeStocks: ['INFY', 'WIPRO'],
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop'
  }
];

export const NewsCenter: React.FC<NewsCenterProps> = ({ onSelectStock }) => {
  const [subTab, setSubTab] = useState<'for-you' | 'all' | 'sectors' | 'macro'>('for-you');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<MarketNewsArticle | null>(null);

  const filteredNews = NEWS_DATABASE.filter(art => 
    art.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.positiveStocks.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#15519D] mb-1">
            <Newspaper className="w-4 h-4" />
            <span>AI-Contextualized Financial Intelligence</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Market News & Impact Feed
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Every story analyzed by AI for market impact, affected tickers, and actionable takeaway.
          </p>
        </div>

        {/* Top Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, stock, or topic..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#15519D] transition-all"
          />
        </div>
      </div>

      {/* Sub Nav */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto">
        {[
          { id: 'for-you', label: 'For You (Personalized)' },
          { id: 'all', label: 'Top Headlines' },
          { id: 'sectors', label: 'Sector Specific' },
          { id: 'macro', label: 'Macro & Policy' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSubTab(item.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
              subTab === item.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* News Feed List */}
      <div className="space-y-6">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedNews(article)}
            className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer space-y-4"
          >
            {/* Top Info Bar */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 font-extrabold text-[11px] rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{article.source} • {article.time}</span>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                article.impactLevel === 'High' ? 'bg-rose-50 text-[#DC2626]' : 'bg-blue-50 text-[#15519D]'
              }`}>
                Market Impact: {article.impactLevel}
              </span>
            </div>

            {/* Headline */}
            <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-[#15519D] transition-colors leading-snug">
              {article.headline}
            </h3>

            {/* Summary */}
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              {article.summary}
            </p>

            {/* SIGNATURE AI "WHY THIS MATTERS" CARD */}
            <div className="p-4 bg-gradient-to-r from-blue-50/80 to-slate-50 rounded-2xl border border-blue-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#15519D]">
                <Sparkles className="w-4 h-4" />
                <span>WHY THIS MATTERS</span>
              </div>

              <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                "{article.whyItMatters}"
              </p>

              {/* Potentially Positive vs Negative Stocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-extrabold text-[#16A34A] whitespace-nowrap">Potentially Positive:</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {article.positiveStocks.map((stk) => (
                      <span 
                        key={stk} 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStock({ symbol: stk, companyName: stk });
                        }}
                        className="px-2 py-0.5 bg-emerald-50 text-[#16A34A] font-extrabold rounded-md hover:underline"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="font-extrabold text-[#DC2626] whitespace-nowrap">Potentially Negative:</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {article.negativeStocks.map((stk) => (
                      <span 
                        key={stk} 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectStock({ symbol: stk, companyName: stk });
                        }}
                        className="px-2 py-0.5 bg-rose-50 text-[#DC2626] font-extrabold rounded-md hover:underline"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ARTICLE DETAIL MODAL */}
      {selectedNews && (
        <NewsDetail
          isOpen={!!selectedNews}
          onClose={() => setSelectedNews(null)}
          newsItem={selectedNews}
          onOpenCompany={(sym) => {
            setSelectedNews(null);
            onSelectStock({ symbol: sym, companyName: sym });
          }}
        />
      )}
    </div>
  );
};

export default NewsCenter;
