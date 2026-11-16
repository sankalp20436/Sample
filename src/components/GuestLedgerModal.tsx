import { useEffect, useMemo, useState } from 'react';
import { Download, FileSpreadsheet, RefreshCw, Search, Trash2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export type AttendanceChoice = 'Yes' | 'Maybe' | 'No';

export interface RsvpEntry {
  name: string;
  phone: string;
  guests: number;
  mehendi: AttendanceChoice;
  sangeet: AttendanceChoice;
  wedding: AttendanceChoice;
  wish: string;
  updatedAt: string;
}

export interface RsvpStats {
  totalResponses: number;
  totalGuests: number;
  mehendiGuests: number;
  sangeetGuests: number;
  weddingGuests: number;
}

interface GuestLedgerModalProps {
  open: boolean;
  onClose: () => void;
  entries: RsvpEntry[];
  stats: RsvpStats;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onDelete: (phone: string) => Promise<void>;
}

type EventFilter = 'all' | 'mehendi' | 'sangeet' | 'wedding';

export function GuestLedgerModal({
  open,
  onClose,
  entries,
  stats,
  loading,
  error,
  onRefresh,
  onDelete,
}: GuestLedgerModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter, setEventFilter] = useState<EventFilter>('all');
  const [deletingPhone, setDeletingPhone] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return entries.filter((item) => {
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.phone.includes(q) ||
        item.wish.toLowerCase().includes(q);
      if (!matchesQuery) return false;
      if (eventFilter === 'mehendi') return item.mehendi !== 'No';
      if (eventFilter === 'sangeet') return item.sangeet !== 'No';
      if (eventFilter === 'wedding') return item.wedding !== 'No';
      return true;
    });
  }, [entries, searchQuery, eventFilter]);

  const handleDelete = async (phone: string) => {
    setDeletingPhone(phone);
    try {
      await onDelete(phone);
    } finally {
      setDeletingPhone(null);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusTone = (val: AttendanceChoice) => {
    if (val === 'Yes') return 'text-emerald-800 bg-emerald-50 border-emerald-200';
    if (val === 'Maybe') return 'text-amber-800 bg-amber-50 border-amber-200';
    return 'text-stone-500 bg-stone-100 border-stone-200';
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ledger-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Guest Presence Excel Ledger"
            className="w-full max-w-[1040px] max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 sm:px-7 py-4 bg-[#FAF4EC] border-b border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4D0821] text-[#F9EAD6] flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#4A1424] leading-tight">
                    Guest Presence Workbook
                  </h3>
                  <p className="font-sans text-xs text-stone-500">
                    Synced with <span className="font-mono text-[#6D1230]">data/rsvp_entries.xlsx</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onRefresh}
                  disabled={loading}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-medium text-stone-700 transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <a
                  href="/api/rsvp/export"
                  download="Ankita-Kaushik-Guest-RSVP.xlsx"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4D0821] hover:bg-[#6D1230] text-[#F9EAD6] text-xs font-medium transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel (.xlsx)</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close workbook"
                  className="cursor-pointer w-9 h-9 rounded-full hover:bg-stone-200/70 text-stone-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Summary Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-stone-200 bg-stone-50/70 divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
              {[
                { label: 'Total Entries', value: stats.totalResponses },
                { label: 'Total Guests', value: stats.totalGuests },
                { label: 'Mehendi Guests', value: stats.mehendiGuests },
                { label: 'Sangeet Guests', value: stats.sangeetGuests },
                { label: 'Wedding Guests', value: stats.weddingGuests },
              ].map((stat) => (
                <div key={stat.label} className="px-4 py-3 text-center">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-stone-500">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 font-serif text-2xl font-semibold text-[#4D0821] tabular-nums">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Search & Filter Controls */}
            <div className="px-5 sm:px-7 py-3.5 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 bg-white">
              <div className="relative flex-1 min-w-[220px] max-w-sm">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by guest name, mobile, or wish..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-stone-200 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#6D1230]"
                />
              </div>

              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
                {(
                  [
                    ['all', 'All'],
                    ['mehendi', 'Mehendi'],
                    ['sangeet', 'Sangeet'],
                    ['wedding', 'Wedding'],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEventFilter(key)}
                    className={`cursor-pointer px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                      eventFilter === key
                        ? 'bg-white text-[#4D0821] shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Excel-style Spreadsheet Table */}
            <div className="flex-1 overflow-auto bg-white">
              {error && (
                <div className="m-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                  {error}
                </div>
              )}

              {filteredEntries.length === 0 ? (
                <div className="py-16 px-6 text-center text-stone-500">
                  <FileSpreadsheet className="w-10 h-10 mx-auto text-stone-300 mb-3" />
                  <p className="font-serif text-xl text-[#4A1424] mb-1">
                    {entries.length === 0 ? 'No guest presence entries yet' : 'No matching entries found'}
                  </p>
                  <p className="text-xs text-stone-500">
                    {entries.length === 0
                      ? 'Submit an RSVP using the form and it will appear here and in the Excel workbook immediately.'
                      : 'Try clearing your search or switching the event filter.'}
                  </p>
                </div>
              ) : (
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="sticky top-0 bg-stone-100 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px] z-10">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Guest Name</th>
                      <th className="py-3 px-4">Mobile</th>
                      <th className="py-3 px-4 text-center">Guests</th>
                      <th className="py-3 px-4 text-center">Mehendi</th>
                      <th className="py-3 px-4 text-center">Sangeet</th>
                      <th className="py-3 px-4 text-center">Wedding</th>
                      <th className="py-3 px-4">Wish</th>
                      <th className="py-3 px-4">Updated</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredEntries.map((entry, idx) => (
                      <tr key={entry.phone} className="hover:bg-[#FAF5EE]/60 transition-colors">
                        <td className="py-3 px-4 text-stone-400 tabular-nums">{idx + 1}</td>
                        <td className="py-3 px-4 font-medium text-stone-900 whitespace-nowrap">
                          {entry.name}
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-600 tabular-nums whitespace-nowrap">
                          {entry.phone}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-stone-800 tabular-nums">
                          {entry.guests}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-medium ${statusTone(entry.mehendi)}`}>
                            {entry.mehendi}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-medium ${statusTone(entry.sangeet)}`}>
                            {entry.sangeet}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-medium ${statusTone(entry.wedding)}`}>
                            {entry.wedding}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-600 max-w-[220px] truncate" title={entry.wish}>
                          {entry.wish || '—'}
                        </td>
                        <td className="py-3 px-4 text-stone-400 whitespace-nowrap tabular-nums">
                          {formatDate(entry.updatedAt)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(entry.phone)}
                            disabled={deletingPhone === entry.phone}
                            aria-label={`Remove RSVP for ${entry.name}`}
                            className="cursor-pointer p-1.5 rounded-lg text-stone-400 hover:text-rose-700 hover:bg-rose-50 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
