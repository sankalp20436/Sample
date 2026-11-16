import { useEffect, useState } from 'react';
import { Calendar, Check, MapPin, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ASSETS, CEREMONIES, type CeremonyItem } from '../constants/assets';

interface ActionIconsAndEaselProps {
  onOpenVenue: (ceremony: CeremonyItem) => void;
}

type ActivePopup = 'instagram' | 'locations' | 'calendar' | null;

const COUPLE_INSTAGRAM_URL = 'https://www.instagram.com/';

interface CalendarDateOption {
  id: string;
  dateLabel: string;
  title: string;
  events: Array<{
    uid: string;
    summary: string;
    dtStart: string;
    dtEnd: string;
    description: string;
  }>;
}

const CALENDAR_OPTIONS: CalendarDateOption[] = [
  {
    id: 'ring-ceremony',
    dateLabel: 'SUN, 29 NOV 2026',
    title: 'Ring Ceremony',
    events: [
      {
        uid: 'ankita-kaushik-ring-2026@royalwedding',
        summary: 'Ankita & Kaushik — Ring Ceremony',
        dtStart: '20261129T133000Z',
        dtEnd: '20261129T170000Z',
        description: 'Ring Ceremony at Sharma Residence, E-231, Ashok Vihar, Shyam Nagar, Jaipur.',
      },
    ],
  },
  {
    id: 'mehendi-haldi-sangeet',
    dateLabel: 'MON, 30 NOV 2026',
    title: 'Mehendi, Haldi & Sangeet',
    events: [
      {
        uid: 'ankita-kaushik-mehendi-2026@royalwedding',
        summary: 'Ankita & Kaushik — Mehendi',
        dtStart: '20261130T053000Z',
        dtEnd: '20261130T083000Z',
        description: 'Mehendi at Sharma Residence, E-231, Ashok Vihar, Shyam Nagar, Jaipur.',
      },
      {
        uid: 'ankita-kaushik-haldi-2026@royalwedding',
        summary: 'Ankita & Kaushik — Haldi',
        dtStart: '20261130T103000Z',
        dtEnd: '20261130T123000Z',
        description: 'Haldi at Sharma Residence, E-231, Ashok Vihar, Shyam Nagar, Jaipur.',
      },
      {
        uid: 'ankita-kaushik-sangeet-2026@royalwedding',
        summary: 'Ankita & Kaushik — Sangeet',
        dtStart: '20261130T140000Z',
        dtEnd: '20261130T173000Z',
        description: 'Sangeet at Sharma Residence, E-231, Ashok Vihar, Shyam Nagar, Jaipur.',
      },
    ],
  },
  {
    id: 'vivaah',
    dateLabel: 'TUE, 1 DEC 2026',
    title: 'Vivaah',
    events: [
      {
        uid: 'ankita-kaushik-vivaah-2026@royalwedding',
        summary: 'Ankita & Kaushik — Vivaah',
        dtStart: '20261201T143000Z',
        dtEnd: '20261201T183000Z',
        description: 'Vivaah ceremony at Sharma Residence, E-231, Ashok Vihar, Shyam Nagar, Jaipur.',
      },
    ],
  },
  {
    id: 'reception',
    dateLabel: 'WED, 2 DEC 2026',
    title: 'Reception',
    events: [
      {
        uid: 'ankita-kaushik-reception-2026@royalwedding',
        summary: 'Ankita & Kaushik — Reception',
        dtStart: '20261202T143000Z',
        dtEnd: '20261202T180000Z',
        description: 'Wedding Reception at Sharma Residence, E-231, Ashok Vihar, Shyam Nagar, Jaipur.',
      },
    ],
  },
];

function FloralInstagramIcon() {
  return (
    <svg viewBox="0 0 96 96" className="w-20 h-20 sm:w-[88px] sm:h-[88px] text-[#5A0B26]" fill="currentColor" aria-hidden="true">
      {/* Main Instagram rounded frame */}
      <rect x="27" y="25" width="44" height="44" rx="12" fill="none" stroke="currentColor" strokeWidth="5.2" />
      <circle cx="49" cy="47" r="10.5" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="60.5" cy="35.5" r="2.8" />

      {/* Top-left lotus bloom */}
      <g transform="translate(26 22)">
        <path d="M0 0 C-2 -6 2 -6 0 0Z" />
        <path d="M0 1 C-4 -5 -7 -2 -3 3Z" />
        <path d="M0 1 C4 -5 7 -2 3 3Z" />
        <path d="M-2 3 C-8 0 -9 4 -3 5Z" />
        <path d="M2 3 C8 0 9 4 3 5Z" />
      </g>

      {/* Bottom-left ornate lotus + leaves */}
      <g transform="translate(27 68)">
        <path d="M0 -13 C3 -7 3 -2 0 1 C-3 -2 -3 -7 0 -13Z" />
        <path d="M-2 -1 C-8 -9 -11 -4 -4 1Z" />
        <path d="M2 -1 C8 -9 11 -4 4 1Z" />
        <path d="M-4 2 C-12 -3 -14 2 -5 4Z" />
        <path d="M4 2 C12 -3 14 2 5 4Z" />
        <path d="M-5 5 C-12 4 -11 8 -4 7Z" />
        <path d="M5 5 C12 4 11 8 4 7Z" />
        <path d="M7 6 C13 8 18 7 21 5 C17 10 11 10 7 6Z" />
      </g>

      {/* Right floral stem & bud */}
      <path d="M72 48 C78 40 79 31 76 23" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M76 23 C73 18 76 14 78 18 C80 14 83 18 79 23Z" />
      <path d="M74 41 C80 39 83 35 83 32 C79 34 76 37 74 41Z" />
      <path d="M72 34 C69 29 71 26 73 29Z" />

      {/* Sparkles */}
      <path d="M16 49 L17.5 52 L20.5 53.5 L17.5 55 L16 58 L14.5 55 L11.5 53.5 L14.5 52 Z" />
      <path d="M82 52 L83 54 L85 55 L83 56 L82 58 L81 56 L79 55 L81 54 Z" />
      <circle cx="80" cy="43" r="1.4" />
    </svg>
  );
}

function FloralLocationIcon() {
  return (
    <svg viewBox="0 0 96 96" className="w-20 h-20 sm:w-[88px] sm:h-[88px] text-[#5A0B26]" fill="currentColor" aria-hidden="true">
      {/* Bold Map Pin with hollow center */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48 18 C35.8 18 26 27.6 26 39.6 C26 54.4 48 75 48 75 C48 75 70 54.4 70 39.6 C70 27.6 60.2 18 48 18 Z M48 48.5 C43.1 48.5 39.2 44.5 39.2 39.6 C39.2 34.7 43.1 30.8 48 30.8 C52.9 30.8 56.8 34.7 56.8 39.6 C56.8 44.5 52.9 48.5 48 48.5 Z"
      />
      <circle cx="48" cy="39.6" r="4.6" />

      {/* Left vine & leaves */}
      <path d="M23 41 C18 48 19 57 25 63" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M21 47 C15 43 13 38 16 35 C20 38 22 42 21 47Z" />
      <path d="M20 55 C14 54 12 50 15 48 C18 49 20 52 20 55Z" />

      {/* Bottom-left lotus */}
      <g transform="translate(31 73)">
        <path d="M0 -11 C2.6 -6 2.6 -1.5 0 1 C-2.6 -1.5 -2.6 -6 0 -11Z" />
        <path d="M-2 -1 C-7 -8 -10 -3 -4 1Z" />
        <path d="M2 -1 C7 -8 10 -3 4 1Z" />
        <path d="M-4 2 C-11 -2 -12 3 -4 4Z" />
        <path d="M4 2 C11 -2 12 3 4 4Z" />
      </g>

      {/* Right floral stem & lotus bud */}
      <path d="M51 77 C64 74 75 60 76 34" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M76 26 C73 20 76 15 78.5 19.5 C81 15 84 20 80 26Z" />
      <path d="M74 44 C80 42 84 38 83 34 C79 36 75 40 74 44Z" />
      <path d="M68 58 C74 58 78 55 78 51 C73 52 70 55 68 58Z" />
      <path d="M61 68 C67 69 72 67 73 64 C68 64 64 66 61 68Z" />

      {/* Sparkles & dots */}
      <path d="M20 26 L21.4 28.8 L24.2 30.2 L21.4 31.6 L20 34.4 L18.6 31.6 L15.8 30.2 L18.6 28.8 Z" />
      <circle cx="67" cy="23" r="1.6" />
      <circle cx="80" cy="64" r="1.5" />
    </svg>
  );
}

function FloralCalendarIcon() {
  return (
    <svg viewBox="0 0 96 96" className="w-20 h-20 sm:w-[88px] sm:h-[88px] text-[#5A0B26]" fill="currentColor" aria-hidden="true">
      {/* Binding rings */}
      <rect x="33" y="18" width="5.5" height="12" rx="2.75" />
      <rect x="57" y="18" width="5.5" height="12" rx="2.75" />

      {/* Calendar body */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 25 H72 C75.8 25 79 28.2 79 32 V67 C79 70.8 75.8 74 72 74 H24 C20.2 74 17 70.8 17 67 V32 C17 28.2 20.2 25 24 25 Z M23 39 V66 C23 67.7 24.3 69 26 69 H70 C71.7 69 73 67.7 73 66 V39 H23 Z"
      />

      {/* Calendar grid cells (4x3) */}
      {[43, 51.5, 60].map((y) =>
        [27, 37.5, 48, 58.5].map((x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="7.5" height="6" rx="1.4" />
        )),
      )}

      {/* Bottom-left lotus */}
      <g transform="translate(26 73)">
        <path d="M0 -13 C3 -7 3 -2 0 1 C-3 -2 -3 -7 0 -13Z" />
        <path d="M-2 -1 C-8 -9 -11 -4 -4 1Z" />
        <path d="M2 -1 C8 -9 11 -4 4 1Z" />
        <path d="M-4 2 C-12 -3 -14 2 -5 4Z" />
        <path d="M4 2 C12 -3 14 2 5 4Z" />
        <path d="M7 5 C13 7 18 6 21 4 C17 9 11 9 7 5Z" />
      </g>

      {/* Top-right lotus & leaves */}
      <g transform="translate(77 27)">
        <path d="M0 -12 C2.8 -6.5 2.8 -1.5 0 1 C-2.8 -1.5 -2.8 -6.5 0 -12Z" />
        <path d="M-2 -1 C-7 -8 -10 -3 -4 1Z" />
        <path d="M2 -1 C7 -8 10 -3 4 1Z" />
        <path d="M-3 2 C-10 -2 -11 3 -4 4Z" />
        <path d="M3 2 C10 -2 11 3 4 4Z" />
        <path d="M1 4 C4 11 2 18 -2 23" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M2 13 C8 12 11 9 11 6 C7 8 4 10 2 13Z" />
      </g>

      {/* Sparkles */}
      <path d="M13 55 L14.4 57.6 L17 59 L14.4 60.4 L13 63 L11.6 60.4 L9 59 L11.6 57.6 Z" />
      <path d="M84 52 L85 54 L87 55 L85 56 L84 58 L83 56 L81 55 L83 54 Z" />
      <circle cx="84" cy="43" r="1.4" />
    </svg>
  );
}

export function ActionIconsAndEasel({ onOpenVenue }: ActionIconsAndEaselProps) {
  const [activePopup, setActivePopup] = useState<ActivePopup>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!activePopup) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePopup(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePopup]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 3200);
  };

  const downloadIcsEvents = (
    events: CalendarDateOption['events'],
    filename: string,
    confirmationText: string,
  ) => {
    const vevents = events
      .map((ev) =>
        [
          'BEGIN:VEVENT',
          `UID:${ev.uid}`,
          'DTSTAMP:20261116T120000Z',
          `DTSTART:${ev.dtStart}`,
          `DTEND:${ev.dtEnd}`,
          `SUMMARY:${ev.summary}`,
          `DESCRIPTION:${ev.description}`,
          'LOCATION:Sharma Residence, E-231, Ashok Vihar, Shyam Nagar, Jaipur, Rajasthan',
          'END:VEVENT',
        ].join('\r\n'),
      )
      .join('\r\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ankita & Kaushik Wedding//EN',
      vevents,
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(confirmationText);
  };

  const handleOpenInstagram = () => {
    window.open(COUPLE_INSTAGRAM_URL, '_blank', 'noopener,noreferrer');
    setActivePopup(null);
  };

  const handleOpenVenueMap = () => {
    setActivePopup(null);
    onOpenVenue(CEREMONIES[4]);
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Three Floral-Framed Action Icons */}
      <div className="relative z-20 pt-8 pb-6 flex flex-col items-center">
        <div className="flex items-center justify-center gap-7 sm:gap-14">
          <button
            type="button"
            onClick={() => setActivePopup('instagram')}
            aria-label="Follow the Couple on Instagram"
            title="Follow the Couple"
            className="cursor-pointer group relative flex items-center justify-center rounded-full p-1 transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D1230]"
          >
            <FloralInstagramIcon />
          </button>

          <button
            type="button"
            onClick={() => setActivePopup('locations')}
            aria-label="View Ceremony Locations"
            title="Ceremony Locations"
            className="cursor-pointer group relative flex items-center justify-center rounded-full p-1 transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D1230]"
          >
            <FloralLocationIcon />
          </button>

          <button
            type="button"
            onClick={() => setActivePopup('calendar')}
            aria-label="Add Wedding Dates to Calendar"
            title="Add to Calendar"
            className="cursor-pointer group relative flex items-center justify-center rounded-full p-1 transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D1230]"
          >
            <FloralCalendarIcon />
          </button>
        </div>

        {toastMessage && (
          <div
            role="status"
            className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4D0821] text-[#F9EAD6] text-xs font-medium shadow-md"
          >
            <Check className="w-3.5 h-3.5 text-[#E8C57B]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Respective Action Popups */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            key={`action-popup-${activePopup}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePopup(null)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="action-popup-title"
              className="relative w-full max-w-[460px] rounded-2xl bg-[#FFF3E1] border border-[#E5B87A] shadow-[0_24px_60px_rgba(35,8,16,0.45)] px-6 sm:px-8 pt-8 pb-7"
            >
              <button
                type="button"
                onClick={() => setActivePopup(null)}
                aria-label="Close dialog"
                className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full text-[#7A0E33] hover:bg-[#7A0E33]/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 stroke-[2.2]" />
              </button>

              {activePopup === 'instagram' && (
                <div>
                  <h3
                    id="action-popup-title"
                    className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#7A0E33] text-center"
                  >
                    Follow the Couple
                  </h3>
                  <div className="h-[1.5px] w-44 mx-auto mt-2.5 mb-6 bg-gradient-to-r from-transparent via-[#E29C47] to-transparent" />

                  <p className="text-center text-sm sm:text-base text-[#8B5E2B] mb-7">
                    Would you like to open the couple&rsquo;s Instagram page?
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleOpenInstagram}
                      className="cursor-pointer rounded-full bg-[#7A0E33] hover:bg-[#5E0926] text-white font-semibold py-2.5 px-5 text-sm transition-colors shadow-xs"
                    >
                      Open Instagram
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePopup(null)}
                      className="cursor-pointer rounded-full border border-[#CFA695] text-[#7A0E33] hover:bg-[#7A0E33]/5 font-medium py-2.5 px-5 text-sm transition-colors"
                    >
                      Not now
                    </button>
                  </div>
                </div>
              )}

              {activePopup === 'locations' && (
                <div>
                  <h3
                    id="action-popup-title"
                    className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#7A0E33] text-center"
                  >
                    Ceremony Locations
                  </h3>
                  <div className="h-[1.5px] w-44 mx-auto mt-2.5 mb-6 bg-gradient-to-r from-transparent via-[#E29C47] to-transparent" />

                  <button
                    type="button"
                    onClick={handleOpenVenueMap}
                    className="cursor-pointer w-full text-left rounded-xl border border-[#E2CBB5] bg-[#FCEFD9] hover:border-[#C78F4E] hover:bg-[#FAE7CA] transition-colors p-4 flex items-center gap-4"
                  >
                    <MapPin className="w-5 h-5 text-[#7A0E33] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-wider uppercase text-[#8B5E2B] leading-snug">
                        Ring Ceremony, Mehendi, Haldi, Sangeet, Vivaah &amp; Reception
                      </p>
                      <p className="text-lg font-medium text-[#7A0E33] leading-tight mt-0.5">
                        Sharma Residence
                      </p>
                      <p className="text-sm text-[#8B5E2B] mt-0.5">Jaipur</p>
                    </div>
                  </button>
                </div>
              )}

              {activePopup === 'calendar' && (
                <div>
                  <h3
                    id="action-popup-title"
                    className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#7A0E33] text-center"
                  >
                    Add to Calendar
                  </h3>
                  <div className="h-[1.5px] w-44 mx-auto mt-2.5 mb-6 bg-gradient-to-r from-transparent via-[#E29C47] to-transparent" />

                  <div className="space-y-3 mb-6">
                    {CALENDAR_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          downloadIcsEvents(
                            option.events,
                            `Ankita-Kaushik-${option.id}.ics`,
                            `Calendar invite downloaded for ${option.title}`,
                          );
                          setActivePopup(null);
                        }}
                        className="cursor-pointer w-full rounded-xl border border-[#E2CBB5] bg-[#FCEFD9] hover:border-[#C78F4E] hover:bg-[#FAE7CA] transition-colors px-4 py-3 flex items-center justify-between gap-3 text-left"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <Calendar className="w-5 h-5 text-[#7A0E33] shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold tracking-wider uppercase text-[#8B5E2B] leading-tight">
                              {option.dateLabel}
                            </p>
                            <p className="text-base font-medium text-[#7A0E33] leading-snug truncate">
                              {option.title}
                            </p>
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-[#8B5E2B] shrink-0" />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const allEvents = CALENDAR_OPTIONS.flatMap((opt) => opt.events);
                      downloadIcsEvents(
                        allEvents,
                        'Ankita-Kaushik-All-Ceremonies-2026.ics',
                        'All wedding dates added to your calendar download',
                      );
                      setActivePopup(null);
                    }}
                    className="cursor-pointer w-full rounded-full bg-[#7A0E33] hover:bg-[#5E0926] text-white font-semibold py-3 text-sm transition-colors shadow-xs"
                  >
                    Add all dates
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Twilight Palace Courtyard with Centered Ornate Golden Easel */}
      <div className="relative w-full min-h-[540px] sm:min-h-[650px] flex items-center justify-center py-14 px-4 overflow-hidden">
        {/* Background Courtyard Image */}
        <img
          src={ASSETS.heroMandap}
          alt="Twilight palace courtyard backdrop"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Feathered Top & Bottom Parchment Blends */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F7EBDC] via-[#F7EBDC]/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F7EBDC] via-[#F7EBDC]/75 to-transparent"
        />

        {/* Ornate Golden Easel & Parchment Signboard */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-[560px]">
          {/* Top Carved Brass Finial Spire */}
          <div className="w-5 h-7 rounded-t-full bg-gradient-to-b from-[#FCE8A6] via-[#C99137] to-[#8C5B16] shadow-md border border-[#FFF2C6]/60 -mb-1 z-20" />

          {/* Easel Board Outer Ornate Gold Frame */}
          <div className="relative w-full bg-gradient-to-br from-[#D8A54C] via-[#F1CF84] to-[#A67123] p-3 sm:p-4 rounded-[6px] shadow-[0_26px_60px_rgba(35,8,16,0.45)] border border-[#7C4F12]">
            {/* Inner Crimson & Gold Dotted Mat Border */}
            <div className="relative bg-[#F5E7D3] border-2 border-[#7C1D37] px-6 sm:px-12 py-16 sm:py-24 text-center shadow-[inset_0_0_24px_rgba(124,29,55,0.1)]">
              {/* Four Floral Corner Rosettes */}
              {['top-2 left-2', 'top-2 right-2 -scale-x-100', 'bottom-2 left-2 -scale-y-100', 'bottom-2 right-2 scale-[-1]'].map(
                (pos, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 40 40"
                    className={`absolute ${pos} w-8 h-8 sm:w-10 sm:h-10 pointer-events-none`}
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M4 32 Q6 10 32 4" stroke="#6F8647" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="5.5" fill="#E37C98" />
                    <circle cx="21" cy="8" r="3.5" fill="#F4A5B8" />
                    <circle cx="8" cy="21" r="3.5" fill="#F4A5B8" />
                    <circle cx="12" cy="12" r="1.8" fill="#E8BE5E" />
                  </svg>
                ),
              )}

              <p className="font-serif italic text-2xl sm:text-[34px] leading-snug text-[#4E1924]">
                Your Presence Means the World to Us
              </p>
            </div>
          </div>

          {/* Sculpted Golden Easel Legs */}
          <div className="relative w-[78%] h-20 sm:h-28 flex justify-between px-6 sm:px-12 -mt-1 pointer-events-none" aria-hidden="true">
            <div className="w-4 sm:w-5 h-full bg-gradient-to-r from-[#875813] via-[#E5BA67] to-[#916016] -rotate-[9deg] origin-top shadow-lg" />
            <div className="w-3.5 sm:w-4 h-[92%] bg-gradient-to-r from-[#764C10] via-[#C8943E] to-[#764C10] shadow-md" />
            <div className="w-4 sm:w-5 h-full bg-gradient-to-r from-[#875813] via-[#E5BA67] to-[#916016] rotate-[9deg] origin-top shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
