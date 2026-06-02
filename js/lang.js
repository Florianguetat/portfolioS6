/* ============================================================
   js/lang.js
   Moteur de traduction dynamique.

   Fonctionnement :
   1. Au chargement, applique la langue sauvegardée dans localStorage.
   2. Quand setLang(code) est appelé (depuis options.js), charge le
      fichier JSON correspondant et remplace les textes [data-key].
   3. Pas de rechargement de page : tout se fait en place.

   Format des fichiers JSON :
   {
     "ma-cle": "Ma traduction",
     "ticker-items": ["item1", "item2", ...]
   }
   ============================================================ */

/* Langue par défaut au premier chargement */
let currentLang = localStorage.getItem('portfolio-lang') || 'fr';

/* Cache en mémoire pour éviter de recharger un JSON déjà lu */
const langCache = {};

/* ────────────────────────────────────────────────────────────
   LANGUES DISPONIBLES (barre de drapeaux en haut à droite)
   ──────────────────────────────────────────────────────────── */
const LANGS = [
  { code: 'fr', flag: '🇫🇷', name: 'Français'  },
  { code: 'en', flag: '🇬🇧', name: 'English'   },
  { code: 'es', flag: '🇪🇸', name: 'Español'   },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch'   },
  { code: 'it', flag: '🇮🇹', name: 'Italiano'  },
  { code: 'pt', flag: '🇵🇹', name: 'Português' },
];


/* ────────────────────────────────────────────────────────────
   setLang(code)
   Charge la langue demandée et applique les traductions.
   Pas de rechargement : tout se fait en place dans la page.
   @param {string} code - Code ISO (fr, en, es, de, it, pt)
   ──────────────────────────────────────────────────────────── */
async function setLang(code) {

  // Mise à jour de l'attribut lang sur <html> (a11y)
  document.documentElement.setAttribute('lang', code);

  // Afficher la barre de progression
  showProgress(30);

  try {
    // Charger le JSON (depuis le cache ou le réseau)
    const data = await loadLang(code);
    showProgress(70);

    // Appliquer les traductions
    applyTranslations(data);
    showProgress(100);

    // Mémoriser la langue choisie
    currentLang = code;
    window.currentLang = code;
    localStorage.setItem('portfolio-lang', code);
    markActiveLangBar(code);

    // Reconstruire le ticker traduit s'il existe
    if (data['ticker-items'] && window.buildTicker) {
      window.buildTicker(data['ticker-items']);
    }

    // Masquer la barre de progression après un court délai
    setTimeout(() => showProgress(0), 400);

  } catch (err) {
    console.error('[lang.js] Erreur chargement langue :', err);
    showProgress(0);
  }
}


/* ────────────────────────────────────────────────────────────
   loadLang(code)
   Récupère le fichier JSON depuis lang/{code}.json.
   Met le résultat en cache pour les appels suivants.
   ──────────────────────────────────────────────────────────── */
async function loadLang(code) {
  if (langCache[code]) return langCache[code];

  // Détermine le chemin selon qu'on est à la racine ou dans /pages/
  const inPages = window.location.pathname.includes('/pages/');
  const langPath = inPages ? `../lang/${code}.json` : `lang/${code}.json`;

  const response = await fetch(langPath);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  langCache[code] = data;
  return data;
}


/* ────────────────────────────────────────────────────────────
   applyTranslations(data)
   Parcourt tous les éléments [data-key] et remplace
   leur textContent par la valeur traduite.
   Gère les \n en convertissant en <br>.
   ──────────────────────────────────────────────────────────── */
function applyTranslations(data) {
  document.querySelectorAll('[data-key]').forEach((el) => {
    const key = el.dataset.key;
    if (data[key] === undefined) return;

    const value = data[key];

    // Si la traduction contient des \n, on utilise innerHTML avec <br>
    // (sécurisé : on échappe les caractères HTML d'abord)
    if (typeof value === 'string' && value.includes('\n')) {
      el.innerHTML = escapeHtml(value).replace(/\n/g, '<br>');
    } else {
      el.textContent = value;
    }
  });

  // Traduction des attributs aria-label (éléments [data-key-aria])
  document.querySelectorAll('[data-key-aria]').forEach((el) => {
    const k = el.dataset.keyAria;
    if (data[k] !== undefined) el.setAttribute('aria-label', data[k]);
  });

  // Exposer les traductions courantes (utilisées par contact.js)
  window.I18N = data;
}


/* ────────────────────────────────────────────────────────────
   escapeHtml(str)
   Échappe les caractères HTML pour éviter les injections XSS.
   ──────────────────────────────────────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


/* ────────────────────────────────────────────────────────────
   showProgress(pct)
   Anime la barre de progression en haut de l'écran.
   ──────────────────────────────────────────────────────────── */
function showProgress(pct) {
  const bar = document.getElementById('translate-progress');
  if (bar) bar.style.width = pct + '%';
}


/* ────────────────────────────────────────────────────────────
   injectLangBar()
   Crée la barre de sélection de langue (drapeaux) en haut à droite.
   Injectée une seule fois au chargement (évite de répéter le HTML
   dans les 9 pages).
   ──────────────────────────────────────────────────────────── */
function injectLangBar() {
  if (document.getElementById('lang-bar')) return;

  const bar = document.createElement('nav');
  bar.id = 'lang-bar';
  bar.setAttribute('aria-label', 'Choix de la langue');
  bar.innerHTML = LANGS.map(l => `
    <button type="button" class="lang-flag" data-lang="${l.code}" title="${l.name}" aria-label="${l.name}">
      <span aria-hidden="true">${l.flag}</span>
    </button>`).join('');
  document.body.appendChild(bar);

  bar.querySelectorAll('.lang-flag').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.setLang) window.setLang(btn.dataset.lang);
    });
  });

  markActiveLangBar(currentLang);
}

/* Met en évidence le drapeau de la langue active. */
function markActiveLangBar(code) {
  document.querySelectorAll('#lang-bar .lang-flag').forEach((b) => {
    const active = b.dataset.lang === code;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}


/* ────────────────────────────────────────────────────────────
   Initialisation au chargement de la page

   On injecte la barre de langues, puis on applique la langue
   sauvegardée. Une seconde passe (après un court délai) traduit le
   menu Options injecté par options.js.
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectLangBar();
  setLang(currentLang);

  // Re-traduction après l'injection du menu options
  setTimeout(() => setLang(currentLang), 50);
});


// Exposer pour les autres scripts et les onclick
window.setLang     = setLang;
window.currentLang = currentLang;
window.applyTranslations = applyTranslations;
