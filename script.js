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

// ---- Tile slider (Testimonial avatars only): auto-cycle, no UI chrome ----
// Avatars pull from a shared image pool and offset their starting frame so
// neighboring avatars don't all show the same photo at once.
async function initTileSliders(containerSelector, folderAttrSource) {
  const tiles = Array.from(document.querySelectorAll(containerSelector));
  if (!tiles.length) return;

  const folder = folderAttrSource || tiles[0].dataset.folder ||
    tiles[0].closest('[data-folder]')?.dataset.folder;
  if (!folder) return;

  const files = await loadManifest(folder);

  tiles.forEach((tile, tileIndex) => {
    if (!files.length) {
      tile.classList.add('tile-slider-empty');
      tile.innerHTML = `<span class="placeholder-label">Add photos to ${folder}/</span>`;
      return;
    }

    const imgs = files.map((f) => {
      const img = document.createElement('img');
      img.src = `${folder}/${f}`;
      img.alt = '';
      img.draggable = false;
      return img;
    });
    imgs.forEach((img) => tile.appendChild(img));

    let current = tileIndex % files.length;
    imgs[current].classList.add('active');

    if (files.length > 1) {
      setInterval(() => {
        imgs[current].classList.remove('active');
        current = (current + 1) % files.length;
        imgs[current].classList.add('active');
      }, AUTO_ADVANCE_MS + tileIndex * 350); // slight stagger per tile
    }
  });
}

document.querySelectorAll('[data-slider]').forEach(initFullSlider);
initPortfolioGrid();
initTileSliders('.t-avatar[data-tile-slider]');

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
  document.querySelectorAll('.service-card, .package-card, .testimonial-card')
);
