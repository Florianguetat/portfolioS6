/* ============================================================
   js/contact.js
   Gestion du formulaire de contact.
   Utilise un lien mailto: pour ouvrir le client e-mail
   de l'utilisateur avec les champs pré-remplis.
   ============================================================ */

/**
 * Valide et envoie le formulaire de contact via mailto:.
 * Affiche un message de retour dans #form-msg.
 */
function sendForm() {
  const nameEl  = document.getElementById('f-name');
  const emailEl = document.getElementById('f-email');
  const msgEl   = document.getElementById('f-msg');
  const feedback = document.getElementById('form-msg');

  const name  = nameEl  ? nameEl.value.trim()  : '';
  const email = emailEl ? emailEl.value.trim()  : '';
  const msg   = msgEl   ? msgEl.value.trim()    : '';

  // ── Validation ──────────────────────────────────────────
  if (!name || !email || !msg) {
    showFeedback(feedback, 'error',
      '⚠️ Veuillez remplir tous les champs.');
    return;
  }

  // Validation basique de l'e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFeedback(feedback, 'error',
      '⚠️ Adresse e-mail invalide.');
    return;
  }

  // ── Construction du lien mailto ──────────────────────────
  const subject = encodeURIComponent(`Contact Portfolio — ${name}`);
  const body    = encodeURIComponent(
    `${msg}\n\n---\nEnvoyé depuis le portfolio\nEmail : ${email}`
  );

  window.location.href =
    `mailto:Florian.GUETAT@etu.uca.fr?subject=${subject}&body=${body}`;

  // ── Feedback succès ──────────────────────────────────────
  showFeedback(feedback, 'success', '✅ Votre client e-mail s\'est ouvert !');

  // Vider le formulaire
  if (nameEl)  nameEl.value  = '';
  if (emailEl) emailEl.value = '';
  if (msgEl)   msgEl.value   = '';
}

/**
 * Affiche un message de retour coloré sous le bouton.
 * @param {HTMLElement} el      - Élément de feedback.
 * @param {'error'|'success'} type - Type de message.
 * @param {string} text         - Texte à afficher.
 */
function showFeedback(el, type, text) {
  if (!el) return;
  el.style.display = 'block';
  el.style.color   = type === 'error' ? 'var(--accent2)' : 'var(--accent3)';
  el.textContent   = text;
}

// Exposer pour les onclick HTML
window.sendForm = sendForm;
