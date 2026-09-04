import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export interface TickerItem {
  id: string;
  type: 'index' | 'stock' | 'commodity' | 'currency' | 'crypto' | 'alert';
  symbol: string;
  name: string;
  price: string;
  changePercent: number;
  sparkline: number[];
  logoText: string;
  details?: {
    open: string;
    high: string;
    low: string;
    volume: string;
    marketCap: string;
  };
  alertText?: string;
  flash?: 'green' | 'red' | null;
}

export interface MarketRibbonProps {
  initialItems?: TickerItem[];
  wsUrl?: string;
  onItemClick?: (item: TickerItem) => void;
  marketModeOverride?: 'live' | 'after';
}

const DEFAULT_ITEMS: TickerItem[] = [
  {
    id: 'nifty',
    type: 'index',
    symbol: 'NIFTY 50',
    name: 'Nifty 50 Index',
    price: '22,482.15',
    changePercent: 0.82,
    sparkline: [22300, 22350, 22320, 22410, 22440, 22482],
    logoText: 'N50',
    details: { open: '22,340.20', high: '22,510.60', low: '22,310.15', volume: '240M', marketCap: '₹145T' }
  },
  {
    id: 'sensex',
    type: 'index',
    symbol: 'SENSEX',
    name: 'BSE Sensex Index',
    price: '74,312.10',
    changePercent: 0.71,
    sparkline: [73900, 74100, 74050, 74200, 74250, 74312],
    logoText: 'SEN',
    details: { open: '73,950.40', high: '74,400.90', low: '73,880.50', volume: '12M', marketCap: '₹380T' }
  },
  {
    id: 'banknifty',
    type: 'index',
    symbol: 'BANK NIFTY',
    name: 'Nifty Bank Index',
    price: '48,250.60',
    changePercent: -0.24,
    sparkline: [48450, 48380, 48420, 48310, 48290, 48250],
    logoText: 'BNF',
    details: { open: '48,390.10', high: '48,520.40', low: '48,190.80', volume: '110M', marketCap: '₹84T' }
  },
  {
    id: 'ai-alert',
    type: 'alert',
    symbol: 'AI ALERT',
    name: 'AI recommendation engine alert',
    price: '',
    changePercent: 0,
    sparkline: [],
    logoText: 'AI',
    alertText: 'AI Alert: 3 New swing trading opportunities discovered'
  },
  {
    id: 'reliance',
    type: 'stock',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: '3,024.20',
    changePercent: 1.25,
    sparkline: [2980, 2990, 2985, 3010, 3005, 3024],
    logoText: 'RL',
    details: { open: '2,990.00', high: '3,035.00', low: '2,982.00', volume: '4.2M', marketCap: '₹20.4T' }
  },
  {
    id: 'tcs',
    type: 'stock',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    price: '4,185.10',
    changePercent: -0.42,
    sparkline: [4210, 4200, 4205, 4190, 4195, 4185],
    logoText: 'TC',
    details: { open: '4,200.00', high: '4,225.00', low: '4,175.00', volume: '1.8M', marketCap: '₹15.3T' }
  },
  {
    id: 'infy',
    type: 'stock',
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: '1,865.80',
    changePercent: 0.88,
    sparkline: [1845, 1850, 1848, 1858, 1860, 1865],
    logoText: 'IF',
    details: { open: '1,850.00', high: '1,872.00', low: '1,842.00', volume: '2.5M', marketCap: '₹7.7T' }
  },
  {
    id: 'news-alert',
    type: 'alert',
    symbol: 'NEWS UPDATE',
    name: 'Latest market news update',
    price: '',
    changePercent: 0,
    sparkline: [],
    logoText: 'NWS',
    alertText: 'RBI Monetary Policy meeting updates today'
  },
  {
    id: 'gold',
    type: 'commodity',
    symbol: 'GOLD',
    name: 'MCX Gold Futures',
    price: '71,880',
    changePercent: 0.32,
    sparkline: [71600, 71720, 71680, 71820, 71800, 71880],
    logoText: 'AU',
    details: { open: '71,650', high: '71,940', low: '71,580', volume: '4.8K', marketCap: 'Commodity' }
  },
  {
    id: 'silver',
    type: 'commodity',
    symbol: 'SILVER',
    name: 'MCX Silver Futures',
    price: '82,450',
    changePercent: -0.14,
    sparkline: [82600, 82500, 82580, 82420, 82490, 82450],
    logoText: 'AG',
    details: { open: '82,580', high: '82,750', low: '82,310', volume: '8.2K', marketCap: 'Commodity' }
  },
  {
    id: 'usd-inr',
    type: 'currency',
    symbol: 'USD/INR',
    name: 'US Dollar vs Indian Rupee',
    price: '83.42',
    changePercent: 0.05,
    sparkline: [83.38, 83.40, 83.39, 83.41, 83.42, 83.42],
    logoText: '$',
    details: { open: '83.39', high: '83.45', low: '83.37', volume: 'N/A', marketCap: 'Forex' }
  },
  {
    id: 'btc',
    type: 'crypto',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '56,84,590',
    changePercent: 2.14,
    sparkline: [5540000, 5580000, 5560000, 5630000, 5650000, 5684590],
    logoText: '₿',
    details: { open: '55,60,000', high: '57,10,000', low: '55,30,000', volume: '42K', marketCap: '₹112T' }
  },
  {
    id: 'ipo-alert',
    type: 'alert',
    symbol: 'IPO WATCH',
    name: 'IPO Market News',
    price: '',
    changePercent: 0,
    sparkline: [],
    logoText: 'IPO',
    alertText: 'Ola Electric IPO Opens for bidding tomorrow'
  }
];

// Helper to determine if Indian markets are open (Mon-Fri, 9:15 AM - 3:30 PM IST)
const getIsMarketOpen = (): boolean => {
  const options = { timeZone: 'Asia/Kolkata', hour12: false };
  const istString = new Date().toLocaleString('en-US', options);
  const istDate = new Date(istString);

  const day = istDate.getDay(); // 0 = Sunday, 6 = Saturday
  if (day === 0 || day === 6) return false;

  const hours = istDate.getHours();
  const minutes = istDate.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  const openTime = 9 * 60 + 15; // 9:15 AM
  const closeTime = 15 * 60 + 30; // 3:30 PM

  return timeInMinutes >= openTime && timeInMinutes <= closeTime;
};

export const MarketRibbon: React.FC<MarketRibbonProps> = ({
  initialItems = DEFAULT_ITEMS,
  wsUrl,
  onItemClick,
  marketModeOverride
}) => {
   const [items, setItems] = useState<TickerItem[]>(initialItems);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMarketOpen, setIsMarketOpen] = useState(true);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Sync market status state
  useEffect(() => {
    if (marketModeOverride) {
      setIsMarketOpen(marketModeOverride === 'live');
      return;
    }

    const checkStatus = () => {
      setIsMarketOpen(getIsMarketOpen());
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // check status every 30 seconds
    return () => clearInterval(interval);
  }, [marketModeOverride]);

  // WebSocket Live Updates Connection
  useEffect(() => {
    if (!wsUrl) return;

    let socket: WebSocket | null = null;
    let reconnectTimeout: any = null;

    const connectWebSocket = () => {
      try {
        socket = new WebSocket(wsUrl);

        socket.onmessage = (event) => {
          try {
            const feed = JSON.parse(event.data);
            if (feed && feed.id) {
              setItems((prevItems) =>
                prevItems.map((item) => {
                  if (item.id === feed.id) {
                    const oldPrice = parseFloat(item.price.replace(/,/g, ''));
                    const newPrice = parseFloat(feed.price.replace(/,/g, ''));
                    const flash = newPrice > oldPrice ? 'green' : newPrice < oldPrice ? 'red' : null;

                    return {
                      ...item,
                      price: feed.price,
                      changePercent: feed.changePercent !== undefined ? feed.changePercent : item.changePercent,
                      flash
                    };
                  }
                  return item;
                })
              );

              // Reset flash state
              setTimeout(() => {
                setItems((curr) => curr.map((it) => it.id === feed.id ? { ...it, flash: null } : it));
              }, 1000);
            }
          } catch (err) {
            console.error('Error parsing WebSocket message frame', err);
          }
        };

        socket.onerror = (err) => {
          console.error('Market Ribbon WebSocket error', err);
        };

        socket.onclose = () => {
          // Reconnect automatically with backoff
          reconnectTimeout = setTimeout(connectWebSocket, 5000);
        };
      } catch (e) {
        console.error('WebSocket connection setup failed', e);
        reconnectTimeout = setTimeout(connectWebSocket, 5000);
      }
    };

    connectWebSocket();

    return () => {
      if (socket) socket.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [wsUrl]);

  // Fallback simulator for live price ticks (if WebSocket is not active)
  useEffect(() => {
    if (wsUrl) return; // delegate updates to WebSocket if connected

    // Update interval slows down during After Market Mode to save battery/network
    const delay = isMarketOpen ? 3500 : 12000;

    const interval = setInterval(() => {
      setItems((prevItems) => {
        const eligibleItems = prevItems.filter((item) => item.type !== 'alert');
        if (eligibleItems.length === 0) return prevItems;

        const target = eligibleItems[Math.floor(Math.random() * eligibleItems.length)];

        return prevItems.map((item) => {
          if (item.id === target.id) {
            const numericPrice = parseFloat(item.price.replace(/,/g, ''));
            if (isNaN(numericPrice)) return item;

            // Simulator applies smaller variance in After Market mode
            const limit = isMarketOpen ? 0.4 : 0.08;
            const variance = (Math.random() * limit - (limit / 2)) / 100;
            const newPriceVal = numericPrice * (1 + variance);
            const priceDiff = newPriceVal - numericPrice;

            let formattedPrice = '';
            if (item.type === 'currency') {
              formattedPrice = newPriceVal.toFixed(2);
            } else if (item.type === 'stock' || item.type === 'index') {
              formattedPrice = newPriceVal.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              });
            } else {
              formattedPrice = Math.round(newPriceVal).toLocaleString('en-IN');
            }

            return {
              ...item,
              price: formattedPrice,
              changePercent: item.changePercent + (variance * 100),
              flash: priceDiff > 0 ? 'green' : 'red'
            };
          }
          return item;
        });
      });

      // Clear color flash highlight
      setTimeout(() => {
        setItems((current) => current.map((item) => item.flash ? { ...item, flash: null } : item));
      }, 1000);

    }, delay);

    return () => clearInterval(interval);
  }, [isMarketOpen, wsUrl]);

  return (
    <div className="relative w-full bg-[#172033] border-y border-slate-800 h-12 flex items-center overflow-hidden z-20 select-none">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
      
      {/* Market Status indicator badge */}
      <div className={`text-[9px] font-black tracking-widest px-3 h-full flex items-center shrink-0 border-r border-slate-800 z-20 gap-1.5 ${
        isMarketOpen ? 'text-[#10B981]' : 'text-slate-400'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${
          isMarketOpen ? 'bg-[#10B981] animate-pulse' : 'bg-slate-500'
        }`} />
        <span>{isMarketOpen ? 'LIVE MARKET' : 'AFTER MARKET'}</span>
      </div>

      {/* Scrolling / Marquee Container */}
      <div 
        ref={marqueeRef}
        className="flex-1 h-full overflow-hidden flex items-center relative"
      >
        <motion.div
          className="flex items-center gap-6 pr-6 shrink-0 whitespace-nowrap"
          animate={{ x: [0, -1600] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 38,
              ease: 'linear'
            }
          }}
          style={{
            // When hovered, pause using CSS pointerEvents
            animationPlayState: hoveredId ? 'paused' : 'running'
          }}
        >
          {/* Render marquee items (doubled for smooth looping transition when scrolling automatically) */}
          {[...items, ...items].map((item, index) => {
            const isAlert = item.type === 'alert';
            const isPositive = item.changePercent >= 0;
            const uniqueKey = `${item.id}-${index}`;
            const isHovered = hoveredId === uniqueKey;

            return (
              <div
                key={uniqueKey}
                onMouseEnter={() => !isAlert && setHoveredId(uniqueKey)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onItemClick && onItemClick(item)}
                className={`relative flex items-center gap-2.5 h-full px-3 py-1.5 rounded-lg border border-transparent transition-all duration-200 cursor-pointer ${
                  item.flash === 'green' 
                    ? 'bg-emerald-950/40 border-[#10B981]/30' 
                    : item.flash === 'red' 
                    ? 'bg-rose-950/40 border-loss/30' 
                    : 'hover:bg-slate-800/40 hover:border-slate-800'
                }`}
              >
                {/* Logo Text/Icon */}
                <span className={`w-6 h-6 rounded-md flex items-center justify-center font-black text-[9px] ${
                  isAlert 
                    ? 'bg-amber-950/50 text-amber-400 text-xs' 
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {item.logoText}
                </span>

                {/* Info Text */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-white">{item.symbol}</span>
                    {!isAlert && (
                      <span className={`text-[8.5px] font-extrabold flex items-center ${
                        isPositive ? 'text-[#10B981]' : 'text-loss'
                      }`}>
                        {isPositive ? '▲' : '▼'}{Math.abs(item.changePercent).toFixed(2)}%
                      </span>
                    )}
                  </div>
                  {isAlert ? (
                    <span className="text-[9px] font-bold text-slate-400 leading-none mt-0.5">{item.alertText}</span>
                  ) : (
                    <span className="text-[9px] font-extrabold text-slate-300 leading-none mt-0.5">₹{item.price}</span>
                  )}
                </div>

                {/* Mini Sparkline for assets */}
                {!isAlert && item.sparkline.length > 0 && (
                  <svg className="w-10 h-4 overflow-visible shrink-0 ml-1" viewBox="0 0 50 20">
                    <path
                      d={isPositive 
                        ? 'M0 16 L10 12 L20 14 L30 6 L40 8 L50 2' 
                        : 'M0 4 L10 8 L20 6 L30 14 L40 12 L50 18'
                      }
                      fill="none"
                      stroke={isPositive ? '#10B981' : '#DC2626'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                {/* Expanded Hover Overlay Details Card */}
                {isHovered && item.details && (
                  <div className="absolute top-10 left-0 w-64 bg-[#172033] border border-[#334155] rounded-xl shadow-2xl p-4 z-50 text-white flex flex-col gap-3 transition-opacity">
                    <div className="flex items-start justify-between border-b border-slate-700/50 pb-2">
                      <div>
                        <h4 className="text-xs font-black text-white">{item.name}</h4>
                        <span className="text-[9px] text-slate-400">{item.symbol} • Spot Details</span>
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isPositive ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEECEC] text-[#991B1B]'
                      }`}>
                        {isPositive ? '▲' : '▼'}{Math.abs(item.changePercent).toFixed(2)}%
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Open</span>
                        <span className="font-bold text-slate-100">{item.details.open}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">High</span>
                        <span className="font-bold text-slate-100">{item.details.high}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Low</span>
                        <span className="font-bold text-slate-100">{item.details.low}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1">
                        <span className="text-slate-400">Volume</span>
                        <span className="font-bold text-slate-100">{item.details.volume}</span>
                      </div>
                      <div className="col-span-2 flex justify-between pt-1">
                        <span className="text-slate-400">Market Value</span>
                        <span className="font-bold text-slate-100">{item.details.marketCap}</span>
                      </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-primary text-white font-bold py-1.5 rounded-lg text-[9px] flex items-center justify-center gap-1 transition-colors mt-1">
                      Explore Stock Analytics <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
};

export default MarketRibbon;
