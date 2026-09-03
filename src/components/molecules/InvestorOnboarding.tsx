import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, ArrowLeft, Landmark, FileText, Camera, CheckCircle2, RotateCcw, PenTool, Check } from 'lucide-react';
import { Button } from '../atoms/Button';

const STEPS = [
  'Welcome',
  'PAN Card',
  'Aadhaar',
  'Live Selfie',
  'Bank Account',
  'Review Details',
  'Digital Signature',
  'Agreement',
  'Success',
];

export const InvestorOnboarding = () => {
  const [step, setStep] = useState(1);
  const [panNumber, setPanNumber] = useState('');
  const [panName, setPanName] = useState('');
  const [panDob, setPanDob] = useState('');
  const [isScanningPan, setIsScanningPan] = useState(false);
  
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isScanningAadhaar, setIsScanningAadhaar] = useState(false);
  
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [isCapturingSelfie, setIsCapturingSelfie] = useState(false);
  
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [isVerifyingBank, setIsVerifyingBank] = useState(false);
  
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [isSigningAgreement, setIsSigningAgreement] = useState(false);
  const [agreementSigned, setAgreementSigned] = useState(false);

  // Signature Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Setup drawing canvas (Dark stroke for Light Theme)
  useEffect(() => {
    if (step === 7 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#172033'; // Dark Navy stroke
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
      }
    }
  }, [step]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSignature(false);
    }
  };

  const handleSimulatePanOCR = () => {
    setIsScanningPan(true);
    setTimeout(() => {
      setPanNumber('ABCDE1234F');
      setPanName('OMAR KHAN');
      setPanDob('1990-01-01');
      setIsScanningPan(false);
    }, 1500);
  };

  const handleSimulateAadhaarOCR = () => {
    setIsScanningAadhaar(true);
    setTimeout(() => {
      setAadhaarNumber('5432-xxxx-9876');
      setIsScanningAadhaar(false);
    }, 1500);
  };

  const handleCaptureSelfie = () => {
    setIsCapturingSelfie(true);
    setTimeout(() => {
      setSelfieCaptured(true);
      setIsCapturingSelfie(false);
    }, 1800);
  };

  const handleVerifyBank = () => {
    if (!accountNumber || !ifscCode) return;
    setIsVerifyingBank(true);
    setTimeout(() => {
      setBankName('STATE BANK OF INDIA');
      setIsVerifyingBank(false);
    }, 1400);
  };

  const handleSignAgreement = () => {
    setIsSigningAgreement(true);
    setTimeout(() => {
      setIsSigningAgreement(false);
      setAgreementSigned(true);
    }, 2000);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 9));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  
  const handleFinalRedirect = () => {
    window.location.href = '/personalization';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-brand-navy flex flex-col lg:flex-row selection:bg-primary/20 selection:text-primary font-sans">
      
      {/* LEFT PANEL: Responsive steppers list timeline */}
      <div className="lg:w-80 w-full bg-slate-50 border-b lg:border-b-0 lg:border-r border-brand-border p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-success flex items-center justify-center text-white font-extrabold text-base border border-white/5 shadow-premium-sm">
            U
          </div>
          <span className="text-sm font-black tracking-tight text-brand-navy">
            UNIVEST Verification
          </span>
        </div>

        {/* Stepper timeline steps list */}
        <div className="hidden lg:flex flex-col gap-4 py-4">
          <span className="text-[10px] text-brand-secondary font-bold tracking-widest uppercase">KYC Steps Timeline</span>
          <div className="flex flex-col gap-3">
            {STEPS.map((name, idx) => {
              const currentIdx = idx + 1;
              const isCompleted = currentIdx < step;
              const isActive = currentIdx === step;

              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                    isCompleted ? 'bg-success text-white' : isActive ? 'bg-primary text-white shadow-glow-blue' : 'bg-white border border-brand-border text-brand-secondary'
                  }`}>
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : currentIdx}
                  </div>
                  <span className={`text-xs font-bold ${
                    isActive ? 'text-brand-navy' : isCompleted ? 'text-brand-secondary' : 'text-slate-400'
                  }`}>
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress percent stats */}
        <div className="mt-auto border-t border-brand-border pt-4 flex items-center justify-between text-xs text-brand-secondary">
          <div className="flex flex-col gap-0.5">
            <span>Overall Progress</span>
            <span className="font-bold text-brand-navy">{Math.round(((step - 1) / 8) * 100)}% Completed</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] bg-white border border-brand-border rounded-full px-2.5 py-1 text-brand-secondary font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Encrypted</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Wizard Screen flow controllers */}
      <div className="flex-1 flex flex-col justify-between p-6 md:p-12 relative min-h-[500px]">
        {/* Glow ambient highlight */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        {/* Header indicator */}
        <div className="flex items-center justify-between text-xs text-brand-secondary z-10">
          <button
            onClick={prevStep}
            disabled={step === 1 || step === 9}
            className="flex items-center gap-1 hover:text-brand-navy transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-semibold focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span>Step {step} of 9 • {STEPS[step - 1]}</span>
        </div>

        {/* Main active wizard card */}
        <div className="flex-1 max-w-xl w-full mx-auto flex flex-col justify-center my-8 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col gap-6"
            >
              
              {/* STEP 1: Welcome to KYC */}
              {step === 1 && (
                <div className="flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight">Complete Your Investor Verification</h2>
                    <p className="text-sm text-brand-secondary leading-relaxed">
                      To provide stock recommendations, investment services and maintain regulatory compliance, we need to verify your identity.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="bg-white border border-brand-border rounded-card p-4 flex gap-3 shadow-premium-sm">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-success shrink-0"><Check className="w-4 h-4" /></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-brand-navy">Fast Verification</span>
                        <span className="text-[10px] text-brand-secondary">Takes less than 3 minutes to complete.</span>
                      </div>
                    </div>
                    <div className="bg-white border border-brand-border rounded-card p-4 flex gap-3 shadow-premium-sm">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0"><Check className="w-4 h-4" /></div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-brand-navy">Encrypted Data</span>
                        <span className="text-[10px] text-brand-secondary">Your documents are safe with us.</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="primary" onClick={nextStep} className="mt-4 py-4 text-white">
                    <span>Start Verification</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* STEP 2: PAN Card Upload */}
              {step === 2 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight">Verify Your PAN</h2>
                    <p className="text-sm text-brand-secondary">
                      Your Permanent Account Number (PAN) is required for regulatory compliance under SEBI guidelines.
                    </p>
                  </div>

                  {isScanningPan ? (
                    <div className="bg-white border border-brand-border rounded-card p-8 flex flex-col items-center gap-4 text-center border-dashed">
                      <div className="animate-spin h-8 w-8 text-primary border-4 border-t-transparent border-slate-200 rounded-full" />
                      <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider animate-pulse">Scanning PAN OCR...</span>
                    </div>
                  ) : panNumber ? (
                    <div className="bg-gradient-to-tr from-slate-50 via-slate-50 to-primary/5 border border-brand-border rounded-card p-6 flex flex-col gap-4 relative overflow-hidden shadow-premium">
                      <div className="absolute right-4 top-4 text-primary opacity-10"><FileText className="w-20 h-20" /></div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-primary tracking-widest">INCOME TAX DEPARTMENT</span>
                        <span className="text-[9px] bg-success/20 text-success border border-success/35 px-2.5 py-0.5 rounded-full font-bold">VERIFIED</span>
                      </div>

                      <div className="flex flex-col gap-1.5 mt-2">
                        <span className="text-[9px] text-brand-secondary font-bold uppercase tracking-wider">PAN Number</span>
                        <input
                          type="text"
                          value={panNumber}
                          onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                          className="bg-transparent text-lg font-black text-brand-navy focus:outline-none border-b border-transparent focus:border-slate-350 py-0.5"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] text-brand-secondary font-bold uppercase">Cardholder Name</span>
                          <input
                            type="text"
                            value={panName}
                            onChange={(e) => setPanName(e.target.value.toUpperCase())}
                            className="bg-transparent text-xs font-bold text-brand-navy focus:outline-none border-b border-transparent focus:border-slate-350 py-0.5"
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] text-brand-secondary font-bold uppercase">Date of Birth</span>
                          <input
                            type="text"
                            value={panDob}
                            onChange={(e) => setPanDob(e.target.value)}
                            className="bg-transparent text-xs font-bold text-brand-navy focus:outline-none border-b border-transparent focus:border-slate-350 py-0.5"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        onClick={handleSimulatePanOCR}
                        className="bg-white border border-brand-border hover:border-slate-300 rounded-card p-6 flex flex-col items-center gap-3 transition-all select-none text-center border-dashed"
                      >
                        <Camera className="w-7 h-7 text-primary" />
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-brand-navy">Simulate Document Scan</span>
                          <span className="text-[10px] text-brand-secondary">Automatically parses card values under 2 seconds.</span>
                        </div>
                      </button>
                    </div>
                  )}

                  <div className="flex gap-4 mt-2">
                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                    <Button variant="primary" disabled={!panNumber} onClick={nextStep} className="flex-1 text-white">Continue</Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Aadhaar Verification */}
              {step === 3 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight">Verify Your Aadhaar</h2>
                    <p className="text-sm text-brand-secondary">
                      Upload or scan front/back of Aadhaar card to confirm address details.
                    </p>
                  </div>

                  {isScanningAadhaar ? (
                    <div className="bg-white border border-brand-border rounded-card p-8 flex flex-col items-center gap-4 text-center border-dashed">
                      <div className="animate-spin h-8 w-8 text-primary border-4 border-t-transparent border-slate-200 rounded-full" />
                      <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider animate-pulse">Scanning Aadhaar details...</span>
                    </div>
                  ) : aadhaarNumber ? (
                    <div className="bg-white border border-brand-border rounded-card p-5 flex flex-col gap-4 relative overflow-hidden shadow-premium-sm">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">UIDAI Identity Card</span>
                        <span className="text-[9px] bg-success/20 text-success border border-success/35 px-2 py-0.5 rounded-full font-bold">VERIFIED</span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[9px] text-brand-secondary font-bold uppercase">Masked Aadhaar Number</span>
                        <span className="text-lg font-black tracking-wider text-brand-navy">{aadhaarNumber}</span>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handleSimulateAadhaarOCR}
                      className="bg-white border border-brand-border hover:border-slate-300 rounded-card p-6 flex flex-col items-center gap-3 transition-all text-center border-dashed"
                    >
                      <Camera className="w-7 h-7 text-primary" />
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-brand-navy">Scan Aadhaar Document</span>
                        <span className="text-[10px] text-brand-secondary">Fast extraction with secure mask layer.</span>
                      </div>
                    </button>
                  )}

                  <div className="flex gap-4 mt-2">
                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                    <Button variant="primary" disabled={!aadhaarNumber} onClick={nextStep} className="flex-1 text-white">Continue</Button>
                  </div>
                </div>
              )}

              {/* STEP 4: Live Selfie */}
              {step === 4 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight">Verify Your Identity</h2>
                    <p className="text-sm text-brand-secondary">
                      Confirm you are matching identity cards by taking a quick live selfie.
                    </p>
                  </div>

                  {isCapturingSelfie ? (
                    <div className="bg-white border border-brand-border rounded-card p-8 flex flex-col items-center gap-4 text-center border-dashed">
                      <div className="animate-spin h-8 w-8 text-primary border-4 border-t-transparent border-slate-200 rounded-full" />
                      <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider animate-pulse">Activating secure camera...</span>
                    </div>
                  ) : selfieCaptured ? (
                    <div className="bg-white border border-brand-border rounded-card p-6 flex flex-col items-center gap-4 text-center shadow-premium-sm">
                      <div className="w-20 h-20 rounded-full border-4 border-success flex items-center justify-center text-success bg-success/10">
                        <Check className="w-10 h-10" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-brand-navy">Selfie Matched Successfully</span>
                        <span className="text-[10px] text-brand-secondary">Live test score matches database credentials.</span>
                      </div>
                      <button
                        onClick={() => setSelfieCaptured(false)}
                        className="text-xs text-primary hover:underline flex items-center gap-1.5 mt-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Selfie</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleCaptureSelfie}
                      className="bg-white border border-brand-border hover:border-slate-300 rounded-card p-6 flex flex-col items-center gap-3 transition-all text-center border-dashed"
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center text-primary relative">
                        <Camera className="w-6 h-6" />
                        <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-brand-navy">Open Selfie Camera</span>
                        <span className="text-[10px] text-brand-secondary">Center face in frame with neutral expression.</span>
                      </div>
                    </button>
                  )}

                  <div className="flex gap-4 mt-2">
                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                    <Button variant="primary" disabled={!selfieCaptured} onClick={nextStep} className="flex-1 text-white">Continue</Button>
                  </div>
                </div>
              )}

              {/* STEP 5: Link Bank Account */}
              {step === 5 && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight">Link Your Bank Account</h2>
                    <p className="text-sm text-brand-secondary">
                      Link account details to route payouts and fund allocations securely.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-brand-secondary uppercase">Account Number</label>
                        <input
                          type="text"
                          placeholder="Enter account number"
                          value={accountNumber}
                          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
                          className="bg-slate-50 border border-brand-border rounded-input px-4 py-3 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-brand-secondary uppercase">IFSC Code</label>
                        <input
                          type="text"
                          placeholder="SBIN0001234"
                          value={ifscCode}
                          onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                          className="bg-slate-50 border border-brand-border rounded-input px-4 py-3 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      onClick={handleVerifyBank}
                      disabled={!accountNumber || !ifscCode || isVerifyingBank}
                      className="py-3 text-xs flex items-center justify-center gap-1.5"
                    >
                      {isVerifyingBank ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full" />
                          <span>Verifying Account...</span>
                        </>
                      ) : (
                        <>
                          <Landmark className="w-4 h-4 text-primary" />
                          <span>Verify Bank Details</span>
                        </>
                      )}
                    </Button>

                    {bankName && (
                      <div className="bg-slate-50 border border-brand-border p-4 rounded-button flex items-center justify-between text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-brand-navy">{bankName}</span>
                          <span className="text-brand-secondary font-semibold">IFSC: {ifscCode}</span>
                        </div>
                        <span className="text-success font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Connected
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-2">
                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                    <Button variant="primary" disabled={!bankName} onClick={nextStep} className="flex-1 text-white">Continue</Button>
                  </div>
                </div>
              )}

              {/* STEP 6: Review Collected Info */}
              {step === 6 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight">Review Your KYC Profile</h2>
                    <p className="text-sm text-brand-secondary">
                      Double check all information extracted from identity cards before signature.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 max-h-[280px] overflow-y-auto pr-1">
                    {/* PAN Card Row */}
                    <div className="bg-white border border-brand-border rounded-card p-4 flex items-center justify-between text-xs shadow-premium-sm">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-brand-secondary font-bold uppercase">PAN Document</span>
                        <span className="font-black text-brand-navy">{panNumber} ({panName})</span>
                      </div>
                      <button onClick={() => setStep(2)} className="text-xs text-primary font-bold">Edit</button>
                    </div>

                    {/* Aadhaar Row */}
                    <div className="bg-white border border-brand-border rounded-card p-4 flex items-center justify-between text-xs shadow-premium-sm">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-brand-secondary font-bold uppercase">Aadhaar masked</span>
                        <span className="font-black text-brand-navy">{aadhaarNumber}</span>
                      </div>
                      <button onClick={() => setStep(3)} className="text-xs text-primary font-bold">Edit</button>
                    </div>

                    {/* Selfie Row */}
                    <div className="bg-white border border-brand-border rounded-card p-4 flex items-center justify-between text-xs shadow-premium-sm">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-brand-secondary font-bold uppercase">Live Selfie</span>
                        <span className="font-bold text-success flex items-center gap-1 mt-0.5"><Check className="w-3.5 h-3.5" /> Matched</span>
                      </div>
                      <button onClick={() => setStep(4)} className="text-xs text-primary font-bold">Edit</button>
                    </div>

                    {/* Bank Link Row */}
                    <div className="bg-white border border-brand-border rounded-card p-4 flex items-center justify-between text-xs shadow-premium-sm">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-brand-secondary font-bold uppercase">Bank details</span>
                        <span className="font-bold text-brand-navy">{bankName}</span>
                      </div>
                      <button onClick={() => setStep(5)} className="text-xs text-primary font-bold">Edit</button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                    <Button variant="primary" onClick={nextStep} className="flex-1 text-white">Confirm KYC Profile</Button>
                  </div>
                </div>
              )}

              {/* STEP 7: Digital Signature Canvas */}
              {step === 7 && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight">Draw Your Signature</h2>
                    <p className="text-sm text-brand-secondary">
                      Sign on the screen to certify details. This signature is encrypted onto disclaimers.
                    </p>
                  </div>

                  {/* Draw Canvas wrapper */}
                  <div className="relative bg-slate-50 border border-brand-border rounded-card overflow-hidden h-48 select-none flex items-center justify-center shadow-premium-sm">
                    {!hasSignature && (
                      <div className="absolute pointer-events-none flex flex-col items-center gap-1.5 text-slate-400">
                        <PenTool className="w-6 h-6" />
                        <span className="text-xs font-semibold">Draw signature inside this block</span>
                      </div>
                    )}
                    <canvas
                      ref={canvasRef}
                      width={480}
                      height={192}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="absolute inset-0 w-full h-full cursor-crosshair z-10"
                    />
                  </div>

                  <div className="flex justify-end gap-3 -mt-2">
                    <button
                      onClick={clearCanvas}
                      className="text-xs font-semibold text-brand-secondary hover:text-brand-navy transition-colors flex items-center gap-1 py-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Clear Canvas</span>
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                    <Button variant="primary" disabled={!hasSignature} onClick={nextStep} className="flex-1 text-white">Continue</Button>
                  </div>
                </div>
              )}

              {/* STEP 8: Investment Agreement (DocuSign layout) */}
              {step === 8 && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black tracking-tight">Accept Platform Disclaimers</h2>
                    <p className="text-sm text-brand-secondary">
                      Read regulatory investment terms before signing SEBI documents.
                    </p>
                  </div>

                  {/* DocuSign scrollable text layout */}
                  <div className="bg-slate-50 border border-brand-border rounded-card p-5 h-44 overflow-y-auto text-[11px] leading-relaxed text-brand-secondary flex flex-col gap-3 shadow-premium-sm">
                    <h4 className="font-bold text-brand-navy uppercase tracking-wider text-xs">Section 1: Advisory Terms & Disclaimers</h4>
                    <p>
                      Stock investments are subject to market risks. Past accuracy win-rates do not guarantee future returns. Recommendations are validated by registered SEBI researchers but remain advisory.
                    </p>
                    <h4 className="font-bold text-brand-navy uppercase tracking-wider text-xs">Section 2: Privacy Agreement & Authentication</h4>
                    <p>
                      By signing this document, you confirm that PAN details, Aadhaar credentials, and linked Bank allocations are owned solely by you. Identity matches selfie verification checks.
                    </p>
                  </div>

                  {isSigningAgreement ? (
                    <div className="bg-white border border-brand-border rounded-card p-6 flex flex-col items-center gap-3 text-center border-dashed">
                      <div className="animate-spin h-6 w-6 text-primary border-2 border-slate-200 border-t-transparent rounded-full" />
                      <span className="text-xs text-brand-secondary font-bold uppercase tracking-wider animate-pulse">Applying digital signature stamp...</span>
                    </div>
                  ) : agreementSigned ? (
                    <div className="bg-success/5 border border-success/20 p-4 rounded-button flex items-center justify-between text-xs text-success">
                      <span className="font-bold">Agreement Signed Electronically</span>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={agreeChecked}
                        onChange={(e) => setAgreeChecked(e.target.checked)}
                        className="w-4.5 h-4.5 border border-brand-border rounded bg-white text-primary focus:ring-primary focus:ring-2 mt-0.5 shrink-0 animate-none"
                      />
                      <label htmlFor="agree" className="text-[11px] text-brand-secondary leading-normal select-none">
                        I confirm that the digital signature drawn is authentic and I have read and agree to all compliance disclaimers and SEBI platform advisory terms.
                      </label>
                    </div>
                  )}

                  <div className="flex gap-4 pt-1">
                    <Button variant="secondary" onClick={prevStep}>Back</Button>
                    {!agreementSigned ? (
                      <Button
                        variant="primary"
                        disabled={!agreeChecked || isSigningAgreement}
                        onClick={handleSignAgreement}
                        className="flex-1 py-4 bg-gradient-to-r from-primary to-[#5A35F0] text-white"
                      >
                        Sign Agreement
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={nextStep} className="flex-1 py-4 text-white">
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 9: Onboarding Complete Success */}
              {step === 9 && (
                <div className="flex flex-col gap-6 text-center items-center py-6">
                  <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center text-success shadow-[0_0_24px_rgba(22,163,74,0.15)] animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    <h2 className="text-2xl font-black tracking-tight text-brand-navy">Verification Completed Successfully</h2>
                    <p className="text-xs md:text-sm text-brand-secondary leading-relaxed max-w-sm mx-auto">
                      Your investor profile has been verified successfully. You can now explore AI-powered research, investment recommendations and portfolio tracking.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 bg-slate-100 border border-brand-border rounded-full px-3 py-1.5 text-[10px] text-brand-secondary font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>KYC COMPLETED & VERIFIED</span>
                  </div>

                  <Button variant="primary" onClick={handleFinalRedirect} className="w-full mt-4 py-4 bg-gradient-to-r from-primary to-[#5A35F0] shadow-glow-blue border border-white/5 font-bold text-white">
                    <span>Continue to Dashboard</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Security watermark footer */}
        <div className="flex items-center gap-1.5 text-[10px] text-brand-secondary justify-center z-10 border-t border-slate-100 pt-6">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Secured with 256-bit encryption. KYC verified by registered SEBI intermediaries.</span>
        </div>

      </div>
    </div>
  );
};
export default InvestorOnboarding;
