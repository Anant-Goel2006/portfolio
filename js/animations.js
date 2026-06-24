/**
 * animations.js
 * Scroll animations, parallax particles, custom cursor, and UI effects.
 * Pure vanilla JavaScript — no dependencies.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ======================================================
     1. CUSTOM CURSOR (non-touch devices only)
     ====================================================== */
  const canHover = window.matchMedia('(hover: hover)').matches;

  if (canHover) {
    const dot     = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (dot && outline) {
      document.body.classList.add('custom-cursor-active');

      let mouseX = 0, mouseY = 0;   // true mouse position
      let outX   = 0, outY   = 0;   // eased outline position
      const EASE  = 0.15;            // lerp factor per frame

      // Track mouse position
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      });

      // Ease the outline toward the dot each frame
      const animateOutline = () => {
        outX += (mouseX - outX) * EASE;
        outY += (mouseY - outY) * EASE;
        outline.style.transform = `translate(${outX}px, ${outY}px)`;
        requestAnimationFrame(animateOutline);
      };
      requestAnimationFrame(animateOutline);

      // Click feedback — scale both elements
      document.addEventListener('mousedown', () => {
        dot.style.transform     = `translate(${mouseX}px, ${mouseY}px) scale(0.75)`;
        outline.style.transform = `translate(${outX}px, ${outY}px) scale(0.85)`;
      });
      document.addEventListener('mouseup', () => {
        dot.style.transform     = `translate(${mouseX}px, ${mouseY}px) scale(1)`;
        outline.style.transform = `translate(${outX}px, ${outY}px) scale(1)`;
      });

      // Enlarge outline on interactive elements
      const interactiveSelector = 'a, button, .project-card, .filter-btn';
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', () => {
          outline.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          outline.classList.remove('cursor-hover');
        });
      });
    }
  }

  /* ======================================================
     2. SCROLL REVEAL (Intersection Observer)
     ====================================================== */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        // Stagger children if data-stagger is present
        if (el.hasAttribute('data-stagger')) {
          const delay = parseInt(el.dataset.stagger, 10) || 100;
          Array.from(el.children).forEach((child, i) => {
            setTimeout(() => child.classList.add('active'), delay * i);
          });
        }

        el.classList.add('active');
        revealObserver.unobserve(el); // animate once
      });
    }, { threshold: 0.15 });

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ======================================================
     3. PARALLAX FLOATING PARTICLES (hero section)
     ====================================================== */
  const hero = document.getElementById('hero');

  if (hero) {
    const PARTICLE_COUNT = 50;
    const particles      = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');

      // Random size 2-4 px
      const size = Math.random() * 2 + 2;
      // Random opacity 0.1-0.4
      const alpha = (Math.random() * 0.3 + 0.1).toFixed(2);
      // Random speed factor for parallax (0.01 – 0.05)
      const speed = Math.random() * 0.04 + 0.01;
      // Float animation duration 15-30s
      const dur   = Math.random() * 15 + 15;
      // Random start delay so particles aren't synchronised
      const delay = Math.random() * dur;

      Object.assign(p.style, {
        position:           'absolute',
        width:              `${size}px`,
        height:             `${size}px`,
        borderRadius:       '50%',
        background:         `rgba(99, 102, 241, ${alpha})`,
        top:                `${Math.random() * 100}%`,
        left:               `${Math.random() * 100}%`,
        pointerEvents:      'none',
        animation:          `floatUp ${dur}s ${delay}s linear infinite`,
        willChange:         'transform',
      });

      hero.appendChild(p);
      particles.push({ el: p, speed });
    }

    // Inject the float-up keyframes once
    if (!document.getElementById('particle-keyframes')) {
      const style = document.createElement('style');
      style.id = 'particle-keyframes';
      style.textContent = `
        @keyframes floatUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-120vh); }
        }`;
      document.head.appendChild(style);
    }

    // Parallax shift on mouse move inside the hero
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx   = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 … 0.5
      const cy   = (e.clientY - rect.top)  / rect.height - 0.5;

      particles.forEach(({ el, speed }) => {
        const shiftX = cx * speed * 800;
        const shiftY = cy * speed * 800;
        el.style.marginLeft = `${shiftX}px`;
        el.style.marginTop  = `${shiftY}px`;
      });
    });

    // Reset when cursor leaves hero
    hero.addEventListener('mouseleave', () => {
      particles.forEach(({ el }) => {
        el.style.marginLeft = '0px';
        el.style.marginTop  = '0px';
      });
    });
  }

  /* ======================================================
     4. SMOOTH SCROLL for anchor links
     ====================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return; // skip bare hashes

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ======================================================
     5. NAVBAR SCROLL EFFECT
     ====================================================== */
  const nav = document.querySelector('nav.main-nav');

  if (nav) {
    const SCROLL_THRESHOLD = 50;

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state
  }

  /* ======================================================
     6. SKILL BAR ANIMATION (Intersection Observer)
     ====================================================== */
  const skillFills = document.querySelectorAll('.skill-fill');

  if (skillFills.length) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const bar   = entry.target;
        const width = bar.dataset.width; // e.g. "90%"

        if (width) {
          bar.style.width = width;
        }

        skillObserver.unobserve(bar);
      });
    }, { threshold: 0.15 });

    skillFills.forEach((bar) => {
      bar.style.width = '0%';           // start collapsed
      bar.style.transition = 'width 1s ease';
      skillObserver.observe(bar);
    });
  }

}); // end DOMContentLoaded
