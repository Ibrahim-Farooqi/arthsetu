import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, ShieldCheck, CreditCard, Lock, Eye, Bell, Globe, 
  Sun, Moon, Laptop, Volume2, Shield, Landmark, FileText, CheckCircle2, 
  UserPlus, Percent, KeyRound, ExternalLink, HelpCircle, Save, Smartphone
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

interface ProfileSettingsCenterProps {
  onAddFunds?: () => void;
}

export const ProfileSettingsCenter: React.FC<ProfileSettingsCenterProps> = ({ onAddFunds }) => {
  // Option Tabs definition from User Request
  const tabs = [
    'Account Details',
    'Personal Details',
    'My Brokerage Plans',
    'Privacy and Security',
    'Settings',
    'Other Details',
    'Nomination Details'
  ] as const;

  type TabType = typeof tabs[number];
  const [activeSubTab, setActiveSubTab] = useState<TabType>('Account Details');

  const { user } = useAuth();
  const defaultClientId = user?.id?.substring(0, 8).toUpperCase() || 'UNIV-8912';

  // Form states
  const [accountDetails, setAccountDetails] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    pan: 'ABCDE1234F',
    role: user?.role || 'Individual Investor',
    clientId: defaultClientId
  });

  React.useEffect(() => {
    if (user) {
      setAccountDetails(prev => ({
        ...prev,
        fullName: user.full_name || '',
        email: user.email || '',
        phone: user.phone_number || '',
        role: user.role || 'Individual Investor',
        clientId: user.id?.substring(0, 8).toUpperCase() || prev.clientId
      }));
    }
  }, [user]);

  const [personalDetails, setPersonalDetails] = useState({
    dob: '1995-08-15',
    gender: 'Male',
    occupation: 'Professional / Salaried',
    incomeSlab: '₹10,00,000 - ₹25,00,000',
    maritalStatus: 'Single',
    address: 'Flat 402, Signature Residency, Bandra West, Mumbai, MH - 400050'
  });

  const [nomineeDetails, setNomineeDetails] = useState({
    name: 'Amina Khan',
    relationship: 'Mother',
    dob: '1970-11-20',
    share: '100%',
    idProof: 'Aadhaar Card'
  });

  // Settings states
  const [theme, setTheme] = useState<'Light' | 'Dark' | 'System'>('Light');
  const [currency, setCurrency] = useState('INR (₹)');
  const [compactDensity, setCompactDensity] = useState(false);
  const [whatsappDigest, setWhatsappDigest] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);

  // Security Toggles
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  const handleSave = (sectionName: string) => {
    toast.success(`${sectionName} saved successfully!`);
  };

  return (
    <div className="w-full flex flex-col gap-10 font-sans text-slate-800 pb-20 animate-in fade-in duration-500">
      
      {/* ----------------------------------------------------
          1. HEADER PANEL
          ---------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-[28px] p-6 sm:p-8 bg-[#172033] text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-[#64748B]" />
              <span className="text-xs font-black text-[#64748B] uppercase tracking-widest">Investor Profile</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black leading-none tracking-tight">
              Profile & Settings
            </h1>
            <p className="text-xs text-slate-300 font-medium leading-relaxed mt-2.5 max-w-xl">
              Configure personal verification documents, nomination holdings allocation, security layers, linked bank accounts, and platform display settings.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleSave(activeSubTab)}
              className="px-5 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          2. TAB NAVIGATION (HORIZONTAL BAR FROM USER REQUEST SCREENSHOT)
          ---------------------------------------------------- */}
      <div className="w-full bg-[#172033] rounded-2xl p-1 shadow-md border border-slate-800 flex overflow-x-auto whitespace-nowrap scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-5 py-3.5 rounded-xl text-xs font-black transition-all cursor-pointer relative ${
                isActive ? 'text-white bg-primary shadow-glow-blue' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{tab}</span>
            </button>
          );
        })}
      </div>

      {/* ----------------------------------------------------
          3. DYNAMIC CONTENT SURFACE
          ---------------------------------------------------- */}
      <div className="bg-white rounded-[28px] border border-slate-200 p-6 sm:p-8 shadow-xs min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            
            {/* ACCOUNT DETAILS */}
            {activeSubTab === 'Account Details' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-black text-[#172033]">Account Details</h3>
                  <p className="text-xs text-slate-400 font-medium">Verify your registered account identifier and regulatory client profile details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Full Name</label>
                    <input 
                      type="text" 
                      value={accountDetails.fullName}
                      onChange={(e) => setAccountDetails({...accountDetails, fullName: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Email Address</label>
                    <input 
                      type="email" 
                      value={accountDetails.email}
                      onChange={(e) => setAccountDetails({...accountDetails, email: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Mobile Phone</label>
                    <input 
                      type="text" 
                      value={accountDetails.phone}
                      onChange={(e) => setAccountDetails({...accountDetails, phone: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">PAN Card Number</label>
                    <input 
                      type="text" 
                      value={accountDetails.pan}
                      disabled
                      className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 outline-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Client Account ID</label>
                    <input 
                      type="text" 
                      value={accountDetails.clientId}
                      disabled
                      className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 outline-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Investor Classification</label>
                    <input 
                      type="text" 
                      value={accountDetails.role}
                      disabled
                      className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 outline-none" 
                    />
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold mt-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>SEBI Compliant Demat account synced. Last verification timestamp: Today 10:24 AM.</span>
                </div>
              </div>
            )}

            {/* PERSONAL DETAILS */}
            {activeSubTab === 'Personal Details' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-black text-[#172033]">Personal Details</h3>
                  <p className="text-xs text-slate-400 font-medium">Verify or edit your personal profile information.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Date of Birth</label>
                    <input 
                      type="date" 
                      value={personalDetails.dob}
                      onChange={(e) => setPersonalDetails({...personalDetails, dob: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Gender</label>
                    <select
                      value={personalDetails.gender}
                      onChange={(e) => setPersonalDetails({...personalDetails, gender: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Occupation / Profession</label>
                    <select
                      value={personalDetails.occupation}
                      onChange={(e) => setPersonalDetails({...personalDetails, occupation: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary"
                    >
                      <option>Professional / Salaried</option>
                      <option>Business Owner / Self-Employed</option>
                      <option>Retired</option>
                      <option>Student</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Annual Income Slabs</label>
                    <select
                      value={personalDetails.incomeSlab}
                      onChange={(e) => setPersonalDetails({...personalDetails, incomeSlab: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary"
                    >
                      <option>Below ₹5,00,000</option>
                      <option>₹5,00,000 - ₹10,00,000</option>
                      <option>₹10,00,000 - ₹25,00,000</option>
                      <option>Above ₹25,00,000</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Registered Residential Address</label>
                    <textarea 
                      rows={2}
                      value={personalDetails.address}
                      onChange={(e) => setPersonalDetails({...personalDetails, address: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MY BROKERAGE PLANS */}
            {activeSubTab === 'My Brokerage Plans' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-black text-[#172033]">My Brokerage Plans</h3>
                  <p className="text-xs text-slate-400 font-medium">Link, synchronize, and configure zero-commission brokerage schemas with linked stockbrokers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-5 border border-slate-200 rounded-2xl flex flex-col gap-3 justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-sm font-black text-slate-900 block">Zerodha Kite</strong>
                        <span className="text-[10px] text-emerald-600 font-black flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Synced & Active
                        </span>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs">ZE</div>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 border-t border-slate-100 pt-3">
                      <span>Brokerage Scheme:</span>
                      <span className="text-slate-900 font-black">Zero Equity Delivery</span>
                    </div>
                    <button 
                      onClick={() => toast.success('Re-authenticating Zerodha session')}
                      className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10px] font-black border border-slate-200 rounded-xl mt-2 cursor-pointer"
                    >
                      Sync Broker Connection
                    </button>
                  </div>

                  <div className="p-5 border border-slate-200 rounded-2xl flex flex-col gap-3 justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-sm font-black text-slate-900 block">AngelOne</strong>
                        <span className="text-[10px] text-slate-400 font-bold block mt-1">Not Linked</span>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xs">AO</div>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500 border-t border-slate-100 pt-3">
                      <span>Plan benefit:</span>
                      <span className="text-slate-900 font-black">₹0 Equity Intraday</span>
                    </div>
                    <button 
                      onClick={() => toast.success('Redirecting to AngelOne OAuth portal')}
                      className="w-full py-2 bg-primary hover:bg-primary-dark text-white text-[10px] font-black rounded-xl mt-2 cursor-pointer"
                    >
                      Link Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PRIVACY AND SECURITY */}
            {activeSubTab === 'Privacy and Security' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-black text-[#172033]">Privacy and Security</h3>
                  <p className="text-xs text-slate-400 font-medium">Protect your capital and trade operations with high-grade security tools.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-xs text-[#172033]">Two-Factor Authentication (2FA)</h4>
                      <span className="text-[10px] text-slate-400 font-bold block">Verify transactions via SMS / Email OTP on all executions</span>
                    </div>
                    <button
                      onClick={() => { setTwoFactor(!twoFactor); toast.success('2FA Status toggled'); }}
                      className={`w-12 h-6 rounded-full transition relative ${twoFactor ? 'bg-emerald-600' : 'bg-slate-300'}`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition ${twoFactor ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-xs text-[#172033]">Biometric App Lock</h4>
                      <span className="text-[10px] text-slate-400 font-bold block">Unlock Univest via mobile TouchID or FaceID credentials</span>
                    </div>
                    <button
                      onClick={() => { setBiometrics(!biometrics); toast.success('Biometrics preference updated'); }}
                      className={`w-12 h-6 rounded-full transition relative ${biometrics ? 'bg-emerald-600' : 'bg-slate-300'}`}
                    >
                      <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition ${biometrics ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>

                {/* Password modification */}
                <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
                  <h4 className="font-black text-xs text-[#172033] uppercase tracking-wider">Change Account Password</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input 
                      type="password" 
                      placeholder="Current Password" 
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary" 
                    />
                    <input 
                      type="password" 
                      placeholder="New Password" 
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary" 
                    />
                    <button 
                      onClick={() => toast.success('Password updated successfully')}
                      className="py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-black transition cursor-pointer text-center"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activeSubTab === 'Settings' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-black text-[#172033]">Display & Notification Settings</h3>
                  <p className="text-xs text-slate-400 font-medium">Personalize visual parameters and regional compliance rules.</p>
                </div>

                {/* Appearance switcher */}
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Theme Mode</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'Light', icon: <Sun className="w-4 h-4 text-amber-500" />, desc: 'Crisp Light' },
                      { id: 'Dark', icon: <Moon className="w-4 h-4 text-primary" />, desc: 'OLED Dark' },
                      { id: 'System', icon: <Laptop className="w-4 h-4 text-primary" />, desc: 'Sync OS' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => { setTheme(opt.id as any); toast.success(`Visual theme set to ${opt.id}`); }}
                        className={`p-4 border rounded-xl flex items-center gap-3 transition cursor-pointer text-xs font-black ${
                          theme === opt.id ? 'border-primary bg-primary-light/50 text-[#172033]' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {opt.icon}
                        <div>
                          <span className="block">{opt.id}</span>
                          <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{opt.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Regional Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Preferred Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary"
                    >
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block mb-1">WhatsApp Daily Digest</span>
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-xs font-bold text-slate-500">Send morning stock calls directly</span>
                      <button
                        onClick={() => setWhatsappDigest(!whatsappDigest)}
                        className={`w-10 h-5 rounded-full transition relative ${whatsappDigest ? 'bg-primary' : 'bg-slate-300'}`}
                      >
                        <span className={`w-4.5 h-4.5 rounded-full bg-white absolute top-0.25 transition ${whatsappDigest ? 'right-0.25' : 'left-0.25'}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OTHER DETAILS */}
            {activeSubTab === 'Other Details' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-black text-[#172033]">Other Profile Details</h3>
                  <p className="text-xs text-slate-400 font-medium">Manage linked bank accounts for fund transfers and view active identity documents.</p>
                </div>

                {/* Bank Account Details */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Primary Linked Bank Account</span>
                  <div className="p-4 border border-slate-200 rounded-2xl flex items-center justify-between hover:border-primary transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-xs shrink-0">HD</div>
                      <div>
                        <strong className="text-xs font-black text-slate-900 block">HDFC Bank Limited</strong>
                        <span className="text-[10px] text-slate-400 font-bold block">Acc: •••• •••• 9812 | IFSC: HDFC0000060</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                      Primary
                    </span>
                  </div>
                </div>

                {/* Identity Verification */}
                <div className="border-t border-slate-100 pt-6 flex flex-col gap-4">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">KYC Verification Files</span>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'PAN Card Verification File', status: 'Verified' },
                      { name: 'Aadhaar Address Reference', status: 'Verified' }
                    ].map((doc, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-xs font-semibold">
                        <span>{doc.name}</span>
                        <span className="text-[10px] font-black text-emerald-600">{doc.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* NOMINATION DETAILS */}
            {activeSubTab === 'Nomination Details' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-black text-[#172033]">Nomination Details</h3>
                  <p className="text-xs text-slate-400 font-medium">Add or verify registered nominees for wealth distribution claims and security compliance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Nominee Full Name</label>
                    <input 
                      type="text" 
                      value={nomineeDetails.name}
                      onChange={(e) => setNomineeDetails({...nomineeDetails, name: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Relationship</label>
                    <select
                      value={nomineeDetails.relationship}
                      onChange={(e) => setNomineeDetails({...nomineeDetails, relationship: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary"
                    >
                      <option>Mother</option>
                      <option>Father</option>
                      <option>Spouse</option>
                      <option>Child</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Date of Birth</label>
                    <input 
                      type="date" 
                      value={nomineeDetails.dob}
                      onChange={(e) => setNomineeDetails({...nomineeDetails, dob: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">Asset Allocation Share</label>
                    <input 
                      type="text" 
                      value={nomineeDetails.share}
                      onChange={(e) => setNomineeDetails({...nomineeDetails, share: e.target.value})}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-primary" 
                    />
                  </div>
                </div>

                <div className="p-4 bg-primary-light border border-[#E2E8F0] text-primary-dark text-xs rounded-xl flex items-center gap-2 font-bold mt-2">
                  <UserPlus className="w-4 h-4 shrink-0 text-primary" />
                  <span>Regulatory nominee status: Registered under NSDL Demat schema. Share allocation is locked at 100%.</span>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default ProfileSettingsCenter;
