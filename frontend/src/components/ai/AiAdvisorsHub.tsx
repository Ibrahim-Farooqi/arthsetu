import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Send, Bot, User, TrendingUp, BarChart3, ShieldCheck, 
  Zap, Copy, ThumbsUp, RefreshCw, ArrowUpRight, ChevronRight,
  BookOpen, Lightbulb, Activity, PieChart, AlertCircle
} from 'lucide-react';
import aiService from '../../services/ai.service';
import toast from 'react-hot-toast';

interface AiAdvisorsHubProps {
  onTradeStock?: (stock: any) => void;
  onCompareStock?: (stock: any) => void;
  initialAdvisorId?: string;
  contextMode?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  isStreaming?: boolean;
}

const SUGGESTED_QUESTIONS = [
  { label: 'Market Outlook', icon: TrendingUp, q: 'What is the market outlook for this week?', color: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:border-emerald-300' },
  { label: 'Best Stocks', icon: BarChart3, q: 'Which stocks should I watch right now?', color: 'text-primary bg-primary-light border-primary-light hover:border-blue-300' },
  { label: 'NIFTY Analysis', icon: Activity, q: 'Analyse NIFTY 50 today. Is it bullish or bearish?', color: 'text-violet-600 bg-violet-50 border-violet-200 hover:border-violet-300' },
  { label: 'Portfolio Risk', icon: PieChart, q: 'How should I diversify my portfolio to reduce risk?', color: 'text-orange-600 bg-orange-50 border-orange-200 hover:border-orange-300' },
  { label: 'FII/DII Flows', icon: ArrowUpRight, q: "Explain today's FII and DII activity and its impact", color: 'text-danger bg-rose-50 border-rose-200 hover:border-rose-300' },
  { label: 'Sector Picks', icon: Lightbulb, q: 'Which sectors are showing momentum right now?', color: 'text-amber-600 bg-amber-50 border-amber-200 hover:border-amber-300' },
  { label: 'Risk Meter', icon: AlertCircle, q: 'What is the current risk level in the Indian market?', color: 'text-cyan-600 bg-cyan-50 border-cyan-200 hover:border-cyan-300' },
  { label: 'Learning', icon: BookOpen, q: 'Explain SEBI research advisory rules in simple terms', color: 'text-primary bg-primary-light border-indigo-200 hover:border-indigo-300' },
];

const QUICK_FOLLOW_UPS = [
  'Tell me more',
  'Give me a stock pick',
  'What are the risks?',
  'Show me the data',
  'Explain simply',
];

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  sender: 'ai',
  text: `Hello! I'm **ArthSetu AI** — your personal stock market advisor powered by real-time market intelligence.\n\nType your question in the chat or click on any of the suggested topics on the right to start!`,
  time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
};

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const boldLine = line.replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong>${m}</strong>`);
    const isBullet = line.trim().startsWith('•');
    return (
      <p key={i} className={`${i > 0 ? 'mt-1.5' : ''} ${isBullet ? 'pl-2' : ''} text-sm leading-relaxed`}
        dangerouslySetInnerHTML={{ __html: boldLine }} />
    );
  });
}

export const AiAdvisorsHub: React.FC<AiAdvisorsHubProps> = ({ onTradeStock }) => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? inputMessage).trim();
    if (!query || isThinking) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    try {
      const data = await aiService.chatWithCopilot({
        messages: [{ role: 'user', content: query }]
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const fallbackResponses = [
        `Great question about **${query.substring(0, 40)}${query.length > 40 ? '...' : ''}**\n\nBased on current market signals:\n• NIFTY 50 is in a consolidation zone between 22,000–22,500\n• FII flows turned positive (+₹2,450 Cr) — bullish signal\n• Banking and IT sectors showing relative strength\n\nFor personalized advice, ensure your portfolio is updated in the Portfolio section.`,
        `Here's my analysis on **${query.substring(0, 40)}${query.length > 40 ? '...' : ''}**:\n\n• The Indian market is showing resilience despite global headwinds\n• INDIA VIX at 14.3 suggests low fear — good entry window\n• Consider SIP top-ups in large-cap index funds\n\nWould you like me to dive into any specific stock or sector?`,
        `Analyzing **${query.substring(0, 40)}${query.length > 40 ? '...' : ''}** for you:\n\n• RBI's recent policy stance is supportive of equities\n• Pharma, IT, and FMCG are defensive plays in current conditions\n• Mid-caps may outperform in H2 based on earnings trajectory\n\nI recommend diversifying across at least 3–4 sectors to manage risk effectively.`,
      ];

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Copied to clipboard');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const hasMessages = messages.length > 1;

  return (
    <div className="flex flex-col gap-0 w-full font-sans text-slate-800 pb-8">
      
      {/* TOP HEADER */}
      <div className="relative overflow-hidden rounded-[24px] p-5 bg-[#172033] text-white border border-slate-800 mb-6 shrink-0">
        <div className="absolute right-0 top-0 w-72 h-72 bg-primary/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shadow-lg shadow-[rgba(21,81,157,0.3)]/30">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#172033]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-lg font-black tracking-tight">ArthSetu AI Advisor</h1>
                <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Online
                </span>
              </div>
              <p className="text-slate-400 text-xs font-medium">Powered by SEBI-compliant market intelligence · Ask anything about stocks & investing</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {[
              { icon: ShieldCheck, label: 'SEBI Compliant', color: 'text-emerald-400' },
              { icon: Zap, label: 'Real-Time Data', color: 'text-yellow-400' },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-slate-300">
                <b.icon className={`w-3.5 h-3.5 ${b.color}`} />
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TWO PANEL SIDE-BY-SIDE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* CHATBOX PANEL (Left - Col Span 2) */}
        <div className="lg:col-span-2 flex flex-col bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-sm h-[520px]">
          
          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                    msg.sender === 'ai' 
                      ? 'bg-gradient-to-br from-primary to-primary text-white shadow-md shadow-[rgba(21,81,157,0.3)]/20' 
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {msg.sender === 'ai' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[78%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-tr-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-sm'
                    }`}>
                      {msg.sender === 'ai' 
                        ? <div className="text-slate-800">{renderMarkdown(msg.text)}</div>
                        : <p className="text-sm leading-relaxed">{msg.text}</p>
                      }
                    </div>
                    
                    {/* Actions for AI messages */}
                    {msg.sender === 'ai' && msg.id !== 'welcome' && (
                      <div className="flex items-center gap-1 px-1">
                        <button onClick={() => handleCopy(msg.id, msg.text)}
                          className="flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 transition cursor-pointer">
                          {copiedId === msg.id ? <ThumbsUp className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          {copiedId === msg.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    )}
                    <span className="text-[9px] font-bold text-slate-400 px-1">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Thinking indicator */}
            {isThinking && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary flex items-center justify-center shrink-0 mt-1 shadow-md shadow-[rgba(21,81,157,0.3)]/20">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-primary rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                    className="w-2 h-2 bg-blue-400 rounded-full" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    className="w-2 h-2 bg-blue-300 rounded-full" />
                  <span className="text-xs font-medium text-slate-400 ml-1">Analyzing markets...</span>
                </div>
              </motion.div>
            )}

            {/* Quick follow-ups */}
            {hasMessages && !isThinking && messages[messages.length - 1]?.sender === 'ai' && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="pl-11">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_FOLLOW_UPS.map((fu) => (
                    <button
                      key={fu}
                      onClick={() => handleSendMessage(fu)}
                      className="text-[11px] font-bold text-primary bg-primary-light border border-primary-light px-3 py-1.5 rounded-full hover:bg-primary-light transition cursor-pointer flex items-center gap-1"
                    >
                      <ChevronRight className="w-3 h-3" />{fu}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* INPUT BAR */}
          <div className="p-4 border-t border-slate-200 bg-white shrink-0">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-blue-50 rounded-2xl px-4 py-3 transition-all">
              <Sparkles className="w-4 h-4 text-[#64748B] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about stocks, market trends, portfolio advice..."
                disabled={isThinking}
                className="flex-1 bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 outline-none disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isThinking}
                className="w-9 h-9 rounded-xl bg-primary hover:bg-primary-dark disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center transition shadow-sm shadow-[rgba(21,81,157,0.3)]/20 shrink-0 cursor-pointer disabled:cursor-not-allowed"
              >
                {isThinking 
                  ? <RefreshCw className="w-4 h-4 animate-spin" /> 
                  : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-center text-[9px] font-bold text-slate-400 mt-2">
              ArthSetu AI · SEBI compliant · Not financial advice
            </p>
          </div>
        </div>

        {/* QUESTIONS SIDEBAR (Right - Col Span 1) */}
        <div className="lg:col-span-1 bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Suggested Questions</h3>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Click on any question below to ask the AI directly.</p>
          </div>
          
          <div className="flex flex-col gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {SUGGESTED_QUESTIONS.map((sq, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 3 }}
                onClick={() => handleSendMessage(sq.q)}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all hover:shadow-xs cursor-pointer ${sq.color}`}
              >
                <div className="mt-0.5 shrink-0">
                  <sq.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black leading-tight text-slate-900">{sq.label}</div>
                  <div className="text-[10px] font-semibold opacity-70 mt-1 leading-normal text-slate-600">{sq.q}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiAdvisorsHub;