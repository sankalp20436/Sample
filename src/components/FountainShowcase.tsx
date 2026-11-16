import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ASSETS } from '../constants/assets';
import { ParchmentFloralBorder } from './RoyalOrnaments';

export function FountainShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="relative w-full bg-parchment-damask pb-10 sm:pb-14">
      <ParchmentFloralBorder />

      <div ref={ref} className="max-w-[1160px] mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden rounded-t-[24px] rounded-b-[140px] sm:rounded-b-[260px] md:rounded-b-[340px] shadow-[0_24px_50px_rgba(77,8,33,0.16)] border border-[#DFB989]/50"
        >
          <img
            src={ASSETS.fountainPavilion}
            alt="Royal white marble baradari gazebo over a lotus fountain pool at twilight"
            referrerPolicy="no-referrer"
            className="w-full h-[320px] sm:h-[480px] md:h-[580px] object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F7EBDC]/45 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
