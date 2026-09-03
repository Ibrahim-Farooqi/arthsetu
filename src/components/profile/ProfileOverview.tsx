import React from 'react';
import { User, Mail, Phone, MapPin, Building, Link2, ShieldAlert, CreditCard } from 'lucide-react';

interface ProfileOverviewProps {
  onNavigate?: (tab: 'Overview' | 'Personal Details' | 'Verification' | 'Bank Accounts' | 'Security' | 'Documents' | 'Activity') => void;
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Personal Info Summary */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium lg:col-span-2 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-6 flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Full Name</span>
              <span className="text-sm font-black text-brand-navy block">Rahul Sharma</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Date of Birth</span>
              <span className="text-sm font-black text-brand-navy block">14 Aug 1992</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Email Address</span>
              <span className="text-sm font-bold text-brand-navy flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> rahul.sharma@example.com
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Mobile Number</span>
              <span className="text-sm font-bold text-brand-navy flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> +91 98765 43210
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Address</span>
              <span className="text-sm font-bold text-brand-navy flex items-start gap-2 max-w-sm">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" /> 
                A-102, Blue Ridge Apartments, Hinjewadi Phase 1, Pune, Maharashtra 411057
              </span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400">Last updated: 12 July 2026</span>
          <button 
            onClick={() => onNavigate && onNavigate('Personal Details')}
            className="text-xs font-black text-primary hover:text-primary transition"
          >
            Update Details
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Default Bank */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
          <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-4 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-500" /> Primary Bank
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              <span className="font-black text-slate-600">HDFC</span>
            </div>
            <div>
              <span className="text-sm font-black text-brand-navy block">HDFC Bank Ltd.</span>
              <span className="text-xs text-slate-500 block">•••• 4589</span>
            </div>
          </div>
        </div>

        {/* Linked Brokers */}
        <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
          <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-4 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-indigo-500" /> Linked Brokers
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-navy">Zerodha</span>
              <span className="text-[10px] font-black text-success bg-success/10 px-2 py-1 rounded uppercase">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-navy">Upstox</span>
              <span className="text-[10px] font-black text-success bg-success/10 px-2 py-1 rounded uppercase">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Details */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
        <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-amber-500" /> Subscription Plan
        </h3>
        <div className="bg-gradient-to-r from-slate-900 to-brand-navy p-5 rounded-xl text-white mb-4 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-black tracking-wider uppercase">Pro Elite</span>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-md font-bold">Active</span>
          </div>
          <span className="text-2xl font-black block">₹999<span className="text-xs text-slate-400 font-medium">/yr</span></span>
        </div>
        <p className="text-[11px] text-slate-500 font-medium">Renews automatically on 15 Oct 2026. Includes AI Insights, Priority Support, and Zero Brokerage on F&O.</p>
      </div>

      {/* Security Status */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-premium">
        <h3 className="text-sm font-black uppercase tracking-wider text-brand-navy mb-4 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-primary" /> Security Status
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600">Password</span>
            <span className="text-[10px] font-bold text-slate-400">Changed 2 mos ago</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600">Two-Factor (2FA)</span>
            <span className="text-[10px] font-black text-success bg-success/10 px-2 py-1 rounded uppercase">Enabled</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600">Biometric Login</span>
            <span className="text-[10px] font-black text-success bg-success/10 px-2 py-1 rounded uppercase">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
