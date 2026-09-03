import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Activity, ArrowRight, Zap, Shield } from 'lucide-react';

interface DataObject {
  id: string;
  symbol: string;
  name: string;
  price: string;
  changePercent: number;
  marketCap: string;
  category: 'equity' | 'index' | 'commodity' | 'currency' | 'crypto';
  x: number; // percentage X position
  y: number; // percentage Y position
  depth: 'fg' | 'mg' | 'bg'; // foreground, midground, background
  flash?: 'up' | 'down' | null;
}

const INITIAL_DATA_OBJECTS: DataObject[] = [
  { id: 'nifty', symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: '24,520.40', changePercent: 0.84, marketCap: '₹145T', category: 'index', x: 20, y: 22, depth: 'fg' },
  { id: 'reliance', symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹3,024.25', changePercent: 1.18, marketCap: '₹20.4T', category: 'equity', x: 65, y: 18, depth: 'fg' },
  { id: 'tcs', symbol: 'TCS', name: 'Tata Consultancy Services', price: '₹4,185.10', changePercent: 0.72, marketCap: '₹15.2T', category: 'equity', x: 80, y: 48, depth: 'fg' },
  { id: 'banknifty', symbol: 'BANKNIFTY', name: 'Nifty Bank Index', price: '52,340.80', changePercent: 1.12, marketCap: '₹84T', category: 'index', x: 35, y: 68, depth: 'fg' },
  { id: 'infy', symbol: 'INFY', name: 'Infosys Ltd', price: '₹1,562.10', changePercent: 0.85, marketCap: '₹6.5T', category: 'equity', x: 15, y: 78, depth: 'mg' },
  { id: 'gold', symbol: 'GOLD 24K', name: 'Sovereign Gold', price: '₹72,400', changePercent: 0.45, marketCap: 'Commodity', category: 'commodity', x: 75, y: 82, depth: 'mg' },
  { id: 'usdinr', symbol: 'USD/INR', name: 'US Dollar / Rupee', price: '85.62', changePercent: -0.12, marketCap: 'Forex', category: 'currency', x: 48, y: 12, depth: 'mg' },
  { id: 'btc', symbol: 'BTC/INR', name: 'Bitcoin / Rupee', price: '₹1,08,42,000', changePercent: 2.40, marketCap: 'Digital Asset', category: 'crypto', x: 40, y: 42, depth: 'fg' },
  { id: 'hdfcbank', symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', price: '₹1,682.40', changePercent: 0.95, marketCap: '₹12.8T', category: 'equity', x: 85, y: 72, depth: 'bg' },
  { id: 'tatasteel', symbol: 'TATASTEEL', name: 'Tata Steel Ltd', price: '₹147.20', changePercent: 2.15, marketCap: '₹1.8T', category: 'equity', x: 25, y: 48, depth: 'bg' },
];

interface LiveDataCanvasHeroProps {
  theme?: 'dark' | 'light';
  onObjectClick?: (objectId: string) => void;
}

export const LiveDataCanvasHero: React.FC<LiveDataCanvasHeroProps> = ({
  theme = 'dark',
  onObjectClick,
}) => {
  const [dataObjects, setDataObjects] = useState<DataObject[]>(INITIAL_DATA_OBJECTS);
  const [hoveredObject, setHoveredObject] = useState<DataObject | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [aiClusterSignal, setAiClusterSignal] = useState<{ title: string; stocks: string[] } | null>(null);

  // Sub-second live price simulation every 2 seconds
  useEffect(() => {
    const tickTimer = setInterval(() => {
      setDataObjects((prev) => {
        const randIdx = Math.floor(Math.random() * prev.length);
        return prev.map((obj, i) => {
          if (i === randIdx) {
            const isUp = Math.random() > 0.3;
            const deltaPercent = isUp ? 0.05 + Math.random() * 0.2 : -(0.02 + Math.random() * 0.15);
            return {
              ...obj,
              changePercent: obj.changePercent + deltaPercent,
              flash: isUp ? 'up' : 'down',
            };
          }
          return obj;
        });
      });

      // Clear flash highlighting after 800ms
      setTimeout(() => {
        setDataObjects((curr) => curr.map((o) => ({ ...o, flash: null })));
      }, 800);
    }, 2000);

    return () => clearInterval(tickTimer);
  }, []);

  // AI Convergence Cluster Events every 9 seconds
  useEffect(() => {
    const clusters = [
      { title: 'AI Momentum Cluster Detected', stocks: ['TCS', 'INFY'] },
      { title: 'Institutional Accumulation', stocks: ['RELIANCE', 'HDFCBANK'] },
      { title: 'Bullish Breakout Signal', stocks: ['NIFTY 50', 'BANKNIFTY'] },
    ];
    let clusterIdx = 0;
    const clusterTimer = setInterval(() => {
      setAiClusterSignal(clusters[clusterIdx]);
      clusterIdx = (clusterIdx + 1) % clusters.length;

      // Clear cluster callout after 4 seconds
      setTimeout(() => setAiClusterSignal(null), 4000);
    }, 9000);

    return () => clearInterval(clusterTimer);
  }, []);

  // Mouse Parallax Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
      className="relative w-full max-w-3xl mx-auto h-[540px] flex items-center justify-center select-none overflow-hidden"
    >
      {/* 1. CINEMATIC LUXURY MESH BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] bg-gradient-to-tr from-primary/15 via-cyan-500/10 to-emerald-500/15 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* 2. DYNAMIC NEURAL DATA CONNECTIONS SVG */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="canvasLineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15519D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Ambient Neural Data Flow Connections */}
        <line x1="20" y1="22" x2="65" y2="18" stroke="url(#canvasLineGrad)" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
        <line x1="65" y1="18" x2="80" y2="48" stroke="url(#canvasLineGrad)" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />
        <line x1="35" y1="68" x2="40" y2="42" stroke="url(#canvasLineGrad)" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.4" />

        {/* Cluster AI Convergence Lines */}
        {aiClusterSignal && (
          <>
            <line x1="20" y1="22" x2="80" y2="48" stroke="#38BDF8" strokeWidth="0.6" opacity="0.7" />
            <circle cx="50" cy="35" r="2" fill="#38BDF8" className="animate-ping" />
          </>
        )}
      </svg>

      {/* 3. BORDERLESS FLOATING LIVE FINANCIAL DATA OBJECTS */}
      {dataObjects.map((obj) => {
        const isPositive = obj.changePercent >= 0;
        const isHovered = hoveredObject?.id === obj.id;
        
        // Depth parallax multipliers
        const parallaxMultiplier = obj.depth === 'fg' ? 12 : obj.depth === 'mg' ? 6 : 3;
        const depthBlur = obj.depth === 'bg' ? 'blur-[0.5px] opacity-70' : 'opacity-100';

        const flashClass =
          obj.flash === 'up'
            ? 'ring-2 ring-emerald-400/80 bg-emerald-500/20'
            : obj.flash === 'down'
            ? 'ring-2 ring-rose-400/80 bg-danger/20'
            : '';

        return (
          <motion.div
            key={obj.id}
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              transform: `translate(${mousePos.x * parallaxMultiplier}px, ${mousePos.y * parallaxMultiplier}px)`,
            }}
            animate={{
              y: [0, -6, 0],
              x: [0, 3, 0],
            }}
            transition={{
              y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
            }}
            onMouseEnter={() => setHoveredObject(obj)}
            onMouseLeave={() => setHoveredObject(null)}
            onClick={() => onObjectClick?.(obj.id)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${depthBlur}`}
          >
            {/* Minimalist Floating Data Object (No Heavy Cards) */}
            <div className={`px-3 py-1.5 rounded-xl border backdrop-blur-md font-mono text-xs shadow-lg flex items-center gap-2 transition-all duration-300 ${
              isHovered
                ? 'bg-[#1E293B] border-cyan-400 scale-110 shadow-cyan-500/30 z-50 shadow-2xl'
                : 'bg-[#172033]/85 border-slate-800 hover:border-slate-600'
            } ${flashClass}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              <span className="font-black text-white">{obj.symbol}:</span>
              <span className="text-slate-200 font-bold">{obj.price}</span>
              <span className={`text-[10px] font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                ({isPositive ? '+' : ''}{obj.changePercent.toFixed(2)}%)
              </span>
            </div>

            {/* Hover Detailed Glass Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-[#172033] border border-cyan-500/40 p-3 rounded-2xl shadow-2xl font-mono text-xs z-50 pointer-events-none"
                >
                  <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold mb-1">
                    <span>{obj.name}</span>
                    <span className="text-slate-400">{obj.category.toUpperCase()}</span>
                  </div>
                  <div className="text-white font-black text-sm">{obj.price}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-800">
                    <span>Mkt Cap: <strong className="text-white">{obj.marketCap}</strong></span>
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5">Inspect <ArrowRight className="w-2.5 h-2.5" /></span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* 4. AI SIGNAL CLUSTER BANNER (Fades in on convergence) */}
      <AnimatePresence>
        {aiClusterSignal && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute bottom-6 z-40 bg-gradient-to-r from-blue-900/90 via-[#172033] to-emerald-900/90 border border-cyan-500/50 backdrop-blur-2xl px-5 py-2 rounded-2xl shadow-2xl font-mono text-xs text-white flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xs text-cyan-400">{aiClusterSignal.title}</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  SEBI AI Feed
                </span>
              </div>
              <span className="text-[10px] text-slate-300 font-sans block">
                Cluster: {aiClusterSignal.stocks.join(' • ')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LiveDataCanvasHero;
