/* ============================================================
   js/main.js
   Point d'entrée principal :
   - Curseur personnalisé animé
   - Ticker défilant (page accueil)
   - Hover sur les éléments interactifs
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   CURSEUR PERSONNALISÉ
   Deux éléments : un point rapide (#cursor) et
   un anneau qui suit avec un léger retard (#cursor-trail).
   ──────────────────────────────────────────────────────────── */

const cursorDot   = document.getElementById('cursor');
const cursorRing  = document.getElementById('cursor-trail');

// Position cible (position réelle de la souris)
let mouseX = 0, mouseY = 0;
// Position actuelle de l'anneau (lissée)
let ringX  = 0, ringY  = 0;

// Mise à jour de la position du point dès le mouvement de souris
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Le point suit instantanément
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// L'anneau suit avec un facteur d'inertie (lerp)
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';

  requestAnimationFrame(animateRing);
})();

// Agrandissement du curseur sur les éléments cliquables
const hoverTargets = 'button, a, .card, .proj-card, .divers-card, ' +
                     '.quality-card, .soft-card, .tl-card, .xp-card, .lang-btn';

document.querySelectorAll(hoverTargets).forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


/* ────────────────────────────────────────────────────────────
   TICKER DÉFILANT (page accueil)
   Les éléments sont doublés pour créer une boucle infinie.
   ──────────────────────────────────────────────────────────── */

/**
 * Construit le ticker avec les éléments passés en paramètre.
 * @param {string[]} items - Tableau de textes à afficher.
 */
function buildTicker(items) {
  const track = document.getElementById('ticker-track');
  if (!track) return;

  // On double les éléments pour que la boucle CSS soit invisible
  const doubled = [...items, ...items];

  track.innerHTML = doubled
    .map(t => `<span class="ticker-item"><span class="dot">◆</span>${t}</span>`)
    .join('');
}

// Contenu du ticker — mis à jour par lang.js si traduction active
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

// Exposer pour que lang.js puisse reconstruire le ticker traduit
window.buildTicker = buildTicker;
