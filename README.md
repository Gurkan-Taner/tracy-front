# Tracy — Deploy Your Own AI Agent. Your Server. Your Rules.

Un framework AI open-source, auto-hébergé et sécurisé. Site marketing & documentation pour Tracy.

## 📋 Architecture du Projet

Tracy est une application Next.js 16.2.1 moderne structurée en composants réutilisables avec animations fluides et optimisations de performance.

### Stack Technologique

- **Framework**: Next.js 16.2.1 (App Router)
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4 + PostCSS
- **Animations**: Framer Motion 12.38.0
- **Language**: TypeScript 5
- **Linting**: ESLint 9

### Structure du Projet

```
tracy/
├── app/                      # App Router (Next.js 16)
│   ├── layout.tsx           # Layout racine avec métadonnées SEO
│   ├── page.tsx             # Page d'accueil
│   └── globals.css          # Styles globaux
│
├── components/              # Composants réutilisables
│   ├── navbar.tsx           # Barre de navigation
│   ├── footer.tsx           # Pied de page
│   ├── custom-cursor.tsx    # Curseur personnalisé
│   │
│   ├── sections/            # Sections de la page
│   │   ├── hero.tsx         # Section hero principal
│   │   ├── features.tsx     # Features/avantages
│   │   ├── protocol.tsx     # Détails du protocole
│   │   ├── security.tsx     # Caractéristiques sécurité
│   │   ├── live-terminal.tsx # Terminal en direct
│   │   ├── testimonials.tsx # Témoignages
│   │   └── final-cta.tsx    # Call-to-action final
│   │
│   └── animations/          # Composants d'animation
│       ├── hex-grid.tsx     # Grille hexagonale animée
│       ├── glitch-text.tsx  # Effet glitch sur texte
│       ├── scan-line.tsx    # Lignes de scan
│       └── anim-count.tsx   # Compteur animé
│
├── public/                  # Assets statiques
├── doc/                     # Documentation
│   └── openapi.yaml         # Spécification OpenAPI
│
├── Dockerfile               # Build production uniquement
├── Dockerfile.dev           # Environnement développement
├── next.config.ts           # Configuration Next.js
├── tsconfig.json            # Configuration TypeScript
├── tailwind.config.js       # Configuration Tailwind CSS
├── postcss.config.mjs       # Configuration PostCSS
└── eslint.config.mjs        # Configuration ESLint
```

## 🚀 Installation Locale

### Prérequis

- Node.js 18+ (recommandé: 20+)
- npm ou yarn

### Setup

```bash
# Cloner le repository
git clone <repository-url>
cd tracy

# Installer les dépendances
npm install
# ou
yarn install
```

## 💻 Développement Local

### Démarrer le serveur de développement

```bash
npm run dev
```

Le serveur démarre sur [http://localhost:3000](http://localhost:3000)

**Fonctionnalités en dev:**

- Hot reload automatique (modification = refresh instantané)
- Fast Refresh pour préserver l'état des composants
- Linting en temps réel avec ESLint
- TypeScript type-checking

### Build de production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🐳 Docker

### Fichiers Docker

- **Dockerfile.dev**: Image pour développement
  - Includes tous les outils de dev
  - Live reload avec volumes
  - Optimisée pour la productivité

- **Dockerfile**: Image pour production
  - Build uniquement (pas de runtime)
  - Génère le dossier `.next`
  - Image minimaliste

### Développement avec Docker

```bash
# Build l'image de dev
docker build -f Dockerfile.dev -t tracy:dev .

# Lancer avec hot reload (volume montage du code source)
docker run -p 3000:3000 -v $(pwd):/app tracy:dev
```

Accessible sur [http://localhost:3000](http://localhost:3000)

Le code source est monté en volume, les changements sont appliqués instantanément.

### Production avec Docker

```bash
# Build l'image de prod (build uniquement)
docker build -f Dockerfile -t tracy:build .

# Le conteneur exécute le build et s'arrête
docker run tracy:build

# Les fichiers buildés sont disponibles dans le host:
# - .next/
# - public/
```

Ensuite, servir les fichiers buildés avec:

```bash
# Serveur simple (Node.js Next.js start)
docker/node image avec Start
npm install --production
npm start

# Ou serveur statique (Nginx, Apache)
# Copier .next/static vers le serveur
```

### Docker Compose (optionnel)

Si vous avez un `docker-compose.yml`:

```bash
# Développement
docker-compose -f docker-compose.yml up

# Production
docker-compose -f docker-compose.prod.yml up
```

## 📝 Scripts Disponibles

| Commande        | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `npm run dev`   | Démarre le serveur de développement avec hot reload          |
| `npm run build` | Crée une version optimisée pour la production                |
| `npm start`     | Démarre le serveur de production (nécessite `build` d'abord) |
| `npm run lint`  | Lance ESLint pour vérifier la qualité du code                |
