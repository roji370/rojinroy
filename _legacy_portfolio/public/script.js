document.addEventListener("DOMContentLoaded", () => {
  // --- TYPEWRITER EFFECT ---
  const typewriter = document.getElementById("typewriter");
  const words = [
    "Mobile Applications.",
    "Modern Web Experiences.",
    "Cross-Platform Apps.",
    "Custom Developer Solutions."
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      // Erase character
      typewriter.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50; // Erase faster
    } else {
      // Type character
      typewriter.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 120; // Normal typing speed
    }

    // Determine states
    if (!isDeleting && charIdx === currentWord.length) {
      // Pause at the end of word
      isDeleting = true;
      typingSpeed = 2000; 
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typewriter) {
    typeEffect();
  }

  // --- FLOATING HEADER / NAVBAR SCROLL ---
  const header = document.getElementById("header");
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- RESPONSIVE MOBILE NAVIGATION DRAWER ---
  const hamburgerBtn = document.getElementById("hamburger-toggle-btn");
  const navLinksMenu = document.getElementById("nav-links-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  function toggleMobileMenu() {
    hamburgerBtn.classList.toggle("active");
    navLinksMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMobileMenu);
  }

  // Close mobile drawer when clicking a link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinksMenu.classList.contains("active")) {
        toggleMobileMenu();
      }
    });
  });

  // --- INTERACTIVE ACTIVE SECTION INDICATORS ON SCROLL ---
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -55% 0px", // Focus middle of view
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // --- SKILLS TAB FILTERING ---
  const tabButtons = document.querySelectorAll(".tab-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active states
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "flex";
          // Quick fade-in animation
          card.style.opacity = "0";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 50);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- SCROLL TO TOP FLOATING BUTTON ---
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
