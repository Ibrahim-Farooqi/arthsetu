import React from 'react';

export const SignupIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md flex flex-col items-center justify-center font-sans">
      <svg viewBox="0 0 400 360" className="w-full h-auto drop-shadow-2xl">
        <defs>
          <linearGradient id="signupGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#15519D" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Wealth Compounding Tree Structure */}
        <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="2" strokeDasharray="8 8" />
        <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(21, 81, 157, 0.2)" strokeWidth="1.5" />

        {/* Central Shield Icon */}
        <rect x="170" y="170" width="60" height="60" rx="18" fill="#10B981" />
        <path d="M190 200 L197 207 L212 192" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Orbital Nodes */}
        <g>
          {/* Node 1: SEBI Compliance */}
          <circle cx="200" cy="80" r="18" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          <text x="200" y="85" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="900">SEBI</text>

          {/* Node 2: AI Advisor */}
          <circle cx="300" cy="170" r="18" fill="#1E293B" stroke="#15519D" strokeWidth="2" />
          <text x="300" y="174" textAnchor="middle" fill="#15519D" fontSize="10" fontWeight="900">AI</text>

          {/* Node 3: Portfolio compounding */}
          <circle cx="280" cy="270" r="18" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
          <text x="280" y="274" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="900">₹</text>

          {/* Node 4: Instant Trade */}
          <circle cx="100" cy="230" r="18" fill="#1E293B" stroke="#8B5CF6" strokeWidth="2" />
          <text x="100" y="234" textAnchor="middle" fill="#8B5CF6" fontSize="10" fontWeight="900">F&O</text>
        </g>
      </svg>
    </div>
  );
};

export default SignupIllustration;
