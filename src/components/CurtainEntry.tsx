import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CurtainFloralVine, GaneshaLineArt, RoyalElephantCutout } from './RoyalOrnaments';

interface CurtainEntryProps {
  onOpenStart: () => void;
  onOpenComplete: () => void;
}

export function CurtainEntry({ onOpenStart, onOpenComplete }: CurtainEntryProps) {
  const [opening, setOpening] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleTapToOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpenStart();
    window.setTimeout(() => {
      setDismissed(true);
      onOpenComplete();
    }, 1550);
  };

  if (dismissed) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden select-none"
      role="dialog"
      aria-label="Royal Wedding Invitation Cover"
    >
      {/* Left Royal Maroon Curtain Door */}
      <motion.div
        initial={{ x: '0%' }}
        animate={opening ? { x: '-100%' } : { x: '0%' }}
        transition={{ duration: 1.15, delay: opening ? 0.3 : 0, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 bg-maroon-damask border-r border-[#8A5A2B]/40 shadow-[12px_0_32px_rgba(0,0,0,0.45)] flex flex-col justify-between py-8 sm:py-12 pl-2 sm:pl-6 pr-[112px] sm:pr-[155px] md:pr-[195px]"
      >
        {/* Top Hanging Floral Motif */}
        <div className="flex justify-center">
          <CurtainFloralVine className="w-16 h-28 sm:w-28 sm:h-44 opacity-95" />
        </div>

        {/* Bottom Facing Royal Elephant (centered in visible left panel) */}
        <div className="flex justify-center">
          <RoyalElephantCutout
            flip
            alt="Ceremonial elephant on left door"
            className="w-20 h-20 sm:w-36 sm:h-36 md:w-56 md:h-56 drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
          />
        </div>
      </motion.div>

      {/* Right Royal Maroon Curtain Door */}
      <motion.div
        initial={{ x: '0%' }}
        animate={opening ? { x: '100%' } : { x: '0%' }}
        transition={{ duration: 1.15, delay: opening ? 0.3 : 0, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 bg-maroon-damask border-l border-[#8A5A2B]/40 shadow-[-12px_0_32px_rgba(0,0,0,0.45)] flex flex-col justify-between py-8 sm:py-12 pr-2 sm:pr-6 pl-[112px] sm:pl-[155px] md:pl-[195px]"
      >
        {/* Top Hanging Floral Motif */}
        <div className="flex justify-center">
          <CurtainFloralVine flip className="w-16 h-28 sm:w-28 sm:h-44 opacity-95" />
        </div>

        {/* Bottom Facing Royal Elephant (centered in visible right panel) */}
        <div className="flex justify-center">
          <RoyalElephantCutout
            alt="Ceremonial elephant on right door"
            className="w-20 h-20 sm:w-36 sm:h-36 md:w-56 md:h-56 drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]"
          />
        </div>
      </motion.div>

      {/* Center Vertical Cream Parchment Ribbon */}
      <AnimatePresence>
        {!opening && (
          <motion.div
            key="center-ribbon"
            initial={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.72 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 h-full w-[216px] sm:w-[290px] md:w-[340px] bg-parchment-damask shadow-[0_0_50px_rgba(0,0,0,0.55)] flex flex-col items-center justify-center px-5 sm:px-6 text-center"
          >
            {/* Left & Right ornate gold-maroon vertical border strips */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-3 border-r border-[#C9963E]/60"
              style={{
                background: 'linear-gradient(180deg, #B57F2D, #E8C57B, #9A671F)',
                maskImage: 'repeating-linear-gradient(to bottom, #000 0px, #000 6px, transparent 6px, transparent 10px)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 w-3 border-l border-[#C9963E]/60"
              style={{
                background: 'linear-gradient(180deg, #B57F2D, #E8C57B, #9A671F)',
                maskImage: 'repeating-linear-gradient(to bottom, #000 0px, #000 6px, transparent 6px, transparent 10px)',
              }}
            />
            <div className="absolute inset-y-0 left-3.5 w-[1px] bg-[#6D1230]/25" aria-hidden="true" />
            <div className="absolute inset-y-0 right-3.5 w-[1px] bg-[#6D1230]/25" aria-hidden="true" />

            <div className="flex flex-col items-center max-w-[240px]">
              <GaneshaLineArt className="w-16 h-20 mb-3" />

              <p className="font-serif text-lg sm:text-xl font-medium tracking-wide text-[#6A2E28] mb-5">
                श्री गणेशाय नमः
              </p>

              <p className="font-serif italic text-[17px] sm:text-[19px] leading-[1.45] text-[#6B3E2E] mb-7">
                we cordially invite you to
                <br />
                grace the auspicious
                <br />
                occasion of the marriage
                <br />
                of...
              </p>

              <button
                type="button"
                onClick={handleTapToOpen}
                className="cursor-pointer bg-[#6D1230] hover:bg-[#570C25] text-[#F9EAD6] font-sans text-sm font-medium tracking-wide px-7 py-2.5 rounded-full shadow-[0_6px_18px_rgba(77,8,33,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D1230] whitespace-nowrap shrink-0"
              >
                Tap to open
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
