import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, TrendingUp, Landmark, Send, Activity, PieChart, ShieldCheck, Briefcase, Rocket, Award } from 'lucide-react';

const messages = [
  // Intro & Stocks
  {
    id: 1,
    type: 'bot',
    text: 'Hi there! I am your Univest AI Assistant. How can I help you grow your wealth today?',
    icon: <Bot className="w-6 h-6 text-white" />,
    delay: 0.5,
  },
  {
    id: 2,
    type: 'user',
    text: 'Find me some high-growth stocks.',
    delay: 3.5,
  },
  {
    id: 3,
    type: 'bot',
    text: 'Analyzing real-time market data... 🔍',
    icon: <Activity className="w-5 h-5 text-white" />,
    delay: 5.5,
  },
  {
    id: 4,
    type: 'bot',
    text: 'Based on our AI models, I recommend checking out the Tech & EV sectors. Our top pick this week has a 92% confidence score for a breakout. 📈',
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    delay: 8.0,
  },
  
  // Mutual Funds
  {
    id: 5,
    type: 'user',
    text: 'What about low-risk mutual funds?',
    delay: 13.0,
  },
  {
    id: 6,
    type: 'bot',
    text: 'Absolutely! I have scanned over 1,500+ mutual funds. 💼',
    icon: <Landmark className="w-5 h-5 text-white" />,
    delay: 15.0,
  },
  {
    id: 7,
    type: 'bot',
    text: 'I found 3 Flexi-Cap funds with consistent 15%+ XIRR over the last 5 years and low volatility. Shall we review them?',
    icon: <PieChart className="w-5 h-5 text-white" />,
    delay: 17.5,
  },

  // Portfolio
  {
    id: 8,
    type: 'user',
    text: 'Can you analyze my current portfolio?',
    delay: 22.5,
  },
  {
    id: 9,
    type: 'bot',
    text: 'Of course. Securely connecting to your investments... 🔒',
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
    delay: 24.5,
  },
  {
    id: 10,
    type: 'bot',
    text: 'Your portfolio is heavily weighted in Financials (45%). I suggest diversifying into IT to reduce risk. I can auto-rebalance it for you.',
    icon: <Briefcase className="w-5 h-5 text-white" />,
    delay: 27.0,
  },

  // IPOs
  {
    id: 11,
    type: 'user',
    text: 'Any upcoming IPOs to watch?',
    delay: 32.5,
  },
  {
    id: 12,
    type: 'bot',
    text: 'Yes, 2 major mainboard IPOs are launching next week. Current grey market premiums (GMP) suggest a 25% listing gain. 🚀',
    icon: <Rocket className="w-5 h-5 text-white" />,
    delay: 35.0,
  },
  
  // Wrap up
  {
    id: 13,
    type: 'bot',
    text: 'Ready to take action? Join smart investors on Univest today.',
    icon: <Award className="w-5 h-5 text-white" />,
    delay: 39.0,
  },
];

export const AnimatedChatbot: React.FC = () => {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages, isTyping]);

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    
    // Clear messages for the new loop iteration
    setVisibleMessages([]);
    setIsTyping(false);
    
    messages.forEach((msg) => {
      if (msg.type === 'bot') {
        const typingStartTimeout = setTimeout(() => {
          setIsTyping(true);
        }, (msg.delay * 1000) - 1000);
        timeouts.push(typingStartTimeout);
      }

      const msgTimeout = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages(prev => [...prev, msg.id]);
      }, msg.delay * 1000);
      
      timeouts.push(msgTimeout);
    });

    // Schedule the next loop 5 seconds after the last message appears
    const maxDelay = Math.max(...messages.map(m => m.delay));
    const nextLoopTimeout = setTimeout(() => {
      setLoopCount(prev => prev + 1);
    }, (maxDelay + 5) * 1000);
    
    timeouts.push(nextLoopTimeout);

    return () => timeouts.forEach(clearTimeout);
  }, [loopCount]);

  return (
    <div className="w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden flex flex-col h-[720px] transition-all hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)]">
      {/* Header */}
      <div className="bg-[#1C1A27] px-7 py-6 flex items-center gap-5 text-white relative overflow-hidden shrink-0">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="relative z-10">
          <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#16A34A] border-[3px] border-[#1C1A27] rounded-full"></div>
        </div>
        <div className="relative z-10">
          <h4 className="font-semibold text-xl tracking-tight leading-tight">Univest AI</h4>
          <p className="text-white/70 text-[15px] flex items-center gap-2 mt-1 font-medium">
            <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            Online now
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 p-7 overflow-y-auto flex flex-col gap-6 bg-[#FCFCFD]">
        <AnimatePresence>
          {messages.map((msg) => (
            visibleMessages.includes(msg.id) && (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
                className={`flex gap-4 max-w-[88%] ${msg.type === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {msg.type === 'bot' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2B2440] to-[#58458F] flex-shrink-0 flex items-center justify-center mt-1 shadow-md border border-white/10">
                    {msg.icon}
                  </div>
                )}
                
                <div className={`px-5 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                  msg.type === 'user' 
                    ? 'bg-[#1C1A27] text-white rounded-tr-md' 
                    : 'bg-white text-[#1C1A27] border border-black/[0.06] rounded-tl-md'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            )
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 max-w-[85%]"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2B2440] to-[#58458F] flex-shrink-0 flex items-center justify-center shadow-md border border-white/10">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border border-black/[0.06] py-5 px-6 rounded-3xl rounded-tl-md shadow-sm flex items-center gap-2">
                <motion.div className="w-2.5 h-2.5 bg-[#1C1A27]/40 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2.5 h-2.5 bg-[#1C1A27]/40 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
                <motion.div className="w-2.5 h-2.5 bg-[#1C1A27]/40 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-2 shrink-0" />
      </div>

      {/* Input Area (Mock) */}
      <div className="p-6 bg-white border-t border-black/5 z-10 shadow-[0_-10px_40px_rgb(0,0,0,0.02)] shrink-0">
        <div className="bg-[#F8F9FA] border border-black/[0.06] rounded-full pl-6 pr-2 py-2 flex items-center gap-4 transition-all hover:bg-white hover:border-black/10 focus-within:bg-white focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-100">
          <input 
            type="text" 
            placeholder="Ask about stocks, funds, or crypto..." 
            className="flex-1 bg-transparent border-none outline-none text-base text-[#1C1A27] placeholder:text-black/40 py-2"
            disabled
          />
          <div className="w-12 h-12 rounded-full bg-[#1C1A27] flex items-center justify-center hover:bg-black transition-colors cursor-pointer shrink-0 shadow-md">
            <Send className="w-5 h-5 text-white ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
