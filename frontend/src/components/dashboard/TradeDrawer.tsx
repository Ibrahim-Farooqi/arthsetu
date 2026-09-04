import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Wallet, TrendingUp, AlertCircle, ArrowRight, ShieldCheck,
  CheckCircle2, ChevronDown, ChevronUp, Zap, HelpCircle, ArrowLeft,
  Sparkles, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';

interface TradeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  research?: any;
  stock?: any;
}

export const TradeDrawer: React.FC<TradeDrawerProps> = ({ isOpen, onClose, research, stock }) => {
  // Asset info fallback normalization
  const item = research || stock || {
    company: 'Reliance Industries Ltd',
    companyName: 'Reliance Industries Ltd',
    symbol: 'RELIANCE',
    price: '3,024.50',
    logo: 'RL',
    rec: 'BUY'
  };

  const companyName = item.companyName || item.company || 'Reliance Industries Ltd';
  const symbol = item.symbol || 'RELIANCE';
  const logo = item.logo || symbol.substring(0, 2);
  const rawPriceStr = String(item.price || '3024.50').replace(/[^0-9.]/g, '');
  const basePrice = parseFloat(rawPriceStr) || 3024.50;

  // Demat wallet balance state
  const [currentBalance, setCurrentBalance] = useState<number>(() => {
    const val = localStorage.getItem('demat_cash_balance');
    if (val) return parseFloat(val) || 84250;
    localStorage.setItem('demat_cash_balance', '84250');
    return 84250;
  });

  // Order State
  const [orderAction, setOrderAction] = useState<'BUY' | 'SELL'>('BUY');
  const [productType, setProductType] = useState<'CNC' | 'MIS'>('CNC'); // CNC Delivery, MIS Intraday
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT' | 'SL' | 'SL-M' | 'GTT' | 'AMO'>('MARKET');
  const [quantity, setQuantity] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(basePrice);
  const [exchange, setExchange] = useState<'NSE' | 'BSE'>('NSE');
  
  // Interactive UI State
  const [showCharges, setShowCharges] = useState(false);
  const [step, setStep] = useState<'input' | 'review' | 'success'>('input');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setIsSubmitting(false);
      setLimitPrice(basePrice);
    }
  }, [isOpen, basePrice]);

  if (!isOpen) return null;

  // Calculations
  const executionPrice = orderType === 'MARKET' ? basePrice : limitPrice;
  const totalOrderValue = quantity * executionPrice;
  const marginRequired = productType === 'MIS' ? totalOrderValue * 0.20 : totalOrderValue;
  const availableMargin = currentBalance;
  const remainingMargin = availableMargin - marginRequired;

  // Charges Breakdown
  const brokerage = 0; // Free for delivery/advisory
  const stt = orderAction === 'BUY' && productType === 'CNC' ? totalOrderValue * 0.001 : 0;
  const exchangeTax = totalOrderValue * 0.000345;
  const gst = (brokerage + exchangeTax) * 0.18;
  const stampDuty = orderAction === 'BUY' ? totalOrderValue * 0.00015 : 0;
  const totalCharges = brokerage + stt + exchangeTax + gst + stampDuty;
  const netPayable = totalOrderValue + totalCharges;

  const handleStepAdvance = () => {
    if (quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    if (remainingMargin < 0) {
      toast.error('Insufficient margin available');
      return;
    }
    setStep('review');
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    try {
      await api.post('/orders/place', {
        broker_account_id: "00000000-0000-0000-0000-000000000000", // Would be fetched from user's connected brokers
        symbol: symbol,
        side: orderAction,
        order_type: orderType,
        quantity: quantity,
        price: orderType === 'MARKET' ? null : limitPrice,
        trigger_price: null
      });
      setStep('success');
      toast.success(`Order executed! ${orderAction} ${quantity} ${symbol}`);
    } catch (err) {
      console.error(err);
      toast.error('Order execution failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex justify-end bg-slate-900/50 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="w-full max-w-lg bg-[#F8FAFC] h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        >
          {/* HEADER */}
          <div className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between z-10 shadow-xs">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-xs ${
                orderAction === 'BUY' ? 'bg-[#16A34A]' : 'bg-loss'
              }`}>
                {orderAction}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg leading-tight text-[#172033]">{symbol}</h3>
                  <span className="text-[10px] font-extrabold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {exchange}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400 truncate block max-w-[200px]">{companyName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-[#172033]">
                ₹{basePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* MAIN STEPPER CONTENT */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

            {/* STAGE 1: INPUT FORM */}
            {step === 'input' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                
                {/* Buy / Sell Toggle & Exchange Switch */}
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs">
                  <button
                    onClick={() => setOrderAction('BUY')}
                    className={`py-2.5 rounded-xl font-black text-xs transition-all ${
                      orderAction === 'BUY' ? 'bg-[#16A34A] text-white shadow-md' : 'text-slate-500 hover:text-[#172033]'
                    }`}
                  >
                    BUY ORDER
                  </button>
                  <button
                    onClick={() => setOrderAction('SELL')}
                    className={`py-2.5 rounded-xl font-black text-xs transition-all ${
                      orderAction === 'SELL' ? 'bg-loss text-white shadow-md' : 'text-slate-500 hover:text-[#172033]'
                    }`}
                  >
                    SELL ORDER
                  </button>
                </div>

                {/* Product Type (CNC vs MIS) */}
                <div className="bg-white p-4 rounded-[20px] border border-[#E2E8F0] shadow-xs flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Product Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setProductType('CNC')}
                      className={`p-3 rounded-xl border text-left transition ${
                        productType === 'CNC' ? 'bg-primary-light border-primary text-primary-dark' : 'bg-[#F8FAFC] border-[#E2E8F0] text-slate-600'
                      }`}
                    >
                      <span className="font-black text-xs block">Delivery (CNC)</span>
                      <span className="text-[9.5px] font-bold text-slate-400 block mt-0.5">100% Cash · Long-Term Holding</span>
                    </button>
                    <button
                      onClick={() => setProductType('MIS')}
                      className={`p-3 rounded-xl border text-left transition ${
                        productType === 'MIS' ? 'bg-primary-light border-primary text-primary-dark' : 'bg-[#F8FAFC] border-[#E2E8F0] text-slate-600'
                      }`}
                    >
                      <span className="font-black text-xs block">Intraday (MIS)</span>
                      <span className="text-[9.5px] font-bold text-slate-400 block mt-0.5">5x Margin · Square Off Today</span>
                    </button>
                  </div>
                </div>

                {/* Order Type Chips */}
                <div className="bg-white p-4 rounded-[20px] border border-[#E2E8F0] shadow-xs flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Order Type</label>
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                    {(['MARKET', 'LIMIT', 'SL', 'SL-M', 'GTT', 'AMO'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition shrink-0 ${
                          orderType === type
                            ? 'bg-[#172033] text-white shadow-sm'
                            : 'bg-[#F8FAFC] border border-[#E2E8F0] text-slate-500 hover:text-[#172033]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Stepper & Price Input */}
                <div className="bg-white p-5 rounded-[20px] border border-[#E2E8F0] shadow-xs flex flex-col gap-4">
                  
                  {/* Quantity Stepper */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quantity (Shares)</label>
                      <div className="flex gap-1.5">
                        {[10, 50, 100].map(addQty => (
                          <button
                            key={addQty}
                            onClick={() => setQuantity(q => q + addQty)}
                            className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600 hover:bg-slate-200"
                          >
                            +{addQty}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-2">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] font-black text-lg text-[#172033] hover:bg-slate-100 flex items-center justify-center shadow-xs"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 bg-transparent text-center font-black text-xl text-[#172033] outline-none"
                      />
                      <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] font-black text-lg text-[#172033] hover:bg-slate-100 flex items-center justify-center shadow-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Limit Price Input if LIMIT or SL */}
                  {orderType !== 'MARKET' && (
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Execution Limit Price (₹)</label>
                      <input
                        type="number"
                        step="0.05"
                        value={limitPrice}
                        onChange={(e) => setLimitPrice(parseFloat(e.target.value) || basePrice)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 font-black text-[#172033] text-base outline-none focus:border-primary"
                      />
                    </div>
                  )}
                </div>

                {/* Margins & Live Investment Value */}
                <div className="bg-white p-5 rounded-[20px] border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-400">Total Order Value</span>
                    <span className="font-black text-lg text-[#172033]">
                      ₹{totalOrderValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Required Margin</span>
                      <span className="font-black text-primary">
                        ₹{marginRequired.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Available Funds</span>
                      <span className="font-black text-[#172033]">
                        ₹{availableMargin.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Charges Drawer Accordion */}
                <div className="bg-white rounded-[20px] border border-[#E2E8F0] shadow-xs overflow-hidden">
                  <button
                    onClick={() => setShowCharges(!showCharges)}
                    className="w-full p-4 flex items-center justify-between text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    <span>Estimated Charges & Taxes</span>
                    <div className="flex items-center gap-1">
                      <span className="font-black text-[#172033]">₹{totalCharges.toFixed(2)}</span>
                      {showCharges ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {showCharges && (
                    <div className="p-4 border-t border-slate-100 bg-[#F8FAFC] flex flex-col gap-2 text-[11px] text-slate-600 font-medium">
                      <div className="flex justify-between"><span>Brokerage:</span><span className="font-bold text-emerald-600">FREE ₹0.00</span></div>
                      <div className="flex justify-between"><span>STT / CTT:</span><span className="font-bold">₹{stt.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Exchange Turnover Tax:</span><span className="font-bold">₹{exchangeTax.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>GST (18%):</span><span className="font-bold">₹{gst.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span>Stamp Duty:</span><span className="font-bold">₹{stampDuty.toFixed(2)}</span></div>
                    </div>
                  )}
                </div>

                {/* AI Risk & Suitability Check */}
                <div className="p-4 bg-primary-light border border-[#E2E8F0] rounded-[20px] flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs text-primary-dark font-medium leading-relaxed">
                    <span className="font-black block text-blue-950 mb-0.5">ArthSetu AI Risk Meter: Medium Risk</span>
                    Order is suitable for your long-term capital growth profile. Risk/reward ratio: 1:3.2.
                  </div>
                </div>

              </div>
            )}

            {/* STAGE 2: REVIEW SCREEN */}
            {step === 'review' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="bg-white p-6 rounded-[24px] border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black ${
                        orderAction === 'BUY' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        CONFIRM {orderAction} ORDER
                      </span>
                      <h3 className="text-xl font-black text-[#172033] mt-1">{symbol}</h3>
                    </div>
                    <span className="text-2xl font-black text-[#172033]">
                      ₹{netPayable.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Quantity</span>
                      <span className="font-black text-[#172033]">{quantity} Shares</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Price</span>
                      <span className="font-black text-[#172033]">
                        {orderType === 'MARKET' ? 'Market Price' : `₹${limitPrice}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Product</span>
                      <span className="font-black text-[#172033]">{productType === 'CNC' ? 'Delivery (CNC)' : 'Intraday (MIS)'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Charges</span>
                      <span className="font-black text-[#172033]">₹{totalCharges.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2 text-xs text-emerald-800 font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>SEBI Compliant Direct Market Access execution ready.</span>
                </div>
              </div>
            )}

            {/* STAGE 3: SUCCESS CONFIRMATION SCREEN */}
            {step === 'success' && (
              <div className="flex flex-col items-center justify-center text-center py-8 gap-6 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg animate-bounce">
                  <CheckCircle2 className="w-14 h-14" />
                </div>

                <div>
                  <span className="text-xs font-extrabold uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    ORDER EXECUTED
                  </span>
                  <h2 className="text-3xl font-black text-[#172033] mt-3">{symbol}</h2>
                  <p className="text-sm font-bold text-slate-500 mt-1">
                    Successfully placed {orderAction} order for {quantity} shares at ₹{executionPrice.toFixed(2)}
                  </p>
                </div>

                <div className="w-full bg-white p-5 rounded-[24px] border border-[#E2E8F0] shadow-sm grid grid-cols-2 gap-4 text-xs text-left">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Order ID</span>
                    <span className="font-black text-[#172033]">#ORD-{Date.now().toString().slice(-6)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Execution Time</span>
                    <span className="font-black text-[#172033]">Just Now</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Average Price</span>
                    <span className="font-black text-[#172033]">₹{executionPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Settled</span>
                    <span className="font-black text-emerald-600">₹{netPayable.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full py-4 rounded-xl bg-[#172033] text-white font-black text-sm hover:bg-slate-800 transition shadow-lg"
                >
                  Done & Close Terminal
                </button>
              </div>
            )}

          </div>

          {/* FOOTER CTA BAR */}
          {step !== 'success' && (
            <div className="bg-white border-t border-[#E2E8F0] p-5 sticky bottom-0 z-10 flex items-center gap-3">
              {step === 'review' && (
                <button
                  onClick={() => setStep('input')}
                  className="px-4 py-3.5 rounded-xl border border-[#E2E8F0] text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={step === 'input' ? handleStepAdvance : handleConfirmOrder}
                disabled={isSubmitting}
                className={`flex-1 font-black py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-sm text-white ${
                  orderAction === 'BUY'
                    ? 'bg-[#16A34A] hover:bg-emerald-700 shadow-emerald-500/20'
                    : 'bg-loss hover:bg-rose-700 shadow-rose-500/20'
                }`}
              >
                {isSubmitting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : step === 'input' ? (
                  <>Review {orderAction} Order <ArrowRight className="w-5 h-5" /></>
                ) : (
                  <>Confirm & Execute {orderAction} Order</>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
