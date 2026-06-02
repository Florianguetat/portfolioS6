/* ============================================================
   js/main.js
   - Curseur personnalisé (uniquement sur appareils à pointeur fin)
   - Ticker défilant (page accueil)
   - Effet de survol sur les éléments interactifs
   ============================================================ */

/* Échappement HTML (cohérent avec lang.js) */
function escapeHtmlMain(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ────────────────────────────────────────────────────────────
   CURSEUR PERSONNALISÉ
   Activé seulement si :
   - l'appareil a un pointeur fin (souris) et gère le survol, ET
   - l'utilisateur n'a pas demandé à réduire les animations.
   Sinon, on ne touche à rien : le curseur natif reste visible.
   La classe .js-cursor (ajoutée ici) déclenche le masquage du
   curseur natif côté CSS — donc si ce script ne s'exécute pas,
   le curseur natif est toujours présent.
   ──────────────────────────────────────────────────────────── */
(function initCursor() {
  const finePointer  = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cursorDot  = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-trail');

  if (!finePointer || reduceMotion || !cursorDot || !cursorRing) return;

  document.documentElement.classList.add('js-cursor');

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverTargets = 'button, a, .card, .proj-card, .divers-card, ' +
                       '.quality-card, .soft-card, .tl-card, .xp-card, .lang-btn';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();


/* ────────────────────────────────────────────────────────────
   TICKER DÉFILANT (page accueil)
   Les éléments sont doublés pour créer une boucle infinie.
   ──────────────────────────────────────────────────────────── */
function buildTicker(items) {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  const doubled = [...items, ...items];
  track.innerHTML = doubled
    .map(t => `<span class="ticker-item"><span class="dot">◆</span>${escapeHtmlMain(t)}</span>`)
    .join('');
}

// Contenu par défaut — remplacé par lang.js si une traduction est active
const defaultTickerItems = [
  '🌐 Réseaux & Télécoms',
  '💻 Python · Bash · JavaScript',
  '🔐 Cybersécurité',
  '🖥️ Admin Linux',
  '⚽ Football · Arbitre',
  '⛷️ Ski · VTT',
  '📚 Zola · Hugo · Verne',
  '📡 VoIP · Téléphonie IP',
  '🏫 IUT Clermont-Ferrand',
  '💼 NTN Europe · Annecy',
];

buildTicker(defaultTickerItems);

window.buildTicker = buildTicker;
