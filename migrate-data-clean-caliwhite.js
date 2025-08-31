const { MongoClient } = require('mongodb');

// DONNÉES CALIWHITE
const MONGODB_URI = 'mongodb+srv://genesistvl777:BtHiS2lycR1iNTKN@genesistvl77.62ytsmy.mongodb.net/?retryWrites=true&w=majority&appName=genesistvl77';
const MONGODB_DB_NAME = 'genesistvl77'; // À confirmer selon la structure MongoDB

const CLOUDFLARE_CONFIG = {
  accountId: '7979421604bd07b3bd34d3ed96222512',
  databaseId: '19ee81cc-91c0-4cfc-8cbe-dc67d8675e37',
  apiToken: 'ijkVhaXCw6LSddIMIMxwPL5CDAWznxip5x9I1bNW'
};

async function executeSqlOnD1(sql, params = []) {
  const { exec } = require('child_process');
  const { promisify } = require('util');
  const execAsync = promisify(exec);
  
  const curlCmd = `curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_CONFIG.accountId}/d1/database/${CLOUDFLARE_CONFIG.databaseId}/query" \\
    -H "Authorization: Bearer ${CLOUDFLARE_CONFIG.apiToken}" \\
    -H "Content-Type: application/json" \\
    --data '{"sql": "${sql}", "params": ${JSON.stringify(params)}}'`;
  
  try {
    const { stdout } = await execAsync(curlCmd);
    const data = JSON.parse(stdout);
    if (!data.success) {
      throw new Error(`D1 Error: ${JSON.stringify(data.errors)}`);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

async function migrateCleanData() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('🔗 Connexion MongoDB réussie');
    
    // Lister les bases de données disponibles
    const adminDb = client.db().admin();
    const dbList = await adminDb.listDatabases();
    console.log('📋 Bases disponibles:', dbList.databases.map(db => db.name));
    
    // Essayer plusieurs noms de DB possibles
    const possibleDbNames = ['genesistvl77', 'test', 'caliwhite', 'genesis'];
    let db = null;
    let actualDbName = '';
    
    for (const dbName of possibleDbNames) {
      try {
        const testDb = client.db(dbName);
        const collections = await testDb.listCollections().toArray();
        if (collections.length > 0) {
          db = testDb;
          actualDbName = dbName;
          console.log(`✅ Base trouvée: ${dbName} avec ${collections.length} collections`);
          console.log('📁 Collections:', collections.map(c => c.name));
          break;
        }
      } catch (err) {
        console.log(`❌ Échec DB ${dbName}:`, err.message);
      }
    }
    
    if (!db) {
      throw new Error('Aucune base MongoDB trouvée avec des données');
    }
    
    console.log(`🔄 Migration PROPRE depuis MongoDB (${actualDbName})...`);
    
    // Migration categories UNIQUES
    console.log('📁 Migration catégories uniques...');
    try {
      const mongoCategories = await db.collection('categories').find({}).toArray();
      const uniqueCategories = [...new Map(mongoCategories.map(cat => [cat.name, cat])).values()];
      
      for (const cat of uniqueCategories) {
        await executeSqlOnD1(
          'INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)',
          [String(cat.name || ''), String(cat.emoji || cat.icon || '📦'), String(cat.color || '#22C55E')]
        );
      }
      console.log(`✅ ${uniqueCategories.length} catégories uniques migrées`);
    } catch (err) {
      console.log('⚠️ Pas de collection categories ou erreur:', err.message);
    }
    
    // Migration farms UNIQUES
    console.log('🏪 Migration farms uniques...');
    try {
      const mongoFarms = await db.collection('farms').find({}).toArray();
      const uniqueFarms = [...new Map(mongoFarms.map(farm => [farm.name, farm])).values()];
      
      for (const farm of uniqueFarms) {
        await executeSqlOnD1(
          'INSERT INTO farms (name, description, location, contact) VALUES (?, ?, ?, ?)',
          [farm.name || 'Farm', 'Production CALIWHITE', farm.location || farm.country || 'Local', 'contact@caliwhite.com']
        );
      }
      console.log(`✅ ${uniqueFarms.length} farms uniques migrées`);
    } catch (err) {
      console.log('⚠️ Pas de collection farms ou erreur:', err.message);
    }
    
    // Migration social_links UNIQUES
    console.log('📱 Migration liens sociaux uniques...');
    try {
      const mongoSocial = await db.collection('socialLinks').find({}).toArray();
      const uniqueSocial = [...new Map(mongoSocial.map(link => [link.name || link.platform, link])).values()];
      
      for (const link of uniqueSocial) {
        await executeSqlOnD1(
          'INSERT INTO social_links (platform, url, icon, is_available) VALUES (?, ?, ?, ?)',
          [link.name || link.platform || 'Platform', link.url || '#', link.icon || '📱', 1]
        );
      }
      console.log(`✅ ${uniqueSocial.length} liens sociaux uniques migrés`);
    } catch (err) {
      console.log('⚠️ Pas de collection socialLinks ou erreur:', err.message);
    }
    
    // Migration products UNIQUES avec conversion noms → IDs
    console.log('🛍️ Migration produits uniques...');
    try {
      const mongoProducts = await db.collection('products').find({}).toArray();
      const uniqueProducts = [...new Map(mongoProducts.map(prod => [prod.name, prod])).values()];
      
      for (const product of uniqueProducts) {
        // Trouver les IDs des catégories et farms
        const catResult = await executeSqlOnD1('SELECT id FROM categories WHERE name = ?', [product.category || '']);
        const farmResult = await executeSqlOnD1('SELECT id FROM farms WHERE name = ?', [product.farm || '']);
        
        const category_id = catResult.result?.[0]?.results?.[0]?.id || 1;
        const farm_id = farmResult.result?.[0]?.results?.[0]?.id || 1;
        
        await executeSqlOnD1(
          'INSERT INTO products (name, description, category_id, farm_id, image_url, video_url, price, stock, prices, is_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
            product.name || 'Produit',
            product.description || 'Produit CALIWHITE de qualité',
            category_id,
            farm_id,
            product.image || '',
            product.video || '',
            Number(product.price || 0),
            Number(product.stock || 10),
            JSON.stringify(product.prices || {}),
            1
          ]
        );
      }
      console.log(`✅ ${uniqueProducts.length} produits uniques migrés`);
    } catch (err) {
      console.log('⚠️ Pas de collection products ou erreur:', err.message);
    }
    
    // Migration settings
    await executeSqlOnD1(
      'INSERT INTO settings (id, shop_title, theme_color, background_opacity, background_blur) VALUES (?, ?, ?, ?, ?)',
      [1, 'CALIWHITE', 'glow', 20, 5]
    );
    console.log('✅ Settings CALIWHITE configurés');
    
    console.log('✅ Migration MongoDB → D1 PROPRE terminée');
    
  } catch (error) {
    console.error('❌ Erreur migration:', error);
  } finally {
    await client.close();
  }
}

migrateCleanData();