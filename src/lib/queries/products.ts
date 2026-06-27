import { createServerFn } from '@tanstack/react-start';
import { supabaseAdmin } from '../supabase-admin';
import { PRODUCTS, type Product } from '../store-data';

// Extract sizes and colors from Nuvemshop variations array
function extractVariations(variations: any) {
  const sizes = new Set<string>();
  const colors = new Set<string>();
  const colorMap: Record<string, string> = {
    'preto': '#000', 'branco': '#fff', 'azul': '#1d4ed8', 'vermelho': '#dc2626', 
    'verde': '#15803d', 'amarelo': '#eab308', 'cinza': '#6b7280', 'marinho': '#0a1530', 
    'off-white': '#f5f0e8', 'areia': '#d4c4a8', 'caramelo': '#a8794a', 'caqui': '#c8a878'
  };
  
  if (Array.isArray(variations)) {
    for (const v of variations) {
      if (v.values && Array.isArray(v.values)) {
        for (const val of v.values) {
          const str = (val.pt || '').trim();
          if (!str) continue;
          
          const lower = str.toLowerCase();
          // Heuristic for common sizes
          if (['p', 'm', 'g', 'gg', 'xg', 'xxg', 'único', 'unico'].includes(lower) || !isNaN(Number(str))) {
            sizes.add(str);
          } else {
            colors.add(str);
          }
        }
      }
    }
  }
  
  const finalSizes = sizes.size > 0 ? Array.from(sizes) : ["Único"];
  const finalColors = colors.size > 0 ? Array.from(colors).map(c => ({
    name: c,
    hex: colorMap[c.toLowerCase()] || '#000' // default to black if hex unknown
  })) : [{ name: "Padrão", hex: "#000" }];
  
  return { sizes: finalSizes, colors: finalColors };
}

// Map the real Supabase table row (produtos_nuvemshop) to the frontend Product type
function mapDbProduct(row: any): Product {
  const extracted = extractVariations(row.variations);

  return {
    id: row.id.toString(),
    variantId: row.variant_id?.toString() || row.id.toString(),
    name: row.nome,
    brand: "CN Store",
    category: (row.categoria || "geral").toLowerCase(),
    price: Number(row.preco) || 0,
    image: row.imagem_url || "",
    colors: extracted.colors,
    sizes: extracted.sizes,
    description: "Produto oficial CN Store",
    isNew: true,
  };
}

export const getProductsFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from('produtos_nuvemshop')
      .select('*');

    if (error || !data || data.length === 0) {
      return PRODUCTS; // Fallback to mock products
    }

    const realIds = new Set(data.map((r: any) => r.id.toString()));
    const dbProducts = data.map(mapDbProduct);
    const mockFallback = PRODUCTS.filter(p => !realIds.has(p.id));
    return [...dbProducts, ...mockFallback];
  });

export const getProductByIdFn = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { data, error } = await supabaseAdmin
      .from('produtos_nuvemshop')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!error && data) {
      return mapDbProduct(data);
    }

    // Fallback: find in mock PRODUCTS
    return PRODUCTS.find(p => p.id === id) || null;
  });

export const getProductsByCategoryFn = createServerFn({ method: 'GET' })
  .validator((categorySlug: string) => categorySlug)
  .handler(async ({ data: categorySlug }) => {
    const { data, error } = await supabaseAdmin
      .from('produtos_nuvemshop')
      .select('*');

    const dbProducts = (!error && data) ? data.map(mapDbProduct) : [];
    const realIds = new Set(dbProducts.map(p => p.id));
    const mockFallback = PRODUCTS.filter(p => !realIds.has(p.id));
    const all = [...dbProducts, ...mockFallback];

    if (categorySlug === "lancamentos") {
      return all.filter(p => p.isNew);
    }
    return all.filter(p => p.category === categorySlug);
  });
