import { createServerFn } from '@tanstack/react-start';
import { supabaseAdmin } from '../supabase-admin';
import { PRODUCTS, type Product } from '../store-data';

// Map the real Supabase table row (produtos_nuvemshop) to the frontend Product type
function mapDbProduct(row: any): Product {
  return {
    id: row.id.toString(),
    variantId: row.variant_id?.toString() || row.id.toString(),
    name: row.nome,
    brand: "CN Store",
    category: (row.categoria || "geral").toLowerCase(),
    price: Number(row.preco) || 0,
    image: row.imagem_url || "",
    colors: [{ name: "Padrão", hex: "#000" }],
    sizes: ["Único"],
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
