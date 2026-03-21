/* ============================================================
   js/lang.js
   Moteur de traduction dynamique.

   Fonctionnement :
   1. L'utilisateur clique sur un bouton de langue (setLang).
   2. Le fichier JSON correspondant est chargé depuis lang/.
   3. Chaque élément [data-key] reçoit la valeur traduite.
   4. La langue est mémorisée dans localStorage.

   Pour ajouter une langue :
   - Créer lang/xx.json avec toutes les clés traduites.
   - Ajouter un bouton .lang-btn dans la sidebar.
   ============================================================ */

/* Langue par défaut au premier chargement */
let currentLang = localStorage.getItem('portfolio-lang') || 'fr';

/* Cache en mémoire pour éviter de recharger un JSON déjà lu */
const langCache = {};

/* ────────────────────────────────────────────────────────────
   setLang(code)
   Charge la langue demandée et applique les traductions.
   @param {string} code - Code ISO de la langue (fr, en, es…)
   ──────────────────────────────────────────────────────────── */
async function setLang(code) {

  // Mise à jour visuelle immédiate des boutons de langue
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active-lang'));
  document.querySelectorAll(`.lang-btn[onclick="setLang('${code}')"]`)
          .forEach(b => b.classList.add('active-lang'));

  // Afficher la barre de progression
  showProgress(30);

  try {
    // Charger le JSON (depuis le cache ou le réseau)
    const data = await loadLang(code);
    showProgress(70);

    // Appliquer les traductions dans le DOM
    applyTranslations(data);
    showProgress(100);

    // Mémoriser la langue choisie
    currentLang = code;
    localStorage.setItem('portfolio-lang', code);

    // Reconstruire le ticker avec les éléments traduits
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
   @param {string} code
   @returns {Promise<Object>} Les paires clé/valeur de traduction.
   ──────────────────────────────────────────────────────────── */
async function loadLang(code) {
  if (langCache[code]) return langCache[code];

  const response = await fetch(`../lang/${code}.json`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  langCache[code] = data;
  return data;
}

/* ────────────────────────────────────────────────────────────
   applyTranslations(data)
   Parcourt tous les éléments [data-key] et remplace
   leur textContent par la valeur traduite.
   @param {Object} data - Dictionnaire { clé: "traduction" }
   ──────────────────────────────────────────────────────────── */
function applyTranslations(data) {
  document.querySelectorAll('[data-key]').forEach((el) => {
    const key = el.dataset.key;
    if (data[key] !== undefined) {
      el.textContent = data[key];
    }
  });
}

/* ────────────────────────────────────────────────────────────
   showProgress(pct)
   Anime la barre de progression en haut de l'écran.
   @param {number} pct - Pourcentage (0–100)
   ──────────────────────────────────────────────────────────── */
function showProgress(pct) {
  const bar = document.getElementById('translate-progress');
  if (bar) bar.style.width = pct + '%';
}

/* ────────────────────────────────────────────────────────────
   Initialisation au chargement de la page
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Appliquer la langue sauvegardée (ou 'fr' par défaut)
  setLang(currentLang);

  // Marquer le bouton actif correspondant à la langue sauvegardée
  document.querySelectorAll(`.lang-btn[onclick="setLang('${currentLang}')"]`)
          .forEach(b => b.classList.add('active-lang'));
});

// Exposer pour les onclick HTML
window.setLang = setLang;
window.currentLang = currentLang;
