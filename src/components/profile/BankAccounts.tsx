import React from 'react';
import { Building2, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const mockBanks = [
  { id: '1', name: 'HDFC Bank Ltd.', logo: 'HDFC', holder: 'RAHUL SHARMA', account: '•••• •••• •••• 4589', ifsc: 'HDFC0001234', isPrimary: true, verified: true },
  { id: '2', name: 'State Bank of India', logo: 'SBI', holder: 'RAHUL SHARMA', account: '•••• •••• •••• 9012', ifsc: 'SBIN0005678', isPrimary: false, verified: true },
];

export const BankAccounts: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h3 className="text-xl font-black text-brand-navy flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" /> Bank Accounts
        </h3>
        <motion.button 
          onClick={() => toast('Opening bank addition flow...', { icon: '🏦' })}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-brand-navy text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-premium hover:bg-slate-800 transition flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" /> Add New Bank
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBanks.map((bank) => (
          <div key={bank.id} className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 md:p-8 shadow-premium flex flex-col justify-between h-full group hover:shadow-premium-lg transition-shadow">
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-slate-400 text-lg">
                  {bank.logo}
                </div>
                <div>
                  <h4 className="text-base font-black text-brand-navy mb-1">{bank.name}</h4>
                  {bank.isPrimary && (
                    <span className="text-[10px] font-black uppercase text-primary bg-primary-light px-2 py-0.5 rounded border border-[#E2E8F0]">
                      Primary Account
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Account Holder</span>
                <span className="text-sm font-bold text-brand-navy block">{bank.holder}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Account Number</span>
                <span className="text-lg font-black tracking-widest text-slate-700 block">{bank.account}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">IFSC Code</span>
                  <span className="text-sm font-bold text-brand-navy block">{bank.ifsc}</span>
                </div>
                {bank.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-success uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
              <button 
                onClick={() => toast(`Editing ${bank.name}...`)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-50 py-2.5 rounded-xl hover:bg-slate-100 hover:text-brand-navy transition"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button 
                onClick={() => toast.error(`Removing ${bank.name}...`)}
                className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-danger bg-rose-50 py-2.5 rounded-xl hover:bg-rose-100 hover:text-rose-700 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};
