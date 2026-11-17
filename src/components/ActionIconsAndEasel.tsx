import { useState } from 'react';
import { Calendar, Check, MapPin, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ASSETS, CEREMONIES, type CeremonyItem } from '../constants/assets';
import { DiyaTwinkleLights, FlyingTwilightBirds, type LightPoint } from './SceneAtmosphere';

const EASEL_LIGHTS: LightPoint[] = [
  { x: '8%', y: '52%', size: 32, duration: 2.3, delay: 0.2 },
  { x: '16%', y: '56%', size: 28, duration: 2.6, delay: 0.8 },
  { x: '84%', y: '56%', size: 28, duration: 2.4, delay: 0.5 },
  { x: '92%', y: '52%', size: 32, duration: 2.1, delay: 1.0 },
  { x: '29%', y: '86%', size: 38, duration: 2.2, delay: 0.3 },
  { x: '71%', y: '86%', size: 38, duration: 2.5, delay: 0.7 },
];

const EASEL_BIRDS = [
  { id: 1, startX: '-6%', endX: '106%', top: '14%', arcY: -14, size: 17, duration: 24, delay: 1, flapDuration: 0.6, opacity: 0.45 },
  { id: 2, startX: '106%', endX: '-8%', top: '18%', arcY: -12, size: 14, duration: 27, delay: 5, flapDuration: 0.54, opacity: 0.38 },
];

interface ActionIconsAndEaselProps {
  onOpenVenue: (ceremony: CeremonyItem) => void;
}

type ActivePopup = 'instagram' | 'locations' | 'calendar' | null;

interface CalendarDayOption {
  id: string;
  dateLabel: string;
  title: string;
  dtStart: string;
  dtEnd: string;
  description: string;
}

const CALENDAR_DAYS: CalendarDayOption[] = [
  {
    id: 'ring',
    dateLabel: 'SUN, 29 NOV 2026',
    title: 'Ring Ceremony',
    dtStart: '20261129T133000Z',
    dtEnd: '20261129T163000Z',
    description: 'Ring Ceremony of Ankita & Kaushik at Sharma Residence, Jaipur.',
  },
  {
    id: 'mehendi-haldi-sangeet',
    dateLabel: 'MON, 30 NOV 2026',
    title: 'Mehendi, Haldi & Sangeet',
    dtStart: '20261130T053000Z',
    dtEnd: '20261130T170000Z',
    description: 'Mehendi (11:00 AM), Haldi (4:00 PM) & Sangeet (7:30 PM) at Sharma Residence, Jaipur.',
  },
  {
    id: 'vivaah',
    dateLabel: 'TUE, 1 DEC 2026',
    title: 'Vivaah',
    dtStart: '20261201T143000Z',
    dtEnd: '20261201T183000Z',
    description: 'Sacred Vivaah wedding ceremony of Ankita & Kaushik at Sharma Residence, Jaipur.',
  },
  {
    id: 'reception',
    dateLabel: 'WED, 2 DEC 2026',
    title: 'Reception',
    dtStart: '20261202T143000Z',
    dtEnd: '20261202T173000Z',
    description: 'Royal Wedding Reception for Ankita & Kaushik at Sharma Residence, Jaipur.',
  },
];

function downloadIcsEvents(events: CalendarDayOption[], filename: string) {
  const vevents = events
    .map((ev) =>
      [
        'BEGIN:VEVENT',
        `UID:ankita-kaushik-${ev.id}@royalwedding`,
        'DTSTAMP:20261116T120000Z',
        `DTSTART:${ev.dtStart}`,
        `DTEND:${ev.dtEnd}`,
        `SUMMARY:Ankita & Kaushik — ${ev.title}`,
        `DESCRIPTION:${ev.description}`,
        'LOCATION:Sharma Residence, Jaipur, Rajasthan',
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
}

/**
 * Three ornate floral-adorned maroon icons matching image_c76dc472.png.
 */
function FloralInstagramIcon() {
  return (
    <svg viewBox="0 0 96 96" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" aria-hidden="true">
      {/* Main Instagram rounded square */}
      <rect x="26" y="25" width="46" height="46" rx="13" stroke="#5B0924" strokeWidth="5.2" />
      <circle cx="49" cy="48" r="10.5" stroke="#5B0924" strokeWidth="4.8" />
      <circle cx="61" cy="36" r="2.8" fill="#5B0924" />
      {/* Bottom-left lotus blossom */}
      <g transform="translate(29, 71)">
        <path d="M0 -14 C-4 -6, -4 2, 0 6 C4 2, 4 -6, 0 -14Z" fill="#5B0924" />
        <path d="M-4 -10 C-11 -7, -12 3, -3 6 Z" fill="#5B0924" />
        <path d="M4 -10 C11 -7, 12 3, 3 6 Z" fill="#5B0924" />
        <path d="M-8 -4 C-16 -2, -16 6, -5 7 Z" fill="#5B0924" />
        <path d="M8 -4 C16 -2, 16 6, 5 7 Z" fill="#5B0924" />
      </g>
      {/* Top-left & Right lotus leaves/buds */}
      <g transform="translate(26, 22) rotate(-25)">
        <path d="M0 -10 C-3 -4, -3 2, 0 5 C3 2, 3 -4, 0 -10Z" fill="#5B0924" />
        <path d="M-3 -6 C-9 -4, -9 3, -2 5 Z" fill="#5B0924" />
        <path d="M3 -6 C9 -4, 9 3, 2 5 Z" fill="#5B0924" />
      </g>
      <path d="M72 52 Q80 42 78 28" stroke="#5B0924" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="78" cy="41" rx="4" ry="2" transform="rotate(-35 78 41)" fill="#5B0924" />
      <circle cx="78" cy="24" r="3.2" fill="#5B0924" />
      {/* Sparkles */}
      <path d="M16 48 L18 45 L20 48 L18 51 Z" fill="#5B0924" />
      <path d="M81 55 L83 52 L85 55 L83 58 Z" fill="#5B0924" />
    </svg>
  );
}

function FloralLocationIcon() {
  return (
    <svg viewBox="0 0 96 96" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" aria-hidden="true">
      {/* Filled Map Pin */}
      <path
        d="M48 18 C34 18, 24 28, 24 41 C24 57, 48 76, 48 76 C48 76, 72 57, 72 41 C72 28, 62 18, 48 18 Z"
        fill="#5B0924"
      />
      <circle cx="48" cy="41" r="10.5" fill="#F7EBDC" />
      <circle cx="48" cy="41" r="5" fill="#5B0924" />
      {/* Bottom-left & Right lotus sprays */}
      <g transform="translate(30, 74)">
        <path d="M0 -13 C-4 -5, -4 2, 0 5 C4 2, 4 -5, 0 -13Z" fill="#5B0924" />
        <path d="M-4 -9 C-10 -6, -11 3, -3 5 Z" fill="#5B0924" />
        <path d="M4 -9 C10 -6, 11 3, 3 5 Z" fill="#5B0924" />
      </g>
      <path d="M26 62 Q17 50 18 36" stroke="#5B0924" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="18" cy="48" rx="4.5" ry="2" transform="rotate(30 18 48)" fill="#5B0924" />
      <path d="M62 72 Q76 62 76 34" stroke="#5B0924" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="75" cy="52" rx="4.5" ry="2" transform="rotate(-35 75 52)" fill="#5B0924" />
      <circle cx="76" cy="29" r="3.4" fill="#5B0924" />
      <path d="M22 25 L24 22 L26 25 L24 28 Z" fill="#5B0924" />
    </svg>
  );
}

function FloralCalendarIcon() {
  return (
    <svg viewBox="0 0 96 96" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" aria-hidden="true">
      {/* Calendar Header & Rings */}
      <rect x="33" y="18" width="5" height="11" rx="2.5" fill="#5B0924" />
      <rect x="57" y="18" width="5" height="11" rx="2.5" fill="#5B0924" />
      <rect x="24" y="24" width="47" height="47" rx="9" fill="#5B0924" />
      {/* Grid Dots */}
      <rect x="29" y="39" width="37" height="27" rx="4" fill="#F7EBDC" />
      {[0, 1, 2, 3].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={32 + col * 8}
            y={42 + row * 7.5}
            width="6"
            height="5.5"
            rx="1"
            fill="#5B0924"
          />
        )),
      )}
      {/* Bottom-left & Top-right lotus sprays */}
      <g transform="translate(27, 73)">
        <path d="M0 -13 C-4 -5, -4 2, 0 5 C4 2, 4 -5, 0 -13Z" fill="#5B0924" />
        <path d="M-4 -9 C-10 -6, -11 3, -3 5 Z" fill="#5B0924" />
        <path d="M4 -9 C10 -6, 11 3, 3 5 Z" fill="#5B0924" />
      </g>
      <g transform="translate(74, 28) rotate(32)">
        <path d="M0 -12 C-3.5 -5, -3.5 2, 0 5 C3.5 2, 3.5 -5, 0 -12Z" fill="#5B0924" />
        <path d="M-3.5 -8 C-9 -5, -10 3, -2.5 5 Z" fill="#5B0924" />
        <path d="M3.5 -8 C9 -5, 10 3, 2.5 5 Z" fill="#5B0924" />
      </g>
      <path d="M72 62 Q82 52 78 38" stroke="#5B0924" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 58 L18 55 L20 58 L18 61 Z" fill="#5B0924" />
    </svg>
  );
}

function CreamModalShell({
  open,
  title,
  onClose,
  maxWidth = 'max-w-[520px]',
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  maxWidth?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative w-full ${maxWidth} bg-[#FDF0DD] rounded-[20px] border border-[#E2B576] shadow-[0_24px_60px_rgba(40,6,18,0.42)] px-6 sm:px-9 py-7 sm:py-8 text-center`}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={`Close ${title}`}
              className="cursor-pointer absolute top-4 right-4 w-8 h-8 rounded-full text-[#6B0A2B] hover:bg-[#6B0A2B]/10 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>

            <h3 className="font-sans text-2xl sm:text-[28px] font-bold text-[#7A072D] tracking-tight">
              {title}
            </h3>

            {/* Delicate Gold Hairline Rule */}
            <div
              aria-hidden="true"
              className="mx-auto mt-3 mb-6 h-[1px] w-44 bg-gradient-to-r from-transparent via-[#DF9F53] to-transparent"
            />

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ActionIconsAndEasel({ onOpenVenue }: ActionIconsAndEaselProps) {
  const [activePopup, setActivePopup] = useState<ActivePopup>(null);
  const [addedCalendarId, setAddedCalendarId] = useState<string | null>(null);
  const [instagramNotice, setInstagramNotice] = useState(false);

  const handleAddSingleCalendar = (day: CalendarDayOption) => {
    downloadIcsEvents([day], `Ankita-Kaushik-${day.id}.ics`);
    setAddedCalendarId(day.id);
    window.setTimeout(() => setAddedCalendarId(null), 2200);
  };

  const handleAddAllDates = () => {
    downloadIcsEvents(CALENDAR_DAYS, 'Ankita-Kaushik-All-Wedding-Events.ics');
    setAddedCalendarId('all');
    window.setTimeout(() => setAddedCalendarId(null), 2400);
  };

  return (
    <section className="relative w-full overflow-hidden">
      {/* Three Floral-Adorned Maroon Action Icons */}
      <div className="relative z-20 pt-8 pb-6 flex items-center justify-center gap-7 sm:gap-12">
        <button
          type="button"
          onClick={() => {
            setInstagramNotice(false);
            setActivePopup('instagram');
          }}
          aria-label="Follow the Couple on Instagram"
          className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D1230] rounded-2xl"
        >
          <FloralInstagramIcon />
        </button>

        <button
          type="button"
          onClick={() => setActivePopup('locations')}
          aria-label="View Ceremony Locations"
          className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D1230] rounded-2xl"
        >
          <FloralLocationIcon />
        </button>

        <button
          type="button"
          onClick={() => setActivePopup('calendar')}
          aria-label="Add Wedding Events to Calendar"
          className="cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6D1230] rounded-2xl"
        >
          <FloralCalendarIcon />
        </button>
      </div>

      {/* Twilight Palace Courtyard with Centered Ornate Golden Easel */}
      <div className="relative w-full min-h-[540px] sm:min-h-[650px] flex items-center justify-center py-14 px-4 overflow-hidden">
        <img
          src={ASSETS.heroMandap}
          alt="Twilight palace courtyard backdrop"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <FlyingTwilightBirds birds={EASEL_BIRDS} className="h-[42%]" />
        <DiyaTwinkleLights lights={EASEL_LIGHTS} />

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
          <div className="w-5 h-7 rounded-t-full bg-gradient-to-b from-[#FCE8A6] via-[#C99137] to-[#8C5B16] shadow-md border border-[#FFF2C6]/60 -mb-1 z-20" />

          <div className="relative w-full bg-gradient-to-br from-[#D8A54C] via-[#F1CF84] to-[#A67123] p-3 sm:p-4 rounded-[6px] shadow-[0_26px_60px_rgba(35,8,16,0.45)] border border-[#7C4F12]">
            <div className="relative bg-[#F5E7D3] border-2 border-[#7C1D37] px-6 sm:px-12 py-16 sm:py-24 text-center shadow-[inset_0_0_24px_rgba(124,29,55,0.1)]">
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

          <div className="relative w-[78%] h-20 sm:h-28 flex justify-between px-6 sm:px-12 -mt-1 pointer-events-none" aria-hidden="true">
            <div className="w-4 sm:w-5 h-full bg-gradient-to-r from-[#875813] via-[#E5BA67] to-[#916016] -rotate-[9deg] origin-top shadow-lg" />
            <div className="w-3.5 sm:w-4 h-[92%] bg-gradient-to-r from-[#764C10] via-[#C8943E] to-[#764C10] shadow-md" />
            <div className="w-4 sm:w-5 h-full bg-gradient-to-r from-[#875813] via-[#E5BA67] to-[#916016] rotate-[9deg] origin-top shadow-lg" />
          </div>
        </div>
      </div>

      {/* Pop-up 1: Follow the Couple (Instagram) */}
      <CreamModalShell
        open={activePopup === 'instagram'}
        title="Follow the Couple"
        onClose={() => setActivePopup(null)}
        maxWidth="max-w-[500px]"
      >
        <p className="font-sans text-[15px] text-[#7D4B28] mb-7">
          Would you like to open the couple&apos;s Instagram page?
        </p>

        {instagramNotice && (
          <p className="mb-4 text-xs font-medium text-[#7A072D]">
            Follow wedding moments &amp; reels at <span className="font-semibold">@ankita.kaushik.2026</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setInstagramNotice(true)}
            className="w-full sm:w-auto min-w-[180px] inline-flex items-center justify-center rounded-full bg-[#6D072B] hover:bg-[#550521] text-white font-sans text-sm font-medium px-7 py-2.5 shadow-sm transition-colors"
          >
            Open Instagram
          </a>
          <button
            type="button"
            onClick={() => setActivePopup(null)}
            className="cursor-pointer w-full sm:w-auto min-w-[180px] inline-flex items-center justify-center rounded-full border border-[#7A072D]/40 bg-transparent hover:bg-[#7A072D]/5 text-[#7A072D] font-sans text-sm font-medium px-7 py-2.5 transition-colors"
          >
            Not now
          </button>
        </div>
      </CreamModalShell>

      {/* Pop-up 2: Ceremony Locations */}
      <CreamModalShell
        open={activePopup === 'locations'}
        title="Ceremony Locations"
        onClose={() => setActivePopup(null)}
        maxWidth="max-w-[540px]"
      >
        <button
          type="button"
          onClick={() => {
            setActivePopup(null);
            onOpenVenue(CEREMONIES[4]);
          }}
          className="cursor-pointer w-full text-left rounded-xl border border-[#DFB995] bg-[#FAF0E2]/70 hover:bg-[#F5E6D0] px-5 py-4 flex items-center gap-4 transition-colors"
        >
          <MapPin className="w-6 h-6 text-[#7A072D] shrink-0" />
          <div className="min-w-0">
            <p className="font-sans text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8B5E34] leading-snug mb-1">
              RING CEREMONY, MEHENDI, HALDI, SANGEET, VIVAAH &amp; RECEPTION
            </p>
            <p className="font-sans text-lg font-medium text-[#7A072D] leading-tight">
              Sharma Residence
            </p>
            <p className="font-sans text-sm text-[#8B5E34]">Jaipur</p>
          </div>
        </button>
      </CreamModalShell>

      {/* Pop-up 3: Add to Calendar */}
      <CreamModalShell
        open={activePopup === 'calendar'}
        title="Add to Calendar"
        onClose={() => setActivePopup(null)}
        maxWidth="max-w-[520px]"
      >
        <div className="space-y-2.5 text-left">
          {CALENDAR_DAYS.map((day) => {
            const isAdded = addedCalendarId === day.id;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => handleAddSingleCalendar(day)}
                className="cursor-pointer w-full rounded-xl border border-[#DFB995] bg-[#FAF0E2]/70 hover:bg-[#F5E6D0] px-4 py-3 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <Calendar className="w-5 h-5 text-[#7A072D] shrink-0" />
                  <div>
                    <div className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8B5E34]">
                      {day.dateLabel}
                    </div>
                    <div className="font-sans text-base font-medium text-[#7A072D]">
                      {day.title}
                    </div>
                  </div>
                </div>
                <span className="text-[#8B5E34] shrink-0">
                  {isAdded ? <Check className="w-4 h-4 text-emerald-700" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleAddAllDates}
          className="cursor-pointer mt-5 w-full rounded-full bg-[#6D072B] hover:bg-[#550521] text-white font-sans text-sm font-medium py-3 px-6 shadow-sm transition-colors"
        >
          {addedCalendarId === 'all' ? 'All Wedding Dates Downloaded ✓' : 'Add all dates'}
        </button>
      </CreamModalShell>
    </section>
  );
}
