import { createServerFn } from '@tanstack/react-start';
import { supabaseAdmin } from '../supabase-admin';
import type { Product } from '../store-data';

// Helper to map DB row to the frontend Product type
function mapDbProduct(row: any): Product {
  // Extract colors and sizes from Nuvemshop variations
  const colorsSet = new Set<string>();
  const sizesSet = new Set<string>();
  
  if (Array.isArray(row.variations)) {
    row.variations.forEach((v: any) => {
      // Nuvemshop variants have 'values' array
      if (Array.isArray(v.values)) {
        v.values.forEach((val: any) => {
          // A simple heuristic if property names are not strictly defined
          // Usually 'Cor' or 'Color'
          const name = val.pt || val.es || val.en || String(val);
          // If it looks like a size (P, M, G, GG, numbers)
          if (/^(PP|P|M|G|GG|XG|[0-9]{2})$/i.test(name)) {
            sizesSet.add(name);
          } else {
            // Otherwise assume color or generic attribute
            colorsSet.add(name);
          }
        });
      }
    });
  }

  const colors = Array.from(colorsSet).map(c => ({ name: c, hex: "#000000" })); // Hex is hard to deduce without a map
  const sizes = Array.from(sizesSet);
  if (colors.length === 0) colors.push({ name: "Padrão", hex: "#000" });
  if (sizes.length === 0) sizes.push("Único");

  const defaultVariantId = row.variations?.[0]?.id?.toString() || row.id.toString();

  return {
    id: row.id.toString(),
    variantId: defaultVariantId,
    name: row.name,
    brand: "CN Store", // Default brand
    category: row.categories?.[0]?.handle?.pt || row.categories?.[0]?.name?.pt?.toLowerCase() || "geral",
    price: Number(row.price),
    oldPrice: row.promotional_price ? Number(row.promotional_price) : undefined,
    image: row.images?.[0]?.src || "",
    colors,
    sizes,
    description: "Produto oficial CN Store", // Could be mapped from DB if we added description
    isNew: true,
  };
}

export const getProductsFn = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return (data || []).map(mapDbProduct);
  });

export const getProductByIdFn = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching product:', error);
      return null;
    }

    return mapDbProduct(data);
  });

export const getProductsByCategoryFn = createServerFn({ method: 'GET' })
  .validator((categorySlug: string) => categorySlug)
  .handler(async ({ data: categorySlug }) => {
    // In a real scenario, we'd query by JSON or specific column.
    // For now, we fetch all and filter in JS if category logic is complex, 
    // or we query using Supabase textSearch/like on JSON. 
    // To be safe with the JSON structure, we fetch all and filter.
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }

    const mapped = (data || []).map(mapDbProduct);
    if (categorySlug === "lancamentos") {
      return mapped.filter(p => p.isNew);
    }
    return mapped.filter(p => p.category === categorySlug);
  });
