import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Button } from '../../components/atoms/Button';

export interface PersonalDetailsData {
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  address: string;
  city: string;
  state: string;
  pincode: string;
  occupation: string;
  annualIncome: string;
}

interface PersonalDetailsProps {
  initialData?: Partial<PersonalDetailsData>;
  onNext: (data: PersonalDetailsData) => void;
}

export const PersonalDetailsStep: React.FC<PersonalDetailsProps> = ({ initialData, onNext }) => {
  const [formData, setFormData] = useState<PersonalDetailsData>({
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    mobile: initialData?.mobile || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    gender: (initialData?.gender as any) || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    pincode: initialData?.pincode || '',
    occupation: initialData?.occupation || '',
    annualIncome: initialData?.annualIncome || ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PersonalDetailsData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof PersonalDetailsData, string>> = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.mobile) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = 'Enter valid 10-digit mobile number';

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';

    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="w-full max-w-xl mx-auto space-y-6 font-sans text-slate-900"
    >
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Personal Details</h2>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Provide your demographic details to continue.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Full Name (as per PAN Card) <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Omar Khan"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition ${
                errors.fullName ? 'border-danger focus:ring-4 focus:ring-rose-50' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-blue-50'
              }`}
            />
          </div>
          {errors.fullName && <span className="text-[11px] font-bold text-danger mt-1 block">{errors.fullName}</span>}
        </div>

        {/* Email & Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Email Address <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-900 outline-none transition ${
                  errors.email ? 'border-danger focus:ring-4 focus:ring-rose-50' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-blue-50'
                }`}
              />
            </div>
            {errors.email && <span className="text-[11px] font-bold text-danger mt-1 block">{errors.email}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mobile Number <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="9876543210"
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-900 outline-none transition ${
                  errors.mobile ? 'border-danger focus:ring-4 focus:ring-rose-50' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-blue-50'
                }`}
              />
            </div>
            {errors.mobile && <span className="text-[11px] font-bold text-danger mt-1 block">{errors.mobile}</span>}
          </div>
        </div>

        {/* Date of Birth & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-900 outline-none transition ${
                  errors.dateOfBirth ? 'border-danger focus:ring-4 focus:ring-rose-50' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-blue-50'
                }`}
              />
            </div>
            {errors.dateOfBirth && <span className="text-[11px] font-bold text-danger mt-1 block">{errors.dateOfBirth}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Gender <span className="text-danger">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
              className={`w-full px-3.5 py-3 bg-white border rounded-xl text-sm font-medium text-slate-900 outline-none transition ${
                errors.gender ? 'border-danger focus:ring-4 focus:ring-rose-50' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-blue-50'
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span className="text-[11px] font-bold text-danger mt-1 block">{errors.gender}</span>}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Residential Address <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="House/Flat No, Street, Locality"
              className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 outline-none transition ${
                errors.address ? 'border-danger focus:ring-4 focus:ring-rose-50' : 'border-slate-200 focus:border-primary focus:ring-4 focus:ring-blue-50'
              }`}
            />
          </div>
          {errors.address && <span className="text-[11px] font-bold text-danger mt-1 block">{errors.address}</span>}
        </div>

        {/* City, State, Pincode */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Mumbai"
              className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition"
            />
            {errors.city && <span className="text-[10px] font-bold text-danger mt-0.5 block">{errors.city}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              placeholder="Maharashtra"
              className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition"
            />
            {errors.state && <span className="text-[10px] font-bold text-danger mt-0.5 block">{errors.state}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Pincode *</label>
            <input
              type="text"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              placeholder="400001"
              className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition"
            />
            {errors.pincode && <span className="text-[10px] font-bold text-danger mt-0.5 block">{errors.pincode}</span>}
          </div>
        </div>

        {/* Occupation & Income */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Occupation *</label>
            <select
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition"
            >
              <option value="">Select Occupation</option>
              <option value="salaried">Salaried Employee</option>
              <option value="self-employed">Self-Employed / Business</option>
              <option value="professional">Professional</option>
              <option value="student">Student / Homemaker</option>
            </select>
            {errors.occupation && <span className="text-[11px] font-bold text-danger mt-1 block">{errors.occupation}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Annual Income *</label>
            <select
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              className="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-50 transition"
            >
              <option value="">Select Income Bracket</option>
              <option value="1-5lakh">₹1 Lakh - ₹5 Lakh</option>
              <option value="5-10lakh">₹5 Lakh - ₹10 Lakh</option>
              <option value="10-25lakh">₹10 Lakh - ₹25 Lakh</option>
              <option value=">25lakh">Above ₹25 Lakh</option>
            </select>
            {errors.annualIncome && <span className="text-[11px] font-bold text-danger mt-1 block">{errors.annualIncome}</span>}
          </div>
        </div>

      </div>

      <div className="pt-4 flex justify-between items-center">
        <button onClick={() => {}} className="text-sm font-bold text-slate-500 opacity-0 pointer-events-none">Back</button>
        <Button
          onClick={handleSubmit}
          className="px-8 py-3.5 rounded-xl text-sm"
          icon={<ChevronRight className="w-4 h-4" />}
          iconPosition="right"
        >
          Next Step
        </Button>
      </div>
    </motion.div>
  );
};

export default PersonalDetailsStep;
