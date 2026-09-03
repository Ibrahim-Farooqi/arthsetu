import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, BookOpen, CheckCircle2, Play, Award, Bookmark, 
  Sparkles, Clock, ArrowRight, HelpCircle, ShieldCheck, BarChart3, 
  TrendingUp, FileText, Check, Lock, Download, Star, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface LearningCenterProps {
  onSelectStock?: (stock: any) => void;
  onSelectResearch?: (research: any) => void;
}

export const LearningCenter: React.FC<LearningCenterProps> = ({
  onSelectStock,
  onSelectResearch
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSubTab, setActiveSubTab] = useState<'Courses' | 'Quizzes' | 'Progress' | 'Certificates' | 'Bookmarks'>('Courses');
  const [bookmarkedLessons, setBookmarkedLessons] = useState<string[]>(['c1']);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['c1_m1', 'c1_m2']);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const categories = [
    'All', 'Stocks', 'Mutual Funds', 'ETF', 'Technical Analysis', 
    'Fundamental Analysis', 'Risk', 'Tax', 'IPO', 'F&O'
  ];

  const courses = [
    {
      id: 'c1',
      title: 'Mastering Technical Analysis & Breakout Trading',
      category: 'Technical Analysis',
      level: 'Intermediate',
      duration: '45 mins',
      modules: 5,
      completedModules: 2,
      author: 'SEBI Lead Technical Analyst',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=600&auto=format&fit=crop',
      summary: 'Learn RSI momentum indicators, 50/200 DMA golden crossovers, and risk-managed entry points on Indian stock charts.',
      lessons: [
        { id: 'c1_m1', title: 'Introduction to Candlestick Patterns', duration: '8m', isDone: true },
        { id: 'c1_m2', title: 'Identifying Support & Resistance Zones', duration: '12m', isDone: true },
        { id: 'c1_m3', title: 'RSI & MACD Crossover Confirmation', duration: '10m', isDone: false },
        { id: 'c1_m4', title: 'Setting Stop Loss & Target Ratios', duration: '10m', isDone: false },
        { id: 'c1_m5', title: 'Live Chart Breakout Case Study', duration: '5m', isDone: false }
      ]
    },
    {
      id: 'c2',
      title: 'Fundamental Valuation & Equity Balance Sheets',
      category: 'Fundamental Analysis',
      level: 'Advanced',
      duration: '1 hr 15 mins',
      modules: 6,
      completedModules: 0,
      author: 'ArthSetu Equity Research Desk',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
      summary: 'Decode balance sheets, P/E ratios, Return on Equity (ROE), and cash flow stability before buying long-term equities.',
      lessons: [
        { id: 'c2_m1', title: 'Income Statement vs Cash Flow Statement', duration: '15m', isDone: false },
        { id: 'c2_m2', title: 'Evaluating ROE, ROCE & Debt Ratios', duration: '15m', isDone: false }
      ]
    },
    {
      id: 'c3',
      title: 'Futures & Options Risk Hedging Strategies',
      category: 'F&O',
      level: 'Advanced',
      duration: '50 mins',
      modules: 4,
      completedModules: 0,
      author: 'Derivatives Head Strategist',
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop',
      summary: 'Protect portfolio downside using covered calls and put spreads during volatile earnings seasons.',
      lessons: [
        { id: 'c3_m1', title: 'Option Greeks: Delta, Theta & Vega', duration: '15m', isDone: false }
      ]
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: 'What does a Relative Strength Index (RSI) reading above 70 usually indicate?',
      options: ['Stock is oversold', 'Stock is overbought / near short-term peak', 'Stock is delisted', 'No volume'],
      correct: 1
    },
    {
      id: 2,
      question: 'In fundamental analysis, what is Return on Equity (ROE)?',
      options: ['Total revenue divided by stock price', 'Net profit expressed as a percentage of shareholders equity', 'Dividend paid per share', 'Market capitalisation'],
      correct: 1
    }
  ];

  const filteredCourses = courses.filter(c => {
    if (activeCategory === 'All') return true;
    return c.category === activeCategory;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedLessons(prev => {
      const exists = prev.includes(id);
      toast.success(exists ? 'Removed from Bookmarks' : 'Course saved to Bookmarks');
      return exists ? prev.filter(i => i !== id) : [...prev, id];
    });
  };

  const handleAnswerQuiz = (qIndex: number, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) score++;
    });
    const percent = Math.round((score / quizQuestions.length) * 100);
    setQuizScore(percent);
    toast.success(`Quiz completed! You scored ${percent}%`);
  };

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500 pb-16">
      
      {/* 1. HERO ACADEMY HEADER */}
      <section className="relative overflow-hidden rounded-[28px] p-6 sm:p-8 bg-[#172033] text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-[#64748B] fill-[#64748B]" />
              <span className="text-xs font-black text-[#64748B] uppercase tracking-widest">ARTHSETU INVESTOR ACADEMY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
              SEBI-Aligned Investor Literacy Masterclasses
            </h1>

            <p className="text-xs text-slate-300 font-medium leading-relaxed mb-6">
              Master stock evaluation, technical chart setups, derivatives risk hedging, and tax efficiency with interactive modules.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveSubTab('Courses')}
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition shadow-lg flex items-center gap-2"
              >
                Continue Active Course <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveSubTab('Certificates')}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black text-xs transition flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-emerald-400" /> View Certificates
              </button>
            </div>
          </div>

          {/* User Learning Progress Card */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md shrink-0 flex flex-col gap-4 min-w-[280px]">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Overall Literacy Progress</span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                68% COMPLETE
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Modules Completed</span>
              <span className="text-xl font-black text-[#64748B]">14 / 20</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Certificates Earned</span>
              <span className="text-xs font-bold text-slate-200">2 Verified Badges</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY CONTINUE LEARNING CARD */}
      <section className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center shrink-0">
            <Play className="w-5 h-5 fill-primary" />
          </div>
          <div>
            <span className="text-[10px] font-black text-primary uppercase">Resume Learning · Technical Analysis</span>
            <h3 className="font-black text-base text-[#172033]">Mastering Technical Analysis & Breakout Trading</h3>
            <span className="text-xs text-slate-400 font-bold">Module 3 of 5 · RSI & MACD Crossover Confirmation</span>
          </div>
        </div>

        <button
          onClick={() => toast.success('Launching Module 3 Video Masterclass...')}
          className="px-6 py-3 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-black text-xs transition shadow-sm whitespace-nowrap"
        >
          Resume Lesson →
        </button>
      </section>

      {/* 3. CORE SUB-TABS (Courses, Quizzes, Progress, Certificates, Bookmarks) */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3 gap-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['Courses', 'Quizzes', 'Progress', 'Certificates', 'Bookmarks'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition ${
                activeSubTab === tab ? 'bg-[#172033] text-white shadow-sm' : 'text-slate-500 hover:text-[#172033]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 4. CATEGORY FILTER CHIPS */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-[#E2E8F0] rounded-2xl w-full overflow-x-auto shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap shrink-0 ${
              activeCategory === cat ? 'bg-primary text-white shadow-xs' : 'text-slate-500 hover:text-[#172033]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 5. TAB 1: COURSES GRID */}
      {activeSubTab === 'Courses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                    {course.category}
                  </span>
                  <span className="bg-primary text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase">
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mb-1">
                    <span>By {course.author}</span>
                    <span>{course.duration}</span>
                  </div>
                  <h3 className="font-black text-base text-[#172033] leading-snug group-hover:text-primary transition mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
                    {course.summary}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>Progress ({course.completedModules}/{course.modules} Modules)</span>
                    <span>{Math.round((course.completedModules / course.modules) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(course.completedModules / course.modules) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2">
                    <button
                      onClick={() => toast.success(`Launching ${course.title}`)}
                      className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition text-center shadow-xs"
                    >
                      {course.completedModules > 0 ? 'Continue Course' : 'Start Course'}
                    </button>
                    <button
                      onClick={(e) => toggleBookmark(course.id, e)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-primary transition"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedLessons.includes(course.id) ? 'fill-primary text-primary' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. TAB 2: INTERACTIVE QUIZZES */}
      {activeSubTab === 'Quizzes' && (
        <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#172033]">SEBI Literacy Benchmark Quiz</h3>
              <p className="text-xs text-slate-500 font-medium">Test your knowledge to unlock verified certificates.</p>
            </div>
            {quizScore !== null && (
              <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                Latest Score: {quizScore}%
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {quizQuestions.map((q, idx) => (
              <div key={q.id} className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-2xl flex flex-col gap-3">
                <h4 className="font-black text-sm text-[#172033]">
                  Q{idx + 1}: {q.question}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                  {q.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswerQuiz(idx, optIdx)}
                      className={`p-3 rounded-xl border text-left transition font-bold ${
                        userAnswers[idx] === optIdx
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmitQuiz}
              className="self-end px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs transition shadow-md"
            >
              Submit Quiz & Verify Score
            </button>
          </div>
        </div>
      )}

      {/* 7. TAB 3: PROGRESS & CERTIFICATES */}
      {(activeSubTab === 'Progress' || activeSubTab === 'Certificates') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-black text-[#172033]">SEBI Technical Analysis Certificate</h3>
            </div>
            <p className="text-xs text-slate-600">Issued to Omar Khan upon achieving 90%+ on Technical Chart Masterclass.</p>
            <button
              onClick={() => toast.success('Downloading Official SEBI Investor Literacy Certificate (PDF)...')}
              className="py-3 rounded-xl bg-[#172033] text-white font-black text-xs hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Certificate (PDF)
            </button>
          </div>

          <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <h3 className="text-base font-black text-[#172033]">Fundamental Valuation Certificate</h3>
            </div>
            <p className="text-xs text-slate-600">Issued upon completion of Balance Sheet & Equity Valuation modules.</p>
            <button
              onClick={() => toast.success('Downloading Certificate (PDF)...')}
              className="py-3 rounded-xl bg-slate-100 text-slate-700 font-black text-xs hover:bg-slate-200 transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Certificate (PDF)
            </button>
          </div>

        </div>
      )}

      {/* 8. TAB 4: BOOKMARKS */}
      {activeSubTab === 'Bookmarks' && (
        <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-base font-black text-[#172033]">Saved Courses & Bookmarks</h3>
          {bookmarkedLessons.length > 0 ? (
            <div className="flex flex-col gap-3">
              {courses.filter(c => bookmarkedLessons.includes(c.id)).map(c => (
                <div key={c.id} className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase">{c.category}</span>
                    <h4 className="font-black text-sm text-[#172033]">{c.title}</h4>
                    <span className="text-[10px] text-slate-400">{c.duration} · {c.level}</span>
                  </div>
                  <button
                    onClick={() => toast.success(`Launching ${c.title}`)}
                    className="px-4 py-2 rounded-xl bg-primary text-white font-black text-xs"
                  >
                    Open Course
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400 font-bold text-xs">No bookmarked courses yet.</div>
          )}
        </div>
      )}

    </div>
  );
};

export default LearningCenter;
