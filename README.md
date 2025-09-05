# �k DELIS FOOD MARKET

**Boutique e-commerce moderne pour produits frais et de qualité**

## 🖋Caractéristiques

- 🛒 **Boutique en ligne** complète avec catalogue produits
- 📱 **Design responsive** optimisé mobile et desktop
- ☴ｮ **Cloudflare D1** pour la base de données distribuée
- �<￾ **Cloudflare R2** pour le stockage des médias
- 📲 **Commandes WhatsApp** intégrées (+33123456789)
- 🕝 **Recherche et filtres** avancés
- ⚡ **Next.js 14* avec App Router
- 🎨 **Tailwind CSS** avec composants modernes

## 🚀 Déploiement Vercel

### 1. Importation
```bash
# Sur vercel.com
Import Git Repository ‒ https://github.com/juniorrrrr345/delis
```

### 2. Variables d'environnement (optionnelles)
```bash
CLOUDFLARE_ACCOUNT_ID=7979421604bd07b3bd34d3ed96222512
CLOUDFLARE_API_TOKEN=ijkVhaXCw6LSddIMIMxwPL5CDAWznxip5x9I1bNW
CLOUDFLARE_DATABASE_ID=b52bc539-a06c-4c32-9569-0ea917199a6b
```

### 3. Déploiement
- Cliquez **"Deploy"** → Vercel détecte automatiquement Next.js
- **URL finale** : https://delis-xxxxx.vercel.app

## 💾  Base de données

### Cloudflare D1 (UUID: b52bc539-a06c-4c32-9569-0ea917199a6b)
- **Categories** : Organisation des produits
- **Products** : Catalogue complet
- **Farms** : Producteurs et fermes
- **Settings** : Configuration de la boutique
- **Social Links** : Réseaux sociaux

## 🛄￾ Technologies

- **Framework** : Next.js 14 avec App Router
- **UI** : Tailwind CSS + Radix UI
- **Base de données** : Cloudflare D1 (SQLite distribuée)
- **Stockage** : Cloudflare R2 pour les médias
- **Déploiement** : Vercel avec GitHub
- **Commandes** : WhatsApp Business API

## 📁 Structure

```
/
├┬┬ app/                    # Pages Next.js (App Router)
│   ├┬┬ page.tsx          # Page d'accueil
│   ├┬┬ layout.tsx         # Layout principal
│   └┬┬ globals.css        # Styles globaux
│├┬┬ components/            # Composants React
│   └┬┬ DelisFoodMarket.tsx # Composant principal
│├┬┬ src/lib/              # Utilitaires
│  ├┬┬ cloudflare-d1.ts  # Client D1
│  └┬┬ cloudflare-r2.ts  # Client R2
│├┬┬ package.json          # Dépendances Next.js
│├┬┬ next.config.js        # Configuration Next.js
│├┬┬ vercel.json          # Configuration Vercel
│└┬┬ tailwind.config.js   # Configuration Tailwind
```

## 🎯 Fonctionnalités

### Frontend
- ✅ Catalogue produits avec images
- ✅ Recherche en temps réel
- ✅ Filtres par catégories
- ✅ Panier d'achat dynamique
- ✅ Interface responsive
- ✅ Animations et transitions

### Backend
- ✅ API Cloudflare D1 intégrée
- ✅ Gestion des produits
- ✅ Système de catégories
- ✅ Configuration boutique

### Commandes
- ✅ Intégration WhatsApp (+33123456789)
- ✅ Édération automatique des commandes
- ✅ Calcul total automatique

## 🔞 Éveloppement Local

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrage production
npm start
```

## 📗 PuatsApp Business

**Numéro** : +33123456789

Les commandes sont automatiquement formatées et envoyées via WhatsApp avec :
- Liste des produits sélectionnés
- Prix individuels et total
- Message personnalisé

## 🌖��� URLs

- **Production** : https://delis-xxxxx.vercel.app (après déploiement)
- **Repository** : https://github.com/juniorrrrr345/delis
- **Développement** : http://localhost:3000

## ⦉ Performance

- **SSR** : Rendu côté serveur avec Next.js
- **CDN** : Distribution globale via Vercel Edge
- **Database** : Cloudflare D1 distribuée mondialement
- **Images** : Optimisation automatique Next.js + Cloudflare R2

---

**�� DELIS FOOD MARKET est prêt pour le déploiement Vercel !**

*application complète avec base de données Cloudflare D1 et intégration WhatsApp*