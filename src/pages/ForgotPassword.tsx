import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Check, ArrowRight, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import authService from '../services/auth.service';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setIsLoading(true);
    try {
      await authService.resetPasswordForEmail(email);
      setIsSent(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not send reset link. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="w-full max-w-md bg-[#172033] border border-slate-800 rounded-[32px] p-8 shadow-2xl">
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-primary/20 border border-primary/30 rounded-2xl flex items-center justify-center text-[#64748B] mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Reset Password</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {isSent ? (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-white">Reset Link Dispatched</h3>
            <p className="text-xs text-slate-400">We sent instructions to <span className="text-white font-bold">{email}</span></p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-black text-xs rounded-xl transition shadow-md cursor-pointer mt-2"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white placeholder-slate-500 outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              <span>{isLoading ? 'Sending Link...' : 'Send Reset Link'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full text-center text-xs font-bold text-slate-400 hover:text-slate-200 cursor-pointer pt-2"
            >
              ← Back to Login
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ForgotPassword;
