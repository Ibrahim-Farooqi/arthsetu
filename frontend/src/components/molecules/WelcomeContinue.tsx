import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Rocket, Eye, ArrowLeft, ArrowRight, HelpCircle, Lock, Award, Star } from 'lucide-react';
import { Button } from '../atoms/Button';

export const WelcomeContinue = () => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleBack = () => {
    navigate('/get-started');
  };

  const handleSelectOption = (option: number) => {
    setSelectedCard(option);
    setTimeout(() => {
      if (option === 1) {
        navigate('/login-otp?mode=existing');
      } else if (option === 2) {
        navigate('/login-otp?mode=new');
      } else if (option === 3) {
        navigate('/dashboard?demo=true');
      }
    }, 450); // small delay for animation response
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 22 } },
  };

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-dark-bg text-brand-navy dark:text-dark-text flex flex-col justify-between p-6 md:p-12 font-sans relative overflow-hidden transition-colors duration-300 selection:bg-primary/20 selection:text-primary">
      
      {/* Premium Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-success/5 dark:bg-success/5 blur-[120px] pointer-events-none animate-pulse duration-[10s]" />
      <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-primary-light0/5 dark:bg-primary-light0/5 blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between z-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-brand-secondary dark:text-dark-muted hover:text-brand-navy dark:hover:text-dark-text text-sm font-semibold transition-colors focus:outline-none group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2 bg-white/40 dark:bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-white/10 shadow-premium-sm">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-primary flex items-center justify-center text-white font-extrabold text-xs shadow-premium-sm border border-white/5">
            U
          </div>
          <span className="text-xs font-black tracking-wider text-brand-navy dark:text-dark-text">
            UNIVEST
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto flex flex-col justify-center my-8 z-10 gap-10">
        
        {/* Title Section */}
        <div className="flex flex-col gap-3 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 self-center bg-primary/10 dark:bg-primary/20 text-primary dark:text-[#64748B] px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-premium-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Investment Intelligence</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-brand-navy to-indigo-950 dark:from-white dark:via-blue-100 dark:to-slate-300 bg-clip-text text-transparent leading-tight mt-1">
            Welcome to Univest
          </h1>
          <p className="text-sm text-brand-secondary dark:text-dark-muted max-w-md mx-auto leading-relaxed">
            Choose how you would like to continue your investment intelligence journey.
          </p>
        </div>

        {/* Options Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Existing Investor */}
          <motion.div
            variants={cardVariants}
            onClick={() => handleSelectOption(1)}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group cursor-pointer bg-white dark:bg-dark-card border rounded-card p-6 md:p-8 flex flex-col justify-between min-h-[300px] shadow-premium hover:shadow-premium-lg transition-all duration-300 relative ${
              selectedCard === 1 
                ? 'border-primary ring-2 ring-primary/20 shadow-glow-blue' 
                : hoveredCard === 1 
                  ? 'border-primary/50 shadow-glow-blue/10 dark:border-primary/30 dark:shadow-glow-blue/20 -translate-y-1.5' 
                  : 'border-brand-border dark:border-dark-border'
            }`}
          >
            {/* Ambient inner glow */}
            <div className={`absolute inset-0 rounded-card bg-primary/[0.01] dark:bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            <div className="flex flex-col gap-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-[#64748B] shrink-0 border border-primary/15 transition-transform duration-500 group-hover:scale-110">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-brand-navy dark:text-dark-text group-hover:text-primary dark:group-hover:text-[#64748B] transition-colors">
                  I already have an account
                </h3>
                <p className="text-xs text-brand-secondary dark:text-dark-muted leading-relaxed">
                  Sign in to your existing account and continue tracking your customized portfolios.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-8 relative z-10">
              <Button 
                variant="primary" 
                className="w-full text-xs py-3.5 text-white bg-gradient-to-r from-primary to-primary hover:from-primary/95 hover:to-primary/95 shadow-md shadow-primary/25 hover:shadow-glow-blue transition-all"
              >
                <span>Continue with OTP</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <span className="text-[10px] text-brand-secondary dark:text-dark-muted text-center font-medium">
                For registered Univest members.
              </span>
            </div>
          </motion.div>

          {/* Card 2: New Investor */}
          <motion.div
            variants={cardVariants}
            onClick={() => handleSelectOption(2)}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group cursor-pointer bg-white dark:bg-dark-card border rounded-card p-6 md:p-8 flex flex-col justify-between min-h-[300px] shadow-premium hover:shadow-premium-lg transition-all duration-300 relative ${
              selectedCard === 2 
                ? 'border-success ring-2 ring-success/20 shadow-glow-green' 
                : hoveredCard === 2 
                  ? 'border-success/50 shadow-glow-green/10 dark:border-success/35 dark:shadow-glow-green/20 -translate-y-1.5' 
                  : 'border-brand-border dark:border-dark-border'
            }`}
          >
            {/* Ambient inner glow */}
            <div className={`absolute inset-0 rounded-card bg-success/[0.01] dark:bg-success/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            <div className="flex flex-col gap-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-success/10 dark:bg-success/20 flex items-center justify-center text-success dark:text-green-400 shrink-0 border border-success/15 transition-transform duration-500 group-hover:scale-110">
                <Rocket className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-brand-navy dark:text-dark-text group-hover:text-success dark:group-hover:text-green-400 transition-colors">
                  I'm new to investing
                </h3>
                <p className="text-xs text-brand-secondary dark:text-dark-muted leading-relaxed">
                  Create your investment account, verify KYC documents, and access personalized AI insights.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-8 relative z-10">
              <Button 
                variant="secondary" 
                className="w-full text-xs py-3.5 hover:border-success/50 dark:hover:border-success/40 transition-colors"
              >
                <span>Create New Account</span>
              </Button>
              <span className="text-[10px] text-brand-secondary dark:text-dark-muted text-center font-medium">
                Takes approximately 5 minutes.
              </span>
            </div>
          </motion.div>

          {/* Card 3: Explore Demo */}
          <motion.div
            variants={cardVariants}
            onClick={() => handleSelectOption(3)}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`group cursor-pointer bg-white dark:bg-dark-card border rounded-card p-6 md:p-8 flex flex-col justify-between min-h-[300px] shadow-premium hover:shadow-premium-lg transition-all duration-300 relative ${
              selectedCard === 3 
                ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-glow-amber' 
                : hoveredCard === 3 
                  ? 'border-amber-500/50 shadow-amber-500/10 dark:border-amber-500/35 dark:shadow-amber-500/20 -translate-y-1.5' 
                  : 'border-brand-border dark:border-dark-border'
            }`}
          >
            {/* Ambient inner glow */}
            <div className={`absolute inset-0 rounded-card bg-amber-500/[0.01] dark:bg-amber-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

            <div className="flex flex-col gap-5 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0 border border-amber-500/15 transition-transform duration-500 group-hover:scale-110">
                <Eye className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-brand-navy dark:text-dark-text group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                  Explore Before Joining
                </h3>
                <p className="text-xs text-brand-secondary dark:text-dark-muted leading-relaxed">
                  Browse the app, view market trends, and preview sample advisory research feeds.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-8 relative z-10">
              <Button 
                variant="secondary" 
                className="w-full text-xs py-3.5 border-dashed hover:border-solid hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <span>Explore Demo Platform</span>
              </Button>
              <span className="text-[10px] text-brand-secondary dark:text-dark-muted text-center font-medium">
                No registration credentials needed.
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Security & Compliance Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto w-full mt-4 text-[11px] text-brand-secondary dark:text-dark-muted border-y border-slate-200/60 dark:border-white/5 py-4">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-primary dark:text-[#64748B]" />
            <span className="font-semibold">Bank-grade Security</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-success dark:text-green-400" />
            <span className="font-semibold">SEBI Registered Advisory</span>
          </div>
          <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
            <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span className="font-semibold">100% Encrypted Transactions</span>
          </div>
        </div>
      </main>

      {/* Footer disclaimers */}
      <footer className="max-w-xl mx-auto w-full text-center flex flex-col gap-3 pt-6 z-10 text-[10px] text-brand-secondary dark:text-dark-muted">
        <div className="flex items-center justify-center gap-3 font-semibold">
          <a href="#help" className="hover:text-brand-navy dark:hover:text-dark-text flex items-center gap-1 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" /> Need Help?
          </a>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <a href="#privacy" className="hover:text-brand-navy dark:hover:text-dark-text transition-colors">Privacy Policy</a>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <a href="#terms" className="hover:text-brand-navy dark:hover:text-dark-text transition-colors">Terms of Service</a>
        </div>
        <span className="tracking-wide">SEBI Registered Investment Advisory Intermediary • INA000016482</span>
      </footer>
    </div>
  );
};

export default WelcomeContinue;
