import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ASSETS } from '../constants/assets';
import {
  DiyaTwinkleLights,
  FlyingTwilightBirds,
  PondWaterRipples,
  type LightPoint,
} from './SceneAtmosphere';

interface HeroMandapProps {
  revealNames: boolean;
}

const HERO_LIGHTS: LightPoint[] = [
  // Mandap Chandeliers
  { x: '50%', y: '41%', size: 58, duration: 3.1, delay: 0.1 },
  { x: '46.5%', y: '45%', size: 38, duration: 2.6, delay: 0.4 },
  { x: '53.5%', y: '45%', size: 38, duration: 2.8, delay: 0.8 },
  { x: '50%', y: '53%', size: 30, duration: 2.4, delay: 1.1 },
  // Left & Right Colonnade Hanging Lanterns
  { x: '1.8%', y: '44%', size: 34, duration: 2.2, delay: 0.3 },
  { x: '10.6%', y: '48%', size: 30, duration: 2.5, delay: 0.9 },
  { x: '17.4%', y: '51%', size: 26, duration: 2.1, delay: 0.5 },
  { x: '98.2%', y: '44%', size: 34, duration: 2.4, delay: 0.6 },
  { x: '89.4%', y: '48%', size: 30, duration: 2.7, delay: 0.2 },
  { x: '82.6%', y: '51%', size: 26, duration: 2.3, delay: 1.0 },
  // Walkway Floor Brass Lanterns & Floating Diyas
  { x: '29.8%', y: '90%', size: 42, duration: 2.1, delay: 0.1 },
  { x: '34.8%', y: '82%', size: 34, duration: 2.4, delay: 0.7 },
  { x: '37.8%', y: '76%', size: 28, duration: 2.0, delay: 1.2 },
  { x: '40.5%', y: '71%', size: 24, duration: 2.3, delay: 0.4 },
  { x: '26.6%', y: '95%', size: 26, duration: 1.9, delay: 0.8 },
  { x: '70.2%', y: '90%', size: 42, duration: 2.2, delay: 0.5 },
  { x: '65.2%', y: '82%', size: 34, duration: 2.5, delay: 1.1 },
  { x: '62.2%', y: '76%', size: 28, duration: 2.1, delay: 0.3 },
  { x: '59.5%', y: '71%', size: 24, duration: 2.4, delay: 0.9 },
  { x: '73.4%', y: '95%', size: 26, duration: 2.0, delay: 0.2 },
];

const HERO_RIPPLE_CENTERS = [
  { rx: 0.42, ry: 0.32 },
  { rx: 0.58, ry: 0.44 },
  { rx: 0.46, ry: 0.62 },
  { rx: 0.36, ry: 0.78 },
  { rx: 0.61, ry: 0.82 },
];

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
      {/* Flying Silhouette Birds in the Pastel Sunset Sky */}
      <FlyingTwilightBirds className="z-10 h-[42vh]" />

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

          {/* Pond Water Ripples on Central Lotus Pool */}
          <PondWaterRipples
            regionClassName="left-[34%] right-[34%] bottom-[1%] h-[32%]"
            rippleCenters={HERO_RIPPLE_CENTERS}
          />

          {/* Twinkling Diya & Brass Lantern Flame Halos */}
          <DiyaTwinkleLights lights={HERO_LIGHTS} />
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
