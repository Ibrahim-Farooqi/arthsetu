import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Sparkles, ShieldCheck, ArrowRight, X, Info } from 'lucide-react';
import toast from 'react-hot-toast';

interface LabCapitalSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCapital: (amount: number) => void;
  initialAmount?: number;
}

export const LabCapitalSetupModal: React.FC<LabCapitalSetupModalProps> = ({
  isOpen,
  onClose,
  onConfirmCapital,
  initialAmount = 150000
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [customInputValue, setCustomInputValue] = useState<string>(initialAmount.toString());

  if (!isOpen) return null;

  const quickPresets = [
    { label: '₹5K', value: 5000 },
    { label: '₹10K', value: 10000 },
    { label: '₹25K', value: 25000 },
    { label: '₹50K', value: 50000 },
    { label: '₹1L', value: 100000 },
    { label: '₹2L', value: 200000 },
    { label: '₹5L', value: 500000 },
    { label: '₹10L', value: 1000000 },
  ];

  const handleSelectPreset = (val: number) => {
    setSelectedAmount(val);
    setCustomInputValue(val.toString());
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    setCustomInputValue(raw);
    const numeric = parseInt(raw, 10);
    if (!isNaN(numeric)) {
      setSelectedAmount(numeric);
    }
  };

  const handleConfirm = () => {
    if (selectedAmount < 5000) {
      toast.error('Minimum virtual capital is ₹5,000 Tokens.');
      return;
    }
    if (selectedAmount > 5000000) {
      toast.error('Maximum virtual capital is ₹50,00,000 Tokens.');
      return;
    }

    onConfirmCapital(selectedAmount);
    toast.success(`Started Investment Lab with ₹${selectedAmount.toLocaleString('en-IN')} Tokens!`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white w-full max-w-lg rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-2xl relative"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-[#64748B] hover:text-[#172033] cursor-pointer rounded-full bg-[#F1F5F9]"
          >
            <X className="w-4 h-4" />
          </button>

          {/* ICON & TITLE */}
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#15519D] to-[#123B63] flex items-center justify-center text-amber-400 shadow-md">
              <Coins className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#15519D] text-xs font-black uppercase">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Premium Simulation Setup
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#172033] tracking-tight">
                Welcome to Investment Lab
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">
                Test your investment ideas with virtual capital, evaluate thesis quality, and learn from every decision.
              </p>
            </div>
          </div>

          {/* CAPITAL SELECTION */}
          <div className="space-y-4 pt-2 border-t border-[#E2E8F0]">
            <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider">
              How much virtual capital do you want to test?
            </label>

            {/* QUICK PRESETS */}
            <div className="grid grid-cols-4 gap-2">
              {quickPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleSelectPreset(preset.value)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold transition cursor-pointer ${
                    selectedAmount === preset.value
                      ? 'bg-[#15519D] border-[#15519D] text-white shadow-md'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#172033] hover:border-[#CBD5E1]'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* CUSTOM ENTRY INPUT BOX */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#64748B]">
                Or enter exact amount (matching your real capital):
              </span>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-base font-black text-[#15519D]">₹</span>
                <input
                  type="text"
                  value={customInputValue ? parseInt(customInputValue, 10).toLocaleString('en-IN') : ''}
                  onChange={handleCustomInputChange}
                  placeholder="e.g. 1,50,000"
                  className="w-full pl-9 pr-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 rounded-xl text-base font-black text-[#172033] outline-none transition"
                />
              </div>
            </div>

            {/* DISCLAIMER */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-start gap-2.5 text-xs text-[#15519D] font-medium leading-relaxed">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Virtual Simulation Note:</strong> This is virtual capital for learning and decision intelligence. It has no cash value and cannot be withdrawn.
              </span>
            </div>
          </div>

          {/* CONFIRM BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-4 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Start Investment Lab (₹{selectedAmount.toLocaleString('en-IN')})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LabCapitalSetupModal;
