# 🌐 Portfolio — Florian GUETAT

Portfolio personnel multilingue de Florian GUETAT, étudiant en BUT Réseaux & Télécommunications à l'IUT d'Aubière et alternant administrateur Linux chez NTN Europe à Annecy.

✨ **Nouveautés V3** : menu Options unifié avec sélecteur de langue et **4 thèmes** (clair, sombre, daltonien clair, daltonien sombre).

---

## 📁 Structure du projet

> 💡 **Le nom du dossier (et donc du dépôt) n'a aucune importance.** Toutes les
> URL de partage et de référencement sont calculées automatiquement à partir de
> l'adresse de la page (voir `js/seo.js`). Vous pouvez renommer le dossier
> librement (`portfolioS6`, `Portfolio`, …) sans modifier le moindre fichier.

```
<dossier>/
│
├── index.html              → Redirige vers pages/accueil.html
│
├── assets/
│   ├── photo.jpg           → Photo de profil
│   ├── favicon.svg         → Favicon (monogramme FG)
│   └── cv/
│       └── CV-Florian-GUETAT.pdf   → CV téléchargeable (hébergé dans le dépôt)
│
├── pages/                  → Une page HTML par section
│   ├── accueil.html        → Hero, stats, ticker
│   ├── apropos.html        → Bio, qualités, infos
│   ├── formation.html      → Timeline académique
│   ├── experiences.html    → Expériences pro
│   ├── competences.html    → Hard & soft skills
│   ├── projets.html        → Grille de projets
│   ├── divers.html         → Loisirs et passions
│   ├── cv.html             → CV stylisé + PDF
│   └── contact.html        → Coordonnées + formulaire
│
├── css/
│   ├── variables.css       → Variables CSS + 4 thèmes (data-theme)
│   ├── base.css            → Reset, typo, curseur, scrollbar
│   ├── layout.css          → Sidebar et structure principale
│   ├── components.css      → Cartes, boutons, tags, barres
│   ├── pages.css           → Styles spécifiques par page
│   └── options.css         → Menu Options (langues + thèmes)
│
├── js/
│   ├── main.js             → Curseur personnalisé + ticker
│   ├── navigation.js       → Navigation entre pages
│   ├── lang.js             → Moteur de traduction in-place
│   ├── options.js          → Menu Options + gestion thèmes
│   ├── skills.js           → Animation des barres
│   ├── contact.js          → Formulaire de contact (envoi via Formspree)
│   └── seo.js              → URLs canoniques / partage (auto, sans nom de dépôt)
│
└── lang/
    ├── fr.json   ├── en.json   ├── es.json
    ├── de.json   ├── it.json   └── pt.json
```

---

## 🎨 Système de thèmes (NOUVEAU)

Le portfolio propose **4 thèmes** accessibles depuis le menu Options :

| Thème              | Description                                    |
|--------------------|------------------------------------------------|
| 🌙 **Sombre**       | Fond très sombre, accent violet (défaut)       |
| ☀️ **Clair**        | Fond clair, texte foncé, accent violet         |
| 🎨 **Daltonien sombre** | Sombre avec palette bleu/orange (a11y)     |
| 🎨 **Daltonien clair**  | Clair avec palette bleu/orange (a11y)      |

### Implémentation

Chaque thème est défini comme un **bloc de variables CSS** dans `css/variables.css` :

```css
:root[data-theme="dark"]     { --bg: #07080f; --accent: #6c63ff; ... }
:root[data-theme="light"]    { --bg: #f6f6fb; --accent: #5a52e6; ... }
:root[data-theme="dark-cb"]  { --bg: #08090e; --accent: #4ea3ff; ... }
:root[data-theme="light-cb"] { --bg: #f5f7fc; --accent: #0962d8; ... }
```

Le changement de thème se fait simplement en ajoutant un attribut sur `<html>` :
```js
document.documentElement.setAttribute('data-theme', 'light');
```
Le thème est sauvegardé dans `localStorage` et persiste entre les pages.

### Accessibilité

Les thèmes daltoniens utilisent une palette **bleu + orange** au lieu de rouge/vert, sûre pour les daltoniens (deutéranopie et protanopie).

---

## 🌍 Système de traduction

6 langues disponibles : **FR · EN · ES · DE · IT · PT**

### Fonctionnement
1. L'utilisateur clique sur ⚙ **Options** dans la sidebar.
2. Choisit une langue dans le panneau qui s'ouvre.
3. Le fichier `lang/{code}.json` est chargé via `fetch`.
4. Tous les éléments `[data-key="..."]` sont mis à jour **sans rechargement**.
5. La langue est mémorisée dans `localStorage`.

### Ajouter une langue
1. Créer `lang/xx.json` en copiant `lang/fr.json` puis traduire.
2. Ajouter la langue dans le tableau `LANGS` de `js/options.js`.

---

## 🚀 Lancement

### Option 1 — Directement
Double-cliquer sur `index.html` (peut nécessiter d'autoriser CORS pour les JSON locaux).

### Option 2 — Serveur local (recommandé)
```bash
python3 -m http.server 8080
# ou
npx serve .
```
Puis ouvrir `http://localhost:8080`.

---

## 🎯 Menu Options

Le menu Options est accessible par le bouton ⚙ en bas de la sidebar. Il contient :

- **Langue** : 6 boutons drapeaux (FR, EN, ES, DE, IT, PT)
- **Thème** : 4 boutons avec pastille colorée (sombre, clair, daltonien sombre, daltonien clair)
- **Footer** : rappel que les préférences sont sauvegardées localement

Le menu se ferme :
- En cliquant sur ✕
- En cliquant à l'extérieur (backdrop)
- Avec la touche **Échap**

Le menu est **injecté dynamiquement** par `js/options.js` dans chaque page, ce qui évite de répéter le HTML 9 fois.

---

## 🎨 Design

- **Typographie** : Syne (titres) · DM Mono (étiquettes) · Figtree (corps)
- **Curseur personnalisé** : point rapide + anneau lissé
- **Effets** : orbes flottantes, ticker défilant, barres animées
- **Responsive** : sidebar adaptée mobile

---

## 👤 Auteur

**Florian GUETAT**
📧 [Florian.GUETAT@etu.uca.fr](mailto:Florian.GUETAT@etu.uca.fr)
🏫 IUT Aubière — Université Clermont Auvergne
💼 NTN Europe — Annecy (74)

---

## ✉️ Configuration du formulaire de contact (Formspree)

Le formulaire de contact envoie les messages par e-mail via **Formspree**
(gratuit). Pour l'activer :

1. Créer un compte sur https://formspree.io avec l'adresse de réception
   (`Florian.GUETAT@etu.uca.fr`).
2. Créer un nouveau formulaire (« New form ») → Formspree fournit une URL du
   type `https://formspree.io/f/abcdwxyz`.
3. Dans `pages/contact.html`, remplacer `VOTRE_ID_FORMSPREE` (attribut
   `action` du `<form>`) par cet identifiant.
4. Valider l'adresse de réception via l'e-mail de confirmation Formspree, puis
   tester en envoyant un message depuis le site.

À réception, l'e-mail contient le **nom**, le **message** et l'**adresse du
visiteur** en « Répondre à » (réponse en un clic). Le texte de confirmation
affiché après l'envoi se modifie dans `lang/*.json` (clé `form-ok`).

---

## ♿ Accessibilité & SEO

Le portfolio applique plusieurs bonnes pratiques :

- **Titres sémantiques** : un seul `<h1>` par page, sections en `<h2>`.
- **Traduction complète** : 6 langues, y compris les mots-clés (tags) des
  pages Formation, Expériences, Projets et CV, ainsi que le titre de l'onglet.
  Les termes purement techniques (VLAN, Python, VoIP…) restent volontairement
  identiques dans toutes les langues.
- **Contrastes WCAG AA** vérifiés sur les 4 thèmes.
- **Curseur personnalisé** activé uniquement sur les appareils à pointeur fin :
  le curseur natif reste visible sur mobile et si le JavaScript échoue.
- **`prefers-reduced-motion`** : les animations sont neutralisées pour les
  personnes sensibles au mouvement.
- **Focus clavier visible**, modale Options accessible (piège de focus,
  `aria-modal`, retour du focus, fermeture par Échap).
- **Référencement** : balises `description`, Open Graph et Twitter Card,
  favicon, URL canonique et données structurées (JSON-LD) sur l'accueil.

> ℹ️ Le CV est désormais hébergé dans le dépôt (`assets/cv/CV-Florian-GUETAT.pdf`).
> Pour le mettre à jour, remplacez simplement ce fichier en conservant le même nom.

---

## 📜 Licence

Projet personnel — tous droits réservés © Florian GUETAT