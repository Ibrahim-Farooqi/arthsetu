import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Activity, BarChart2, Layers, Sliders, Maximize2, Minimize2,
  RotateCcw, MousePointer, Crosshair, PenTool, Minus, Square, Type, Percent, Hash,
  ChevronDown, Check, Eye, EyeOff
} from 'lucide-react';

interface AdvancedStockChartProps {
  symbol?: string;
  price?: number;
  isPositive?: boolean;
}

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ma20?: number;
  ma50?: number;
  ma200?: number;
  rsi?: number;
  macd?: number;
  signal?: number;
  hist?: number;
}

// Generate realistic mock OHLC candlestick dataset for the given timeframe
const generateCandles = (count: number, basePrice: number): Candle[] => {
  const candles: Candle[] = [];
  let currentClose = basePrice * 0.94;
  const now = new Date();

  for (let i = count; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const volatility = basePrice * 0.015;
    const open = currentClose + (Math.random() - 0.48) * volatility;
    const change = (Math.random() - 0.47) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.6;
    const low = Math.min(open, close) - Math.random() * volatility * 0.6;
    const volume = Math.round(5000000 + Math.random() * 8000000);

    currentClose = close;
    candles.push({ time, open, high, low, close, volume });
  }

  // Calculate Technical Indicators
  for (let i = 0; i < candles.length; i++) {
    // MA 20
    if (i >= 19) {
      const slice20 = candles.slice(i - 19, i + 1);
      candles[i].ma20 = slice20.reduce((s, c) => s + c.close, 0) / 20;
    }
    // MA 50
    if (i >= 49) {
      const slice50 = candles.slice(i - 49, i + 1);
      candles[i].ma50 = slice50.reduce((s, c) => s + c.close, 0) / 50;
    }
    // MA 200
    if (i >= 199) {
      const slice200 = candles.slice(i - 199, i + 1);
      candles[i].ma200 = slice200.reduce((s, c) => s + c.close, 0) / 200;
    } else {
      candles[i].ma200 = candles[i].close * (0.95 + (i / 200) * 0.05);
    }

    // Mock RSI (30..70)
    candles[i].rsi = Math.min(85, Math.max(25, 52 + Math.sin(i * 0.4) * 18 + (Math.random() - 0.5) * 6));

    // Mock MACD & Signal
    const macdVal = Math.sin(i * 0.3) * (basePrice * 0.008);
    const sigVal = Math.sin(i * 0.3 - 0.4) * (basePrice * 0.008);
    candles[i].macd = macdVal;
    candles[i].signal = sigVal;
    candles[i].hist = macdVal - sigVal;
  }

  return candles;
};

export const AdvancedStockChart: React.FC<AdvancedStockChartProps> = ({
  symbol = 'NIFTY 500',
  price = 22183.65,
  isPositive = true
}) => {
  // Chart Controls State
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1H' | '4H' | '1D' | '1W' | '1M'>('1D');
  const [chartType, setChartType] = useState<'Candlestick' | 'Line' | 'Area' | 'OHLC'>('Candlestick');
  const [selectedRange, setSelectedRange] = useState<'1D' | '5D' | '1M' | '3M' | '6M' | 'YTD' | '1Y' | '5Y' | 'All'>('1M');
  const [activeTool, setActiveTool] = useState<'Cursor' | 'Crosshair' | 'Trendline' | 'Horizontal' | 'Rectangle' | 'Fibonacci'>('Crosshair');

  // Indicators Visibility
  const [showMA20, setShowMA20] = useState<boolean>(true);
  const [showMA50, setShowMA50] = useState<boolean>(true);
  const [showMA200, setShowMA200] = useState<boolean>(true);
  const [showVolume, setShowVolume] = useState<boolean>(true);
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [showMACD, setShowMACD] = useState<boolean>(true);
  const [isLogScale, setIsLogScale] = useState<boolean>(false);
  const [isPercentScale, setIsPercentScale] = useState<boolean>(false);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Generate dataset
  const candles = useMemo(() => generateCandles(60, price), [price, timeframe, selectedRange]);

  const activeCandle = hoverIndex !== null && candles[hoverIndex] ? candles[hoverIndex] : candles[candles.length - 1];

  // SVG Chart Geometry Specs
  const width = 850;
  const mainHeight = 320;
  const rsiHeight = 80;
  const macdHeight = 80;

  const minPrice = Math.min(...candles.map(c => c.low)) * 0.995;
  const maxPrice = Math.max(...candles.map(c => c.high)) * 1.005;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...candles.map(c => c.volume)) || 1;

  // X coordinate calculation per index
  const getX = (idx: number) => (idx / (candles.length - 1)) * (width - 60);
  const getY = (val: number) => mainHeight - ((val - minPrice) / priceRange) * (mainHeight - 30) - 15;

  // Build MA overlay polyline points
  const ma20Points = candles
    .map((c, i) => (c.ma20 ? `${getX(i)},${getY(c.ma20)}` : null))
    .filter(Boolean)
    .join(' ');

  const ma50Points = candles
    .map((c, i) => (c.ma50 ? `${getX(i)},${getY(c.ma50)}` : null))
    .filter(Boolean)
    .join(' ');

  const ma200Points = candles
    .map((c, i) => (c.ma200 ? `${getX(i)},${getY(c.ma200)}` : null))
    .filter(Boolean)
    .join(' ');

  const lineChartPoints = candles.map((c, i) => `${getX(i)},${getY(c.close)}`).join(' ');
  const areaChartPoints = `0,${mainHeight} ` + lineChartPoints + ` ${width - 60},${mainHeight}`;

  return (
    <div className="flex flex-col bg-[#0F172A] text-slate-100 rounded-2xl border border-slate-800 overflow-hidden font-sans shadow-2xl">
      
      {/* 1. TOP CHART TOOLBAR */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* TIMEFRAMES */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {(['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                timeframe === tf
                  ? 'bg-[#15519D] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* CHART TYPE SELECTOR */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {(['Candlestick', 'Line', 'Area', 'OHLC'] as const).map(type => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                chartType === type
                  ? 'bg-[#15519D] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* INDICATORS TOGGLES */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase mr-1">Indicators:</span>
          <button
            onClick={() => setShowMA20(!showMA20)}
            className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition ${
              showMA20 ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            MA 20
          </button>
          <button
            onClick={() => setShowMA50(!showMA50)}
            className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition ${
              showMA50 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            MA 50
          </button>
          <button
            onClick={() => setShowMA200(!showMA200)}
            className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition ${
              showMA200 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            MA 200
          </button>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition ${
              showVolume ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Vol
          </button>
        </div>

        {/* DRAWING TOOLS */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {[
            { id: 'Crosshair', icon: Crosshair },
            { id: 'Trendline', icon: PenTool },
            { id: 'Horizontal', icon: Minus },
            { id: 'Rectangle', icon: Square },
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id as any)}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                activeTool === tool.id
                  ? 'bg-[#15519D] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
              }`}
              title={tool.id}
            >
              <tool.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

      </div>

      {/* 2. OHLC DATA INSPECTOR BAR */}
      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-4 text-slate-300">
          <span className="font-bold text-white">{symbol}</span>
          <span>O: <strong className="text-white">₹{activeCandle.open.toFixed(2)}</strong></span>
          <span>H: <strong className="text-emerald-400">₹{activeCandle.high.toFixed(2)}</strong></span>
          <span>L: <strong className="text-rose-400">₹{activeCandle.low.toFixed(2)}</strong></span>
          <span>C: <strong className={activeCandle.close >= activeCandle.open ? 'text-emerald-400' : 'text-rose-400'}>₹{activeCandle.close.toFixed(2)}</strong></span>
          <span>Vol: <strong className="text-blue-300">{(activeCandle.volume / 1000000).toFixed(2)}M</strong></span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-bold">
          {showMA20 && <span className="text-sky-400">MA 20: ₹{(activeCandle.ma20 || activeCandle.close).toFixed(2)}</span>}
          {showMA50 && <span className="text-amber-400">MA 50: ₹{(activeCandle.ma50 || activeCandle.close).toFixed(2)}</span>}
          {showMA200 && <span className="text-purple-400">MA 200: ₹{(activeCandle.ma200 || activeCandle.close).toFixed(2)}</span>}
        </div>
      </div>

      {/* 3. MAIN CANDLESTICK CANVAS WORKSPACE */}
      <div className="relative bg-slate-950 p-2 overflow-hidden select-none">
        
        <svg
          viewBox={`0 0 ${width} ${mainHeight}`}
          className="w-full h-80 overflow-visible"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const idx = Math.min(candles.length - 1, Math.max(0, Math.round((mouseX / rect.width) * (candles.length - 1))));
            setHoverIndex(idx);
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio) => (
            <line
              key={ratio}
              x1="0"
              y1={mainHeight * ratio}
              x2={width - 60}
              y2={mainHeight * ratio}
              stroke="#334155"
              strokeDasharray="3 3"
              strokeWidth="0.8"
            />
          ))}

          {/* Price Scale Y-Axis Labels */}
          {[0.1, 0.35, 0.6, 0.85].map((ratio) => {
            const pVal = maxPrice - ratio * priceRange;
            return (
              <text
                key={ratio}
                x={width - 50}
                y={mainHeight * ratio + 4}
                fill="#94A3B8"
                fontSize="10"
                fontFamily="monospace"
              >
                ₹{pVal.toFixed(0)}
              </text>
            );
          })}

          {/* VOLUME BARS (Integrated in lower portion of chart) */}
          {showVolume && candles.map((c, i) => {
            const x = getX(i);
            const isUp = c.close >= c.open;
            const barH = (c.volume / maxVolume) * 70;
            return (
              <rect
                key={`vol_${i}`}
                x={x - 3}
                y={mainHeight - barH}
                width="6"
                height={barH}
                fill={isUp ? '#16A34A' : '#DC2626'}
                opacity={0.3}
              />
            );
          })}

          {/* CANDLESTICKS OR LINE / AREA RENDERING */}
          {chartType === 'Candlestick' && candles.map((c, i) => {
            const x = getX(i);
            const isUp = c.close >= c.open;
            const color = isUp ? '#16A34A' : '#DC2626';
            const topY = getY(Math.max(c.open, c.close));
            const botY = getY(Math.min(c.open, c.close));
            const candleH = Math.max(2, botY - topY);

            return (
              <g key={`candle_${i}`}>
                {/* Wick */}
                <line
                  x1={x}
                  y1={getY(c.high)}
                  x2={x}
                  y2={getY(c.low)}
                  stroke={color}
                  strokeWidth="1.5"
                />
                {/* Body */}
                <rect
                  x={x - 3.5}
                  y={topY}
                  width="7"
                  height={candleH}
                  fill={color}
                  rx="1"
                />
              </g>
            );
          })}

          {chartType === 'Area' && (
            <>
              <polygon points={areaChartPoints} fill="url(#chartAreaGrad)" opacity={0.25} />
              <polyline points={lineChartPoints} fill="none" stroke="#15519D" strokeWidth="2.5" />
              <defs>
                <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15519D" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#15519D" stopOpacity={0} />
                </linearGradient>
              </defs>
            </>
          )}

          {chartType === 'Line' && (
            <polyline points={lineChartPoints} fill="none" stroke="#15519D" strokeWidth="2.5" />
          )}

          {/* MOVING AVERAGE OVERLAY LINES */}
          {showMA20 && ma20Points && (
            <polyline points={ma20Points} fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
          )}
          {showMA50 && ma50Points && (
            <polyline points={ma50Points} fill="none" stroke="#FBBF24" strokeWidth="1.5" />
          )}
          {showMA200 && ma200Points && (
            <polyline points={ma200Points} fill="none" stroke="#C084FC" strokeWidth="1.5" />
          )}

          {/* HOVER CROSSHAIR */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1="0"
                x2={getX(hoverIndex)}
                y2={mainHeight}
                stroke="#94A3B8"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <line
                x1="0"
                y1={getY(candles[hoverIndex].close)}
                x2={width - 60}
                y2={getY(candles[hoverIndex].close)}
                stroke="#94A3B8"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <circle
                cx={getX(hoverIndex)}
                cy={getY(candles[hoverIndex].close)}
                r="4"
                fill="#15519D"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* 4. SEPARATE TECHNICAL INDICATOR PANELS */}
      <div className="border-t border-slate-800 bg-slate-900/90 divide-y divide-slate-800">
        
        {/* RSI PANEL */}
        {showRSI && (
          <div className="p-3 space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-extrabold text-sky-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> RSI (14): <strong className="text-white">{(activeCandle.rsi || 58).toFixed(1)}</strong>
              </span>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                <span className="text-rose-400">Overbought: 70</span>
                <span className="text-emerald-400">Oversold: 30</span>
              </div>
            </div>

            <div className="h-14 w-full relative">
              <svg viewBox={`0 0 ${width} ${rsiHeight}`} className="w-full h-full">
                {/* 70 & 30 Lines */}
                <line x1="0" y1={rsiHeight * 0.3} x2={width - 60} y2={rsiHeight * 0.3} stroke="#F87171" strokeDasharray="3 3" strokeWidth="0.8" />
                <line x1="0" y1={rsiHeight * 0.7} x2={width - 60} y2={rsiHeight * 0.7} stroke="#4ADE80" strokeDasharray="3 3" strokeWidth="0.8" />
                
                {/* RSI Curve */}
                <polyline
                  points={candles.map((c, i) => `${getX(i)},${rsiHeight - ((c.rsi || 50) / 100) * rsiHeight}`).join(' ')}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
          </div>
        )}

        {/* MACD PANEL */}
        {showMACD && (
          <div className="p-3 space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-extrabold text-purple-400 flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5" /> MACD (12, 26, 9): <strong className="text-white">{(activeCandle.macd || 12.4).toFixed(2)}</strong>
              </span>
              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                <span className="text-sky-400">Signal: {(activeCandle.signal || 10.1).toFixed(2)}</span>
                <span className={activeCandle.hist && activeCandle.hist >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  Hist: {(activeCandle.hist || 2.3).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="h-14 w-full relative">
              <svg viewBox={`0 0 ${width} ${macdHeight}`} className="w-full h-full">
                <line x1="0" y1={macdHeight / 2} x2={width - 60} y2={macdHeight / 2} stroke="#475569" strokeWidth="0.8" />
                
                {/* Histogram Bars */}
                {candles.map((c, i) => {
                  const x = getX(i);
                  const h = ((c.hist || 0) / (price * 0.01)) * (macdHeight / 2);
                  const isUp = (c.hist || 0) >= 0;
                  return (
                    <rect
                      key={`macd_h_${i}`}
                      x={x - 2}
                      y={isUp ? macdHeight / 2 - Math.abs(h) : macdHeight / 2}
                      width="4"
                      height={Math.max(1, Math.abs(h))}
                      fill={isUp ? '#16A34A' : '#DC2626'}
                      opacity={0.7}
                    />
                  );
                })}

                {/* MACD Line */}
                <polyline
                  points={candles.map((c, i) => `${getX(i)},${macdHeight / 2 - ((c.macd || 0) / (price * 0.01)) * (macdHeight / 2)}`).join(' ')}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1.5"
                />

                {/* Signal Line */}
                <polyline
                  points={candles.map((c, i) => `${getX(i)},${macdHeight / 2 - ((c.signal || 0) / (price * 0.01)) * (macdHeight / 2)}`).join(' ')}
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        )}

      </div>

      {/* 5. BOTTOM TIMEFRAME RANGES & SCALE CONTROLS */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {(['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', '5Y', 'All'] as const).map(range => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                selectedRange === range
                  ? 'bg-[#15519D] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isLogScale}
              onChange={e => setIsLogScale(e.target.checked)}
              className="rounded accent-[#15519D]"
            />
            <span>Log Scale</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isPercentScale}
              onChange={e => setIsPercentScale(e.target.checked)}
              className="rounded accent-[#15519D]"
            />
            <span>% Scale</span>
          </label>
        </div>
      </div>

    </div>
  );
};

export default AdvancedStockChart;
