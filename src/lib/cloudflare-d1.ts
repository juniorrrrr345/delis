export const CLOUDFLARE_CONFIG = {
  accountId: '7979421604bd07b3bd34d3ed96222512',
  databaseId: 'b52bc539-a06c-4c32-9569-0ea917199a6b', // Base DELIS FOOD MARKET
  apiToken: 'ijkVhaXCw6LSddIMIMxwPL5CDAWznxip5x9I1bNW'
};

// Fonction pour exécuter des requêtes SQL sur D1
export async function executeD1Query(sql: string, params: any[] = []) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_CONFIG.accountId}/d1/database/${CLOUDFLARE_CONFIG.databaseId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_CONFIG.apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sql,
      params
    })
  });

  const data = await response.json();
  
  if (!data.success) {
    throw new Error(`D1 Error: ${JSON.stringify(data.errors)}`);
  }
  
  return data.result[0].results;
}

// Fonctions spécialisées pour chaque table
export class D1Database {
  
  // Categories
  async getCategories() {
    return executeD1Query('SELECT * FROM categories ORDER BY name');
  }
  
  async createCategory(category: { name: string; icon?: string; color?: string }) {
    return executeD1Query(
      'INSERT INTO categories (name, icon, color) VALUES (?, ?, ?) RETURNING *',
      [category.name, category.icon || '📦', category.color || '#22C55E']
    );
  }
  
  // Products
  async getProducts() {
    return executeD1Query(`
      SELECT p.*, c.name as category_name, f.name as farm_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      LEFT JOIN farms f ON p.farm_id = f.id 
      WHERE p.is_available = 1 
      ORDER BY p.created_at DESC
    `);
  }
  
  async createProduct(product: any) {
    return executeD1Query(
      'INSERT INTO products (name, description, category_id, farm_id, image_url, video_url, price, stock, prices, is_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *',
      [
        product.name,
        product.description || '',
        product.category_id || null,
        product.farm_id || null,
        product.image_url || '',
        product.video_url || '',
        product.price || 0,
        product.stock || 10,
        JSON.stringify(product.prices || {}),
        product.is_available ? 1 : 0
      ]
    );
  }
  
  // Settings
  async getSettings() {
    return executeD1Query('SELECT * FROM settings WHERE id = 1');
  }
  
  async updateSettings(settings: any) {
    return executeD1Query(
      'UPDATE settings SET shop_title = ?, theme_color = ?, background_opacity = ?, background_blur = ?, whatsapp_link = ?, scrolling_text = ? WHERE id = 1',
      [
        settings.shop_title || 'DELIS FOOD MARKET',
        settings.theme_color || 'glow',
        settings.background_opacity || 20,
        settings.background_blur || 5,
        settings.whatsapp_link || '',
        settings.scrolling_text || 'Bienvenue chez DELIS FOOD MARKET - Produits frais et de qualité'
      ]
    );
  }
}

export const db = new D1Database();