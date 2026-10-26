export interface MemoryItem {
  id: number;
  title: string;
  caption: string;
  date?: string;
  image: string; // e.g. '/images/photo-1.jpg'
  tapeColor?: 'pink' | 'yellow' | 'blue' | 'green' | 'peach';
  rotation?: number; // slight tilt in degrees, e.g. -2, 1.5, -1
  sticker?: 'heart' | 'sparkle' | 'flower' | 'camera' | 'star' | 'coffee';
}

export interface LoveReason {
  id: number;
  text: string;
  icon?: string;
  color?: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    anniversaryDate?: string;
  };
  couple: {
    boyfriendName: string; // "บลู"
    girlfriendName: string; // "สโน"
    specialCallSign: string; // "สโนคะ"
  };
  music: {
    title: string;
    artist: string;
    albumCover: string;
    audioSrc: string; // local file e.g. '/music/love-song.mp3' or direct URL
    youtubeEmbedUrl?: string;
  };
  opening: {
    badge: string;
    title: string;
    subtitle: string;
    buttonText: string;
  };
  memoriesHeader: {
    titleEn: string;
    titleTh: string;
    subtitle: string;
  };
  memories: MemoryItem[];
  reasonsSection: {
    titleEn: string;
    titleTh: string;
    reasons: LoveReason[];
  };
  intermission: {
    quote1: string;
    quote2: string;
    buttonText: string;
  };
  finalLetter: {
    envelopeTitleEn: string;
    envelopeTitleTh: string;
    openButtonText: string;
    letterHeader: string; // "ถึงสโน ♡"
    paragraphs: string[];
    cakeCluePrefix: string; // "แล้วก็... วันนี้ยังมีอะไรอีกนิดหน่อยที่เราเตรียมไว้ให้ด้วย"
    cakeClue: string; // "สโนคะ หันไปลองเปิดลิ้นชักด้านหน้าดูหน่อยค่ะ 🎂🤍"
    cakeClueSuffix: string; // "หวังว่าจะยิ้มตอนเห็นนะ"
    loveNote: string; // "รักสโนนะ ♡"
    signOff: string; // "จากบลู"
  };
  finalScreen: {
    quoteEn: string;
    quoteTh: string;
    madeWithLove: string;
  };
}
