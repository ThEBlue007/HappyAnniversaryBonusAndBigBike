export interface MemoryItem {
  id: number;
  title: string;
  caption: string;
  date?: string;
  images: string[]; // Array of photo paths e.g. ['/images/photo-1.jpg'] or ['/images/photo-2-1.jpg', '/images/photo-2-2.jpg', '/images/photo-2-3.jpg']
  image?: string; // Optional single image fallback
  tapeColor?: 'pink' | 'yellow' | 'blue' | 'green' | 'peach';
  rotation?: number; // slight tilt in degrees, e.g. -2, 1.5, -1
  sticker?: 'heart' | 'sparkle' | 'flower' | 'camera' | 'star' | 'coffee';
  buttonText?: string;
}

export interface LoveReason {
  id: number;
  text: string;
  icon?: string;
  color?: string;
}

export interface QuestionData {
  badge: string; // "Can I Ask You Something? ♡"
  intro: string; // "ก่อนจะไปต่อ ขอถามอะไรสโนอย่างนึงได้ไหมคะ 🥺"
  question: string; // "ถ้าเลือกได้ สโนอยากเก็บความทรงจำแบบไหนของเราไว้ให้นานที่สุด?"
  placeholder: string; // "พิมพ์คำตอบของสโนที่นี่ได้เลยนะ... ♡"
  submitButtonText: string; // "ส่งคำตอบให้บลู ♡"
  editButtonText: string; // "แก้ไขคำตอบ"
  successBadge: string; // "บันทึกไว้ในใจบลูแล้วนะ ♡"
  replyFromBoyfriend: string; // "ขอบคุณสำหรับคำตอบนะคะ บลูจะเก็บความทรงจำนี้ไว้เป็นอย่างดีเลย ♡"
  continueButtonText: string; // "ไปต่อกันนะ ♡"
  emptyWarningText: string; // "พิมพ์คำตอบให้บลูหน่อยน้า 🥺"
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
  navigation: {
    storyCounterPrefix: string; // "Our Story"
    backButtonText: string; // "ย้อนกลับ"
  };
  music: {
    title: string;
    artist: string;
    albumCover: string;
    audioSrc: string; // local file e.g. '/music/love-song.mp3' or direct URL
    floatingPrompt: string; // "แตะเพื่อเปิดเพลงคลอเบา ๆ ♡"
  };
  opening: {
    badge: string;
    title: string;
    subtitle: string;
    envelopeNote: string; // "For Sno ♡"
    envelopeSubtitle: string; // "Our Little Storybook"
    buttonText: string;
    hintText: string;
  };
  memoriesHeader: {
    titleEn: string;
    titleTh: string;
    subtitle: string;
  };
  memories: MemoryItem[];
  reasonsSection?: {
    titleEn: string;
    titleTh: string;
    subtitle: string;
    buttonText: string;
    reasons: LoveReason[];
    bottomNote: string;
  };
  questionSection: QuestionData;
  intermission: {
    badge: string;
    quote1: string;
    quote2: string;
    buttonText: string;
  };
  finalLetter: {
    envelopeTitleEn: string;
    envelopeTitleTh: string;
    openButtonText: string;
    letterHeader: string; // "ถึงสโน ♡"
    pages: string[][]; // Multi-page letter so text fits on mobile screen without scrolling
    paragraphs: string[];
    nextPageButtonText: string;
    proceedToClueButtonText: string;
    cakeCluePrefix?: string;
    cakeClue?: string;
    cakeClueSuffix?: string;
    loveNote: string; // "รักสโนนะ ♡"
    signOff: string; // "จากบลู"
  };
  finalReveal: {
    badge: string;
    prefix: string; // "แล้วก็... วันนี้ยังมีอะไรอีกนิดหน่อยที่เราเตรียมไว้ให้ด้วย"
    cakeClue: string; // "สโนคะ หันไปลองเปิดลิ้นชักด้านหน้าดูหน่อยค่ะ 🎂🤍"
    suffix: string; // "หวังว่าจะยิ้มตอนเห็นนะ ♡"
    buttonText: string; // "จบเรื่องราวของวันนี้ 💗"
  };
  finalScreen: {
    quoteEn: string;
    quoteTh: string;
    madeWithLove: string;
    replayButtonText: string;
  };
}
