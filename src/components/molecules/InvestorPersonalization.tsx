import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, BrainCircuit, Check, Sparkles,
  User, TrendingUp, Target, Activity, PieChart, Briefcase, BellRing, Rocket
} from 'lucide-react';
import { Button } from '../atoms/Button';

const EXPERIENCES = [
  { value: 'Beginner', title: 'Beginner', desc: 'Learning to invest. Focus on low-risk mutual funds and primary blue chips.' },
  { value: 'Intermediate', title: 'Intermediate', desc: 'Some investing experience. Understands stock market mechanics and basic portfolio weightings.' },
  { value: 'Advanced', title: 'Advanced', desc: 'Experienced investor. Familiar with breakouts, options strategies, and MCX commodities.' },
  { value: 'Professional', title: 'Professional', desc: 'Active trader or financial professional. High frequency trades and option-writing.' },
];

const GOALS = [
  'Wealth Creation', 'Retirement Planning', 'Passive Income', 
  'Short-Term Trading', 'Swing Trading', 'Futures & Options Alpha', 
  'Tax Saving (ELSS)', 'Emergency Fund'
];

const INTERESTS = [
  'Stocks', 'Futures & Options', 'Upcoming IPOs', 'Mutual Funds', 
  'ETFs', 'Commodities (Gold/Crude)', 'Bonds & NCDs'
];

const SECTORS = [
  'Technology', 'Banking & Finance', 'Healthcare', 'Energy', 
  'Automobiles', 'Infrastructure', 'Pharmaceuticals', 
  'Defence', 'Artificial Intelligence', 'Renewable Energy'
];

const RISK_CONFIGS = [
  { level: 'Conservative', return: '6 - 8%', risk: 'Very Low', desc: 'Capital preservation is your primary objective. Focused on corporate bonds, large debt schemes, and gold.' },
  { level: 'Balanced', return: '10 - 12%', risk: 'Moderate', desc: 'Standard hybrid allocation between blue-chip equities and bonds to grow capital steadily.' },
  { level: 'Growth', return: '14 - 16%', risk: 'High', desc: 'Prioritize wealth growth with higher volatility tolerance. Heavy focus on mid-caps and growth equities.' },
  { level: 'Aggressive', return: '18 - 22%+', risk: 'Extreme', desc: 'Maximize short-term advisory strategy returns, derivatives swing trading, and breakout commodities.' },
];

// ─── PREMIUM ABSTRACT VISUAL CANVASES ──────────────────────────────────────────

const AmbientBackground = () => (
  <div className="absolute inset-0 overflow-hidden bg-slate-950 pointer-events-none">
    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    <motion.div 
      animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-blue-900/40 rounded-full blur-[120px] mix-blend-screen"
    />
    <motion.div 
      animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0] }}
      transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      className="absolute top-1/2 right-0 w-[25rem] h-[25rem] bg-cyan-900/20 rounded-full blur-[100px] mix-blend-screen"
    />
  </div>
);

const IdentityAbstract = () => (
  <div className="relative w-72 h-80 flex items-center justify-center">
    <div className="absolute inset-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
      <motion.div 
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-28 border-[0.5px] border-cyan-400/40 rounded-t-full rounded-b-[2rem] shadow-[0_0_30px_rgba(34,211,238,0.15)] flex items-center justify-center"
      >
        <div className="w-8 h-12 border-[0.5px] border-emerald-400/30 rounded-t-full rounded-b-xl" />
      </motion.div>
    </div>
  </div>
);

const ScreenGraphic = ({ screen, activeRisk }: { screen: number, activeRisk: number }) => {
  const graphics = {
    1: { title: 'Personalized Advisory', desc: 'Customizing your investment preferences to build your unique wealth strategy.', render: <IdentityAbstract /> },
    2: { title: 'Market Experience', desc: 'Understanding your market background allows us to calibrate technical advisory calls.', render: <IdentityAbstract /> },
    3: { title: 'Financial Goals', desc: 'Your financial objectives dictate our quantitative algorithms.', render: <IdentityAbstract /> },
    4: { title: 'Risk Calibration', desc: 'Balancing algorithmic potential against volatility to construct a mathematically sound profile.', render: <IdentityAbstract /> },
    5: { title: 'Asset Classes', desc: 'Intelligently prioritizing equities, F&O options, commodities and mutual funds.', render: <IdentityAbstract /> },
    6: { title: 'Sector Intelligence', desc: 'Focusing on high-conviction industries and real-time market alert triggers.', render: <IdentityAbstract /> },
    7: { title: 'Neural Synthesis', desc: 'Our AI is now processing your 6 core parameter answers to generate your tailored matrix.', render: <IdentityAbstract /> },
    8: { title: 'System Ready', desc: 'Your personalized financial infrastructure is fully compiled.', render: <IdentityAbstract /> },
  };

  const curr = graphics[screen as keyof typeof graphics] || graphics[1];

  return (
    <div className="absolute inset-0 flex flex-col justify-center p-14 overflow-hidden bg-slate-950 border-r border-white/5">
      <AmbientBackground />
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex flex-col w-full h-full"
        >
          <div className="flex-1 flex items-center justify-center">
             {curr.render}
          </div>
          
          <div className="flex flex-col gap-2 mt-auto mb-8">
            <h2 className="text-xl font-light text-white tracking-wide">{curr.title}</h2>
            <p className="text-white/50 text-xs leading-relaxed max-w-sm font-light tracking-wide">{curr.desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export const InvestorPersonalization = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(1);
  
  const [experience, setExperience] = useState('Beginner');
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Wealth Creation']);
  const [riskSlider, setRiskSlider] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Stocks', 'Mutual Funds']);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(['Technology', 'Banking']);

  const [aiPercent, setAiPercent] = useState(0);

  useEffect(() => {
    if (screen === 7) {
      const interval = setInterval(() => {
        setAiPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setScreen(8), 800);
            return 100;
          }
          return prev + 1;
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev => prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]);
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const toggleSector = (sector: string) => {
    setSelectedSectors(prev => prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]);
  };

  const nextScreen = () => setScreen(prev => Math.min(prev + 1, 8));
  const prevScreen = () => setScreen(prev => Math.max(prev - 1, 1));
  const handleFinalRedirect = () => navigate('/dashboard');
  const getProgress = () => screen === 8 ? 100 : Math.round((screen / 7) * 95);

  const currentRisk = RISK_CONFIGS[riskSlider];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900 font-sans selection:bg-primary/20">
      
      <div className="hidden lg:block lg:w-5/12 relative overflow-hidden shadow-2xl z-10">
        <ScreenGraphic screen={screen} activeRisk={riskSlider} />
      </div>

      <div className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        <div className="flex-1 flex flex-col p-6 md:p-12 w-full max-w-2xl mx-auto">
          
          {screen < 8 && (
            <div className="w-full flex flex-col gap-4 z-10 mb-8 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <button
                  onClick={prevScreen}
                  disabled={screen === 1}
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors disabled:opacity-0 disabled:cursor-default focus:outline-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <span>Question {screen > 1 ? screen - 1 : 1} of 6</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${getProgress()}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col justify-center pb-12 max-w-xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col gap-6"
              >
                {/* INTRO */}
                {screen === 1 && (
                  <div className="flex flex-col gap-5 text-center items-center py-2">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-primary flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[rgba(21,81,157,0.3)]/20">
                      U
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">Welcome to Univest,<br/>Omar Khan!</h2>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">Let's answer 6 quick questions to tailor your advisory calls and watchlist parameters.</p>
                    </div>
                    <Button variant="primary" onClick={nextScreen} className="w-full max-w-sm mx-auto mt-2 py-2.5 bg-primary hover:bg-primary-dark text-white shadow-md shadow-[rgba(21,81,157,0.3)]/25 rounded-xl text-xs font-bold">
                      <span className="flex items-center justify-center gap-2">Start 6 Setup Questions <ArrowRight className="w-4 h-4" /></span>
                    </Button>
                  </div>
                )}

                {/* Q1: EXPERIENCE */}
                {screen === 2 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase text-primary">Question 1 of 6</span>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">How would you describe your market experience?</h3>
                      <p className="text-xs text-slate-500">Select one option that matches your background.</p>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {EXPERIENCES.map(exp => (
                        <button
                          key={exp.value}
                          onClick={() => setExperience(exp.value)}
                          className={`text-left p-3.5 rounded-xl border-2 transition-all duration-300 ${
                            experience === exp.value ? 'bg-primary-light border-primary shadow-xs text-primary' : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-slate-900">{exp.title}</span>
                            {experience === exp.value && <Check className="w-3.5 h-3.5 text-primary" />}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{exp.desc}</p>
                        </button>
                      ))}
                    </div>
                    <Button variant="primary" onClick={nextScreen} className="py-2.5 mt-1 text-white bg-primary hover:bg-primary-dark rounded-xl text-xs font-bold">Next Question</Button>
                  </div>
                )}

                {/* Q2: GOALS */}
                {screen === 3 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase text-primary">Question 2 of 6</span>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">What are your primary investment goals?</h3>
                      <p className="text-xs text-slate-500">Choose all goals that align with your objectives.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {GOALS.map(goal => {
                        const isSelected = selectedGoals.includes(goal);
                        return (
                          <button
                            key={goal}
                            onClick={() => toggleGoal(goal)}
                            className={`p-3 text-left border-2 rounded-xl transition-all ${
                              isSelected ? 'bg-primary-light border-primary text-primary font-bold' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-xs">{goal}</span>
                          </button>
                        );
                      })}
                    </div>
                    <Button variant="primary" onClick={nextScreen} disabled={selectedGoals.length === 0} className="py-2.5 mt-1 text-white bg-primary hover:bg-primary-dark rounded-xl text-xs font-bold disabled:opacity-50">Next Question</Button>
                  </div>
                )}

                {/* Q3: RISK */}
                {screen === 4 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase text-primary">Question 3 of 6</span>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">Set your risk comfort level</h3>
                      <p className="text-xs text-slate-500">Slide the meter to set volatility tolerance.</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3 shadow-xs">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Strategy Match</span>
                        <span className="text-xs font-bold bg-primary-light text-primary px-2.5 py-0.5 rounded-full">{currentRisk.level}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><span className="text-[10px] text-slate-400 font-bold uppercase block">Target Returns</span><span className="text-base font-bold text-emerald-600">{currentRisk.return}</span></div>
                        <div><span className="text-[10px] text-slate-400 font-bold uppercase block">Volatility Risk</span><span className="text-base font-bold text-slate-900">{currentRisk.risk}</span></div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">{currentRisk.desc}</p>
                    </div>
                    <input type="range" min="0" max="3" step="1" value={riskSlider} onChange={(e) => setRiskSlider(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-full cursor-pointer accent-primary" />
                    <Button variant="primary" onClick={nextScreen} className="py-2.5 mt-1 text-white bg-primary hover:bg-primary-dark rounded-xl text-xs font-bold">Next Question</Button>
                  </div>
                )}

                {/* Q4: ASSET INTERESTS */}
                {screen === 5 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase text-primary">Question 4 of 6</span>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">Which financial assets interest you?</h3>
                      <p className="text-xs text-slate-500">We will prioritize advisory feeds containing these assets.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {INTERESTS.map(interest => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`p-3 text-left border-2 rounded-xl transition-all ${
                              isSelected ? 'bg-primary-light border-primary text-primary font-bold' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-xs">{interest}</span>
                          </button>
                        );
                      })}
                    </div>
                    <Button variant="primary" onClick={nextScreen} disabled={selectedInterests.length === 0} className="py-2.5 mt-1 text-white bg-primary hover:bg-primary-dark rounded-xl text-xs font-bold disabled:opacity-50">Next Question</Button>
                  </div>
                )}

                {/* Q5 & Q6: SECTORS */}
                {screen === 6 && (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase text-primary">Question 5 & 6 of 6</span>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">Select favorite sectors & alerts</h3>
                      <p className="text-xs text-slate-500">Pre-populates watchlists with top tickers in selected categories.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SECTORS.map(sector => {
                        const isSelected = selectedSectors.includes(sector);
                        return (
                          <button
                            key={sector}
                            onClick={() => toggleSector(sector)}
                            className={`px-3 py-1.5 rounded-xl text-xs border-2 transition-all ${
                              isSelected ? 'bg-primary border-primary text-white font-bold' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            {sector}
                          </button>
                        );
                      })}
                    </div>
                    <Button variant="primary" onClick={nextScreen} disabled={selectedSectors.length === 0} className="py-2.5 mt-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl text-xs font-bold disabled:opacity-50">Finish Setup & Calibrate AI</Button>
                  </div>
                )}

                {/* AI LOADING */}
                {screen === 7 && (
                  <div className="flex flex-col gap-5 text-center items-center py-6">
                    <div className="w-16 h-16 rounded-full bg-primary-light border border-primary-light flex items-center justify-center text-primary relative shadow-sm">
                      <BrainCircuit className="w-7 h-7" />
                      <div className="absolute inset-0 rounded-full border-[2.5px] border-primary border-t-transparent animate-spin" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">Compiling 6 Investor Parameters</h3>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Structuring custom watchlists and research feeds...
                      </p>
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-primary">{aiPercent}%</span>
                  </div>
                )}

                {/* COMPLETE */}
                {screen === 8 && (
                  <div className="flex flex-col gap-5 text-center items-center py-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-md relative">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl font-bold tracking-tight text-slate-900">6-Question Setup Complete</h2>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">Your advisory parameters are saved and calibrated.</p>
                    </div>
                    <Button variant="primary" onClick={handleFinalRedirect} className="w-full max-w-xs py-2.5 bg-primary hover:bg-primary-dark shadow-md rounded-xl font-bold text-white text-xs">Go to Dashboard</Button>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
export default InvestorPersonalization;
