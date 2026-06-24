/**
 * projects.js
 * Handles project filtering, 3D tilt card effects, and overlay interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Element References ── */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');

  /* ============================
   *  1. Project Filtering
   * ============================ */

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Toggle active class on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Track index of visible cards for staggered delay
      let visibleIndex = 0;

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const isMatch  = (filter === 'all' || filter === category);

        if (isMatch) {
          card.style.display = 'block';

          // Remove then re-add fade-in class to retrigger the animation
          card.classList.remove('fade-in');
          void card.offsetWidth; // force reflow
          card.classList.add('fade-in');

          // Staggered animation delay (60ms per card)
          card.style.animationDelay = `${visibleIndex * 0.06}s`;
          visibleIndex++;
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
          card.style.animationDelay = '0s';
        }
      });
    });
  });

  /* ============================
   *  2. 3D Tilt Effect
   * ============================ */

  const MAX_TILT = 10; // degrees

  projectCards.forEach(card => {
    // Smooth reset transition
    card.style.transition = 'transform 0.35s ease';

    /* — Mousemove: calculate tilt from cursor position — */
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cardW  = rect.width;
      const cardH  = rect.height;

      // Mouse position relative to card center (–0.5 … +0.5)
      const offsetX = (e.clientX - rect.left) / cardW - 0.5;
      const offsetY = (e.clientY - rect.top)  / cardH - 0.5;

      // Tilt values (inverted Y so card follows the cursor)
      const tiltX =  (offsetX * MAX_TILT * 2).toFixed(2);
      const tiltY = -(offsetY * MAX_TILT * 2).toFixed(2);

      // Remove transition during active movement for responsiveness
      card.style.transition = 'none';
      card.style.transform  =
        `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale(1.02)`;
    });

    /* — Mouseleave: reset tilt smoothly — */
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.35s ease';
      card.style.transform  =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  /* ============================
   *  3. Project Card Overlay
   * ============================ */

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('hovered');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('hovered');
    });
  });

  /* ── Initial state: activate the first filter button ── */
  const defaultBtn = document.querySelector('.filter-btn.active') ||
                     filterButtons[0];
  if (defaultBtn) {
    defaultBtn.click();
  }
});
