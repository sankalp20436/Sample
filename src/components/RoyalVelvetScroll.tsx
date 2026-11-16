import { type ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { PinkLotusFiligree } from './RoyalOrnaments';

interface RoyalVelvetScrollProps {
  children: ReactNode;
  delay?: number;
  enabled?: boolean;
}

function GoldRoller({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div className="relative z-20 flex items-center justify-center w-full max-w-[740px] mx-auto select-none" aria-hidden="true">
      {/* Left End Finial */}
      <div className="flex items-center shrink-0">
        <div className="w-3.5 h-5 sm:w-4 sm:h-6 rounded-l-full scroll-finial-knob" />
        <div className="w-5 h-9 sm:w-7 sm:h-11 rounded-full scroll-finial-knob -ml-1 border-r border-[#7A4D10]/40" />
        <div className="w-2.5 h-6 sm:w-3 sm:h-7 rounded-sm scroll-finial-knob -ml-0.5" />
      </div>

      {/* Main Brass Cylinder Bar */}
      <div
        className={`flex-1 h-7 sm:h-9 scroll-roller-bar relative ${
          position === 'top' ? 'rounded-t-[3px]' : 'rounded-b-[3px]'
        }`}
      >
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#FCE9AF]/45" />
      </div>

      {/* Right End Finial */}
      <div className="flex items-center shrink-0">
        <div className="w-2.5 h-6 sm:w-3 sm:h-7 rounded-sm scroll-finial-knob -mr-0.5" />
        <div className="w-5 h-9 sm:w-7 sm:h-11 rounded-full scroll-finial-knob -mr-1 border-l border-[#7A4D10]/40" />
        <div className="w-3.5 h-5 sm:w-4 sm:h-6 rounded-r-full scroll-finial-knob" />
      </div>
    </div>
  );
}

export function RoyalVelvetScroll({
  children,
  delay = 0,
  enabled = true,
}: RoyalVelvetScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasOpened, setHasOpened] = useState(false);

  // Negative bottom margin ensures the scroll stays rolled up while near the bottom edge,
  // and unrolls only after the visitor actually scrolls down to reach this div.
  const isInView = useInView(containerRef, {
    once: false,
    margin: '0px 0px -42% 0px',
  });

  useEffect(() => {
    if (enabled && isInView && !hasOpened) {
      setHasOpened(true);
    }
  }, [enabled, isInView, hasOpened]);

  return (
    <div ref={containerRef} className="w-full max-w-[760px] mx-auto px-3 sm:px-6">
      {/* Top Anchored Gold Roller */}
      <GoldRoller position="top" />

      {/* Unrolling Maroon Velvet Sheet */}
      <motion.div
        initial={{ gridTemplateRows: '0fr' }}
        animate={hasOpened ? { gridTemplateRows: '1fr' } : { gridTemplateRows: '0fr' }}
        transition={{ duration: 1.15, delay: hasOpened ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
        className="grid w-[90%] sm:w-[88%] max-w-[630px] mx-auto -my-1.5 relative z-10 shadow-[0_22px_40px_rgba(45,8,20,0.34)]"
      >
        <div className="overflow-hidden">
          <div className="relative bg-velvet-maroon text-[#F9EAD6] px-8 sm:px-14 py-10 sm:py-12 text-center border-x border-[#9F6F28]/40">
            {/* Left & Right Beaded Gold Inner Trim */}
            <div className="absolute inset-y-3 left-2.5 sm:left-3.5 w-1.5 velvet-scroll-trim opacity-85" aria-hidden="true" />
            <div className="absolute inset-y-3 right-2.5 sm:right-3.5 w-1.5 velvet-scroll-trim opacity-85" aria-hidden="true" />

            {/* Subtle Top & Bottom Roller Shadow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-black/35 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={hasOpened ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.65, delay: hasOpened ? delay + 0.32 : 0 }}
              className="relative z-10"
            >
              {children}
              <div className="mt-7 flex justify-center">
                <PinkLotusFiligree className="w-56 sm:w-64 h-12" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Moving Gold Roller */}
      <GoldRoller position="bottom" />
    </div>
  );
}
