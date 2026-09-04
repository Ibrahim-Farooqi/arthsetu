import React, { useEffect, useState } from 'react';
import marketService from '../../services/market.service';

interface TickerItem {
  symbol: string;
  price: string;
  changePercent: number;
  isPositive: boolean;
  sparkline: number[];
}

const FALLBACK_TICKER: TickerItem[] = [
  { symbol: 'RELIANCE', price: '1,313.10', changePercent: 0.31, isPositive: true, sparkline: [1295, 1305, 1313.1] },
  { symbol: 'TCS', price: '2,348.00', changePercent: -0.89, isPositive: false, sparkline: [2360, 2350, 2348] },
  { symbol: 'HDFCBANK', price: '700.80', changePercent: -1.56, isPositive: false, sparkline: [705, 702, 700.8] },
  { symbol: 'INFY', price: '1,140.00', changePercent: -1.38, isPositive: false, sparkline: [1145, 1142, 1140] },
  { symbol: 'ICICIBANK', price: '1,426.50', changePercent: -0.80, isPositive: false, sparkline: [1435, 1430, 1426.5] },
  { symbol: 'LT', price: '3,981.00', changePercent: 0.02, isPositive: true, sparkline: [3960, 3975, 3981] },
  { symbol: 'SBIN', price: '1,020.90', changePercent: -1.31, isPositive: false, sparkline: [1030, 1025, 1020.9] },
  { symbol: 'MARUTI', price: '12,849.00', changePercent: -0.78, isPositive: false, sparkline: [12900, 12860, 12849] },
  { symbol: 'ZOMATO', price: '215.19', changePercent: 0.0, isPositive: true, sparkline: [214, 215, 215.19] },
];

export const LiveStockTicker: React.FC<{ onSelectStock?: (symbol: string) => void }> = ({ onSelectStock }) => {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>(FALLBACK_TICKER);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveTicker = async () => {
      try {
        const stocks = await marketService.getStocks();
        if (stocks && stocks.length > 0 && isMounted) {
          const mapped: TickerItem[] = stocks.map((s) => ({
            symbol: s.symbol,
            price: s.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            changePercent: s.changePercent,
            isPositive: s.changePercent >= 0,
            sparkline: [
              s.lastPrice * (1 - (s.changePercent / 200)),
              s.lastPrice * (1 - (s.changePercent / 400)),
              s.lastPrice,
            ],
          }));
          setTickerItems(mapped);
        }
      } catch (e) {
        // keep previous state
      }
    };

    fetchLiveTicker();
    // Poll fresh live prices every 15 seconds
    const interval = setInterval(fetchLiveTicker, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Duplicate array to create seamless infinite loop marquee
  const displayItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-[#0F1F35] border-b border-slate-800/80 text-white overflow-hidden py-1.5 px-4 sticky top-0 z-50 select-none group">
      <style>{`
        @keyframes tickerMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-ticker-marquee {
          display: flex;
          width: max-content;
          animation: tickerMarquee 50s linear infinite;
        }
        .group:hover .animate-ticker-marquee {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-ticker-marquee flex items-center gap-8">
        {displayItems.map((item, idx) => (
          <div
            key={`${item.symbol}-${idx}`}
            onClick={() => onSelectStock && onSelectStock(item.symbol)}
            className="flex items-center gap-2.5 text-xs font-bold whitespace-nowrap cursor-pointer hover:text-blue-300 transition-colors shrink-0"
          >
            <span className="text-slate-200 tracking-wide">{item.symbol}</span>
            <span className="text-white font-extrabold font-mono">₹{item.price}</span>

            <div
              className={`flex items-center gap-1 font-extrabold text-[11px] ${
                item.isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <span>{item.isPositive ? '▲' : '▼'}</span>
              <span>{item.isPositive ? `+${item.changePercent}%` : `${item.changePercent}%`}</span>
            </div>

            {/* Sparkline */}
            <svg className="w-10 h-3 overflow-visible" viewBox="0 0 30 12">
              <polyline
                fill="none"
                stroke={item.isPositive ? '#10B981' : '#F43F5E'}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={item.sparkline
                  .map((val, i) => {
                    const min = Math.min(...item.sparkline);
                    const max = Math.max(...item.sparkline);
                    const range = max - min || 1;
                    const x = (i / (item.sparkline.length - 1)) * 30;
                    const y = 12 - ((val - min) / range) * 10;
                    return `${x.toFixed(1)},${y.toFixed(1)}`;
                  })
                  .join(' ')}
              />
            </svg>

            <span className="text-slate-700 font-normal ml-2">|</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStockTicker;
