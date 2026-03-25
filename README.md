<div align="center">

# ⚖️ LoiMaroc AI — Web App

<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-Backend-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />

<br/>
<br/>

> 🇲🇦 **L'intelligence artificielle au service du droit marocain.**
> Un assistant juridique premium, moderne et accessible à tous.

</div>

---

## 🌟 Aperçu du Projet

**LoiMaroc AI** est une plateforme web de pointe qui permet à n'importe quel citoyen, avocat ou étudiant de **consulter le droit marocain** grâce à un assistant IA — sans jargon inutile, sans barrière à l'entrée.

Le moteur RAG (Retrieval-Augmented Generation) analyse des milliers de pages de code juridique pour fournir des réponses précises, sourcées et en français.

---

## 🗂️ Structure des Pages

| 🔗 Route | 📄 Description |
|---|---|
| `/` | Page d'accueil — Hero, fonctionnalités, CTA |
| `/chat` | Moteur de consultation IA — interface principale |
| `/about` | À propos — contenu dynamique depuis l'admin |
| `/contact` | Contact — formulaire + liens sociaux configurables |
| `/sign-in` | Connexion utilisateur |
| `/sign-up` | Inscription + vérification par email |
| `/profile` | Profil utilisateur & historique personnel |
| `/codes` | Liste des codes juridiques marocains |
| `/jurisprudence` | Section jurisprudence |
| `/admin` | 🔒 Panneau d'administration (accès restreint) |
| `/admin/config` | ⚙️ Configuration globale du système |
| `/admin/users` | 👥 Gestion des utilisateurs |
| `/admin/history` | 📜 Historique de toutes les conversations |

---

## 🧰 Stack Technique

### 🖥️ Frontend

| Technologie | Rôle |
|---|---|
| **Next.js 15** (App Router) | Framework React avec SSR/SSG et routage avancé |
| **TypeScript** | Typage statique pour une codebase robuste |
| **Tailwind CSS v3** | Style utilitaire avec un système de design personnalisé |
| **Framer Motion** | Animations fluides (variants, AnimatePresence, transitions) |
| **Lucide React** | Bibliothèque d'icônes SVG modulaires et légères |

### 🔌 Communication

| Technologie | Rôle |
|---|---|
| **Fetch API** | Requêtes HTTP vers le backend FastAPI |
| **localStorage** | Sessions anonymes pour les utilisateurs non connectés |
| **MongoDB (via API)** | Historique de chat persistant pour les utilisateurs connectés |

### 🎨 Design System

Le projet utilise un système de couleurs Marocain personnalisé via Tailwind :

```js
// tailwind.config.js
colors: {
  'morocco-emerald': '#1a5045', // Vert profond — couleur principale
  'morocco-gold':    '#c9a84c', // Or — accents et highlights
  'morocco-ivory':   '#f8f4ee', // Ivoire — fonds et surfaces
}
```

---

## 📁 Architecture des Dossiers

```
web_app/
├── src/
│   ├── app/                    # Pages (App Router)
│   │   ├── (auth)/             # Routes d'authentification
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   ├── admin/              # Interface d'administration
│   │   │   ├── config/
│   │   │   ├── history/
│   │   │   ├── login/
│   │   │   └── users/
│   │   ├── chat/               # Interface de chat IA
│   │   ├── contact/            # Page de contact
│   │   ├── about/              # Page à propos
│   │   └── layout.tsx          # Layout racine (Navbar + police)
│   ├── components/
│   │   └── ui/                 # Composants réutilisables
│   │       └── Navbar.tsx      # Navigation principale réactive
│   └── styles/
│       └── globals.css         # Variables CSS globales & reset
├── public/                     # Assets statiques
├── .env                        # Variables d'environnement (non committé)
├── tailwind.config.ts          # Configuration du design system
├── tsconfig.json               # Configuration TypeScript
└── next.config.js              # Configuration Next.js
```

---

## 🚀 Lancer le Projet

### Prérequis

- **Node.js** v18 ou supérieur
- **npm** v9+
- Backend FastAPI en cours d'exécution

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier d'environnement
cp .env.example .env
# (puis renseigner vos valeurs dans .env)

# 3. Lancer le serveur de développement
npm run dev
```

L'application sera disponible sur 👉 **http://localhost:3000**

---

## 🔐 Fonctionnalités Clés

### 👤 Authentification Complète
- Inscription avec **vérification par email** (code OTP à 6 chiffres)
- Connexion sécurisée avec session persistante
- Séparation stricte : l'historique local est **effacé** à la connexion
- Les utilisateurs connectés ont leur propre historique en **base de données**

### 🤖 Interface de Chat IA
- Sidebar avec l'historique des conversations personnelles
- Réponses sourcées avec indication de la **source juridique**
- Mode invité (stockage local) et mode connecté (MongoDB)
- Suggestions de questions pour guider les nouveaux utilisateurs

### ⚙️ Panneau Admin
- Gestion des utilisateurs (vérification, suppression)
- Configuration globale de l'application (contenu public, seuils IA)
- Historique de toutes les conversations avec vue détaillée
- URLs LinkedIn/Portfolio et numéro de téléphone configurables

### 📩 Page Contact
- Design premium avec glassmorphism & animations Framer Motion
- Formulaire complet (nom, email, téléphone, message)
- Liens sociaux dynamiques (LinkedIn, Portfolio)
- Email de réception configurable depuis le panneau admin

---

## 🧪 Scripts Disponibles

```bash
npm run dev       # Serveur de développement (hot reload)
npm run build     # Build de production optimisé
npm run start     # Démarrer la version de production
npm run lint      # Analyse statique du code (ESLint)
```

---

<div align="center">

**Made with 💚 & ☕ · LoiMaroc AI © 2025**

*Démocratiser l'accès au droit — une question à la fois.*

</div>
