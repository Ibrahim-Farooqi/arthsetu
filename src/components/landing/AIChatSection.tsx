import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, TrendingUp, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Conversation Script ──────────────────────────────────────────────────────
const CONVERSATION: Array<{
  role: 'user' | 'ai';
  text: string;
  highlight?: { label: string; value: string; color: string }[];
  delay: number; // ms after previous message finishes
}> = [
  {
    role: 'user',
    text: 'Should I buy RELIANCE at current price?',
    delay: 600,
  },
  {
    role: 'ai',
    text: 'RELIANCE is forming a classic Cup & Handle breakout on the daily chart. RSI at 62 with rising volume confirms institutional accumulation. I recommend a BUY with a target of ₹3,120 and a stop-loss at ₹2,850.',
    highlight: [
      { label: 'Signal', value: 'BUY', color: 'text-emerald-400' },
      { label: 'Target', value: '₹3,120', color: 'text-[#64748B]' },
      { label: 'Conviction', value: '96%', color: 'text-emerald-400' },
    ],
    delay: 800,
  },
  {
    role: 'user',
    text: "What's my current portfolio risk score?",
    delay: 1200,
  },
  {
    role: 'ai',
    text: "Your portfolio risk score is 3.8/10 — well within the safe zone. However, you have 42% exposure to IT sector. I suggest rebalancing 8% into large-cap Banking stocks to reduce sector concentration.",
    highlight: [
      { label: 'Risk Score', value: '3.8 / 10', color: 'text-emerald-400' },
      { label: 'IT Exposure', value: '42%', color: 'text-amber-400' },
      { label: 'Action', value: 'Rebalance', color: 'text-[#64748B]' },
    ],
    delay: 900,
  },
  {
    role: 'user',
    text: "What are today's top 3 stock picks?",
    delay: 1000,
  },
  {
    role: 'ai',
    text: "Based on today's scan of 4,000+ NSE/BSE stocks, here are my top high-conviction picks with strong technical setups and fundamental backing.",
    highlight: [
      { label: 'HDFCBANK', value: 'BUY · ₹1,720', color: 'text-emerald-400' },
      { label: 'TCS', value: 'BUY · ₹4,280', color: 'text-emerald-400' },
      { label: 'INFY', value: 'BUY · ₹1,620', color: 'text-[#64748B]' },
    ],
    delay: 900,
  },
  {
    role: 'user',
    text: 'Explain what MACD divergence means.',
    delay: 1100,
  },
  {
    role: 'ai',
    text: "MACD Divergence is when the stock price moves in one direction but the MACD indicator moves in the opposite direction. A bullish divergence (price falling, MACD rising) often signals an upcoming price reversal upward — a powerful early entry signal.",
    highlight: [
      { label: 'Type', value: 'Bullish Divergence', color: 'text-emerald-400' },
      { label: 'Signal', value: 'Early Entry', color: 'text-[#64748B]' },
    ],
    delay: 800,
  },
];

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-blue-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

// ─── Single Chat Bubble ───────────────────────────────────────────────────────
function ChatBubble({ msg, isNew }: {
  msg: typeof CONVERSATION[0];
  isNew: boolean;
}) {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center shrink-0 mt-0.5 shadow-lg shadow-[rgba(21,81,157,0.3)]/30">
          <Brain className="w-3.5 h-3.5 text-white" />
        </div>
      )}

      <div className={`max-w-[82%] flex flex-col gap-2 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-primary text-white rounded-tr-sm'
            : 'bg-white/[0.06] border border-white/[0.08] text-slate-200 rounded-tl-sm backdrop-blur-sm'
        }`}>
          {msg.text}
        </div>

        {/* Highlight chips */}
        {msg.highlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="flex flex-wrap gap-1.5"
          >
            {msg.highlight.map(h => (
              <div
                key={h.label}
                className="flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-xl px-2.5 py-1 text-[11px] font-mono"
              >
                <span className="text-slate-500">{h.label}:</span>
                <span className={`font-bold ${h.color}`}>{h.value}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black text-slate-300">
          U
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
interface Props { theme: 'dark' | 'light' }

export const AIChatSection: React.FC<Props> = ({ theme }) => {
  const navigate = useNavigate();
  const dark = theme === 'dark';

  const [visibleMessages, setVisibleMessages] = useState<typeof CONVERSATION>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState(0); // which message we're about to show
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll locally inside the container on new messages/typing
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [visibleMessages, isTyping]);

  // Sequentially reveal messages
  useEffect(() => {
    if (phase >= CONVERSATION.length) {
      // Loop: reset after a pause
      const resetTimer = setTimeout(() => {
        setVisibleMessages([]);
        setPhase(0);
      }, 3500);
      return () => clearTimeout(resetTimer);
    }

    const msg = CONVERSATION[phase];

    // For AI messages: show typing first
    const showTyping = msg.role === 'ai';
    const typingDuration = showTyping ? Math.min(msg.text.length * 18, 2200) : 0;

    const entryDelay = setTimeout(() => {
      if (showTyping) setIsTyping(true);

      const revealDelay = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, msg]);
        setTimeout(() => setPhase(p => p + 1), msg.delay);
      }, typingDuration);

      return () => clearTimeout(revealDelay);
    }, phase === 0 ? 600 : 200);

    return () => clearTimeout(entryDelay);
  }, [phase]);

  return (
    <section id="ai-advisor" className="relative space-y-0">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
        <span className="text-xs font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
          Autonomous AI Advisor
        </span>
        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black font-display ${dark ? 'text-white' : 'text-slate-900'}`}>
          Your Personal AI Investment Team
        </h2>
        <p className={`text-sm font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Ask anything about markets, stocks, portfolio risk, or investment concepts. Available 24/7.
        </p>
      </div>

      {/* ── Main Layout: Left info + Right chat ────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT: AI info panel */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          {/* AI Brand */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center shadow-xl shadow-[rgba(21,81,157,0.3)]/30">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>Univest AI Advisor</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-semibold">Online · Answering now</span>
              </div>
            </div>
          </div>

          <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Powered by proprietary financial intelligence trained on 15 years of Indian market data. Analyzes 4,000+ stocks across NSE/BSE in real-time and gives you institutional-grade research — instantly.
          </p>

          {/* Capabilities */}
          <div className="space-y-3">
            {[
              { icon: TrendingUp, label: 'Real-time stock signals with entry, target & stop-loss', color: 'text-[#64748B]', bg: 'bg-primary/10 border-primary/20' },
              { icon: Shield, label: 'Portfolio risk scoring & automated rebalancing advice', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
              { icon: Sparkles, label: 'Plain-English explanations of complex market concepts', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${item.bg}`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <span className={`text-sm font-medium leading-snug mt-1 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className={`grid grid-cols-3 gap-4 pt-4 border-t ${dark ? 'border-white/[0.06]' : 'border-slate-200'}`}>
            {[
              { value: '4,000+', label: 'Stocks Tracked' },
              { value: '<2s', label: 'Response Time' },
              { value: '24/7', label: 'Availability' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <span className={`text-lg font-black block ${dark ? 'text-white' : 'text-slate-900'}`}>{s.value}</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-emerald-600 text-white text-sm font-black rounded-2xl transition shadow-lg w-fit"
          >
            Chat with AI Advisor <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* RIGHT: Animated Chat Window */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`relative rounded-3xl overflow-hidden border ${
            dark
              ? 'bg-white/[0.03] border-white/[0.07] backdrop-blur-xl shadow-[0_8px_48px_rgba(0,0,0,0.5)]'
              : 'bg-white/70 border-slate-200/50 backdrop-blur-xl shadow-[0_8px_48px_rgba(0,0,0,0.08)]'
          }`}
          style={{ height: 520 }}
        >
          {/* Chat header */}
          <div className={`flex items-center gap-3 px-5 py-4 border-b ${dark ? 'border-white/[0.06]' : 'border-slate-200/60'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center shadow-md shadow-[rgba(21,81,157,0.3)]/30">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className={`text-sm font-black ${dark ? 'text-white' : 'text-slate-900'}`}>Univest AI</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-semibold">Online</span>
              </div>
            </div>
            {/* Window dots */}
            <div className="ml-auto flex gap-1.5">
              {['bg-red-500/60', 'bg-amber-500/60', 'bg-emerald-500/60'].map((c, i) => (
                <span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
              ))}
            </div>
          </div>

          {/* Messages area */}
          <div
            ref={chatContainerRef}
            className="flex flex-col gap-4 px-5 py-4 overflow-y-auto"
            style={{ height: 'calc(520px - 130px)' }}
          >

            {/* Welcome message — always visible */}
            <div className="flex gap-3 justify-start">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center shrink-0 shadow-md">
                <Brain className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-white/[0.06] border border-white/[0.08] text-slate-200 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm leading-relaxed max-w-[82%] backdrop-blur-sm">
                👋 Hi! I'm your Univest AI Advisor. Ask me about any stock, your portfolio, or investment concepts. I'm here to help you invest smarter.
              </div>
            </div>

            {/* Dynamic messages */}
            <AnimatePresence>
              {visibleMessages.map((msg, i) => (
                <ChatBubble key={`${i}-${msg.text.slice(0, 12)}`} msg={msg} isNew={i === visibleMessages.length - 1} />
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center shrink-0 shadow-md">
                    <Brain className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-tl-sm backdrop-blur-sm">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input bar — static, decorative */}
          <div className={`absolute bottom-0 left-0 right-0 px-4 py-3 border-t ${dark ? 'border-white/[0.06]' : 'border-slate-200/60'}`}>
            <div className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 ${dark ? 'bg-white/[0.05] border border-white/[0.07]' : 'bg-slate-100 border border-slate-200'}`}>
              <span className={`text-sm flex-1 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                Ask about any stock or investment...
              </span>
              <button
                onClick={() => navigate('/signup')}
                className="w-7 h-7 rounded-xl bg-gradient-to-r from-primary to-emerald-500 flex items-center justify-center cursor-pointer hover:opacity-90 transition"
              >
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AIChatSection;
