/* ==========================================================================
   Mercedes Salon — Interaction Script
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------------------------------------------------
  // Language System
  // -------------------------------------------------------------------------
  let currentLang = localStorage.getItem("salon_lang") || "en";
  setLanguage(currentLang);

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      if (lang !== currentLang) { currentLang = lang; setLanguage(lang); }
    });
  });

  function setLanguage(lang) {
    localStorage.setItem("salon_lang", lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (!translations[lang] || !translations[lang][key]) return;
      const val = translations[lang][key];
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.setAttribute("placeholder", val);
      } else if (el.tagName === "OPTION") {
        el.textContent = val;
      } else {
        el.innerHTML = val;
      }
    });

    // Handle page title & meta description translation
    const titleEl = document.querySelector("title");
    if (titleEl) {
      const titleKey = titleEl.getAttribute("data-i18n");
      if (titleKey && translations[lang]?.[titleKey]) {
        document.title = translations[lang][titleKey];
      }
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const descKey = metaDesc.getAttribute("data-i18n");
      if (descKey && translations[lang]?.[descKey]) {
        metaDesc.setAttribute("content", translations[lang][descKey]);
      }
    }

    // Handle data-i18n-placeholder attributes (inputs/textareas)
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (translations[lang]?.[key]) el.setAttribute("placeholder", translations[lang][key]);
    });

    document.querySelectorAll(".lang-btn").forEach(btn => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }


  // -------------------------------------------------------------------------
  // Sticky Header
  // -------------------------------------------------------------------------
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  }, { passive: true });


  // -------------------------------------------------------------------------
  // Mobile Menu
  // -------------------------------------------------------------------------
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active", open);
      mobileToggle.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", e => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove("active");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active nav link on scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id], .contact[id], .booking[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }, { passive: true });


  // -------------------------------------------------------------------------
  // Service Strip — horizontal scroll nav
  // -------------------------------------------------------------------------
  const svcTrack = document.getElementById("svcTrack");
  const svcPrev  = document.getElementById("svcPrev");
  const svcNext  = document.getElementById("svcNext");

  if (svcTrack && svcPrev && svcNext) {
    const scrollAmt = () => svcTrack.querySelector(".svc-card")?.offsetWidth + 16 || 240;
    svcPrev.addEventListener("click", () => svcTrack.scrollBy({ left: -scrollAmt(), behavior: "smooth" }));
    svcNext.addEventListener("click", () => svcTrack.scrollBy({ left:  scrollAmt(), behavior: "smooth" }));
  }


  // -------------------------------------------------------------------------
  // Services Grid Filter
  // -------------------------------------------------------------------------
  const svcFilterBtns = document.querySelectorAll(".services-tabs .tab-btn");
  const svcCards      = document.querySelectorAll(".services-grid .service-card");

  svcFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      svcFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      svcCards.forEach(card => {
        const show = filter === "all" || card.getAttribute("data-category") === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });


  // -------------------------------------------------------------------------
  // About Slider
  // -------------------------------------------------------------------------
  const aboutSlider = document.querySelector(".about-gallery-slider");
  if (aboutSlider) {
    const container   = aboutSlider.querySelector(".slider-container");
    const slides      = aboutSlider.querySelectorAll(".slide");
    const prevBtn     = aboutSlider.querySelector(".slider-btn-prev");
    const nextBtn     = aboutSlider.querySelector(".slider-btn-next");
    const dotsWrap    = aboutSlider.querySelector(".slider-dots");
    let idx = 0, interval;

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `Slide ${i + 1}`);
      dot.addEventListener("click", () => go(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll(".slider-dot");

    function go(i) {
      idx = (i + slides.length) % slides.length;
      container.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, n) => d.classList.toggle("active", n === idx));
      reset();
    }

    function reset() {
      clearInterval(interval);
      interval = setInterval(() => go(idx + 1), 5000);
    }

    if (prevBtn) prevBtn.addEventListener("click", () => go(idx - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => go(idx + 1));
    reset();
  }


  // -------------------------------------------------------------------------
  // Gallery Filter + Lightbox (single-image masonry)
  // -------------------------------------------------------------------------
  const galleryFilterBtns = document.querySelectorAll(".gallery-filters .tab-btn");
  const galleryItems      = document.querySelectorAll(".gallery-item");
  const lightbox          = document.querySelector(".lightbox");
  const lightboxImg       = document.querySelector(".lightbox-single-img");
  const lightboxClose     = document.querySelector(".lightbox-close");
  const lightboxPrev      = document.querySelector(".lightbox-prev");
  const lightboxNext      = document.querySelector(".lightbox-next");

  let activeItems = Array.from(galleryItems);
  let lbIdx = 0;

  // Filter
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      galleryFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      activeItems = [];
      galleryItems.forEach(item => {
        const show = filter === "all" || item.getAttribute("data-category") === filter;
        item.style.display = show ? "block" : "none";
        if (show) activeItems.push(item);
      });
    });
  });

  // Open lightbox
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const visIdx = activeItems.indexOf(item);
      lbIdx = visIdx >= 0 ? visIdx : 0;
      openLB();
    });
  });

  function openLB() {
    if (!activeItems.length || !lightboxImg) return;
    const img = activeItems[lbIdx].querySelector("img");
    if (img) lightboxImg.src = img.src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLB() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function navLB(dir) {
    lbIdx = (lbIdx + dir + activeItems.length) % activeItems.length;
    openLB();
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLB);
  if (lightboxPrev)  lightboxPrev.addEventListener("click", () => navLB(-1));
  if (lightboxNext)  lightboxNext.addEventListener("click", () => navLB(1));
  if (lightbox) {
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLB(); });
  }

  document.addEventListener("keydown", e => {
    if (!lightbox?.classList.contains("active")) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft")  navLB(-1);
    if (e.key === "ArrowRight") navLB(1);
  });


  // -------------------------------------------------------------------------
  // Reviews Carousel
  // -------------------------------------------------------------------------
  const reviewsCarousel = document.querySelector(".reviews-carousel");
  if (reviewsCarousel) {
    const rContainer = reviewsCarousel.querySelector(".reviews-container");
    const rSlides    = reviewsCarousel.querySelectorAll(".review-slide");
    const rNavDots   = document.querySelectorAll(".reviews-dot");
    let rIdx = 0, rInterval;

    function goReview(i) {
      rIdx = (i + rSlides.length) % rSlides.length;
      rContainer.style.transform = `translateX(-${rIdx * 100}%)`;
      rNavDots.forEach((d, n) => d.classList.toggle("active", n === rIdx));
    }

    rNavDots.forEach(dot => {
      dot.addEventListener("click", () => goReview(Number(dot.getAttribute("data-idx"))));
    });

    function startR() { rInterval = setInterval(() => goReview(rIdx + 1), 6500); }
    function stopR()  { clearInterval(rInterval); }

    reviewsCarousel.addEventListener("mouseenter", stopR);
    reviewsCarousel.addEventListener("mouseleave", startR);

    // Touch swipe
    let tx = 0;
    reviewsCarousel.addEventListener("touchstart", e => { tx = e.changedTouches[0].screenX; }, { passive: true });
    reviewsCarousel.addEventListener("touchend",   e => {
      const dx = e.changedTouches[0].screenX - tx;
      if (Math.abs(dx) > 50) goReview(rIdx + (dx < 0 ? 1 : -1));
    }, { passive: true });

    startR();
  }


  // -------------------------------------------------------------------------
  // Booking Form
  // -------------------------------------------------------------------------
  const bookingForm   = document.getElementById("salon-booking-form");
  const successModal  = document.getElementById("booking-success-modal");
  const successClose  = document.getElementById("success-modal-close");
  const successWABtn  = document.getElementById("success-whatsapp-btn");

  if (bookingForm) {
    bookingForm.addEventListener("submit", e => {
      e.preventDefault();

      const name    = document.getElementById("book-name").value.trim();
      const phone   = document.getElementById("book-phone").value.trim();
      const email   = document.getElementById("book-email").value.trim();
      const sel     = document.getElementById("book-service");
      const service = sel.options[sel.selectedIndex]?.text || "";
      const date    = document.getElementById("book-date").value;
      const time    = document.getElementById("book-time").value;
      const notes   = document.getElementById("book-message").value.trim();

      if (!name || !phone || !email || !sel.value || !date || !time) {
        alert(currentLang === "es"
          ? "Por favor complete todos los campos obligatorios."
          : "Please fill out all required fields.");
        return;
      }

      // Success message
      const tpl = translations[currentLang]?.["modal_success_text"];
      if (tpl) {
        document.getElementById("modal-success-description").textContent = tpl
          .replace("{name}", name).replace("{service}", service)
          .replace("{date}", date).replace("{time}", time);
      }

      // WhatsApp link
      const waText = currentLang === "es"
        ? `Hola Mercedes Salon, quisiera confirmar una cita:\n\n- Nombre: ${name}\n- Teléfono: ${phone}\n- Email: ${email}\n- Servicio: ${service}\n- Fecha: ${date}\n- Hora: ${time}${notes ? `\n- Notas: ${notes}` : ""}`
        : `Hi Mercedes Salon, I'd like to book an appointment:\n\n- Name: ${name}\n- Phone: ${phone}\n- Email: ${email}\n- Service: ${service}\n- Date: ${date}\n- Time: ${time}${notes ? `\n- Notes: ${notes}` : ""}`;

      successWABtn.href = `https://wa.me/12814224231?text=${encodeURIComponent(waText)}`;
      successWABtn.target = "_blank";

      successModal.classList.add("active");
      document.body.style.overflow = "hidden";
      bookingForm.reset();
    });
  }

  if (successClose) {
    successClose.addEventListener("click", () => {
      successModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (successModal) {
    successModal.addEventListener("click", e => {
      if (e.target === successModal) {
        successModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }


  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // Before/After Slider
  // -------------------------------------------------------------------------
  const baSlider = document.querySelector(".ba-slider");
  if (baSlider) {
    const resizeDiv = baSlider.querySelector(".ba-resize");
    const rangeInput = baSlider.querySelector(".ba-range");
    const handle = baSlider.querySelector(".ba-handle");

    if (resizeDiv && rangeInput && handle) {
      rangeInput.addEventListener("input", (e) => {
        const sliderValue = e.target.value;
        resizeDiv.style.width = `${sliderValue}%`;
        handle.style.left = `${sliderValue}%`;
      });
    }
  }

  // -------------------------------------------------------------------------
  // FAQ Accordion
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        faqItems.forEach(i => {
          i.classList.remove("active");
          i.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("active");
          questionBtn.setAttribute("aria-expanded", "true");
        }
      });
    }
  });

  // -------------------------------------------------------------------------
  // Scroll Reveal (Intersection Observer)
  // -------------------------------------------------------------------------
  const revealItems = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("visible"));
  }

});
