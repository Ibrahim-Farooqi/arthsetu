import React from 'react';

export const LoginIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-md flex flex-col items-center justify-center font-sans">
      <svg viewBox="0 0 400 360" className="w-full h-auto drop-shadow-2xl">
        <defs>
          <linearGradient id="chartGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15519D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#104280" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="chartGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stock Chart Grid */}
        <g stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1">
          <line x1="40" y1="80" x2="360" y2="80" strokeDasharray="4 4" />
          <line x1="40" y1="140" x2="360" y2="140" strokeDasharray="4 4" />
          <line x1="40" y1="200" x2="360" y2="200" strokeDasharray="4 4" />
          <line x1="40" y1="260" x2="360" y2="260" />
        </g>

        {/* Bullish Gradient Area Chart */}
        <path
          d="M 40 260 L 90 220 L 140 240 L 190 150 L 240 180 L 290 100 L 340 120 L 360 90 L 360 260 Z"
          fill="url(#chartGrad2)"
        />

        {/* Main Price Line */}
        <path
          d="M 40 260 L 90 220 L 140 240 L 190 150 L 240 180 L 290 100 L 340 120 L 360 90"
          fill="none"
          stroke="#10B981"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Secondary Index Line */}
        <path
          d="M 40 240 L 100 250 L 150 200 L 210 210 L 270 140 L 340 160"
          fill="none"
          stroke="#15519D"
          strokeWidth="2.5"
          strokeDasharray="6 4"
        />

        {/* Candlesticks */}
        {[
          { x: 90, h: 30, green: true },
          { x: 140, h: -20, green: false },
          { x: 190, h: 50, green: true },
          { x: 240, h: -15, green: false },
          { x: 290, h: 45, green: true },
          { x: 340, h: 25, green: true }
        ].map((item, idx) => (
          <g key={idx} transform={`translate(${item.x}, 200)`}>
            <line x1="0" y1="-25" x2="0" y2="25" stroke={item.green ? '#10B981' : '#DC2626'} strokeWidth="1.5" />
            <rect
              x="-5"
              y={item.green ? -item.h / 2 : 0}
              width="10"
              height={Math.abs(item.h)}
              fill={item.green ? '#10B981' : '#DC2626'}
              rx="2"
            />
          </g>
        ))}

        {/* Floating Rupees & Currency Chips */}
        <g className="animate-bounce" style={{ animationDuration: '4s' }}>
          <circle cx="290" cy="100" r="16" fill="#10B981" />
          <text x="290" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900">
            ₹
          </text>
        </g>

        <g className="animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <circle cx="190" cy="150" r="14" fill="#15519D" />
          <text x="190" y="154" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900">
            AI
          </text>
        </g>
      </svg>
    </div>
  );
};

export default LoginIllustration;
