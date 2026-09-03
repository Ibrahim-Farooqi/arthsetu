import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SplashScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();

  // Automatic transition to Get Started screen after 2.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/get-started');
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Canvas Network & Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node & Particle Definition
    const numNodes = 45;
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // very slow movement
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      });
    }

    // Trendline Definition (Barely visible upward trend)
    const trendPoints: { x: number; y: number }[] = [];
    const trendLength = 120;
    const startX = -100;
    const endX = width + 100;

    for (let i = 0; i <= trendLength; i++) {
      const x = startX + (i / trendLength) * (endX - startX);
      // Upward trend function with subtle wave
      const baseHeight = height * 0.7 - (i / trendLength) * (height * 0.3);
      const wave = Math.sin(i * 0.08) * 15;
      trendPoints.push({ x, y: baseHeight + wave });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Frame Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Upward Trendline
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(21, 81, 157, 0.08)'; // faint blue
      ctx.lineWidth = 1.5;
      for (let i = 0; i < trendPoints.length; i++) {
        if (i === 0) {
          ctx.moveTo(trendPoints[i].x, trendPoints[i].y);
        } else {
          ctx.lineTo(trendPoints[i].x, trendPoints[i].y);
        }
      }
      ctx.stroke();

      // 2. Draw Network Nodes & Connections
      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];

        // Move nodes slowly
        node.x += node.vx;
        node.y += node.vy;

        // Bounce borders
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(21, 81, 157, 0.25)';
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < numNodes; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(21, 81, 157, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#070B14] overflow-hidden select-none font-sans">
      {/* Background Canvas simulation */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Spacing top */}
      <div className="h-20" />

      {/* Main Centered Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Soft pulsing Blue Halo / Radial Glow */}
        <div className="absolute w-72 h-72 rounded-full bg-primary/20 blur-[90px] animate-pulse pointer-events-none -translate-y-6" />

        {/* Logo Icon with scale entry */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-18 h-18 rounded-[24px] bg-gradient-to-tr from-primary to-success flex items-center justify-center text-white font-extrabold text-3xl shadow-glow-blue border border-white/10"
        >
          U
          {/* Subtle logo shine effect */}
          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-tr from-white/0 via-white/10 to-white/0 rotate-45 pointer-events-none" />
        </motion.div>

        {/* Title & Tagline with upward fade */}
        <div className="flex flex-col items-center gap-2.5 text-center mt-3">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="text-2xl font-black tracking-tight text-white"
          >
            UNIVEST
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-1 text-sm font-semibold text-slate-400"
          >
            <span>Invest Smarter.</span>
            <span>Build Wealth with Confidence.</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="relative z-10 flex flex-col items-center gap-4 mb-16">
        {/* Micro-loading Line Indicator */}
        <div className="w-40 h-[1.5px] bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
            className="relative h-full w-[40%] bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        {/* AI Research Caption */}
        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-600">
          Powered by AI Research
        </span>
      </div>
    </div>
  );
};
export default SplashScreen;
