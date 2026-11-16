import { useCallback, useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Send,
  User,
} from 'lucide-react';
import {
  GuestLedgerModal,
  type AttendanceChoice,
  type RsvpEntry,
  type RsvpStats,
} from './GuestLedgerModal';

const EMPTY_STATS: RsvpStats = {
  totalResponses: 0,
  totalGuests: 0,
  mehendiGuests: 0,
  sangeetGuests: 0,
  weddingGuests: 0,
};

function EventRadioGroup({
  title,
  value,
  onChange,
}: {
  title: string;
  value: AttendanceChoice;
  onChange: (val: AttendanceChoice) => void;
}) {
  const options: AttendanceChoice[] = ['Yes', 'Maybe', 'No'];

  return (
    <div className="border border-stone-200 rounded-xl p-4 bg-white">
      <div className="font-sans text-[15px] font-medium text-[#2A181D] mb-3">{title}</div>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={selected}
              className={`cursor-pointer flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-sm transition-colors duration-150 ${
                selected
                  ? 'border-[#6D1230] bg-[#FAF2F5] text-[#4D0821] font-medium'
                  : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                  selected ? 'border-[#6D1230]' : 'border-stone-400'
                }`}
              >
                {selected && <span className="w-2 h-2 rounded-full bg-[#6D1230]" />}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function RsvpSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [mehendi, setMehendi] = useState<AttendanceChoice>('Yes');
  const [sangeet, setSangeet] = useState<AttendanceChoice>('Yes');
  const [wedding, setWedding] = useState<AttendanceChoice>('Yes');
  const [wish, setWish] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<RsvpEntry | null>(null);
  const [loadedExisting, setLoadedExisting] = useState(false);

  // Shared Excel workbook state
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [stats, setStats] = useState<RsvpStats>(EMPTY_STATS);
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [ledgerError, setLedgerError] = useState<string | null>(null);
  const [ledgerOpen, setLedgerOpen] = useState(false);

  const fetchEntries = useCallback(async () => {
    setLedgerLoading(true);
    setLedgerError(null);
    try {
      const res = await fetch('/api/rsvp');
      if (!res.ok) throw new Error('Unable to load Excel guest list.');
      const data = (await res.json()) as { entries: RsvpEntry[]; stats: RsvpStats };
      setEntries(data.entries);
      setStats(data.stats);
    } catch (err) {
      setLedgerError(err instanceof Error ? err.message : 'Unable to load Excel guest list.');
    } finally {
      setLedgerLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchEntries();
  }, [fetchEntries]);

  // Auto-load saved RSVP from Excel workbook when entering a matching 10-digit number
  useEffect(() => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setLoadedExisting(false);
      return;
    }
    const match = entries.find((item) => item.phone === cleanPhone);
    if (match) {
      setName(match.name);
      setGuests(match.guests);
      setMehendi(match.mehendi);
      setSangeet(match.sangeet);
      setWedding(match.wedding);
      setWish(match.wish);
      setLoadedExisting(true);
    }
  }, [phone, entries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, '');

    if (!cleanName) {
      setError('Please enter your name.');
      return;
    }
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          phone: cleanPhone,
          guests,
          mehendi,
          sangeet,
          wedding,
          wish: wish.trim(),
        }),
      });
      const data = (await res.json()) as {
        entry?: RsvpEntry;
        entries?: RsvpEntry[];
        stats?: RsvpStats;
        error?: string;
      };
      if (!res.ok || !data.entry) {
        throw new Error(data.error || 'Could not save RSVP.');
      }
      setSubmittedRecord(data.entry);
      if (data.entries) setEntries(data.entries);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save RSVP to Excel file.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEntry = async (targetPhone: string) => {
    const res = await fetch(`/api/rsvp/${encodeURIComponent(targetPhone)}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to remove guest entry.');
    }
    const data = (await res.json()) as { entries: RsvpEntry[]; stats: RsvpStats };
    setEntries(data.entries);
    setStats(data.stats);
  };

  return (
    <section id="rsvp" className="relative w-full bg-parchment-damask py-12 sm:py-16 px-4">
      <div className="max-w-[740px] mx-auto bg-white rounded-[24px] shadow-[0_20px_54px_rgba(77,8,33,0.09)] border border-[#E7D5BD]/70 p-6 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl sm:text-[38px] font-normal text-[#3B1822] mb-2">
            Your Presence Matters
          </h2>
          <p className="font-sans text-sm text-stone-500">
            Let us know so we can make the arrangements just right.
          </p>
        </div>

        {submittedRecord ? (
          <div className="py-6 px-4 text-center bg-[#FAF5EE] rounded-2xl border border-[#DFC4A4]">
            <CheckCircle2 className="w-12 h-12 text-[#6D1230] mx-auto mb-3" />
            <h3 className="font-serif text-2xl sm:text-3xl text-[#4A1424] mb-2">
              Thank You, {submittedRecord.name}
            </h3>
            <p className="font-sans text-sm text-stone-600 max-w-md mx-auto mb-5">
              Your RSVP for <span className="font-semibold text-[#4A1424]">{submittedRecord.guests}</span>{' '}
              {submittedRecord.guests === 1 ? 'guest' : 'guests'} has been saved to the Excel guest workbook. We look forward to celebrating with you in Jaipur!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-sans text-[#5A182B] mb-6">
              <span>Mehendi: {submittedRecord.mehendi}</span>
              <span aria-hidden="true">·</span>
              <span>Sangeet: {submittedRecord.sangeet}</span>
              <span aria-hidden="true">·</span>
              <span>Wedding: {submittedRecord.wedding}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSubmittedRecord(null)}
                className="cursor-pointer px-5 py-2.5 rounded-xl bg-[#6D1230] hover:bg-[#570C25] text-white text-sm font-medium transition-colors"
              >
                Update RSVP
              </button>
              <button
                type="button"
                onClick={() => setLedgerOpen(true)}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#6D1230]/35 bg-white hover:bg-[#FAF2F5] text-[#4D0821] text-sm font-medium transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>View All Entries ({stats.totalResponses})</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name & Mobile Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7D6692] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    aria-label="Your name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#6E538B] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#7D6692] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                    aria-label="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 tabular-nums focus:outline-none focus:border-[#6E538B] transition-colors"
                  />
                </div>
                <p className="mt-1.5 text-[11px] leading-snug text-stone-400">
                  {loadedExisting
                    ? 'Previous response loaded from Excel — feel free to update your details.'
                    : 'Reply again from this number any time to update your answer.'}
                </p>
              </div>
            </div>

            {/* Guest Stepper */}
            <div className="pt-2 text-center">
              <p className="font-sans text-sm font-medium text-stone-700 mb-3">
                How many of you are coming?
              </p>
              <div className="inline-flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white shadow-xs">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  aria-label="Decrease guest count"
                  className="cursor-pointer w-11 h-10 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-stone-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-10 flex items-center justify-center font-sans text-base font-semibold text-stone-800 border-x border-stone-200 tabular-nums">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(10, g + 1))}
                  aria-label="Increase guest count"
                  className="cursor-pointer w-11 h-10 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-stone-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-stone-400">
                Counts for every event you say Yes or Maybe to, below. Up to 10 people.
              </p>
            </div>

            {/* Event Schedule */}
            <div className="pt-2">
              <div className="flex items-start gap-2.5 mb-4">
                <Calendar className="w-4 h-4 text-[#7D6692] mt-1 shrink-0" />
                <div>
                  <h3 className="font-sans text-[15px] font-medium text-stone-800">Event Schedule</h3>
                  <p className="font-sans text-xs text-stone-500">
                    Let us know which events you&apos;ll be joining.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <EventRadioGroup title="Mehendi" value={mehendi} onChange={setMehendi} />
                <EventRadioGroup title="Sangeet" value={sangeet} onChange={setSangeet} />
                <div className="sm:col-span-2">
                  <EventRadioGroup title="Wedding" value={wedding} onChange={setWedding} />
                </div>
              </div>
            </div>

            {/* Optional Couple Wish */}
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-[#7D6692] absolute left-3.5 top-3.5 pointer-events-none" />
              <textarea
                rows={3}
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Leave the couple a wish (optional)"
                aria-label="Leave the couple a wish"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-400 resize-none focus:outline-none focus:border-[#6E538B] transition-colors"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs font-medium text-[#9F1239] text-center">
                {error}
              </p>
            )}

            {/* Send RSVP Button */}
            <button
              type="submit"
              disabled={submitting}
              className="cursor-pointer w-full py-3.5 px-6 rounded-xl bg-[#6F558B] hover:bg-[#5E4579] text-white font-sans text-sm font-medium flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6F558B]"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Saving to Excel...' : 'Send RSVP'}</span>
            </button>
          </form>
        )}

        {/* Unified Excel Guest Workbook Controls */}
        <div className="mt-7 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
          <div className="font-sans text-xs text-stone-500 tabular-nums">
            <span>{stats.totalResponses} {stats.totalResponses === 1 ? 'response' : 'responses'}</span>
            <span aria-hidden="true"> · </span>
            <span>{stats.totalGuests} {stats.totalGuests === 1 ? 'guest' : 'guests'} recorded</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLedgerOpen(true)}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 hover:border-[#6D1230]/40 bg-[#FAF5EE]/70 hover:bg-[#FAF5EE] text-xs font-medium text-[#4D0821] transition-colors whitespace-nowrap"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>View Guest List</span>
            </button>

            <a
              href="/api/rsvp/export"
              download="Ankita-Kaushik-Guest-RSVP.xlsx"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 text-xs font-medium text-stone-700 transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Excel (.xlsx)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Unified Excel Guest Presence Viewer Modal */}
      <GuestLedgerModal
        open={ledgerOpen}
        onClose={() => setLedgerOpen(false)}
        entries={entries}
        stats={stats}
        loading={ledgerLoading}
        error={ledgerError}
        onRefresh={() => void fetchEntries()}
        onDelete={handleDeleteEntry}
      />
    </section>
  );
}
