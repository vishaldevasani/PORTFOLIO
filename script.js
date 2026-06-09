// ── Scroll Reveal ───────────────────────────
const revealEls = document.querySelectorAll(
  '.about-grid, .project-card, .contact h2, .contact > p, .contact-grid, .skill-group, .skill-card, .edu-card, .exp-card, .cert-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach(el => observer.observe(el));

// ── Active Nav Link ──────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--ink)'
            : 'var(--muted)';
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => navObserver.observe(s));

// ── Smooth anchor scroll ─────────────────────
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Certificate Filter ───────────────────────
const filterBtns = document.querySelectorAll('.cert-filter');
const certCards  = document.querySelectorAll('.cert-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    certCards.forEach(card => {
      const match = filter === 'all' || card.dataset.company === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

// ── Hamburger Menu ───────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinksMenu = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksMenu.classList.remove('open');
  });
});