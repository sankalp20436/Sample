export const ASSETS = {
  heroMandap: '/src/assets/images/hero_palace_mandap_1794848613141.jpg',
  fountainPavilion: '/src/assets/images/fountain_pavilion_garden_1794848603135.jpg',
  royalElephant: '/src/assets/images/royal_elephant_cream_1794848601638.jpg',
  lotusCrest: '/src/assets/images/lotus_floral_crest_1794848601855.jpg',
  ceremonyRing: '/src/assets/images/ceremony_ring_1794848603258.jpg',
  ceremonyMehendi: '/src/assets/images/ceremony_mehendi_1794848603782.jpg',
  ceremonyHaldi: '/src/assets/images/ceremony_haldi_1794848603648.jpg',
  ceremonySangeet: '/src/assets/images/ceremony_sangeet_1794848678508.jpg',
  ceremonyVivaah: '/src/assets/images/ceremony_vivaah_1794848659233.jpg',
  ceremonyReception: '/src/assets/images/ceremony_reception_1794848610516.jpg',
} as const;

export interface CeremonyItem {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  image: string;
  coordinates: { lat: number; lng: number };
  addressNote: string;
}

export const CEREMONIES: CeremonyItem[] = [
  {
    id: 'ring-ceremony',
    title: 'Ring Ceremony',
    venue: 'Sharma Residence,',
    city: 'Jaipur',
    date: 'Sun, 29 Nov 2026',
    time: '7:00 PM',
    image: ASSETS.ceremonyRing,
    coordinates: { lat: 26.8975, lng: 75.7865 },
    addressNote: 'E-231, Ashok Vihar, Shyam Nagar, Jaipur, Rajasthan',
  },
  {
    id: 'mehendi',
    title: 'Mehendi',
    venue: 'Sharma Residence,',
    city: 'Jaipur',
    date: 'Mon, 30 Nov 2026',
    time: '11:00 AM',
    image: ASSETS.ceremonyMehendi,
    coordinates: { lat: 26.8975, lng: 75.7865 },
    addressNote: 'E-231, Ashok Vihar, Shyam Nagar, Jaipur, Rajasthan',
  },
  {
    id: 'haldi',
    title: 'Haldi',
    venue: 'Sharma Residence,',
    city: 'Jaipur',
    date: 'Mon, 30 Nov 2026',
    time: '4:00 PM',
    image: ASSETS.ceremonyHaldi,
    coordinates: { lat: 26.8975, lng: 75.7865 },
    addressNote: 'E-231, Ashok Vihar, Shyam Nagar, Jaipur, Rajasthan',
  },
  {
    id: 'sangeet',
    title: 'Sangeet',
    venue: 'Sharma Residence,',
    city: 'Jaipur',
    date: 'Mon, 30 Nov 2026',
    time: '7:30 PM',
    image: ASSETS.ceremonySangeet,
    coordinates: { lat: 26.8975, lng: 75.7865 },
    addressNote: 'E-231, Ashok Vihar, Shyam Nagar, Jaipur, Rajasthan',
  },
  {
    id: 'vivaah',
    title: 'Vivaah',
    venue: 'Sharma Residence,',
    city: 'Jaipur',
    date: 'Tue, 1 Dec 2026',
    time: '8:00 PM',
    image: ASSETS.ceremonyVivaah,
    coordinates: { lat: 26.8975, lng: 75.7865 },
    addressNote: 'E-231, Ashok Vihar, Shyam Nagar, Jaipur, Rajasthan',
  },
  {
    id: 'reception',
    title: 'Reception',
    venue: 'Sharma Residence,',
    city: 'Jaipur',
    date: 'Wed, 2 Dec 2026',
    time: '8:00 PM',
    image: ASSETS.ceremonyReception,
    coordinates: { lat: 26.8975, lng: 75.7865 },
    addressNote: 'E-231, Ashok Vihar, Shyam Nagar, Jaipur, Rajasthan',
  },
];

export interface StoryFrameItem {
  id: string;
  type: 'photo' | 'quote';
  orientation: 'portrait' | 'landscape';
  tiltDeg: number;
  tag?: string;
  quote?: string;
  swayDelay: number;
}

export const STORY_FRAMES: StoryFrameItem[] = [
  {
    id: 'frame-1',
    type: 'photo',
    orientation: 'portrait',
    tiltDeg: -1.8,
    tag: '#howitstarted',
    swayDelay: 0,
  },
  {
    id: 'frame-2',
    type: 'photo',
    orientation: 'landscape',
    tiltDeg: 1.6,
    tag: '#adventures',
    swayDelay: 0.7,
  },
  {
    id: 'frame-3',
    type: 'quote',
    orientation: 'portrait',
    tiltDeg: -2.2,
    quote: 'Some stories begin with grand gestures. Ours started with a simple conversation.',
    swayDelay: 1.4,
  },
  {
    id: 'frame-4',
    type: 'photo',
    orientation: 'portrait',
    tiltDeg: 2.1,
    tag: '#thelittlethings',
    swayDelay: 0.4,
  },
  {
    id: 'frame-5',
    type: 'photo',
    orientation: 'landscape',
    tiltDeg: -1.5,
    tag: '#everyday',
    swayDelay: 1.1,
  },
  {
    id: 'frame-6',
    type: 'quote',
    orientation: 'portrait',
    tiltDeg: 2.3,
    quote: "Friendship grew into something more, and we realized life's best moments were the ones we shared together.",
    swayDelay: 1.8,
  },
  {
    id: 'frame-7',
    type: 'photo',
    orientation: 'portrait',
    tiltDeg: -1.4,
    tag: '#foreverbegins',
    swayDelay: 0.5,
  },
  {
    id: 'frame-8',
    type: 'photo',
    orientation: 'landscape',
    tiltDeg: 1.9,
    tag: '#usforever',
    swayDelay: 1.3,
  },
];
