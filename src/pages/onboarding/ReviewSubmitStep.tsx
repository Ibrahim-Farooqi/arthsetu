import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, FileText, ArrowRight } from 'lucide-react';
import type { AadhaarData } from './AadhaarVerificationStep';
import type { PANData } from './PANVerificationStep';
import type { BankData } from './BankDetailsStep';

interface ReviewSubmitStepProps {
  aadhaarData: Partial<AadhaarData>;
  panData: Partial<PANData>;
  bankData: Partial<BankData>;
  onComplete: () => void;
}

export const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = ({ 
  aadhaarData, 
  panData, 
  bankData, 
  onComplete 
}) => {

  const DataRow = ({ label, value }: { label: string, value: string | undefined }) => (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 text-xs">
      <span className="font-medium text-slate-500">{label}</span>
      <span className="font-bold text-slate-900">{value || 'Not provided'}</span>
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Review Application</h2>
        <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
          Please review the details below. Once submitted, your KYC will be processed for account opening.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Identity Details */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-slate-900">Identity Details</h3>
          </div>
          <div className="bg-white rounded-lg border border-slate-100 px-3">
            <DataRow label="Aadhaar Number" value={aadhaarData.aadhaarNumber?.replace(/.(?=.{4})/g, '*')} />
            <DataRow label="Name (from Aadhaar)" value={aadhaarData.fullName} />
            <DataRow label="DOB (from Aadhaar)" value={aadhaarData.dob} />
            <DataRow label="PAN Number" value={panData.panNumber} />
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900">Bank Details</h3>
          </div>
          <div className="bg-white rounded-lg border border-slate-100 px-3">
            <DataRow label="Account Number" value={bankData.accountNumber?.replace(/.(?=.{4})/g, '*')} />
            <DataRow label="IFSC Code" value={bankData.ifscCode} />
          </div>
        </div>

        {/* Documents Signed */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-bold text-slate-900">Agreements</h3>
          </div>
          <div className="bg-white rounded-lg border border-slate-100 px-3 py-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Account Opening Form</span>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Digitally Signed</span>
          </div>
        </div>

      </div>

      <div className="mt-6">
        <button 
          onClick={onComplete}
          className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs shadow-xs hover:shadow-md active:scale-[0.98]"
        >
          Submit Application
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
