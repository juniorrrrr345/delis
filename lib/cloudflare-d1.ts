// DELIS FOOD MARKET - Client Cloudflare D1
const CLOUDFLARE_CONFIG = {
  accountId: '7979421604bd07b3bd34d3ed96222512',
  databaseId: 'b52bc539-a06c-4c32-9569-0ea917199a6b',
  apiToken: 'ijkVhaXCw6LSddIMIMxwPL5CDAWznxip5x9I1bNW'
};

export async function executeD1Query(sql: string, params: any[] = []) {
  try {
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
    
    return data.result?.[0]?.results || [];
  } catch (error) {
    console.error('D1 Query Error:', error);
    throw error;
  }
}

export async function getProducts() {
  return executeD1Query(`
    SELECT p.*, c.name as category_name, f.name as farm_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    LEFT JOIN farms f ON p.farm_id = f.id 
    WHERE p.is_available = 1
    ORDER BY p.created_at DESC
  `);
}

export async function getCategories() {
  return executeD1Query('SELECT * FROM categories ORDER BY name');
}

export async function getFarms() {
  return executeD1Query('SELECT * FROM farms ORDER BY name');
}

export async function getSettings() {
  const results = await executeD1Query('SELECT * FROM settings WHERE id = 1');
  return results[0] || {
    shop_title: 'DELIS FOOD MARKET',
    theme_color: 'glow',
    whatsapp_number: '+33123456789',
    background_opacity: 20,
    background_blur: 5
  };
}
