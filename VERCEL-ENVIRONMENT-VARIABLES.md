# 🌐 VARIABLES D'ENVIRONNEMENT VERCEL - DELIS FOOD MARKET

## 📋 VARIABLES COMPLÈTES POUR VERCEL

Copiez-collez ces variables dans Vercel lors du déploiement :

### Cloudflare D1 Database
```
CLOUDFLARE_ACCOUNT_ID=7979421604bd07b3bd34d3ed96222512
CLOUDFLARE_DATABASE_ID=b52bc539-a06c-4c32-9569-0ea917199a6b
CLOUDFLARE_API_TOKEN=ijkVhaXCw6LSddIMIMxwPL5CDAWznxip5x9I1bNW
```

### Cloudflare R2 Storage
```
CLOUDFLARE_R2_ACCESS_KEY_ID=82WsPNjX-j0UqZIGAny8b0uEehcHd0X3zMKNIKIN
CLOUDFLARE_R2_SECRET_ACCESS_KEY=28230e200a3b71e5374e569f8a297eba9aa3fe2e1097fdf26e5d9e340ded709d
CLOUDFLARE_R2_BUCKET_NAME=boutique-images
CLOUDFLARE_R2_PUBLIC_URL=https://pub-b38679a01a274648827751df94818418.r2.dev
```

### Admin Panel
```
ADMIN_PASSWORD=votre_nouveau_mot_de_passe
```

## ✅ CONFIRMATION R2

Toutes les variables R2 sont bien configurées :

- **✅ Access Key ID** : `82WsPNjX-j0UqZIGAny8b0uEehcHd0X3zMKNIKIN`
- **✅ Secret Access Key** : `28230e200a3b71e5374e569f8a297eba9aa3fe2e1097fdf26e5d9e340ded709d`
- **✅ Bucket Name** : `boutique-images`
- **✅ Public URL** : `https://pub-b38679a01a274648827751df94818418.r2.dev`

## 🔧 DANS LE CODE

Les credentials R2 sont **hardcodés** dans `/src/lib/cloudflare-r2.ts` :

```typescript
const r2Client = new CloudflareR2Client({
  accountId: '7979421604bd07b3bd34d3ed96222512',
  accessKeyId: '82WsPNjX-j0UqZIGAny8b0uEehcHd0X3zMKNIKIN',
  secretAccessKey: '28230e200a3b71e5374e569f8a297eba9aa3fe2e1097fdf26e5d9e340ded709d',
  bucketName: 'boutique-images',
  publicUrl: 'https://pub-b38679a01a274648827751df94818418.r2.dev',
});
```

## 🚀 DÉPLOIEMENT VERCEL

1. **Import** : `https://github.com/juniorrrrr345/DELIS FOOD MARKETV2.git`
2. **Variables** : Ajouter les variables ci-dessus (optionnel car hardcodées)
3. **Deploy** : Build automatique garanti ✅

**🎉 TOUTES LES VARIABLES R2 SONT CONFIGURÉES !**