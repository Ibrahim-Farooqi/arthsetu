import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Check, ArrowRight, ArrowLeft, RefreshCw, 
  Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Info 
} from 'lucide-react';
import toast from 'react-hot-toast';
import orderService from '../../services/order.service';



interface OrderExecutionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  symbol: string;
  companyName: string;
  logo: string;
  initialAction?: 'BUY' | 'SELL';
  initialPrice?: number;
  onNavigateTab?: (tab: string) => void;
}

export const OrderExecutionDrawer: React.FC<OrderExecutionDrawerProps> = ({
  isOpen,
  onClose,
  symbol,
  companyName,
  logo,
  initialAction = 'BUY',
  initialPrice = 3024.50,
  onNavigateTab
}) => {

  // Main UI flows: 'input' | 'review' | 'processing' | 'success' | 'failed'
  const [stage, setStage] = useState<'input' | 'review' | 'processing' | 'success' | 'failed'>('input');
  
  // Transaction State
  const [action, setAction] = useState<'BUY' | 'SELL'>(initialAction);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [productType, setProductType] = useState<'CNC' | 'MIS'>('CNC'); // CNC Delivery, MIS Intraday
  const [validity, setValidity] = useState<'DAY' | 'IOC'>('DAY');
  const [quantity, setQuantity] = useState<number>(10);
  
  // Terms check
  const [termsAccepted, setTermsAccepted] = useState<boolean>(true);

  // Live price random walk simulation
  const [livePrice, setLivePrice] = useState<number>(initialPrice);
  const [priceChange, setPriceChange] = useState<number>(18.40);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0.61);

  // Limit price edit state
  const [limitPriceInput, setLimitPriceInput] = useState<string>(initialPrice.toFixed(2));

  // Sync initial action on mount or prop change
  useEffect(() => {
    setAction(initialAction);
    setLivePrice(initialPrice);
    setLimitPriceInput(initialPrice.toFixed(2));
    setStage('input');
  }, [initialAction, initialPrice, isOpen]);

  // Price ticking effect
  useEffect(() => {
    if (!isOpen || stage !== 'input') return;

    const interval = setInterval(() => {
      setLivePrice(prev => {
        // Small random walk: -0.08% to +0.1%
        const pct = (Math.random() * 0.18 - 0.08) / 100;
        const next = prev * (1 + pct);
        
        // Calculate new changes relative to a baseline mock cost
        const diff = next - initialPrice;
        const diffPercent = (diff / initialPrice) * 100;
        
        setPriceChange(diff);
        setPriceChangePercent(diffPercent);
        
        // If order type is MARKET, keep the price input field sync
        if (orderType === 'MARKET') {
          setLimitPriceInput(next.toFixed(2));
        }
        
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen, stage, initialPrice, orderType]);

  // Demat wallet funds
  const [availableFunds, setAvailableFunds] = useState<number>(() => {
    const val = localStorage.getItem('demat_cash_balance');
    if (val) return parseFloat(val) || 124800;
    localStorage.setItem('demat_cash_balance', '124800');
    return 124800;
  });

  // Dynamic values computation
  const activePrice = orderType === 'MARKET' ? livePrice : parseFloat(limitPriceInput) || livePrice;
  const estimatedOrderVal = quantity * activePrice;
  const marginRequired = productType === 'MIS' ? estimatedOrderVal * 0.20 : estimatedOrderVal;

  // Taxes & Charges Breakdown (Standard Indian Equities Rates)
  const brokerage = 0; // FREE for delivery on Univest
  const stt = action === 'BUY' && productType === 'CNC' ? estimatedOrderVal * 0.001 : 0;
  const exchangeTax = estimatedOrderVal * 0.000345; // NSE transaction charges
  const gst = (brokerage + exchangeTax) * 0.18; // 18% GST
  const stampDuty = action === 'BUY' ? estimatedOrderVal * 0.00015 : 0;
  const totalCharges = brokerage + stt + exchangeTax + gst + stampDuty;
  
  const estimatedTotal = action === 'BUY' ? (estimatedOrderVal + totalCharges) : (estimatedOrderVal - totalCharges);
  const remainingFunds = availableFunds - (action === 'BUY' ? estimatedTotal : 0);

  // Mock AI recommendations tailored per stock symbol
  const aiTradeSnapshot = useMemo(() => {
    const isBuy = action === 'BUY';
    if (symbol === 'RELIANCE') {
      return {
        sentiment: isBuy ? 'BULLISH' : 'NEUTRAL',
        confidence: 94,
        support: '₹2,980.00',
        resistance: '₹3,120.00',
        risk: 'Low',
        summary: 'Volume expansion confirms price momentum. Commissioners approaching Jamnagar hydrogen gigafactory rollout. Recommended swing zone.'
      };
    } else if (symbol === 'HDFCBANK') {
      return {
        sentiment: 'NEUTRAL',
        confidence: 86,
        support: '₹1,585.00',
        resistance: '₹1,670.00',
        risk: 'Low',
        summary: 'Stabilizing margins protect valuation floor. Accumulation zone indicated near support, watch out for rate cycle pauses.'
      };
    } else if (symbol === 'TATASTEEL') {
      return {
        sentiment: 'BULLISH',
        confidence: 89,
        support: '₹140.50',
        resistance: '₹152.00',
        risk: 'Moderate',
        summary: 'Coking coal softening improves margin projection. Breakout pattern formed on daily technical chart above resistance.'
      };
    }
    // Default fallback
    return {
      sentiment: isBuy ? 'BULLISH' : 'NEUTRAL',
      confidence: 85,
      support: `₹${(activePrice * 0.96).toFixed(2)}`,
      resistance: `₹${(activePrice * 1.04).toFixed(2)}`,
      risk: 'Moderate',
      summary: 'Trend analysis exhibits consistent accumulation. Technical indicators support entries at the current valuation.'
    };
  }, [symbol, action, activePrice]);

  // Detailed Processing Stage state
  const [processingStage, setProcessingStage] = useState<number>(0);
  const processingMessages = [
    'Submitting Order to Terminal...',
    'Verifying with Broker...',
    'Waiting for Exchange Acceptance...',
    'Order Accepted and Settled!'
  ];

  // Primary Action triggers
  const handleReviewOrder = () => {
    if (quantity <= 0 || isNaN(quantity)) {
      toast.error('Please enter a valid quantity.');
      return;
    }
    if (orderType === 'LIMIT' && (parseFloat(limitPriceInput) <= 0 || isNaN(parseFloat(limitPriceInput)))) {
      toast.error('Please enter a valid limit price.');
      return;
    }
    if (action === 'BUY' && remainingFunds < 0) {
      setStage('failed'); // trigger insufficient funds view
      return;
    }
    setStage('review');
  };

  const handleConfirmOrder = () => {
    if (!termsAccepted) {
      toast.error('Please acknowledge the terms before continuing.');
      return;
    }
    
    // Check funds once again to be safe
    if (action === 'BUY' && remainingFunds < 0) {
      setStage('failed');
      return;
    }

    setStage('processing');
    setProcessingStage(0);

    // Simulate order stages
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < 4) {
        setProcessingStage(currentStep);
      } else {
        clearInterval(interval);
        executeTradeMockData();
      }
    }, 600);
  };

  const executeTradeMockData = async () => {
    try {
      await orderService.placeOrder({
        symbol: symbol,
        side: action,
        order_type: orderType,
        quantity: quantity,
        price: orderType === 'LIMIT' ? activePrice : undefined,
      });

      // 3. Dispatch global sync event to update portfolio dashboard
      window.dispatchEvent(new Event('portfolio-updated'));

      // 4. Move to success stage
      setStage('success');
      toast.success(`${action} order executed successfully!`);
    } catch (e) {
      console.error(e);
      toast.error('Failed to place order.');
      setStage('failed');
    }
  };

  // Close and reset drawer
  const handleClose = () => {
    setStage('input');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm cursor-pointer"
      />

      {/* Popup Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative bg-white w-full max-w-lg rounded-[28px] shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[90vh] overflow-hidden"
      >
        
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-white font-black text-xs flex items-center justify-center select-none shadow-sm">
              {logo || symbol.substring(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm text-[#172033] tracking-tight">{companyName}</h3>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 uppercase">
                  {symbol}
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                NSE · Equity · Simulated Trade (MVP Demo)
              </span>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition flex items-center justify-center cursor-pointer shadow-xs"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Dynamic Stages View wrapper */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 select-none scrollbar-thin">
          <AnimatePresence mode="wait">
            
            {/* STAGE 1: INPUT DETAILS */}
            {stage === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-5"
              >
                {/* Live Price Widget */}
                <div className="bg-[#172033] text-white p-4 sm:p-5 rounded-2xl relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Live Market Price</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black tracking-tight">
                          ₹{livePrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className={`text-[11px] font-black flex items-center ${priceChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wider">
                        Market Open
                      </span>
                      <span className="text-[8px] text-slate-400 font-bold block mt-1">Real-time Feed</span>
                    </div>
                  </div>
                </div>

                {/* Segmented control for BUY / SELL */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Transaction Action</label>
                  <div className="grid grid-cols-2 gap-2.5 p-1 bg-slate-100/80 border border-slate-200/50 rounded-2xl">
                    <button
                      onClick={() => setAction('BUY')}
                      className={`py-2 rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer ${
                        action === 'BUY' 
                          ? 'bg-[#16A34A] text-white shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      BUY STOCK
                    </button>
                    <button
                      onClick={() => setAction('SELL')}
                      className={`py-2 rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer ${
                        action === 'SELL' 
                          ? 'bg-loss text-white shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      SELL STOCK
                    </button>
                  </div>
                </div>

                {/* Order Type Toggle (Market vs Limit) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Order Execution Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['MARKET', 'LIMIT'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => {
                          setOrderType(type);
                          if (type === 'MARKET') setLimitPriceInput(livePrice.toFixed(2));
                        }}
                        className={`py-2.5 rounded-xl border text-center font-extrabold text-xs transition cursor-pointer ${
                          orderType === type 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {type === 'MARKET' ? 'Market Price' : 'Custom Limit Price'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Price fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Quantity</label>
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-2xs">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-black transition cursor-pointer select-none"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 bg-transparent text-center font-black text-xs text-slate-900 outline-none w-10"
                      />
                      <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-black transition cursor-pointer select-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Price (₹)</label>
                    {orderType === 'MARKET' ? (
                      <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl px-3 h-10 flex items-center justify-center font-extrabold text-slate-400 text-xs select-none">
                        At Market Price
                      </div>
                    ) : (
                      <input
                        type="number"
                        step="0.05"
                        value={limitPriceInput}
                        onChange={(e) => setLimitPriceInput(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 h-10 font-black text-slate-900 text-xs outline-none focus:border-primary shadow-2xs"
                      />
                    )}
                  </div>
                </div>

                {/* Product Type Cards */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Product Segment</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setProductType('CNC')}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-0.5 ${
                        productType === 'CNC' 
                          ? 'bg-primary-light/50 border-primary text-primary-dark shadow-2xs' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-black text-xs block">Delivery (CNC)</span>
                      <span className="text-[9px] font-bold text-slate-400 block mt-0.5 leading-normal">
                        100% Cash required. Keep stocks long-term.
                      </span>
                    </button>
                    <button
                      onClick={() => setProductType('MIS')}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-0.5 ${
                        productType === 'MIS' 
                          ? 'bg-primary-light/50 border-primary text-primary-dark shadow-2xs' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-black text-xs block">Intraday (MIS)</span>
                      <span className="text-[9px] font-bold text-slate-400 block mt-0.5 leading-normal">
                        5x Margin available. Auto squared-off today.
                      </span>
                    </button>
                  </div>
                </div>

                {/* Validity Dropdown / Toggle */}
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Order Validity</label>
                    <select
                      value={validity}
                      onChange={(e: any) => setValidity(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 font-bold text-slate-800 text-xs outline-none focus:border-primary shadow-2xs"
                    >
                      <option value="DAY">DAY (Standard)</option>
                      <option value="IOC">IOC (Immediate or Cancel)</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 self-end">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">GTC Trade</label>
                    <div className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 h-10 flex items-center justify-between text-[10px] text-slate-400 font-bold select-none cursor-not-allowed">
                      <span>Good till Cancel</span>
                      <span className="bg-slate-200 text-slate-500 font-black text-[8px] px-1.5 py-0.5 rounded leading-none">
                        SOON
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Trade Snapshot card */}
                <div className="border border-[#E2E8F0] bg-primary-light/40 p-4 rounded-2xl flex flex-col gap-3 relative shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black text-primary-dark tracking-wider uppercase">AI Technical Trade Insights</span>
                    </div>
                    <span className="text-[9px] font-black bg-primary-light text-primary-dark px-2 py-0.5 rounded border border-primary-light/50">
                      CONFIDENCE: {aiTradeSnapshot.confidence}%
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 bg-white/70 border border-blue-50/50 p-2.5 rounded-xl text-[10px]">
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase block">Sentiment</span>
                      <span className={`font-black uppercase ${
                        aiTradeSnapshot.sentiment === 'BULLISH' ? 'text-emerald-600' : 'text-slate-700'
                      }`}>
                        {aiTradeSnapshot.sentiment}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase block">Support</span>
                      <span className="font-black text-slate-800">{aiTradeSnapshot.support}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase block">Resistance</span>
                      <span className="font-black text-slate-800">{aiTradeSnapshot.resistance}</span>
                    </div>
                  </div>
                  
                  <p className="text-[9.5px] text-primary-dark font-medium leading-relaxed">
                    {aiTradeSnapshot.summary}
                  </p>
                </div>

                {/* Live updating Order Summary */}
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex flex-col gap-2.5">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider pb-1.5 border-b border-slate-200/60">
                    Live Order Bill Estimation
                  </h4>
                  <div className="text-xs font-bold text-slate-600 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span>Quantity Value:</span>
                      <span className="text-slate-800">
                        {quantity} shares × ₹{activePrice.toFixed(2)} = ₹{estimatedOrderVal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Brokerage Charges:</span>
                      <span className="text-emerald-600 font-black">FREE (₹0.00)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        Estimated Taxes & Exchange Fees:
                        <div className="group relative cursor-pointer text-slate-400 hover:text-slate-600">
                          <Info className="w-3.5 h-3.5" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col gap-1 bg-slate-900 text-white text-[8px] font-medium p-2 rounded shadow-xl w-44 z-50 pointer-events-none border border-slate-800">
                            <div className="flex justify-between"><span>STT:</span><span>₹{stt.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Exchange Fees:</span><span>₹{exchangeTax.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>GST:</span><span>₹{gst.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Stamp Duty:</span><span>₹{stampDuty.toFixed(2)}</span></div>
                          </div>
                        </div>
                      </span>
                      <span className="text-slate-800">₹{totalCharges.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-slate-200 my-1" />
                    <div className="flex justify-between items-center text-sm font-black">
                      <span className="text-[#172033]">
                        {action === 'BUY' ? 'Estimated Total Bill:' : 'Estimated Net Proceeds:'}
                      </span>
                      <span className={action === 'BUY' ? 'text-primary' : 'text-emerald-600'}>
                        ₹{estimatedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Available balance check info */}
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/50 p-3 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span>Demat Balance: ₹{availableFunds.toLocaleString('en-IN')}</span>
                  </div>
                  {action === 'BUY' && (
                    <span className={remainingFunds < 0 ? 'text-danger font-black' : 'text-slate-600'}>
                      {remainingFunds < 0 ? 'Insufficient Margin Required' : `Remaining: ₹${remainingFunds.toLocaleString('en-IN')}`}
                    </span>
                  )}
                </div>
              </motion.div>
            )}

            {/* STAGE 2: CONFIRMATION REVIEW SCREEN */}
            {stage === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-200">
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider ${
                        action === 'BUY' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200/50' : 'bg-rose-100 text-rose-800 border border-rose-200/50'
                      }`}>
                        {action} Order Execution
                      </span>
                      <h4 className="text-lg font-black text-[#172033] mt-2 leading-none">{companyName}</h4>
                      <span className="text-[10px] font-bold text-slate-400 block mt-1.5 uppercase">NSE · Equity</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-slate-400 block uppercase">Estimate Value</span>
                      <span className="text-base font-black text-[#172033] block mt-1">
                        ₹{estimatedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-600">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Quantity</span>
                      <span className="text-slate-800 font-extrabold">{quantity} shares</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Price</span>
                      <span className="text-slate-800 font-extrabold">
                        {orderType === 'MARKET' ? `Market (₹${livePrice.toFixed(2)})` : `Limit (₹${limitPriceInput})`}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Product</span>
                      <span className="text-slate-800 font-extrabold">
                        {productType === 'CNC' ? 'Delivery (CNC)' : 'Intraday (MIS)'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Validity</span>
                      <span className="text-slate-800 font-extrabold">{validity}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Estimated Charges</span>
                      <span className="text-slate-800 font-extrabold">₹{totalCharges.toFixed(2)}</span>
                    </div>
                    {productType === 'CNC' && (
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Delivery Date</span>
                        <span className="text-emerald-600 font-extrabold">T+1 Working Day</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms checkbox */}
                <div 
                  onClick={() => setTermsAccepted(!termsAccepted)}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3 cursor-pointer select-none items-start"
                >
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition ${
                    termsAccepted ? 'bg-primary border-primary text-white' : 'bg-white border-slate-300'
                  }`}>
                    {termsAccepted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold leading-relaxed">
                    I acknowledge and agree that this is a simulated trade for demonstration purposes. I confirm that this matches my risk capabilities under the SEBI Investor Guidelines.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STAGE 3: ORDER PROCESSING ANIMATION */}
            {stage === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center py-16 gap-8"
              >
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
                
                <div className="flex flex-col gap-4 w-full max-w-xs text-xs font-bold text-slate-600">
                  <h4 className="text-center font-black text-sm text-[#172033] mb-2">
                    Executing Simulated Order...
                  </h4>
                  {processingMessages.map((msg, idx) => {
                    const isActive = processingStage === idx;
                    const isCompleted = processingStage > idx;
                    return (
                      <div 
                        key={idx} 
                        className={`flex items-center gap-3 transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : isCompleted ? 'opacity-70' : 'opacity-30'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                          isCompleted 
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-600' 
                            : isActive 
                            ? 'border-primary text-primary' 
                            : 'border-slate-200 text-slate-300'
                        }`}>
                          {isCompleted ? (
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          ) : isActive ? (
                            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                          ) : (
                            <span className="text-[9px]">{idx + 1}</span>
                          )}
                        </div>
                        <span className={isActive ? 'text-primary font-black' : isCompleted ? 'text-slate-700' : ''}>
                          {msg}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STAGE 4: SUCCESS VIEW */}
            {stage === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-8 gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-lg relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping pointer-events-none" style={{ animationDuration: '2s' }} />
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
                    Order Placed Successfully
                  </span>
                  <h2 className="text-2xl font-black text-[#172033] mt-4 tracking-tight">{symbol}</h2>
                  <p className="text-xs text-slate-500 font-bold mt-1.5 max-w-xs mx-auto">
                    Your simulated {action.toLowerCase()} order was successfully executed and processed on NSE.
                  </p>
                </div>

                <div className="w-full bg-slate-50 p-5 rounded-2xl border border-slate-200/80 shadow-2xs grid grid-cols-2 gap-4 text-xs text-left my-2">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Order ID</span>
                    <span className="font-black text-[#172033]">#ORD-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Transaction Type</span>
                    <span className={`font-black ${action === 'BUY' ? 'text-emerald-600' : 'text-danger'}`}>
                      {action} · {productType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Average Price</span>
                    <span className="font-black text-[#172033]">₹{activePrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Quantity</span>
                    <span className="font-black text-[#172033]">{quantity} Shares</span>
                  </div>
                  <div className="col-span-2 border-t border-slate-200/60 pt-3 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Settled Total Value</span>
                    <span className="text-sm font-black text-[#0f172a]">
                      ₹{estimatedTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-primary-light border border-[#E2E8F0] rounded-xl flex gap-2 w-full text-[9px] font-medium leading-normal text-primary-dark">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>
                    <strong>Demat Order Refreshed</strong>: The transaction is saved in your local session log. Holdings and balances are updated.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STAGE 5: FAILED VIEW */}
            {stage === 'failed' && (
              <motion.div
                key="failed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center py-8 gap-6"
              >
                <div className="w-20 h-20 rounded-full bg-rose-100 border border-rose-200 text-danger flex items-center justify-center shadow-lg animate-pulse">
                  <AlertTriangle className="w-10 h-10" />
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-black text-danger bg-rose-50 border border-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Order Rejected
                  </span>
                  <h2 className="text-2xl font-black text-[#172033] mt-4 tracking-tight">Insufficient Margin Available</h2>
                  <p className="text-xs text-slate-500 font-bold mt-2 max-w-xs mx-auto leading-relaxed">
                    You do not have enough funds in your available cash balance to execute this simulated buy order.
                  </p>
                </div>

                <div className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs text-left flex flex-col gap-2.5 my-2">
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>Required Bill Amount:</span>
                    <span className="text-[#172033] font-extrabold">
                      ₹{estimatedTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-600">
                    <span>Available Demat Balance:</span>
                    <span className="text-[#172033] font-extrabold">
                      ₹{availableFunds.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex justify-between items-center text-xs font-black text-danger">
                    <span>Deficit Margin:</span>
                    <span>₹{(estimatedTotal - availableFunds).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex gap-2 w-full text-[9.5px] font-medium text-rose-900 leading-normal">
                  <Info className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                  <span>
                    <strong>Resolution</strong>: You can add simulated funds to your Demat account instantly using the "Invest / Add Funds" button on the main Dashboard.
                  </span>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-slate-100 shrink-0 bg-slate-50/50 flex gap-3">
          {stage === 'input' && (
            <button
              onClick={handleReviewOrder}
              className={`w-full py-3.5 rounded-2xl font-black text-xs text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-md select-none ${
                action === 'BUY' 
                  ? 'bg-[#16A34A] hover:bg-emerald-700 shadow-emerald-500/10' 
                  : 'bg-loss hover:bg-rose-700 shadow-rose-500/10'
              }`}
            >
              Review {action} Order <ArrowRight className="w-4.5 h-4.5" />
            </button>
          )}

          {stage === 'review' && (
            <>
              <button
                onClick={() => setStage('input')}
                className="px-4 py-3.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition cursor-pointer flex items-center justify-center font-bold"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={handleConfirmOrder}
                className={`flex-1 py-3.5 rounded-2xl font-black text-xs text-white transition flex items-center justify-center gap-2 cursor-pointer shadow-md select-none ${
                  action === 'BUY' 
                    ? 'bg-[#16A34A] hover:bg-emerald-700 shadow-emerald-500/10' 
                    : 'bg-loss hover:bg-rose-700 shadow-rose-500/10'
                }`}
              >
                Confirm & Place {action} Order
              </button>
            </>
          )}

          {stage === 'processing' && (
            <button
              disabled
              className="w-full py-3.5 rounded-2xl bg-slate-100 text-slate-400 font-extrabold text-xs transition cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
              Processing Transaction...
            </button>
          )}

          {stage === 'success' && (
            <>
              <button
                onClick={() => {
                  handleClose();
                  if (onNavigateTab) onNavigateTab('Portfolio');
                }}
                className="flex-1 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition cursor-pointer text-center"
              >
                Track Holdings
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-black text-xs hover:bg-slate-100 transition cursor-pointer text-center"
              >
                Continue Trading
              </button>
            </>
          )}

          {stage === 'failed' && (
            <>
              <button
                onClick={() => setStage('input')}
                className="flex-1 py-3.5 rounded-2xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition cursor-pointer text-center"
              >
                Modify Order
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-black text-xs hover:bg-slate-100 transition cursor-pointer text-center"
              >
                Cancel Trade
              </button>
            </>
          )}
        </div>

      </motion.div>
    </div>
  );
};
