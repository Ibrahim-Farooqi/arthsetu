import React from 'react';
import { Shield, Key, Smartphone, Fingerprint, History, Laptop, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const SecuritySettings: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Login & Security */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 md:p-8 shadow-premium">
        <h3 className="text-xl font-black text-brand-navy flex items-center gap-2 mb-8">
          <Shield className="w-5 h-5 text-primary" /> Login & Security
        </h3>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <Key className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <span className="text-sm font-black text-brand-navy block">Account Password</span>
                <span className="text-xs text-slate-500 block mt-1">Last changed 2 months ago</span>
              </div>
            </div>
            <button 
              onClick={() => toast('Password reset link sent to email.', { icon: '📧' })}
              className="text-xs font-black bg-slate-50 text-brand-navy px-4 py-2 rounded-lg hover:bg-slate-100 transition whitespace-nowrap"
            >
              Change Password
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <span className="text-sm font-black text-brand-navy block">Two-Factor Authentication (2FA)</span>
                <span className="text-xs text-slate-500 block mt-1">Receive an OTP on your registered mobile number for every login.</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                <Fingerprint className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <span className="text-sm font-black text-brand-navy block">Biometric Login</span>
                <span className="text-xs text-slate-500 block mt-1">Use FaceID or TouchID to unlock the application quickly.</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 md:p-8 shadow-premium">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-brand-navy flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-500" /> Active Sessions
          </h3>
          <button 
            onClick={() => toast.success('Logged out of all other devices.')}
            className="text-[10px] font-black uppercase text-danger hover:text-rose-700 transition"
          >
            Log out of all devices
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Laptop className="w-6 h-6 text-primary" />
              <div>
                <span className="text-sm font-black text-brand-navy block">MacBook Pro 16"</span>
                <span className="text-xs text-slate-500 block">Pune, India • Chrome • <span className="text-success font-bold">Active Now</span></span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Smartphone className="w-6 h-6 text-slate-400" />
              <div>
                <span className="text-sm font-black text-brand-navy block">iPhone 14 Pro Max</span>
                <span className="text-xs text-slate-500 block">Mumbai, India • iOS App • Last active 2 hours ago</span>
              </div>
            </div>
            <button 
              onClick={() => toast.success('Session terminated.')}
              className="text-slate-400 hover:text-danger transition p-2"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
