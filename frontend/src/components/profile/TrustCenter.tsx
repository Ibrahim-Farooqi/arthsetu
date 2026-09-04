import React from 'react';
import { ShieldCheck, Landmark, CheckCircle2, Shield, AlertCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const TrustCenter: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#172033] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" /> Account Health & Security Dashboard
        </h2>
        <span className="text-xs font-bold text-slate-400">SEBI Registered Identity Verification</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1: ACCOUNT HEALTH SCORE */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Account Health</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">96% Complete</span>
          </div>

          <div className="flex items-center gap-4 my-2">
            <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                <circle 
                  cx="50" cy="50" r="42" 
                  fill="none" 
                  stroke="#16A34A" 
                  strokeWidth="10" 
                  strokeDasharray="264" 
                  strokeDashoffset="12" 
                  strokeLinecap="round" 
                />
              </svg>
              <span className="absolute text-sm font-black text-[#172033]">96%</span>
            </div>
            <div>
              <span className="text-xs font-black text-[#172033] block">Almost Complete</span>
              <span className="text-[10px] text-slate-500 font-medium">Add nominee details for 100% protection</span>
            </div>
          </div>

          <button 
            onClick={() => toast.success('Redirecting to nominee form...')}
            className="text-[10px] font-black text-primary uppercase flex items-center gap-1 hover:underline pt-2 border-t border-slate-100"
          >
            Add Nominee Details <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* CARD 2: LINKED ACCOUNTS */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Linked Accounts</span>
            <span className="text-xs font-black text-primary bg-primary-light px-2 py-0.5 rounded-md">Active</span>
          </div>

          <div className="my-2">
            <span className="text-xl font-black text-[#172033] block mb-1">2 Banks · 1 Broker</span>
            <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed">
              HDFC Bank (Primary) & ICICI Bank linked. Zerodha Kite connected for live execution.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-[10px] font-extrabold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Portfolio Auto-Sync Active</span>
          </div>
        </div>

        {/* CARD 3: VERIFICATION STATUS */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Verification Status</span>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">All Verified</span>
          </div>

          <div className="my-2">
            <span className="text-xl font-black text-[#172033] block mb-1">6/6 Clear</span>
            <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed">
              PAN, Aadhaar, Face KYC, Email, Mobile & Bank Account verified.
            </p>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 pt-2 border-t border-slate-100">
            <CheckCircle2 className="w-3.5 h-3.5" /> Full SEBI Direct Clearance
          </div>
        </div>

        {/* CARD 4: SECURITY STATUS */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Security Status</span>
            <span className="text-xs font-black text-primary bg-primary-light px-2 py-0.5 rounded-md">98/100</span>
          </div>

          <div className="my-2">
            <span className="text-xl font-black text-[#172033] block mb-1">High Protection</span>
            <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed">
              2FA Authenticator active. Biometric Face ID enabled on 2 trusted devices.
            </p>
          </div>

          <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 text-[10px] font-extrabold text-slate-600">
            <Shield className="w-3.5 h-3.5 text-primary" /> 2 Trusted Active Sessions
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrustCenter;
