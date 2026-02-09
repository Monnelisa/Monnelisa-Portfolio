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
