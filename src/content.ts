import type { SiteContent } from './types';

/**
 * =========================================================================
 * 💖 ข้อมูลสำหรับแก้ไขเว็บไซต์ "Our Little Story ♡"
 * =========================================================================
 * บลูสามารถแก้ไขข้อความ ชื่อ วันที่ และรูปภาพได้ทั้งหมดในไฟล์นี้ไฟล์เดียว
 * ไม่จำเป็นต้องแก้ไขโครงสร้างโค้ดส่วนอื่นเลยครับ :)
 */

export const siteContent: SiteContent = {
  // ข้อมูลทั่วไปของเว็บไซต์ (จะแสดงตอนแชร์ลิงก์ใน LINE / แชต)
  meta: {
    title: 'Our Little Story ♡ — บลู & สโน',
    description: 'A little story, made just for you ♡ มีเรื่องราวเล็ก ๆ ที่อยากให้สโนลองอ่านดูนะ 💌',
    anniversaryDate: 'Our Special Day',
  },

  // ข้อมูลชื่อของทั้งคู่
  couple: {
    boyfriendName: 'บลู',
    girlfriendName: 'สโน',
    specialCallSign: 'สโนคะ',
  },

  // ข้อมูลเพลงประกอบ (เครื่องเล่นเพลงน่ารัก ๆ ที่มุมจอ)
  // สามารถนำไฟล์เพลง .mp3 มาใส่ไว้ในโฟลเดอร์ public/music/song.mp3 ได้เลย
  music: {
    title: 'เรื่องราวของเรา (Our Song)',
    artist: 'For Sno ♡',
    albumCover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=150&auto=format&fit=crop&q=80',
    // ตัวอย่างเพลงบรรเลงอะคูสติกนุ่มนวลโรแมนติกแบบ Royalty-free
    audioSrc: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-112191.mp3',
  },

  // หน้าแรก (Opening Screen) - ซองจดหมายเปิดเรื่อง
  opening: {
    badge: 'A Little Surprise 💌',
    title: 'A little story, made just for you ♡',
    subtitle: 'มีเรื่องราวเล็ก ๆ ที่อยากให้สโนลองอ่านดูนะ',
    buttonText: 'มาอ่านกันเถอะ 💌',
  },

  // ส่วนเล่าความทรงจำผ่านรูปภาพ (Our Little Memories)
  memoriesHeader: {
    titleEn: 'Our Little Memories',
    titleTh: 'เรื่องราวของเราสองคน 📸',
    subtitle: 'ทุก ๆ รูปมีความทรงจำดี ๆ ซ่อนอยู่เสมอ',
  },

  /**
   * ช่องรูปภาพ 6 รูป (Polaroid Scrapbook)
   * วิธีใส่รูปจริง: นำไฟล์รูปภาพมาวางในโฟลเดอร์ public/images/
   * ตั้งชื่อตามนี้: photo-1.jpg, photo-2.jpg, photo-3.jpg, ...
   * หากยังไม่ได้ใส่รูปจริง ระบบจะแสดงกรอบภาพวาดน่ารัก ๆ ให้โดยอัตโนมัติ
   */
  memories: [
    {
      id: 1,
      title: 'Memory 1 — The Beginning',
      caption: 'ตอนนั้นเราอาจจะยังไม่รู้เลยเนอะ ว่าวันธรรมดาวันหนึ่งจะกลายเป็นจุดเริ่มต้นของเรื่องราวที่น่ารักขนาดนี้ ♡',
      date: 'จุดเริ่มต้นของเรา',
      image: '/images/photo-1.jpg',
      tapeColor: 'pink',
      rotation: -1.5,
      sticker: 'heart',
    },
    {
      id: 2,
      title: 'Memory 2 — A Little Moment',
      caption: 'พอมองกลับมาดูรูปนี้ ก็ทำให้นึกถึงความรู้สึกในตอนนั้นได้เลย บางทีเรื่องเล็ก ๆ ก็กลายเป็นเรื่องที่เราอยากจำมากที่สุด',
      date: 'ช่วงเวลาดี ๆ',
      image: '/images/photo-2.jpg',
      tapeColor: 'yellow',
      rotation: 1.8,
      sticker: 'sparkle',
    },
    {
      id: 3,
      title: 'Memory 3 — Your Smile',
      caption: 'หนึ่งในสิ่งที่เราชอบก็คือเวลาที่สโนยิ้ม แค่เห็นก็ทำให้เราเผลอยิ้มตามได้เหมือนกันนะ',
      date: 'รอยยิ้มของสโน',
      image: '/images/photo-3.jpg',
      tapeColor: 'peach',
      rotation: -2.2,
      sticker: 'flower',
    },
    {
      id: 4,
      title: 'Memory 4 — Our Memories',
      caption: 'มีหลายอย่างที่ตอนนั้นอาจจะดูธรรมดา แต่พอกลับมานึกถึงอีกที ก็รู้สึกดีที่มีความทรงจำนี้อยู่',
      date: 'เรื่องราวระหว่างทาง',
      image: '/images/photo-4.jpg',
      tapeColor: 'blue',
      rotation: 1.2,
      sticker: 'camera',
    },
    {
      id: 5,
      title: 'Memory 5 — Little Things',
      caption: 'เราอาจจะจำรายละเอียดได้ไม่หมดทุกอย่าง แต่ความรู้สึกดี ๆ ที่เกิดขึ้นในช่วงเวลาพวกนั้น เรายังอยากเก็บเอาไว้เสมอ',
      date: 'ความรู้สึกดี ๆ ที่ไม่เคยเปลี่ยน',
      image: '/images/photo-5.jpg',
      tapeColor: 'green',
      rotation: -1.6,
      sticker: 'star',
    },
    {
      id: 6,
      title: 'Memory 6 — More to Come',
      caption: 'นี่คงเป็นแค่ส่วนหนึ่งของเรื่องราวของเราเอง ยังมีอีกหลายรูป หลายวัน และหลายความทรงจำที่เราอยากมีด้วยกันต่อไป ♡',
      date: 'เรื่องราวที่จะเขียนต่อไป',
      image: '/images/photo-6.jpg',
      tapeColor: 'pink',
      rotation: 2.0,
      sticker: 'heart',
    },
  ],

  // ส่วนบอกความรู้สึก (Little Things I Love About You)
  reasonsSection: {
    titleEn: 'Little Things I Love About You',
    titleTh: 'มีบางอย่างเล็ก ๆ เกี่ยวกับสโนที่เราอยากบอกให้รู้นะ ♡',
    reasons: [
      {
        id: 1,
        text: 'ชอบเวลาที่สโนยิ้มแล้วทำให้เรายิ้มตามได้',
        icon: 'smile',
      },
      {
        id: 2,
        text: 'ชอบเวลาที่สโนเล่าเรื่องต่าง ๆ ให้เราฟัง',
        icon: 'chat',
      },
      {
        id: 3,
        text: 'ชอบที่เรื่องธรรมดา ๆ ดูพิเศษขึ้นมาเวลาได้ใช้ด้วยกัน',
        icon: 'magic',
      },
      {
        id: 4,
        text: 'ชอบที่สโนเป็นสโนในแบบที่สโนเป็น',
        icon: 'sparkle',
      },
    ],
  },

  // หน้าคั่นก่อนถึงจดหมายฉบับสุดท้าย (A Little Note Before the End)
  intermission: {
    quote1: 'พอมานั่งดูเรื่องราวที่ผ่านมา เราก็เพิ่งรู้เหมือนกันนะว่า เรามีความทรงจำที่อยากเก็บไว้เยอะขนาดนี้',
    quote2: 'ขอบคุณที่เข้ามาเป็นส่วนหนึ่งในเรื่องราวของเรานะ สโน ♡',
    buttonText: 'ยังมีอีกอย่างหนึ่งอยากบอก...',
  },

  // จดหมายฉบับสุดท้าย (The Final Letter)
  // ** ข้อสำคัญ: คำใบ้เปิดลิ้นชักรถจะปรากฏในส่วนนี้อย่างสง่างาม **
  finalLetter: {
    envelopeTitleEn: 'One last thing, just for you ♡',
    envelopeTitleTh: 'มีอีกอย่างหนึ่งที่เราอยากบอกสโน',
    openButtonText: 'เปิดอ่านจดหมาย 💌',
    letterHeader: 'ถึงสโน ♡',
    paragraphs: [
      'ถ้าสโนอ่านมาถึงตรงนี้แล้ว เราอยากบอกว่าดีใจนะที่สโนเปิดเข้ามาอ่านเรื่องราวเล็ก ๆ ที่เราตั้งใจทำให้',
      'ขอบคุณที่เข้ามาเป็นส่วนหนึ่งในชีวิตของเรา ขอบคุณสำหรับข้อความ รอยยิ้ม เสียงหัวเราะ และช่วงเวลาต่าง ๆ ที่เราได้มีด้วยกัน',
      'บางทีเราอาจจะไม่ได้พูดทุกความรู้สึกออกมาเก่งเสมอไป แต่เราอยากให้สโนรู้ว่าความทรงจำเหล่านี้มีความหมายกับเราจริง ๆ',
      'เราอยากมีรูปด้วยกันเพิ่มอีกเยอะ ๆ อยากมีเรื่องราวให้กลับมาอ่านแล้วอมยิ้มได้อีก อยากมีวันธรรมดาที่กลายเป็นวันพิเศษแบบนี้อีกเรื่อย ๆ',
      'เราไม่รู้เหมือนกันว่าข้างหน้าจะมีอะไรเกิดขึ้นบ้าง แต่เราหวังว่าเราจะค่อย ๆ สร้างความทรงจำดี ๆ ไปด้วยกันได้อีกนานเลยนะ',
      'ขอบคุณที่เป็นสโนคนนี้นะ ♡',
    ],
    cakeCluePrefix: 'แล้วก็... วันนี้ยังมีอะไรอีกนิดหน่อยที่เราเตรียมไว้ให้ด้วย',
    cakeClue: 'สโนคะ หันไปลองเปิดลิ้นชักด้านหน้าดูหน่อยค่ะ 🎂🤍',
    cakeClueSuffix: 'หวังว่าจะยิ้มตอนเห็นนะ',
    loveNote: 'รักสโนนะ ♡',
    signOff: 'จากบลู',
  },

  // หน้าปิดท้าย (Final Screen)
  finalScreen: {
    quoteEn: 'Our story is still being written... ♡',
    quoteTh: 'เรื่องราวของเรายังมีต่ออีกเยอะเลยนะ',
    madeWithLove: 'Made with love by Blue, just for Sno ♡',
  },
};
