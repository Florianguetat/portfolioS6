/* ============================================================
   js/skills.js
   Animation des barres de compétences.
   Chaque barre possède un attribut data-target (ex: "0.80")
   qui indique le niveau à atteindre (valeur entre 0 et 1).
   L'animation est déclenchée par navigation.js lorsque la
   page "Compétences" est affichée.
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

    // Ajouter la classe pour indiquer que l'animation est en cours
    bar.classList.add('animated');
  });
}

// Exposer pour navigation.js
window.animateSkills = animateSkills;
