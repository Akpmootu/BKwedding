/**
 * ==============================================================================
 * E-WEDDING CARD - MAIN CONTROLLER (VANILLA JS)
 * Wedding of Beau & Kim (#BeauKimEverAfter)
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // APPLICATION STATE
  // ----------------------------------------------------------------------------
  const state = {
    currentLang: WEDDING_CONFIG.theme.defaultLang || 'th',
    isMusicPlaying: false,
    audioSource: 'local',
    currentLightboxIndex: 0,
    likes: JSON.parse(localStorage.getItem('bkwedding_likes') || '{}'),
    comments: JSON.parse(localStorage.getItem('bkwedding_photo_comments') || '{}'),
    wishes: [
      {
        name: "เพื่อนสนิทสมัยเรียน",
        wishes: "ขอให้โบและคิมมีความสุขมากๆ ถือไม้เท้ายอดทองกระบองยอดเพชร รักกันตลอดไปนะ!",
        date: "2026-10-10"
      },
      {
        name: "พี่ๆ ทีม Top Glove",
        wishes: "ยินดีด้วยกับคู่รักแห่งปี จากวันแรกที่เจอกันจนถึงวันนี้ ดีใจด้วยจริงๆ จ้า!",
        date: "2026-10-12"
      },
      {
        name: "ครอบครัวปราศภัย",
        wishes: "ขออวยพรให้ทั้งสองคนครองคู่กันด้วยความเข้าใจ มีความสุขและความเจริญรุ่งเรือง",
        date: "2026-10-13"
      }
    ]
  };

  // ----------------------------------------------------------------------------
  // I18N DICTIONARY (BILINGUAL SUPPORT)
  // ----------------------------------------------------------------------------
  const translations = {
    th: {
      envRecipientLabel: "เรียน",
      envInvitationTag: "การ์ดเชิญพิธีมงคลสมรส",
      envTapToOpen: "แตะเพื่อเปิดการ์ดเชิญ",
      btnZoomCard: "แตะเพื่อดูการ์ดขนาดเต็ม",
      countdownTitle: "นับถอยหลังสู่วันสำคัญของเรา",
      cdDays: "วัน",
      cdHours: "ชั่วโมง",
      cdMinutes: "นาที",
      cdEventStarted: "วันนี้คือวันสำคัญของเรา",
      btnGoogleCalendar: "บันทึกลง Google Calendar",
      btnDownloadIcs: "ดาวน์โหลดปฏิทิน (.ics สำหรับ iPhone)",
      scheduleTitle: "Wedding Schedule",
      scheduleSubtitle: "กำหนดการและเรื่องราววันสำคัญ",
      venueTitle: "Wedding Venue",
      venueSubtitle: "สถานที่จัดงานและแผนที่การเดินทาง",
      btnNavGoogleMaps: "เปิดแผนที่ Google Maps",
      dressCodeTitle: "Dress Code",
      dressCodeSubtitle: "ธีมสีสำหรับแขกผู้มีเกียรติ",
      swatchClickHint: "* แตะที่เฉดสีเพื่อคัดลอกรหัสสี (HEX Code)",
      galleryTitle: "Pre-Wedding Gallery",
      gallerySubtitle: "ภาพความทรงจำอันแสนอบอุ่น (แตะรูปเพื่อดูขนาดเต็ม)",
      btnViewAllDrive: "ชมภาพทั้งหมดบน Google Drive",
      rsvpSubtitle: "แบบตอบรับการเข้าร่วมงาน",
      rsvpDeadlinePassed: "ขออภัย ได้ปิดรับการตอบรับแบบออนไลน์แล้ว หากต้องการประสานงาน กรุณาติดต่อผู้ประสานงานโดยตรง",
      formNameLabel: "ชื่อ - นามสกุล",
      formPhoneLabel: "เบอร์โทรศัพท์",
      formAttendanceLabel: "การเข้าร่วมงาน",
      formAttendYes: "ยินดีเข้าร่วมงาน",
      formAttendNo: "ขอแสดงความยินดี แต่ไม่สะดวก",
      formFollowersLabel: "จำนวนผู้ติดตาม (ไม่รวมตัวท่าน)",
      formSideLabel: "ฝ่ายแขกผู้มีเกียรติ",
      formSideBride: "แขกฝ่ายเจ้าสาว (โบ)",
      formSideGroom: "แขกฝ่ายเจ้าบ่าว (คิม)",
      formDietLabel: "อาหารที่แพ้ / มังสวิรัติ (ถ้ามี)",
      formWishesLabel: "ข้อความอวยพรถึงคู่บ่าวสาว",
      btnSubmitRsvp: "ส่งแบบตอบรับ",
      btnSubmitting: "กำลังส่งข้อมูล...",
      guestbookTitle: "Guestbook",
      guestbookSubtitle: "คำอวยพรจากแขกผู้มีเกียรติ",
      guestbookHint: "* ส่งคำอวยพรได้ผ่านแบบฟอร์ม RSVP หรือปุ่มส่งของขวัญ",
      giftSubtitle: "ร่วมแสดงความยินดีผ่านช่องทางออนไลน์",
      giftTeaserHint: "แตะเพื่อดู QR Code พร้อมเพย์ และส่งของขวัญ/แนบสลิป",
      giftModalDesc: "สแกน QR Code หรือโอนเงินร่วมแสดงความยินดี",
      btnCopyPromptPay: "คัดลอกเลขพร้อมเพย์",
      btnDownloadQr: "บันทึกรูป QR",
      contactTitle: "Contact Us",
      contactSubtitle: "ติดต่อสอบถามข้อมูลเพิ่มเติม",
      apologyText: "(ขออภัยหากมิได้เรียนเชิญด้วยตนเอง)",
      navSchedule: "กำหนดการ",
      navLocation: "แผนที่",
      navRsvp: "RSVP",
      navGift: "ของขวัญ",
      toastCopied: "คัดลอกเรียบร้อยแล้ว",
      toastColorCopied: "คัดลอกรหัสสีแล้ว: ",
      rsvpSuccess: "ขอบพระคุณเป็นอย่างยิ่ง ได้รับข้อมูลตอบรับของท่านเรียบร้อยแล้ว!",
      rsvpError: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ประสานงาน",
      slipSuccess: "ได้รับข้อมูลสลิปและคำอวยพรเรียบร้อยแล้ว ขอบพระคุณเป็นอย่างยิ่งค่ะ/ครับ!",
      slipError: "เกิดข้อผิดพลาดในการส่ง กรุณาลองใหม่อีกครั้ง"
    },
    en: {
      envRecipientLabel: "DEAR",
      envInvitationTag: "Wedding Invitation",
      envTapToOpen: "TAP TO OPEN INVITATION",
      btnZoomCard: "Tap to view full card",
      countdownTitle: "COUNTDOWN TO OUR SPECIAL DAY",
      cdDays: "Days",
      cdHours: "Hours",
      cdMinutes: "Minutes",
      cdEventStarted: "Today is our special day!",
      btnGoogleCalendar: "Save to Google Calendar",
      btnDownloadIcs: "Download Calendar (.ics for iPhone)",
      scheduleTitle: "Wedding Schedule",
      scheduleSubtitle: "Schedule of Events & Milestones",
      venueTitle: "Wedding Venue",
      venueSubtitle: "Location and Directions",
      btnNavGoogleMaps: "Open in Google Maps",
      dressCodeTitle: "Dress Code",
      dressCodeSubtitle: "Color Theme for Honored Guests",
      swatchClickHint: "* Tap any color swatch to copy HEX code",
      galleryTitle: "Pre-Wedding Gallery",
      gallerySubtitle: "Precious Moments & Memories (Tap to enlarge)",
      btnViewAllDrive: "View all photos on Google Drive",
      rsvpSubtitle: "Please respond to our invitation",
      rsvpDeadlinePassed: "Online RSVP is now closed. For inquiries, please contact our coordinators.",
      formNameLabel: "Full Name",
      formPhoneLabel: "Phone Number",
      formAttendanceLabel: "Attendance",
      formAttendYes: "Joyfully Accepts",
      formAttendNo: "Regretfully Declines",
      formFollowersLabel: "Number of Guests (excluding yourself)",
      formSideLabel: "Guest Of",
      formSideBride: "Bride's Guest (Beau)",
      formSideGroom: "Groom's Guest (Kim)",
      formDietLabel: "Dietary Restrictions / Vegetarian",
      formWishesLabel: "Blessings & Wishes for the Couple",
      btnSubmitRsvp: "Send RSVP",
      btnSubmitting: "Submitting...",
      guestbookTitle: "Guestbook",
      guestbookSubtitle: "Heartfelt Wishes from Guests",
      guestbookHint: "* You can send your wishes using the RSVP form or gift transfer",
      giftSubtitle: "Congratulate the couple online",
      giftTeaserHint: "Tap to view PromptPay QR Code & Send Gift Slip",
      giftModalDesc: "Scan QR Code or transfer to congratulate",
      btnCopyPromptPay: "Copy PromptPay",
      btnDownloadQr: "Save QR",
      contactTitle: "Contact Us",
      contactSubtitle: "For inquiries and assistance",
      apologyText: "(We apologize if we were unable to invite you in person)",
      navSchedule: "Schedule",
      navLocation: "Venue",
      navRsvp: "RSVP",
      navGift: "Gift",
      toastCopied: "Copied to clipboard!",
      toastColorCopied: "Copied color: ",
      rsvpSuccess: "Thank you so much! Your RSVP has been received.",
      rsvpError: "An error occurred. Please try again or contact us directly.",
      slipSuccess: "Thank you so much! Your gift slip and wishes have been received.",
      slipError: "Failed to upload slip. Please try again."
    }
  };

  // ----------------------------------------------------------------------------
  // INITIALIZATION
  // ----------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initGuestName();
    initRenderFromConfig();
    initLanguage();
    initEnvelope();
    initCardModal();
    initAudio();
    initCountdown();
    initCalendarIntegration();
    initDressCode();
    initGallery();
    initRSVP();
    initGuestbook();
    initSpecialGiftAndSlipUpload();
    initScrollAnimations();
    initCanvasPetals();
  });

  // ----------------------------------------------------------------------------
  // 1. RECIPIENT NAME (?to=...)
  // ----------------------------------------------------------------------------
  function initGuestName() {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('to');
    const guestNameEl = document.getElementById('envelope-guest-name');
    
    if (guestNameEl) {
      if (guestParam && guestParam.trim()) {
        guestNameEl.textContent = guestParam.trim();
        const rsvpNameInput = document.getElementById('rsvp-name');
        if (rsvpNameInput) rsvpNameInput.value = guestParam.trim();
        const slipSenderInput = document.getElementById('slip-sender-name');
        if (slipSenderInput) slipSenderInput.value = guestParam.trim();
      } else {
        guestNameEl.textContent = state.currentLang === 'th' ? "เรียนแขกผู้มีเกียรติ" : "Distinguished Guests";
      }
    }
  }

  // ----------------------------------------------------------------------------
  // 2. RENDER FROM CONFIG
  // ----------------------------------------------------------------------------
  function initRenderFromConfig() {
    // Monogram & Hashtags
    setText('env-monogram', WEDDING_CONFIG.couple.monogram);
    setText('env-hashtag', WEDDING_CONFIG.couple.hashtag);
    setText('hero-hashtag-text', WEDDING_CONFIG.couple.hashtag);
    setText('journey-couple-names', WEDDING_CONFIG.couple.shortNamesEn);
    setText('footer-names', `${WEDDING_CONFIG.couple.shortNamesEn} Wedding`);
    setText('footer-date', WEDDING_CONFIG.date.displayDateEn);

    // Venue Info
    renderVenueInfo();

    // Schedule Timeline in Journey Style
    renderScheduleTimeline();

    // Contact Persons with Photos
    renderContactsWithPortraits();

    // Gift modal details
    setText('gift-bank-name', WEDDING_CONFIG.gift.bankNameTh);
    setText('gift-acc-name', WEDDING_CONFIG.gift.accountNameTh);
    setText('gift-promptpay-num', WEDDING_CONFIG.gift.promptPayNumber);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function renderVenueInfo() {
    const isTh = state.currentLang === 'th';
    setText('venue-hall-name', isTh ? WEDDING_CONFIG.venue.nameTh : WEDDING_CONFIG.venue.nameEn);
    setText('venue-hotel-name', isTh ? WEDDING_CONFIG.venue.hotelTh : WEDDING_CONFIG.venue.hotelEn);
    setText('venue-address', isTh ? WEDDING_CONFIG.venue.addressTh : WEDDING_CONFIG.venue.addressEn);
    setText('venue-parking-note', isTh ? WEDDING_CONFIG.venue.parkingNoteTh : WEDDING_CONFIG.venue.parkingNoteEn);

    const iframe = document.getElementById('map-iframe');
    if (iframe && WEDDING_CONFIG.venue.embedUrl) {
      iframe.src = WEDDING_CONFIG.venue.embedUrl;
    }

    const gMapBtn = document.getElementById('btn-google-maps');
    if (gMapBtn) gMapBtn.href = WEDDING_CONFIG.venue.googleMapsLink;
  }

  // Schedule Timeline (Wedding Day Schedule สไตล์ Timeline ตามกำหนดการวันงาน)
  function renderScheduleTimeline() {
    const container = document.getElementById('schedule-timeline-container');
    if (!container) return;

    const isTh = state.currentLang === 'th';
    
    // Wedding Day Schedule Events (08.09, 09.39, 18.00)
    const scheduleItemsHtml = WEDDING_CONFIG.scheduleTimeline.map(item => {
      const time = isTh ? item.timeTh : item.timeEn;
      const title = isTh ? item.titleTh : item.titleEn;
      const desc = isTh ? item.descTh : item.descEn;
      return `
        <div class="journey-item">
          <div class="journey-node-icon">
            <i class="${item.icon}"></i>
          </div>
          <div class="journey-content">
            <div class="journey-date">${time}</div>
            <div class="journey-event-title">${title}</div>
            <p class="journey-desc">${desc}</p>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = scheduleItemsHtml;
  }

  // Contact Persons with Portraits (โบ & คิม) พร้อมปุ่มโทรและ Facebook
  function renderContactsWithPortraits() {
    const container = document.getElementById('contact-grid-container');
    if (!container) return;

    const isTh = state.currentLang === 'th';
    container.innerHTML = WEDDING_CONFIG.contacts.map(c => {
      const name = isTh ? c.nameTh : c.nameEn;
      return `
        <div class="contact-card">
          <div class="contact-avatar-wrap">
            <img src="${c.photo}" alt="${name}">
          </div>
          <div class="contact-person-name">${name}</div>
          <div class="contact-actions-row">
            <a href="tel:${c.phoneRaw}" class="contact-action-btn contact-tel-btn">
              <i class="fa-solid fa-phone"></i> ${c.phone}
            </a>
            ${c.facebook ? `
              <a href="${c.facebook}" target="_blank" rel="noopener noreferrer" class="contact-action-btn contact-fb-btn">
                <i class="fa-brands fa-facebook"></i> Facebook
              </a>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // ----------------------------------------------------------------------------
  // 3. ENVELOPE OPENING & SCROLL UNLOCK
  // ----------------------------------------------------------------------------
  function initEnvelope() {
    const openBtn = document.getElementById('wax-seal-btn');
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');

    if (!openBtn || !envelopeScreen) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('opened') === '1' || params.get('preview') === '1') {
      envelopeScreen.classList.add('opened');
      envelopeScreen.style.display = 'none';
      document.body.classList.remove('scroll-locked');
      if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'auto';
      }
      setTimeout(() => {
        document.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'));
      }, 100);

      // Mobile first interaction audio unlock if opened directly
      const unlockAudio = () => {
        if (!state.isMusicPlaying) {
          playMusic();
        }
        ['click', 'touchstart'].forEach(evt => document.removeEventListener(evt, unlockAudio));
      };
      ['click', 'touchstart'].forEach(evt => document.addEventListener(evt, unlockAudio, { once: true, passive: true }));
    }

    openBtn.addEventListener('click', () => {
      playMusic();
      envelopeScreen.classList.add('opened');
      document.body.classList.remove('scroll-locked');

      if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'auto';
      }

      setTimeout(() => {
        envelopeScreen.style.display = 'none';
      }, 950);

      setTimeout(() => {
        const heroElements = document.querySelectorAll('#card-hero .fade-up, #countdown-sec .fade-up');
        heroElements.forEach(el => el.classList.add('visible'));
      }, 300);
    });
  }

  // Card Fullscreen Modal
  function initCardModal() {
    const zoomBtn = document.getElementById('btn-zoom-card');
    const cardImg = document.getElementById('invitation-card-img');
    const cardModal = document.getElementById('card-modal');
    const closeBtn = document.getElementById('btn-close-card-modal');

    function openModal() {
      if (cardModal) cardModal.classList.add('active');
    }
    function closeModal() {
      if (cardModal) cardModal.classList.remove('active');
    }

    if (zoomBtn) zoomBtn.addEventListener('click', openModal);
    if (cardImg) cardImg.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cardModal) {
      cardModal.addEventListener('click', (e) => {
        if (e.target === cardModal) closeModal();
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 4. AUDIO & MUSIC PLAYER (DUAL ENGINE)
  // ----------------------------------------------------------------------------
  function initAudio() {
    const audioEl = document.getElementById('wedding-audio');
    const musicBtn = document.getElementById('music-floating-btn');

    if (musicBtn) {
      musicBtn.addEventListener('click', () => {
        if (state.isMusicPlaying) {
          pauseMusic();
        } else {
          playMusic();
        }
      });
    }

    if (audioEl) {
      audioEl.addEventListener('error', () => {
        console.warn('Local audio element encountered an error, falling back to YouTube engine.');
        state.audioSource = 'youtube';
      });
    }
  }

  function playMusic() {
    const audioEl = document.getElementById('wedding-audio');
    const musicBtn = document.getElementById('music-floating-btn');

    if (state.audioSource === 'local' && audioEl) {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          state.isMusicPlaying = true;
          if (musicBtn) musicBtn.classList.add('playing');
        }).catch((err) => {
          console.warn('Audio play request blocked or failed, trying YouTube fallback:', err);
          state.audioSource = 'youtube';
          setupYouTubeAudio();
        });
      }
    } else if (state.audioSource === 'youtube') {
      const ytFrame = document.getElementById('yt-audio-iframe');
      if (ytFrame && ytFrame.contentWindow) {
        ytFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        state.isMusicPlaying = true;
        if (musicBtn) musicBtn.classList.add('playing');
      } else {
        setupYouTubeAudio();
      }
    }
  }

  function pauseMusic() {
    const audioEl = document.getElementById('wedding-audio');
    const musicBtn = document.getElementById('music-floating-btn');

    if (state.audioSource === 'local' && audioEl) {
      audioEl.pause();
    } else if (state.audioSource === 'youtube') {
      const ytFrame = document.getElementById('yt-audio-iframe');
      if (ytFrame && ytFrame.contentWindow) {
        ytFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }

    state.isMusicPlaying = false;
    if (musicBtn) musicBtn.classList.remove('playing');
  }

  function setupYouTubeAudio() {
    const container = document.getElementById('youtube-audio-container');
    if (!container) return;

    const videoId = WEDDING_CONFIG.music.youtubeVideoId || 'igIfiqqVHtA';
    if (!document.getElementById('yt-audio-iframe')) {
      container.innerHTML = `
        <iframe id="yt-audio-iframe" 
          src="https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${videoId}&playsinline=1" 
          allow="autoplay; encrypted-media">
        </iframe>
      `;
    } else {
      const ytFrame = document.getElementById('yt-audio-iframe');
      if (ytFrame && ytFrame.contentWindow) {
        ytFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    }

    const musicBtn = document.getElementById('music-floating-btn');
    state.isMusicPlaying = true;
    if (musicBtn) musicBtn.classList.add('playing');
  }

  // ----------------------------------------------------------------------------
  // 5. COUNTDOWN TIMER (TARGET: 20 พ.ย. 2569)
  // ----------------------------------------------------------------------------
  function initCountdown() {
    const targetDate = new Date(WEDDING_CONFIG.date.isoDateTime).getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const boxEl = document.getElementById('countdown-box');

    function updateTimer() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        const titleEl = boxEl ? boxEl.querySelector('.countdown-title') : null;
        if (titleEl) {
          titleEl.textContent = translations[state.currentLang].cdEventStarted;
        }
        if (daysEl) daysEl.textContent = "00";
        if (hoursEl) hoursEl.textContent = "00";
        if (minutesEl) minutesEl.textContent = "00";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 60000);
  }

  // ----------------------------------------------------------------------------
  // 6. CALENDAR INTEGRATION (.ics & Google Calendar)
  // ----------------------------------------------------------------------------
  function initCalendarIntegration() {
    const googleCalBtn = document.getElementById('btn-google-cal');
    const icsBtn = document.getElementById('btn-download-ics');

    const title = encodeURIComponent(`งานฉลองมงคลสมรส Beau & Kim (#BeauKimEverAfter)`);
    const details = encodeURIComponent(`ขอเรียนเชิญร่วมงานฉลองมงคลสมรสระหว่าง โบ (ณัฐฐิญา มณีโชคชูโรจน์) & คิม (วุฒิศภัทร์ ปราศภัย) ณ ห้องคริสตัลแกรนด์บอลรูม ชั้น 1 โรงแรมคริสตัล หาดใหญ่`);
    const location = encodeURIComponent(`ห้องคริสตัลแกรนด์บอลรูม ชั้น 1 โรงแรมคริสตัล หาดใหญ่`);
    const dates = "20261120T010900Z/20261120T150000Z";
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

    if (googleCalBtn) {
      googleCalBtn.href = googleCalUrl;
    }

    if (icsBtn) {
      icsBtn.addEventListener('click', () => {
        const icsContent = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//BeauKimWedding//TH",
          "CALSCALE:GREGORIAN",
          "METHOD:PUBLISH",
          "BEGIN:VEVENT",
          "SUMMARY:งานฉลองมงคลสมรส Beau & Kim (#BeauKimEverAfter)",
          "DESCRIPTION:ขอเรียนเชิญร่วมงานฉลองมงคลสมรสระหว่าง โบ & คิม ณ โรงแรมคริสตัล หาดใหญ่",
          "LOCATION:ห้องคริสตัลแกรนด์บอลรูม ชั้น 1 โรงแรมคริสตัล หาดใหญ่",
          "DTSTART:20261120T010900Z",
          "DTEND:20261120T150000Z",
          "STATUS:CONFIRMED",
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'BeauKim_Wedding_20Nov2026.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast(translations[state.currentLang].toastCopied);
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 7. DRESS CODE (6 SWATCHES)
  // ----------------------------------------------------------------------------
  function initDressCode() {
    const grid = document.getElementById('dresscode-grid');
    const descEl = document.getElementById('dresscode-desc');
    const noteEl = document.getElementById('dresscode-note');

    if (!grid) return;

    const isTh = state.currentLang === 'th';
    if (descEl) descEl.textContent = isTh ? WEDDING_CONFIG.dressCode.descriptionTh : WEDDING_CONFIG.dressCode.descriptionEn;
    if (noteEl) noteEl.textContent = isTh ? WEDDING_CONFIG.dressCode.noteTh : WEDDING_CONFIG.dressCode.noteEn;

    grid.innerHTML = WEDDING_CONFIG.dressCode.colors.map(c => {
      const name = isTh ? c.nameTh : c.nameEn;
      return `
        <div class="swatch-box" data-hex="${c.hex}" title="Click to copy ${c.hex}">
          <div class="swatch-circle" style="background-color: ${c.hex};"></div>
          <div class="swatch-title">${name}</div>
          <div class="swatch-hex">${c.hex}</div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.swatch-box').forEach(box => {
      box.addEventListener('click', () => {
        const hex = box.getAttribute('data-hex');
        copyToClipboard(hex, `${translations[state.currentLang].toastColorCopied} ${hex}`);
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 8. PRE-WEDDING GALLERY & INTERACTIVE LIGHTBOX (LIKE, DOWNLOAD, COMMENTS)
  // ----------------------------------------------------------------------------
  function initGallery() {
    const grid = document.getElementById('gallery-grid-container');
    const driveBtn = document.getElementById('btn-drive-gallery');

    if (driveBtn) {
      driveBtn.href = WEDDING_CONFIG.gallery.externalDriveLink;
    }

    if (!grid) return;

    grid.innerHTML = WEDDING_CONFIG.gallery.photos.map((photo, index) => {
      const caption = state.currentLang === 'th' ? photo.captionTh : photo.captionEn;
      const spanClass = (index === 0 || index === 7 || index === 14) ? 'span-2' : '';
      return `
        <div class="gallery-item ${spanClass}" data-index="${index}">
          <img src="${photo.src}" alt="${caption}" loading="lazy">
          <div class="gallery-overlay">
            <span class="gallery-caption">${caption}</span>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-index'), 10);
        openLightbox(idx);
      });
    });

    // Lightbox Controls
    const lightbox = document.getElementById('gallery-lightbox');
    const closeBtn = document.getElementById('btn-close-lightbox');
    const prevBtn = document.getElementById('btn-prev-lightbox');
    const nextBtn = document.getElementById('btn-next-lightbox');
    const likeBtn = document.getElementById('btn-lightbox-like');
    const commentToggleBtn = document.getElementById('btn-lightbox-comment-toggle');
    const commentDrawer = document.getElementById('lightbox-comment-drawer');
    const commentForm = document.getElementById('photo-comment-form');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateLightbox(1));

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    // Like Button in Lightbox
    if (likeBtn) {
      likeBtn.addEventListener('click', () => {
        const currentPhoto = WEDDING_CONFIG.gallery.photos[state.currentLightboxIndex];
        const photoId = currentPhoto.id;
        state.likes[photoId] = (state.likes[photoId] || 0) + 1;
        localStorage.setItem('bkwedding_likes', JSON.stringify(state.likes));
        updateLightboxLikeState(photoId);
        showToast("ขอบคุณที่ร่วมกดไลค์ภาพของเราค่ะ! ❤️");
      });
    }

    // Comment Drawer Toggle
    if (commentToggleBtn && commentDrawer) {
      commentToggleBtn.addEventListener('click', () => {
        const isHidden = commentDrawer.style.display === 'none';
        commentDrawer.style.display = isHidden ? 'block' : 'none';
      });
    }

    // Photo Comment Form Submit
    if (commentForm) {
      commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentPhoto = WEDDING_CONFIG.gallery.photos[state.currentLightboxIndex];
        const photoId = currentPhoto.id;
        const nameInput = document.getElementById('pc-name');
        const textInput = document.getElementById('pc-text');

        const newComment = {
          name: nameInput.value.trim() || "แขกผู้มีเกียรติ",
          comment: textInput.value.trim(),
          date: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
        };

        if (!state.comments[photoId]) state.comments[photoId] = [];
        state.comments[photoId].unshift(newComment);
        localStorage.setItem('bkwedding_photo_comments', JSON.stringify(state.comments));

        // Submit to Google Apps Script asynchronously
        if (WEDDING_CONFIG.appsScriptUrl) {
          fetch(WEDDING_CONFIG.appsScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: "photo_comment",
              photoId: photoId,
              name: newComment.name,
              comment: newComment.comment
            })
          }).catch(console.error);
        }

        textInput.value = '';
        renderPhotoComments(photoId);
        showToast("ส่งความคิดเห็นเรียบร้อยแล้วค่ะ!");
      });
    }

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function openLightbox(index) {
    state.currentLightboxIndex = index;
    const lightbox = document.getElementById('gallery-lightbox');
    const imgEl = document.getElementById('lightbox-img');
    const downloadLink = document.getElementById('btn-lightbox-download');
    const photo = WEDDING_CONFIG.gallery.photos[index];

    if (imgEl && photo) {
      imgEl.src = photo.src;
    }
    if (downloadLink && photo) {
      downloadLink.href = photo.src;
      downloadLink.setAttribute('download', `BeauKim_Prewedding_${photo.id}.jpg`);
    }

    updateLightboxLikeState(photo.id);
    renderPhotoComments(photo.id);

    if (lightbox) {
      lightbox.classList.add('active');
    }
  }

  function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) lightbox.classList.remove('active');
    const commentDrawer = document.getElementById('lightbox-comment-drawer');
    if (commentDrawer) commentDrawer.style.display = 'none';
  }

  function navigateLightbox(dir) {
    const total = WEDDING_CONFIG.gallery.photos.length;
    let nextIdx = state.currentLightboxIndex + dir;
    if (nextIdx < 0) nextIdx = total - 1;
    if (nextIdx >= total) nextIdx = 0;
    openLightbox(nextIdx);
  }

  function updateLightboxLikeState(photoId) {
    const countEl = document.getElementById('lightbox-like-count');
    const likeBtn = document.getElementById('btn-lightbox-like');
    const count = state.likes[photoId] || 0;
    if (countEl) countEl.textContent = count;
    if (likeBtn) {
      if (count > 0) {
        likeBtn.classList.add('liked');
      } else {
        likeBtn.classList.remove('liked');
      }
    }
  }

  function renderPhotoComments(photoId) {
    const listEl = document.getElementById('photo-comments-list');
    const comments = state.comments[photoId] || [];
    if (!listEl) return;

    if (comments.length === 0) {
      listEl.innerHTML = `<div style="font-size:0.8rem; color:#aaa; font-style:italic;">ยังไม่มีความคิดเห็น มาร่วมเป็นคนแรกที่คอมเมนต์รูปนี้กันค่ะ</div>`;
      return;
    }

    listEl.innerHTML = comments.map(c => `
      <div class="photo-comment-item">
        <strong>${escapeHtml(c.name)}:</strong> ${escapeHtml(c.comment)}
      </div>
    `).join('');
  }

  // ----------------------------------------------------------------------------
  // 9. RSVP FORM HANDLING
  // ----------------------------------------------------------------------------
  function initRSVP() {
    const form = document.getElementById('rsvp-form');
    const closedNotice = document.getElementById('rsvp-closed-notice');
    const submitBtn = document.getElementById('btn-submit-rsvp');
    const submitText = document.getElementById('btn-submit-text');
    const statusBox = document.getElementById('rsvp-status-box');

    const attendYes = document.getElementById('label-attend-yes');
    const attendNo = document.getElementById('label-attend-no');
    const attendOnlyFields = document.querySelectorAll('.attend-only-field');

    function toggleAttendanceFields(isAttending) {
      attendOnlyFields.forEach(el => {
        el.style.display = isAttending ? 'block' : 'none';
      });
    }

    if (attendYes && attendNo) {
      attendYes.addEventListener('click', () => {
        attendYes.classList.add('selected');
        attendNo.classList.remove('selected');
        toggleAttendanceFields(true);
      });
      attendNo.addEventListener('click', () => {
        attendNo.classList.add('selected');
        attendYes.classList.remove('selected');
        toggleAttendanceFields(false);
      });
    }

    const sideBride = document.getElementById('label-side-bride');
    const sideGroom = document.getElementById('label-side-groom');
    if (sideBride && sideGroom) {
      sideBride.addEventListener('click', () => {
        sideBride.classList.add('selected');
        sideGroom.classList.remove('selected');
      });
      sideGroom.addEventListener('click', () => {
        sideGroom.classList.add('selected');
        sideBride.classList.remove('selected');
      });
    }

    const minusBtn = document.getElementById('btn-follower-minus');
    const plusBtn = document.getElementById('btn-follower-plus');
    const countInput = document.getElementById('followers-count');

    if (minusBtn && plusBtn && countInput) {
      minusBtn.addEventListener('click', () => {
        let val = parseInt(countInput.value, 10) || 0;
        if (val > 0) countInput.value = val - 1;
      });
      plusBtn.addEventListener('click', () => {
        let val = parseInt(countInput.value, 10) || 0;
        if (val < 5) countInput.value = val + 1;
      });
    }

    if (WEDDING_CONFIG.rsvpDeadline) {
      const deadline = new Date(WEDDING_CONFIG.rsvpDeadline).getTime();
      const now = new Date().getTime();
      if (now > deadline) {
        if (form) form.style.display = 'none';
        if (closedNotice) closedNotice.style.display = 'block';
        return;
      }
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const attendanceVal = formData.get('attendance');
        const isAttending = attendanceVal === 'attend';

        const payload = {
          type: "rsvp",
          timestamp: new Date().toISOString(),
          name: formData.get('name') || "แขกผู้มีเกียรติ",
          phone: formData.get('phone') || "-",
          attendance: isAttending ? "attend" : "cannot_attend",
          followers: isAttending ? (formData.get('followers') || '0') : '0',
          side: isAttending ? (formData.get('side') || '-') : '-',
          diet: isAttending ? (formData.get('diet') || '-') : '-',
          wishes: formData.get('wishes') || '-'
        };

        submitBtn.disabled = true;
        submitText.textContent = translations[state.currentLang].btnSubmitting;
        statusBox.className = 'form-status-msg';
        statusBox.style.display = 'none';

        try {
          if (WEDDING_CONFIG.appsScriptUrl && WEDDING_CONFIG.appsScriptUrl.trim() !== '') {
            await fetch(WEDDING_CONFIG.appsScriptUrl, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
          }

          if (payload.wishes && payload.wishes.trim() !== '-' && payload.wishes.trim() !== '') {
            addWishToCarousel(payload.name, payload.wishes);
          }

          statusBox.textContent = translations[state.currentLang].rsvpSuccess;
          statusBox.classList.add('success');
          statusBox.style.display = 'block';
          form.reset();
          attendYes.classList.add('selected');
          attendNo.classList.remove('selected');
          toggleAttendanceFields(true);

          showToast(translations[state.currentLang].rsvpSuccess);
        } catch (err) {
          console.error('RSVP submission error:', err);
          statusBox.textContent = translations[state.currentLang].rsvpError;
          statusBox.classList.add('error');
          statusBox.style.display = 'block';
        } finally {
          submitBtn.disabled = false;
          submitText.textContent = translations[state.currentLang].btnSubmitRsvp;
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 10. GUESTBOOK
  // ----------------------------------------------------------------------------
  function initGuestbook() {
    renderWishes();
  }

  function renderWishes() {
    const container = document.getElementById('wishes-carousel-container');
    if (!container) return;

    container.innerHTML = state.wishes.map(item => `
      <div class="wish-card">
        <p class="wish-text">“${escapeHtml(item.wishes)}”</p>
        <div>
          <div class="wish-author">
            <i class="fa-solid fa-feather-pointed"></i> ${escapeHtml(item.name)}
          </div>
          <span class="wish-date">${item.date || '2026-11-20'}</span>
        </div>
      </div>
    `).join('');
  }

  function addWishToCarousel(name, message) {
    state.wishes.unshift({
      name: name,
      wishes: message,
      date: new Date().toISOString().split('T')[0]
    });
    renderWishes();
  }

  // ----------------------------------------------------------------------------
  // 11. SPECIAL GIFT & SLIP UPLOAD
  // ----------------------------------------------------------------------------
  function initSpecialGiftAndSlipUpload() {
    const openBtn = document.getElementById('btn-open-gift-modal');
    const modal = document.getElementById('gift-modal');
    const closeBtn = document.getElementById('btn-close-gift-modal');
    const copyBtn = document.getElementById('btn-copy-promptpay');

    if (openBtn && modal) {
      openBtn.addEventListener('click', () => modal.classList.add('active'));
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const rawNum = WEDDING_CONFIG.gift.promptPayRaw;
        copyToClipboard(rawNum, `${translations[state.currentLang].toastCopied}: ${rawNum}`);
      });
    }

    const hashtagBtn = document.getElementById('hero-hashtag');
    if (hashtagBtn) {
      hashtagBtn.addEventListener('click', () => {
        copyToClipboard(WEDDING_CONFIG.couple.hashtag, `${translations[state.currentLang].toastCopied} ${WEDDING_CONFIG.couple.hashtag}`);
      });
    }

    // Slip file preview & Client-side compression
    const slipFileInput = document.getElementById('slip-file');
    const slipPreviewBox = document.getElementById('slip-preview-box');
    const slipPreviewImg = document.getElementById('slip-preview-img');
    let slipBase64 = null;
    let slipMime = 'image/jpeg';

    // บีบอัดรูปสลิปให้ขนาดประมาณ 150KB เพื่อส่งผ่าน Google Apps Script ได้ทันทีไม่หมดเวลา (No Timeout)
    function compressSlipImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (width > maxWidth || height > maxHeight) {
              if (width / height > maxWidth / maxHeight) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              } else {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(dataUrl);
          };
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    }

    if (slipFileInput) {
      slipFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            slipMime = 'image/jpeg';
            slipBase64 = await compressSlipImage(file, 1200, 1200, 0.82);
            if (slipPreviewImg) slipPreviewImg.src = slipBase64;
            if (slipPreviewBox) slipPreviewBox.style.display = 'block';
          } catch (err) {
            console.warn('Canvas compression fallback:', err);
            const reader = new FileReader();
            reader.onload = (event) => {
              slipBase64 = event.target.result;
              slipMime = file.type || 'image/jpeg';
              if (slipPreviewImg) slipPreviewImg.src = slipBase64;
              if (slipPreviewBox) slipPreviewBox.style.display = 'block';
            };
            reader.readAsDataURL(file);
          }
        }
      });
    }

    // Slip form submit
    const slipForm = document.getElementById('slip-upload-form');
    const slipSubmitBtn = document.getElementById('btn-submit-slip');
    const slipSubmitText = document.getElementById('slip-submit-text');
    const slipStatusBox = document.getElementById('slip-status-box');

    if (slipForm) {
      slipForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('slip-sender-name')?.value.trim();
        const rawAmount = document.getElementById('slip-amount')?.value.trim();
        const message = document.getElementById('slip-message')?.value.trim();

        if (!slipBase64) {
          alert('กรุณาเลือกรูปภาพสลิปโอนเงิน');
          return;
        }

        let formattedAmount = "-";
        if (rawAmount && rawAmount !== "") {
          const cleanNum = rawAmount.replace(/,/g, "");
          if (!isNaN(cleanNum) && cleanNum.trim() !== "") {
            formattedAmount = Number(cleanNum).toLocaleString('th-TH');
          } else {
            formattedAmount = rawAmount;
          }
        }

        slipSubmitBtn.disabled = true;
        slipSubmitText.textContent = "กำลังอัปโหลดสลิป...";
        slipStatusBox.className = 'form-status-msg';
        slipStatusBox.style.display = 'none';

        const payload = {
          type: "slip_upload",
          name: name || "แขกผู้มีเกียรติ",
          amount: formattedAmount,
          message: message || "ขอแสดงความยินดีกับคู่บ่าวสาว",
          slipBase64: slipBase64,
          mimeType: slipMime
        };

        try {
          if (WEDDING_CONFIG.appsScriptUrl && WEDDING_CONFIG.appsScriptUrl.trim() !== '') {
            await fetch(WEDDING_CONFIG.appsScriptUrl, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
          }

          if (message && message.trim() !== '') {
            addWishToCarousel(payload.name, message);
          }

          slipStatusBox.textContent = translations[state.currentLang].slipSuccess;
          slipStatusBox.classList.add('success');
          slipStatusBox.style.display = 'block';

          slipForm.reset();
          if (slipPreviewBox) slipPreviewBox.style.display = 'none';
          slipBase64 = null;

          showToast(translations[state.currentLang].slipSuccess);
        } catch (err) {
          console.error('Slip upload error:', err);
          slipStatusBox.textContent = translations[state.currentLang].slipError;
          slipStatusBox.classList.add('error');
          slipStatusBox.style.display = 'block';
        } finally {
          slipSubmitBtn.disabled = false;
          slipSubmitText.textContent = "ส่งสลิป & คำอวยพร";
        }
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 12. LANGUAGE SWITCHER
  // ----------------------------------------------------------------------------
  function initLanguage() {
    const langBtn = document.getElementById('lang-switch-btn');
    if (!langBtn) return;

    langBtn.addEventListener('click', () => {
      state.currentLang = state.currentLang === 'th' ? 'en' : 'th';
      applyTranslations();
    });
  }

  function applyTranslations() {
    const dict = translations[state.currentLang];
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    initGuestName();
    renderVenueInfo();
    renderScheduleTimeline();
    renderContactsWithPortraits();
    initDressCode();
  }

  // ----------------------------------------------------------------------------
  // 13. SCROLL ANIMATIONS & BOTTOM NAV ACTIVE
  // ----------------------------------------------------------------------------
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    const navItems = document.querySelectorAll('.bottom-nav-item');
    const sections = document.querySelectorAll('section[id], footer[id]');

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 220;

      sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        const href = item.getAttribute('href').replace('#', '');
        if (href === currentSectionId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }, { passive: true });
  }

  // ----------------------------------------------------------------------------
  // 14. CANVAS FALLING PETALS
  // ----------------------------------------------------------------------------
  function initCanvasPetals() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas || !WEDDING_CONFIG.theme.enableFallingPetals) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const colors = WEDDING_CONFIG.theme.petalColors || ["#FAD4E6", "#F28BB2", "#DCE6D5", "#BDCEAF", "#FFFFFF"];
    const totalPetals = window.innerWidth < 768 ? 16 : 26;
    const petals = [];

    for (let i = 0; i < totalPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle * Math.PI / 180) * 0.8;
        p.angle += p.spin;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // ----------------------------------------------------------------------------
  // UTILITIES
  // ----------------------------------------------------------------------------
  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(successMsg);
  }

  function showToast(msg) {
    const toast = document.getElementById('toast-notice');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

})();
