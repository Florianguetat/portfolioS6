/* ============================================================
   js/options.js
   Gestion du menu Options : ouverture/fermeture du panneau,
   sélection de la langue, sélection du thème.

   Le menu est injecté automatiquement dans chaque page au
   chargement par injectOptionsMenu(). Cela évite de répéter
   le HTML dans les 9 fichiers de pages.
   ============================================================ */


/* ────────────────────────────────────────────────────────────
   THÈMES DISPONIBLES
   id      : valeur de l'attribut data-theme sur <html>
   label   : texte affiché (sera traduit via data-key)
   key     : clé de traduction
   ──────────────────────────────────────────────────────────── */
const THEMES = [
  { id: 'dark',     key: 'theme-dark',     label: 'Sombre' },
  { id: 'light',    key: 'theme-light',    label: 'Clair'  },
  { id: 'dark-cb',  key: 'theme-dark-cb',  label: 'Daltonien sombre' },
  { id: 'light-cb', key: 'theme-light-cb', label: 'Daltonien clair'  },
];


/* Les langues sont désormais gérées par js/lang.js (barre de drapeaux
   en haut à droite). Le menu Options ne contient plus que les thèmes. */


/* ────────────────────────────────────────────────────────────
   injectOptionsMenu()
   Injecte le bouton ⚙ dans la sidebar et le panneau dans <body>.
   Appelé une seule fois au chargement de chaque page.
   ──────────────────────────────────────────────────────────── */
function injectOptionsMenu() {

  // 1. Trouver l'emplacement du bouton dans la sidebar
  //    On l'insère juste avant la zone des langues (qu'on supprime ensuite)
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // Supprimer l'ancienne zone des langues si elle existe
  const oldLangArea = sidebar.querySelector('.lang-area');
  if (oldLangArea) oldLangArea.remove();

  // 2. Créer le bouton Options dans la sidebar
  const optionsBtn = document.createElement('button');
  optionsBtn.className = 'options-btn';
  optionsBtn.id = 'optionsBtn';
  optionsBtn.title = 'Options';
  optionsBtn.setAttribute('aria-haspopup', 'dialog');
  optionsBtn.setAttribute('aria-expanded', 'false');
  optionsBtn.innerHTML = `
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
    <span class="nav-label" data-key="nav-options">options</span>
  `;

  // Insérer en bas (margin-top: auto fait que ça colle au bas)
  optionsBtn.style.marginTop = 'auto';
  sidebar.appendChild(optionsBtn);

  // 3. Créer le backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'options-backdrop';
  backdrop.id = 'optionsBackdrop';
  document.body.appendChild(backdrop);

  // 4. Créer le panneau d'options
  const panel = document.createElement('div');
  panel.className = 'options-panel';
  panel.id = 'optionsPanel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Options');
  panel.setAttribute('data-key-aria', 'options-title');
  panel.innerHTML = buildPanelHTML();
  document.body.appendChild(panel);

  // 5. Brancher les événements
  optionsBtn.addEventListener('click', toggleOptions);
  backdrop.addEventListener('click', closeOptions);

  // Bouton de fermeture (×)
  const closeBtn = panel.querySelector('.options-close');
  if (closeBtn) closeBtn.addEventListener('click', closeOptions);

  // Boutons de thème
  panel.querySelectorAll('.theme-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      markActiveTheme(theme);
    });
  });

  // Fermeture avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOptions();
  });

  // 6. Marquer le thème actif au démarrage
  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  markActiveTheme(currentTheme);
}


/* ────────────────────────────────────────────────────────────
   buildPanelHTML()
   Construit le contenu HTML du panneau options.
   ──────────────────────────────────────────────────────────── */
function buildPanelHTML() {
  // Boutons de thème
  const themeButtons = THEMES.map(t => `
    <button class="theme-opt" data-theme="${t.id}">
      <span class="theme-swatch"></span>
      <span class="theme-opt-label" data-key="${t.key}">${t.label}</span>
    </button>
  `).join('');

  return `
    <div class="options-header">
      <span class="options-title" data-key="options-title">Options</span>
      <button class="options-close" type="button" aria-label="Fermer" data-key-aria="aria-close">×</button>
    </div>

    <!-- Section THÈME -->
    <div class="opt-section">
      <div class="opt-section-title">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <span data-key="options-theme">Thème</span>
      </div>
      <div class="theme-grid">${themeButtons}</div>
    </div>

    <div class="options-footer" data-key="options-footer">
      Vos préférences sont sauvegardées localement
    </div>
  `;
}


/* ────────────────────────────────────────────────────────────
   toggleOptions() — ouvre/ferme le panneau
   ──────────────────────────────────────────────────────────── */
function toggleOptions() {
  const panel = document.getElementById('optionsPanel');
  const isOpen = panel.classList.contains('is-open');
  if (isOpen) closeOptions();
  else openOptions();
}

let _optTrapHandler = null;

function openOptions() {
  const panel = document.getElementById('optionsPanel');
  const btn   = document.getElementById('optionsBtn');
  panel.classList.add('is-open');
  document.getElementById('optionsBackdrop').classList.add('is-visible');
  btn.classList.add('is-open');
  btn.setAttribute('aria-expanded', 'true');

  // Déplacer le focus dans la modale (bouton de fermeture)
  const closeBtn = panel.querySelector('.options-close');
  if (closeBtn) closeBtn.focus();

  // Piège de focus : Tab/Shift+Tab restent dans le panneau
  _optTrapHandler = function (e) {
    if (e.key !== 'Tab') return;
    const f = panel.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  };
  panel.addEventListener('keydown', _optTrapHandler);
}

function closeOptions() {
  const panel = document.getElementById('optionsPanel');
  if (!panel || !panel.classList.contains('is-open')) return;
  const btn = document.getElementById('optionsBtn');
  panel.classList.remove('is-open');
  document.getElementById('optionsBackdrop').classList.remove('is-visible');
  btn.classList.remove('is-open');
  btn.setAttribute('aria-expanded', 'false');

  if (_optTrapHandler) {
    panel.removeEventListener('keydown', _optTrapHandler);
    _optTrapHandler = null;
  }
  // Rendre le focus au bouton déclencheur
  btn.focus();
}


/* ────────────────────────────────────────────────────────────
   markActiveTheme
   Met à jour visuellement le thème actif.
   ──────────────────────────────────────────────────────────── */
function markActiveTheme(theme) {
  document.querySelectorAll('.theme-opt').forEach(b => {
    b.classList.toggle('is-active', b.dataset.theme === theme);
  });
}


/* ────────────────────────────────────────────────────────────
   applyTheme(theme)
   Applique un thème à <html> et le sauvegarde.
   @param {string} theme - 'dark', 'light', 'dark-cb', 'light-cb'
   ──────────────────────────────────────────────────────────── */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}


/* ────────────────────────────────────────────────────────────
   Initialisation au chargement
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Appliquer le thème sauvegardé AVANT d'injecter le menu
  // (évite le flash visuel)
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  injectOptionsMenu();
});

// Exposer pour réutilisation éventuelle
window.applyTheme   = applyTheme;
window.openOptions  = openOptions;
window.closeOptions = closeOptions;
