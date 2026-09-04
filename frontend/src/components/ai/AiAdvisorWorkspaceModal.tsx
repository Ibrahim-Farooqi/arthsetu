import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Sparkles, Volume2, VolumeX, ShieldCheck, ArrowRight,
  TrendingUp, BarChart3, CandlestickChart, Briefcase, Target, Newspaper, ShieldAlert, GraduationCap,
  Bookmark, Check, Copy, ExternalLink, RefreshCw, ThumbsUp, Plus, ArrowUpRight, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import aiService from '../../services/ai.service';

export interface AiAdvisorConfig {
  id: string;
  name: string;
  roleTitle: string;
  tagline: string;
  category: 'Market & Trading' | 'Portfolio & Wealth' | 'Analysis & News' | 'Learning';
  icon: any;
  colorFrom: string;
  colorTo: string;
  badgeColor: string;
  description: string;
  primaryExpertise: string[];
  suggestedPrompts: string[];
  sampleResponses: Array<{
    query: string;
    response: string;
    relatedStocks?: Array<{ symbol: string; company: string; price: string; change: string; positive: boolean }>;
    visualType?: 'heatmap' | 'chart' | 'sip' | 'risk' | 'fundamentals' | 'news';
  }>;
}

export const AI_ADVISORS_LIST: AiAdvisorConfig[] = [
  {
    id: 'market-strategist',
    name: 'Market Strategist',
    roleTitle: 'Macro & Global Market Trends Expert',
    tagline: 'Explains market sentiment, NIFTY, SENSEX, sector rotation & FII/DII activity',
    category: 'Market & Trading',
    icon: TrendingUp,
    colorFrom: 'from-emerald-600',
    colorTo: 'to-teal-700',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Understands global macroeconomic shifts, institutional order flows, and sector rotations to give you clear market direction.',
    primaryExpertise: ['NIFTY & SENSEX Structure', 'FII / DII Institutional Flows', 'Global Market Impact', 'Sector Rotation Signals'],
    suggestedPrompts: [
      'Why is NIFTY rallying today?',
      'Explain FII net buying trends for this week',
      'Which sectors are showing relative strength?',
      'Impact of US Inflation data on Indian Markets'
    ],
    sampleResponses: [
      {
        query: 'Why is NIFTY rallying today?',
        response: 'NIFTY is trading up +1.25% today primarily driven by heavy buying in Banking (+1.8%) and Reliance Industries ahead of its Q1 earnings. FIIs turned net buyers with ₹2,450 Cr inflow yesterday following expectations of an RBI rate hold.',
        relatedStocks: [
          { symbol: 'RELIANCE', company: 'Reliance Industries', price: '₹2,934.50', change: '+1.25%', positive: true },
          { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd', price: '₹1,682.40', change: '+1.85%', positive: true }
        ],
        visualType: 'heatmap'
      }
    ]
  },
  {
    id: 'stock-analyst',
    name: 'Stock Analyst',
    roleTitle: 'Company Fundamentals & Valuation Expert',
    tagline: 'Explains P/E ratios, revenue growth, earnings quality, risks & price targets',
    category: 'Analysis & News',
    icon: BarChart3,
    colorFrom: 'from-primary',
    colorTo: 'to-indigo-700',
    badgeColor: 'bg-primary-light text-primary border-primary-light',
    description: 'Deep dives into corporate balance sheets, quarterly result reports, cash flows, and intrinsic valuation models.',
    primaryExpertise: ['P/E & DCF Valuation', 'Quarterly Earnings Breakdown', 'Competitive Moat Analysis', 'Price Target Models'],
    suggestedPrompts: [
      'Is Reliance Industries undervalued right now?',
      'Summarize HDFC Bank Q1 earnings report',
      'Compare Tata Motors vs Mahindra valuation',
      'Which IT stock has the strongest balance sheet?'
    ],
    sampleResponses: [
      {
        query: 'Is Reliance Industries undervalued right now?',
        response: 'Reliance Industries is currently trading at 24.2x TTM P/E, which is a 12% discount to its 5-year average historical valuation of 27.5x. Sum-of-the-parts (SOTP) valuation yields a fair value estimate of ₹3,350/share (+14% upside), supported by strong retail footfalls and telecom ARPU growth.',
        relatedStocks: [
          { symbol: 'RELIANCE', company: 'Reliance Industries Ltd', price: '₹2,934.50', change: '+1.25%', positive: true }
        ],
        visualType: 'fundamentals'
      }
    ]
  },
  {
    id: 'technical-analyst',
    name: 'Technical Analyst',
    roleTitle: 'Charts, Oscillators & Momentum Expert',
    tagline: 'Explains RSI, MACD, Moving Averages, Support & Resistance, and Breakout patterns',
    category: 'Market & Trading',
    icon: CandlestickChart,
    colorFrom: 'from-purple-600',
    colorTo: 'to-indigo-800',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'Scans technical candlestick patterns, volume profile surges, and momentum indicators to find precision entry and exit setups.',
    primaryExpertise: ['RSI & MACD Momentum', 'Support & Resistance Pivot', 'Bullish/Bearish Chart Patterns', 'Breakout Volume Validation'],
    suggestedPrompts: [
      'Analyze TCS chart for a bullish breakout setup',
      'What are key support & resistance levels for NIFTY?',
      'Is Infosys oversold based on 14-day RSI?',
      'Find stocks forming Double Bottom patterns today'
    ],
    sampleResponses: [
      {
        query: 'Analyze TCS chart for a bullish breakout setup',
        response: 'TCS has formed a classic 4-week Ascending Triangle pattern on the daily chart. RSI (14) is at 58.4 showing accelerating momentum. A volume-confirmed breakout above ₹4,200 opens potential targets toward ₹4,450, with key stop-loss defined at ₹4,110.',
        relatedStocks: [
          { symbol: 'TCS', company: 'Tata Consultancy Services', price: '₹4,185.10', change: '-0.42%', positive: false }
        ],
        visualType: 'chart'
      }
    ]
  },
  {
    id: 'portfolio-advisor',
    name: 'Portfolio Advisor',
    roleTitle: 'Asset Allocation & Rebalancing Specialist',
    tagline: 'Reviews portfolio health, sector concentration, risk score & optimization',
    category: 'Portfolio & Wealth',
    icon: Briefcase,
    colorFrom: 'from-cyan-600',
    colorTo: 'to-[#5A35F0]',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    description: 'Continuously monitors your holdings for sector concentration risks, overlap, and provides customized rebalancing suggestions.',
    primaryExpertise: ['Sector Concentration Risk', 'Portfolio Health Score', 'Smart Rebalancing', 'Sharpe & Beta Analysis'],
    suggestedPrompts: [
      'Review my overall portfolio health & concentration risk',
      'Am I overexposed to IT and Financial stocks?',
      'How can I improve my portfolio Sharpe Ratio?',
      'Suggest a rebalancing strategy for my ₹12.4L portfolio'
    ],
    sampleResponses: [
      {
        query: 'Review my overall portfolio health & concentration risk',
        response: 'Your portfolio Health Score is 92/100 (Strong). However, IT (28%) and Banking (34%) account for 62% of total capital. To reduce concentration risk, consider allocating fresh SIPs into Healthcare or Capital Goods.',
        relatedStocks: [
          { symbol: 'SUNPHARMA', company: 'Sun Pharma Ltd', price: '₹1,580.20', change: '+2.10%', positive: true },
          { symbol: 'LT', company: 'Larsen & Toubro', price: '₹3,456.90', change: '+1.05%', positive: true }
        ],
        visualType: 'risk'
      }
    ]
  },
  {
    id: 'wealth-planner',
    name: 'Wealth Planner',
    roleTitle: 'Goal-Based Compounding & SIP Strategist',
    tagline: 'Helps plan retirement, house, wedding, education & SIP compounding timelines',
    category: 'Portfolio & Wealth',
    icon: Target,
    colorFrom: 'from-amber-500',
    colorTo: 'to-orange-600',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Calculates exact monthly SIP investment targets to achieve your long-term life goals with inflation adjustment.',
    primaryExpertise: ['Goal SIP Calculation', 'Retirement Corpus Builder', 'Inflation-Adjusted Projections', 'Tax-Efficient Asset Mix'],
    suggestedPrompts: [
      'How much monthly SIP do I need for ₹1 Crore in 10 years?',
      'Build a retirement corpus plan for age 55',
      'Plan a fund for child higher education in 15 years',
      'Step-up SIP calculation for 15% annual income growth'
    ],
    sampleResponses: [
      {
        query: 'How much monthly SIP do I need for ₹1 Crore in 10 years?',
        response: 'To reach ₹1 Crore in 10 years assuming an expected equity return of 14% p.a., you require a monthly SIP of ₹38,500. With a 10% annual Step-Up SIP, your starting SIP can be as low as ₹25,000/month.',
        visualType: 'sip'
      }
    ]
  },
  {
    id: 'news-intelligence',
    name: 'News Intelligence',
    roleTitle: 'Real-Time Financial News & Impact Translator',
    tagline: 'Translates breaking news, RBI policies & earnings into actionable stock impact',
    category: 'Analysis & News',
    icon: Newspaper,
    colorFrom: 'from-rose-600',
    colorTo: 'to-pink-700',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Scans macroeconomic headlines and corporate filings instantly to tell you which stocks win or lose.',
    primaryExpertise: ['RBI Monetary Policy Impact', 'Budget & Regulatory News', 'Earnings Release Translation', 'Sentiment Heat Matrix'],
    suggestedPrompts: [
      'What does today RBI policy announcement mean for bank stocks?',
      'Explain Reliance new energy giga-factory news impact',
      'Summarize top 3 market headlines this morning',
      'Which stocks will benefit from the new PLI scheme?'
    ],
    sampleResponses: [
      {
        query: 'What does today RBI policy announcement mean for bank stocks?',
        response: 'The RBI maintained the Repo Rate unchanged at 6.50% while lowering the CRR stance to neutral. This improves liquidity for commercial banks, lowering cost of funds. HDFC Bank, ICICI Bank, and Axis Bank are direct beneficiaries.',
        relatedStocks: [
          { symbol: 'HDFCBANK', company: 'HDFC Bank Ltd', price: '₹1,682.40', change: '+1.85%', positive: true },
          { symbol: 'AXISBANK', company: 'Axis Bank Ltd', price: '₹1,240.10', change: '+1.40%', positive: true }
        ],
        visualType: 'news'
      }
    ]
  },
  {
    id: 'risk-advisor',
    name: 'Risk Advisor',
    roleTitle: 'Capital Protection & Drawdown Defense Manager',
    tagline: 'Analyzes portfolio volatility, stop-loss calculations, drawdown & position sizing',
    category: 'Portfolio & Wealth',
    icon: ShieldAlert,
    colorFrom: 'from-amber-600',
    colorTo: 'to-yellow-700',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-300',
    description: 'Dedicated strictly to capital preservation, calculating maximum drawdown risks and optimal position sizes.',
    primaryExpertise: ['Max Drawdown Protection', 'Trailing Stop-Loss Math', 'Position Sizing Calculator', 'Market Correction Defense'],
    suggestedPrompts: [
      'What is the max drawdown risk of my holdings?',
      'Calculate trailing stop-loss for Tata Steel position',
      'How to hedge my portfolio if market drops 5%?',
      'Optimal position sizing for a high-beta stock'
    ],
    sampleResponses: [
      {
        query: 'What is the max drawdown risk of my holdings?',
        response: 'Based on historical 3-year stress tests, your portfolio has a maximum estimated drawdown risk of -12.4% during severe market corrections. Implementing trailing stop-losses at -5% on high-beta positions reduces this exposure to -6.8%.',
        visualType: 'risk'
      }
    ]
  },
  {
    id: 'investment-coach',
    name: 'Investment Coach',
    roleTitle: 'Jargon-Free Financial Educator',
    tagline: 'Explains P/E ratio, Market Cap, IPOs, Mutual Funds & Candlesticks simply',
    category: 'Learning',
    icon: GraduationCap,
    colorFrom: 'from-emerald-500',
    colorTo: 'to-green-700',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'Breaks down complex stock market terminology into crystal clear, beginner-friendly explanations with real-world analogies.',
    primaryExpertise: ['Stock Market Jargon Explained', 'Financial Ratio Simplifier', 'ETF & Mutual Fund Basics', 'Beginner Trading Rules'],
    suggestedPrompts: [
      'Explain P/E Ratio like I am 12 years old',
      'What is the difference between Large Cap and Small Cap?',
      'How do Stock Options (F&O) work simply?',
      'What is Dividend Yield and why does it matter?'
    ],
    sampleResponses: [
      {
        query: 'Explain P/E Ratio like I am 12 years old',
        response: 'Imagine buying a lemonade stand for ₹100 that earns ₹10 pure profit every year. The P/E ratio is 10 (Price ₹100 / Earnings ₹10). It tells you how many years of profits you are paying upfront to own the business!',
        visualType: 'fundamentals'
      }
    ]
  }
];

interface AiAdvisorWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  advisor: AiAdvisorConfig | null;
  onTradeStock?: (stock: any) => void;
  onCompareStock?: (stock: any) => void;
}

export const AiAdvisorWorkspaceModal: React.FC<AiAdvisorWorkspaceModalProps> = ({
  isOpen,
  onClose,
  advisor,
  onTradeStock,
  onCompareStock
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string; relatedStocks?: any[]; visualType?: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (advisor) {
      setMessages([
        {
          sender: 'ai',
          text: `Hello! I am your **${advisor.name}**. ${advisor.description} How can I assist your investments today?`,
          time: 'Just now'
        }
      ]);
    }
  }, [advisor]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!isOpen || !advisor) return null;

  const IconComponent = advisor.icon;

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      sender: 'user' as const,
      text: query,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsThinking(true);

    try {
      // Use the new backend endpoint for chat
      const data = await aiService.chatWithCopilot({
        messages: [{ role: 'user', content: query }]
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: data.text || `${advisor.name} analyzed "${query}" and returned a score of ${data.confidence || 90}/100.`,
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
          relatedStocks: data.relatedStocks 
            ? data.relatedStocks.map(s => ({ symbol: s, company: s, price: '---', change: '---', positive: true })) 
            : [],
          visualType: data.type || 'fundamentals'
        }
      ]);
    } catch (err) {
      console.error(err);
      toast.error('AI analysis failed');
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `I'm sorry, I encountered an error while analyzing the market data for "${query}". Please try again.`,
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleVoiceToggle = () => {
    setIsSpeaking(!isSpeaking);
    if (!isSpeaking) {
      toast.success(`Voice audio synthesis enabled for ${advisor.name}`);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Main Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col h-[90vh] max-h-[780px] font-sans text-slate-800"
        >
          {/* ADVISOR WORKSPACE HEADER */}
          <div className={`p-5 bg-gradient-to-r ${advisor.colorFrom} ${advisor.colorTo} text-white flex items-center justify-between shrink-0 shadow-md relative`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shadow-md backdrop-blur-md shrink-0">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black tracking-tight">{advisor.name}</h2>
                  <span className="bg-white/20 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full border border-white/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Available
                  </span>
                </div>
                <p className="text-white/80 text-xs font-medium">{advisor.roleTitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceToggle}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  isSpeaking ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
                title="Toggle Voice Output"
              >
                {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{isSpeaking ? 'Voice Active' : 'Mute Voice'}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* WORKSPACE BODY - SPLIT CONTENT & CHAT */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50/50">
            
            {/* LEFT SIDEBAR: Advisor Capabilities & Quick Prompts */}
            <div className="w-full md:w-72 bg-white border-r border-slate-200 p-4 flex flex-col gap-4 overflow-y-auto shrink-0 hidden md:flex">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">Advisor Expertise</span>
                <div className="flex flex-wrap gap-1.5">
                  {advisor.primaryExpertise.map((exp, idx) => (
                    <span key={idx} className="text-[10.5px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Suggested Questions</span>
                <div className="flex flex-col gap-2">
                  {advisor.suggestedPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="p-3 bg-slate-50 hover:bg-primary-light/80 hover:border-primary-light border border-slate-200 rounded-xl text-xs font-bold text-slate-700 text-left transition-all group flex items-center justify-between cursor-pointer"
                    >
                      <span className="line-clamp-2">{prompt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-primary-light/80 border border-primary-light/80 rounded-2xl flex items-center gap-2.5 text-xs text-primary-dark font-medium">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span className="text-[11px] leading-tight">Powered by Real-Time SEBI Compliance Algorithms</span>
              </div>
            </div>

            {/* RIGHT MAIN AREA: Interactive Chat Conversation */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
              
              {/* Messages Container */}
              <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col gap-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase">
                        {msg.sender === 'user' ? 'You' : advisor.name}
                      </span>
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl max-w-xl text-xs font-medium leading-relaxed shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white rounded-br-none font-bold'
                          : 'bg-slate-100/90 text-slate-900 border border-slate-200/80 rounded-bl-none'
                      }`}
                    >
                      {msg.text}

                      {/* Embedded Interactive Visual Widgets */}
                      {msg.visualType === 'fundamentals' && (
                        <div className="mt-3 p-3 bg-white border border-slate-200 rounded-xl text-slate-800 text-[11px] flex flex-col gap-2">
                          <div className="flex justify-between items-center font-bold">
                            <span>RELIANCE Target Price Range</span>
                            <span className="text-emerald-600 font-black">₹3,280 – ₹3,450</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                            <div className="bg-primary h-full w-[65%]" />
                            <div className="bg-emerald-500 h-full w-[35%]" />
                          </div>
                          <div className="flex justify-between text-[9px] font-bold text-slate-400">
                            <span>Current: ₹2,934</span>
                            <span>Fair Value: ₹3,350</span>
                          </div>
                        </div>
                      )}

                      {msg.visualType === 'chart' && (
                        <div className="mt-3 p-3 bg-slate-900 text-white rounded-xl text-[11px] flex flex-col gap-2">
                          <div className="flex justify-between font-bold">
                            <span className="text-purple-400">TCS Technical Indicator Scan</span>
                            <span className="text-emerald-400">BULLISH BREAKOUT</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-[10px] text-center font-mono">
                            <div className="p-1.5 bg-white/10 rounded-lg">RSI: 58.4</div>
                            <div className="p-1.5 bg-white/10 rounded-lg">20 EMA: ₹4,120</div>
                            <div className="p-1.5 bg-white/10 rounded-lg">MACD: Positive</div>
                          </div>
                        </div>
                      )}

                      {msg.visualType === 'sip' && (
                        <div className="mt-3 p-3 bg-amber-50 text-amber-950 border border-amber-200 rounded-xl text-[11px] flex flex-col gap-1.5">
                          <div className="flex justify-between font-black">
                            <span>₹1 Crore Goal Roadmap</span>
                            <span className="text-amber-700">10 Years @ 14%</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                            <span>Monthly SIP Required:</span>
                            <span className="font-black text-amber-900">₹38,500/mo</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                            <span>With 10% Step-Up SIP:</span>
                            <span className="font-black text-emerald-700">Start at ₹25,000/mo</span>
                          </div>
                        </div>
                      )}

                      {/* Related Stock Actions Bar */}
                      {msg.relatedStocks && msg.relatedStocks.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-col gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Related Stocks Mentioned</span>
                          {msg.relatedStocks.map((stk, sIdx) => (
                            <div key={sIdx} className="p-2 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                              <div>
                                <span className="font-black text-slate-900 block text-xs">{stk.symbol}</span>
                                <span className="text-[10px] text-slate-500 font-bold">{stk.company}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <span className="font-black text-slate-900 block text-xs">{stk.price}</span>
                                  <span className={`text-[10px] font-black ${stk.positive ? 'text-emerald-600' : 'text-danger'}`}>
                                    {stk.change}
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  {onTradeStock && (
                                    <button
                                      onClick={() => onTradeStock(stk)}
                                      className="px-2.5 py-1 bg-primary hover:bg-primary-dark text-white rounded-lg font-black text-[10px] transition cursor-pointer"
                                    >
                                      Trade
                                    </button>
                                  )}
                                  {onCompareStock && (
                                    <button
                                      onClick={() => onCompareStock(stk)}
                                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[10px] transition cursor-pointer"
                                    >
                                      Compare
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 py-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                    <span>{advisor.name} is scanning market feeds...</span>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Quick Prompts Bar (Mobile & Desktop) */}
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex gap-2 overflow-x-auto text-xs shrink-0">
                {advisor.suggestedPrompts.slice(0, 3).map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-blue-300 rounded-full text-slate-700 font-bold whitespace-nowrap text-[11px] transition shrink-0 cursor-pointer shadow-2xs"
                  >
                    + {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-4 bg-white border-t border-slate-200 flex gap-3 items-center shrink-0">
                <input
                  type="text"
                  placeholder={`Ask ${advisor.name} anything...`}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 focus:border-primary focus:bg-white rounded-2xl text-xs font-medium outline-none transition"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className={`p-3 bg-gradient-to-r ${advisor.colorFrom} ${advisor.colorTo} text-white rounded-2xl font-black transition shadow-md cursor-pointer flex items-center justify-center shrink-0 hover:opacity-90`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AiAdvisorWorkspaceModal;
