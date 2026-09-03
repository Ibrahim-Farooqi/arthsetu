import React, { useState } from 'react';
import { UserCircle, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const PersonalDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 md:p-8 shadow-premium w-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-brand-navy flex items-center gap-2">
          <UserCircle className="w-5 h-5 text-primary" /> Personal Details
        </h3>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-xs font-black bg-slate-50 text-brand-navy px-4 py-2 rounded-lg hover:bg-slate-100 transition"
          >
            Edit Info
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 px-3 py-2 flex items-center gap-1"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
            <button 
              onClick={() => {
                setIsEditing(false);
                toast.success('Personal details updated successfully!');
              }}
              className="text-xs font-black bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition flex items-center gap-1 shadow-glow-blue"
            >
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        )}
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name (As per PAN)</label>
          <input 
            type="text" 
            defaultValue="Rahul Sharma" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>
        
        {/* Date of Birth */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date of Birth</label>
          <input 
            type="text" 
            defaultValue="14 Aug 1992" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gender</label>
          <select 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Occupation */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Occupation</label>
          <select 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          >
            <option>Salaried</option>
            <option>Self Employed</option>
            <option>Business</option>
            <option>Student</option>
          </select>
        </div>

        {/* PAN */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PAN Number</label>
          <input 
            type="text" 
            defaultValue="ABCDE1234F" 
            disabled={true} 
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-slate-500 outline-none disabled:opacity-60 cursor-not-allowed"
          />
          <span className="text-[9px] text-slate-400 font-medium">Cannot be changed once verified.</span>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            defaultValue="rahul.sharma@example.com" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mobile Number</label>
          <input 
            type="tel" 
            defaultValue="+91 98765 43210" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <h4 className="text-xs font-black uppercase text-brand-navy mb-4 border-b border-slate-100 pb-2">Address Details</h4>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Address</label>
          <input 
            type="text" 
            defaultValue="A-102, Blue Ridge Apartments, Hinjewadi Phase 1" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>

        {/* City & State */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">City</label>
          <input 
            type="text" 
            defaultValue="Pune" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">State</label>
          <input 
            type="text" 
            defaultValue="Maharashtra" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>

        {/* Postal Code & Country */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Postal Code</label>
          <input 
            type="text" 
            defaultValue="411057" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Country</label>
          <input 
            type="text" 
            defaultValue="India" 
            disabled={!isEditing}
            className="bg-transparent border-b border-slate-200 py-2 text-sm font-black text-brand-navy outline-none focus:border-primary transition-colors disabled:opacity-80"
          />
        </div>

      </form>
    </div>
  );
};
