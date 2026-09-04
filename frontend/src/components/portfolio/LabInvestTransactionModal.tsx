import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, Check, ArrowRight, ArrowLeft, ShieldCheck, AlertCircle,
  TrendingUp, ArrowUpRight, ArrowDownRight, Sparkles, CheckCircle2, DollarSign, Minus, Plus
} from 'lucide-react';
import marketService from '../../services/market.service';

export interface SearchableStock {
  symbol: string;
  name: string;
  price: number;
  change: string;
  isPositive?: boolean;
  score: string;
}

interface LabInvestTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableTokens: number;
  existingHolding?: any; // If provided, allows Sell mode
  onConfirmBuy: (stock: SearchableStock, shares: number, thesisText: string) => void;
  onConfirmSell?: (symbol: string, sharesToSell: number) => void;
}

export const LabInvestTransactionModal: React.FC<LabInvestTransactionModalProps> = ({
  isOpen,
  onClose,
  availableTokens,
  existingHolding,
  onConfirmBuy,
  onConfirmSell
}) => {
  // Modal Navigation Stage: 'select' (Stage 1) -> 'transaction' (Stage 2) -> 'success'
  const [stage, setStage] = useState<'select' | 'transaction' | 'success'>(
    existingHolding ? 'transaction' : 'select'
  );

  const [liveSearchableStocks, setLiveSearchableStocks] = useState<SearchableStock[]>([]);

  useEffect(() => {
    let isMounted = true;
    marketService.getStocks().then((stocks) => {
      if (stocks && stocks.length > 0 && isMounted) {
        const mapped = stocks.map((s) => ({
          symbol: s.symbol,
          name: s.companyName,
          price: s.lastPrice,
          change: (s.changePercent >= 0 ? '+' : '') + s.changePercent.toFixed(2) + '%',
          isPositive: s.changePercent >= 0,
          score: '82/100',
        }));
        setLiveSearchableStocks(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<SearchableStock>(
    existingHolding
      ? { symbol: existingHolding.symbol, name: existingHolding.name, price: existingHolding.currentPrice, change: '+1.25%', isPositive: true, score: '80/100' }
      : { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 1313.10, change: '+0.31%', isPositive: true, score: '82/100' }
  );

  // Transaction state (Buy / Sell)
  const [txMode, setTxMode] = useState<'BUY' | 'SELL'>(existingHolding ? 'SELL' : 'BUY');
  const [shareQty, setShareQty] = useState<number>(10);
  const [thesisText, setThesisText] = useState<string>('');

  // Post-transaction summary cache
  const [lastTxSummary, setLastTxSummary] = useState<any>(null);

  if (!isOpen) return null;

  // Filter stocks for Stage 1 Search
  const filteredStocks = liveSearchableStocks.filter(st =>
    st.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate real-time token requirements
  const requiredTokens = Math.round(selectedStock.price * shareQty);
  const isAffordable = availableTokens >= requiredTokens;
  const tokenDifference = requiredTokens - availableTokens;

  // Calculate maximum affordable whole shares
  const maxAffordableShares = Math.max(1, Math.floor(availableTokens / selectedStock.price));

  // Existing holding stats for SELL mode
  const ownedShares = existingHolding ? Math.round(existingHolding.currentValueTokens / existingHolding.currentPrice) || 10 : 0;
  const maxSellQty = ownedShares || 1;
  const estimatedSaleValue = Math.round(selectedStock.price * Math.min(shareQty, maxSellQty));
  const newTokensAfterSale = availableTokens + estimatedSaleValue;

  const handleSelectStockFromStage1 = (st: SearchableStock) => {
    setSelectedStock(st);
    setTxMode('BUY');
    setShareQty(10);
    setThesisText('');
    setStage('transaction');
  };

  const handleExecuteBuy = () => {
    if (!isAffordable) return;

    onConfirmBuy(selectedStock, shareQty, thesisText);
    setLastTxSummary({
      mode: 'BUY',
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      shares: shareQty,
      price: selectedStock.price,
      totalTokens: requiredTokens,
      thesis: thesisText
    });
    setStage('success');
  };

  const handleExecuteSell = () => {
    if (!existingHolding || !onConfirmSell) return;

    const sellQty = Math.min(shareQty, maxSellQty);
    onConfirmSell(selectedStock.symbol, sellQty);

    setLastTxSummary({
      mode: 'SELL',
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      sharesSold: sellQty,
      price: selectedStock.price,
      saleValue: estimatedSaleValue,
      newAvailableTokens: newTokensAfterSale
    });
    setStage('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs font-sans">
      <AnimatePresence mode="wait">
        
        {/* STAGE 1: SELECT STOCK POPUP */}
        {stage === 'select' && (
          <motion.div
            key="stage1_select"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            className="bg-white w-full max-w-[460px] rounded-[24px] border border-[#E2E8F0] p-6 space-y-5 shadow-2xl relative max-h-[85vh] flex flex-col overflow-hidden"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 text-[#64748B] hover:text-[#172033] cursor-pointer rounded-full bg-[#F1F5F9] transition"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* HEADER & LIVE AVAILABLE TOKENS */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#15519D] text-[10px] font-black uppercase tracking-wider">
                  INVEST VIRTUAL TOKENS
                </span>
                <span className="text-xs font-extrabold text-[#15519D] bg-slate-100 px-2.5 py-0.5 rounded-full mr-6">
                  Available Tokens: ₹{availableTokens.toLocaleString('en-IN')}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#172033]">Invest Virtual Tokens</h3>
              <p className="text-xs text-[#64748B] font-medium">Search for a stock you want to invest in.</p>
            </div>

            {/* SEARCH INPUT */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search stocks or companies..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] rounded-xl text-xs font-bold text-[#172033] outline-none transition"
              />
            </div>

            {/* STOCKS LIST (SEARCH RESULTS OR RECOMMENDED) */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                {searchQuery.trim() ? 'Search Results' : 'Recommended for You'}
              </div>

              {filteredStocks.length > 0 ? (
                filteredStocks.map(st => (
                  <div
                    key={st.symbol}
                    onClick={() => handleSelectStockFromStage1(st)}
                    className="p-3 bg-[#F8FAFC] hover:bg-blue-50/50 rounded-xl border border-[#E2E8F0] hover:border-[#15519D] transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#15519D] text-white font-black text-xs flex items-center justify-center shrink-0">
                        {st.symbol.substring(0, 2)}
                      </div>
                      <div>
                        <div className="font-black text-xs text-[#172033] group-hover:text-[#15519D] transition-colors">
                          {st.symbol}
                        </div>
                        <div className="text-[11px] text-[#64748B] font-medium line-clamp-1">
                          {st.name}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-xs text-[#172033]">₹{st.price.toLocaleString('en-IN')}</div>
                      <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold">
                        <span className="text-emerald-600">{st.change}</span>
                        <span className="text-[#15519D] bg-blue-50 px-1.5 py-0.2 rounded font-black">View {st.score}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center space-y-1">
                  <p className="text-xs font-bold text-[#172033]">No matching stocks found.</p>
                  <p className="text-[11px] text-[#64748B]">Try searching by company name or ticker symbol.</p>
                </div>
              )}
            </div>

          </motion.div>
        )}

        {/* STAGE 2: BUY / SELL TRANSACTION MODAL */}
        {stage === 'transaction' && (
          <motion.div
            key="stage2_transaction"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            className="bg-white w-full max-w-[480px] rounded-[24px] border border-[#E2E8F0] p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto"
          >
            {/* BACK / CLOSE BUTTONS */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStage('select')}
                className="text-xs font-bold text-[#64748B] hover:text-[#172033] flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Change Stock
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-[#64748B] hover:text-[#172033] cursor-pointer rounded-full bg-[#F1F5F9]"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SELECTED STOCK HEADER */}
            <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#15519D] text-white font-black text-xs flex items-center justify-center shrink-0">
                  {selectedStock.symbol.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-black text-sm text-[#172033]">{selectedStock.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#64748B]">
                    <span>{selectedStock.symbol}</span> • <span className="text-emerald-600">{selectedStock.change} Today</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-black text-[#172033]">₹{selectedStock.price.toLocaleString('en-IN')}</div>
                <span className="text-[10px] font-black text-[#15519D] bg-blue-50 px-2 py-0.5 rounded-md">
                  View {selectedStock.score}
                </span>
              </div>
            </div>

            {/* BUY / SELL TOGGLE */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setTxMode('BUY')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition cursor-pointer ${
                  txMode === 'BUY' ? 'bg-[#15519D] text-white shadow-xs' : 'text-[#64748B] hover:text-[#172033]'
                }`}
              >
                BUY
              </button>

              <button
                type="button"
                onClick={() => {
                  setTxMode('SELL');
                  if (ownedShares > 0) setShareQty(Math.min(5, ownedShares));
                }}
                className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition cursor-pointer ${
                  txMode === 'SELL' ? 'bg-[#DC2626] text-white shadow-xs' : 'text-[#64748B] hover:text-[#172033]'
                }`}
              >
                SELL {existingHolding ? `(${ownedShares} Owned)` : ''}
              </button>
            </div>

            {/* BUY MODE WORKSPACE */}
            {txMode === 'BUY' && (
              <div className="space-y-4">
                
                {/* SHARE QUANTITY FIELD */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#172033] uppercase">How many shares?</label>
                    <span className="text-[11px] font-semibold text-[#64748B]">Price: ₹{selectedStock.price}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShareQty(Math.max(1, shareQty - 1))}
                      className="p-2.5 bg-[#F1F5F9] hover:bg-slate-200 text-[#172033] rounded-xl cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <input
                      type="number"
                      min={1}
                      value={shareQty}
                      onChange={e => setShareQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="flex-1 px-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] rounded-xl text-center font-black text-sm text-[#172033] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShareQty(shareQty + 1)}
                      className="p-2.5 bg-[#F1F5F9] hover:bg-slate-200 text-[#172033] rounded-xl cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* QUICK QUANTITY SHORTCUT CHIPS */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 5, 10, 25, 50].map(q => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setShareQty(q)}
                        className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition cursor-pointer ${
                          shareQty === q ? 'bg-blue-50 border-[#15519D] text-[#15519D]' : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#172033]'
                        }`}
                      >
                        {q}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setShareQty(maxAffordableShares)}
                      className={`px-3 py-1 text-xs font-extrabold rounded-lg border transition cursor-pointer ml-auto ${
                        shareQty === maxAffordableShares ? 'bg-blue-50 border-[#15519D] text-[#15519D]' : 'bg-[#15519D]/10 border-[#15519D]/30 text-[#15519D]'
                      }`}
                    >
                      Max ({maxAffordableShares})
                    </button>
                  </div>
                </div>

                {/* REAL-TIME TOKEN CALCULATIONS */}
                <div className="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1 text-xs">
                  <div className="flex justify-between font-extrabold text-[#172033]">
                    <span>Required Tokens ({shareQty} Shares × ₹{selectedStock.price}):</span>
                    <span className="text-[#15519D]">₹{requiredTokens.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between font-medium text-[#64748B]">
                    <span>Available Tokens:</span>
                    <span>₹{availableTokens.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between font-medium text-[#64748B] border-t border-slate-200/60 pt-1">
                    <span>Remaining Tokens:</span>
                    <span className={isAffordable ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                      ₹{(availableTokens - requiredTokens).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* INLINE BUY VALIDATION WARNING */}
                {!isAffordable && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-1">
                    <div className="font-extrabold text-rose-800 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Not enough Tokens for this investment.</span>
                    </div>
                    <div className="text-[11px] text-rose-700 font-semibold flex items-center gap-3 pt-0.5">
                      <span>Available: ₹{availableTokens.toLocaleString('en-IN')}</span>
                      <span>Required: ₹{requiredTokens.toLocaleString('en-IN')}</span>
                      <span>Diff: ₹{tokenDifference.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}

                {/* OPTIONAL INVESTMENT THESIS */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#172033] uppercase">Why are you investing?</label>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Optional</span>
                  </div>

                  <textarea
                    rows={2}
                    value={thesisText}
                    onChange={e => setThesisText(e.target.value)}
                    placeholder="Add a short reason for this investment..."
                    className="w-full p-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] rounded-xl text-xs font-medium outline-none"
                  />

                  {/* THESIS PRESET CHIPS */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[
                      'Strong business fundamentals',
                      'Long-term growth opportunity',
                      'Attractive valuation',
                      'Sector momentum'
                    ].map(chip => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => setThesisText(chip)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-[#64748B] hover:text-[#172033] text-[10px] font-bold rounded-lg transition cursor-pointer"
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PRIMARY CTA BUY */}
                <button
                  onClick={handleExecuteBuy}
                  disabled={!isAffordable}
                  className="w-full py-3.5 bg-[#15519D] hover:bg-[#123B63] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Confirm Virtual Investment (₹{requiredTokens.toLocaleString('en-IN')} Tokens) →
                </button>

              </div>
            )}

            {/* SELL MODE WORKSPACE */}
            {txMode === 'SELL' && (
              <div className="space-y-4">
                
                {/* YOUR POSITION */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="font-extrabold text-[#172033] border-b border-slate-200/80 pb-1">Your Position</div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700 font-medium">
                    <div>You Own: <strong className="text-slate-900">{ownedShares} Shares</strong></div>
                    <div>Avg Buy Price: <strong className="text-slate-900">₹{existingHolding?.avgPrice || selectedStock.price}</strong></div>
                    <div>Current Value: <strong className="text-slate-900">₹{(ownedShares * selectedStock.price).toLocaleString('en-IN')}</strong></div>
                    <div>Unrealized Return: <strong className="text-emerald-600">+14.20%</strong></div>
                  </div>
                </div>

                {/* HOW MANY SHARES TO SELL? */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#172033] uppercase">How many shares to sell?</label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShareQty(Math.max(1, shareQty - 1))}
                      className="p-2.5 bg-[#F1F5F9] hover:bg-slate-200 text-[#172033] rounded-xl cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <input
                      type="number"
                      min={1}
                      max={maxSellQty}
                      value={shareQty}
                      onChange={e => setShareQty(Math.min(maxSellQty, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                      className="flex-1 px-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#DC2626] rounded-xl text-center font-black text-sm text-[#172033] outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShareQty(Math.min(maxSellQty, shareQty + 1))}
                      className="p-2.5 bg-[#F1F5F9] hover:bg-slate-200 text-[#172033] rounded-xl cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* PERCENTAGE CHIPS */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {[
                      { pct: '25%', qty: Math.max(1, Math.round(maxSellQty * 0.25)) },
                      { pct: '50%', qty: Math.max(1, Math.round(maxSellQty * 0.50)) },
                      { pct: '75%', qty: Math.max(1, Math.round(maxSellQty * 0.75)) },
                      { pct: 'MAX', qty: maxSellQty },
                    ].map(p => (
                      <button
                        key={p.pct}
                        type="button"
                        onClick={() => setShareQty(p.qty)}
                        className={`px-3 py-1 text-xs font-bold rounded-lg border transition cursor-pointer ${
                          shareQty === p.qty ? 'bg-rose-50 border-[#DC2626] text-[#DC2626]' : 'bg-white border-[#E2E8F0] text-[#64748B]'
                        }`}
                      >
                        {p.pct}
                      </button>
                    ))}
                  </div>
                </div>

                {/* REAL-TIME SALE CALCULATIONS */}
                <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100 text-xs space-y-1">
                  <div className="flex justify-between font-extrabold text-[#172033]">
                    <span>Estimated Sale Value ({shareQty} Shares × ₹{selectedStock.price}):</span>
                    <span className="text-emerald-700">₹{estimatedSaleValue.toLocaleString('en-IN')} Tokens</span>
                  </div>

                  <div className="flex justify-between font-medium text-[#64748B]">
                    <span>Remaining Shares:</span>
                    <span>{maxSellQty - shareQty} Shares</span>
                  </div>

                  <div className="flex justify-between font-bold text-slate-800 border-t border-rose-200/60 pt-1">
                    <span>Available Tokens After Sale:</span>
                    <span className="text-[#15519D]">₹{newTokensAfterSale.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* PRIMARY CTA SELL */}
                <button
                  onClick={handleExecuteSell}
                  className="w-full py-3.5 bg-[#DC2626] hover:bg-rose-800 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Sell {shareQty} Shares → ₹{estimatedSaleValue.toLocaleString('en-IN')} Tokens
                </button>

              </div>
            )}

          </motion.div>
        )}

        {/* STAGE 3: COMPACT SUCCESS CONFIRMATION VIEW */}
        {stage === 'success' && lastTxSummary && (
          <motion.div
            key="stage3_success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="bg-white w-full max-w-[420px] rounded-[24px] border border-[#E2E8F0] p-6 space-y-5 shadow-2xl text-center relative"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-emerald-600 uppercase">
                {lastTxSummary.mode === 'BUY' ? 'Investment Added' : 'Position Updated'}
              </span>
              <h3 className="text-xl font-extrabold text-[#172033]">{lastTxSummary.symbol}</h3>
              <p className="text-xs text-[#64748B] font-medium">{lastTxSummary.name}</p>
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1.5 text-xs text-left">
              {lastTxSummary.mode === 'BUY' ? (
                <>
                  <div className="flex justify-between font-bold text-[#172033]">
                    <span>Shares Purchased:</span>
                    <span>{lastTxSummary.shares} Shares</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#172033]">
                    <span>Tokens Invested:</span>
                    <span className="text-[#15519D]">₹{lastTxSummary.totalTokens.toLocaleString('en-IN')} Tokens</span>
                  </div>
                  <div className="flex justify-between font-medium text-[#64748B]">
                    <span>Average Price:</span>
                    <span>₹{lastTxSummary.price}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between font-bold text-[#172033]">
                    <span>Shares Sold:</span>
                    <span>{lastTxSummary.sharesSold} Shares</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-700">
                    <span>Tokens Returned:</span>
                    <span>₹{lastTxSummary.saleValue.toLocaleString('en-IN')} Tokens</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#15519D] border-t border-slate-200/60 pt-1">
                    <span>New Available Tokens:</span>
                    <span>₹{lastTxSummary.newAvailableTokens.toLocaleString('en-IN')}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                {lastTxSummary.mode === 'BUY' ? 'View Holding' : 'View Portfolio'}
              </button>

              <button
                onClick={() => setStage('select')}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-[#172033] font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Continue Researching
              </button>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default LabInvestTransactionModal;
