import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  Smartphone, FileCheck, Brain, TrendingUp, Check, ShieldCheck, Zap,
  CheckCircle2, ArrowRight, UserCheck, Shield, Lock, CreditCard, Scan
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  {
    num: '01',
    badge: 'Step 1 of 4',
    title: 'Create Account',
    tabTitle: '1. Create Account',
    desc: 'Register securely using your mobile number. No password required — authenticate instantly with a one-time passcode.',
    avgTime: '25 seconds',
    security: 'AES-256 Encrypted',
    checklist: ['Enter phone number', 'Receive secure SMS OTP', 'Verify credentials'],
    color: 'blue',
    accentFrom: 'from-primary',
    accentTo: 'to-blue-400',
    textAccent: 'text-[#64748B]',
    bgAccent: 'bg-primary/10',
    borderAccent: 'border-primary/20',
  },
  {
    num: '02',
    badge: 'Step 2 of 4',
    title: 'Paperless Identity eKYC',
    tabTitle: '2. Complete eKYC',
    desc: 'Verify your 12-digit Aadhaar via OTP to auto-fetch official credentials. Certified paperless KYC happens in real time.',
    avgTime: '45 seconds',
    security: 'NSDL & SEBI Compliant',
    checklist: ['NSDL PAN verification', 'Aadhaar matching registry', 'Face liveness scan'],
    color: 'emerald',
    accentFrom: 'from-emerald-600',
    accentTo: 'to-teal-400',
    textAccent: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/20',
  },
  {
    num: '03',
    badge: 'Step 3 of 4',
    title: 'Personalize Your AI',
    tabTitle: '3. Personalize AI',
    desc: 'Select your investment horizons and risk levels. Our multi-agent AI engine instantly generates your optimal CAGR advisory model.',
    avgTime: '40 seconds',
    security: 'Hyper-Personalised',
    checklist: ['Goal alignment selection', 'Calibrate risk profile', 'Generate AI archetype'],
    color: 'purple',
    accentFrom: 'from-purple-600',
    accentTo: 'to-indigo-400',
    textAccent: 'text-purple-400',
    bgAccent: 'bg-purple-500/10',
    borderAccent: 'border-purple-500/20',
  },
  {
    num: '04',
    badge: 'Step 4 of 4',
    title: 'Start Investing',
    tabTitle: '4. Start Investing',
    desc: 'Access your tailored dashboard. Receive live, SEBI-compliant research signals with entries, targets, and automatic rebalancing active.',
    avgTime: '10 seconds',
    security: 'Immediate Access',
    checklist: ['Deploy live AI agents', 'Activate real-time feeds', 'Initialize wealth terminal'],
    color: 'amber',
    accentFrom: 'from-amber-500',
    accentTo: 'to-orange-400',
    textAccent: 'text-amber-400',
    bgAccent: 'bg-amber-500/10',
    borderAccent: 'border-amber-500/20',
  },
];

// ─── STEP 1 SHOWCASE: PHONE VERIFICATION MOCKUP ─────────────────────────────────
function Step1Showcase({ active }: { active: boolean }) {
  const [subState, setSubState] = useState(0); // 0: inputting, 1: otp, 2: success
  const [typedPhone, setTypedPhone] = useState('');

  useEffect(() => {
    if (!active) {
      setSubState(0);
      setTypedPhone('');
      return;
    }

    // Phase 1: Type phone number
    const phoneNumber = '+91 98765 43210';
    let index = 0;
    const interval = setInterval(() => {
      setTypedPhone(phoneNumber.substring(0, index + 1));
      index++;
      if (index >= phoneNumber.length) {
        clearInterval(interval);
        // Phase 2: Move to OTP after 500ms
        const t1 = setTimeout(() => setSubState(1), 500);
        return () => clearTimeout(t1);
      }
    }, 80);

    return () => {
      clearInterval(interval);
    };
  }, [active]);

  useEffect(() => {
    if (subState === 1 && active) {
      // Phase 3: Transition to success after OTP animations
      const t2 = setTimeout(() => {
        setSubState(2);
      }, 2000);
      return () => clearTimeout(t2);
    }
  }, [subState, active]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Phone chassis */}
      <div className="w-[270px] h-[390px] sm:w-[290px] sm:h-[420px] rounded-[40px] bg-[#0A0F1D] border-2 border-slate-800/80 p-4.5 relative shadow-2xl overflow-hidden flex flex-col justify-between font-sans ring-1 ring-white/5">
        
        {/* Top Speaker/Camera notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4.5 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center gap-1.5 px-3">
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <div className="w-8 h-1 rounded-full bg-slate-800" />
        </div>

        {/* Top bar status */}
        <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono pt-2 px-3">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-1.5 border border-slate-500 rounded-2xs flex items-center p-0.5"><div className="w-full h-full bg-slate-500" /></div>
          </div>
        </div>

        {/* Main Phone Content Screen */}
        <div className="flex-1 flex flex-col justify-center items-center px-2 py-4">
          <AnimatePresence mode="wait">
            {subState === 0 && (
              <motion.div
                key="step1-phone"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col gap-4"
              >
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-1">
                    <Smartphone className="w-6 h-6 text-[#64748B]" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Verification</h4>
                  <p className="text-[10px] text-slate-400">Enter mobile number to continue</p>
                </div>

                <div className="space-y-1 text-left">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Mobile Number</span>
                  <div className="w-full bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 flex items-center text-sm font-semibold text-white relative">
                    <span className="opacity-90">{typedPhone}</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-0.5 h-4 bg-primary ml-0.5"
                    />
                  </div>
                </div>

                <button type="button" className="w-full py-2.5 bg-gradient-to-r from-primary to-primary text-white font-bold text-[11px] rounded-lg shadow-lg shadow-[rgba(21,81,157,0.3)]/15">
                  Request OTP
                </button>
              </motion.div>
            )}

            {subState === 1 && (
              <motion.div
                key="step1-otp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col gap-4 text-center"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Enter SMS Code</h4>
                  <p className="text-[10px] text-slate-400">We sent a 4-digit code to your phone</p>
                </div>

                <div className="flex gap-2.5 justify-center">
                  {[4, 9, 2, 1].map((digit, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.3 }}
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/60 flex items-center justify-center text-sm font-black text-white"
                    >
                      {digit}
                    </motion.div>
                  ))}
                </div>

                <div className="text-[10px] text-slate-500">Resend code in 18s</div>
              </motion.div>
            )}

            {subState === 2 && (
              <motion.div
                key="step1-success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full flex flex-col items-center justify-center gap-3.5 text-center"
              >
                <motion.div
                  initial={{ scale: 0.5, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/10"
                >
                  <ShieldCheck className="w-7 h-7" />
                </motion.div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-white">Verified</h4>
                  <p className="text-[10px] text-slate-400">Identity successfully checked</p>
                </div>

                <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-400 tracking-wider uppercase">
                  Secure Access OK
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home indicator bar */}
        <div className="w-16 h-1 bg-slate-800 rounded-full mx-auto mb-1" />
      </div>
    </div>
  );
}

// ─── STEP 2 SHOWCASE: IDENTITY SCAN & KYC MOCKUP ────────────────────────────────
function Step2Showcase({ active }: { active: boolean }) {
  const [subState, setSubState] = useState(0); // 0: doc scanning, 1: face match, 2: success

  useEffect(() => {
    if (!active) {
      setSubState(0);
      return;
    }
    const t1 = setTimeout(() => setSubState(1), 1800);
    const t2 = setTimeout(() => setSubState(2), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      setSubState(0);
    };
  }, [active]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {subState === 0 && (
          <motion.div
            key="step2-docs"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md flex flex-col items-center gap-4.5 relative"
          >
            {/* Horizontal neon scanning line */}
            <motion.div
              animate={{ y: [0, 160, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.8)] z-10 pointer-events-none"
            />

            <div className="w-full flex gap-4 relative">
              {/* PAN card card */}
              <div className="flex-1 bg-gradient-to-br from-emerald-950/60 to-slate-900/90 border border-emerald-500/20 rounded-xl p-4.5 shadow-xl relative overflow-hidden flex flex-col justify-between h-[130px]">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] text-slate-500 font-mono tracking-widest uppercase">Income Tax Dept</span>
                  <div className="w-5.5 h-4.5 rounded-xs bg-amber-500/40 border border-amber-500/30" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-14 bg-slate-700/50 rounded" />
                  <div className="h-2 w-20 bg-slate-700/50 rounded" />
                </div>
                <div className="flex justify-between items-end border-t border-white/[0.04] pt-1.5">
                  <span className="text-[9.5px] font-black text-emerald-400 font-mono">PAN: DLPAXXXX7K</span>
                  <span className="text-[7px] text-emerald-500 font-bold bg-emerald-500/10 px-1 rounded-xs">NSDL Verified</span>
                </div>
              </div>

              {/* Aadhaar card card */}
              <div className="flex-1 bg-gradient-to-br from-teal-950/60 to-slate-900/90 border border-teal-500/20 rounded-xl p-4.5 shadow-xl relative overflow-hidden flex flex-col justify-between h-[130px]">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] text-slate-500 font-mono tracking-widest uppercase">Govt of India</span>
                  <div className="w-5 h-5 rounded-full border border-teal-500/30 flex items-center justify-center text-[6.5px] text-teal-400">UID</div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-16 bg-slate-700/50 rounded" />
                  <div className="h-2 w-12 bg-slate-700/50 rounded" />
                </div>
                <div className="flex justify-between items-end border-t border-white/[0.04] pt-1.5">
                  <span className="text-[9.5px] font-black text-teal-400 font-mono">xxxx-xxxx-8021</span>
                  <span className="text-[7px] text-teal-500 font-bold bg-teal-500/10 px-1 rounded-xs">UIDAI Linked</span>
                </div>
              </div>
            </div>

            <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 bg-slate-900/60 px-4 py-2 rounded-lg border border-slate-800">
              <Scan className="w-4 h-4 text-emerald-400 animate-pulse" />
              Auto-extracting official documents...
            </div>
          </motion.div>
        )}

        {subState === 1 && (
          <motion.div
            key="step2-face"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            {/* Facial Recognition camera frame */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center p-1.5 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border border-dashed border-primary-light rounded-full"
                />
                <div className="w-full h-full rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden relative">
                  <UserCheck className="w-14 h-14 text-[#64748B]/60" />
                  
                  {/* Face outline grid */}
                  <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                    <div className="w-16 h-16 border border-primary-light/20 rounded-full absolute" />
                    <div className="w-22 h-22 border border-primary-light/10 rounded-full absolute" />
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-primary shadow-md shadow-[rgba(21,81,157,0.3)]/50"
              />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Face Liveness Verification</h4>
              <p className="text-[10px] text-slate-400">Verifying live webcam frame against Aadhaar photo</p>
            </div>
          </motion.div>
        )}

        {subState === 2 && (
          <motion.div
            key="step2-success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-18 h-18 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/20"
              >
                <Check className="w-10 h-10" />
              </motion.div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-[9.5px] font-black border border-[#172033]">
                OK
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-base font-black text-white">Identity Validated</h4>
              <p className="text-xs text-slate-400">eKYC successfully registered with NSDL database</p>
            </div>

            <div className="flex gap-2.5">
              <span className="text-[9.5px] bg-slate-900/80 border border-slate-800 px-2.5 py-1.5 rounded-md font-mono text-slate-400">PAN: Checked</span>
              <span className="text-[9.5px] bg-slate-900/80 border border-slate-800 px-2.5 py-1.5 rounded-md font-mono text-slate-400">Aadhaar: Linked</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── STEP 3 SHOWCASE: PERSONALISE AI CALIBRATION ────────────────────────────────
function Step3Showcase({ active, dark }: { active: boolean; dark: boolean }) {
  const [subState, setSubState] = useState(0); // 0: select options, 1: calibrate, 2: output
  const [goal, setGoal] = useState<string | null>(null);
  const [risk, setRisk] = useState<string | null>(null);

  useEffect(() => {
    if (!active) {
      setSubState(0);
      setGoal(null);
      setRisk(null);
      return;
    }

    // Timeline:
    // 1. Select Goal (1000ms)
    // 2. Select Risk (2000ms)
    // 3. Calibrate AI brain (3000ms)
    // 4. Show generated archetype (4200ms)
    const t1 = setTimeout(() => {
      setGoal('Wealth Creation');
    }, 800);

    const t2 = setTimeout(() => {
      setRisk('Balanced');
    }, 1800);

    const t3 = setTimeout(() => {
      setSubState(1);
    }, 2800);

    const t4 = setTimeout(() => {
      setSubState(2);
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [active]);

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-8 py-4">
      
      {/* Dynamic preferences panel */}
      <div className="w-full md:w-[245px] flex flex-col gap-3.5 shrink-0 text-left">
        {/* Goal Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Investment Goal</span>
          <div className="flex flex-col gap-2">
            {['Wealth Creation', 'Retirement', 'Passive Income'].map((option) => {
              const selected = goal === option;
              return (
                <div
                  key={option}
                  className={`px-3 py-2 rounded-lg border text-[10px] font-bold text-left transition-all duration-300 flex justify-between items-center ${
                    selected
                      ? 'bg-purple-500/10 border-purple-500/40 text-purple-300 shadow-md shadow-purple-500/5'
                      : 'bg-transparent border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{option}</span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selected ? 'border-purple-400 bg-purple-500' : 'border-slate-800 bg-transparent'}`}>
                    {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mouse cursor overlay animating over the option */}
          {active && !goal && (
            <motion.div
              animate={{ x: [80, 20, 20], y: [120, 32, 32], opacity: [0, 1, 1] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute w-3.5 h-3.5 bg-white/95 rounded-full flex items-center justify-center shadow-lg pointer-events-none border border-slate-400 z-20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            </motion.div>
          )}
        </div>

        {/* Risk Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 relative">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Risk Profile</span>
          <div className="flex gap-2">
            {['Conservative', 'Balanced', 'Aggressive'].map((option) => {
              const selected = risk === option;
              return (
                <div
                  key={option}
                  className={`flex-1 px-1.5 py-2 rounded-lg border text-[9px] font-black text-center transition-all duration-300 ${
                    selected
                      ? 'bg-purple-500/10 border-purple-500/40 text-purple-300'
                      : 'bg-transparent border-slate-800 text-slate-500'
                  }`}
                >
                  {option}
                </div>
              );
            })}
          </div>

          {/* Mouse cursor overlay animating over the option */}
          {active && goal && !risk && (
            <motion.div
              animate={{ x: [80, 70, 70], y: [80, 28, 28], opacity: [0, 1, 1] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute w-3.5 h-3.5 bg-white/95 rounded-full flex items-center justify-center shadow-lg pointer-events-none border border-slate-400 z-20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            </motion.div>
          )}
        </div>
      </div>

      {/* AI Processing Brain Model or Generated Archetype */}
      <div className="flex-1 w-full h-[235px] flex items-center justify-center bg-slate-950/20 border border-slate-800/40 rounded-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {subState === 0 && (
            <motion.div
              key="brain-inactive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-16 h-16 rounded-full border border-slate-800 flex items-center justify-center bg-slate-900 relative">
                <Brain className="w-8 h-8 text-slate-600" />
              </div>
              <span className="text-[9.5px] text-slate-500 font-mono">Calibrating choices...</span>
            </motion.div>
          )}

          {subState === 1 && (
            <motion.div
              key="brain-processing"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex flex-col items-center gap-3.5"
            >
              <div className="relative flex items-center justify-center">
                {/* Node connection rays */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-26 h-26 rounded-full border border-purple-500/20 border-t-purple-400/60 blur-[1px]"
                />
                <motion.div
                  animate={{ scale: [1.1, 0.95, 1.1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-18 h-18 rounded-full bg-purple-500/10 border-2 border-purple-500 flex items-center justify-center text-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.4)]"
                >
                  <Brain className="w-9 h-9 text-purple-300" />
                </motion.div>
              </div>

              <div className="space-y-0.5 text-center">
                <span className="text-[10px] font-black text-purple-400 font-mono uppercase tracking-widest animate-pulse">Running Calibration</span>
                <p className="text-[9px] text-slate-400">Simulating risk nodes & horizon targets</p>
              </div>
            </motion.div>
          )}

          {subState === 2 && (
            <motion.div
              key="archetype-ticket"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-[230px] bg-gradient-to-br from-purple-950/60 to-slate-900/90 border border-purple-500/30 rounded-xl p-4 shadow-xl relative overflow-hidden"
            >
              {/* Ticket cut-out circles decoration */}
              <div className={`absolute top-1/2 -left-1.5 w-3 h-3 rounded-full border-r border-purple-500/30 -translate-y-1/2 ${dark ? 'bg-[#080E1A]' : 'bg-white'}`} />
              <div className={`absolute top-1/2 -right-1.5 w-3 h-3 rounded-full border-l border-purple-500/30 -translate-y-1/2 ${dark ? 'bg-[#080E1A]' : 'bg-white'}`} />

              <div className="border-b border-white/[0.06] pb-2 mb-2.5 flex justify-between items-center text-left">
                <span className="text-[9px] font-black text-purple-400 font-mono uppercase">AI Profiler</span>
                <span className="text-[8px] text-slate-400 font-mono">Confidence: 96%</span>
              </div>

              <div className="space-y-2 text-left">
                <div>
                  <span className="text-[8.5px] text-slate-500 font-bold uppercase block">Archetype</span>
                  <span className="text-[11.5px] font-black text-white">Growth Alpha Investor</span>
                </div>
                <div className="flex justify-between">
                  <div>
                    <span className="text-[8.5px] text-slate-500 font-bold uppercase block">Horisons</span>
                    <span className="text-[10px] font-bold text-slate-300">Long-term</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] text-slate-500 font-bold uppercase block">Target CAGR</span>
                    <span className="text-[10.5px] font-black text-emerald-400">22.4%</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-dashed border-white/[0.08] text-center">
                <span className="text-[8.5px] font-bold text-purple-400 uppercase tracking-widest">Advisory Ready ✓</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── STEP 4 SHOWCASE: WORKSPACE TERMINAL LAUNCH ────────────────────────────────
function Step4Showcase({ active, onLaunch }: { active: boolean; onLaunch: () => void }) {
  const [subState, setSubState] = useState(0); // 0: loading, 1: stats, 2: active signal, 3: ready, 4: launch button

  useEffect(() => {
    if (!active) {
      setSubState(0);
      return;
    }

    const t1 = setTimeout(() => setSubState(1), 800);
    const t2 = setTimeout(() => setSubState(2), 1800);
    const t3 = setTimeout(() => setSubState(3), 2800);
    const t4 = setTimeout(() => setSubState(4), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [active]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Terminal Board */}
      <div className="w-full max-w-[490px] bg-[#050914] border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col gap-3.5 font-mono text-[10.5px] text-slate-300 ring-1 ring-white/5 h-[270px] justify-between">
        
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-left">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-danger" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8.5px] text-slate-500 font-bold ml-1.5">univest-alpha-terminal v1.2</span>
          </div>
          <span className="text-[8.5px] text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded-sm">SECURE ONLINE</span>
        </div>

        {/* Dashboard inner panels */}
        <div className="flex-1 flex gap-4 items-stretch py-2 text-left">
          {/* Left panel: portfolio value */}
          <div className="flex-1 bg-slate-900/40 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between">
            <div>
              <span className="text-[7.5px] text-slate-500 font-black uppercase">Unified Wealth Balance</span>
              <h5 className="text-[15px] font-black text-white mt-0.5">₹12,45,280.00</h5>
            </div>
            
            {/* Simple static sparkline chart */}
            <div className="h-8 w-full flex items-end gap-[2px] mt-2 relative">
              <svg className="w-full h-full text-emerald-400 overflow-visible" viewBox="0 0 100 30" fill="none">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={subState >= 1 ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  d="M0,25 Q15,28 30,15 T60,10 T80,18 T100,2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            <span className="text-[7.5px] text-emerald-400 font-black mt-1.5 block">▲ +22.4% Est. XIRR</span>
          </div>

          {/* Right panel: advisory alerts */}
          <div className="flex-1 flex flex-col gap-2.5 text-left">
            <AnimatePresence>
              {subState >= 2 && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-2.5 flex flex-col justify-between flex-1 relative overflow-hidden"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[7.5px] font-black text-emerald-400 bg-emerald-500/10 px-1 rounded-sm uppercase">SEBI Call Active</span>
                    <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
                  </div>
                  <div className="mt-1">
                    <h6 className="text-[11px] font-black text-white">RELIANCE BUY</h6>
                    <span className="text-[8.5px] text-slate-400">Entry: ₹3,120 · Target: ₹3,440</span>
                  </div>
                  <span className="text-[7.5px] text-slate-500 block mt-1">One-tap execute enabled</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-2.5 flex justify-between items-center">
              <span className="text-[7.5px] text-slate-500 font-bold uppercase">AI Risk Guard</span>
              <span className="text-[7.5px] text-emerald-400 font-black flex items-center gap-0.5">
                <span className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Launch Overlay */}
        <AnimatePresence>
          {subState >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[#050914]/90 backdrop-blur-xs flex flex-col items-center justify-center gap-3.5 p-4 z-20"
            >
              <div className="text-center space-y-0.5">
                <h4 className="text-sm font-black text-white">Configuration Complete</h4>
                <p className="text-[9.5px] text-slate-400">Your custom wealth space is ready for trading</p>
              </div>

              {subState >= 4 && (
                <motion.button
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLaunch}
                  className="px-6 py-2.5 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white font-black text-[10.5px] rounded-lg shadow-xl shadow-[rgba(21,81,157,0.3)]/25 flex items-center gap-1.5 tracking-wider uppercase cursor-pointer"
                >
                  <span>Launch Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────────
interface Props { theme: 'dark' | 'light' }

export const ScrollStepperSection: React.FC<Props> = ({ theme }) => {
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeStep, setActiveStep] = useState(0);
  const [autoplayKey, setAutoplayKey] = useState(0);

  // Mouse Parallax movement variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [4, -4]);
  const rotateY = useTransform(x, [-300, 300], [-4, 4]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Autoplay handler (advances step every 6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplayKey]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setAutoplayKey((prev) => prev + 1); // Reset timer
  };

  const activeStepData = STEPS[activeStep];

  return (
    <section
      id="how-it-works"
      className="py-20 transition-colors duration-300 relative overflow-hidden bg-transparent"
    >
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient Blurred Mesh Glows */}
        <motion.div
          animate={{
            x: activeStep === 0 ? [-30, 30, -30] : activeStep === 1 ? [10, -20, 10] : [20, -10, 20],
            y: activeStep === 0 ? [-10, 20, -10] : activeStep === 2 ? [30, -10, 30] : [-20, 10, -20],
            backgroundColor:
              activeStep === 0
                ? 'rgba(21, 81, 157, 0.22)' // blue-600
                : activeStep === 1
                  ? 'rgba(16, 185, 129, 0.22)' // emerald-500
                  : activeStep === 2
                    ? 'rgba(139, 92, 246, 0.22)' // purple-600
                    : 'rgba(245, 158, 11, 0.22)' // amber-500
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute top-[20%] left-[15%] w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: activeStep === 0 ? [20, -20, 20] : activeStep === 3 ? [-30, 20, -30] : [10, -10, 10],
            backgroundColor:
              activeStep === 0
                ? 'rgba(6, 182, 212, 0.08)' // cyan-500
                : activeStep === 1
                  ? 'rgba(21, 81, 157, 0.08)' // teal-500
                  : activeStep === 2
                    ? 'rgba(99, 102, 241, 0.08)' // indigo-500
                    : 'rgba(249, 115, 22, 0.08)' // orange-500
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none"
        />

        {/* Particles Overlay */}
        <div className="absolute inset-0 bg-transparent opacity-30">
          <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping [animation-duration:3s]" />
          <div className="absolute bottom-[40%] right-[25%] w-1 h-1 bg-emerald-400 rounded-full animate-ping [animation-duration:4s]" />
          <div className="absolute top-[60%] right-[15%] w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping [animation-duration:5s]" />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-[50px] relative z-10">
        
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className={`text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full border ${
            dark ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-600 bg-emerald-500/8 border-emerald-500/15'
          }`}>
            Seamless Experience
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
            Get Started in Under 3 Minutes
          </h2>
          <p className={`text-sm font-medium ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            Trusted by 50,000+ Investors · Certified Compliant SEBI Advisor
          </p>
        </div>

        {/* ── Horizontal Progress Stepper ─────────────────────────────── */}
        <div className="relative w-full max-w-3xl mx-auto mb-12 px-6">
          {/* Background Connector Bar */}
          <div className={`absolute top-5 left-12 right-12 h-[3px] rounded-full z-0 ${dark ? 'bg-slate-800' : 'bg-slate-200'}`} />
          
          {/* Active Filled Progress Bar */}
          <div className="absolute top-5 left-12 right-12 h-[3px] z-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-primary via-emerald-400 to-amber-400"
            />
          </div>

          {/* Stepper buttons */}
          <div className="relative flex justify-between items-center z-10">
            {STEPS.map((s, i) => {
              const isActive = activeStep === i;
              const isCompleted = activeStep > i;

              return (
                <button
                  key={i}
                  onClick={() => handleStepClick(i)}
                  className="flex flex-col items-center gap-2 group outline-none focus:outline-none cursor-pointer bg-transparent border-0"
                >
                  {/* Circle Step Number */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      backgroundColor: isActive
                        ? '#00000000'
                        : isCompleted
                          ? '#10b981'
                          : dark ? '#172033' : '#F1F5F9',
                      borderColor: isActive
                        ? '#10b981'
                        : isCompleted
                          ? '#10b981'
                          : dark ? '#334155' : '#CBD5E1',
                    }}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-black tracking-tight ${
                      isActive 
                        ? `bg-gradient-to-br ${s.accentFrom} ${s.accentTo} text-white shadow-lg shadow-[rgba(21,81,157,0.3)]/20 ring-4 ${dark ? 'ring-primary/20' : 'ring-primary/10'}` 
                        : isCompleted
                          ? 'text-white'
                          : dark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : s.num}
                  </motion.div>

                  {/* Title Label */}
                  <span
                    className={`text-[10px] sm:text-xs font-bold tracking-tight transition-colors duration-300 ${
                      isActive 
                        ? dark ? 'text-white' : 'text-slate-900'
                        : isCompleted
                          ? dark ? 'text-emerald-400' : 'text-emerald-600'
                          : dark ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    {s.tabTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Large Centerpiece Showcase Container ─────────────────────── */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-12 p-6 relative min-h-[500px]"
        >
          {/* Inner mesh layout reflection */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent" />

          {/* LEFT: Text & Specs Info Column */}
          <div className="w-full md:w-[360px] flex flex-col justify-between gap-6 relative z-10 shrink-0 select-none text-left">
            <div className="space-y-4">
              {/* Badge */}
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md border font-mono ${
                dark ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}>
                {activeStepData.badge}
              </span>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className={`text-3xl font-black tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                  {activeStepData.title}
                </h3>
                <p className={`text-sm leading-relaxed font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {activeStepData.desc}
                </p>
              </div>

              {/* Checklist Logs */}
              <div className="space-y-2 pt-2">
                {activeStepData.checklist.map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-2 text-xs font-bold ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${dark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span className={dark ? 'text-slate-300' : 'text-slate-600'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro details panel */}
            <div className={`border-t pt-4 flex justify-between items-center text-[10px] font-bold ${
              dark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-600'
            }`}>
              <div>
                <span className={`block text-[8px] uppercase font-bold tracking-wider ${dark ? 'text-slate-500' : 'text-slate-600'}`}>Average Time</span>
                <span className={`text-sm font-black ${dark ? 'text-white' : 'text-slate-700'}`}>{activeStepData.avgTime}</span>
              </div>
              <div className="text-right">
                <span className={`block text-[8px] uppercase font-bold tracking-wider ${dark ? 'text-slate-500' : 'text-slate-600'}`}>Security</span>
                <span className={`text-sm font-black ${dark ? activeStepData.textAccent : activeStepData.textAccent.replace('-400', '-600')}`}>{activeStepData.security}</span>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className={`hidden md:block w-[1px] self-stretch ${dark ? 'bg-slate-800/50' : 'bg-slate-200/50'}`} />

          {/* RIGHT: Dynamic Animation Showcase Panel */}
          <div className="flex-1 w-full flex items-center justify-center relative z-10 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="w-full h-full"
              >
                {activeStep === 0 && <Step1Showcase active={activeStep === 0} />}
                {activeStep === 1 && <Step2Showcase active={activeStep === 1} />}
                {activeStep === 2 && <Step3Showcase active={activeStep === 2} dark={dark} />}
                {activeStep === 3 && (
                  <Step4Showcase 
                    active={activeStep === 3} 
                    onLaunch={() => navigate('/signup')}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default ScrollStepperSection;
