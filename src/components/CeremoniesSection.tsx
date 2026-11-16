import { MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { CEREMONIES, type CeremonyItem } from '../constants/assets';
import { CornerGarland, TornPaperEdge } from './RoyalOrnaments';

interface CeremoniesSectionProps {
  onSelectVenue: (ceremony: CeremonyItem) => void;
}

function MughalArchCard({
  ceremony,
  index,
  onSelectVenue,
}: {
  ceremony: CeremonyItem;
  index: number;
  onSelectVenue: (ceremony: CeremonyItem) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[295px] mx-auto"
    >
      {/* Continuous Single Mughal Ogee Arch Parchment Frame */}
      <div className="relative flex flex-col">
        {/* Top Ogee Arch SVG + Side/Bottom Frame Unified Look */}
        <svg
          viewBox="0 0 300 440"
          className="w-full h-auto block drop-shadow-[0_18px_36px_rgba(0,0,0,0.42)]"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`archGrad-${ceremony.id}`} cx="50%" cy="46%" r="65%">
              <stop offset="0%" stopColor="#FAF0DF" />
              <stop offset="68%" stopColor="#F4E2C8" />
              <stop offset="100%" stopColor="#DEC098" />
            </radialGradient>
          </defs>
          {/* Outer Arch Card Silhouette */}
          <path
            d="M4,436 L4,148 C4,104 44,92 84,64 C118,40 138,22 150,8 C162,22 182,40 216,64 C256,92 296,104 296,148 L296,436 Z"
            fill={`url(#archGrad-${ceremony.id})`}
            stroke="#C89342"
            strokeWidth="2.5"
          />
          {/* Inner Delicate Arch Border */}
          <path
            d="M11,429 L11,150 C11,110 49,98 88,70 C120,47 139,30 150,17 C161,30 180,47 212,70 C251,98 289,110 289,150 L289,429 Z"
            fill="none"
            stroke="#7C1D37"
            strokeOpacity="0.32"
            strokeWidth="1"
          />
        </svg>

        {/* Card Inner Content Overlay perfectly aligned inside the Arch */}
        <div className="absolute inset-0 flex flex-col justify-between px-6 pt-12 pb-5">
          {/* Upper Artwork centered neatly inside the Ogee Arch */}
          <div className="flex items-center justify-center pt-2">
            <img
              src={ceremony.image}
              alt={`${ceremony.title} ceremony illustration`}
              referrerPolicy="no-referrer"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse 72% 72% at 50% 52%, black 60%, transparent 98%)',
                maskImage: 'radial-gradient(ellipse 72% 72% at 50% 52%, black 60%, transparent 98%)',
              }}
              className="w-36 h-36 sm:w-40 sm:h-40 object-contain mix-blend-multiply select-none pointer-events-none"
            />
          </div>

          {/* Lower Typography + Venue + Date/Time */}
          <div className="w-full">
            <h3 className="font-serif text-[27px] sm:text-[29px] font-semibold text-[#3C0919] text-center leading-tight mb-3.5">
              {ceremony.title}
            </h3>

            {/* Venue & Rounded-Square Location Pin Row */}
            <div className="flex items-center justify-between gap-3">
              <div className="text-left font-sans text-[14px] font-medium leading-[1.35] text-[#3C0919]">
                <div>{ceremony.venue}</div>
                <div>{ceremony.city}</div>
              </div>

              <button
                type="button"
                onClick={() => onSelectVenue(ceremony)}
                aria-label={`View ${ceremony.title} venue map for ${ceremony.venue} ${ceremony.city}`}
                className="cursor-pointer w-9 h-9 rounded-[9px] border-[1.5px] border-[#4B0C20] bg-[#FAF0DF]/60 text-[#4B0C20] hover:bg-[#4B0C20] hover:text-[#FAF0DF] flex items-center justify-center shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B0C20]"
              >
                <MapPin className="w-4 h-4 fill-current" />
              </button>
            </div>

            {/* Hairline Divider + Date & Time */}
            <div className="mt-3 pt-2.5 border-t border-[#7C1D37]/25 flex items-baseline justify-between gap-2 tabular-nums">
              <span className="font-sans text-[13px] font-medium text-[#3C0919] whitespace-nowrap">
                {ceremony.date}
              </span>
              <span className="font-sans text-[11.5px] font-medium text-[#5A2131] whitespace-nowrap">
                {ceremony.time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CeremonyLotusLineDivider() {
  return (
    <div className="my-12 sm:my-16 flex items-center justify-center max-w-[760px] mx-auto px-6 select-none pointer-events-none" aria-hidden="true">
      <div className="flex items-center w-full gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E88CA5] border border-[#D4A24E] shrink-0" />
        <div className="flex-1 h-[1.5px] bg-gradient-to-r from-[#D4A24E] via-[#E5BA67] to-[#D4A24E]" />
        <svg viewBox="0 0 120 44" className="w-24 h-10 shrink-0" fill="none">
          <path d="M12 24 C24 18, 36 22, 42 26" stroke="#7A8F50" strokeWidth="1.4" />
          <path d="M108 24 C96 18, 84 22, 78 26" stroke="#7A8F50" strokeWidth="1.4" />
          <g transform="translate(60, 25)">
            <path d="M0 -18 C-7 -8, -7 4, 0 10 C7 4, 7 -8, 0 -18Z" fill="#9E1B3E" stroke="#E5B964" strokeWidth="1" />
            <path d="M-4 -13 C-14 -9, -15 3, -4 10 Z" fill="#7D0E2D" stroke="#E5B964" strokeWidth="0.9" />
            <path d="M4 -13 C14 -9, 15 3, 4 10 Z" fill="#7D0E2D" stroke="#E5B964" strokeWidth="0.9" />
            <ellipse cx="0" cy="10" rx="6" ry="2.2" fill="#E8BE5E" />
          </g>
        </svg>
        <div className="flex-1 h-[1.5px] bg-gradient-to-l from-[#D4A24E] via-[#E5BA67] to-[#D4A24E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#E88CA5] border border-[#D4A24E] shrink-0" />
      </div>
    </div>
  );
}

export function CeremoniesSection({ onSelectVenue }: CeremoniesSectionProps) {
  const firstRow = CEREMONIES.slice(0, 3);
  const secondRow = CEREMONIES.slice(3, 6);

  return (
    <section id="ceremonies" className="relative w-full bg-maroon-damask text-[#F9EAD6] overflow-hidden">
      {/* Top Ragged Paper Tear Edge */}
      <TornPaperEdge topColor="#F3E6D5" bottomColor="#4D0821" />

      {/* Top Left & Top Right Ornate Triangular Corner Brackets with Hanging Tassels */}
      <div className="pointer-events-none absolute top-5 left-0 z-10">
        <CornerGarland className="w-32 sm:w-52 h-auto" />
      </div>
      <div className="pointer-events-none absolute top-5 right-0 z-10">
        <CornerGarland flip className="w-32 sm:w-52 h-auto" />
      </div>

      <div className="relative z-20 max-w-[980px] mx-auto px-4 sm:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
        <h2 className="font-serif text-4xl sm:text-[44px] font-semibold text-center text-[#F2B57B] tracking-wide mb-10 sm:mb-12">
          Ceremonies
        </h2>

        {/* Row 1: Ring Ceremony, Mehendi, Haldi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-end">
          {firstRow.map((ceremony, idx) => (
            <MughalArchCard
              key={ceremony.id}
              ceremony={ceremony}
              index={idx}
              onSelectVenue={onSelectVenue}
            />
          ))}
        </div>

        {/* Gold & Lotus Horizontal Divider */}
        <CeremonyLotusLineDivider />

        {/* Row 2: Sangeet, Vivaah, Reception */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8 items-end">
          {secondRow.map((ceremony, idx) => (
            <MughalArchCard
              key={ceremony.id}
              ceremony={ceremony}
              index={idx + 3}
              onSelectVenue={onSelectVenue}
            />
          ))}
        </div>
      </div>

      {/* Bottom Ragged Paper Tear Edge */}
      <div className="rotate-180">
        <TornPaperEdge topColor="#F7EBDC" bottomColor="#4D0821" />
      </div>
    </section>
  );
}
