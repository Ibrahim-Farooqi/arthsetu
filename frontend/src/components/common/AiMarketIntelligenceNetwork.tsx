import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  color: string;
  depth: number; // 1: fg (fastest/sharpest), 2: mg, 3: bg (slowest/blurred)
}

interface Particle {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface AiMarketIntelligenceNetworkProps {
  theme?: 'dark' | 'light';
  width?: number;
  height?: number;
}

export const AiMarketIntelligenceNetwork: React.FC<AiMarketIntelligenceNetworkProps> = ({
  theme = 'dark',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [momentState, setMomentState] = useState<string>('observing');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 520);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color Palette: Luxury restraint
    const COLORS = [
      '#15519D', // Royal Blue
      '#15519D', // Royal Blue (dominant)
      '#16A34A', // Emerald Green
      '#38BDF8', // Soft Cyan
      '#FFFFFF', // Pure White (rare)
    ];

    // Generate 180 Nodes across 3 depth layers
    const NODE_COUNT = 180;
    const nodes: Node[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const depth = Math.random() < 0.25 ? 1 : Math.random() < 0.65 ? 2 : 3;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (depth === 1 ? 0.4 : 0.2),
        vy: (Math.random() - 0.5) * (depth === 1 ? 0.4 : 0.2),
        radius: depth === 1 ? 2.5 : depth === 2 ? 1.8 : 1.2,
        baseAlpha: depth === 1 ? 0.8 : depth === 2 ? 0.5 : 0.25,
        alpha: depth === 1 ? 0.8 : depth === 2 ? 0.5 : 0.25,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        depth,
      });
    }

    // Generate Data Stream Particles
    const PARTICLE_COUNT = 40;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const from = Math.floor(Math.random() * NODE_COUNT);
      let to = Math.floor(Math.random() * NODE_COUNT);
      while (to === from) to = Math.floor(Math.random() * NODE_COUNT);

      particles.push({
        fromNode: from,
        toNode: to,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        color: Math.random() > 0.4 ? '#38BDF8' : '#16A34A',
      });
    }

    // "Moment of Intelligence" Event Controller (every 12 seconds)
    let intelligenceTimer = 0;
    let isIntelligenceMoment = false;
    let clusterCenterNode = 0;
    let pulseRadius = 0;

    // Mouse Movement Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Main 60 FPS Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep Navy Mesh Lighting Background
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, width * 0.65
      );
      bgGrad.addColorStop(0, 'rgba(21, 81, 157, 0.12)');
      bgGrad.addColorStop(0.5, 'rgba(22, 163, 74, 0.05)');
      bgGrad.addColorStop(1, '#172033');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      intelligenceTimer += 1;

      // Trigger Moment of Intelligence every ~720 frames (12 seconds at 60fps)
      if (intelligenceTimer % 720 === 0) {
        isIntelligenceMoment = true;
        clusterCenterNode = Math.floor(Math.random() * NODE_COUNT);
        pulseRadius = 0;
        setMomentState('intelligence-detected');

        setTimeout(() => {
          isIntelligenceMoment = false;
          setMomentState('observing');
        }, 3000);
      }

      // 1. Update and Move Nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        // Bounce off canvas boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Magnetic Cursor Attraction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          node.x += (dx / dist) * force * 1.5;
          node.y += (dy / dist) * force * 1.5;
        }

        // Moment of Intelligence Convergence toward cluster center
        if (isIntelligenceMoment) {
          const targetNode = nodes[clusterCenterNode];
          const cdx = targetNode.x - node.x;
          const cdy = targetNode.y - node.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < 200 && cdist > 20) {
            node.x += (cdx / cdist) * 0.8;
            node.y += (cdy / cdist) * 0.8;
            node.alpha = Math.min(1, node.baseAlpha + 0.3);
          }
        } else {
          node.alpha += (node.baseAlpha - node.alpha) * 0.05;
        }

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.depth === 1 ? 6 : 0;
        ctx.fill();
      }

      // 2. Draw Organic Neural Connection Lines
      ctx.shadowBlur = 0;
      const MAX_LINK_DIST = 95;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_LINK_DIST) {
            const alpha = (1 - dist / MAX_LINK_DIST) * 0.35 * n1.baseAlpha;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = n1.color;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 3. Draw Traveling Data Particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        const n1 = nodes[p.fromNode];
        const n2 = nodes[p.toNode];

        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.fromNode = p.toNode;
          p.toNode = Math.floor(Math.random() * NODE_COUNT);
        }

        const px = n1.x + (n2.x - n1.x) * p.progress;
        const py = n1.y + (n2.y - n1.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      // 4. Moment of Intelligence Luminous Emerald Scan Pulse Circle
      if (isIntelligenceMoment) {
        pulseRadius += 4;
        const centerNode = nodes[clusterCenterNode];

        ctx.beginPath();
        ctx.arc(centerNode.x, centerNode.y, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#16A34A';
        ctx.globalAlpha = Math.max(0, 0.6 - pulseRadius / 250);
        ctx.lineWidth = 2;
        ctx.shadowColor = '#16A34A';
        ctx.shadowBlur = 15;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[520px] flex items-center justify-center select-none overflow-hidden rounded-[32px]">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

      {/* Abstract Moment of Intelligence Subtle Status Tag */}
      <div className="absolute bottom-4 right-6 pointer-events-none font-mono text-[10px] text-slate-400 opacity-60 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${momentState === 'intelligence-detected' ? 'bg-emerald-400 animate-ping' : 'bg-blue-400'}`} />
        <span>{momentState === 'intelligence-detected' ? 'AI MOMENT OF INTELLIGENCE' : 'AI NEURAL STREAM ONLINE'}</span>
      </div>
    </div>
  );
};

export default AiMarketIntelligenceNetwork;
