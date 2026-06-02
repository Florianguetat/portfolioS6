/* ============================================================
   js/contact.js
   Formulaire de contact via un lien mailto:.
   Les messages de retour sont traduits (window.I18N, fourni par
   lang.js) avec repli en français.
   ============================================================ */

/* Récupère une traduction courante avec repli */
function _t(key, fallback) {
  return (window.I18N && window.I18N[key]) ? window.I18N[key] : fallback;
}

/**
 * Valide les champs puis ouvre le client e-mail via mailto:.
 * Renvoie false pour empêcher tout envoi natif du formulaire.
 */
function sendForm() {
  const nameEl   = document.getElementById('f-name');
  const emailEl  = document.getElementById('f-email');
  const msgEl    = document.getElementById('f-msg');
  const feedback = document.getElementById('form-msg');

  const name  = nameEl  ? nameEl.value.trim()  : '';
  const email = emailEl ? emailEl.value.trim() : '';
  const msg   = msgEl   ? msgEl.value.trim()   : '';

  // ── Validation ──
  if (!name || !email || !msg) {
    showFeedback(feedback, 'error', _t('form-err-empty', '⚠️ Veuillez remplir tous les champs.'));
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFeedback(feedback, 'error', _t('form-err-email', '⚠️ Adresse e-mail invalide.'));
    return false;
  }

  // ── Construction du lien mailto ──
  const subject = encodeURIComponent(`Contact Portfolio — ${name}`);
  const body    = encodeURIComponent(`${msg}\n\n---\nEnvoyé depuis le portfolio\nEmail : ${email}`);
  window.location.href = `mailto:Florian.GUETAT@etu.uca.fr?subject=${subject}&body=${body}`;

  // ── Message informatif (on ne peut pas garantir l'ouverture du client mail) ──
  showFeedback(feedback, 'info', _t('form-info-open',
    "✉️ Ouverture de votre messagerie… Si rien ne s'ouvre, écrivez-moi directement."));
  return false;
}

/**
 * Affiche un message de retour sous le formulaire.
 * @param {HTMLElement} el
 * @param {'error'|'info'} type
 * @param {string} text
 */
function showFeedback(el, type, text) {
  if (!el) return;
  el.style.display = 'block';
  el.style.color   = type === 'error' ? 'var(--accent2)' : 'var(--accent)';
  el.textContent   = text;
}

// Brancher la soumission du formulaire (si présent sur la page)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
  });
});

window.sendForm = sendForm;
