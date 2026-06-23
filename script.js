/* ============================================================
   SARANYA EVENTS & PHOTOGRAPHY — DESIGN TOKENS
   Palette: ink charcoal / warm ivory / antique gold / sindoor red
   Display: Fraunces (italic for emphasis, like invitation script)
   Body: Manrope
   Signature element: viewfinder corner brackets on hero + portfolio
   ============================================================ */

:root {
  /* Color */
  --ink: #1A1816;
  --ink-soft: #272421;
  --ivory: #F5EDE2;
  --ivory-deep: #EDE2D2;
  --gold: #C9A24B;
  --gold-bright: #DDBB6A;
  --sindoor: #E0381E;
  --sindoor-deep: #B82A14;
  --ember: #FF8A3D;
  --stone: #6B6258;
  --stone-light: #948B7E;
  --line: rgba(26, 22, 18, 0.12);
  --line-on-dark: rgba(245, 237, 226, 0.18);

  /* Type */
  --font-display: 'Fraunces', serif;
  --font-body: 'Manrope', sans-serif;

  /* Layout */
  --max-width: 1240px;
  --section-pad: clamp(4rem, 8vw, 7rem);
  --radius: 2px;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--ivory);
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
}

img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { margin: 0; padding: 0; }

::selection { background: var(--gold); color: var(--ink); }

.visually-hidden {
  position: absolute;
  top: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

/* Honeypot spam-trap field: hidden from sighted users and assistive tech.
   Real visitors never see or fill this in; bots that auto-fill every
   field will, which is how the form backend flags them as spam. */
.honeypot-field {
  position: absolute !important;
  left: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

:focus-visible {
  outline: 2px solid var(--sindoor);
  outline-offset: 3px;
}

/* Subtle film grain overlay for warmth */
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ============ PLACEHOLDER MEDIA ============ */
.placeholder-media {
  background: repeating-linear-gradient(
    135deg,
    var(--ivory-deep),
    var(--ivory-deep) 12px,
    #E2D5C0 12px,
    #E2D5C0 24px
  );
  border: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: var(--stone);
}
.placeholder-media::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--gold);
  opacity: 0.4;
  margin: 10px;
}
.placeholder-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
  padding: 0 1.5rem;
  color: var(--stone);
  background: rgba(245, 237, 226, 0.85);
  padding: 0.4rem 0.9rem;
}

/* ============ TYPE HELPERS ============ */
.section-eyebrow {
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--sindoor);
  font-weight: 700;
  margin: 0 0 0.9rem;
}
.section-title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.9rem, 3.6vw, 2.9rem);
  line-height: 1.15;
  margin: 0 0 1rem;
  letter-spacing: -0.01em;
}
.section-title em {
  font-style: italic;
  font-weight: 500;
  color: var(--sindoor);
}
.section-note {
  color: var(--stone);
  font-size: 0.95rem;
  max-width: 36em;
}
.section-head.center {
  text-align: center;
  max-width: 640px;
  margin: 0 auto clamp(2.5rem, 5vw, 4rem);
}
.section-head.center .section-note { margin: 0 auto; }
.section-head.light .section-eyebrow { color: var(--gold-bright); }
.section-head.light .section-title { color: var(--ivory); }
.section-head.light .section-title em { color: var(--gold-bright); }

/* ============ BUTTONS ============ */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.95rem 2rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border-radius: var(--radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.btn-primary {
  background: var(--sindoor);
  color: var(--ivory);
}
.btn-primary:hover { background: var(--sindoor-deep); transform: translateY(-2px); }

.btn-ghost {
  background: transparent;
  color: var(--ivory);
  border-color: var(--line-on-dark);
}
.btn-ghost:hover { border-color: var(--gold); color: var(--gold-bright); transform: translateY(-2px); }

.btn-outline-light {
  background: transparent;
  color: var(--ivory);
  border-color: var(--gold);
}
.btn-outline-light:hover { background: var(--gold); color: var(--ink); transform: translateY(-2px); }

.full-width { width: 100%; }

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--sindoor);
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  transition: gap 0.2s ease, color 0.2s ease;
}
.text-link:hover { gap: 0.7rem; color: var(--sindoor-deep); }

/* ============ HEADER ============ */
.site-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 500;
  background: rgba(26, 22, 18, 0.0);
  transition: background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease;
}
.site-header.scrolled {
  background: rgba(26, 22, 18, 0.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--line-on-dark);
}
.header-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.5rem;
}
.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.brand-mark-img {
  height: 40px;
  width: auto;
  border-radius: 3px;
  object-fit: cover;
}
.brand-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--ivory);
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.brand-sub {
  font-family: var(--font-body);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold-bright);
  font-weight: 600;
}
.main-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.main-nav a {
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  color: var(--ivory);
  opacity: 0.85;
  transition: opacity 0.2s ease;
  position: relative;
}
.main-nav a:not(.nav-cta):hover { opacity: 1; }
.main-nav a:not(.nav-cta)::after {
  content: '';
  position: absolute;
  left: 0; bottom: -6px;
  width: 0; height: 1px;
  background: var(--gold-bright);
  transition: width 0.25s ease;
}
.main-nav a:not(.nav-cta):hover::after { width: 100%; }
.nav-cta {
  border: 1px solid var(--gold);
  padding: 0.5rem 1.1rem;
  border-radius: var(--radius);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  opacity: 1 !important;
  transition: background 0.2s ease, color 0.2s ease;
}
.nav-cta:hover { background: var(--gold); color: var(--ink); }

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px; height: 38px;
  background: transparent;
  border: none;
  cursor: pointer;
}
.menu-toggle span {
  display: block;
  height: 2px;
  border-radius: 1px;
  background: var(--ivory);
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.mobile-nav {
  position: fixed;
  top: 0; right: 0;
  height: 100vh;
  width: min(78vw, 320px);
  background: var(--ink);
  z-index: 600;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 6rem 2rem 2rem;
  transform: translateX(100%);
  transition: transform 0.35s ease;
}
.mobile-nav.open { transform: translateX(0); }
.mobile-nav a {
  color: var(--ivory);
  font-family: var(--font-display);
  font-size: 1.2rem;
}
.mobile-nav .nav-cta {
  border: 1px solid var(--gold);
  padding: 0.8rem 1.2rem;
  text-align: center;
  border-radius: var(--radius);
  margin-top: 0.5rem;
}

/* ============ HERO ============ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--ink);
  overflow: hidden;
  padding: 0 1.5rem;
}
.hero-media {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: var(--ink-soft);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(180deg, rgba(26,22,18,0.55) 0%, rgba(26,22,18,0.85) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
  padding: 8rem 0 4rem;
}
.hero-eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold-bright);
  font-weight: 700;
  margin: 0 0 1.5rem;
  opacity: 0;
  animation: fadeUp 0.8s ease 0.1s forwards;
}
.hero-title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(2.6rem, 7vw, 5rem);
  line-height: 1.08;
  color: var(--ivory);
  margin: 0 0 1.5rem;
  letter-spacing: -0.01em;
  opacity: 0;
  animation: fadeUp 0.8s ease 0.25s forwards;
}
.hero-title em {
  font-style: italic;
  font-weight: 500;
  background: linear-gradient(135deg, var(--sindoor), var(--ember));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-sub {
  font-size: 1.05rem;
  color: var(--ivory);
  opacity: 0;
  max-width: 46em;
  margin: 0 auto 2.4rem;
  animation: fadeUp 0.8s ease 0.4s forwards;
}
.hero-sub { color: rgba(245,237,226,0.82); }
.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp 0.8s ease 0.55s forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Viewfinder corner brackets — signature element */
.hero-frame-corner {
  position: absolute;
  width: 42px; height: 42px;
  z-index: 3;
  border: 2px solid var(--gold-bright);
  opacity: 0.85;
}
.hero-frame-corner.tl { top: 28px; left: 28px; border-right: none; border-bottom: none; }
.hero-frame-corner.tr { top: 28px; right: 28px; border-left: none; border-bottom: none; }
.hero-frame-corner.bl { bottom: 28px; left: 28px; border-right: none; border-top: none; }
.hero-frame-corner.br { bottom: 28px; right: 28px; border-left: none; border-top: none; }

.hero-scroll-cue {
  position: absolute;
  bottom: 2.2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(245,237,226,0.6);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.scroll-line {
  width: 1px;
  height: 38px;
  background: linear-gradient(180deg, var(--gold-bright), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* ============ TRUST STRIP ============ */
.trust-strip {
  background: var(--ivory-deep);
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  padding: 1.1rem 0;
}
.trust-strip ul {
  display: flex;
  gap: 3rem;
  list-style: none;
  white-space: nowrap;
  animation: marquee 28s linear infinite;
  width: max-content;
}
.trust-strip li {
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--stone);
  display: flex;
  align-items: center;
  gap: 3rem;
}
.trust-strip li::after {
  content: '◆';
  color: var(--gold);
  font-size: 0.5rem;
  margin-left: 3rem;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ============ ABOUT ============ */
.about {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--section-pad) 1.5rem;
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}
.about-media {
  width: 100%;
}
.about-copy p {
  color: var(--stone);
  font-size: 1.02rem;
  max-width: 34em;
}
.about-copy .text-link { margin-top: 0.5rem; }

/* ============ SERVICES ============ */
.services {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--section-pad) 1.5rem;
}
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.service-card {
  background: var(--ivory);
  padding: 2.4rem 2rem;
  transition: background 0.3s ease;
}
.service-card:hover { background: var(--ivory-deep); }
.service-icon {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  filter: sepia(1) saturate(2) hue-rotate(-10deg);
}
.service-card h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  margin: 0 0 1rem;
  letter-spacing: -0.01em;
}
.service-card ul li {
  list-style: none;
  font-size: 0.88rem;
  color: var(--stone);
  padding: 0.35rem 0;
  border-top: 1px solid var(--line);
}
.service-card ul li:first-child { border-top: none; }

/* ============ PORTFOLIO ============ */
.portfolio {
  background: var(--ink);
  padding: var(--section-pad) 1.5rem;
}
.portfolio-grid {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 220px;
  gap: 0.6rem;
}
.portfolio-item {
  position: relative;
  cursor: pointer;
  margin: 0;
  background: var(--ink-soft);
  border: 1px solid var(--line-on-dark);
  overflow: hidden;
}
.portfolio-item.size-tall { grid-row: span 2; }
.portfolio-item.size-wide { grid-column: span 2; }

.portfolio-item::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid transparent;
  transition: border-color 0.25s ease, inset 0.25s ease;
  pointer-events: none;
}
.portfolio-item:hover::after {
  border-color: var(--gold-bright);
  inset: 10px;
}

.portfolio-cta { text-align: center; margin-top: 3rem; }

.portfolio-empty-note {
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
  color: var(--ivory);
  opacity: 0.65;
  font-size: 0.88rem;
}
.portfolio-empty-note code {
  background: rgba(245,237,226,0.1);
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
}

/* ============ PACKAGES ============ */
.packages {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--section-pad) 1.5rem;
}
.packages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
}
.package-card {
  border: 1px solid var(--line);
  padding: 2.2rem 1.6rem;
  position: relative;
  background: var(--ivory);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.package-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -16px rgba(26,22,18,0.18); }
.package-card.featured {
  background: var(--ink);
  color: var(--ivory);
  border-color: var(--gold);
}
.package-card.addon {
  background: transparent;
  border-style: dashed;
}
.package-card h3 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.2rem;
  margin: 0 0 0.6rem;
}
.package-badge {
  position: absolute;
  top: -12px;
  left: 1.6rem;
  background: var(--sindoor);
  color: var(--ivory);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.3rem 0.7rem;
  border-radius: 2px;
}
.price {
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  background: linear-gradient(135deg, var(--sindoor), var(--ember));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.package-card.featured .price {
  background: linear-gradient(135deg, var(--gold), var(--gold-bright));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.price span { font-size: 1rem; font-weight: 400; opacity: 0.7; }
.package-desc {
  font-size: 0.88rem;
  color: var(--stone);
  margin: 0 0 1.4rem;
  min-height: 2.6em;
}
.package-card.featured .package-desc { color: rgba(245,237,226,0.7); }
.package-link {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--sindoor);
}
.package-card.featured .package-link { color: var(--gold-bright); }

/* ============ CLIENT GALLERY ============ */
.gallery-section {
  background: var(--ivory-deep);
  padding: var(--section-pad) 1.5rem;
}
.gallery-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
}
.gallery-copy p { color: var(--stone); max-width: 32em; }
.gallery-features {
  margin: 1.5rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.gallery-features li {
  list-style: none;
  font-size: 0.92rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.gallery-features li::before {
  content: '';
  width: 7px; height: 7px;
  border: 1.5px solid var(--sindoor);
  border-radius: 50%;
  flex-shrink: 0;
}
.gallery-media {
  aspect-ratio: 9/7;
  border-radius: var(--radius);
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* ============ TESTIMONIALS ============ */
.testimonials {
  background: var(--ink);
  padding: var(--section-pad) 1.5rem;
}
.testimonial-carousel {
  position: relative;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 56px;
}
.testimonial-viewport {
  overflow: hidden;
}
.testimonial-track {
  display: flex;
  transition: transform 0.5s ease;
}
.testimonial-page {
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}
.testimonial-card {
  margin: 0;
  padding: 2.2rem;
  border: 1px solid var(--line-on-dark);
}
.testimonial-card blockquote {
  margin: 0 0 1.6rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  line-height: 1.5;
  color: var(--ivory);
}
.testimonial-card figcaption {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.testimonial-empty {
  margin: 0;
  font-family: var(--font-body);
  font-style: normal;
  font-size: 0.85rem;
  color: rgba(245,237,226,0.55);
  line-height: 1.5;
}
.testimonial-track > .testimonial-empty {
  text-align: center;
  padding: 2rem 1rem;
  width: 100%;
}
.testimonial-track > .testimonial-empty code {
  background: rgba(245,237,226,0.1);
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
}
.testimonial-carousel .slider-arrow {
  background: rgba(245, 237, 226, 0.08);
}
.testimonial-carousel .slider-arrow:hover {
  background: var(--sindoor);
}
.testimonial-carousel .slider-arrow.prev { left: 0; }
.testimonial-carousel .slider-arrow.next { right: 0; }
.testimonial-carousel .slider-dots {
  position: relative;
  bottom: 0;
  margin-top: 1.8rem;
}
.testimonial-carousel .slider-dot {
  border-color: var(--gold);
}
.testimonial-carousel .slider-dot.active {
  background: var(--gold-bright);
}
.t-avatar {
  position: relative;
  display: inline-block;
  width: 38px; height: 38px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid var(--gold);
  overflow: hidden;
  background: var(--ink-soft);
}
.t-name {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ivory);
}
.t-event {
  display: block;
  font-size: 0.76rem;
  color: var(--gold-bright);
}

/* ============ CONTACT ============ */
.contact {
  padding: var(--section-pad) 1.5rem;
}
.contact-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: clamp(2rem, 5vw, 5rem);
}
.contact-copy p { color: var(--stone); max-width: 30em; }
.contact-details {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--line);
}
.contact-row {
  display: flex;
  justify-content: space-between;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--line);
  font-size: 0.95rem;
}
.contact-label {
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--gold);
  font-weight: 700;
}

.contact-form {
  background: var(--ivory-deep);
  border: 1px solid var(--line);
  padding: clamp(1.6rem, 3vw, 2.4rem);
}
.form-row { margin-bottom: 1.2rem; }
.form-row.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.contact-form label {
  display: block;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--stone);
  margin-bottom: 0.5rem;
}
.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  font-family: var(--font-body);
  font-size: 0.95rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid var(--line);
  background: var(--ivory);
  color: var(--ink);
  border-radius: var(--radius);
  resize: vertical;
}
.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--sindoor);
}
.form-note {
  margin: 0.9rem 0 0;
  font-size: 0.85rem;
  color: var(--sindoor);
  min-height: 1.2em;
}

/* ============ FOOTER ============ */
.site-footer {
  background: var(--ink);
  border-top: 1px solid var(--line-on-dark);
  padding: 3rem 1.5rem 2rem;
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  text-align: center;
}
.footer-brand { display: flex; align-items: center; gap: 0.7rem; }
.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.6rem;
  justify-content: center;
}
.footer-nav a {
  font-size: 0.82rem;
  color: rgba(245,237,226,0.75);
}
.footer-nav a:hover { color: var(--gold-bright); }
.footer-copy {
  font-size: 0.78rem;
  color: rgba(245,237,226,0.45);
  margin: 0;
}

/* ============ SOCIAL LINKS ============ */
.social-row {
  display: flex;
  gap: 0.9rem;
}
.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: 1px solid var(--line-on-dark);
  color: var(--ivory);
  transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
}
.social-icon svg {
  width: 18px; height: 18px;
}
.social-icon:hover {
  border-color: var(--gold);
  color: var(--gold-bright);
  transform: translateY(-2px);
}

/* ============ FLOATING SOCIAL BUTTONS ============ */
.floating-social {
  position: fixed;
  bottom: 22px;
  right: 22px;
  z-index: 700;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}
.float-btn {
  width: 56px; height: 56px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px -6px rgba(0,0,0,0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.float-btn svg {
  width: 28px; height: 28px;
}
.float-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 10px 28px -4px rgba(0,0,0,0.5);
}
.float-whatsapp {
  background: #25D366;
}
.float-instagram {
  background: radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
}
@media (max-width: 600px) {
  .floating-social {
    bottom: 14px;
    right: 12px;
    gap: 8px;
  }
  .float-btn {
    width: 44px; height: 44px;
  }
  .float-btn svg { width: 21px; height: 21px; }
}

/* ============ SLIDERS ============ */

/* Full slider (About section) */
.slider {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
  border-radius: var(--radius);
  background: var(--ink-soft);
}
.slider-track {
  display: flex;
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease;
}
.slider-track .slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.slider-empty {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
  color: var(--stone-light);
  font-size: 0.85rem;
  background: repeating-linear-gradient(135deg, var(--ivory-deep), var(--ivory-deep) 12px, #E2D5C0 12px, #E2D5C0 24px);
}
.slider-empty code {
  background: rgba(0,0,0,0.06);
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
}
.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(26, 22, 18, 0.55);
  color: var(--ivory);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}
.slider-arrow:hover { background: var(--sindoor); }
.slider-arrow.prev { left: 12px; }
.slider-arrow.next { right: 12px; }
.slider-dots {
  position: absolute;
  bottom: 14px;
  left: 0; right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
.slider-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  border: 1px solid var(--ivory);
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease;
}
.slider-dot.active { background: var(--ivory); }

/* Tile slider (Portfolio + Testimonial avatars): stacked crossfade */
.portfolio-item img,
.t-avatar img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.portfolio-item img.active,
.t-avatar img.active {
  opacity: 1;
}
.portfolio-item:hover img.active { transform: scale(1.05); transition: opacity 0.8s ease, transform 0.4s ease; }
.tile-slider-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-linear-gradient(135deg, var(--ivory-deep), var(--ivory-deep) 12px, #E2D5C0 12px, #E2D5C0 24px);
}
.tile-slider-empty .placeholder-label {
  font-size: 0.7rem;
  background: rgba(245,237,226,0.85);
  padding: 0.4rem 0.7rem;
}
@media (max-width: 980px) {
  .main-nav { display: none; }
  .menu-toggle { display: flex; }
  .about,
  .gallery-inner,
  .contact-inner { grid-template-columns: 1fr; }
  .about-media { order: -1; aspect-ratio: 16/10; }
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .packages-grid { grid-template-columns: repeat(2, 1fr); }
  .portfolio-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
  .portfolio-item.size-wide { grid-column: span 2; }
}

@media (max-width: 760px) {
  .testimonial-page { grid-template-columns: 1fr; }
  .testimonial-carousel { padding: 0 44px; }
}

@media (max-width: 600px) {
  .services-grid { grid-template-columns: 1fr; }
  .packages-grid { grid-template-columns: 1fr; }
  .form-row.two-col { grid-template-columns: 1fr; }
  .hero-content { padding: 7rem 0 3rem; }
  .hero-frame-corner { width: 26px; height: 26px; }
  .portfolio-grid { grid-template-columns: 1fr; }
  .portfolio-item.size-wide, .portfolio-item.size-tall { grid-column: span 1; grid-row: span 1; }
  .testimonial-carousel { padding: 0 8px; }
  .testimonial-carousel .slider-arrow {
    width: 32px; height: 32px;
    font-size: 0.7rem;
  }
}

.menu-toggle.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.menu-toggle.open span:nth-child(2) { opacity: 0; }
.menu-toggle.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
