/**
 * سه چهار کله پوک - جاوااسکریپت اختصاصی
 * IntersectionObserver for Card Entrance Animations
 * Smooth Scroll & Fallback Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Entrance Animations
  const cards = document.querySelectorAll('.card');

  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach(card => {
      cardObserver.observe(card);
    });
  } else {
    cards.forEach(card => card.classList.add('show'));
  }

  // 2. Smooth Scroll for bouncing arrow
  const scrollArrow = document.getElementById('scroll-arrow');
  const cardsSection = document.getElementById('cards-section');

  if (scrollArrow && cardsSection) {
    scrollArrow.addEventListener('click', (e) => {
      e.preventDefault();
      cardsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  // 3. Fallback support for images if needed
  const cardImages = document.querySelectorAll('.card-img');
  cardImages.forEach(img => {
    const fallbacksAttr = img.getAttribute('data-fallbacks');
    if (!fallbacksAttr) return;

    const fallbackList = fallbacksAttr.split(',').map(s => s.trim()).filter(Boolean);
    let attemptIndex = 0;

    img.addEventListener('error', function onImgError() {
      if (attemptIndex < fallbackList.length) {
        const nextSrc = fallbackList[attemptIndex];
        attemptIndex++;
        this.src = nextSrc;
      }
    });
  });
});
