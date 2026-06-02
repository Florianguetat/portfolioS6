/* ============================================================
   js/contact.js
   Envoi du formulaire de contact via Formspree (https://formspree.io).

   Le visiteur remplit nom / e-mail / message ; à l'envoi, les
   données sont transmises à Formspree, qui envoie un e-mail à
   Florian (avec « Répondre à » = l'adresse du visiteur). Aucun
   client mail ne s'ouvre côté visiteur.

   ⚙️ Configuration : l'URL Formspree se trouve dans l'attribut
   « action » du <form> dans pages/contact.html. Il suffit d'y
   remplacer VOTRE_ID_FORMSPREE par l'identifiant de votre formulaire.

   Les messages affichés sont traduits (window.I18N, via lang.js)
   avec repli en français.
   ============================================================ */

/* Récupère une traduction courante avec repli */
function _t(key, fallback) {
  return (window.I18N && window.I18N[key]) ? window.I18N[key] : fallback;
}

/**
 * Affiche un message de retour sous le formulaire.
 * @param {HTMLElement} el
 * @param {'ok'|'error'|'info'} type
 * @param {string} text
 */
function showFeedback(el, type, text) {
  if (!el) return;
  el.style.display = 'block';
  el.style.marginTop = '14px';
  if (type === 'ok')         el.style.color = 'var(--accent3)';
  else if (type === 'error') el.style.color = 'var(--accent2)';
  else                       el.style.color = 'var(--accent)';
  el.textContent = text;
}

/* Validation simple côté client */
function validate(name, email, message) {
  if (!name || !email || !message) {
    return _t('form-err-empty', '⚠️ Veuillez remplir tous les champs.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return _t('form-err-email', '⚠️ Adresse e-mail invalide.');
  }
  return null;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const feedback = document.getElementById('form-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = (document.getElementById('f-name')  || {}).value || '';
    const email   = (document.getElementById('f-email') || {}).value || '';
    const message = (document.getElementById('f-msg')   || {}).value || '';

    // 1. Validation
    const error = validate(name.trim(), email.trim(), message.trim());
    if (error) { showFeedback(feedback, 'error', error); return; }

    // 2. Vérifier que Formspree est bien configuré
    if (!form.action || form.action.indexOf('VOTRE_ID_FORMSPREE') !== -1) {
      showFeedback(feedback, 'error', _t('form-config', "⚠️ Le formulaire n'est pas encore configuré."));
      return;
    }

    // 3. Envoi à Formspree (AJAX, sans quitter la page)
    showFeedback(feedback, 'info', _t('form-sending', 'Envoi en cours…'));
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        form.reset();
        showFeedback(feedback, 'ok',
          _t('form-ok', 'Message envoyé ✅ Merci de votre prise de contact, je vous répondrai dès que possible.'));
      } else {
        showFeedback(feedback, 'error',
          _t('form-error', 'Une erreur est survenue. Réessayez, ou écrivez-moi directement.'));
      }
    } catch (err) {
      showFeedback(feedback, 'error',
        _t('form-error', 'Une erreur est survenue. Réessayez, ou écrivez-moi directement.'));
    }
  });
});
