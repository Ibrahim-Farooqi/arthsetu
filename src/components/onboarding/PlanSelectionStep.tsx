import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles, ShieldCheck, Zap, Coins, X, CreditCard, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export interface SelectedPlanInfo {
  tier: 'Free' | 'Pro' | 'Pro Gold';
  price: string;
  billingFrequency: 'monthly' | 'annual';
}

interface PlanSelectionStepProps {
  onSelectPlan: (plan: SelectedPlanInfo) => void;
}

export const PlanSelectionStep: React.FC<PlanSelectionStepProps> = ({ onSelectPlan }) => {
  const [billingFrequency, setBillingFrequency] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<'Pro' | 'Pro Gold' | null>(null);

  const handleSelectFree = () => {
    onSelectPlan({
      tier: 'Free',
      price: '₹0',
      billingFrequency: 'monthly'
    });
  };

  const handleConfirmPurchase = () => {
    if (!selectedPlanForModal) return;
    toast.success(`Welcome to ArthSetu ${selectedPlanForModal}! Subscription active.`);
    const priceStr = selectedPlanForModal === 'Pro' 
      ? (billingFrequency === 'monthly' ? '₹499 / mo' : '₹3,999 / yr') 
      : (billingFrequency === 'monthly' ? '₹999 / mo' : '₹7,999 / yr');

    onSelectPlan({
      tier: selectedPlanForModal,
      price: priceStr,
      billingFrequency: billingFrequency
    });
    setSelectedPlanForModal(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col font-sans py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto w-full space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-black text-[#15519D] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Choose Your Experience
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#172033] tracking-tight">
            Choose your ArthSetu experience
          </h1>
          <p className="text-sm sm:text-base text-[#64748B] font-medium leading-relaxed">
            Start with the tools that fit the way you invest. Switch or upgrade anytime.
          </p>

          {/* BILLING FREQUENCY TOGGLE */}
          <div className="inline-flex items-center p-1 bg-[#E2E8F0]/60 rounded-full mt-4 border border-[#CBD5E1]">
            <button
              onClick={() => setBillingFrequency('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition cursor-pointer ${
                billingFrequency === 'monthly' ? 'bg-white text-[#172033] shadow-sm' : 'text-[#64748B]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingFrequency('annual')}
              className={`px-5 py-2 rounded-full text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                billingFrequency === 'annual' ? 'bg-white text-[#172033] shadow-sm' : 'text-[#64748B]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* PLAN CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* 1. FREE PLAN */}
          <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-7 flex flex-col justify-between shadow-xs hover:border-[#CBD5E1] transition">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider">ArthSetu Free</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#172033]">₹0</span>
                  <span className="text-xs text-[#64748B] font-bold">/ forever</span>
                </div>
                <p className="text-xs text-[#64748B] font-semibold">Explore the essentials of research and market intelligence.</p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                {[
                  "Market overview & discovery",
                  "Basic company research scorecards",
                  "Personalized watchlists",
                  "Live market news & updates",
                  "Basic ArthSetu View scores",
                  "Limited AI insights",
                  "Basic portfolio tracking"
                ].map(feat => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-[#172033] font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-auto">
              <button
                onClick={handleSelectFree}
                className="w-full py-3.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#172033] font-extrabold text-sm rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue with Free</span>
              </button>
            </div>
          </div>

          {/* 2. PRO PLAN */}
          <div className="bg-white rounded-[28px] border-2 border-[#15519D] p-7 flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#15519D] text-white px-4 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-[#15519D] uppercase tracking-wider">ArthSetu Pro</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#172033]">
                    {billingFrequency === 'monthly' ? '₹499' : '₹333'}
                  </span>
                  <span className="text-xs text-[#64748B] font-bold">/ month</span>
                </div>
                <p className="text-xs text-[#64748B] font-semibold">Go deeper with advanced fundamental & AI research.</p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                {[
                  "Everything in Free",
                  "Full AI-powered company analysis",
                  "Detailed fundamental & valuation scores",
                  "Growth, momentum & financial health scores",
                  "Risk analysis & debt health metrics",
                  "Deeper company event timelines",
                  "Advanced portfolio intelligence"
                ].map(feat => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-[#172033] font-medium">
                    <Check className="w-4 h-4 text-[#15519D] shrink-0 mt-0.5" />
                    <span className={feat.startsWith("Everything") ? "font-bold" : ""}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-auto">
              <button
                onClick={() => setSelectedPlanForModal('Pro')}
                className="w-full py-3.5 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-sm rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Choose Pro →</span>
              </button>
            </div>
          </div>

          {/* 3. PRO GOLD PLAN (INCLUDES INVESTMENT TOKENS ACCESS) */}
          <div className="bg-gradient-to-b from-[#123B63] to-[#15519D] text-white rounded-[28px] p-7 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-400 text-slate-950 px-4 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> Ultimate Intelligence
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">ArthSetu Pro Gold</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">
                    {billingFrequency === 'monthly' ? '₹999' : '₹666'}
                  </span>
                  <span className="text-xs text-blue-200 font-bold">/ month</span>
                </div>
                <p className="text-xs text-blue-100/80 font-semibold">Advanced intelligence & tokenized advisory access for serious investors.</p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/20">
                {[
                  "Everything in Pro",
                  "Investment Tokens Page Access (Get tokens to invest)",
                  "Exclusive analyst research & thesis reports",
                  "Pro Opportunity Radar & sector breakouts",
                  "Deeper decision intelligence",
                  "Premium curated stock collections",
                  "Priority support & concierge access"
                ].map(feat => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-blue-50 font-medium">
                    {feat.includes("Investment Tokens") ? (
                      <Coins className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    <span className={feat.includes("Tokens") ? "font-extrabold text-amber-300" : feat.startsWith("Everything") ? "font-bold" : ""}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-auto">
              <button
                onClick={() => setSelectedPlanForModal('Pro Gold')}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Choose Pro Gold →</span>
              </button>
            </div>
          </div>

        </div>

        {/* PLAN COMPARISON TABLE */}
        <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 space-y-6">
          <h3 className="text-xl font-black text-[#172033]">Plan Feature Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead>
                <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase tracking-wider font-extrabold">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4 text-center">Free (₹0)</th>
                  <th className="py-3 px-4 text-center">Pro (₹499/mo)</th>
                  <th className="py-3 px-4 text-center text-[#15519D]">Pro Gold (₹999/mo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {[
                  { feature: "Market Discovery & Watchlists", free: "✓", pro: "✓", gold: "✓" },
                  { feature: "Stock Research & Scorecards", free: "Basic", pro: "Advanced", gold: "Comprehensive" },
                  { feature: "AI Intelligence & Thesis", free: "Limited", pro: "Full Access", gold: "Priority AI Engine" },
                  { feature: "Portfolio Health & Tracking", free: "Basic", pro: "Advanced Analytics", gold: "Pro Intelligence" },
                  { feature: "Exclusive Analyst Research", free: "—", pro: "✓", gold: "✓" },
                  { feature: "Pro Opportunity Radar", free: "—", pro: "—", gold: "✓" },
                  { feature: "Investment Tokens Access (Tokens to Invest)", free: "—", pro: "—", gold: "✓ Included" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F8FAFC]">
                    <td className="py-3 px-4 font-bold text-[#172033]">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-[#64748B]">{row.free}</td>
                    <td className="py-3 px-4 text-center font-bold text-[#15519D]">{row.pro}</td>
                    <td className="py-3 px-4 text-center font-black text-amber-600">{row.gold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER DISCLOSURE */}
        <div className="text-center text-xs text-[#64748B] space-y-1 font-medium pb-4">
          <p>You can change or cancel your plan anytime inside Profile & Settings.</p>
          <p className="flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ArthSetu is an investment research & advisory intelligence platform.</span>
          </p>
        </div>

      </div>

      {/* SUBSCRIPTION CHECKOUT MODAL */}
      <AnimatePresence>
        {selectedPlanForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedPlanForModal(null)}
                className="absolute top-6 right-6 p-2 text-[#64748B] hover:text-[#172033] cursor-pointer rounded-full bg-[#F1F5F9]"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#15519D] text-xs font-black uppercase">
                  Checkout
                </span>
                <h3 className="text-2xl font-black text-[#172033]">
                  Unlock ArthSetu {selectedPlanForModal}
                </h3>
                <p className="text-xs text-[#64748B] font-semibold">
                  Complete subscription to activate your plan immediately.
                </p>
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-[#172033]">
                  <span>Selected Plan:</span>
                  <span className="text-[#15519D]">ArthSetu {selectedPlanForModal}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#64748B]">
                  <span>Billing Frequency:</span>
                  <span className="font-bold text-[#172033] capitalize">{billingFrequency}</span>
                </div>
                <div className="flex justify-between items-center text-base font-black text-[#172033] pt-2 border-t border-[#E2E8F0]">
                  <span>Total Amount:</span>
                  <span className="text-[#15519D]">
                    {selectedPlanForModal === 'Pro' 
                      ? (billingFrequency === 'monthly' ? '₹499' : '₹3,999')
                      : (billingFrequency === 'monthly' ? '₹999' : '₹7,999')}
                  </span>
                </div>
              </div>

              {selectedPlanForModal === 'Pro Gold' && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>Includes access to Investment Tokens page where you will receive tokens to invest.</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleConfirmPurchase}
                  className="w-full py-4 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay & Activate {selectedPlanForModal} →</span>
                </button>
                
                <p className="text-[11px] text-[#64748B] text-center font-medium flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  256-bit encrypted secure checkout. Instant activation.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanSelectionStep;
