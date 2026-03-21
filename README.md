# 🌐 Portfolio — Florian GUETAT

Portfolio personnel multilingue (6 langues) de Florian GUETAT, étudiant en BUT Réseaux & Télécommunications à l'IUT d'Aubière et alternant administrateur Linux chez NTN Europe à Annecy.

---

## 📁 Structure du projet

```
portfolio-florian/
│
├── index.html              → Page d'entrée (sélection de langue)
│
├── pages/                  → Une page HTML par section du portfolio
│   ├── accueil.html        → Page d'accueil / Hero
│   ├── apropos.html        → À propos de Florian
│   ├── formation.html      → Parcours académique (timeline)
│   ├── experiences.html    → Expériences professionnelles
│   ├── competences.html    → Compétences techniques et humaines
│   ├── projets.html        → Projets réalisés
│   ├── divers.html         → Loisirs et passions
│   ├── cv.html             → Curriculum Vitae + téléchargement PDF
│   └── contact.html        → Formulaire et coordonnées
│
├── css/
│   ├── variables.css       → Variables CSS globales (couleurs, rayons, etc.)
│   ├── base.css            → Reset, typographie, scrollbar, utilitaires
│   ├── layout.css          → Sidebar, navigation, structure principale
│   ├── components.css      → Cartes, boutons, tags, barres de compétences
│   └── pages.css           → Styles spécifiques à chaque page
│
├── js/
│   ├── main.js             → Initialisation, curseur personnalisé, ticker
│   ├── navigation.js       → Gestion de la navigation entre pages
│   ├── translations.js     → Dictionnaire complet des traductions (6 langues)
│   ├── lang.js             → Moteur de traduction : applique les textes
│   └── skills.js           → Animation des barres de compétences
│
└── lang/
    ├── fr.json             → Traductions françaises
    ├── en.json             → Traductions anglaises
    ├── es.json             → Traductions espagnoles
    ├── de.json             → Traductions allemandes
    ├── it.json             → Traductions italiennes
    └── pt.json             → Traductions portugaises
```

---

## 🚀 Lancement

Ce projet est **100 % statique** (HTML / CSS / JavaScript pur).  
Aucune dépendance, aucun framework, aucun serveur requis.

### Option 1 — Ouvrir directement dans le navigateur
Double-cliquer sur `index.html`.

### Option 2 — Serveur local (recommandé pour éviter les erreurs CORS sur les JSON)
```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve .
```
Puis ouvrir `http://localhost:8080` dans le navigateur.

---

## 🌍 Système de traduction

Le système de traduction fonctionne **sans API externe**.  
Les textes sont stockés dans des fichiers JSON (`lang/*.json`) et chargés dynamiquement par `js/lang.js`.

### Fonctionnement
1. L'utilisateur clique sur un bouton de langue dans la sidebar.
2. `lang.js` charge le fichier JSON correspondant (ex : `lang/en.json`).
3. Chaque élément HTML portant l'attribut `data-key="ma-clé"` reçoit la traduction.
4. La langue active est sauvegardée dans `localStorage` pour la session suivante.

### Ajouter une langue
1. Créer `lang/xx.json` en copiant `lang/fr.json`.
2. Traduire toutes les valeurs.
3. Ajouter un bouton `<button class="lang-btn" onclick="setLang('xx')">XX</button>` dans le `<nav>` de chaque page.

---

## 🎨 Design

- **Thème** : Dark, violet/indigo sur fond très sombre
- **Typographie** : [Syne](https://fonts.google.com/specimen/Syne) (titres) + [DM Mono](https://fonts.google.com/specimen/DM+Mono) (étiquettes) + [Figtree](https://fonts.google.com/specimen/Figtree) (corps)
- **Curseur** : Curseur personnalisé avec anneau animé
- **Animations** : Orbes flottants, ticker, barres de compétences, apparition des pages
- **Responsive** : Adapté mobile/tablette via media queries

---

## 🗂️ Pages disponibles

| Fichier                  | Contenu                                         |
|--------------------------|-------------------------------------------------|
| `pages/accueil.html`     | Hero, stats, ticker défilant, liens rapides     |
| `pages/apropos.html`     | Bio, avatar, infos personnelles, qualités       |
| `pages/formation.html`   | Timeline du parcours académique                 |
| `pages/experiences.html` | Expériences pro (alternance, bénévolat…)        |
| `pages/competences.html` | Barres de compétences + soft skills             |
| `pages/projets.html`     | Grille de projets avec résultats                |
| `pages/divers.html`      | Loisirs : football, ski, VTT, lecture           |
| `pages/cv.html`          | Aperçu CV stylisé + téléchargement PDF          |
| `pages/contact.html`     | Coordonnées + formulaire mailto                 |

---

## 👤 Auteur

**Florian GUETAT**  
📧 [Florian.GUETAT@etu.uca.fr](mailto:Florian.GUETAT@etu.uca.fr)  
🏫 IUT Aubière — Université Clermont Auvergne  
💼 NTN Europe — Annecy (74)

---

## 📜 Licence

Projet personnel — tous droits réservés © Florian GUETAT
