import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BriefcaseBusiness, Check, CircleDollarSign, LineChart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const services = [
  { icon: <LineChart />, title: 'Research Advisory', detail: 'SEBI-registered equity, F&O and commodity calls.', tone: 'blue' },
  { icon: <BriefcaseBusiness />, title: 'Portfolio Review', detail: 'Know what to buy, hold or exit with clarity.', tone: 'violet' },
  { icon: <BarChart3 />, title: 'Smart Execution', detail: 'Turn a validated signal into action in moments.', tone: 'cyan' },
];

export const GetStarted = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const continueWithEmail = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes('@')) return;

    // This is the client-side stand-in for the future account-lookup endpoint.
    // A number becomes recognised after completing the account-creation flow.
    const savedAccounts = JSON.parse(localStorage.getItem('univest_accounts') || '[]') as string[];
    const tab = savedAccounts.includes(email) ? 'login' : 'signup';
    navigate(`/login-otp?tab=${tab}&email=${email}`);
  };

  return (
    <main className="univest-hero min-h-screen overflow-hidden bg-[#060917] text-white">
      <div className="hero-grid" />
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <nav className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 lg:px-8">
        <button onClick={() => navigate('/')} className="flex items-center gap-2.5 text-left" aria-label="Univest home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#4e8cff] to-[#1759e9] text-sm font-black shadow-[0_0_24px_rgba(39,106,255,.55)]">U</span>
          <span className="text-lg font-extrabold tracking-[-.04em]">univest</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-5 text-xs font-medium text-slate-300 lg:flex"><a href="#products" className="hover:text-white">Products</a><a href="#research" className="hover:text-white">Research</a><a href="#pricing" className="hover:text-white">Pricing</a><a href="#about" className="hover:text-white">About</a><a href="#support" className="hover:text-white">Support</a></div>
          <button onClick={() => navigate('/login-otp?tab=login')} className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-blue-300 hover:bg-white/5">Log in</button>
          <button onClick={() => navigate('/login-otp?tab=signup')} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-lg shadow-[rgba(21,81,157,0.3)]/25 transition hover:bg-[#3b76ed]">Create account</button>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-10 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24 lg:pt-16">
        <div className="max-w-[620px]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-blue-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-blue-200">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered investment intelligence
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .65 }} className="text-[clamp(2.7rem,5.3vw,4.65rem)] font-black leading-[.98] tracking-[-.065em]">
            Invest smarter with <span className="hero-gradient-text">AI-powered research.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16, duration: .6 }} className="mt-6 max-w-lg text-base leading-7 text-slate-300">
            Professional stock research, AI-driven insights, portfolio intelligence, and smarter investing — all in one secure platform.
          </motion.p>

          <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .6 }} onSubmit={continueWithEmail} className="mt-8 max-w-md">
            <label htmlFor="hero-email" className="mb-3 block text-sm font-semibold text-white">Get started with your email address</label>
            <div className="flex rounded-xl border border-white/20 bg-[#101935]/80 p-1.5 shadow-2xl backdrop-blur-xl transition focus-within:border-primary-light focus-within:ring-4 focus-within:ring-primary/10">
              <input id="hero-email" value={email} onChange={event => setEmail(event.target.value)} aria-label="Email address" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-slate-500" placeholder="Enter your email address" type="email" />
              <button type="submit" disabled={!email.includes('@')} className="grid h-10 w-12 place-items-center rounded-lg bg-[#2879f5] text-white transition hover:bg-[#4c90ff] disabled:cursor-not-allowed disabled:opacity-45" aria-label="Continue"><ArrowRight className="h-5 w-5" /></button>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">We’ll recognise your account and take you to the right place.</p>
          </motion.form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .42, duration: .7 }} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-400" />SEBI registered advisory</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-400" />Built for Indian investors</span>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: .94, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: .14, duration: .8, ease: [0.16, 1, .3, 1] }} className="relative mx-auto w-full max-w-[470px] py-8 lg:py-0">
          <div className="absolute -right-8 top-4 h-64 w-64 rounded-full bg-primary/25 blur-[80px]" />
          <div className="hero-orbit hero-orbit-a"><CircleDollarSign /></div>
          <div className="hero-orbit hero-orbit-b"><span>₹</span></div>
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#101b3d]/80 p-6 shadow-[0_28px_80px_rgba(0,0,0,.42)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-blue-200">Your investment pulse</p><p className="mt-1 text-xl font-extrabold">Portfolio overview</p></div>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300">+18.4% return</span>
            </div>
            <div className="mt-6 flex items-end justify-between"><div><p className="text-xs text-slate-400">Current value</p><p className="mt-1 text-3xl font-extrabold tracking-tight">₹8.42L</p></div><p className="text-xs font-semibold text-emerald-300">▲ ₹1,31,040 this year</p></div>
            <svg viewBox="0 0 380 120" className="mt-4 h-28 w-full overflow-visible" aria-label="Portfolio growth chart"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#3286ff" stopOpacity=".45"/><stop offset="1" stopColor="#3286ff" stopOpacity="0"/></linearGradient></defs><path d="M0 103 C45 96 52 85 91 88 S144 63 184 69 S239 87 278 55 S328 57 380 12 L380 120 L0 120Z" fill="url(#area)"/><path d="M0 103 C45 96 52 85 91 88 S144 63 184 69 S239 87 278 55 S328 57 380 12" fill="none" stroke="#54a1ff" strokeWidth="3"/><circle cx="380" cy="12" r="5" fill="#8bc1ff"/></svg>
            <div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-[10px] text-slate-400">AI signals</p><p className="mt-1 text-sm font-bold">4 active ideas</p></div><div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-[10px] text-slate-400">Portfolio score</p><p className="mt-1 text-sm font-bold text-emerald-300">Healthy · 82/100</p></div></div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-3 px-6 pb-10 lg:grid-cols-3 lg:px-8">
        {services.map((service, index) => <motion.button onClick={() => navigate('/login-otp?tab=signup')} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 + index * .08 }} key={service.title} className="group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[.055] p-4 text-left backdrop-blur-sm transition hover:-translate-y-1 hover:border-blue-300/50 hover:bg-white/[.09]">
          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${service.tone === 'blue' ? 'bg-blue-400/15 text-blue-300' : service.tone === 'violet' ? 'bg-violet-400/15 text-violet-300' : 'bg-cyan-400/15 text-cyan-300'}`}>{service.icon}</span>
          <span><span className="block text-sm font-bold">{service.title}</span><span className="mt-1 block text-xs leading-4 text-slate-400">{service.detail}</span></span><ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
        </motion.button>)}
      </section>
    </main>
  );
};

export default GetStarted;
