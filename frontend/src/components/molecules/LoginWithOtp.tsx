import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Mail, MessageSquareCode, Phone, ShieldCheck, Sparkles, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../atoms/Button';
import authService from '../../services/auth.service';

type AuthTab = 'login' | 'signup';

export const LoginWithOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { email?: string } | null;
  const params = new URLSearchParams(window.location.search);

  const isSignupPath = location.pathname === '/signup' || location.pathname === '/register';
  const initialTab: AuthTab = isSignupPath || params.get('tab') === 'signup' || params.get('mode') === 'new' ? 'signup' : 'login';

  const [tab, setTab] = useState<AuthTab>(initialTab);
  const [emailOrPhone, setEmailOrPhone] = useState(state?.email || params.get('email') || '');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [useOtpLogin, setUseOtpLogin] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [resendAfter, setResendAfter] = useState(30);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const isSignup = tab === 'signup';

  useEffect(() => {
    if (!otpSent || resendAfter === 0) return;
    const timer = window.setTimeout(() => setResendAfter(value => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [otpSent, resendAfter]);

  useEffect(() => {
    if (otpSent) window.setTimeout(() => otpRefs.current[0]?.focus(), 150);
  }, [otpSent]);

  const friendlyAuthError = (error: unknown): string => {
    const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
    // Supabase's default copy is already end-user friendly for the common
    // cases (wrong password, user already registered, invalid OTP, etc).
    return message;
  };

  const finishAuthSequence = () => {
    // AuthContext listens to Supabase's onAuthStateChange directly, so the
    // moment supabase.auth.signInWithPassword/signUp/verifyOtp resolves
    // successfully, isAuthenticated flips to true app-wide — no manual
    // token plumbing needed here.
    if (isSignup) {
      toast.success('ArthSetu Account created! Let\'s personalize your experience.');
      navigate('/onboarding');
    } else {
      toast.success('Welcome back to ArthSetu!');
      navigate('/dashboard');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!emailOrPhone.trim() || (!useOtpLogin && !password.trim())) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    try {
      if (useOtpLogin) {
        await authService.sendOtp(emailOrPhone);
        setOtpSent(true);
        toast.success(`OTP code sent to ${emailOrPhone}`);
      } else {
        await authService.signInWithPassword({ email: emailOrPhone, password });
        finishAuthSequence();
      }
    } catch (error) {
      setErrorMessage(friendlyAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !emailAddress.trim() || !password.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('Please accept ArthSetu\'s Terms of Use and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    try {
      const { session } = await authService.signUpWithPassword({
        email: emailAddress,
        password,
        fullName,
        mobileNumber: mobileNumber || undefined,
      });
      if (session) {
        // Email confirmations are off for this Supabase project — session
        // is issued immediately.
        finishAuthSequence();
      } else {
        // Email confirmations are on — Supabase sent a verification link
        // instead of returning a session directly.
        toast.success('Check your email to confirm your account, then sign in.');
        switchTab('login');
      }
    } catch (error) {
      setErrorMessage(friendlyAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.some(val => !val)) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      await authService.verifyOtp(isSignup ? emailAddress : emailOrPhone, otp.join(''));
      finishAuthSequence();
    } catch (error) {
      setErrorMessage(friendlyAuthError(error));
      setOtp(Array(6).fill(''));
      otpRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otp.every(Boolean)) verifyOtp();
  }, [otp]);

  const setDigit = (index: number, raw: string) => {
    const next = [...otp];
    next[index] = raw.replace(/\D/g, '').slice(-1);
    setOtp(next);
    if (next[index] && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const switchTab = (next: AuthTab) => {
    setTab(next);
    setOtpSent(false);
    setErrorMessage('');
    setOtp(Array(6).fill(''));
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#172033] flex flex-col lg:flex-row font-sans">
      {/* LEFT COLUMN: BRAND HERO & PLATFORM VALUE */}
      <div className="lg:w-5/12 bg-gradient-to-br from-[#123B63] to-[#15519D] p-8 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Grids & Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-2xl text-white shadow-lg">
              A
            </div>
            <div>
              <span className="font-black text-2xl tracking-tight text-white block">ARTHSETU</span>
              <span className="text-[10px] font-bold text-blue-200 tracking-widest uppercase">Investment Advisory & Intelligence</span>
            </div>
          </div>

          <div className="space-y-4 my-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-100">
              <Sparkles className="w-4 h-4 text-emerald-400" /> AI-POWERED INVESTMENT INTEL
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Investment Intelligence. <br />
              <span className="text-emerald-400">Made Clear.</span>
            </h1>
            <p className="text-blue-100/80 text-base leading-relaxed max-w-md font-medium">
              Research, insights and AI-powered intelligence to help you make better, data-driven investment decisions.
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/15 space-y-3">
          <div className="flex items-center gap-3 text-xs font-semibold text-blue-100">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Research & Advisory Intelligence · Not a Brokerage Portal</span>
          </div>
          <p className="text-[11px] text-blue-200/60 font-medium">
            Join thousands of investors using ArthSetu scorecards, AI thesis breakdowns, and portfolio monitoring.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: AUTHENTICATION FORM */}
      <div className="lg:w-7/12 flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 bg-[#F8FAFC]">
        <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-[28px] border border-[#E2E8F0] shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] relative">
          
          <button
            onClick={() => navigate('/')}
            className="group mb-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#172033] transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" /> Back to home
          </button>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-[#F1F5F9] rounded-2xl">
            <button
              type="button"
              onClick={() => switchTab('login')}
              className={`py-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                !isSignup ? 'bg-white text-[#15519D] shadow-sm' : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchTab('signup')}
              className={`py-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                isSignup ? 'bg-white text-[#15519D] shadow-sm' : 'text-[#64748B] hover:text-[#172033]'
              }`}
            >
              Create Account
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!otpSent ? (
              !isSignup ? (
                /* LOGIN FORM */
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleLoginSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#172033] tracking-tight">Welcome back</h2>
                    <p className="text-xs text-[#64748B] font-medium">Sign in to continue to your ArthSetu dashboard.</p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-1.5">
                      Email or Mobile Number
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="Enter your email or mobile number"
                        className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 rounded-xl text-sm font-medium text-[#172033] outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  {!useOtpLogin ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider">Password</label>
                        <button
                          type="button"
                          onClick={async () => {
                            if (!emailOrPhone.trim()) {
                              toast.error('Enter your email above first.');
                              return;
                            }
                            try {
                              await authService.resetPasswordForEmail(emailOrPhone);
                              toast.success('Password reset link sent to your registered email');
                            } catch (error) {
                              toast.error(friendlyAuthError(error));
                            }
                          }}
                          className="text-xs font-extrabold text-[#15519D] hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-10 pr-10 py-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 rounded-xl text-sm font-medium text-[#172033] outline-none transition"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3.5 text-[#64748B] hover:text-[#172033] cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 font-semibold text-[#64748B] cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-[#CBD5E1] text-[#15519D] focus:ring-[#15519D]" />
                      <span>Remember me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setUseOtpLogin(!useOtpLogin)}
                      className="font-bold text-[#15519D] hover:underline cursor-pointer"
                    >
                      {useOtpLogin ? 'Use password instead' : 'Log in with OTP'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{useOtpLogin ? 'Send OTP →' : 'Login →'}</span>
                  </button>

                  <div className="text-center pt-4 border-t border-[#E2E8F0]">
                    <span className="text-xs text-[#64748B] font-medium">Don't have an account? </span>
                    <button
                      type="button"
                      onClick={() => switchTab('signup')}
                      className="text-xs font-extrabold text-[#15519D] hover:underline ml-1 cursor-pointer"
                    >
                      Create Account
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* CREATE ACCOUNT FORM */
                <motion.form
                  key="signup-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleSignUpSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-[#172033] tracking-tight">Create your ArthSetu account</h2>
                    <p className="text-xs text-[#64748B] font-medium">Set up your account in less than a minute.</p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 rounded-xl text-sm font-medium text-[#172033] outline-none transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-1.5">Mobile Number</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="10-digit mobile"
                          className="w-full pl-10 pr-3 py-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 rounded-xl text-sm font-medium text-[#172033] outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-3 py-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 rounded-xl text-sm font-medium text-[#172033] outline-none transition"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create password"
                          className="w-full pl-10 pr-3 py-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 rounded-xl text-sm font-medium text-[#172033] outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#172033] uppercase tracking-wider mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter password"
                          className="w-full pl-10 pr-3 py-3 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 rounded-xl text-sm font-medium text-[#172033] outline-none transition"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2 text-xs text-[#64748B] font-medium leading-tight cursor-pointer">
                      <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 rounded border-[#CBD5E1] text-[#15519D] focus:ring-[#15519D]"
                      />
                      <span>
                        By creating an account, you agree to ArthSetu's <a href="#" className="text-[#15519D] font-bold hover:underline">Terms of Use</a> and <a href="#" className="text-[#15519D] font-bold hover:underline">Privacy Policy</a>.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-[#15519D] hover:bg-[#123B63] text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Create Account →</span>
                  </button>

                  <div className="text-center pt-3 border-t border-[#E2E8F0]">
                    <span className="text-xs text-[#64748B] font-medium">Already have an account? </span>
                    <button
                      type="button"
                      onClick={() => switchTab('login')}
                      className="text-xs font-extrabold text-[#15519D] hover:underline ml-1 cursor-pointer"
                    >
                      Login
                    </button>
                  </div>
                </motion.form>
              )
            ) : (
              /* OTP VERIFICATION STEP */
              <motion.div key="otp" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-[#172033]">Verify your email</h2>
                    <p className="mt-1 text-xs text-[#64748B] font-medium">
                      Enter the 6-digit code sent to <span className="font-bold text-[#172033]">{emailOrPhone || emailAddress}</span>
                    </p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                </div>

                <div className="flex justify-between gap-2 py-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={node => { otpRefs.current[index] = node; }}
                      value={digit}
                      onChange={event => setDigit(index, event.target.value)}
                      onKeyDown={event => {
                        if (event.key === 'Backspace' && !otp[index] && index) otpRefs.current[index - 1]?.focus();
                      }}
                      inputMode="numeric"
                      maxLength={1}
                      className="h-12 w-11 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-center text-lg font-black text-[#172033] outline-none focus:border-[#15519D] focus:ring-4 focus:ring-blue-100 transition"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#15519D]">
                  <button type="button" onClick={() => setOtpSent(false)} className="hover:underline cursor-pointer">
                    Edit details
                  </button>
                  <span>Resend code in {resendAfter}s</span>
                </div>

                <Button
                  onClick={verifyOtp}
                  disabled={otp.some(val => !val)}
                  isLoading={isLoading}
                  className="w-full py-3.5 text-sm font-extrabold bg-[#15519D] hover:bg-[#123B63]"
                  icon={<CheckCircle2 className="h-4 w-4" />}
                >
                  Verify & Enter ArthSetu
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default LoginWithOtp;
