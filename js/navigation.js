/* ============================================================
   js/navigation.js
   Navigation entre les pages HTML du portfolio.

   Ce portfolio est multi-fichiers (une page HTML par section).
   La fonction goTo() change simplement l'URL tout en
   préservant la langue mémorisée dans localStorage.
   ============================================================ */

/**
 * Redirige vers une autre page du portfolio.
 * La langue active est conservée via localStorage (lu par lang.js).
 * @param {string} page - Nom du fichier HTML (ex: 'projets.html')
 */
function goTo(page) {
  window.location.href = page;
}

// Exposer globalement pour les onclick HTML
window.goTo = window.goTo || goTo;
