gsap.registerPlugin(ScrollTrigger);

/* =========================
   EDUCATION HEADING REVEAL
========================= */

gsap.fromTo(
  ".section-heading",
  {
    opacity: 0,
    y: 30,
    rotate: 3,
    transformOrigin: "0% 50%"
  },
  {
    opacity: 1,
    y: 0,
    rotate: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".education-section",
      start: "top 80%",
      end: "top 40%",
      scrub: true
    }
  }
);

/* =========================
   EDUCATION CARDS REVEAL
========================= */

gsap.fromTo(
  ".event-cards .card",
  {
    opacity: 0,
    y: 60
  },
  {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".event-cards",
      start: "top 60%",
      end: "top 30%",
      scrub: true
    }
  }
);