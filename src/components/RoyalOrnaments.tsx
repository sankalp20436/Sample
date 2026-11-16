import { useEffect, useState } from 'react';
import { ASSETS } from '../constants/assets';

/**
 * Flood-fills the outer cream background of the generated elephant illustration
 * so it renders cleanly with transparency on both maroon curtains and cream parchment.
 */
export function RoyalElephantCutout({
  flip = false,
  className = '',
  alt = 'Royal ceremonial elephant',
}: {
  flip?: boolean;
  className?: string;
  alt?: string;
}) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = ASSETS.royalElephant;

    img.onload = () => {
      if (!active) return;
      try {
        const size = 480;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const imgData = ctx.getImageData(0, 0, size, size);
        const data = imgData.data;

        // Sample corner pixel as background reference
        const bgR = data[0];
        const bgG = data[1];
        const bgB = data[2];

        const visited = new Uint8Array(size * size);
        const queue = new Int32Array(size * size);
        let head = 0;
        let tail = 0;

        const pushIfBg = (x: number, y: number) => {
          if (x < 0 || x >= size || y < 0 || y >= size) return;
          const idx = y * size + x;
          if (visited[idx]) return;
          const p = idx * 4;
          const dr = Math.abs(data[p] - bgR);
          const dg = Math.abs(data[p + 1] - bgG);
          const db = Math.abs(data[p + 2] - bgB);
          if (dr < 34 && dg < 34 && db < 34) {
            visited[idx] = 1;
            queue[tail++] = idx;
          }
        };

        // Seed all 4 edges
        for (let x = 0; x < size; x++) {
          pushIfBg(x, 0);
          pushIfBg(x, size - 1);
        }
        for (let y = 0; y < size; y++) {
          pushIfBg(0, y);
          pushIfBg(size - 1, y);
        }

        while (head < tail) {
          const idx = queue[head++];
          const p = idx * 4;
          data[p + 3] = 0; // transparent
          const x = idx % size;
          const y = (idx - x) / size;
          pushIfBg(x + 1, y);
          pushIfBg(x - 1, y);
          pushIfBg(x, y + 1);
          pushIfBg(x, y - 1);
        }

        // Soft feather 1px border around cleared region
        for (let y = 1; y < size - 1; y++) {
          for (let x = 1; x < size - 1; x++) {
            const idx = y * size + x;
            if (visited[idx]) continue;
            if (
              visited[idx - 1] ||
              visited[idx + 1] ||
              visited[idx - size] ||
              visited[idx + size]
            ) {
              const p = idx * 4;
              const dr = Math.abs(data[p] - bgR);
              const dg = Math.abs(data[p + 1] - bgG);
              const db = Math.abs(data[p + 2] - bgB);
              if (dr + dg + db < 135) {
                data[p + 3] = 110;
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL('image/png'));
      } catch {
        setProcessedSrc(ASSETS.royalElephant);
      }
    };

    return () => {
      active = false;
    };
  }, []);

  return (
    <img
      src={processedSrc || ASSETS.royalElephant}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`${flip ? '-scale-x-100' : ''} ${
        processedSrc ? '' : 'mix-blend-multiply'
      } select-none pointer-events-none object-contain ${className}`}
    />
  );
}

export function GaneshaLineArt({ className = 'w-14 h-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 115" fill="none" className={className} aria-hidden="true">
      <g stroke="#B88435" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {/* Crown / Mukut */}
        <path d="M50 8 L54 16 L60 19 L58 27 L42 27 L40 19 L46 16 Z" />
        <path d="M37 27 Q50 22 63 27" />
        <circle cx="50" cy="18" r="1.8" fill="#B88435" />
        {/* Tilak */}
        <path d="M47 34 Q50 38 53 34" />
        <circle cx="50" cy="39" r="1.2" fill="#B88435" />
        {/* Ears */}
        <path d="M36 33 C22 27, 16 42, 23 56 C27 63, 35 60, 38 54" />
        <path d="M64 33 C78 27, 84 42, 77 56 C73 63, 65 60, 62 54" />
        {/* Forehead & Eyes */}
        <path d="M36 33 Q50 27 64 33" />
        <path d="M41 42 Q44 40 46 42" />
        <path d="M54 42 Q56 40 59 42" />
        {/* Trunk curving left gracefully */}
        <path d="M46 47 C45 58, 43 68, 48 73 C53 77, 60 72, 57 66 C55 63, 51 66, 53 69" />
        <path d="M54 47 C54 55, 55 60, 58 63" />
        {/* Tusks */}
        <path d="M40 52 Q36 58 41 60" />
        <path d="M60 52 Q64 56 61 59" />
        {/* Shoulders & Lotus Seat */}
        <path d="M33 65 C27 72, 27 83, 36 88 L64 88 C73 83, 73 72, 67 65" />
        <path d="M26 95 Q50 103 74 95" />
        <path d="M34 95 Q50 88 66 95" />
      </g>
    </svg>
  );
}

export function CurtainFloralVine({ flip = false, className = 'w-28 h-48' }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 140 220"
      fill="none"
      className={`${flip ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Hanging stem */}
      <path d="M70 0 C68 35, 80 70, 66 112 C56 142, 74 176, 62 204" stroke="#8F9E5A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M68 48 C48 42, 36 52, 42 64 C54 66, 66 58, 68 48Z" fill="#6F8647" stroke="#A6B770" strokeWidth="0.9" />
      <path d="M71 78 C92 70, 105 80, 96 92 C85 94, 74 87, 71 78Z" fill="#637A3E" stroke="#A6B770" strokeWidth="0.9" />
      <path d="M65 130 C44 128, 35 142, 46 152 C56 150, 64 140, 65 130Z" fill="#6F8647" stroke="#A6B770" strokeWidth="0.9" />
      <path d="M67 162 C86 158, 96 170, 86 180 C76 180, 68 172, 67 162Z" fill="#637A3E" stroke="#A6B770" strokeWidth="0.9" />
      {/* Main Pink Lotus Blossom */}
      <g transform="translate(66, 108)">
        <path d="M0 -24 C-10 -12, -10 4, 0 10 C10 4, 10 -12, 0 -24Z" fill="#F4A5B8" stroke="#FCE0E6" strokeWidth="0.9" />
        <path d="M-4 -18 C-18 -14, -22 2, -6 10 C-1 5, -1 -8, -4 -18Z" fill="#E37C98" stroke="#F8C8D4" strokeWidth="0.8" />
        <path d="M4 -18 C18 -14, 22 2, 6 10 C1 5, 1 -8, 4 -18Z" fill="#E37C98" stroke="#F8C8D4" strokeWidth="0.8" />
        <path d="M-10 -8 C-26 -4, -26 10, -8 12 C-3 7, -6 0, -10 -8Z" fill="#C95978" />
        <path d="M10 -8 C26 -4, 26 10, 8 12 C3 7, 6 0, 10 -8Z" fill="#C95978" />
        <ellipse cx="0" cy="8" rx="6" ry="3" fill="#E8BE5E" />
      </g>
      {/* Lower small lotus bud */}
      <g transform="translate(62, 198)">
        <path d="M0 -12 C-6 -4, -5 6, 0 10 C5 6, 6 -4, 0 -12Z" fill="#EE92AA" stroke="#FAD4DF" strokeWidth="0.8" />
        <path d="M-2 -6 C-11 -2, -10 8, -2 10Z" fill="#C95978" />
        <path d="M2 -6 C11 -2, 10 8, 2 10Z" fill="#C95978" />
      </g>
    </svg>
  );
}

export function PinkLotusFiligree({ className = 'w-64 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 60" fill="none" className={className} aria-hidden="true">
      {/* Left gold scroll filigree */}
      <path
        d="M120 32 C100 32, 92 18, 76 22 C64 25, 62 38, 74 40 C82 41, 86 33, 79 30 M76 32 C54 32, 42 24, 24 30 C16 33, 18 42, 26 40"
        stroke="#D9A84E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M122 32 C106 42, 90 44, 82 36" stroke="#D9A84E" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="14" cy="34" r="2" fill="#D9A84E" />

      {/* Right gold scroll filigree (mirrored) */}
      <path
        d="M200 32 C220 32, 228 18, 244 22 C256 25, 258 38, 246 40 C238 41, 234 33, 241 30 M244 32 C266 32, 278 24, 296 30 C304 33, 302 42, 294 40"
        stroke="#D9A84E"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M198 32 C214 42, 230 44, 238 36" stroke="#D9A84E" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="306" cy="34" r="2" fill="#D9A84E" />

      {/* Center Pink Lotus */}
      <g transform="translate(160, 31)">
        <path d="M0 -22 C-8 -10, -8 4, 0 11 C8 4, 8 -10, 0 -22Z" fill="#F8B4C6" stroke="#FDE2EA" strokeWidth="0.9" />
        <path d="M-4 -17 C-17 -13, -20 3, -5 11 C-1 5, -1 -7, -4 -17Z" fill="#EA85A2" stroke="#FAD0DC" strokeWidth="0.8" />
        <path d="M4 -17 C17 -13, 20 3, 5 11 C1 5, 1 -7, 4 -17Z" fill="#EA85A2" stroke="#FAD0DC" strokeWidth="0.8" />
        <path d="M-11 -7 C-27 -3, -27 11, -8 13 C-3 8, -6 0, -11 -7Z" fill="#CC587B" />
        <path d="M11 -7 C27 -3, 27 11, 8 13 C3 8, 6 0, 11 -7Z" fill="#CC587B" />
        <ellipse cx="0" cy="11" rx="8" ry="2.6" fill="#E3B353" />
      </g>
    </svg>
  );
}

export function ParchmentFloralBorder() {
  return (
    <div className="w-full overflow-hidden py-3 select-none pointer-events-none" aria-hidden="true">
      <div
        className="w-full h-9 border-y border-[#DFB989]/65 flex items-center"
        style={{
          background: 'linear-gradient(180deg, #FBF0E1 0%, #F1DEC2 50%, #FBF0E1 100%)',
        }}
      >
        <div
          className="w-full h-6 opacity-80"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='24' viewBox='0 0 72 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C99254' stroke-width='1'%3E%3Cpath d='M0 12 Q18 2 36 12 Q54 22 72 12' stroke-opacity='0.55'/%3E%3Cpath d='M0 12 Q18 22 36 12 Q54 2 72 12' stroke-opacity='0.55'/%3E%3Ccircle cx='18' cy='12' r='3.5' fill='%23E7B582' fill-opacity='0.6'/%3E%3Ccircle cx='54' cy='12' r='3.5' fill='%23E7B582' fill-opacity='0.6'/%3E%3Cpath d='M36 6 L39 12 L36 18 L33 12 Z' fill='%23D69A58' fill-opacity='0.65'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center',
          }}
        />
      </div>
    </div>
  );
}

export function PaintedLotusStem({ className = 'w-44 h-48' }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 200" fill="none" className={className} aria-hidden="true">
      {/* Main upright stem */}
      <path d="M90 190 L90 52" stroke="#768C4A" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M90 148 Q58 134 45 102" stroke="#768C4A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M90 148 Q122 134 135 102" stroke="#768C4A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M90 105 Q64 92 58 64" stroke="#768C4A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M90 105 Q116 92 122 64" stroke="#768C4A" strokeWidth="1.6" strokeLinecap="round" />
      {/* Base leaves */}
      <path d="M90 176 C68 172, 56 182, 68 190 C78 190, 88 184, 90 176Z" fill="#6F8647" />
      <path d="M90 176 C112 172, 124 182, 112 190 C102 190, 92 184, 90 176Z" fill="#6F8647" />
      <path d="M90 132 C72 122, 68 134, 76 142 C83 142, 89 138, 90 132Z" fill="#7D9652" />
      <path d="M90 132 C108 122, 112 134, 104 142 C97 142, 91 138, 90 132Z" fill="#7D9652" />
      {/* Side blossoms */}
      {[
        [45, 98],
        [135, 98],
        [58, 60],
        [122, 60],
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx}, ${cy})`}>
          <circle cx="0" cy="0" r="10" fill="#F4A3B7" stroke="#B65B75" strokeWidth="0.9" />
          <circle cx="-4" cy="-3" r="4" fill="#F9C6D3" />
          <circle cx="4" cy="-3" r="4" fill="#F9C6D3" />
          <circle cx="0" cy="0" r="3" fill="#E8BE5E" />
        </g>
      ))}
      {/* Crown Lotus */}
      <g transform="translate(90, 38)">
        <path d="M0 -28 C-10 -14, -10 4, 0 12 C10 4, 10 -14, 0 -28Z" fill="#F5A7BB" stroke="#B65B75" strokeWidth="0.9" />
        <path d="M-5 -20 C-20 -15, -24 3, -6 12 C-1 6, -1 -8, -5 -20Z" fill="#E4809D" stroke="#B65B75" strokeWidth="0.8" />
        <path d="M5 -20 C20 -15, 24 3, 6 12 C1 6, 1 -8, 5 -20Z" fill="#E4809D" stroke="#B65B75" strokeWidth="0.8" />
        <path d="M-12 -8 C-28 -3, -28 12, -8 14 C-3 8, -7 0, -12 -8Z" fill="#C95978" />
        <path d="M12 -8 C28 -3, 28 12, 8 14 C3 8, 7 0, 12 -8Z" fill="#C95978" />
        <ellipse cx="0" cy="12" rx="7" ry="2.5" fill="#E8BE5E" />
      </g>
    </svg>
  );
}

export function CornerGarland({ flip = false, className = 'w-52 h-44' }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 240 210"
      fill="none"
      className={`${flip ? '-scale-x-100' : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Cream Triangular Corner Bracket with Gold Scalloped Border */}
      <path
        d="M0,0 L210,0 C192,20 158,18 142,36 C126,54 102,54 88,72 C72,92 50,94 36,114 C22,134 18,158 0,175 Z"
        fill="#F4E2CB"
        stroke="#C89342"
        strokeWidth="2.5"
      />
      <path
        d="M0,0 L195,0 C178,16 148,14 134,30 C118,48 96,48 82,66 C66,84 46,86 32,106 C18,124 14,145 0,160 Z"
        fill="none"
        stroke="#8B223C"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />

      {/* Floral Vines & Pink Lotus inside Bracket */}
      <path d="M18 112 Q54 68 158 14" stroke="#6E8244" strokeWidth="2.2" />
      <ellipse cx="64" cy="64" rx="11" ry="5" transform="rotate(-38 64 64)" fill="#6B8245" />
      <ellipse cx="105" cy="40" rx="11" ry="5" transform="rotate(-24 105 40)" fill="#6B8245" />
      <ellipse cx="144" cy="20" rx="10" ry="4.5" transform="rotate(-14 144 20)" fill="#6B8245" />

      {/* Center Corner Lotus */}
      <g transform="translate(46, 36) rotate(-42)">
        <path d="M0 -22 C-8 -10, -8 4, 0 11 C8 4, 8 -10, 0 -22Z" fill="#F5A7BB" stroke="#A64662" strokeWidth="0.9" />
        <path d="M-5 -16 C-16 -11, -18 3, -5 11 Z" fill="#E37C98" />
        <path d="M5 -16 C16 -11, 18 3, 5 11 Z" fill="#E37C98" />
        <ellipse cx="0" cy="10" rx="6" ry="2.2" fill="#E8BE5E" />
      </g>

      <circle cx="96" cy="26" r="10" fill="#E47E98" stroke="#FCE0E7" strokeWidth="0.9" />
      <circle cx="24" cy="84" r="10" fill="#E47E98" stroke="#FCE0E7" strokeWidth="0.9" />
      <circle cx="136" cy="14" r="7" fill="#F4A5B8" />
      <circle cx="14" cy="120" r="7" fill="#F4A5B8" />

      {/* Hanging Gold & Crimson Tassels */}
      {[
        [24, 126, 54],
        [46, 98, 44],
        [72, 74, 34],
      ].map(([x, y, len], idx) => (
        <g key={idx}>
          <line x1={x} y1={y} x2={x} y2={y + len - 14} stroke="#D4A24E" strokeWidth="1.6" />
          <circle cx={x} cy={y + 6} r="3" fill="#E6BE67" />
          <path
            d={`M ${x} ${y + len - 18} L ${x - 6} ${y + len} L ${x + 6} ${y + len} Z`}
            fill="#9C193A"
            stroke="#D4A24E"
            strokeWidth="0.9"
          />
        </g>
      ))}
    </svg>
  );
}

export function TornPaperEdge({
  topColor = '#F3E6D5',
  bottomColor = '#4D0821',
}: {
  topColor?: string;
  bottomColor?: string;
}) {
  return (
    <div className="w-full overflow-hidden leading-none select-none pointer-events-none" style={{ backgroundColor: bottomColor }} aria-hidden="true">
      <svg viewBox="0 0 1440 44" preserveAspectRatio="none" className="w-full h-7 sm:h-10 block">
        <path
          fill={topColor}
          d="M0,0 L1440,0 L1440,18 L1412,24 L1388,16 L1362,28 L1335,19 L1305,27 L1278,15 L1250,29 L1218,20 L1190,31 L1162,17 L1132,26 L1102,16 L1074,28 L1042,19 L1015,29 L985,18 L955,27 L925,14 L895,28 L866,19 L836,31 L804,17 L776,26 L746,16 L716,29 L688,18 L658,28 L628,15 L598,27 L568,18 L538,30 L508,16 L478,27 L448,18 L418,29 L388,16 L358,28 L328,18 L298,27 L268,15 L238,29 L208,18 L178,28 L148,17 L118,27 L88,16 L58,29 L28,18 L0,25 Z"
        />
      </svg>
    </div>
  );
}
