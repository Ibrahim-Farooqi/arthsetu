import React, { useEffect, useRef } from 'react';

interface CenteredHeroBackgroundProps {
  theme?: 'dark' | 'light';
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

export const CenteredHeroBackground: React.FC<CenteredHeroBackgroundProps> = ({
  theme = 'dark',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Static Particle composition (no velocities, completely static)
    const PARTICLE_COUNT = 80;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() > 0.5 ? 1.5 : 0.8,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    // Mouse Move handlers for subtle interactive parallax shift
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Render loop (updates only mouse interactive shifts, but is otherwise stationary)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';

      // 1. Solid Clean Background Color
      ctx.fillStyle = isDark ? '#172033' : '#F8FAFC';
      ctx.fillRect(0, 0, width, height);

      // 2. Liquid Mesh Gradients Behind Content (Low saturation, luxury atmosphere)
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.4,
        100,
        width / 2,
        height / 2,
        width * 0.75
      );

      if (isDark) {
        gradient.addColorStop(0, 'rgba(21, 81, 157, 0.08)'); // Royal Blue
        gradient.addColorStop(0.5, 'rgba(22, 163, 74, 0.03)'); // Emerald Green
        gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(21, 81, 157, 0.04)'); // Light Royal Blue
        gradient.addColorStop(0.5, 'rgba(22, 163, 74, 0.02)'); // Light Emerald Green
        gradient.addColorStop(1, 'rgba(248, 250, 252, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Vertical Stripe Lines (Static Vercel/Stripe style layout grid)
      const gridSpacing = 80; // Vertical lines spaced 80px apart
      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.035)' : 'rgba(15, 23, 42, 0.035)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 4. Draw Stationary Neural Particles (react subtly to cursor proximity only)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        
        let displayX = p.x;
        let displayY = p.y;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.hypot(dx, dy);

        // Subtly pull particle towards cursor slightly if nearby to keep organic responsiveness
        if (dist < 150) {
          const factor = (150 - dist) / 150;
          displayX += (dx / dist) * factor * 5;
          displayY += (dy / dist) * factor * 5;
        }

        ctx.beginPath();
        ctx.arc(displayX, displayY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${p.alpha})`
          : `rgba(15, 23, 42, ${p.alpha * 0.75})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default CenteredHeroBackground;
