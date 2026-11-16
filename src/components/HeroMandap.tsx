import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ASSETS } from '../constants/assets';

interface HeroMandapProps {
  revealNames: boolean;
}

export function HeroMandap({ revealNames }: HeroMandapProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0px', '-36px']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.15]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] sm:min-h-[108vh] overflow-hidden flex flex-col items-center justify-start"
      style={{
        background:
          'linear-gradient(180deg, #E2C5E2 0%, #F2C9D7 24%, #FADDD2 50%, #F7EBDC 100%)',
      }}
    >
      {/* Calligraphic Couple Names sitting cleanly in the open pastel sunset sky */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-20 pt-[6.5vh] sm:pt-[8vh] pb-4 px-6 text-center select-none"
      >
        <h1 className="font-serif italic font-normal text-[#3D1A25] tracking-wide leading-tight text-[clamp(2.75rem,5.4vw,4.75rem)]">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={revealNames ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            Ankita
          </motion.span>{' '}
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={revealNames ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.85, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            &amp; Kaushik
          </motion.span>
        </h1>
      </motion.div>

      {/* Palace Mandap Illustration positioned lower so domes never obscure the couple names */}
      <motion.div
        style={{ y: bgY }}
        className="relative z-10 w-full flex-1 flex items-end justify-center mt-2 sm:mt-4"
      >
        <div
          className="w-full h-[76vh] sm:h-[84vh] relative"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 10%, black 22%, black 88%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 10%, black 22%, black 88%, transparent 100%)',
          }}
        >
          <img
            src={ASSETS.heroMandap}
            alt="Grand Indian royal wedding palace mandap courtyard at twilight"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      </motion.div>

      {/* Smooth feathered transition into the parchment section below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 sm:h-36 bg-gradient-to-t from-[#F7EBDC] via-[#F7EBDC]/75 to-transparent"
      />
    </section>
  );
}
