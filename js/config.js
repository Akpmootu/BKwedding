/**
 * ==============================================================================
 * E-WEDDING CARD CONFIGURATION
 * Wedding of Beau & Kim (#BeauKimEverAfter)
 * ==============================================================================
 */

const WEDDING_CONFIG = {
  // ----------------------------------------------------------------------------
  // 1. ข้อมูลคู่บ่าวสาว (BRIDE & GROOM)
  // ----------------------------------------------------------------------------
  couple: {
    bride: {
      fullNameTh: "นางสาวณัฐฐิญา มณีโชคชูโรจน์",
      fullNameEn: "Natthiya Maneechokchuroj",
      nickNameTh: "โบ",
      nickNameEn: "Beau",
      photo: "assets/images/bride-contact.jpg",
      phone: "091-105-1074",
      phoneRaw: "0911051074"
    },
    groom: {
      fullNameTh: "นายวุฒศภัทร์ ปราศภัย",
      fullNameEn: "Wuttisapat Prasapai",
      nickNameTh: "คิม",
      nickNameEn: "Kim",
      photo: "assets/images/groom-contact.jpg",
      phone: "083-351-3634",
      phoneRaw: "0833513634"
    },
    monogram: "B & K",
    shortNamesTh: "โบ & คิม",
    shortNamesEn: "Beau & Kim",
    hashtag: "#BeauKimEverAfter"
  },

  // ----------------------------------------------------------------------------
  // 2. ลิงก์เว็บไซต์และการ์ดเชิญ (SITE URL & INVITATION CARDS)
  // ----------------------------------------------------------------------------
  siteUrl: "https://bkwedding.vercel.app", // เปลี่ยนเป็นโดเมนจริงของคุณหากแตกต่างจากนี้
  ogImage: "https://bkwedding.vercel.app/assets/images/og-image.jpg",
  cards: {
    frontCover: "assets/images/cover.jpg",      // รูปบ่าวสาวในสนามหญ้า (ไม่มีตัวหนังสือ)
    backCard: "assets/images/card-back.jpg"
  },

  // ----------------------------------------------------------------------------
  // 3. ครอบครัว (PARENTS)
  // ----------------------------------------------------------------------------
  parents: {
    bride: {
      father: "นายภูริวัฒน์ มณีโชคชูโรจน์",
      mother: "นางณัฐหทัย มณีโชคชูโรจน์"
    },
    groom: {
      father: "นายอุกกฤษ ปราศภัย",
      mother: "นางโสพิศ ปราศภัย"
    }
  },

  // ----------------------------------------------------------------------------
  // 4. วัน เวลา และกำหนดการ (DATE & COUNTDOWN)
  // ----------------------------------------------------------------------------
  date: {
    isoDateTime: "2026-11-20T18:00:00+07:00",
    endIsoDateTime: "2026-11-20T22:00:00+07:00",
    displayDateTh: "วันศุกร์ที่ 20 พฤศจิกายน 2569",
    displayDateEn: "Friday, 20 November 2026",
    dayNum: "20",
    monthNum: "11",
    yearNum: "26"
  },

  // กำหนดการวันงาน (Wedding Schedule)
  scheduleTimeline: [
    {
      timeTh: "08.09 น.",
      timeEn: "08:09 AM",
      titleTh: "พิธีแห่ขันหมาก",
      titleEn: "Khan Mak Procession",
      descTh: "ตั้งขบวนแห่ขันหมากและเป็นสักขีพยานในพิธีมงคล",
      descEn: "Traditional Khan Mak procession and blessed union ceremony",
      icon: "fa-solid fa-ring",
      tag: "เช้า"
    },
    {
      timeTh: "11.09 น.",
      timeEn: "11:09 AM",
      titleTh: "พิธีหลั่งน้ำพระพุทธมนต์",
      titleEn: "Water Pouring Ceremony",
      descTh: "อวยพรและหลั่งน้ำพระพุทธมนต์ประสาทพรแก่คู่บ่าวสาว",
      descEn: "Traditional water pouring ceremony with heartfelt blessings",
      icon: "fa-solid fa-hands-praying",
      tag: "เช้า"
    },
    {
      timeTh: "18.00 น.",
      timeEn: "06:00 PM",
      titleTh: "ฉลองพิธีมงคลสมรส",
      titleEn: "Wedding Reception",
      descTh: "รับประทานอาหารค่ำ ถ่ายภาพเป็นที่ระลึก และเฉลิมฉลองค่ำคืนแห่งความสุข",
      descEn: "Grand celebration with dinner, photo opportunities, and joyful toasts",
      icon: "fa-solid fa-champagne-glasses",
      tag: "เย็น"
    }
  ],

  // เรื่องราวความรัก (Journey to Marriage)
  loveMilestones: [
    {
      date: "10 October 2016",
      title: "First Met at Top Glove Technology",
      descTh: "",
      descEn: "Where our paths first crossed at Top Glove Technology",
      icon: "fa-solid fa-mug-hot"
    },
    {
      date: "17 October 2021",
      title: "First Date",
      descTh: "",
      descEn: "Our very first official date filled with smiles and warmth",
      icon: "fa-solid fa-heart"
    },
    {
      date: "14 February 2026",
      title: "The Proposal",
      descTh: "",
      descEn: "Valentine's Day proposal - She said 'Yes' to our forever",
      icon: "fa-solid fa-gem"
    },
    {
      date: "20 November 2026",
      title: "Wedding Day",
      descTh: "",
      descEn: "The beginning of our new chapter as Mr. & Mrs.",
      icon: "fa-solid fa-dove"
    }
  ],

  // ----------------------------------------------------------------------------
  // 5. สถานที่และแผนที่ (VENUE & GOOGLE MAPS)
  // ----------------------------------------------------------------------------
  venue: {
    nameTh: "ห้องคริสตัลแกรนด์บอลรูม ชั้น 1",
    hotelTh: "โรงแรมคริสตัล หาดใหญ่",
    nameEn: "Crystal Grand Ballroom, 1st Floor",
    hotelEn: "Crystal Hotel Hat Yai",
    addressTh: "4 ซอย 23 ถนนกาญจนวนิช ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา 90110",
    addressEn: "4 Soi 23, Kanjanavanich Rd, Kho Hong, Hat Yai, Songkhla 90110",
    googleMapsLink: "https://maps.app.goo.gl/EbyMbPtH28EBHXf1A",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.988863615967!2d100.4950302!3d7.0016467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d29b0a701d5df%3A0xe5a3c9be0d35e168!2sCrystal%20Hotel%20Hat%20Yai!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth",
    parkingNoteTh: "มีพื้นที่จอดรถกว้างขวางรองรับแขกผู้มีเกียรติภายในบริเวณโรงแรม",
    parkingNoteEn: "Spacious parking area available inside the hotel premises"
  },

  // ----------------------------------------------------------------------------
  // 6. ธีมการแต่งกาย (DRESS CODE - 6 เฉดสี เขียว 3 + ชมพู 3)
  // ----------------------------------------------------------------------------
  dressCode: {
    descriptionTh: "ธีมสำหรับชุดแต่งกาย",
    descriptionEn: "Theme for Attire",
    noteTh: "",
    noteEn: "",
    colors: [
      { nameTh: "เขียวเข้ม", nameEn: "Forest Sage", hex: "#94A788" },
      { nameTh: "เขียวกลาง", nameEn: "Olive Mist", hex: "#BDCEAF" },
      { nameTh: "เขียวอ่อน", nameEn: "Pistachio Cream", hex: "#DFE7DC" },
      { nameTh: "ชมพูอ่อน", nameEn: "Blush Petal", hex: "#F8D8E8" },
      { nameTh: "ชมพูกลาง", nameEn: "Rose Quartz", hex: "#EB7FA8" },
      { nameTh: "ชมพูเข้ม", nameEn: "Fuchsia Rose", hex: "#EE3C8E" }
    ]
  },

  // ----------------------------------------------------------------------------
  // 7. ซองดิจิทัล & อัปโหลดสลิป (SPECIAL GIFT & PROMPTPAY)
  // ----------------------------------------------------------------------------
  gift: {
    titleTh: "Special Gift",
    subtitleTh: "ร่วมแสดงความยินดีและอวยพรผ่านช่องทางออนไลน์",
    titleEn: "Special Gift",
    subtitleEn: "Send your warm blessing & gift to the couple",
    bankNameTh: "ธนาคารกรุงศรีอยุธยา (BAY)",
    bankNameEn: "Bank of Ayudhya (Krungsri)",
    accountNameTh: "น.ส. ณัฐฐิญา มณีโชคชูโรจน์",
    accountNameEn: "Ms. Natthiya Maneechokchuroj",
    promptPayNumber: "1-9098-00774-90-4",
    promptPayRaw: "1909800774904",
    qrImage: "assets/images/qr-promptpay.jpg"
  },

  // ----------------------------------------------------------------------------
  // 8. ผู้ประสานงาน (CONTACTS)
  // ----------------------------------------------------------------------------
  contacts: [
    {
      nameTh: "คุณโบ (เจ้าสาว)",
      nameEn: "Beau (Bride)",
      photo: "assets/images/bride-contact.jpg",
      phone: "091-105-1074",
      phoneRaw: "0911051074",
      facebook: "https://www.facebook.com/Beau.Nattiya"
    },
    {
      nameTh: "คุณคิม (เจ้าบ่าว)",
      nameEn: "Kim (Groom)",
      photo: "assets/images/groom-contact.jpg",
      phone: "083-351-3634",
      phoneRaw: "0833513634",
      facebook: "https://www.facebook.com/wutsapat.pradpai"
    }
  ],

  // ----------------------------------------------------------------------------
  // 9. เพลงพื้นหลัง (BACKGROUND MUSIC)
  // ----------------------------------------------------------------------------
  music: {
    title: "Taylor Swift - Enchanted (Taylor's Version)",
    localSrc: "assets/music/enchanted.mp3",
    youtubeVideoId: "igIfiqqVHtA",
    autoplayOnOpen: true
  },

  // ----------------------------------------------------------------------------
  // 10. แกลเลอรีรูปภาพ (PRE-WEDDING GALLERY) - 19 รูปคู่จากโฟลเดอร์ pre-wedding
  // ----------------------------------------------------------------------------
  gallery: {
    externalDriveLink: "https://drive.google.com/drive/folders/1ajeP3p77gKAUvJE4ItCNYSY3gZnXvpRA",
    photos: [
      { id: "p01", src: "assets/images/gallery/photo-01.jpg", captionTh: "รอยยิ้มแรกแห่งความสุข วันที่หัวใจตรงกัน", captionEn: "The smile of pure happiness" },
      { id: "p02", src: "assets/images/gallery/photo-02.jpg", captionTh: "ท่ามกลางธรรมชาติ สายลม และความรัก", captionEn: "Surrounded by nature, breeze and love" },
      { id: "p03", src: "assets/images/gallery/photo-03.jpg", captionTh: "มือคู่นี้ที่จะจับกันตลอดไป", captionEn: "Hands that hold forever" },
      { id: "p04", src: "assets/images/gallery/photo-04.jpg", captionTh: "ก้าวไปด้วยกันในทุกเส้นทาง", captionEn: "Walking together through every path" },
      { id: "p05", src: "assets/images/gallery/photo-05.jpg", captionTh: "สายตาแห่งความเข้าใจและผูกพัน", captionEn: "Eyes filled with love and understanding" },
      { id: "p06", src: "assets/images/gallery/photo-06.jpg", captionTh: "ความทรงจำที่แสนงดงาม", captionEn: "A truly beautiful memory" },
      { id: "p07", src: "assets/images/gallery/photo-07.jpg", captionTh: "คำมั่นสัญญาแห่งรัก", captionEn: "A promise of forever" },
      { id: "p08", src: "assets/images/gallery/photo-08.jpg", captionTh: "ความอบอุ่นในทุกสัมผัส", captionEn: "Warmth in every touch" },
      { id: "p09", src: "assets/images/gallery/photo-09.jpg", captionTh: "สายลม แสงแดด และสองเรา", captionEn: "Sunlight, breeze, and just the two of us" },
      { id: "p10", src: "assets/images/gallery/photo-10.jpg", captionTh: "ความสุขที่แท้จริงคือการมีเธอ", captionEn: "True happiness is having you" },
      { id: "p11", src: "assets/images/gallery/photo-11.jpg", captionTh: "เริ่มต้นบทใหม่ของชีวิตคู่", captionEn: "A brand new chapter begins" },
      { id: "p12", src: "assets/images/gallery/photo-12.jpg", captionTh: "ทุกช่วงเวลาที่ได้อยู่เคียงข้าง", captionEn: "Every moment by your side" },
      { id: "p13", src: "assets/images/gallery/photo-13.jpg", captionTh: "รอยยิ้มที่สว่างไสวที่สุด", captionEn: "Our brightest smiles together" },
      { id: "p14", src: "assets/images/gallery/photo-14.jpg", captionTh: "ความรักที่เรียบง่ายแต่ลึกซึ้ง", captionEn: "Simple yet profound love" },
      { id: "p15", src: "assets/images/gallery/photo-15.jpg", captionTh: "ความสนุกและเสียงหัวเราะ", captionEn: "Joy, fun and heartfelt laughter" },
      { id: "p16", src: "assets/images/gallery/photo-16.jpg", captionTh: "เธอคือของขวัญที่ดีที่สุด", captionEn: "You are the greatest blessing" },
      { id: "p17", src: "assets/images/gallery/photo-17.jpg", captionTh: "ช่วงเวลาแสนหวานร่วมกัน", captionEn: "Sweet moments spent together" },
      { id: "p18", src: "assets/images/gallery/photo-18.jpg", captionTh: "ความทรงจำโฟโต้บูธแสนน่ารัก", captionEn: "Cute photobooth memories" },
      { id: "p19", src: "assets/images/gallery/photo-19.jpg", captionTh: "รอยยิ้มที่มีให้กันเสมอ", captionEn: "Endless smiles together" }
    ]
  },

  // รูปภาพคั่นระหว่าง Section (Random Dividers)
  dividers: [
    "assets/images/dividers/divider-1.jpg",
    "assets/images/dividers/divider-2.jpg",
    "assets/images/dividers/divider-3.jpg",
    "assets/images/dividers/divider-4.jpg",
    "assets/images/dividers/divider-5.jpg"
  ],

  // ----------------------------------------------------------------------------
  // 11. GOOGLE APPS SCRIPT WEB APP
  // ----------------------------------------------------------------------------
  // บัญชี akaporn1234@gmail.com สำหรับบันทึก RSVP, Wishes, Photo Comments และอัปโหลดสลิปเข้า Google Drive
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbxs49enWNRD0kRefZCOa5ucVn6RrmEsXmFhe4nBRp0z-PCacWangyfPijhz6XfOpMmnbg/exec",
  rsvpDeadline: "2026-11-15T23:59:59+07:00",

  // ----------------------------------------------------------------------------
  // 12. การตั้งค่าธีม & เครดิต
  // ----------------------------------------------------------------------------
  theme: {
    defaultLang: "th",
    enableFallingPetals: true,
    petalColors: ["#FAD4E6", "#F28BB2", "#DCE6D5", "#BDCEAF", "#FFFFFF"]
  },
  credits: {
    text: "powered by.mootu",
    link: "https://www.facebook.com/Mootu00/"
  }
};
