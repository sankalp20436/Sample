# Interactive Ceremony Card Zoom-In & Details Experience

Add a responsive click-to-zoom interaction to every Mughal-arched ceremony card (`Ring Ceremony`, `Mehendi`, `Haldi`, `Sangeet`, `Vivaah`, and `Reception`) so clicking a card performs a refined scale-up animation before revealing a dedicated Ceremony Details modal, while preserving the existing direct map pin shortcut.

### User Review & Critical Decisions

> [!IMPORTANT]
> You skipped the clarifying questions, so this plan proceeds with the recommended defaults below. Confirm to proceed or request adjustments before implementation.

- **Details Destination (Recommended Default)**: Clicking a ceremony card opens a dedicated **Ceremony Details Modal** styled to match the royal cream-and-maroon invitation aesthetic, featuring the ceremony artwork, ritual overview, dress code, date/time, venue, and quick buttons to view the venue map or download a calendar reminder.
- **Zoom-In Animation Feel (Recommended Default)**: Clicking a card triggers a smooth, GPU-composited scale-up zoom (`scale: 1.0 -> 1.055`) with elevated golden glow over ~240ms before transitioning cleanly into the Ceremony Details modal, then settles back to `scale: 1.0` when closed.
- **Location Pin Coexistence (Recommended Default)**: Clicking anywhere on the ceremony card opens the Ceremony Details view after the zoom-in pulse, whereas clicking the rounded-square location pin button stops event propagation and opens the interactive Jaipur Venue Map directly as before.

### 1. Overview & Core Concept

- **What It Does**: Transforms the six static ceremony cards from passive schedule cards into interactive, tactile keepsakes. Visitors can inspect rich cultural context, suggested attire, timing, and venue actions for each wedding event through a two-stage zoom-then-open reveal.
- **Target Audience / Persona**: Wedding guests exploring the six celebrations (`Ring Ceremony`, `Mehendi`, `Haldi`, `Sangeet`, `Vivaah`, `Reception`) across desktop and mobile devices.
- **Key Value**: Rewards curiosity with an unmistakable yet restrained royal micro-interaction that avoids jarring jumps while surfacing practical guest details (dress code, ritual summary, map shortcut, and single-event `.ics` download).

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. Visitor hovers over a ceremony arch card and sees a subtle lift and cursor affordance indicating clickability.
  2. Visitor clicks or presses `Enter` / `Space` on a ceremony card.
  3. The clicked card performs a smooth ~240ms `zoom-in` transition (`scale(1.055)`) with subtle elevation while a soft dark scrim begins fading in.
  4. Immediately upon completing the zoom beat, the **Ceremony Details Modal** opens with the card's transparent watercolor artwork, ceremony title, ritual description, attire guidance, schedule (`date` · `time`), and `Sharma Residence, Jaipur` venue block.
  5. Inside the modal, visitors can click **View on Map** (transitioning seamlessly into the Venue Map modal) or **Add to Calendar** (downloading the `.ics` invite for that specific ceremony), or close via `×`, backdrop click, or `Escape`.
  6. Clicking the rounded-square **Map Pin** button on any card bypasses the zoom-and-details flow (`stopPropagation`) and opens the Venue Map modal directly.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Royal Rajasthani editorial stationery consistent with the existing `Follow the Couple`, `Ceremony Locations`, and `Add to Calendar` cream pop-ups.
  - *Color Palette & Mood*: Warm parchment cream modal surface (`#FDF0DD`), antique gold framing (`#E2B576`, `#C89342`), deep royal maroon headings and primary actions (`#4D0821`, `#6D072B`), and warm sepia prose (`#7D4B28`).
  - *Typography & Hierarchy*: `Cormorant Garamond` for the ceremony title (`28px–34px`), paired with `Plus Jakarta Sans` (`14px–15px`) for descriptions, dress code notes, and tabular schedule times (`tabular-nums`).
  - *Component Styling & Layout*: Single-elevation rounded card modal (`rounded-[20px]`), clean hairline dividers (`border-[#DFB995]`), unboxed metadata separated by `·` (avoiding pill-badge clutter), and `>= 40px` interactive touch targets.
- **Interactive Feedback & Motion**:
  - *Compositor-Only Animation*: Animates strictly `transform` (`scale`) and `opacity` with a smooth settling curve (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - *Accessibility & Reduced Motion*: Respects `prefers-reduced-motion` by skipping the zoom-in delay and opening the details modal immediately, while preserving full keyboard navigation (`tabIndex`, `Enter`/`Space`, `Escape` to close).
  - *Double-Click Guard*: Ignores repeat clicks during the ~240ms pre-open zoom window so multiple modals cannot stack.

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Timed Scale-Up Pulse vs. Full Shared-Layout Morph**
  - *Chosen Approach*: Trigger a controlled 240ms `zoom-in` scale transition on the clicked Mughal arch card via local state (`zoomingCeremonyId`), followed by opening the centered Ceremony Details modal.
  - *Why*: The Mughal arch cards use custom SVG silhouettes (`viewBox="0 0 300 440"`) with transparent canvas-processed artwork inside. A crisp scale-up pulse preserves exact arch geometry with zero SVG text distortion during resize, while delivering an unmistakable "zoom-in before opening details" beat.
  - *Alternatives Considered*: Shared-element `layoutId` morphing, which tends to warp non-rectangular SVG arches and clipped illustrations across aspect-ratio changes.
- **Decision 2: Dedicated Ceremony Details Modal vs. Reusing Venue Map Modal**
  - *Chosen Approach*: Introduce a purpose-built Ceremony Details modal paired with enriched per-ceremony metadata (ritual description, attire/dress code, and time window), while keeping a **View on Map** handoff to the existing Venue Map modal.
  - *Why*: Every ceremony shares `Sharma Residence, Jaipur`, so opening only the map when clicking a ceremony card would show identical content for all six cards. A dedicated details view gives each celebration distinct value while preserving direct map access from the pin button.
  - *Alternatives Considered*: Routing all card clicks straight to the Venue Map modal, which would make `Ring Ceremony` through `Reception` feel repetitive.

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:
```text
┌─────────────────────────────────────────────────────────────────────────┐
│                             Invitation Root                             │
│  State: activeVenue (Map)  |  activeCeremonyDetails (Details Modal)     │
└───────────────┬─────────────────────────────────────────┬───────────────┘
                │                                         │
                ▼                                         ▼
┌───────────────────────────────┐         ┌───────────────────────────────┐
│      Ceremonies Grid          │         │    Ceremony Details Modal     │
│  State: zoomingCeremonyId     │         │  - Transparent Artwork        │
│                               │         │  - Ritual Story & Dress Code  │
│  ┌─────────────────────────┐  │         │  - Date, Time & Venue         │
│  │  Mughal Arch Card       │  │         │  - [View on Map] -> Map Modal │
│  │  - Card Click -> Zoom   │──┼────────►│  - [Add to Calendar] -> .ics  │
│  │    (~240ms) -> Details  │  │         └───────────────────────────────┘
│  │  - Pin Click -> Map     │──┐
│  └─────────────────────────┘  │         ┌───────────────────────────────┐
└───────────────────────────────┘         │       Venue Map Modal         │
                                          │  - Jaipur Map & Address       │
                                          └───────────────────────────────┘
```
- **Data Model & State**:
  - Extend each ceremony record in the central ceremonies dataset with `description` (ritual overview), `attire` (suggested Indian festive dress code), and `icsTiming` (start/end timestamps for single-event calendar export).
  - Track `zoomingId` inside the Ceremonies grid to animate the active card (`scale: 1.055`, elevated `z-index`) for ~240ms prior to invoking `onSelectCeremony(ceremony)`.
  - Track `activeCeremony` alongside `activeVenue` at the application root so both modals coordinate cleanly (clicking **View on Map** inside the details modal closes details and opens the Venue Map modal for that ceremony).
- **Interactive Component & State Mapping**:
  - *Card Click (`handleCardSelect`)*: If `zoomingId` is null, sets `zoomingId = ceremony.id`, runs the zoom animation timer (`240ms`, or `0ms` under reduced motion), clears `zoomingId`, and opens the Ceremony Details modal.
  - *Location Pin Click (`onClick` with `e.stopPropagation()`)*: Bypasses card zoom and opens the Venue Map modal immediately.
  - *Modal Actions*: **Add to Calendar** generates a downloadable `.ics` invite for that specific ceremony; **View on Map** hands off directly to the Jaipur map dialog.
