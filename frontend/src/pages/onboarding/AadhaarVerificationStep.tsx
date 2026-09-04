import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Fingerprint, Info, Check, Loader2 } from 'lucide-react';

export interface AadhaarData {
  aadhaarNumber: string;
  fullName?: string;
  dob?: string;
  consentGiven: boolean;
  verified: boolean;
}

interface AadhaarVerificationProps {
  initialData?: Partial<AadhaarData>;
  onNext: (data: AadhaarData) => void;
}

export const AadhaarVerificationStep: React.FC<AadhaarVerificationProps> = ({ initialData, onNext }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState(initialData?.aadhaarNumber || '');
  const [consentGiven, setConsentGiven] = useState(initialData?.consentGiven ?? true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  // Mocked Aadhaar (UIDAI) fetched details
  const [verifiedData, setVerifiedData] = useState<{ fullName: string; dob: string } | null>(
    initialData?.verified ? { fullName: initialData.fullName || 'OMAR KHAN', dob: initialData.dob || '15/06/1995' } : null
  );

  const validateAadhaar = (num: string) => /^\d{12}$/.test(num);

  const handleSendOtp = () => {
    if (!aadhaarNumber) {
      setError('Aadhaar number is required');
      return;
    }
    if (!validateAadhaar(aadhaarNumber)) {
      setError('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    setError('');
    setIsVerifying(true);
    
    // Mock API call to send UIDAI OTP
    setTimeout(() => {
      setOtpSent(true);
      setIsVerifying(false);
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    
    setError('');
    setIsVerifying(true);
    
    // Mock API call to verify UIDAI Aadhaar OTP and fetch Name + DOB
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedData({
        fullName: 'OMAR KHAN',
        dob: '15/06/1995'
      });
    }, 1800);
  };

  const handleContinue = () => {
    if (verifiedData) {
      onNext({
        aadhaarNumber,
        fullName: verifiedData.fullName,
        dob: verifiedData.dob,
        consentGiven,
        verified: true
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Identity Verification</h2>
        <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
          Verify your identity using your 12-digit Aadhaar number and OTP to continue account opening.
        </p>
      </div>

      <div className="bg-primary-light/50 border border-[#E2E8F0] rounded-xl p-3 flex gap-2.5 mb-6">
        <div className="mt-0.5"><Shield className="w-4 h-4 text-primary shrink-0" /></div>
        <p className="text-xs font-medium text-primary-dark leading-relaxed">
          Your name and date of birth will be fetched directly from UIDAI upon OTP verification.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Aadhaar Number</label>
          <div className="relative">
            <input
              type="text"
              value={aadhaarNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 12);
                setAadhaarNumber(val);
                setError('');
                setVerifiedData(null);
              }}
              disabled={otpSent || isVerifying || !!verifiedData}
              placeholder="Enter 12-digit Aadhaar number"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-60 text-sm"
            />
            <Fingerprint className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <AnimatePresence>
          {otpSent && !verifiedData && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden pt-1">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Aadhaar OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={isVerifying}
                placeholder="Enter 6-digit OTP"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-center tracking-[0.4em] text-base"
              />
              <p className="text-xs text-slate-500 mt-1.5 text-center">OTP sent to your Aadhaar-linked mobile number.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {verifiedData && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-900 mb-1">Aadhaar Verified via UIDAI</h4>
              <div className="space-y-0.5">
                <div className="text-[11px] text-emerald-700"><span className="font-medium opacity-70">Name:</span> <strong>{verifiedData.fullName}</strong></div>
                <div className="text-[11px] text-emerald-700"><span className="font-medium opacity-70">DOB:</span> <strong>{verifiedData.dob}</strong></div>
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-600 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 shrink-0" /> {error}
          </div>
        )}

        {!verifiedData && (
          <label className="flex items-start gap-2.5 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              disabled={isVerifying}
              className="mt-0.5 shrink-0 w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
            />
            <span className="text-xs text-slate-500 font-medium leading-relaxed">
              I hereby give consent to Univest to verify my Aadhaar details via UIDAI OTP for KYC purposes in accordance with the IT Act 2000.
            </span>
          </label>
        )}

        <div className="pt-2">
          {!otpSent ? (
            <button
              onClick={handleSendOtp}
              disabled={isVerifying || !consentGiven || aadhaarNumber.length !== 12}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
            >
              {isVerifying ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sending OTP...</>
              ) : (
                'Send Aadhaar OTP'
              )}
            </button>
          ) : !verifiedData ? (
            <button
              onClick={handleVerifyOtp}
              disabled={isVerifying || otp.length !== 6}
              className="w-full bg-primary hover:bg-primary-dark disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
            >
              {isVerifying ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Verifying Aadhaar OTP...</>
              ) : (
                <><Check className="w-4 h-4" /> Verify OTP & Fetch Details</>
              )}
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
            >
              Confirm & Continue
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
