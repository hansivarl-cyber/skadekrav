/* ===========================
   SKADEKRAV.NO — script.js
   =========================== */

// ── Side-navigasjon ──────────────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ── Scroll til seksjon ───────────────────────────────────────────
function scrollTo(id) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

// ── Hamburgermeny ────────────────────────────────────────────────
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-menu');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', false);
    });
  });
}

// ── Skjema: vis notat for små skader ────────────────────────────
const damageSize = document.getElementById('damageSize');
const smallNote = document.getElementById('small-claim-note');
const priorityField = document.getElementById('priorityLevel');
if (damageSize) {
  damageSize.addEventListener('change', () => {
    const val = damageSize.value;
    const isSmall = val === '0 til 70 000';
    if (smallNote) smallNote.hidden = !isSmall;
    if (priorityField) priorityField.value = isSmall ? 'Lav' : 'Normal';
  });
}

// ── CTA A/B-test ─────────────────────────────────────────────────
(function() {
  const KEY = 'cta_variant';
  const VARIANTS = ['Sjekk saken gratis', 'Få gratis vurdering nå'];
  let v = localStorage.getItem(KEY);
  if (!v) { v = Math.random() < 0.5 ? VARIANTS[0] : VARIANTS[1]; localStorage.setItem(KEY, v); }
  document.querySelectorAll('.js-cta-primary').forEach(el => { el.textContent = v; });
})();

// ── Progressiv skjemaflyt ─────────────────────────────────────────
(function() {
  const TOTAL = 8;
  let step = 1;
  const form    = document.getElementById('claim-form');
  const prevBtn = document.getElementById('form-prev');
  const nextBtn = document.getElementById('form-next');
  const subBtn  = document.getElementById('form-submit');
  const bar     = document.getElementById('form-progress-bar');
  const counter = document.getElementById('form-step-counter');
  if (!form) return;

  function getStep(n) { return form.querySelector('.form-step[data-step="' + n + '"]'); }

  function render() {
    form.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    const s = getStep(step);
    if (s) s.classList.add('active');
    if (bar)     bar.style.width = ((step / TOTAL) * 100) + '%';
    if (counter) counter.textContent = 'Steg ' + step + ' av ' + TOTAL;
    if (prevBtn) prevBtn.hidden = step === 1;
    if (nextBtn) nextBtn.hidden = step === TOTAL;
    if (subBtn)  subBtn.hidden  = step !== TOTAL;
  }

  function validate() {
    const s = getStep(step);
    if (!s) return true;
    let ok = true;
    s.querySelectorAll('input[required],select[required],textarea[required]').forEach(el => {
      if (!el.checkValidity()) { el.reportValidity(); ok = false; }
    });
    return ok;
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { if (validate() && step < TOTAL) { step++; render(); } });
  if (prevBtn) prevBtn.addEventListener('click', () => { if (step > 1) { step--; render(); } });
  render();
})();

// ── Skjema: bekreftelse ved innsending ───────────────────────────
const claimForm = document.getElementById('claim-form');
if (claimForm) {
  claimForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = claimForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sender…';
    btn.disabled = true;

    try {
      const data = new FormData(claimForm);
      const res = await fetch(claimForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        claimForm.innerHTML = `
          <div style="text-align:center;padding:2rem 0;">
            <p style="font-size:2rem;margin-bottom:.5rem;">✅</p>
            <h3 style="margin-top:0;">Takk! Vi har mottatt saken din.</h3>
            <p>Vi vurderer normalt innen 48 timer og tar kontakt på telefon eller e-post.</p>
          </div>`;
      } else {
        throw new Error('Nettverksfeil');
      }
    } catch {
      btn.textContent = 'Send saken';
      btn.disabled = false;
      alert('Noe gikk galt. Prøv igjen eller send e-post til post@skadekrav.no');
    }
  });
}
