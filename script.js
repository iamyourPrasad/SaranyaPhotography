// ===== Header scroll state =====
const header = document.querySelector('.site-header');
function onScroll() {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Mobile nav toggle =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobileNav');

function closeMobileNav() {
  mobileNav.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', closeMobileNav);
});

// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Booking form (FormSubmit — see https://formsubmit.co) =====
// Submissions POST to the form's `action` URL (set in index.html).
// On the very first submission to a new email address, FormSubmit sends
// a one-time confirmation link to that inbox — it must be clicked once
// before mail starts delivering for real.
const bookingForm = document.getElementById('bookingForm');
const formNote = document.getElementById('formNote');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    const name = bookingForm.name.value.trim();
    const phone = bookingForm.phone.value.trim();

    if (!name || !phone) {
      e.preventDefault();
      formNote.textContent = 'Please fill in your name and phone number.';
      return;
    }

    formNote.textContent = 'Sending your enquiry...';
    // No preventDefault here — the form submits to FormSubmit for real.
  });
}

// Show a success note if we've just come back from a FormSubmit redirect
if (window.location.search.includes('sent=1') || window.location.hash.includes('sent=1')) {
  if (formNote) {
    formNote.textContent = "Thanks! We've received your enquiry and will reach out shortly.";
  }
}

// ===== Image Sliders =====
// Each slider folder needs a manifest.json listing its filenames, e.g.:
//   ["photo-1.jpg", "photo-2.jpg", "photo-3.jpg"]
// Drop images into the matching assets/<Folder>/ directory and list them
// in that folder's manifest.json — sliders pick everything up automatically.

const AUTO_ADVANCE_MS = 4500;

async function loadManifest(folder) {
  try {
    const res = await fetch(`${folder}/manifest.json`, { cache: 'no-store' });
    if (!res.ok) return [];
    const list = await res.json();
    return Array.isArray(list) ? list.filter(Boolean) : [];
  } catch {
    return [];
  }
}

// ---- Full slider (About section): track + arrows + dots ----
async function initFullSlider(el) {
  const folder = el.dataset.folder;
  const files = await loadManifest(folder);
  const track = el.querySelector('.slider-track');
  const dotsWrap = el.querySelector('.slider-dots');
  const prevBtn = el.querySelector('.slider-arrow.prev');
  const nextBtn = el.querySelector('.slider-arrow.next');

  if (!files.length) {
    track.innerHTML = `<div class="slider-empty">Add photos to <code>${folder}/</code> and list them in <code>manifest.json</code></div>`;
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }

  let index = 0;
  let timer = null;

  track.innerHTML = files
    .map((f, i) => `<img src="${folder}/${f}" alt="" class="slide" draggable="false" data-i="${i}">`)
    .join('');
  dotsWrap.innerHTML = files
    .map((_, i) => `<button class="slider-dot" aria-label="Go to photo ${i + 1}" data-i="${i}"></button>`)
    .join('');

  const dots = Array.from(dotsWrap.querySelectorAll('.slider-dot'));

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function go(i) {
    index = (i + files.length) % files.length;
    render();
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  function startAuto() {
    if (files.length < 2) return;
    stopAuto();
    timer = setInterval(next, AUTO_ADVANCE_MS);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  nextBtn.addEventListener('click', () => { next(); startAuto(); });
  prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  dots.forEach((d) => d.addEventListener('click', () => { go(Number(d.dataset.i)); startAuto(); }));

  if (files.length < 2) {
    dotsWrap.style.display = 'none';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  el.addEventListener('mouseenter', stopAuto);
  el.addEventListener('mouseleave', startAuto);

  render();
  startAuto();
}

// ---- Portfolio grid: one tile per image in the manifest (no fixed count) ----
async function initPortfolioGrid() {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;
  const folder = grid.dataset.folder;
  const files = await loadManifest(folder);
  const emptyNote = document.getElementById('portfolioEmptyNote');

  if (!files.length) {
    if (emptyNote) emptyNote.hidden = false;
    return;
  }

  // Repeating size pattern for visual rhythm: tall, wide, square, square
  const sizePattern = ['size-tall', 'size-wide', '', ''];

  grid.innerHTML = files
    .map((file, i) => {
      const sizeClass = sizePattern[i % sizePattern.length];
      return `<figure class="portfolio-item ${sizeClass}"><img src="${folder}/${file}" alt="" draggable="false" class="active"></figure>`;
    })
    .join('');

  applyRevealAnimation(grid.querySelectorAll('.portfolio-item'));
}

// ---- Testimonial cards: built entirely from assets/Testimonials/<client>/data.json ----
// Each client folder is self-contained: one data.json holds the quote, name,
// event label, and the list of photo filenames (manifest) for that person.
// Example assets/Testimonials/client-1/data.json:
//   {
//     "quote": "They captured emotions we didn't even know were happening.",
//     "name": "Priya & Arjun",
//     "event": "Wedding, Hyderabad",
//     "photos": ["priya.jpg"]
//   }
// Drop the photo(s) into that same folder and list the filenames in "photos".
async function loadClientData(folder) {
  try {
    const res = await fetch(`${folder}/data.json`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data && typeof data === 'object' ? data : null;
  } catch {
    return null;
  }
}

// Builds one testimonial <figure> card from a client's data.json.
async function buildTestimonialCard(baseFolder, client, staggerIndex) {
  const folder = `${baseFolder}/${client}`;
  const data = await loadClientData(folder);

  const card = document.createElement('figure');
  card.className = 'testimonial-card';

  if (!data) {
    card.innerHTML = `<blockquote class="testimonial-empty">Add ${folder}/data.json with quote, name, event and photos to fill this card.</blockquote>`;
    return card;
  }

  const quote = data.quote || '';
  const name = data.name || 'Client Name';
  const event = data.event || '';
  const photos = Array.isArray(data.photos) ? data.photos.filter(Boolean) : [];

  card.innerHTML = `
    <blockquote></blockquote>
    <figcaption>
      <span class="t-avatar"></span>
      <span>
        <span class="t-name"></span>
        <span class="t-event"></span>
      </span>
    </figcaption>
  `;
  // Set all text via textContent (not innerHTML interpolation) so any
  // characters typed in data.json can't break or inject into markup.
  card.querySelector('blockquote').textContent = `"${quote}"`;
  card.querySelector('.t-name').textContent = name;
  card.querySelector('.t-event').textContent = event;

  const avatar = card.querySelector('.t-avatar');
  if (!photos.length) {
    avatar.classList.add('tile-slider-empty');
    avatar.innerHTML = `<span class="placeholder-label">Add photo</span>`;
  } else {
    const imgs = photos.map((f) => {
      const img = document.createElement('img');
      img.src = `${folder}/${f}`;
      img.alt = '';
      img.draggable = false;
      return img;
    });
    imgs.forEach((img) => avatar.appendChild(img));
    let current = 0;
    imgs[current].classList.add('active');
    if (photos.length > 1) {
      setInterval(() => {
        imgs[current].classList.remove('active');
        current = (current + 1) % photos.length;
        imgs[current].classList.add('active');
      }, AUTO_ADVANCE_MS + staggerIndex * 350);
    }
  }

  return card;
}

// ---- Testimonials carousel: pages of 3 cards, swipe + arrows + dots ----
// Client list lives in assets/Testimonials/clients-index.json, e.g.:
//   ["client-1", "client-2", "client-3", "client-4"]
// Create a new assets/Testimonials/client-N/ folder with its own data.json,
// then add "client-N" to that list — it's picked up automatically and
// grouped into pages of 3 (1 per page on narrow screens).
async function initTestimonials() {
  const carousel = document.getElementById('testimonialsCarousel');
  if (!carousel) return;

  const baseFolder = carousel.dataset.folder;
  if (!baseFolder) return;

  const viewport = carousel.querySelector('.testimonial-viewport');
  const track = carousel.querySelector('.testimonial-track');
  const dotsWrap = carousel.querySelector('.slider-dots');
  const prevBtn = carousel.querySelector('.slider-arrow.prev');
  const nextBtn = carousel.querySelector('.slider-arrow.next');

  let clients = [];
  try {
    const res = await fetch(`${baseFolder}/clients-index.json`, { cache: 'no-store' });
    if (res.ok) {
      const list = await res.json();
      clients = Array.isArray(list) ? list.filter(Boolean) : [];
    }
  } catch {
    clients = [];
  }

  if (!clients.length) {
    track.innerHTML = `<p class="testimonial-empty">Add client folders and list them in <code>${baseFolder}/clients-index.json</code> to show testimonials here.</p>`;
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    return;
  }

  const cards = await Promise.all(
    clients.map((client, i) => buildTestimonialCard(baseFolder, client, i))
  );

  function cardsPerPage() {
    return window.innerWidth <= 760 ? 1 : 3;
  }

  let perPage = cardsPerPage();
  let pageCount = Math.ceil(cards.length / perPage);
  let index = 0;
  let timer = null;

  function buildPages() {
    track.innerHTML = '';
    perPage = cardsPerPage();
    pageCount = Math.ceil(cards.length / perPage);
    if (index > pageCount - 1) index = pageCount - 1;

    for (let p = 0; p < pageCount; p++) {
      const page = document.createElement('div');
      page.className = 'testimonial-page';
      cards.slice(p * perPage, p * perPage + perPage).forEach((card) => page.appendChild(card));
      track.appendChild(page);
    }

    dotsWrap.innerHTML = pageCount > 1
      ? Array.from({ length: pageCount }, (_, i) =>
          `<button class="slider-dot" aria-label="Go to testimonials page ${i + 1}" data-i="${i}"></button>`
        ).join('')
      : '';

    const showControls = pageCount > 1;
    prevBtn.style.display = showControls ? '' : 'none';
    nextBtn.style.display = showControls ? '' : 'none';

    render();
    applyRevealAnimation(track.querySelectorAll('.testimonial-card'));
  }

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    Array.from(dotsWrap.querySelectorAll('.slider-dot')).forEach((d, i) =>
      d.classList.toggle('active', i === index)
    );
  }

  function go(i) {
    if (pageCount < 1) return;
    index = (i + pageCount) % pageCount;
    render();
  }
  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  function startAuto() {
    if (pageCount < 2) return;
    stopAuto();
    timer = setInterval(next, AUTO_ADVANCE_MS + 1500);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  nextBtn.addEventListener('click', () => { next(); startAuto(); });
  prevBtn.addEventListener('click', () => { prev(); startAuto(); });
  dotsWrap.addEventListener('click', (e) => {
    const dot = e.target.closest('.slider-dot');
    if (!dot) return;
    go(Number(dot.dataset.i));
    startAuto();
  });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Touch swipe support
  let touchStartX = null;
  viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });
  viewport.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    touchStartX = null;
    startAuto();
  }, { passive: true });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (cardsPerPage() !== perPage) buildPages();
    }, 200);
  });

  buildPages();
  startAuto();
}

document.querySelectorAll('[data-slider]').forEach(initFullSlider);
initPortfolioGrid();
initTestimonials();

// ===== Scroll-reveal (shared helper) =====
let revealObserver = null;
function applyRevealAnimation(elements) {
  if (!('IntersectionObserver' in window)) return;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  }
  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
}

applyRevealAnimation(
  document.querySelectorAll('.service-card, .package-card')
);
