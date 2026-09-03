import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // Supabase's password-reset email links land here with a recovery
      // session already established (see resetPasswordForEmail's
      // redirectTo in auth.service.ts); updateUser() sets the new password
      // against that session.
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setIsSuccess(true);
      toast.success('Password reset successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not reset password. Try the link again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="w-full max-w-md bg-[#172033] border border-slate-800 rounded-[32px] p-8 shadow-2xl">
        
        {isSuccess ? (
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-white">Password Updated</h2>
            <p className="text-xs text-slate-400">Your password has been reset securely. You can now login with your new password.</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-black text-xs rounded-xl transition shadow-md cursor-pointer mt-2"
            >
              Sign In Now
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-black text-white tracking-tight">Create New Password</h1>
              <p className="text-xs text-slate-400 mt-1">Enter your new password below.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">New Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Confirm New Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-4 py-3 bg-[#1E293B] border border-slate-700 rounded-xl text-xs font-medium text-white outline-none focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
              <span>{isLoading ? 'Updating Password...' : 'Reset Password'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;
