import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, CheckCircle2, Sparkles, Gem, ShieldCheck, 
  ArrowRight, Award, Zap, ChevronRight
} from 'lucide-react';

interface PremiumPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumPricingModal: React.FC<PremiumPricingModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 rounded-2xl shadow-lg">
                <Gem className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl font-black text-white">ArthSetu Premium Memberships</h2>
                <p className="text-xs text-slate-300">
                  Choose the research intelligence strategy built for your investing goals.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-8 overflow-y-auto space-y-8 bg-slate-50/50">
            {/* Value Proposition Hero Banner */}
            <div className="p-6 bg-gradient-to-r from-[#123B63] to-[#15519D] rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-extrabold uppercase tracking-wider text-blue-200">
                  Institutional Intelligence Access
                </span>
                <h3 className="text-2xl font-black">Invest with Complete Thesis Clarity</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  ArthSetu replaces market noise with high-conviction research, transparent performance tracking, and live opportunity radar signals.
                </p>
              </div>

              <div className="text-center md:text-right bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex-shrink-0">
                <div className="text-xs font-bold text-blue-200 uppercase">30-Day Money Back Guarantee</div>
                <div className="text-2xl font-black text-white mt-1">100% Transparent</div>
                <div className="text-[10px] text-slate-300">Cancel anytime with 1 click</div>
              </div>
            </div>

            {/* Pricing Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* TIER 1: ARTHSETU PICKS */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-all">
                <div>
                  <div className="text-xs font-extrabold text-[#15519D] uppercase tracking-wider">Individual Ideas</div>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">ArthSetu Picks</h4>
                  <p className="text-xs text-slate-500 mt-1">For investors focused on high-conviction stock ideas.</p>

                  <div className="mt-4 pb-4 border-b border-slate-100">
                    <span className="text-3xl font-black text-slate-900">₹999</span>
                    <span className="text-xs text-slate-500 font-medium"> / month</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400">What You Get</span>
                      <ul className="mt-2 space-y-2 text-xs text-slate-700 font-semibold">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          High-Conviction Stock Picks
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          Growth, Value & Momentum Picks
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          Full Research Thesis Reports
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          Timestamped Research Journeys
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-extrabold uppercase text-[#15519D]">Why It Matters</span>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        Never buy a stock without knowing exactly why, when to enter, and what catalysts drive growth.
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400">Who It Is For</span>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        Active self-directed investors building an equity stock portfolio.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs rounded-2xl transition-colors"
                >
                  Start Picks Access
                </button>
              </div>

              {/* TIER 2: ARTHSETU COLLECTIONS */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-blue-200 transition-all">
                <div>
                  <div className="text-xs font-extrabold text-[#15519D] uppercase tracking-wider">Curated Portfolios</div>
                  <h4 className="text-2xl font-black text-slate-900 mt-1">ArthSetu Collections</h4>
                  <p className="text-xs text-slate-500 mt-1">For investors seeking thematic strategies.</p>

                  <div className="mt-4 pb-4 border-b border-slate-100">
                    <span className="text-3xl font-black text-slate-900">₹1,499</span>
                    <span className="text-xs text-slate-500 font-medium"> / month</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400">What You Get</span>
                      <ul className="mt-2 space-y-2 text-xs text-slate-700 font-semibold">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          5+ Curated Investment Collections
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          Goal-based & Thematic Strategies
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          Quarterly Rebalancing Alerts
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          Complete Sector Exposure Breakdown
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-extrabold uppercase text-[#15519D]">Why It Matters</span>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        Achieve structured diversification without needing to manage individual stock allocations daily.
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400">Who It Is For</span>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        Long-term compounders who prefer automated strategy execution.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs rounded-2xl transition-colors"
                >
                  Start Collections Access
                </button>
              </div>

              {/* TIER 3: ARTHSETU PRO GOLD (BEST VALUE) */}
              <div className="bg-gradient-to-b from-slate-900 via-[#123B63] to-[#15519D] rounded-3xl p-6 shadow-2xl text-white flex flex-col justify-between relative overflow-hidden ring-4 ring-amber-400/30">
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                  Most Popular
                </div>

                <div>
                  <div className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">All-Access Membership</div>
                  <h4 className="text-2xl font-black text-white mt-1">ArthSetu Pro Gold</h4>
                  <p className="text-xs text-slate-200 mt-1">Complete investment intelligence suite.</p>

                  <div className="mt-4 pb-4 border-b border-white/10">
                    <span className="text-3xl font-black text-white">₹2,499</span>
                    <span className="text-xs text-slate-300 font-medium"> / month</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-amber-300">What You Get</span>
                      <ul className="mt-2 space-y-2 text-xs text-slate-100 font-semibold">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          Everything in Picks + Collections
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          Opportunity Radar Live Signals
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          Unrestricted AI Copilot Intelligence
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                          Advanced Multivariable Alerts
                        </li>
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <span className="text-[10px] font-extrabold uppercase text-amber-300">Why It Matters</span>
                      <p className="text-xs text-slate-200 font-medium mt-1">
                        Unlocks institutional-grade research tools, real-time risk alerts, and direct AI thesis synthesis.
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] font-extrabold uppercase text-slate-300">Who It Is For</span>
                      <p className="text-xs text-slate-200 font-medium mt-1">
                        Serious investors who want complete market edge & clarity.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all"
                >
                  Join ArthSetu Pro Gold
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PremiumPricingModal;
