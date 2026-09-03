import React, { useState } from 'react';
import { Shield, Info, Check, Loader2, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PANData {
  panNumber: string;
  fullName: string;
  dob: string;
  verified: boolean;
}

interface PANVerificationProps {
  initialData?: Partial<PANData>;
  onNext: (data: PANData) => void;
}

export const PANVerificationStep: React.FC<PANVerificationProps> = ({ initialData, onNext }) => {
  const [panNumber, setPanNumber] = useState(initialData?.panNumber || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const validatePAN = (pan: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

  const handleVerifyAndContinue = () => {
    if (!panNumber) {
      setError('PAN number is required');
      return;
    }
    if (!validatePAN(panNumber)) {
      setError('Please enter a valid 10-character PAN number (e.g. ABCDE1234F)');
      return;
    }
    
    setError('');
    setIsVerifying(true);
    
    // Mock API call to verify PAN with NSDL and immediately proceed to next step
    setTimeout(() => {
      setIsVerifying(false);
      onNext({
        panNumber,
        fullName: initialData?.fullName || '',
        dob: initialData?.dob || '',
        verified: true
      });
    }, 1200);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">PAN Verification</h2>
        <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
          As per SEBI guidelines, your PAN is required to invest in financial markets.
        </p>
      </div>

      <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-3 flex gap-2.5 mb-6">
        <div className="mt-0.5"><Shield className="w-4 h-4 text-orange-500 shrink-0" /></div>
        <p className="text-[11px] font-medium text-orange-800 leading-relaxed">
          Your PAN details are securely verified directly with the Income Tax Department database (NSDL).
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">PAN Number</label>
          <div className="relative">
            <input
              type="text"
              value={panNumber}
              onChange={(e) => {
                setPanNumber(e.target.value.toUpperCase().slice(0, 10));
                setError('');
              }}
              disabled={isVerifying}
              placeholder="e.g. ABCDE1234F"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 uppercase text-xs"
            />
            <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {error && (
          <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-600 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 shrink-0" /> {error}
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={handleVerifyAndContinue}
            disabled={isVerifying || panNumber.length !== 10}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
          >
            {isVerifying ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Verifying PAN...</>
            ) : (
              <><Check className="w-4 h-4" /> Verify PAN & Continue</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
