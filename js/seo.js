/* ============================================================
   js/seo.js
   Rend le référencement indépendant du nom du dossier / dépôt.

   Toutes les URL absolues (canonique, Open Graph, Twitter Card,
   données structurées) sont calculées à partir de l'adresse réelle
   de la page (window.location). On peut donc renommer librement le
   dossier (PortfolioS6V2 → portfolioS6 → Portfolio…) sans modifier
   aucune page : les liens s'adaptent automatiquement.

   Repli sans JavaScript : dans le HTML, ces mêmes balises utilisent
   des chemins RELATIFS (ex. « ../assets/photo.jpg »), eux aussi
   valides quel que soit le nom du dossier. Ce script ne fait que les
   « promouvoir » en URL absolues, ce que certains robots sociaux
   préfèrent.
   ============================================================ */
(function () {
  // Convertit une URL relative en URL absolue, par rapport à la page courante
  function abs(rel) {
    try { return new URL(rel, window.location.href).href; }
    catch (e) { return rel; }
  }

  // URL canonique de la page (sans paramètres ni ancre)
  var pageUrl = window.location.origin + window.location.pathname;

  // ── Lien canonique ──
  var canon = document.querySelector('link[rel="canonical"]');
  if (!canon) {
    canon = document.createElement('link');
    canon.setAttribute('rel', 'canonical');
    document.head.appendChild(canon);
  }
  canon.setAttribute('href', pageUrl);

  // ── Métadonnée à créer/mettre à jour ──
  function setMeta(attr, key, value) {
    var el = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  // ── Promotion d'une URL relative existante en URL absolue ──
  function upgrade(attr, key) {
    var el = document.querySelector('meta[' + attr + '="' + key + '"]');
    if (el) el.setAttribute('content', abs(el.getAttribute('content')));
  }

  // og:url = adresse réelle de la page
  setMeta('property', 'og:url', pageUrl);

  // Images de partage : passer le chemin relatif en absolu
  upgrade('property', 'og:image');
  upgrade('name', 'twitter:image');

  // ── Données structurées (JSON-LD) : mettre à jour url + image ──
  var ld = document.querySelector('script[type="application/ld+json"]');
  if (ld) {
    try {
      var data = JSON.parse(ld.textContent);
      data.url = pageUrl;
      if (data.image) data.image = abs(data.image);
      ld.textContent = JSON.stringify(data, null, 2);
    } catch (e) { /* JSON-LD absent ou invalide : on ignore */ }
  }
})();
