/* ============================================================
   js/skills.js
   Animation des barres de compétences.
   Chaque barre possède un attribut data-target (ex: "0.80")
   qui indique le niveau à atteindre (valeur entre 0 et 1).

   L'animation se déclenche automatiquement au chargement de
   la page si des éléments .skill-fill sont présents.
   Une logique IntersectionObserver est aussi utilisée pour
   relancer l'animation si l'utilisateur scrolle.
   ============================================================ */

/**
 * Anime toutes les barres de compétences présentes dans la page.
 * Utilise CSS transform: scaleX() pour un rendu fluide.
 */
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach((bar) => {

    // Récupérer la valeur cible depuis l'attribut HTML
    const target = parseFloat(bar.dataset.target) || 0;

    // Appliquer l'échelle (la transition CSS fait le reste)
    bar.style.transform = `scaleX(${target})`;

    // Ajouter la classe pour indiquer que l'animation est faite
    bar.classList.add('animated');
  });
}


/* ────────────────────────────────────────────────────────────
   Déclenchement automatique au chargement de la page

   On attend que le DOM soit prêt, puis on lance l'animation
   après un petit délai (350 ms) pour laisser le temps à la
   page d'apparaître (animation pageIn 0.38s).
   ──────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // S'il n'y a aucune barre sur cette page, on ne fait rien
  if (!document.querySelector('.skill-fill')) return;

  // Petit délai pour que l'animation d'entrée de page soit terminée
  setTimeout(animateSkills, 350);
});


// Exposer globalement (pour relance manuelle éventuelle)
window.animateSkills = animateSkills;
