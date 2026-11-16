import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { CurtainEntry } from './components/CurtainEntry';
import { HeroMandap } from './components/HeroMandap';
import { RoyalVelvetScroll } from './components/RoyalVelvetScroll';
import { SaveTheDateReveal } from './components/SaveTheDateReveal';
import { FountainShowcase } from './components/FountainShowcase';
import { HangingStoryGallery } from './components/HangingStoryGallery';
import { CeremoniesSection } from './components/CeremoniesSection';
import { ActionIconsAndEasel } from './components/ActionIconsAndEasel';
import { RsvpSection } from './components/RsvpSection';
import { VenueMapModal } from './components/VenueMapModal';
import { PaintedLotusStem, ParchmentFloralBorder } from './components/RoyalOrnaments';
import type { CeremonyItem } from './constants/assets';
import { royalAudio } from './utils/royalAudio';

export default function App() {
  const [curtainStartedOpening, setCurtainStartedOpening] = useState(false);
  const [curtainDismissed, setCurtainDismissed] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeVenue, setActiveVenue] = useState<CeremonyItem | null>(null);

  // Lock page scrolling until the royal curtains open
  useEffect(() => {
    if (!curtainDismissed) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [curtainDismissed]);

  const handleOpenStart = () => {
    setCurtainStartedOpening(true);
    const started = royalAudio.start();
    if (started) {
      setIsAudioPlaying(true);
    }
  };

  const handleOpenComplete = () => {
    setCurtainDismissed(true);
  };

  const handleToggleAudio = () => {
    const nextState = royalAudio.toggle();
    setIsAudioPlaying(nextState);
  };

  return (
    <div className="min-h-screen w-full bg-parchment-damask text-[#4A1424] selection:bg-[#6D1230] selection:text-[#F9EAD6]">
      {/* Fixed Top-Right Audio Toggle (present across cover & invitation) */}
      <button
        type="button"
        onClick={handleToggleAudio}
        aria-label={isAudioPlaying ? 'Mute wedding music' : 'Play wedding music'}
        title={isAudioPlaying ? 'Mute wedding music' : 'Play wedding music'}
        className="cursor-pointer fixed top-4 right-4 sm:top-5 sm:right-5 z-50 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#4D0821] shadow-[0_4px_16px_rgba(0,0,0,0.22)] border border-[#D4A24E]/40 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D1230]"
      >
        {isAudioPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>

      {/* 1. Royal Curtain Entry Screen */}
      <CurtainEntry onOpenStart={handleOpenStart} onOpenComplete={handleOpenComplete} />

      <main>
        {/* 2. Twilight Palace Mandap Hero */}
        <HeroMandap revealNames={curtainStartedOpening} />

        {/* 3. Groom & Bride Royal Velvet Scrolls */}
        <section className="relative w-full bg-parchment-damask pt-8 sm:pt-12 pb-6">
          <RoyalVelvetScroll enabled={curtainDismissed}>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-wide text-[#FFF3E2] mb-5">
              Chi. Kaushik Sharma
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#F5DEC2]/90 mb-1">Son of</p>
            <p className="font-serif text-[20px] sm:text-[23px] leading-snug text-[#FFF3E2]">
              Shri Ramesh Chandra Sharma
            </p>
            <p className="font-serif italic text-base sm:text-lg text-[#F5DEC2]/90 my-0.5">&amp;</p>
            <p className="font-serif text-[20px] sm:text-[23px] leading-snug text-[#FFF3E2] mb-5">
              Smt. Sunita Sharma
            </p>

            <p className="font-serif italic text-base sm:text-lg text-[#F5DEC2]/90 mb-1">Grandson of</p>
            <p className="font-serif text-[19px] sm:text-[22px] leading-snug text-[#FFF3E2]">
              Late Shri Pandit Brij Mohan Sharma
            </p>
            <p className="font-serif italic text-base sm:text-lg text-[#F5DEC2]/90 my-0.5">&amp;</p>
            <p className="font-serif text-[19px] sm:text-[22px] leading-snug text-[#FFF3E2]">
              Late Smt. Kamla Devi Sharma
            </p>
          </RoyalVelvetScroll>

          {/* Painted Botanical Lotus Motif between Scrolls */}
          <div className="flex justify-center py-6 sm:py-8">
            <PaintedLotusStem className="w-40 h-44 sm:w-48 sm:h-52" />
          </div>

          <RoyalVelvetScroll enabled={curtainDismissed} delay={0.05}>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-wide text-[#FFF3E2] mb-5">
              Kum. Ankita Verma
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#F5DEC2]/90 mb-1">Daughter of</p>
            <p className="font-serif text-[20px] sm:text-[23px] leading-snug text-[#FFF3E2]">
              Shri Rajesh Kumar Verma
            </p>
            <p className="font-serif italic text-base sm:text-lg text-[#F5DEC2]/90 my-0.5">&amp;</p>
            <p className="font-serif text-[20px] sm:text-[23px] leading-snug text-[#FFF3E2] mb-5">
              Smt. Meera Verma
            </p>

            <p className="font-serif italic text-base sm:text-lg text-[#F5DEC2]/90 mb-1">Granddaughter of</p>
            <p className="font-serif text-[19px] sm:text-[22px] leading-snug text-[#FFF3E2]">
              Late Shri Hari Prasad Verma
            </p>
            <p className="font-serif italic text-base sm:text-lg text-[#F5DEC2]/90 my-0.5">&amp;</p>
            <p className="font-serif text-[19px] sm:text-[22px] leading-snug text-[#FFF3E2]">
              Late Smt. Shanti Devi Verma
            </p>
          </RoyalVelvetScroll>

          <div className="mt-10 sm:mt-14">
            <ParchmentFloralBorder />
          </div>
        </section>

        {/* 4. Save the Date Slot-Machine Reveal */}
        <SaveTheDateReveal />

        {/* 5. Fountain Pavilion Showcase */}
        <FountainShowcase />

        {/* 6. Hanging Story Gallery */}
        <HangingStoryGallery />

        {/* 7. Royal Maroon Ceremonies Section */}
        <CeremoniesSection onSelectVenue={(ceremony) => setActiveVenue(ceremony)} />

        {/* 8. Best Compliments & Note From Us Scrolls */}
        <section className="relative w-full bg-parchment-damask pt-10 sm:pt-14 pb-6">
          <RoyalVelvetScroll enabled={curtainDismissed}>
            <h2 className="font-serif text-[26px] sm:text-[32px] font-medium tracking-wide text-[#FFF3E2] mb-6">
              With Best Compliments From:
            </h2>
            <div className="space-y-3.5 font-serif text-[19px] sm:text-[22px] text-[#FFF3E2] leading-snug">
              <p>Shri Suresh Sharma &amp; Family (Chacha-Chachi)</p>
              <p>Shri Manoj Sharma &amp; Family (Tau-Tai)</p>
              <p>Smt. Asha Gupta &amp; Family (Bua)</p>
              <p>Shri Rajendra Mehta &amp; Family (Mama-Mami)</p>
            </div>
          </RoyalVelvetScroll>

          <div className="flex justify-center py-6 sm:py-8">
            <PaintedLotusStem className="w-40 h-44 sm:w-48 sm:h-52" />
          </div>

          <RoyalVelvetScroll enabled={curtainDismissed} delay={0.05}>
            <h2 className="font-serif text-[28px] sm:text-[34px] font-medium tracking-wide text-[#FFF3E2] mb-5">
              A Note From Us
            </h2>
            <p className="font-serif text-[20px] sm:text-[23px] leading-relaxed text-[#FFF3E2]/95 max-w-[480px] mx-auto">
              We can&apos;t wait to celebrate this special day with you. Thank you for being part of our journey.
            </p>
          </RoyalVelvetScroll>
        </section>

        {/* 9. Action Icons & Ornate Twilight Easel */}
        <ActionIconsAndEasel onOpenVenue={(ceremony) => setActiveVenue(ceremony)} />

        {/* 10. Interactive RSVP Card */}
        <RsvpSection />
      </main>

      {/* Interactive Venue Map Modal */}
      <VenueMapModal ceremony={activeVenue} onClose={() => setActiveVenue(null)} />
    </div>
  );
}
