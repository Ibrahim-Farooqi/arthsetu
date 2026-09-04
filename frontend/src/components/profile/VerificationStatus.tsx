import React from 'react';
import { BadgeCheck, CheckCircle2, AlertCircle, Clock, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const verifications = [
  { id: '1', title: 'PAN Verification', status: 'verified', date: '12 Jan 2024', verifiedBy: 'NSDL', icon: ShieldCheck },
  { id: '2', title: 'Aadhaar Verification', status: 'verified', date: '12 Jan 2024', verifiedBy: 'UIDAI', icon: ShieldCheck },
  { id: '3', title: 'Mobile Verification', status: 'verified', date: '12 Jan 2024', verifiedBy: 'OTP', icon: ShieldCheck },
  { id: '4', title: 'Email Verification', status: 'verified', date: '12 Jan 2024', verifiedBy: 'Link', icon: ShieldCheck },
  { id: '5', title: 'Bank Verification', status: 'verified', date: '14 Jan 2024', verifiedBy: 'Penny Drop', icon: ShieldCheck },
  { id: '6', title: 'Digital Signature', status: 'pending', date: '--', verifiedBy: '--', icon: AlertCircle },
  { id: '7', title: 'Face Matching', status: 'pending', date: '--', verifiedBy: '--', icon: Clock },
];

export const VerificationStatus: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-brand-navy flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-primary" /> Verification Status
        </h3>
        <span className="text-xs font-bold text-success bg-success/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> KYC Compliant
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {verifications.map((item) => {
          const isVerified = item.status === 'verified';
          
          return (
            <div 
              key={item.id} 
              className={`border rounded-[20px] p-5 transition-shadow hover:shadow-md ${isVerified ? 'bg-white border-[#E2E8F0]' : 'bg-slate-50 border-slate-200'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isVerified ? 'bg-success/10' : 'bg-slate-200'}`}>
                  {isVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <item.icon className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                {isVerified ? (
                  <span className="text-[10px] font-black text-success uppercase tracking-wider">Verified</span>
                ) : (
                  <span className="text-[10px] font-black text-warning uppercase tracking-wider">Pending</span>
                )}
              </div>
              
              <h4 className="text-sm font-black text-brand-navy mb-3">{item.title}</h4>
              
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Date</span>
                  <span className="text-xs font-bold text-slate-700 block">{item.date}</span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Method</span>
                  <span className="text-xs font-bold text-slate-700 block">{item.verifiedBy}</span>
                </div>
              </div>

              {!isVerified && (
                <button 
                  onClick={() => toast(`Starting ${item.title}...`, { icon: '🔄' })}
                  className="w-full mt-4 bg-white border border-slate-300 text-slate-700 text-xs font-black py-2 rounded-lg hover:border-primary hover:text-primary transition"
                >
                  Verify Now
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
