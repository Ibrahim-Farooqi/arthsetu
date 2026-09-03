import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, ArrowRight, ArrowLeft, Check, User,
  Clock, CheckCircle2, Zap, Briefcase, GraduationCap, Building2, UserCheck, Edit3, Shield
} from 'lucide-react';
import toast from 'react-hot-toast';

export interface InvestorProfileState {
  fullName: string;
  employmentType: string;
  experienceLevel: string;
  goals: string[];
  horizon: string;
  riskTolerance: 'Conservative' | 'Balanced' | 'Growth' | 'Aggressive';
  preferredInvestments: string[];
  favoriteSectors: string[];
}

export const InvestorPersonalizationJourney: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Profile Form State
  const [profile, setProfile] = useState<InvestorProfileState>(() => {
    const saved = localStorage.getItem('univest_investor_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      fullName: 'Omar Khan',
      employmentType: 'Salaried Professional',
      experienceLevel: 'Intermediate',
      goals: ['Wealth Creation', 'Passive Income', 'Short-Term Swing Trading'],
      horizon: '3–5 Years',
      riskTolerance: 'Growth',
      preferredInvestments: ['Stocks', 'Mutual Funds', 'F&O Options', 'IPOs'],
      favoriteSectors: ['Technology', 'Banking', 'AI', 'Healthcare']
    };
  });

  const [isCompleted, setIsCompleted] = useState(false);

  // Auto-save to localStorage on step change
  useEffect(() => {
    localStorage.setItem('univest_investor_profile', JSON.stringify(profile));
  }, [profile]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
      toast.success('AI Investor Profile Generated!');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const toggleMultiSelect = (key: keyof InvestorProfileState, item: string) => {
    const currentList = (profile[key] as string[]) || [];
    if (currentList.includes(item)) {
      setProfile({ ...profile, [key]: currentList.filter(i => i !== item) });
    } else {
      setProfile({ ...profile, [key]: [...currentList, item] });
    }
  };

  // Q1: Employment Options
  const employmentOptions = [
    { label: 'Salaried Professional', desc: 'Earning regular income & corporate benefits', icon: <Briefcase className="w-4 h-4 text-emerald-600" /> },
    { label: 'Business Owner', desc: 'Managing enterprise & capital cashflow', icon: <Building2 className="w-4 h-4 text-purple-600" /> },
    { label: 'Freelancer / Consultant', desc: 'Independent contractor with flexible income', icon: <Zap className="w-4 h-4 text-amber-600" /> },
    { label: 'Student / Homemaker', desc: 'Building early wealth & financial literacy', icon: <GraduationCap className="w-4 h-4 text-primary" /> },
    { label: 'Retired', desc: 'Focusing on capital preservation & dividend yield', icon: <UserCheck className="w-4 h-4 text-danger" /> },
    { label: 'Other', desc: 'Unique background profile', icon: <User className="w-4 h-4 text-slate-600" /> }
  ];

  // Q2: Experience Options
  const experienceOptions = [
    { label: "Beginner", desc: "First time investing. Need guided AI advice & blue-chip focus.", badge: "New Investor" },
    { label: "Intermediate", desc: "Have bought stocks or SIPs. Understand basic market mechanics.", badge: "Growing" },
    { label: "Advanced", desc: "Active regular investor in equity, ETFs, and mutual funds.", badge: "Experienced" },
    { label: "Expert / Pro Trader", desc: "Experienced trader doing F&O, breakouts, and technical setups.", badge: "Pro" }
  ];

  // Q3: Investment Goals
  const goalOptions = [
    'Wealth Creation', 'Passive Income', 'Short-Term Swing Trading',
    'Futures & Options Alpha', 'Retirement Planning', 'Tax Saving (ELSS)'
  ];

  // Q4: Horizon Options
  const horizonOptions = [
    { label: 'Short-Term (< 1 Year)', desc: 'Focus on tactical swing calls & quick momentum setups.' },
    { label: 'Medium-Term (1–3 Years)', desc: 'Balanced growth targeting mid-cap breakouts & sector trends.' },
    { label: 'Long-Term (3–5 Years)', desc: 'Compounding wealth with high-conviction quality stocks.' },
    { label: 'Wealth Compounder (5+ Years)', desc: 'Generational wealth creation across diversified portfolios.' }
  ];

  // Q5: Risk Options
  const riskOptions = [
    { type: 'Conservative', desc: 'Focus on capital preservation with minimal volatility. Prefer Large Caps & Debt.', color: 'border-primary-light bg-primary-light/40 text-primary-dark' },
    { type: 'Balanced', desc: 'Moderate risk for consistent multi-asset growth across equities & bonds.', color: 'border-emerald-200 bg-emerald-50/40 text-emerald-900' },
    { type: 'Growth', desc: 'Higher risk tolerance for outperforming market indices via Tech & Growth Equities.', color: 'border-amber-200 bg-amber-50/40 text-amber-900' },
    { type: 'Aggressive', desc: 'Maximum growth potential accepting high volatility, Small Caps, & Momentum F&O.', color: 'border-rose-200 bg-rose-50/40 text-rose-900' }
  ];

  // Q6: Asset & Sector Options
  const investmentOptions = ['Stocks', 'F&O Options', 'Mutual Funds', 'IPOs', 'Commodities', 'ETFs'];
  const sectorOptions = ['Technology', 'Banking', 'AI & Data', 'Healthcare', 'Energy', 'Automobiles', 'Defence'];

  // Compute AI Archetype Summary
  const getAiArchetype = () => {
    if (profile.riskTolerance === 'Aggressive') return 'Aggressive Momentum Trader';
    if (profile.riskTolerance === 'Growth') return 'Growth-Oriented Long-Term Investor';
    if (profile.riskTolerance === 'Balanced') return 'Balanced Wealth Accumulator';
    return 'Conservative Capital Preserver';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between p-4 sm:p-8 font-sans text-slate-800">
      
      {/* TOP HEADER & LIVE PROGRESS BAR */}
      <header className="max-w-3xl w-full mx-auto flex items-center justify-between py-3 px-5 bg-white border border-[#E2E8F0] rounded-2xl shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary font-black text-white text-base flex items-center justify-center shadow-md">
            U
          </div>
          <div>
            <span className="font-black text-base tracking-tight text-[#172033] block leading-none">UNIVEST</span>
            <span className="text-[10px] text-slate-500 font-bold">Investor Advisory Profile</span>
          </div>
        </div>

        {!isCompleted && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-primary bg-primary-light px-2.5 py-1 rounded-lg border border-[#E2E8F0]">
              Question {currentStep} of {totalSteps}
            </span>

            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="p-1.5 text-slate-500 hover:text-[#172033] hover:bg-slate-100 rounded-lg transition cursor-pointer"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </header>

      {/* TOP PROGRESS TRACKER INDICATOR */}
      {!isCompleted && (
        <div className="max-w-3xl w-full mx-auto my-3">
          <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-primary to-primary h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* MAIN CONVERSATIONAL STEP CONTAINER */}
      <main className="flex-1 max-w-xl w-full mx-auto flex flex-col justify-center my-3">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-md"
            >
              {/* QUESTION 1: EMPLOYMENT */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Question 1 of 6 · Background</span>
                    <h2 className="text-lg font-bold text-[#172033] mt-0.5">What is your employment status?</h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">Helps tailor capital allocation & risk capacity.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {employmentOptions.map((opt) => {
                      const isSelected = profile.employmentType === opt.label;
                      return (
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          key={opt.label}
                          onClick={() => setProfile({ ...profile, employmentType: opt.label })}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
                            isSelected
                              ? 'border-primary bg-primary-light/60 shadow-xs ring-1 ring-primary/30'
                              : 'border-[#E2E8F0] bg-white hover:border-primary-light hover:bg-slate-50'
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-white shadow-xs border border-slate-100 shrink-0">
                            {opt.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-[#172033]">{opt.label}</h4>
                            <p className="text-[10px] text-slate-500 font-normal mt-0.5 leading-snug">{opt.desc}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <span>Next: Market Experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* QUESTION 2: EXPERIENCE LEVEL */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Question 2 of 6 · Experience</span>
                    <h2 className="text-lg font-bold text-[#172033] mt-0.5">How experienced are you with investing?</h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">Calibrates technical research complexity & advisory signals.</p>
                  </div>

                  <div className="space-y-2.5">
                    {experienceOptions.map((opt) => {
                      const isSelected = profile.experienceLevel === opt.label;
                      return (
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          key={opt.label}
                          onClick={() => setProfile({ ...profile, experienceLevel: opt.label })}
                          className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-primary bg-primary-light/60 shadow-xs ring-1 ring-primary/30'
                              : 'border-[#E2E8F0] bg-white hover:border-primary-light hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-xs text-[#172033]">{opt.label}</h4>
                              <span className="text-[9px] font-bold bg-primary-light text-primary px-2 py-0.5 rounded-md">{opt.badge}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-normal mt-0.5">{opt.desc}</p>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                        </motion.div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <span>Next: Investment Goals</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* QUESTION 3: INVESTMENT GOALS */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Question 3 of 6 · Objectives</span>
                    <h2 className="text-lg font-bold text-[#172033] mt-0.5">What are your primary investment goals?</h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">Select all that apply to guide our advisory engines.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {goalOptions.map((g) => {
                      const isSelected = profile.goals.includes(g);
                      return (
                        <button
                          key={g}
                          onClick={() => toggleMultiSelect('goals', g)}
                          className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-left flex items-center justify-between ${
                            isSelected
                              ? 'border-primary bg-primary text-white shadow-xs'
                              : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{g}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <span>Next: Time Horizon</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* QUESTION 4: TIME HORIZON */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Question 4 of 6 · Time Horizon</span>
                    <h2 className="text-lg font-bold text-[#172033] mt-0.5">What is your preferred investment horizon?</h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">Determines holding duration & compounding strategy.</p>
                  </div>

                  <div className="space-y-2.5">
                    {horizonOptions.map((hz) => {
                      const isSelected = profile.horizon === hz.label;
                      return (
                        <button
                          key={hz.label}
                          onClick={() => setProfile({ ...profile, horizon: hz.label })}
                          className={`w-full p-3.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-primary bg-primary-light text-primary-dark ring-1 ring-primary/30'
                              : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{hz.label}</span>
                            <span className="text-[10px] text-slate-500 font-normal">{hz.desc}</span>
                          </div>
                          <Clock className={`w-4 h-4 shrink-0 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <span>Next: Risk Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* QUESTION 5: RISK TOLERANCE */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Question 5 of 6 · Risk Comfort</span>
                    <h2 className="text-lg font-bold text-[#172033] mt-0.5">What is your risk tolerance?</h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">Select your drawdown comfort boundary.</p>
                  </div>

                  <div className="space-y-2.5">
                    {riskOptions.map((rk) => {
                      const isSelected = profile.riskTolerance === rk.type;
                      return (
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          key={rk.type}
                          onClick={() => setProfile({ ...profile, riskTolerance: rk.type as any })}
                          className={`p-3.5 rounded-xl border transition cursor-pointer ${
                            isSelected
                              ? `${rk.color} border-2 shadow-xs`
                              : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-0.5">
                            <h4 className="font-bold text-xs text-[#172033]">{rk.type} Risk</h4>
                            {isSelected && <Check className="w-3.5 h-3.5 text-primary stroke-[3]" />}
                          </div>
                          <p className="text-[11px] text-slate-600 font-normal leading-relaxed">{rk.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <span>Next: Preferred Assets & Sectors</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* QUESTION 6: PREFERRED ASSETS & SECTORS */}
              {currentStep === 6 && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Question 6 of 6 · Advisory Preferences</span>
                    <h2 className="text-lg font-bold text-[#172033] mt-0.5">Which assets & sectors interest you?</h2>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">Select items to tailor your advisory calls and watchlist recommendations.</p>
                  </div>

                  {/* Asset Classes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Asset Categories</label>
                    <div className="grid grid-cols-3 gap-2">
                      {investmentOptions.map((inv) => {
                        const isSelected = profile.preferredInvestments.includes(inv);
                        return (
                          <button
                            key={inv}
                            onClick={() => toggleMultiSelect('preferredInvestments', inv)}
                            className={`p-2.5 rounded-lg border text-xs font-bold transition cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'border-primary bg-primary text-white shadow-xs'
                                : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{inv}</span>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Favorite Sectors */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Favorite Sectors</label>
                    <div className="flex flex-wrap gap-1.5">
                      {sectorOptions.map((sec) => {
                        const isSelected = profile.favoriteSectors.includes(sec);
                        return (
                          <button
                            key={sec}
                            onClick={() => toggleMultiSelect('favoriteSectors', sec)}
                            className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'border-primary bg-primary text-white shadow-xs'
                                : 'border-[#E2E8F0] bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{sec}</span>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Finish Setup & Generate AI Profile</span>
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* SUCCESS SCREEN: AI-GENERATED INVESTOR PROFILE SUMMARY CARD */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-6"
            >
              <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl flex items-center justify-center shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Setup Complete · AI Profile Trained
                </span>
                <h1 className="text-xl font-bold text-[#172033] mt-2">
                  Welcome aboard, {profile.fullName}!
                </h1>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Your personalized stock advisory workspace is calibrated and ready.
                </p>
              </div>

              {/* AI GENERATED INVESTOR SUMMARY CARD */}
              <div className="bg-gradient-to-br from-[#172033] to-[#1E293B] text-white rounded-xl p-5 text-left shadow-md space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-1.5 text-[#64748B] font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> AI Generated Investor Profile
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 bg-white/10 px-2 py-0.5 rounded">Active Archetype</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-normal block text-[10px] uppercase">Archetype</span>
                    <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{getAiArchetype()}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-normal block text-[10px] uppercase">Risk Profile</span>
                    <span className="text-xs font-bold text-blue-300 mt-0.5 block">{profile.riskTolerance} Risk</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-normal block text-[10px] uppercase">Primary Goals</span>
                    <span className="text-[11px] font-bold text-white mt-0.5 block">{profile.goals.slice(0, 2).join(' & ')}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-normal block text-[10px] uppercase">Top Sectors</span>
                    <span className="text-[11px] font-bold text-white mt-0.5 block">{profile.favoriteSectors.slice(0, 3).join(', ')}</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-white/10 text-[10px] text-slate-300 font-normal leading-relaxed">
                  "Your AI Advisors have been calibrated with your preferred sectors, risk boundary, and time horizon. You will now receive customized research signals and stock setups."
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Go to Personalized Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Answers
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="max-w-3xl w-full mx-auto text-center text-[10px] font-normal text-slate-400 py-3 border-t border-[#E2E8F0]">
        Univest Stock Advisory Platform · 6-Step Investor Personalization · Auto-saved to Workspace
      </footer>
    </div>
  );
};

export default InvestorPersonalizationJourney;
