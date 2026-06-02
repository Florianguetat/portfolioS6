/* ============================================================
   js/skills.js
   Animation des barres de compétences.
   Chaque barre possède un attribut data-target (ex: "0.80")
   indiquant le niveau à atteindre (valeur entre 0 et 1).

   L'animation se déclenche lorsque la barre entre dans le
   viewport, grâce à un IntersectionObserver. Si l'utilisateur
   a demandé à réduire les animations (ou si l'API n'est pas
   disponible), les niveaux sont appliqués directement.
   ============================================================ */

/**
 * Applique le niveau à une barre (CSS transform: scaleX()).
 */
function fillBar(bar) {
  if (bar.classList.contains('animated')) return;
  const target = parseFloat(bar.dataset.target) || 0;
  bar.style.transform = `scaleX(${target})`;
  bar.classList.add('animated');
}

/**
 * Anime toutes les barres présentes (relance manuelle éventuelle).
 * @param {ParentNode} [scope=document]
 */
function animateSkills(scope) {
  (scope || document).querySelectorAll('.skill-fill').forEach(fillBar);
}

document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Pas d'animation : on applique directement les niveaux
  if (reduceMotion || !('IntersectionObserver' in window)) {
    bars.forEach(fillBar);
    return;
  }

  // Anime chaque barre quand elle devient visible à l'écran
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fillBar(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });

  bars.forEach((bar) => observer.observe(bar));
});

// Exposer globalement
window.animateSkills = animateSkills;
