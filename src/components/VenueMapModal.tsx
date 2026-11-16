import { ExternalLink, MapPin, Navigation, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { CeremonyItem } from '../constants/assets';

interface VenueMapModalProps {
  ceremony: CeremonyItem | null;
  onClose: () => void;
}

export function VenueMapModal({ ceremony, onClose }: VenueMapModalProps) {
  return (
    <AnimatePresence>
      {ceremony && (
        <motion.div
          key="venue-modal-backdrop"
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Venue map for ${ceremony.title}`}
            className="w-full max-w-[680px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 bg-[#FAF5EE]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#4D0821] text-[#F9EAD6] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#4A1424] leading-tight">
                    {ceremony.title} — {ceremony.venue} {ceremony.city}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {ceremony.date} · {ceremony.time}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close venue map"
                className="cursor-pointer w-9 h-9 rounded-full hover:bg-stone-200/70 text-stone-600 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Jaipur Map Embed + Venue Card */}
            <div className="grid grid-cols-1 sm:grid-cols-5">
              <div className="sm:col-span-2 p-5 bg-stone-50 border-b sm:border-b-0 sm:border-r border-stone-200 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#6D1230] mb-1.5">
                    Venue Address
                  </p>
                  <p className="text-sm font-medium text-stone-800 mb-1">
                    The Sharma Residence
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {ceremony.addressNote}
                  </p>

                  <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Jaipur Airport</span>
                      <span className="font-medium text-stone-800">~20 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jaipur Junction</span>
                      <span className="font-medium text-stone-800">~15 min</span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'Sharma Residence, Shyam Nagar, Jaipur, Rajasthan'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#4D0821] hover:bg-[#6D1230] text-[#F9EAD6] text-xs font-medium transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>
              </div>

              <div className="sm:col-span-3 h-[280px] sm:h-[320px] bg-stone-100 relative">
                <iframe
                  title="Sharma Residence Jaipur Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=75.7565%2C26.8750%2C75.8165%2C26.9200&layer=mapnik&marker=26.8975%2C75.7865"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
