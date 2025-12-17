// main.js (combined logic: preloader, curtain + reveal, plus your utilities)

(function () {
  /* ---------------------------
     PRELOADER
     --------------------------- */
  const body = document.body;
  const preloader = document.getElementById('preloader');
  const video = document.getElementById('preloader-video');
  const FALLBACK_TIMEOUT = 9500;

  function finishPreloader() {
    body.classList.remove('preloading');
    body.classList.add('preloader-hidden'); // fades out preloader
    setTimeout(() => {
      body.classList.add('loaded');
      // remove DOM node after fade
      setTimeout(() => {
        if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 700);
      // After preloader is finished, kick off curtain reveal
      runIntro();
    }, 60);
  }

  if (!video) {
    setTimeout(finishPreloader, 350);
  } else {
    let fallbackTimer = setTimeout(() => finishPreloader(), FALLBACK_TIMEOUT);

    const tryPlay = () => {
      const playPromise = video.play && video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // wait for ended event
        }).catch((err) => {
          console.warn('Preloader video playback prevented:', err);
          clearTimeout(fallbackTimer);
          setTimeout(finishPreloader, 600);
        });
      }
    };

    video.addEventListener('ended', () => {
      clearTimeout(fallbackTimer);
      finishPreloader();
    });

    video.addEventListener('canplaythrough', () => tryPlay(), { once: true });

    setTimeout(() => tryPlay(), 300);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        clearTimeout(fallbackTimer);
        finishPreloader();
      }
    });

    preloader.addEventListener('click', () => {
      clearTimeout(fallbackTimer);
      finishPreloader();
    });
  }






  /* ---------------------------
   TYPEWRITER TEXT
--------------------------- */
const textEl = document.getElementById('preloader-text');
const text = 'Loading out of the BOX.....';
let index = 0;

function typeText() {
  if (!textEl) return;

  if (index <= text.length) {
    textEl.textContent = text.slice(0, index++);
    setTimeout(typeText, 90);
  }
}

typeText();










const menuBtn = document.getElementById("menuBtn");
const dropdownMenu = document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("open");
});

/* Close menu when clicking a link */
document.querySelectorAll(".dropdown-menu a").forEach(link => {
  link.addEventListener("click", () => {
    dropdownMenu.classList.remove("open");
  });
});

/* Close menu when clicking outside */
document.addEventListener("click", (e) => {
  if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove("open");
  }
});







  /* ---------------------------
     CURTAIN + STAGGERED REVEAL
     --------------------------- */
  const curtain = document.getElementById('page-curtain');
  const revealGroups = document.querySelectorAll('.reveal-group');
  const heroReveal = document.querySelector('.hero') || null;

  const ITEM_INITIAL_DELAY = 120;
  const ITEM_STEP = 110;
  const MAX_STAGGER = 40;

  function staggerReveal(group, startDelay = ITEM_INITIAL_DELAY) {
    if (!group) return;
    const items = Array.from(group.querySelectorAll('.reveal-item')).slice(0, MAX_STAGGER);
    items.forEach((el, idx) => {
      const delay = startDelay + idx * ITEM_STEP;
      el.style.transitionDelay = `${delay}ms`;
    });
    group.classList.add('in-view');
  }

  // runIntro: hide curtain and reveal hero group(s)
  function runIntro() {
    // hide curtain
    if (curtain) {
      setTimeout(() => curtain.classList.add('hidden'), 60);
    }
    // reveal any top-level reveal groups (hero-like)
    revealGroups.forEach((g, gi) => {
      // if group is within hero region (top of page), reveal faster
      const parentSection = g.closest('section');
      const isHero = parentSection && parentSection.classList.contains('hero') || gi === 0;
      const delayBase = isHero ? 120 : 300;
      setTimeout(() => staggerReveal(g, delayBase), 80 + gi * 90);
    });
    // Also set document body.loaded which some CSS uses
    document.body.classList.add('loaded');
  }

  // Observe about section to reveal when scrolled into view
  if ('IntersectionObserver' in window) {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      const obs = new IntersectionObserver((entries, o) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const group = entry.target.classList.contains('reveal-group') ? entry.target : entry.target.querySelector('.reveal-group');
            if (group) staggerReveal(group, 140);
            o.unobserve(entry.target);
          }
        });
      }, { root: null, threshold: 0.12 });
      obs.observe(aboutEl);
    }
  } else {
    // if no IO support, reveal all
    revealGroups.forEach(g => staggerReveal(g, 120));
  }

  /* ---------------------------
     TOGGLE MENU (your function)
     --------------------------- */
  window.toggleMenu = function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu) menu.classList.toggle("open");
    if (icon) icon.classList.toggle("open");
  };

  /* ---------------------------
     TYPING (name)
     --------------------------- */
  (function typing() {
    const typingText = document.getElementById("typing-text");
    const text = "KARUN BINNY";
    let index = 0;
    function typeText() {
      if (!typingText) return;
      if (index < text.length) {
        typingText.innerHTML += text[index];
        index++;
        setTimeout(typeText, 150);
      } else {
        setTimeout(() => {
          typingText.innerHTML = "";
          index = 0;
          typeText();
        }, 1000);
      }
    }
    if (typingText) typeText();
  })();

  /* ---------------------------
     LOADING ANIMATION (fallback container)
     --------------------------- */
  document.addEventListener('DOMContentLoaded', function() {
    const loadingContainer = document.querySelector('.loading-container');
    if (!loadingContainer) return;
    setTimeout(() => {
      loadingContainer.style.display = 'none';
    }, 3500);
  });

  /* ---------------------------
     LOGOS SLIDE (clone)
     --------------------------- */
  (function cloneLogos() {
    const logosSlide = document.querySelector('.logos-slide');
    if (!logosSlide) return;
    try {
      const cloned = logosSlide.cloneNode(true);
      const container = document.querySelector('.logos');
      if (container) container.appendChild(cloned);
    } catch (e) {}
  })();

  /* ---------------------------
     CONTACT FORM validation
     --------------------------- */
  (function contactValidation(){
    const form = document.querySelector('.app-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const contact = form.querySelector('input[name="contact"]').value.trim();
      const message = form.querySelector('textarea[name="message"]').value.trim();
      if (!name || !email || !contact || !message) {
        alert('Please fill out all fields');
        e.preventDefault();
      }
    });
  })();

  /* ---------------------------
     BACK TO TOP BUTTON
     --------------------------- */
  (function backToTop() {
    const backToTopBtn = document.querySelector('.back2top');
    const footer = document.querySelector('footer');
    if (!backToTopBtn || !footer || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });
    }, { threshold: 0.2 });

    observer.observe(footer);

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  })();

})();


















const cards = document.querySelectorAll(".project-card");

function applyTiltOnMouseOver(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) * 0.08).toFixed(2);
  const rotateY = ((x - centerX) * -0.08).toFixed(2);

  card.style.transform = `
    perspective(1000px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;
}

function resetTilt(e) {
  e.currentTarget.style.transform =
    "perspective(1000px) rotateX(0deg) rotateY(0deg)";
}

cards.forEach(card => {
  card.addEventListener("mousemove", applyTiltOnMouseOver);
  card.addEventListener("mouseleave", resetTilt);
});


















