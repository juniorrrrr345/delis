# 🛒 DELIS FOOD MARKET

Une application e-commerce moderne pour produits frais et de qualité, développée avec React, TypeScript et l'infrastructure Cloudflare.

## 🚀 Déploiement rapide

### Prérequis
- Node.js 18+
- Compte Cloudflare avec API token

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/juniorrrrr345/delis.git
cd delis
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration automatique**
```bash
npm run setup
```

4. **Démarrer en développement**
```bash
npm run dev
```

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Tailwind CSS
- **Backend**: Express.js + Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 pour les médias
- **Déploiement**: Vercel

## 📱 Fonctionnalités

- ✅ Catalogue de produits avec recherche et filtres
- ✅ Commandes via WhatsApp
- ✅ Interface responsive
- ✅ Gestion des catégories
- ✅ Contact et informations

## 🔧 Configuration Cloudflare

### Base de données D1
- **Nom**: DELIS FOOD MARKET
- **UUID**: `b52bc539-a06c-4c32-9569-0ea917199a6b`
- **Tables**: categories, products, farms, settings, social_links, pages

### R2 Storage
- **Bucket**: boutique-images
- **URL publique**: https://pub-b38679a01a274648827751df94818418.r2.dev

## 🚀 Déploiement sur Vercel

1. **Connecter à GitHub**
   - Pusher le code sur https://github.com/juniorrrrr345/delis.git

2. **Déployer sur Vercel**
   - Importer le projet depuis GitHub
   - Configuration automatique (Vite détecté)
   - Variables d'environnement déjà configurées dans `vercel.json`

3. **URL finale**
   - https://delisfoodmarket.vercel.app

## 📝 Scripts disponibles

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run preview    # Aperçu de production
npm run setup      # Configuration complète
npm run create-db  # Recréer la base D1
```

## 🛠️ Structure du projet

```
/
├── src/
│   ├── components/ui/    # Composants UI
│   ├── pages/           # Pages React
│   ├── lib/             # Configuration
│   └── hooks/           # Hooks personnalisés
├── shared/
│   └── schema.ts        # Schémas de données
├── scripts/
│   ├── create-d1-database.js
│   └── setup-delis-food-market.sh
└── server/
    └── index.ts         # API Express
```

## 🌐 API Endpoints

- `GET /api/health` - Status de l'application
- `GET /api/products` - Liste des produits
- `GET /api/settings` - Configuration boutique

## 💬 Contact

- WhatsApp: +33 1 23 45 67 89
- Email: contact@delisfoodmarket.fr

---

**Développé avec ❤️ pour DELIS FOOD MARKET**