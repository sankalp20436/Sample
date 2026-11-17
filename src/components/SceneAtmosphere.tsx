import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export interface LightPoint {
  x: string;
  y: string;
  size?: number;
  delay?: number;
  duration?: number;
}

/**
 * Organic twinkling diya & lantern halos with pinpoint warm flame cores.
 */
export function DiyaTwinkleLights({ lights }: { lights: LightPoint[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {lights.map((light, idx) => {
        const size = light.size ?? 34;
        const duration = light.duration ?? 2.3 + (idx % 5) * 0.35;
        const delay = light.delay ?? (idx % 7) * 0.32;
        return (
          <div
            key={idx}
            style={{
              left: light.x,
              top: light.y,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
            className="animate-diya-flicker absolute mix-blend-screen rounded-full"
          >
            {/* Outer warm amber halo */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,232,163,0.95) 0%, rgba(255,180,75,0.58) 38%, rgba(255,130,35,0.16) 68%, transparent 100%)',
              }}
            />
            {/* Bright inner diya flame core */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[26%] h-[30%] rounded-full bg-[#FFF7D6] blur-[0.8px]"
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Perspective-foreshortened canvas pond water ripples + shimmering golden reflections.
 */
export function PondWaterRipples({
  regionClassName,
  rippleCenters,
}: {
  regionClassName: string;
  rippleCenters?: Array<{ rx: number; ry: number }>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const centers = rippleCenters ?? [
      { rx: 0.32, ry: 0.44 },
      { rx: 0.64, ry: 0.36 },
      { rx: 0.48, ry: 0.62 },
      { rx: 0.25, ry: 0.72 },
      { rx: 0.72, ry: 0.68 },
    ];

    interface Ripple {
      cx: number;
      cy: number;
      age: number;
      maxAge: number;
      maxRadius: number;
    }

    const ripples: Ripple[] = centers.map((c, idx) => ({
      cx: c.rx,
      cy: c.ry,
      age: (idx * 38) % 180,
      maxAge: 170 + (idx % 3) * 30,
      maxRadius: 34 + (idx % 3) * 14,
    }));

    let rafId = 0;
    let tick = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w > 0 && h > 0) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      tick += 0.025;

      // Soft horizontal undulating water wave bands
      for (let i = 0; i < 12; i++) {
        const py = h * (0.14 + (i / 12) * 0.78);
        const waveW = w * (0.18 + ((i * 19) % 24) / 100);
        const px = w * (0.12 + ((i * 29) % 68) / 100) + Math.sin(tick + i * 1.1) * 10;
        const alpha = 0.09 + 0.08 * Math.sin(tick * 1.4 + i);

        const grad = ctx.createLinearGradient(px, py, px + waveW, py);
        grad.addColorStop(0, 'rgba(255, 240, 200, 0)');
        grad.addColorStop(0.5, `rgba(255, 234, 185, ${alpha.toFixed(3)})`);
        grad.addColorStop(1, 'rgba(255, 240, 200, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.quadraticCurveTo(px + waveW * 0.5, py + Math.sin(tick + i) * 2, px + waveW, py);
        ctx.stroke();
      }

      // Concentric perspective water ripples around lotuses & fountain
      for (const r of ripples) {
        r.age += 1;
        if (r.age >= r.maxAge) {
          r.age = 0;
        }
        const progress = r.age / r.maxAge;
        const radiusX = 4 + progress * r.maxRadius;
        const radiusY = radiusX * 0.34; // perspective flatten on pond surface
        const alpha = (1 - progress) * 0.42;

        ctx.strokeStyle = `rgba(255, 244, 214, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.ellipse(r.cx * w, r.cy * h, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary trailing inner ring
        if (progress > 0.22) {
          const p2 = progress - 0.22;
          const rx2 = 3 + p2 * r.maxRadius;
          const ry2 = rx2 * 0.34;
          const a2 = (1 - progress) * 0.24;
          ctx.strokeStyle = `rgba(255, 214, 150, ${a2.toFixed(3)})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.ellipse(r.cx * w, r.cy * h, rx2, ry2, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [rippleCenters]);

  return (
    <div className={`pointer-events-none absolute overflow-hidden ${regionClassName}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full mix-blend-screen" />
    </div>
  );
}

interface BirdSpec {
  id: number;
  startX: string;
  endX: string;
  top: string;
  arcY: number;
  size: number;
  duration: number;
  delay: number;
  flapDuration: number;
  opacity: number;
}

const DEFAULT_BIRDS: BirdSpec[] = [
  { id: 1, startX: '-8vw', endX: '108vw', top: '12%', arcY: -24, size: 22, duration: 24, delay: 0, flapDuration: 0.62, opacity: 0.58 },
  { id: 2, startX: '-12vw', endX: '108vw', top: '15%', arcY: -18, size: 17, duration: 26, delay: 1.4, flapDuration: 0.54, opacity: 0.5 },
  { id: 3, startX: '-10vw', endX: '108vw', top: '9%', arcY: -20, size: 15, duration: 28, delay: 3.1, flapDuration: 0.68, opacity: 0.44 },
  { id: 4, startX: '108vw', endX: '-10vw', top: '19%', arcY: -16, size: 18, duration: 29, delay: 6, flapDuration: 0.58, opacity: 0.48 },
  { id: 5, startX: '112vw', endX: '-10vw', top: '22%', arcY: -12, size: 13, duration: 31, delay: 7.8, flapDuration: 0.5, opacity: 0.4 },
];

/**
 * Graceful wing-flapping silhouette birds gliding across the twilight sky.
 */
export function FlyingTwilightBirds({
  birds = DEFAULT_BIRDS,
  className = '',
}: {
  birds?: BirdSpec[];
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {birds.map((b) => {
        const flyingLeft = b.startX.startsWith('1');
        return (
          <motion.div
            key={b.id}
            initial={{ left: b.startX, y: 0, opacity: 0 }}
            animate={{
              left: [b.startX, b.endX],
              y: [0, b.arcY, -b.arcY * 0.4, 0],
              opacity: [0, b.opacity, b.opacity, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.08, 0.92, 1],
            }}
            style={{ top: b.top }}
            className="absolute"
          >
            <svg
              viewBox="0 0 36 18"
              style={{
                width: `${b.size}px`,
                height: `${b.size * 0.5}px`,
                animationDuration: `${b.flapDuration}s`,
                transform: flyingLeft ? 'scaleX(-1)' : undefined,
              }}
              className="animate-bird-flap text-[#4E2438]"
              fill="none"
            >
              <path
                d="M2 12 Q10 2 18 11 Q26 2 34 12"
                stroke="currentColor"
                strokeWidth="2.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
