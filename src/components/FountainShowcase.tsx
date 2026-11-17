import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ASSETS } from '../constants/assets';
import { ParchmentFloralBorder } from './RoyalOrnaments';
import {
  DiyaTwinkleLights,
  FlyingTwilightBirds,
  PondWaterRipples,
  type LightPoint,
} from './SceneAtmosphere';

const FOUNTAIN_LIGHTS: LightPoint[] = [
  // Gazebo Hanging Chandelier & Lamps
  { x: '50%', y: '37%', size: 42, duration: 2.9, delay: 0.2 },
  { x: '43.5%', y: '41%', size: 26, duration: 2.3, delay: 0.6 },
  { x: '56.5%', y: '41%', size: 26, duration: 2.5, delay: 1.0 },
  // Colonnade Wall Lamps
  { x: '5.5%', y: '45%', size: 24, duration: 2.2, delay: 0.3 },
  { x: '15%', y: '47%', size: 22, duration: 2.6, delay: 0.8 },
  { x: '94.5%', y: '45%', size: 24, duration: 2.4, delay: 0.5 },
  { x: '85%', y: '47%', size: 22, duration: 2.1, delay: 1.1 },
  // Ring of Glowing Brass Floor Lanterns around Fountain Pool
  { x: '27.5%', y: '88%', size: 44, duration: 2.1, delay: 0.1 },
  { x: '72.5%', y: '88%', size: 44, duration: 2.3, delay: 0.7 },
  { x: '15%', y: '77%', size: 36, duration: 2.4, delay: 0.4 },
  { x: '85%', y: '77%', size: 36, duration: 2.0, delay: 0.9 },
  { x: '25%', y: '66%', size: 30, duration: 2.5, delay: 0.3 },
  { x: '75%', y: '66%', size: 30, duration: 2.2, delay: 1.2 },
  { x: '42.5%', y: '61%', size: 26, duration: 2.6, delay: 0.5 },
  { x: '57.5%', y: '61%', size: 26, duration: 2.3, delay: 0.8 },
];

const FOUNTAIN_RIPPLES = [
  { rx: 0.38, ry: 0.42 },
  { rx: 0.56, ry: 0.58 },
  { rx: 0.48, ry: 0.34 },
  { rx: 0.28, ry: 0.66 },
  { rx: 0.68, ry: 0.46 },
  { rx: 0.45, ry: 0.78 },
];

const FOUNTAIN_BIRDS = [
  { id: 1, startX: '-6%', endX: '106%', top: '14%', arcY: -18, size: 18, duration: 22, delay: 0.5, flapDuration: 0.58, opacity: 0.5 },
  { id: 2, startX: '-10%', endX: '106%', top: '18%', arcY: -14, size: 14, duration: 25, delay: 2.2, flapDuration: 0.52, opacity: 0.42 },
  { id: 3, startX: '106%', endX: '-8%', top: '12%', arcY: -16, size: 16, duration: 26, delay: 4.5, flapDuration: 0.62, opacity: 0.45 },
];

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

          {/* Flying Birds across Twilight Sky */}
          <FlyingTwilightBirds birds={FOUNTAIN_BIRDS} className="h-[38%]" />

          {/* Rippling Circular Lotus Fountain Pond */}
          <PondWaterRipples
            regionClassName="left-[16%] right-[16%] bottom-[6%] h-[39%] rounded-[50%]"
            rippleCenters={FOUNTAIN_RIPPLES}
          />

          {/* Twinkling Brass Lanterns & Gazebo Chandelier */}
          <DiyaTwinkleLights lights={FOUNTAIN_LIGHTS} />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F7EBDC]/45 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
