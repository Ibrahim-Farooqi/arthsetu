import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, ArrowRight, CreditCard, Fingerprint, Landmark, Clock, Camera } from 'lucide-react';
import { Button } from '../../components/atoms/Button';

interface WelcomeStepProps {
  onNext: () => void;
}

const requirements = [
  { icon: CreditCard, label: 'PAN Card', desc: 'Govt-issued tax identity', color: 'text-orange-500 bg-orange-50 border-orange-100' },
  { icon: Fingerprint, label: 'Aadhaar Card', desc: 'Front + Back photos', color: 'text-primary bg-primary-light border-[#E2E8F0]' },
  { icon: Camera, label: 'Live Selfie', desc: 'Face biometric capture', color: 'text-violet-500 bg-violet-50 border-violet-100' },
  { icon: Landmark, label: 'Bank Details', desc: 'Account + IFSC code', color: 'text-emerald-500 bg-emerald-50 border-emerald-100' },
];

const guarantees = [
  { label: 'Takes less than 3 minutes', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  { label: 'Bank-grade 256-bit encryption', color: 'text-primary bg-primary-light border-[#E2E8F0]' },
  { label: 'SEBI mandated & compliant', color: 'text-primary bg-primary-light border-indigo-100' },
];

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col max-w-xl"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 bg-primary-light text-primary rounded-xl flex items-center justify-center border border-indigo-100 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-emerald-600">
            <Clock className="w-3 h-3" />
            <span>~3 minutes to complete</span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
          Complete Your Investor Verification
        </h1>
        <p className="text-slate-500 font-normal leading-relaxed text-xs">
          To provide SEBI-compliant research advisory services, we need to verify your identity. Secure, fast and one-time only.
        </p>
      </div>

      {/* What you'll need */}
      <div className="mb-6">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">What you'll need</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {requirements.map((req, i) => (
            <motion.div
              key={req.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-slate-200 rounded-xl p-3 flex items-start gap-2.5 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${req.color}`}>
                <req.icon className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{req.label}</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">{req.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Guarantee badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {guarantees.map((g) => (
          <div key={g.label} className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold ${g.color}`}>
            <Check className="w-3 h-3" />
            <span>{g.label}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onNext}
        className="w-full sm:w-auto self-start px-6 py-2.5 text-xs font-bold rounded-lg"
        icon={<ArrowRight className="w-3.5 h-3.5" />}
        iconPosition="right"
      >
        Start Verification
      </Button>
    </motion.div>
  );
};

