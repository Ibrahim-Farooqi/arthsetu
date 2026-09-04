import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, X, Maximize2, Minimize2, Send, Mic, Volume2, Bookmark, Share2, 
  TrendingUp, AlertCircle, ShieldCheck, CheckCircle2, ArrowRight, Wallet, 
  BarChart3, RefreshCw, Layers, ArrowUpDown, ChevronRight, HelpCircle, UserCheck, Search, Scale
} from 'lucide-react';
import toast from 'react-hot-toast';
import aiService from '../../services/ai.service';

interface AiCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
  onTrade?: (tradeData: any) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  confidence?: number;
  sources?: string[];
  relatedStocks?: string[];
  relatedResearch?: string;
  type?: 'text' | 'comparison' | 'portfolio' | 'chart';
  comparisonData?: any;
}

export const AiCopilotModal: React.FC<AiCopilotModalProps> = ({
  isOpen,
  onClose,
  onSelectStock,
  onSelectResearch,
  onTrade
}) => {
  const [viewMode, setViewMode] = useState<'panel' | 'fullscreen'>('panel');
  const [activeTab, setActiveTab] = useState<'Chat' | 'Home' | 'Portfolio Review' | 'Market Brief'>('Home');
  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Good morning Omar! I am your ArthSetu AI Investment Copilot. Your portfolio is up +1.55% today. How can I help you build wealth today?',
      timestamp: 'Just now',
      confidence: 96,
      sources: ['Univest SEBI Advisory Feed', 'TradingView Engine', 'NSE Live'],
      relatedStocks: ['RELIANCE', 'HDFCBANK', 'LT']
    }
  ]);

  const [isAiTyping, setIsAiTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Why is Reliance rising today?',
    'Compare TCS vs Infosys',
    'What changed in HDFC Bank?',
    'What are the biggest risks in IT sector?',
    'Explain Q1 financial result for Tata Motors',
    'Why is HAL a premium pick?'
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    
    setIsAiTyping(true);
    try {
      const response = await aiService.chatWithCopilot({
        messages: [{ role: 'user', content: text }]
      });
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        timestamp: 'Just now',
        confidence: response.confidence,
        relatedStocks: response.relatedStocks,
        sources: ['Univest AI Engine']
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI Copilot Error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I encountered a problem analyzing that. Please try again later.",
        timestamp: 'Just now',
        confidence: 0
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const toggleVoiceMode = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.success('Voice listener active. Speak your question...');
      setTimeout(() => {
        setIsRecording(false);
        handleSend('Should I buy Reliance today?');
      }, 3000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[90] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        {/* AI Copilot Workspace Container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className={`relative bg-white border-l border-[#E2E8F0] h-full flex flex-col shadow-2xl z-10 overflow-hidden transition-all duration-300 ${
            viewMode === 'fullscreen' ? 'w-full' : 'w-full max-w-[500px]'
          }`}
        >
          {/* TOP HEADER */}
          <header className="p-5 border-b border-[#E2E8F0] bg-white flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-md">
                <Sparkles className="w-5 h-5 fill-white animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-base text-[#172033] leading-tight flex items-center gap-2">
                  Univest AI Copilot
                  <span className="px-2 py-0.5 rounded-full bg-primary-light text-primary text-[9px] font-black border border-primary-light uppercase">
                    SEBI Integrated
                  </span>
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">Personal Wealth & Advisory Intelligence</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode(viewMode === 'panel' ? 'fullscreen' : 'panel')}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition"
                title={viewMode === 'panel' ? 'Expand Full Screen' : 'Collapse Side Panel'}
              >
                {viewMode === 'panel' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* SECONDARY NAVIGATION TABS */}
          <div className="flex items-center gap-1 px-5 py-2.5 border-b border-slate-100 bg-[#F8FAFC] text-xs font-bold">
            {(['Home', 'Chat', 'Portfolio Review', 'Market Brief'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl transition ${
                  activeTab === tab ? 'bg-[#172033] text-white font-black shadow-2xs' : 'text-slate-500 hover:text-[#172033]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* MAIN COPILOT WORKSPACE SURFACE */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">

            {/* TAB 1: HOME OVERVIEW */}
            {activeTab === 'Home' && (
              <div className="flex flex-col gap-6">
                
                {/* Today's AI Brief Card */}
                <div className="bg-[#172033] text-white rounded-[24px] p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col gap-3">
                    <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> TODAY'S COPILOT SYNTHESIS
                    </span>
                    <h4 className="text-lg font-black leading-snug">
                      Banking and Capital Goods Leading Outperformance
                    </h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Your portfolio is up <strong>+1.55%</strong> today led by Reliance (+1.25%) and HDFC Bank (+0.85%). Rebalancing IT holdings into Healthcare will optimize drawdown protection.
                    </p>
                  </div>
                </div>

                {/* Metrics Summary Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Top Opportunity</span>
                    <strong className="text-xs text-emerald-600 font-black block">Large-cap Banking (+15%)</strong>
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Top Risk Alert</span>
                    <strong className="text-xs text-danger font-black block">Small-cap IT Drag (-0.8%)</strong>
                  </div>
                </div>

                {/* Quick Prompts */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Suggested AI Questions</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {quickPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => {
                          setActiveTab('Chat');
                          handleSend(p);
                        }}
                        className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] hover:border-blue-300 hover:bg-primary-light/50 rounded-xl text-xs text-left font-bold text-[#172033] transition flex items-center justify-between group"
                      >
                        <span>{p}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: CHAT INTERACTION */}
            {(activeTab === 'Chat' || activeTab === 'Portfolio Review' || activeTab === 'Market Brief') && (
              <div className="flex flex-col gap-4 flex-1">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`p-4 rounded-2xl max-w-[90%] text-xs leading-relaxed font-medium ${
                      msg.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033] rounded-bl-none shadow-2xs'
                    }`}>
                      <p>{msg.text}</p>

                      {/* Embedded Comparison Component */}
                      {msg.type === 'comparison' && msg.comparisonData && (
                        <div className="mt-3 bg-white p-3.5 rounded-xl border border-slate-200 text-[#172033]">
                          <div className="grid grid-cols-2 gap-3 text-[11px] font-bold border-b border-slate-100 pb-2 mb-2">
                            <div>
                              <span className="text-primary font-black block">{msg.comparisonData.stockA.symbol}</span>
                              <span>P/E: {msg.comparisonData.stockA.pe}</span>
                              <span className="block text-emerald-600">ROE: {msg.comparisonData.stockA.roe}</span>
                            </div>
                            <div>
                              <span className="text-primary font-black block">{msg.comparisonData.stockB.symbol}</span>
                              <span>P/E: {msg.comparisonData.stockB.pe}</span>
                              <span className="block text-emerald-600">ROE: {msg.comparisonData.stockB.roe}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AI Intelligence Footer */}
                      {msg.sender === 'ai' && (
                        <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-col gap-2 text-[10px]">
                          {msg.confidence && (
                            <div className="flex items-center justify-between text-slate-400 font-bold">
                              <span className="flex items-center gap-1 text-primary">
                                <Sparkles className="w-3 h-3" /> {msg.confidence}% AI Conviction
                              </span>
                              <span>{msg.timestamp}</span>
                            </div>
                          )}

                          {msg.relatedStocks && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-slate-400 font-bold">Related:</span>
                              {msg.relatedStocks.map(st => (
                                <button
                                  key={st}
                                  onClick={() => {
                                    if (onSelectStock) onSelectStock({ symbol: st, company: st });
                                  }}
                                  className="px-2 py-0.5 rounded bg-slate-200 hover:bg-slate-300 font-black text-[#172033] transition"
                                >
                                  ${st}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Quick Action buttons */}
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => {
                                if (onSelectStock) onSelectStock({ symbol: msg.relatedStocks?.[0] || 'RELIANCE', companyName: msg.relatedStocks?.[0] || 'RELIANCE' });
                              }}
                              className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-dark text-white font-black transition"
                            >
                              Examine {msg.relatedStocks?.[0] || 'Stock'} Thesis
                            </button>
                            <button
                              onClick={() => toast.success('Saved to AI Queue')}
                              className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition"
                            >
                              Save Insight
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex flex-col gap-2 items-start">
                    <div className="p-4 rounded-2xl max-w-[90%] text-xs leading-relaxed font-medium bg-[#F8FAFC] border border-[#E2E8F0] text-[#172033] rounded-bl-none shadow-2xs">
                      <div className="flex gap-1 items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* INPUT BAR */}
          <footer className="p-4 border-t border-[#E2E8F0] bg-white flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleVoiceMode}
                className={`p-2.5 rounded-xl border transition ${
                  isRecording ? 'bg-rose-50 border-rose-200 text-danger animate-pulse' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
                title="Voice Input"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Ask AI Copilot anything about stocks, portfolio, research..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs text-[#172033] outline-none focus:border-primary font-medium"
              />

              <button
                onClick={() => handleSend()}
                className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary transition shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold px-1">
              <span>Powered by SEBI Advisory Rules Engine</span>
              <span>Press Enter to send</span>
            </div>
          </footer>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default AiCopilotModal;
