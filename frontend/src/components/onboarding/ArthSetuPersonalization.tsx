import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Check, Edit2
} from 'lucide-react';

export interface PersonalizationAnswers {
  familiarity: string;
  interests: string[];
  goals: string[];
  approach: string;
  horizon: string;
}

interface ArthSetuPersonalizationProps {
  onComplete: (answers: PersonalizationAnswers) => void;
}

export const ArthSetuPersonalization: React.FC<ArthSetuPersonalizationProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<PersonalizationAnswers>({
    familiarity: "I'm learning",
    interests: ['Long-Term Growth', 'Growth Companies'],
    goals: ['Discover interesting companies', 'Research companies', 'Find investment opportunities'],
    approach: 'I want a mix of both',
    horizon: 'Long Term (3-5 years)'
  });

  const [isSummaryView, setIsSummaryView] = useState<boolean>(false);

  // Q1 Options
  const familiarityOptions = [
    { label: "I'm completely new", desc: "I'm just starting to understand stocks." },
    { label: "I'm learning", desc: "I know the basics and want to learn more." },
    { label: "I'm experienced", desc: "I regularly research and track stocks." },
    { label: "I'm advanced", desc: "I actively analyze markets and companies." }
  ];

  // Q2 Options
  const interestOptions = [
    { label: "Long-Term Growth", desc: "Companies with strong long-term compounding potential." },
    { label: "Value Opportunities", desc: "Stocks trading below intrinsic value." },
    { label: "Growth Companies", desc: "Businesses with accelerating revenue & earnings." },
    { label: "Dividend & Stability", desc: "Established companies with stable cash yields." },
    { label: "Market Opportunities", desc: "Tactical developments and catalysts." },
    { label: "Sector Trends", desc: "Understanding industry momentum shifts." }
  ];

  // Q3 Options
  const goalOptions = [
    "Discover interesting companies",
    "Understand stock movements",
    "Research company balance sheets",
    "Track my watchlist",
    "Analyze portfolio health",
    "Find investment opportunities",
    "Understand risk metrics",
    "Improve investment discipline"
  ];

  // Q4 Options
  const approachOptions = [
    { label: "I research everything myself", desc: "I prefer doing my own independent analysis." },
    { label: "I prefer guided research", desc: "I want expert-backed insights to support decisions." },
    { label: "I want a mix of both", desc: "I like researching but want AI guidance too." },
    { label: "I'm still figuring it out", desc: "Help me understand where to start." }
  ];

  // Q5 Options
  const horizonOptions = [
    { label: "Short Term", desc: "Less than 1 year" },
    { label: "Medium Term", desc: "1–3 years" },
    { label: "Long Term (3-5 years)", desc: "3–5 years" },
    { label: "Very Long Term (5+ years)", desc: "5+ years" }
  ];

  const toggleInterest = (item: string) => {
    setAnswers(prev => {
      const exists = prev.interests.includes(item);
      return {
        ...prev,
        interests: exists ? prev.interests.filter(i => i !== item) : [...prev.interests, item]
      };
    });
  };

  const toggleGoal = (item: string) => {
    setAnswers(prev => {
      const exists = prev.goals.includes(item);
      return {
        ...prev,
        goals: exists ? prev.goals.filter(g => g !== item) : [...prev.goals, item]
      };
    });
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      setIsSummaryView(true);
    }
  };

  const handleBack = () => {
    if (isSummaryView) {
      setIsSummaryView(false);
      setStep(5);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFinalSubmit = () => {
    onComplete(answers);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#172033] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* 1. TOP GLOBAL HEADER */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-[#E2E8F0]/80 shrink-0">
        
        {/* TOP LEFT BRANDING */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#15519D] to-[#123B63] text-white font-black text-lg flex items-center justify-center shadow-sm">
            A
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#172033] tracking-tight leading-none">
              ARTHSETU
            </h1>
            <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest block mt-0.5">
              PERSONALIZATION
            </span>
          </div>
        </div>

        {/* TOP RIGHT COMPACT STEP INDICATOR */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] hidden sm:flex">
          <span className={step === 1 && !isSummaryView ? 'text-[#15519D] font-extrabold' : ''}>1 About You</span>
          <span>•</span>
          <span className={(step >= 2 && step <= 4) && !isSummaryView ? 'text-[#15519D] font-extrabold' : ''}>2 Your Interests</span>
          <span>•</span>
          <span className={isSummaryView ? 'text-[#15519D] font-extrabold' : ''}>3 Choose Your Plan</span>
          <span>•</span>
          <span>4 Ready</span>
        </div>

      </header>

      {/* 2. MAIN WORKSPACE CONTAINER (DESKTOP TWO-COLUMN LAYOUT) */}
      <main className="w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-6 lg:py-8">
        
        {/* LEFT COLUMN: ISOMETRIC SAAS ONBOARDING ILLUSTRATION (~44% DESKTOP) */}
        <div className="w-full lg:w-[44%] flex flex-col justify-center space-y-4">
          <div className="w-full mix-blend-multiply rounded-2xl overflow-hidden">
            <img
              src="/images/arthsetu_isolated_isometric_illustration.jpg"
              alt="ArthSetu Isolated Isometric Investment Setup Illustration"
              className="w-full h-auto object-contain max-h-[380px] lg:max-h-[440px] transition-transform duration-300 hover:scale-102"
            />
          </div>

          <p className="text-xs text-[#64748B] font-medium leading-relaxed text-center lg:text-left">
            Research-backed investment advisory tailored to your goals, strategy preferences, and risk profile.
          </p>
        </div>

        {/* RIGHT COLUMN: QUESTIONNAIRE CARD CONTAINER (PRIMARY FOCUS, ~600-640px MAX WIDTH) */}
        <div className="w-full lg:w-[56%] max-w-[640px] mx-auto">
          
          <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 sm:p-8 space-y-6 shadow-md shadow-slate-200/50 relative">
            
            <AnimatePresence mode="wait">
              
              {/* SUMMARY VIEW BEFORE PROCEEDING */}
              {isSummaryView ? (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#15519D] uppercase tracking-wider">
                      PERSONALIZATION SUMMARY
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#172033]">
                      Review Your Investor Profile
                    </h2>
                    <p className="text-xs text-[#64748B] font-medium">
                      We've tailored ArthSetu's intelligence engines based on your responses below.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {[
                      { stepNum: 1, label: 'Investment Familiarity', val: answers.familiarity },
                      { stepNum: 2, label: 'Topics & Strategies', val: answers.interests.join(', ') },
                      { stepNum: 3, label: 'Primary Goals', val: answers.goals.join(', ') },
                      { stepNum: 4, label: 'Research Approach', val: answers.approach },
                      { stepNum: 5, label: 'Investment Horizon', val: answers.horizon },
                    ].map((item) => (
                      <div
                        key={item.label}
                        onClick={() => {
                          setStep(item.stepNum);
                          setIsSummaryView(false);
                        }}
                        className="p-3.5 bg-[#F8FAFC] hover:bg-blue-50/50 rounded-xl border border-[#E2E8F0] hover:border-[#15519D] transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold text-[#64748B] uppercase">{item.label}</span>
                          <div className="text-xs font-extrabold text-[#172033] group-hover:text-[#15519D] transition-colors">{item.val}</div>
                        </div>
                        <span className="text-[11px] font-extrabold text-[#15519D] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                          <Edit2 className="w-3 h-3" /> Change
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-xs font-bold text-[#64748B] hover:text-[#172033] flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Edit Responses
                    </button>

                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-sm transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Choose Your Plan</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key={`step_${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* QUESTION CARD HEADER */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#15519D] uppercase tracking-wider block">
                      QUESTION {step} OF 5
                    </span>

                    {step === 1 && (
                      <>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
                          How familiar are you with investing?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">
                          This helps us tailor stock research, insights, and explanations to your level.
                        </p>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
                          What types of stocks or strategies interest you?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">
                          Select one or more topics to customize your intelligence feeds.
                        </p>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
                          What are your primary goals on ArthSetu?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">
                          Choose what you'd like to achieve so we can focus your dashboard.
                        </p>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
                          What is your preferred research approach?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">
                          Select how you like to combine your analysis with AI guidance.
                        </p>
                      </>
                    )}

                    {step === 5 && (
                      <>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033]">
                          What is your typical investment horizon?
                        </h2>
                        <p className="text-xs sm:text-sm text-[#64748B] font-medium leading-relaxed">
                          This sets default risk parameters and catalyst timelines.
                        </p>
                      </>
                    )}
                  </div>

                  {/* STEP 1: 2x2 GRID OPTIONS */}
                  {step === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      {familiarityOptions.map(opt => {
                        const isSelected = answers.familiarity === opt.label;
                        return (
                          <div
                            key={opt.label}
                            onClick={() => setAnswers(prev => ({ ...prev, familiarity: opt.label }))}
                            className={`p-4 rounded-xl border transition cursor-pointer relative flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#15519D]/5 border-[#15519D] shadow-xs'
                                : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <h3 className="font-extrabold text-sm text-[#172033]">{opt.label}</h3>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-[#15519D] shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-[#64748B] font-medium mt-1 leading-relaxed">
                              {opt.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 2: INTEREST OPTIONS */}
                  {step === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {interestOptions.map(opt => {
                        const isSelected = answers.interests.includes(opt.label);
                        return (
                          <div
                            key={opt.label}
                            onClick={() => toggleInterest(opt.label)}
                            className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#15519D]/5 border-[#15519D]'
                                : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                            }`}
                          >
                            <div>
                              <h3 className="font-extrabold text-xs text-[#172033]">{opt.label}</h3>
                              <p className="text-[11px] text-[#64748B] font-medium">{opt.desc}</p>
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#15519D] shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 3: GOAL OPTIONS */}
                  {step === 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {goalOptions.map(goal => {
                        const isSelected = answers.goals.includes(goal);
                        return (
                          <div
                            key={goal}
                            onClick={() => toggleGoal(goal)}
                            className={`p-3 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#15519D]/5 border-[#15519D] text-[#15519D]'
                                : 'bg-white border-[#E2E8F0] text-[#172033] hover:border-[#CBD5E1]'
                            }`}
                          >
                            <span>{goal}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#15519D] shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 4: RESEARCH APPROACH */}
                  {step === 4 && (
                    <div className="space-y-3 pt-2">
                      {approachOptions.map(opt => {
                        const isSelected = answers.approach === opt.label;
                        return (
                          <div
                            key={opt.label}
                            onClick={() => setAnswers(prev => ({ ...prev, approach: opt.label }))}
                            className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#15519D]/5 border-[#15519D]'
                                : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                            }`}
                          >
                            <div>
                              <h3 className="font-extrabold text-sm text-[#172033]">{opt.label}</h3>
                              <p className="text-xs text-[#64748B] font-medium mt-0.5">{opt.desc}</p>
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#15519D] shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* STEP 5: INVESTMENT HORIZON */}
                  {step === 5 && (
                    <div className="space-y-3 pt-2">
                      {horizonOptions.map(opt => {
                        const isSelected = answers.horizon === opt.label;
                        return (
                          <div
                            key={opt.label}
                            onClick={() => setAnswers(prev => ({ ...prev, horizon: opt.label }))}
                            className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#15519D]/5 border-[#15519D]'
                                : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                            }`}
                          >
                            <div>
                              <h3 className="font-extrabold text-sm text-[#172033]">{opt.label}</h3>
                              <p className="text-xs text-[#64748B] font-medium mt-0.5">{opt.desc}</p>
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-[#15519D] shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* BOTTOM ACTION BAR */}
                  <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="text-xs font-bold text-[#64748B] hover:text-[#172033] flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-xs px-6 py-3 rounded-xl shadow-sm transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{step === 5 ? 'Review Profile' : 'Continue'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </main>

      {/* 3. FOOTER DISCLAIMER */}
      <footer className="w-full max-w-7xl mx-auto pt-6 border-t border-[#E2E8F0]/80 text-center text-[10px] text-[#64748B] font-medium shrink-0">
        ArthSetu Research & Investment Intelligence · SEBI Registered Advisory Platform · Made Clear.
      </footer>

    </div>
  );
};

export default ArthSetuPersonalization;
