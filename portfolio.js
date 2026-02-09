// Smooth scroll for nav links
document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const startSkillsCarousel = () => {
  const carousel = document.querySelector('.skills-carousel');
  if (!carousel) {
    return;
  }

  const viewport = carousel.querySelector('.skills-viewport');
  const track = carousel.querySelector('.skills-track');
  const cards = track ? Array.from(track.children) : [];
  if (!viewport || !track || cards.length === 0) {
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const leftBtn = carousel.querySelector('.carousel-arrow.left');
  const rightBtn = carousel.querySelector('.carousel-arrow.right');

  const getStep = () => {
    const firstCard = cards[0];
    if (!firstCard) {
      return 0;
    }
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return firstCard.getBoundingClientRect().width + gap;
  };

  let stepSize = 0;
  let index = 0;

  const syncStep = () => {
    stepSize = getStep();
  };

  const scrollToIndex = nextIndex => {
    if (!stepSize) {
      syncStep();
    }
    if (!stepSize) {
      return;
    }
    index = (nextIndex + cards.length) % cards.length;
    viewport.scrollTo({ left: index * stepSize, behavior: 'smooth' });
  };

  const next = () => {
    if (!stepSize) {
      syncStep();
    }
    if (!stepSize) {
      return;
    }
    const maxScroll = track.scrollWidth - viewport.clientWidth;
    if (viewport.scrollLeft + stepSize >= maxScroll - 1) {
      index = 0;
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    index += 1;
    viewport.scrollBy({ left: stepSize, behavior: 'smooth' });
  };

  const prev = () => {
    if (!stepSize) {
      syncStep();
    }
    if (!stepSize) {
      return;
    }
    if (viewport.scrollLeft - stepSize <= 0) {
      index = 0;
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    index = Math.max(0, index - 1);
    viewport.scrollBy({ left: -stepSize, behavior: 'smooth' });
  };

  leftBtn?.addEventListener('click', prev);
  rightBtn?.addEventListener('click', next);

  let timer;
  const start = () => {
    if (prefersReduced) {
      return;
    }
    timer = setInterval(next, 2400);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
    }
  };

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);

  viewport.addEventListener('scroll', () => {
    if (!stepSize) {
      syncStep();
    }
    if (!stepSize) {
      return;
    }
    const newIndex = Math.round(viewport.scrollLeft / stepSize);
    index = Math.max(0, Math.min(cards.length - 1, newIndex));
  });

  window.addEventListener('resize', () => {
    syncStep();
    viewport.scrollTo({ left: index * stepSize, behavior: 'auto' });
  });

  requestAnimationFrame(() => {
    syncStep();
    start();
  });
};

window.addEventListener('load', startSkillsCarousel);
window.addEventListener('DOMContentLoaded', startSkillsCarousel);
