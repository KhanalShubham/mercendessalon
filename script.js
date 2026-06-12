/* ==========================================================================
   Mercedes Salon - Premium Front-End Interaction Script
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --- Initialize Language System ---
  let currentLang = localStorage.getItem("salon_lang") || "en";
  setLanguage(currentLang);

  // Language buttons click handlers
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang");
      if (selectedLang !== currentLang) {
        currentLang = selectedLang;
        setLanguage(currentLang);
      }
    });
  });

  function setLanguage(lang) {
    localStorage.setItem("salon_lang", lang);
    document.documentElement.lang = lang;

    // Standard elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        // Handle input placeholders
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.setAttribute("placeholder", translations[lang][key]);
        } else if (el.tagName === "OPTION") {
          el.textContent = translations[lang][key];
        } else {
          el.innerHTML = translations[lang][key];
        }
      }
    });

    // Update dynamically populated localized content if necessary
    updateDynamicTranslations(lang);

    // Toggle active class on language toggle buttons
    document.querySelectorAll(".lang-btn").forEach(btn => {
      if (btn.getAttribute("data-lang") === lang) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      }
    });
  }

  function updateDynamicTranslations(lang) {
    // If there are elements populated dynamically, translate them here
    // e.g., validation messages or service select categories
  }

  // --- Floating Header & Scroll Effects ---
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isActive = navMenu.classList.toggle("active");
      mobileToggle.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    // Close menu when clicking nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  // --- About Section Interior Slider ---
  const aboutSlider = document.querySelector(".about-gallery-slider");
  if (aboutSlider) {
    const container = aboutSlider.querySelector(".slider-container");
    const slides = aboutSlider.querySelectorAll(".slide");
    const prevBtn = aboutSlider.querySelector(".slider-btn-prev");
    const nextBtn = aboutSlider.querySelector(".slider-btn-next");
    const dotsContainer = aboutSlider.querySelector(".slider-dots");
    
    let currentIndex = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.classList.add("slider-dot");
      if (index === 0) dot.classList.add("active");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".slider-dot");

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex >= slides.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = slides.length - 1;
      
      container.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      dots.forEach((dot, dIdx) => {
        dot.classList.toggle("active", dIdx === currentIndex);
      });
      
      resetInterval();
    }

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    }

    if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));
    
    resetInterval();
  }


  // --- Services Section Tab Filtering ---
  const serviceTabs = document.querySelectorAll(".tab-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  serviceTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      serviceTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-tab");
      
      serviceCards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });


  // --- Before & After Lightbox Gallery ---
  const galleryFilterBtns = document.querySelectorAll(".gallery-filters .tab-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  const lightboxTitle = document.querySelector(".lightbox-title");
  
  let currentGalleryIndex = 0;
  let activeGalleryItems = Array.from(galleryItems);

  // Gallery item filter functionality
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      galleryFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      activeGalleryItems = [];

      galleryItems.forEach(item => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "block";
          activeGalleryItems.push(item);
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Open Lightbox
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentGalleryIndex = activeGalleryItems.indexOf(item);
      if (currentGalleryIndex === -1) currentGalleryIndex = 0;
      openLightbox();
    });
  });

  function openLightbox() {
    if (activeGalleryItems.length === 0) return;
    const item = activeGalleryItems[currentGalleryIndex];
    const beforeImgSrc = item.getAttribute("data-before");
    const afterImgSrc = item.getAttribute("data-after");
    
    // Set standard titles based on active language
    const enTitle = item.querySelector("h4").textContent;
    lightboxTitle.textContent = enTitle;

    document.getElementById("lightbox-before-img").src = beforeImgSrc;
    document.getElementById("lightbox-after-img").src = afterImgSrc;

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  
  // Close lightbox clicking outside the images
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox-content")) {
        closeLightbox();
      }
    });
  }

  // Navigate lightbox
  function navigateLightbox(direction) {
    currentGalleryIndex += direction;
    if (currentGalleryIndex >= activeGalleryItems.length) currentGalleryIndex = 0;
    if (currentGalleryIndex < 0) currentGalleryIndex = activeGalleryItems.length - 1;
    openLightbox();
  }

  if (lightboxPrev) lightboxPrev.addEventListener("click", () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => navigateLightbox(1));

  // Keyboard navigation support
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    }
  });


  // --- Customer Reviews Testimonials Slider ---
  const reviewsCarousel = document.querySelector(".reviews-carousel");
  if (reviewsCarousel) {
    const rContainer = reviewsCarousel.querySelector(".reviews-container");
    const rSlides = reviewsCarousel.querySelectorAll(".review-slide");
    
    let rIndex = 0;
    let rInterval;

    function goToReview(idx) {
      rIndex = idx;
      if (rIndex >= rSlides.length) rIndex = 0;
      if (rIndex < 0) rIndex = rSlides.length - 1;
      
      rContainer.style.transform = `translateX(-${rIndex * 100}%)`;
    }

    function startReviewInterval() {
      rInterval = setInterval(() => {
        goToReview(rIndex + 1);
      }, 7000);
    }

    reviewsCarousel.addEventListener("mouseenter", () => clearInterval(rInterval));
    reviewsCarousel.addEventListener("mouseleave", startReviewInterval);

    // Simple touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    reviewsCarousel.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    reviewsCarousel.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        goToReview(rIndex + 1); // Swipe left, next
      }
      if (touchEndX > touchStartX + 50) {
        goToReview(rIndex - 1); // Swipe right, prev
      }
    }

    startReviewInterval();
  }


  // --- Premium Booking Form & WhatsApp Redirection ---
  const bookingForm = document.getElementById("salon-booking-form");
  const successModal = document.getElementById("booking-success-modal");
  const successClose = document.getElementById("success-modal-close");
  const successWhatsAppBtn = document.getElementById("success-whatsapp-btn");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simple Validation
      const name = document.getElementById("book-name").value.trim();
      const phone = document.getElementById("book-phone").value.trim();
      const email = document.getElementById("book-email").value.trim();
      const serviceSelect = document.getElementById("book-service");
      const service = serviceSelect.options[serviceSelect.selectedIndex].text;
      const date = document.getElementById("book-date").value;
      const time = document.getElementById("book-time").value;
      const message = document.getElementById("book-message").value.trim();

      if (!name || !phone || !email || serviceSelect.value === "" || !date || !time) {
        alert(currentLang === "en" ? "Please fill out all required fields." : "Por favor complete todos los campos obligatorios.");
        return;
      }

      // Format localized success text
      const template = translations[currentLang]["modal_success_text"];
      let successMsg = template
        .replace("{name}", name)
        .replace("{service}", service)
        .replace("{date}", date)
        .replace("{time}", time);

      document.getElementById("modal-success-description").textContent = successMsg;

      // WhatsApp booking URL formulation
      // Mercedes Salon Business WhatsApp: +1 281-422-4231
      const waPhoneNumber = "12814224231"; 
      let waText = "";
      if (currentLang === "en") {
        waText = `Hi Mercedes Salon, I would like to request an appointment:\n\n- Name: ${name}\n- Phone: ${phone}\n- Email: ${email}\n- Service: ${service}\n- Date: ${date}\n- Time: ${time}`;
        if (message) waText += `\n- Notes: ${message}`;
      } else {
        waText = `Hola Mercedes Salon, me gustaría solicitar una cita:\n\n- Nombre: ${name}\n- Teléfono: ${phone}\n- Correo: ${email}\n- Servicio: ${service}\n- Fecha: ${date}\n- Hora: ${time}`;
        if (message) waText += `\n- Notas: ${message}`;
      }
      
      const encodedWaText = encodeURIComponent(waText);
      const waLink = `https://wa.me/${waPhoneNumber}?text=${encodedWaText}`;

      // Bind WhatsApp button redirect
      successWhatsAppBtn.href = waLink;
      successWhatsAppBtn.target = "_blank";

      // Show custom popup modal
      successModal.classList.add("active");
      document.body.style.overflow = "hidden";

      // Reset form
      bookingForm.reset();
    });
  }

  if (successClose) {
    successClose.addEventListener("click", () => {
      successModal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) {
        successModal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }


  // --- Reveal Animations on Scroll (Intersection Observer) ---
  const revealItems = document.querySelectorAll(".reveal-on-scroll");
  
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    revealItems.forEach(item => {
      observer.observe(item);
    });
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealItems.forEach(item => {
      item.classList.add("visible");
    });
  }
});
