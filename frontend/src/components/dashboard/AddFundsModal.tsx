import React, { useState, useEffect } from 'react';
import { 
  X, Wallet, CheckCircle2, ShieldCheck, Copy, Check,
  QrCode, Building2, Smartphone, CreditCard, History, Sparkles, RefreshCw,
  Clock, AlertCircle, ExternalLink, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Lock,
  TrendingDown, KeyRound, Banknote
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const UpiAppIcon: React.FC<{ id: string; isSelected?: boolean }> = ({ id }) => {
  switch (id) {
    case 'gpay':
      return (
        <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center p-1.5 shrink-0">
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.14C3.26 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.29C.47 8.23 0 10.06 0 12s.47 3.77 1.29 5.41l3.99-3.14z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.59l3.99 3.14c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
        </div>
      );
    case 'phonepe':
      return (
        <div className="w-8 h-8 rounded-xl bg-[#5f259f] text-white flex items-center justify-center font-black shrink-0 shadow-2xs">
          <span className="text-xs font-black italic tracking-tighter">pe</span>
        </div>
      );
    case 'paytm':
      return (
        <div className="w-8 h-8 rounded-xl bg-[#00baf2] text-white flex items-center justify-center font-black text-[9px] shrink-0 shadow-2xs">
          <span className="font-extrabold tracking-tighter text-[#002e6e] bg-white px-1 py-0.5 rounded-[3px]">Paytm</span>
        </div>
      );
    case 'bhim':
      return (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-500 via-white to-emerald-600 border border-slate-200 flex items-center justify-center text-[#0f172a] font-black shrink-0 shadow-2xs">
          <span className="bg-white/95 px-1 rounded text-[8px] font-black text-orange-600">BHIM</span>
        </div>
      );
    default:
      return <Smartphone className="w-5 h-5" />;
  }
};

const BankLogo: React.FC<{ name: string; isSelected?: boolean }> = ({ name }) => {
  const getBadgeStyle = () => {
    if (name.includes('HDFC')) return { bg: 'bg-[#004b8d]', text: 'HDFC', color: 'text-white' };
    if (name.includes('ICICI')) return { bg: 'bg-[#f37021]', text: 'ICICI', color: 'text-white' };
    if (name.includes('State Bank') || name.includes('SBI')) return { bg: 'bg-[#280071]', text: 'SBI', color: 'text-white' };
    if (name.includes('Axis')) return { bg: 'bg-[#97144d]', text: 'AXIS', color: 'text-white' };
    if (name.includes('Kotak')) return { bg: 'bg-[#ea1c24]', text: 'KOTAK', color: 'text-white' };
    if (name.includes('IndusInd')) return { bg: 'bg-[#800000]', text: 'INDUS', color: 'text-white' };
    return { bg: 'bg-[#123B63]', text: name.substring(0, 3).toUpperCase(), color: 'text-white' };
  };

  const style = getBadgeStyle();

  return (
    <div className={`w-8 h-8 rounded-xl ${style.bg} ${style.color} font-black text-[9px] flex items-center justify-center shrink-0 shadow-2xs`}>
      <span>{style.text}</span>
    </div>
  );
};

interface AddFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (amountAdded: number) => void;
  initialMode?: 'deposit' | 'withdraw';
}

export const AddFundsModal: React.FC<AddFundsModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'deposit'
}) => {
  // Navigation Mode: 'deposit' | 'withdraw' | 'history'
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'history'>(initialMode);
  
  useEffect(() => {
    if (isOpen && initialMode) {
      setActiveTab(initialMode);
    }
  }, [isOpen, initialMode]);

  // Balance States
  const [balance, setBalance] = useState<number>(() => {
    const val = localStorage.getItem('demat_cash_balance');
    const parsed = val ? parseFloat(val) : 0;
    return isNaN(parsed) || parsed === 0 ? 145250.00 : parsed;
  });

  const withdrawableBalance = Math.max(0, balance - 2450.00); // Demo withdrawable limit calculation

  // ── DEPOSIT STATES ──
  const [depositAmount, setDepositAmount] = useState<string>('25000');
  const [depositStep, setDepositStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'netbanking' | 'neft'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('gpay');
  const [customUpiId, setCustomUpiId] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('HDFC Bank');
  const [upiTimer, setUpiTimer] = useState<number>(300); // 5 min timer
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [lastDepositDetails, setLastDepositDetails] = useState<any>(null);

  // ── WITHDRAWAL STATES ──
  const [withdrawAmount, setWithdrawAmount] = useState<string>('10000');
  const [withdrawStep, setWithdrawStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedWithdrawBank, setSelectedWithdrawBank] = useState<string>('HDFC Bank (A/c •••• 4892)');
  const [securityPin, setSecurityPin] = useState<string>('1234');
  const [lastWithdrawDetails, setLastWithdrawDetails] = useState<any>(null);

  // UPI Countdown Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (depositStep === 4 && upiTimer > 0) {
      interval = setInterval(() => {
        setUpiTimer((prev) => prev - 1);
      }, 1000);
    } else if (upiTimer === 0 && depositStep === 4) {
      toast.error('UPI payment request timed out. Please try again.');
      setDepositStep(1);
    }
    return () => clearInterval(interval);
  }, [depositStep, upiTimer]);

  if (!isOpen) return null;

  const quickDepositAmounts = [5000, 10000, 25000, 50000, 100000];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // ── DEPOSIT HANDLERS ──
  const handleProceedDepositStep1 = () => {
    const numAmount = parseFloat(depositAmount);
    if (isNaN(numAmount) || numAmount < 100) {
      toast.error('Minimum deposit amount is ₹100');
      return;
    }
    if (numAmount > 1000000) {
      toast.error('Maximum single deposit limit is ₹10,00,000');
      return;
    }
    setDepositStep(2);
  };

  const handleProceedDepositStep2 = () => {
    setDepositStep(3);
  };

  const handleStartDepositPayment = () => {
    if (paymentMethod === 'upi') {
      setDepositStep(4);
      setUpiTimer(300);
      const appName = customUpiId || selectedUpiApp.toUpperCase();
      toast.loading(`Approval request sent to your ${appName} app`, { id: 'upi-toast' });
    } else if (paymentMethod === 'netbanking') {
      setDepositStep(4);
    } else if (paymentMethod === 'neft') {
      setDepositStep(4);
    }
  };

  const handleSimulateDepositApproval = () => {
    const numAmount = parseFloat(depositAmount);
    const newBal = balance + numAmount;
    setBalance(newBal);
    localStorage.setItem('demat_cash_balance', String(newBal));

    const txn = {
      id: `UNI-${Date.now().toString().slice(-8)}`,
      amount: numAmount,
      method: paymentMethod === 'upi' ? `UPI (${customUpiId || selectedUpiApp.toUpperCase()})` : paymentMethod === 'netbanking' ? `NetBanking (${selectedBank})` : 'NEFT / RTGS Transfer',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Success'
    };
    setLastDepositDetails(txn);
    toast.dismiss('upi-toast');
    toast.success(`₹${numAmount.toLocaleString('en-IN')} deposited successfully!`);
    setDepositStep(5);
    if (onSuccess) onSuccess(numAmount);
  };

  // ── WITHDRAWAL HANDLERS ──
  const handleProceedWithdrawStep1 = () => {
    const numAmount = parseFloat(withdrawAmount);
    if (isNaN(numAmount) || numAmount < 100) {
      toast.error('Minimum withdrawal amount is ₹100');
      return;
    }
    if (numAmount > withdrawableBalance) {
      toast.error(`Maximum withdrawable limit is ₹${withdrawableBalance.toLocaleString('en-IN')}`);
      return;
    }
    setWithdrawStep(2);
  };

  const handleProceedWithdrawStep2 = () => {
    setWithdrawStep(3);
  };

  const handleConfirmWithdrawalPin = () => {
    const pin = securityPin.length === 4 ? securityPin : '1234';
    setSecurityPin(pin);
    setWithdrawStep(4);
    
    // Simulate IMPS bank settlement processing delay
    setTimeout(() => {
      const numAmount = parseFloat(withdrawAmount) || 10000;
      const newBal = Math.max(0, balance - numAmount);
      setBalance(newBal);
      localStorage.setItem('demat_cash_balance', String(newBal));

      const txn = {
        id: `WTH-${Date.now().toString().slice(-8)}`,
        amount: numAmount,
        bank: selectedWithdrawBank,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Success',
        estimatedCredit: '15 mins – 2 hours (IMPS Payout)'
      };
      setLastWithdrawDetails(txn);
      setWithdrawStep(5);
      toast.success(`Withdrawal request of ₹${numAmount.toLocaleString('en-IN')} authorized successfully!`);
    }, 1800);
  };

  const handleResetModal = () => {
    setDepositStep(1);
    setWithdrawStep(1);
    setSecurityPin('');
    onClose();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-md"
        />

        {/* Modal Main Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-white rounded-[28px] shadow-2xl border border-[#E2E8F0] overflow-hidden z-10 flex flex-col my-auto font-sans text-[#172033]"
        >
          {/* Top Branded Header */}
          <div className="bg-[#123B63] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute right-5 top-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/10 text-white border border-white/20 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SEBI Registered Brokerage Account
              </span>
            </div>

            <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Wallet className="w-6 h-6 text-blue-300" /> 
              {activeTab === 'deposit' ? 'Deposit Funds' : activeTab === 'withdraw' ? 'Withdraw Money' : 'Transaction History'}
            </h2>

            {/* Current Balance Snapshot Card */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-300 block">
                  {activeTab === 'withdraw' ? 'Withdrawable Cash Limit' : 'Total Trading Cash Balance'}
                </span>
                <span className="text-xl font-black text-white">
                  ₹{(activeTab === 'withdraw' ? withdrawableBalance : balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-300 block">Demat Account</span>
                <span className="text-xs font-mono font-bold text-emerald-400">IN303028130</span>
              </div>
            </div>

            {/* Top Mode Selector Tabs */}
            <div className="flex gap-2 mt-4 pt-3 border-t border-white/10 text-xs font-bold">
              <button
                onClick={() => { setActiveTab('deposit'); setDepositStep(1); }}
                className={`px-4 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'deposit' 
                    ? 'bg-[#15519D] text-white shadow-sm font-black' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Banknote className="w-3.5 h-3.5" /> Deposit
              </button>
              <button
                onClick={() => { setActiveTab('withdraw'); setWithdrawStep(1); }}
                className={`px-4 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'withdraw' 
                    ? 'bg-[#15519D] text-white shadow-sm font-black' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5" /> Withdraw
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'history' 
                    ? 'bg-[#15519D] text-white shadow-sm font-black' 
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <History className="w-3.5 h-3.5" /> History
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: DEPOSIT FUNDS MULTI-STEP FLOW                                     */}
          {/* ========================================================================= */}
          {activeTab === 'deposit' && (
            <div className="p-6 flex flex-col gap-5 max-h-[520px] overflow-y-auto">
              
              {/* DEPOSIT STEP INDICATOR */}
              <div className="flex items-center justify-between px-2 text-[11px] font-bold text-slate-400 border-b border-[#E2E8F0] pb-3">
                <span className={depositStep >= 1 ? 'text-[#15519D] font-black' : ''}>1. Amount</span>
                <span>•</span>
                <span className={depositStep >= 2 ? 'text-[#15519D] font-black' : ''}>2. Mode</span>
                <span>•</span>
                <span className={depositStep >= 3 ? 'text-[#15519D] font-black' : ''}>3. Details</span>
                <span>•</span>
                <span className={depositStep >= 4 ? 'text-[#15519D] font-black' : ''}>4. Status</span>
              </div>

              {/* ── DEPOSIT STEP 1: ENTER AMOUNT ── */}
              {depositStep === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#64748B] flex items-center justify-between">
                      <span>Deposit Amount (₹)</span>
                      <span className="text-[10px] text-slate-400">Min ₹100 • Max ₹10,00,000</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-2xl font-black text-[#172033]">₹</span>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0"
                        className="w-full pl-10 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#15519D] focus:bg-white rounded-2xl text-2xl font-black text-[#172033] outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {quickDepositAmounts.map((val) => (
                      <button
                        key={val}
                        onClick={() => setDepositAmount(val.toString())}
                        className={`px-3 py-1.5 border rounded-xl text-xs font-bold transition cursor-pointer ${
                          depositAmount === val.toString()
                            ? 'bg-[#15519D] text-white border-[#15519D] shadow-xs'
                            : 'bg-white text-[#172033] border-[#E2E8F0] hover:bg-[#EBF3FC] hover:text-[#15519D]'
                        }`}
                      >
                        +₹{val >= 100000 ? `${val / 100000}L` : `${val / 1000}k`}
                      </button>
                    ))}
                  </div>

                  {/* Primary Linked Bank Note */}
                  <div className="p-3.5 bg-[#EBF3FC] border border-[#B3D4F5] rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BankLogo name="HDFC Bank" />
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#15519D] block">Linked Bank Account</span>
                        <span className="text-xs font-black text-[#172033]">HDFC Bank •••• 4892</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">SEBI Verified</span>
                  </div>

                  <button
                    onClick={handleProceedDepositStep1}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#104280] text-white rounded-2xl font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Proceed to Select Payment Mode</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── DEPOSIT STEP 2: CHOOSE PAYMENT METHOD ── */}
              {depositStep === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <button onClick={() => setDepositStep(1)} className="text-xs font-bold text-[#15519D] flex items-center gap-1 cursor-pointer">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <span className="text-xs font-black text-[#172033]">Amount: ₹{parseFloat(depositAmount || '0').toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {[
                      { id: 'upi', title: 'UPI Instant Payment', desc: 'Google Pay, PhonePe, Paytm, BHIM or VPA ID', icon: Smartphone, tag: 'INSTANT • 0% FEE' },
                      { id: 'netbanking', title: 'NetBanking Portal', desc: 'HDFC, ICICI, SBI, Axis & all Indian banks', icon: Building2, tag: 'FAST' },
                      { id: 'neft', title: 'Bank Transfer (NEFT / RTGS)', desc: 'Direct IMPS / NEFT to Univest Virtual Account', icon: CreditCard, tag: 'NO LIMIT' },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setPaymentMethod(mode.id as any)}
                        className={`p-4 rounded-2xl border text-left flex items-start gap-3.5 transition cursor-pointer ${
                          paymentMethod === mode.id
                            ? 'border-[#15519D] bg-[#EBF3FC] shadow-xs'
                            : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl shrink-0 ${paymentMethod === mode.id ? 'bg-[#15519D] text-white' : 'bg-slate-100 text-[#15519D]'}`}>
                          <mode.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-black text-[#172033]">{mode.title}</span>
                            <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">{mode.tag}</span>
                          </div>
                          <p className="text-xs text-[#64748B] mt-0.5 font-medium">{mode.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleProceedDepositStep2}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#104280] text-white rounded-2xl font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Continue with {paymentMethod.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── DEPOSIT STEP 3: SPECIFIC MODE DETAILS ── */}
              {depositStep === 3 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <button onClick={() => setDepositStep(2)} className="text-xs font-bold text-[#15519D] flex items-center gap-1 cursor-pointer">
                      <ArrowLeft className="w-3.5 h-3.5" /> Change Mode
                    </button>
                    <span className="text-xs font-black text-[#172033]">Paying ₹{parseFloat(depositAmount || '0').toLocaleString('en-IN')}</span>
                  </div>

                  {/* UPI MODE OPTIONS */}
                  {paymentMethod === 'upi' && (
                    <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex flex-col gap-3">
                      <span className="text-xs font-black text-[#172033]">Select your preferred UPI App</span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {[
                          { id: 'gpay', name: 'Google Pay', sub: 'Instant collect' },
                          { id: 'phonepe', name: 'PhonePe', sub: 'Fast approval' },
                          { id: 'paytm', name: 'Paytm UPI', sub: 'Direct link' },
                          { id: 'bhim', name: 'BHIM UPI', sub: 'Govt app' },
                        ].map((app) => (
                          <button
                            key={app.id}
                            onClick={() => { setSelectedUpiApp(app.id); setCustomUpiId(''); }}
                            className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                              selectedUpiApp === app.id && !customUpiId
                                ? 'bg-[#15519D] text-white border-[#15519D] shadow-xs'
                                : 'bg-white border-[#E2E8F0] hover:border-slate-300 text-[#172033]'
                            }`}
                          >
                            <UpiAppIcon id={app.id} isSelected={selectedUpiApp === app.id && !customUpiId} />
                            <div>
                              <span className="font-black text-xs block leading-tight">{app.name}</span>
                              <span className={`text-[10px] block font-medium ${selectedUpiApp === app.id && !customUpiId ? 'text-blue-100' : 'text-[#64748B]'}`}>{app.sub}</span>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#E2E8F0] flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#64748B]">Or Enter Custom UPI VPA ID</label>
                        <input
                          type="text"
                          placeholder="e.g. mobile@okaxis or username@upi"
                          value={customUpiId}
                          onChange={(e) => setCustomUpiId(e.target.value)}
                          className="px-3.5 py-2.5 bg-white border border-[#E2E8F0] focus:border-[#15519D] rounded-xl text-xs font-bold outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* NETBANKING MODE OPTIONS */}
                  {paymentMethod === 'netbanking' && (
                    <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex flex-col gap-3">
                      <span className="text-xs font-black text-[#172033]">Select Bank Portal</span>
                      <div className="grid grid-cols-2 gap-2.5">
                        {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'IndusInd Bank'].map((b) => (
                          <button
                            key={b}
                            onClick={() => setSelectedBank(b)}
                            className={`p-3 rounded-2xl border text-left text-xs font-bold transition cursor-pointer flex items-center gap-2.5 ${
                              selectedBank === b 
                                ? 'bg-[#15519D] text-white border-[#15519D] font-black' 
                                : 'bg-white text-[#172033] border-[#E2E8F0] hover:border-slate-300'
                            }`}
                          >
                            <BankLogo name={b} isSelected={selectedBank === b} />
                            <span className="truncate flex-1">{b}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* NEFT / RTGS MODE VIRTUAL DETAILS */}
                  {paymentMethod === 'neft' && (
                    <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex flex-col gap-3">
                      <span className="text-xs font-black text-[#172033]">Transfer to Univest Virtual Account</span>
                      <div className="bg-white p-3.5 rounded-xl border border-[#E2E8F0] flex flex-col gap-2 font-mono text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-[#64748B] font-sans">Beneficiary:</span>
                          <span className="font-bold text-[#172033]">Univest Brokerage Ltd</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#64748B] font-sans">Virtual Account:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#172033]">UNIV987654321</span>
                            <button onClick={() => handleCopy('UNIV987654321', 'Virtual Account')} className="p-1 hover:bg-slate-100 rounded">
                              {copiedField === 'Virtual Account' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[#64748B] font-sans">IFSC Code:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#172033]">HDFC0000240</span>
                            <button onClick={() => handleCopy('HDFC0000240', 'IFSC Code')} className="p-1 hover:bg-slate-100 rounded">
                              {copiedField === 'IFSC Code' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleStartDepositPayment}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#104280] text-white rounded-2xl font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Sparkles className="w-4 h-4 fill-white" />
                    <span>Pay ₹{parseFloat(depositAmount || '0').toLocaleString('en-IN')} Now</span>
                  </button>
                </div>
              )}

              {/* ── DEPOSIT STEP 4: WAITING / PROCESSING SCREEN ── */}
              {depositStep === 4 && (
                <div className="py-6 px-4 flex flex-col items-center justify-center text-center gap-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  {/* App Icon Pulsing Badge */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-4 border-[#B3D4F5] animate-ping opacity-75" />
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-[#15519D] flex items-center justify-center shadow-lg relative z-10">
                      <UpiAppIcon id={selectedUpiApp} />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#15519D] bg-[#EBF3FC] border border-[#B3D4F5] px-3 py-1 rounded-full">
                      Processing Payment Request
                    </span>
                    <h3 className="text-xl font-black text-[#172033] mt-3">
                      Approve ₹{parseFloat(depositAmount || '0').toLocaleString('en-IN')} on {customUpiId || selectedUpiApp.toUpperCase()}
                    </h3>
                    <p className="text-[#64748B] text-xs mt-1.5 max-w-sm mx-auto font-medium leading-relaxed">
                      Please open your mobile payment app and approve the request from <strong>Univest Securities</strong>.
                    </p>
                  </div>

                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3.5 w-full max-w-xs flex flex-col items-center gap-1 shadow-2xs">
                    <div className="flex items-center gap-2 text-[#64748B] font-bold text-xs">
                      <Clock className="w-4 h-4 text-[#15519D]" /> Time Remaining:
                    </div>
                    <span className="text-2xl font-mono font-black text-[#15519D]">
                      {formatTimer(upiTimer)}
                    </span>
                  </div>

                  {/* Simulator Box */}
                  <div className="w-full bg-[#EBF3FC] border border-[#B3D4F5] rounded-2xl p-4 flex flex-col gap-2.5 text-left">
                    <span className="text-xs font-black text-[#15519D]">Demo Instant Simulator</span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSimulateDepositApproval}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs transition cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve Deposit
                      </button>
                      <button
                        onClick={() => setDepositStep(1)}
                        className="px-4 py-2.5 bg-white border border-[#E2E8F0] text-slate-700 rounded-xl font-bold text-xs transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── DEPOSIT STEP 5: SUCCESS CONFIRMATION ── */}
              {depositStep === 5 && (
                <div className="py-8 px-6 flex flex-col items-center justify-center text-center gap-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#172033]">Deposit Confirmed!</h3>
                    <p className="text-[#64748B] text-sm mt-1 font-medium">
                      ₹{parseFloat(depositAmount).toLocaleString('en-IN')} added to your trading wallet.
                    </p>
                  </div>

                  <div className="w-full bg-white p-4 rounded-2xl border border-[#E2E8F0] text-xs flex flex-col gap-2 font-medium text-[#64748B] shadow-2xs text-left">
                    <div className="flex justify-between">
                      <span>Transaction Reference:</span>
                      <span className="font-mono font-bold text-[#172033]">{lastDepositDetails?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="font-bold text-[#172033]">{lastDepositDetails?.method}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#E2E8F0] pt-2 mt-1">
                      <span>New Wallet Balance:</span>
                      <span className="font-black text-emerald-600 text-sm">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleResetModal}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#104280] text-white rounded-2xl font-black text-sm transition shadow-md cursor-pointer mt-2"
                  >
                    Done & Return to Dashboard
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: WITHDRAW MONEY MULTI-STEP FLOW                                    */}
          {/* ========================================================================= */}
          {activeTab === 'withdraw' && (
            <div className="p-6 flex flex-col gap-5 max-h-[520px] overflow-y-auto">

              {/* WITHDRAW STEP INDICATOR */}
              <div className="flex items-center justify-between px-2 text-[11px] font-bold text-slate-400 border-b border-[#E2E8F0] pb-3">
                <span className={withdrawStep >= 1 ? 'text-[#15519D] font-black' : ''}>1. Amount</span>
                <span>•</span>
                <span className={withdrawStep >= 2 ? 'text-[#15519D] font-black' : ''}>2. Bank</span>
                <span>•</span>
                <span className={withdrawStep >= 3 ? 'text-[#15519D] font-black' : ''}>3. 2FA Security</span>
                <span>•</span>
                <span className={withdrawStep >= 4 ? 'text-[#15519D] font-black' : ''}>4. Processing</span>
              </div>

              {/* ── WITHDRAW STEP 1: AMOUNT SELECTION ── */}
              {withdrawStep === 1 && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-[#64748B] flex items-center justify-between">
                      <span>Withdrawal Amount (₹)</span>
                      <span className="text-[10px] text-slate-400">Max Withdrawable: ₹{withdrawableBalance.toLocaleString('en-IN')}</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-2xl font-black text-[#172033]">₹</span>
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="0"
                        className="w-full pl-10 pr-4 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] focus:border-[#15519D] focus:bg-white rounded-2xl text-2xl font-black text-[#172033] outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Percentage Chips */}
                  <div className="flex gap-2">
                    {[25, 50, 75, 100].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => {
                          const val = Math.floor((withdrawableBalance * pct) / 100);
                          setWithdrawAmount(val.toString());
                        }}
                        className="flex-1 py-2 bg-white border border-[#E2E8F0] hover:bg-[#EBF3FC] hover:text-[#15519D] rounded-xl text-xs font-bold text-[#172033] transition cursor-pointer"
                      >
                        {pct === 100 ? '100% (Max)' : `${pct}%`}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleProceedWithdrawStep1}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#104280] text-white rounded-2xl font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Continue to Bank Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── WITHDRAW STEP 2: BANK SELECTION ── */}
              {withdrawStep === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <button onClick={() => setWithdrawStep(1)} className="text-xs font-bold text-[#15519D] flex items-center gap-1 cursor-pointer">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <span className="text-xs font-black text-[#172033]">Withdrawing ₹{parseFloat(withdrawAmount || '0').toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-[#64748B]">Select Destination Bank Account</label>
                    
                    {[
                      { id: 'HDFC Bank (A/c •••• 4892)', name: 'HDFC Bank Ltd', ac: 'A/c •••••• 4892', ifsc: 'HDFC0000240', primary: true },
                      { id: 'ICICI Bank (A/c •••• 1094)', name: 'ICICI Bank Ltd', ac: 'A/c •••••• 1094', ifsc: 'ICIC0000109', primary: false }
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedWithdrawBank(b.id)}
                        className={`p-4 rounded-2xl border text-left flex items-start justify-between transition cursor-pointer ${
                          selectedWithdrawBank === b.id
                            ? 'border-[#15519D] bg-[#EBF3FC] shadow-xs'
                            : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <BankLogo name={b.name} isSelected={selectedWithdrawBank === b.id} />
                          <div>
                            <span className="text-sm font-black text-[#172033] block">{b.name}</span>
                            <span className="text-xs text-[#64748B] font-medium block">{b.ac} • IFSC {b.ifsc}</span>
                          </div>
                        </div>
                        {b.primary && (
                          <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">PRIMARY</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleProceedWithdrawStep2}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#104280] text-white rounded-2xl font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Proceed to Security 2FA</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* ── WITHDRAW STEP 3: SECURITY 2FA PIN ── */}
              {withdrawStep === 3 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <button onClick={() => setWithdrawStep(2)} className="text-xs font-bold text-[#15519D] flex items-center gap-1 cursor-pointer">
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#EBF3FC] text-[#15519D] flex items-center justify-center">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-[#172033]">Transaction Security PIN</h4>
                      <p className="text-xs text-[#64748B] mt-0.5">Enter your 4-digit security PIN to authorize payout</p>
                    </div>

                    <input
                      type="password"
                      maxLength={4}
                      placeholder="••••"
                      value={securityPin}
                      onChange={(e) => setSecurityPin(e.target.value)}
                      className="w-40 text-center tracking-[1em] text-2xl font-black py-3 bg-white border border-[#E2E8F0] focus:border-[#15519D] rounded-2xl outline-none"
                    />
                  </div>

                  {/* Bank Credit Timeline Info Notice */}
                  <div className="p-3.5 bg-[#EBF3FC] border border-[#B3D4F5] rounded-2xl flex items-start gap-3 text-left">
                    <Clock className="w-4.5 h-4.5 text-[#15519D] shrink-0 mt-0.5" />
                    <div className="text-xs text-[#172033]">
                      <span className="font-black text-[#15519D] block">Expected Settlement Timeline</span>
                      <span className="font-medium text-[#64748B] block mt-0.5 leading-relaxed">
                        Funds will credit to your account via IMPS within <strong>15 minutes to 2 hours</strong>. Transfers after 5:00 PM settle by 9:00 AM next working day.
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmWithdrawalPin}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#104280] text-white rounded-2xl font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Authorize Withdrawal of ₹{parseFloat(withdrawAmount || '0').toLocaleString('en-IN')}</span>
                  </button>
                </div>
              )}

              {/* ── WITHDRAW STEP 4: PROCESSING PAYOUT ── */}
              {withdrawStep === 4 && (
                <div className="py-8 px-4 flex flex-col items-center justify-center text-center gap-5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <div className="w-16 h-16 rounded-full bg-[#15519D] text-white flex items-center justify-center shadow-lg animate-spin">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#172033]">Initiating IMPS Payout...</h3>
                    <p className="text-[#64748B] text-xs mt-1.5 max-w-sm mx-auto font-medium">
                      Communicating with {selectedWithdrawBank}. Please wait while we process the transfer.
                    </p>
                  </div>
                  <div className="w-full bg-white p-3.5 rounded-2xl border border-[#E2E8F0] text-xs font-medium text-[#64748B] flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-[#15519D]" />
                    <span>Estimated Settlement Time: <strong>15 - 120 minutes</strong></span>
                  </div>
                </div>
              )}

              {/* ── WITHDRAW STEP 5: SUCCESS CONFIRMATION ── */}
              {withdrawStep === 5 && (
                <div className="py-8 px-6 flex flex-col items-center justify-center text-center gap-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#172033]">Withdrawal Requested!</h3>
                    <p className="text-[#64748B] text-sm mt-1 font-medium">
                      ₹{parseFloat(withdrawAmount).toLocaleString('en-IN')} is being transferred to your bank account.
                    </p>
                  </div>

                  <div className="w-full bg-white p-4 rounded-2xl border border-[#E2E8F0] text-xs flex flex-col gap-2 font-medium text-[#64748B] shadow-2xs text-left">
                    <div className="flex justify-between">
                      <span>Payout Reference:</span>
                      <span className="font-mono font-bold text-[#172033]">{lastWithdrawDetails?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Destination Account:</span>
                      <span className="font-bold text-[#172033]">{lastWithdrawDetails?.bank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Credit Timeline:</span>
                      <span className="font-bold text-emerald-600">15 mins – 2 hours (IMPS)</span>
                    </div>
                  </div>

                  {/* Highlighted Bank Settlement Notice */}
                  <div className="w-full bg-[#EBF3FC] border border-[#B3D4F5] p-4 rounded-2xl text-left flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-black text-[#15519D]">
                      <Clock className="w-4 h-4 text-[#15519D]" /> Bank Settlement SLA & Timeline
                    </div>
                    <div className="text-xs text-[#172033] font-medium leading-relaxed">
                      Your withdrawal request has been authorized and dispatched to <strong>{lastWithdrawDetails?.bank || selectedWithdrawBank}</strong>.
                      <ul className="mt-2 space-y-1.5 text-[11px] text-[#64748B]">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span><strong>IMPS Transfer:</strong> Usually credits within <strong>15 to 120 minutes</strong>.</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#15519D] shrink-0" />
                          <span><strong>After 5:00 PM / Bank Holidays:</strong> Credits next working day morning by <strong>9:00 AM</strong>.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={handleResetModal}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#104280] text-white rounded-2xl font-black text-sm transition shadow-md cursor-pointer mt-2"
                  >
                    Done & Return to Dashboard
                  </button>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: TRANSACTION HISTORY LIST                                          */}
          {/* ========================================================================= */}
          {activeTab === 'history' && (
            <div className="p-6 flex flex-col gap-4 max-h-[460px] overflow-y-auto">
              <h3 className="font-black text-sm text-[#172033]">Recent Fund Activities</h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { id: 'UNI-90821', date: 'Today, 10:45 AM', amount: '+₹25,000', method: 'Deposit (UPI)', status: 'Success', isPos: true },
                  { id: 'WTH-44819', date: 'Yesterday, 04:15 PM', amount: '-₹10,000', method: 'Withdrawal (HDFC Bank)', status: 'Success', isPos: false },
                  { id: 'UNI-88412', date: 'July 18, 2026', amount: '+₹50,000', method: 'Deposit (NetBanking)', status: 'Success', isPos: true },
                  { id: 'UNI-76120', date: 'July 10, 2026', amount: '+₹1,00,000', method: 'Deposit (NEFT)', status: 'Success', isPos: true },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-[#E2E8F0] rounded-2xl flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${item.isPos ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-[#15519D]'}`}>
                        {item.isPos ? <Banknote className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className={`font-black text-sm ${item.isPos ? 'text-emerald-600' : 'text-slate-900'}`}>{item.amount}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{item.method} • {item.date}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddFundsModal;
