import { useRef, useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { STORY_FRAMES, type StoryFrameItem } from '../constants/assets';

function TopLotusBranchDivider() {
  return (
    <div className="w-full flex items-center justify-center px-6 py-4 select-none pointer-events-none" aria-hidden="true">
      <div className="flex items-center w-full max-w-[960px] gap-4">
        <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9963E] to-[#C9963E]" />
        <svg viewBox="0 0 260 64" className="w-56 sm:w-72 h-14 shrink-0" fill="none">
          <path d="M10 34 Q65 30 112 34" stroke="#7A8F50" strokeWidth="1.8" />
          <path d="M250 34 Q195 30 148 34" stroke="#7A8F50" strokeWidth="1.8" />
          <ellipse cx="62" cy="26" rx="10" ry="4.5" transform="rotate(-18 62 26)" fill="#7A9352" />
          <ellipse cx="198" cy="26" rx="10" ry="4.5" transform="rotate(18 198 26)" fill="#7A9352" />
          <ellipse cx="88" cy="40" rx="10" ry="4.5" transform="rotate(15 88 40)" fill="#6C8446" />
          <ellipse cx="172" cy="40" rx="10" ry="4.5" transform="rotate(-15 172 40)" fill="#6C8446" />
          <circle cx="42" cy="34" r="6" fill="#E47E98" />
          <circle cx="218" cy="34" r="6" fill="#E47E98" />
          <circle cx="76" cy="33" r="9" fill="#EA8FA6" />
          <circle cx="184" cy="33" r="9" fill="#EA8FA6" />
          <g transform="translate(130, 34)">
            <path d="M0 -24 C-9 -12, -9 4, 0 11 C9 4, 9 -12, 0 -24Z" fill="#F5A7BB" stroke="#B65B75" strokeWidth="0.9" />
            <path d="M-5 -18 C-18 -13, -22 3, -5 11 C-1 5, -1 -7, -5 -18Z" fill="#E4809D" />
            <path d="M5 -18 C18 -13, 22 3, 5 11 C1 5, 1 -7, 5 -18Z" fill="#E4809D" />
            <path d="M-12 -6 C-28 -2, -26 11, -8 12 Z" fill="#C95978" />
            <path d="M12 -6 C28 -2, 26 11, 8 12 Z" fill="#C95978" />
            <ellipse cx="0" cy="11" rx="7" ry="2.2" fill="#E8BE5E" />
          </g>
        </svg>
        <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-[#C9963E] to-[#C9963E]" />
      </div>
    </div>
  );
}

function HangingFrameCard({
  item,
  customPhoto,
  onUploadPhoto,
}: {
  item: StoryFrameItem;
  customPhoto?: string;
  onUploadPhoto: (id: string, url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isLandscape = item.orientation === 'landscape';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUploadPhoto(item.id, url);
  };

  return (
    <div
      className="relative flex flex-col items-center shrink-0 pt-14 sm:pt-16"
      style={{ transform: `rotate(${item.tiltDeg}deg)` }}
    >
      {/* Golden Eyelet Pin anchored directly on the horizontal crimson cord */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-4 h-4 rounded-full bg-gradient-to-br from-[#FCE8A6] via-[#D49D3F] to-[#865812] shadow-md border border-[#FFF4CE]"
      />

      {/* Triangular Crimson Dotted Hanging Threads */}
      <svg
        viewBox="0 0 220 68"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[210px] sm:w-[250px] h-14 sm:h-16 pointer-events-none z-10"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="110" y1="0" x2="22" y2="68" stroke="#9B1B3D" strokeWidth="1.6" strokeDasharray="3 1.5" />
        <line x1="110" y1="0" x2="198" y2="68" stroke="#9B1B3D" strokeWidth="1.6" strokeDasharray="3 1.5" />
      </svg>

      {/* Swaying Picture Frame */}
      <div
        style={{ animationDelay: `${item.swayDelay}s` }}
        className="animate-frame-sway relative bg-[#6D0F2B] p-2.5 sm:p-3 rounded-[2px] shadow-[0_20px_38px_rgba(45,8,20,0.3)] border border-[#420616]"
      >
        {/* Inner Gold Bevel Line + Warm Mat */}
        <div className="border border-[#DFB975]/75 bg-[#EBD7BD] p-3 sm:p-4">
          {item.type === 'photo' ? (
            <div
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              title="Click to preview your own photo inside this frame"
              className={`group relative cursor-pointer bg-[#DFC8AA] border border-[#C6AB89] shadow-[inset_0_2px_8px_rgba(74,20,36,0.12)] flex flex-col items-center justify-between overflow-hidden transition-colors hover:border-[#6D1230] ${
                isLandscape
                  ? 'w-[280px] h-[200px] sm:w-[345px] sm:h-[245px]'
                  : 'w-[215px] h-[280px] sm:w-[255px] sm:h-[330px]'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {customPhoto ? (
                <img
                  src={customPhoto}
                  alt={item.tag || 'Couple memory'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                  <span className="font-serif italic text-base sm:text-lg text-[#6C4B3B]/80">
                    Your photo here
                  </span>
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-[#6D1230]/65 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImagePlus className="w-3.5 h-3.5" />
                    Add photo
                  </span>
                </div>
              )}

              {/* Bottom Mat Hashtag Caption */}
              <div className="w-full bg-[#EBD7BD] py-1.5 px-3 text-center border-t border-[#C6AB89]/60">
                <span className="font-serif italic text-base sm:text-lg text-[#4B1A26] tracking-wide">
                  {item.tag}
                </span>
              </div>
            </div>
          ) : (
            /* Quote Card Frame */
            <div
              className={`bg-[#E7D1B5] border border-[#C6AB89] shadow-[inset_0_2px_8px_rgba(74,20,36,0.1)] flex items-center justify-center p-6 sm:p-8 text-center ${
                isLandscape
                  ? 'w-[280px] h-[200px] sm:w-[345px] sm:h-[245px]'
                  : 'w-[215px] h-[280px] sm:w-[255px] sm:h-[330px]'
              }`}
            >
              <p className="font-serif italic text-lg sm:text-[21px] leading-[1.45] text-[#4E1924]">
                {item.quote}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function HangingStoryGallery() {
  const [photos, setPhotos] = useState<Record<string, string>>({});

  const handleUploadPhoto = (id: string, url: string) => {
    setPhotos((prev) => ({ ...prev, [id]: url }));
  };

  // Duplicate frames to create a seamless continuous horizontal auto-scroller
  const loopedFrames = [...STORY_FRAMES, ...STORY_FRAMES];

  return (
    <section
      id="our-story"
      className="relative w-full bg-story-botanical py-10 sm:py-14 overflow-hidden"
      aria-label="Our Story Photo Gallery"
    >
      {/* Top Floral Lotus Divider */}
      <TopLotusBranchDivider />

      {/* Continuous Horizontal Auto-Scrolling Hanging Cord & Frames */}
      <div className="story-marquee-container relative w-full mt-8 sm:mt-10 pb-10 overflow-hidden">
        {/* Continuous Taut Crimson Cord across full viewport */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5D0B25] via-[#8A173B] to-[#5D0B25] shadow-sm z-10"
        />

        <div className="animate-story-marquee flex w-max items-start gap-12 sm:gap-16 pr-12 sm:pr-16">
          {loopedFrames.map((item, idx) => (
            <HangingFrameCard
              key={`${item.id}-${idx}`}
              item={item}
              customPhoto={photos[item.id]}
              onUploadPhoto={handleUploadPhoto}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
