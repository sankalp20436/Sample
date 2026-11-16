import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoyalElephantCutout } from './RoyalOrnaments';

interface SlotReelProps {
  items: string[];
  spinning: boolean;
  revealed: boolean;
  duration: number;
  label: string;
}

/**
 * Ornate Mughal scalloped maroon lotus crest with rising pink buds matching the reference image.
 */
function MaroonLotusCrest() {
  return (
    <svg viewBox="0 0 380 210" fill="none" className="w-[260px] sm:w-[340px] h-auto select-none pointer-events-none" aria-hidden="true">
      {/* Arching Gold & Olive Botanical Stems */}
      <g stroke="#6D7D43" strokeWidth="2.2" strokeLinecap="round">
        <path d="M190 150 L190 30" />
        <path d="M190 150 C150 155, 118 135, 92 104" />
        <path d="M190 150 C230 155, 262 135, 288 104" />
        <path d="M150 152 C110 165, 76 154, 48 132" />
        <path d="M230 152 C270 165, 304 154, 332 132" />
        <path d="M168 158 C132 178, 92 176, 62 162" />
        <path d="M212 158 C248 178, 288 176, 318 162" />
        <path d="M190 76 Q170 58 162 42" />
        <path d="M190 76 Q210 58 218 42" />
      </g>

      {/* Gold Scroll Accents */}
      <g stroke="#C6923B" strokeWidth="1.4" strokeLinecap="round">
        <path d="M142 118 C126 108, 126 92, 138 90" />
        <path d="M238 118 C254 108, 254 92, 242 90" />
        <path d="M114 148 C96 140, 88 124, 98 118" />
        <path d="M266 148 C284 140, 292 124, 282 118" />
      </g>

      {/* Leaves */}
      {[
        [152, 165, -24],
        [228, 165, 24],
        [114, 152, -32],
        [266, 152, 32],
        [96, 128, -42],
        [284, 128, 42],
        [178, 86, -28],
        [202, 86, 28],
      ].map(([x, y, rot], idx) => (
        <path
          key={idx}
          d={`M ${x} ${y} C ${x - 14} ${y - 7}, ${x - 24} ${y - 2}, ${x - 26} ${y + 5} C ${x - 16} ${y + 10}, ${x - 4} ${y + 6}, ${x} ${y} Z`}
          transform={`rotate(${rot} ${x} ${y})`}
          fill="#677D44"
          stroke="#C89643"
          strokeWidth="0.9"
        />
      ))}

      {/* Pink Lotus Buds around Crest */}
      {[
        [190, 24, 0, 1.05],
        [162, 40, -28, 0.85],
        [218, 40, 28, 0.85],
        [92, 98, -42, 0.95],
        [288, 98, 42, 0.95],
        [44, 126, -58, 0.9],
        [336, 126, 58, 0.9],
        [58, 160, -76, 0.8],
        [322, 160, 76, 0.8],
      ].map(([cx, cy, rot, sc], idx) => (
        <g key={idx} transform={`translate(${cx}, ${cy}) rotate(${rot}) scale(${sc})`}>
          <path d="M0 -16 C-8 -6, -8 6, 0 11 C8 6, 8 -6, 0 -16Z" fill="#F4A5B8" stroke="#9C2E4A" strokeWidth="1" />
          <path d="M-3 -10 C-11 -4, -10 7, -1 11 Z" fill="#DA6A89" stroke="#9C2E4A" strokeWidth="0.8" />
          <path d="M3 -10 C11 -4, 10 7, 1 11 Z" fill="#DA6A89" stroke="#9C2E4A" strokeWidth="0.8" />
          <path d="M-5 8 Q0 14 5 8" stroke="#677D44" strokeWidth="2.4" fill="none" />
        </g>
      ))}

      {/* Center Grand Crimson & Gold Lotus */}
      <g transform="translate(190, 134)">
        <path d="M0 -54 C-16 -28, -14 8, 0 22 C14 8, 16 -28, 0 -54Z" fill="#7D0928" stroke="#E5B964" strokeWidth="1.5" />
        <path d="M-7 -42 C-34 -34, -38 8, -9 22 C-2 10, -2 -18, -7 -42Z" fill="#680520" stroke="#E5B964" strokeWidth="1.3" />
        <path d="M7 -42 C34 -34, 38 8, 9 22 C2 10, 2 -18, 7 -42Z" fill="#680520" stroke="#E5B964" strokeWidth="1.3" />
        <path d="M-18 -24 C-52 -24, -56 10, -16 24 C-6 14, -10 -4, -18 -24Z" fill="#520318" stroke="#E5B964" strokeWidth="1.2" />
        <path d="M18 -24 C52 -24, 56 10, 16 24 C6 14, 10 -4, 18 -24Z" fill="#520318" stroke="#E5B964" strokeWidth="1.2" />
        {/* Lower Sepals */}
        <path d="M0 16 C-12 28, -28 24, -22 34 C-10 38, -2 30, 0 24 C2 30, 10 38, 22 34 C28 24, 12 28, 0 16Z" fill="#8A1032" stroke="#E5B964" strokeWidth="1.1" />
        <path d="M0 24 L-7 39 L0 48 L7 39 Z" fill="#6D0824" stroke="#E5B964" strokeWidth="1.1" />
        {/* Inner Gold Stamen Glow */}
        <ellipse cx="0" cy="14" rx="12" ry="6" fill="#F2C879" fillOpacity="0.9" />
      </g>
    </svg>
  );
}

/**
 * Dual-cannon party popper confetti canvas burst when the wedding date is revealed.
 */
function PartyPopperConfetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const colors = ['#D4A24E', '#FCE5A2', '#6D1230', '#A31D46', '#F4A5B8', '#FFFFFF', '#E58F4B'];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      color: string;
      rot: number;
      vRot: number;
      life: number;
      maxLife: number;
      shape: 'rect' | 'circle' | 'ribbon';
    }

    const particles: Particle[] = [];
    const spawnBurst = (originX: number, originY: number, dir: 1 | -1) => {
      for (let i = 0; i < 65; i++) {
        const angle = (dir === 1 ? -Math.PI / 3 : (-2 * Math.PI) / 3) + (Math.random() - 0.5) * 0.95;
        const speed = 6 + Math.random() * 11;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5,
          w: 6 + Math.random() * 6,
          h: 4 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.28,
          life: 0,
          maxLife: 115 + Math.random() * 45,
          shape: Math.random() > 0.72 ? 'circle' : Math.random() > 0.4 ? 'ribbon' : 'rect',
        });
      }
    };

    // Fire party poppers from left, right, and center plaques
    spawnBurst(width * 0.18, height * 0.72, 1);
    spawnBurst(width * 0.82, height * 0.72, -1);
    spawnBurst(width * 0.5, height * 0.65, Math.random() > 0.5 ? 1 : -1);

    let rafId = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      for (const p of particles) {
        if (p.life >= p.maxLife) continue;
        alive = true;
        p.life += 1;
        p.vy += 0.22; // gravity
        p.vx *= 0.985; // air drag
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        const alpha = Math.max(0, 1 - Math.pow(p.life / p.maxLife, 2));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.w * 0.42, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.fillRect(-p.w * 0.7, -p.h * 0.25, p.w * 1.4, p.h * 0.5);
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }

      if (alive) {
        rafId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full z-30"
    />
  );
}

function ScallopedPlaque({ items, spinning, revealed, duration, label }: SlotReelProps) {
  const rowHeight = 68;
  const targetOffset = -((items.length - 1) * rowHeight);

  return (
    <div className="relative flex flex-col items-center">
      {/* Ornate Cream Scalloped Top Label Badge overlapping plaque top edge */}
      <div className="relative z-20 -mb-4 sm:-mb-5 flex items-center justify-center w-[104px] h-[34px] sm:w-[120px] sm:h-[38px]">
        <svg viewBox="0 0 130 42" className="absolute inset-0 w-full h-full drop-shadow-sm" aria-hidden="true">
          <path
            d="M18,6 C30,6 34,2 48,2 L82,2 C96,2 100,6 112,6 C122,6 127,13 127,21 C127,29 122,36 112,36 C100,36 96,40 82,40 L48,40 C34,40 30,36 18,36 C8,36 3,29 3,21 C3,13 8,6 18,6 Z"
            fill="#F5E5CE"
            stroke="#B9873D"
            strokeWidth="1.5"
          />
          <path
            d="M20,9 C31,9 35,5 48,5 L82,5 C95,5 99,9 110,9 C118,9 123,14 123,21 C123,28 118,33 110,33 C99,33 95,37 82,37 L48,37 C35,37 31,33 20,33 C12,33 7,28 7,21 C7,14 12,9 20,9 Z"
            fill="none"
            stroke="#822938"
            strokeOpacity="0.35"
            strokeWidth="0.8"
          />
        </svg>
        <span className="relative z-10 font-serif font-semibold text-[11px] sm:text-xs tracking-[0.22em] text-[#5C1726] uppercase">
          {label}
        </span>
      </div>

      {/* Mughal Scalloped Maroon Cartouche */}
      <div className="relative w-[156px] h-[112px] sm:w-[200px] sm:h-[138px] flex items-center justify-center">
        <svg
          viewBox="0 0 210 144"
          className="absolute inset-0 w-full h-full drop-shadow-[0_12px_24px_rgba(77,8,33,0.28)]"
          aria-hidden="true"
        >
          {/* Outer Scalloped Maroon Body */}
          <path
            d="M36,16 C56,16 68,6 105,6 C142,6 154,16 174,16 C192,16 202,32 202,52 C202,60 206,66 206,72 C206,78 202,84 202,92 C202,112 192,128 174,128 C154,128 142,138 105,138 C68,138 56,128 36,128 C18,128 8,112 8,92 C8,84 4,78 4,72 C4,66 8,60 8,52 C8,32 18,16 36,16 Z"
            fill="#680425"
            stroke="#FAF0E2"
            strokeWidth="2.4"
          />
          {/* Crisp Antique Gold Inner Frame */}
          <path
            d="M38,20 C57,20 69,11 105,11 C141,11 153,20 172,20 C188,20 197,34 197,53 C197,60 201,66 201,72 C201,78 197,84 197,91 C197,110 188,124 172,124 C153,124 141,133 105,133 C69,133 57,124 38,124 C22,124 13,110 13,91 C13,84 9,78 9,72 C9,66 13,60 13,53 C13,34 22,20 38,20 Z"
            fill="none"
            stroke="#D6A347"
            strokeWidth="1.5"
          />
        </svg>

        {/* Slot Machine Reel Window */}
        <div className="relative z-10 h-[68px] w-[124px] sm:w-[152px] overflow-hidden flex items-start justify-center mt-1">
          {(spinning || revealed) && (
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: targetOffset }}
              transition={{
                duration,
                ease: [0.18, 0.88, 0.24, 1.04],
              }}
              className="flex flex-col items-center w-full"
            >
              {items.map((val, idx) => (
                <div
                  key={`${val}-${idx}`}
                  style={{ height: `${rowHeight}px` }}
                  className="flex items-center justify-center w-full font-serif font-semibold text-3xl sm:text-[42px] text-[#FAF0E2] tracking-wider tabular-nums select-none"
                >
                  {val}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

const DATE_REEL = ['07', '19', '14', '22', '11', '10', '05', '28', '01'];
const MONTH_REEL = ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'JAN', 'MAY', 'NOV', 'DEC'];
const YEAR_REEL = ['2022', '2023', '2024', '2025', '2024', '2025', '2026'];

export function SaveTheDateReveal() {
  const [phase, setPhase] = useState<'idle' | 'spinning' | 'revealed'>('idle');

  const handleReveal = () => {
    if (phase !== 'idle') return;
    setPhase('spinning');
    window.setTimeout(() => {
      setPhase('revealed');
    }, 2050);
  };

  return (
    <section className="relative w-full py-10 sm:py-14 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Party Popper Confetti Effect on Reveal */}
      <PartyPopperConfetti active={phase === 'revealed'} />

      {/* Top Symmetrical Maroon Lotus & Buds Crest */}
      <div className="mb-3 sm:mb-4 relative z-0 flex justify-center">
        <MaroonLotusCrest />
      </div>

      {/* Main Row: Flanking Elephants slightly overlapping outer Date/Year Cartouches */}
      <div className="relative z-10 w-full max-w-[1040px] mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-center">
        {/* Left Ceremonial Elephant (facing right) */}
        <div className="hidden lg:block shrink-0 -mr-10 xl:-mr-12 -mb-5 relative z-20">
          <RoyalElephantCutout
            flip
            alt="Left royal elephant"
            className="w-52 xl:w-60 h-52 xl:h-60"
          />
        </div>

        {/* 3 Scalloped Date Cartouches */}
        <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 sm:gap-6">
          <ScallopedPlaque
            label="Date"
            items={DATE_REEL}
            spinning={phase === 'spinning'}
            revealed={phase === 'revealed'}
            duration={1.35}
          />
          <ScallopedPlaque
            label="Month"
            items={MONTH_REEL}
            spinning={phase === 'spinning'}
            revealed={phase === 'revealed'}
            duration={1.68}
          />
          <ScallopedPlaque
            label="Year"
            items={YEAR_REEL}
            spinning={phase === 'spinning'}
            revealed={phase === 'revealed'}
            duration={1.98}
          />
        </div>

        {/* Right Ceremonial Elephant (facing left) */}
        <div className="hidden lg:block shrink-0 -ml-10 xl:-ml-12 -mb-5 relative z-20">
          <RoyalElephantCutout
            alt="Right royal elephant"
            className="w-52 xl:w-60 h-52 xl:h-60"
          />
        </div>

        {/* Mobile/Tablet Paired Elephants */}
        <div className="flex lg:hidden items-center justify-center gap-8 mt-4">
          <RoyalElephantCutout flip alt="Left royal elephant" className="w-28 h-28 sm:w-36 sm:h-36" />
          <RoyalElephantCutout alt="Right royal elephant" className="w-28 h-28 sm:w-36 sm:h-36" />
        </div>
      </div>

      {/* Scalloped Maroon Cartouche "Reveal the Date" Button -> Calligraphic Save the Date */}
      <div className="mt-8 sm:mt-10 min-h-[60px] flex items-center justify-center relative z-20">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.button
              key="reveal-btn"
              type="button"
              onClick={handleReveal}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="cursor-pointer group relative w-[240px] h-[54px] sm:w-[272px] sm:h-[58px] flex items-center justify-center transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#680425]"
            >
              <svg
                viewBox="0 0 280 62"
                className="absolute inset-0 w-full h-full drop-shadow-[0_10px_20px_rgba(77,8,33,0.34)]"
                aria-hidden="true"
              >
                <path
                  d="M26,8 C40,8 48,2 64,2 L216,2 C232,2 240,8 254,8 C264,8 272,18 272,26 C272,29 276,31 276,31 C276,31 272,33 272,36 C272,44 264,54 254,54 C240,54 232,60 216,60 L64,60 C48,60 40,54 26,54 C16,54 8,44 8,36 C8,33 4,31 4,31 C4,31 8,29 8,26 C8,18 16,8 26,8 Z"
                  fill="#680425"
                  stroke="#C9963E"
                  strokeWidth="1.8"
                />
                <path
                  d="M28,11 C41,11 49,6 64,6 L216,6 C231,6 239,11 252,11 C260,11 268,20 268,27 C268,29 271,31 271,31 C271,31 268,33 268,35 C268,42 260,51 252,51 C239,51 231,56 216,56 L64,56 C49,56 41,51 28,51 C20,51 12,42 12,35 C12,33 9,31 9,31 C9,31 12,29 12,27 C12,20 20,11 28,11 Z"
                  fill="none"
                  stroke="#F4D392"
                  strokeOpacity="0.35"
                  strokeWidth="0.9"
                />
              </svg>
              <span className="relative z-10 font-serif font-semibold text-lg sm:text-xl text-[#F5D69B] group-hover:text-[#FFF0CE] tracking-wide whitespace-nowrap">
                Reveal the Date
              </span>
            </motion.button>
          )}

          {phase === 'spinning' && (
            <motion.div
              key="spinning-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              className="font-serif italic text-xl text-[#6A2E28]"
            >
              Revealing the auspicious date...
            </motion.div>
          )}

          {phase === 'revealed' && (
            <motion.p
              key="save-the-date"
              initial={{ opacity: 0, y: 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif italic text-3xl sm:text-4xl text-[#521824] tracking-wide"
            >
              Save the Date
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
