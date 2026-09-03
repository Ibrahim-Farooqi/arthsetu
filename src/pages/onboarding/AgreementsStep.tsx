import React, { useState } from 'react';
import { FileText, Shield, Check, Download, Pen, Loader2, Maximize, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AgreementsProps {
  onComplete: () => void;
}

export const AgreementsStep: React.FC<AgreementsProps> = ({ onComplete }) => {
  const [signatureText, setSignatureText] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!signatureText.trim()) {
      setError('Please type your full name as a digital signature.');
      return;
    }
    if (!agreed) {
      setError('You must read and agree to the Account Opening Documents.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  const handleDownload = () => {
    // Mock download action
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Mock Account Opening Document Content.\n\nSEBI registered advisory terms and conditions...');
    link.download = 'Univest_Account_Opening_Form.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const mockTermsContent = (
    <div className="space-y-4">
      <h4 className="font-black text-lg text-slate-900 mb-4 text-center">UNIVEST ACCOUNT OPENING AGREEMENT & TERMS OF SERVICE</h4>
      
      <p>This Account Opening Agreement ("Agreement") is entered into by and between Univest (the "Company") and the undersigned user ("Client").</p>
      
      <h5 className="font-bold text-slate-900 mt-6">1. SEBI Research Analyst (RA) Terms</h5>
      <p>Univest operates as a SEBI Registered Research Analyst. By opening this account, the Client acknowledges that the Company provides research and advisory services. All recommendations are based on technical and fundamental analysis. Past performance is not indicative of future results.</p>
      
      <h5 className="font-bold text-slate-900 mt-6">2. Risk Disclosure</h5>
      <p>Investing in securities markets involves market risks. Read all the related documents carefully before investing. The Client assumes full responsibility for any trading or investment decisions made based on the Company's research.</p>

      <h5 className="font-bold text-slate-900 mt-6">3. KYC and Account Authorization</h5>
      <p>The Client authorizes the Company to process and verify the provided Know Your Customer (KYC) details through relevant third-party providers such as UIDAI, KRA, and CKYC in accordance with applicable laws.</p>
      
      <h5 className="font-bold text-slate-900 mt-6">4. Digital Signature Consent</h5>
      <p>In accordance with the Information Technology Act, 2000, the Client agrees that typing their name in the signature field and clicking "Sign & Continue" constitutes a legally binding digital signature, equivalent to a physical handwritten signature.</p>
      
      <div className="mt-8 pt-8 border-t border-slate-200">
        <p className="text-xs text-slate-500 italic">Document ID: UNIV-AGR-2024</p>
        <p className="text-xs text-slate-500 italic">Last Updated: October 2023</p>
      </div>
    </div>
  );

  return (
    <div className="w-full relative">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Account Opening Forms</h2>
        <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
          Please review your account opening documents and provide your digital signature to proceed.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Inline Document View */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-xs">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                <FileText className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Account Opening Form</h3>
                <p className="text-[10px] text-slate-500 font-medium">Includes SEBI RA Terms</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsExpanded(true)}
                className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
                title="Enlarge Document"
              >
                <Maximize className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleDownload}
                className="p-1.5 text-slate-500 hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="p-4 h-52 overflow-y-auto text-xs text-slate-700 leading-relaxed font-serif bg-[#fdfbf7] custom-scrollbar border-b border-slate-100">
             {mockTermsContent}
          </div>
          
          <div className="p-2.5 bg-slate-50 text-[10px] text-center text-slate-500 font-medium">
            Scroll to read full terms. You can also enlarge or download the document.
          </div>
        </div>

        {/* Digital Signature */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <label className="block text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <Pen className="w-3.5 h-3.5 text-slate-500" /> Digital Signature
          </label>
          <input
            type="text"
            value={signatureText}
            onChange={(e) => {
              setSignatureText(e.target.value);
              setError('');
            }}
            placeholder="Type your full legal name"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-serif italic text-sm placeholder:not-italic placeholder:text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <p className="text-[10px] text-slate-500 mt-1.5 flex items-start gap-1">
            <Shield className="w-3 h-3 shrink-0 text-emerald-500 mt-0.5" />
            <span>Under IT Act 2000, your typed name serves as a legally binding digital signature for this document.</span>
          </p>
        </div>

        {/* Consent Checkbox */}
        <label className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => {
              setAgreed(e.target.checked);
              setError('');
            }}
            className="mt-0.5 shrink-0 w-3.5 h-3.5 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
          />
          <span className="text-xs text-slate-700 font-medium leading-relaxed">
            I have read and understood the Account Opening Documents. I agree to the SEBI registered Research Advisory terms and authorize Univest to process my KYC.
          </span>
        </label>

        {error && (
          <div className="p-2.5 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-600 flex items-center gap-2">
            <span className="shrink-0 font-black">!</span> {error}
          </div>
        )}

        <div className="pt-1">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !signatureText.trim() || !agreed}
            className="w-full bg-primary hover:bg-primary-dark disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
          >
            {isSubmitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Signing...</>
            ) : (
              <><Check className="w-4 h-4" /> Sign & Continue</>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Document Modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Univest Account Form
              </h3>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-bold transition-colors"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-8 md:p-12 overflow-y-auto text-sm text-slate-700 leading-relaxed font-serif bg-[#fdfbf7] flex-1">
              {mockTermsContent}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
