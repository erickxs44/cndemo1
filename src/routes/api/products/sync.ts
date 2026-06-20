import { createAPIFileRoute } from '@tanstack/react-start/api';
import { getProducts } from '../../../lib/nuvemshop/products';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export const APIRoute = createAPIFileRoute('/api/products/sync')({
  POST: async () => {
    try {
      const nuvemshopProducts = await getProducts();
      
      const productsToUpsert = nuvemshopProducts.map((p) => {
        let stock = 0;
        if (p.variants && p.variants.length > 0) {
          stock = p.variants.reduce((acc, v) => acc + (v.stock || 0), 0);
        } else if (p.stock) {
          stock = p.stock;
        }

        return {
          id: p.id,
          name: p.name?.pt || JSON.stringify(p.name),
          price: p.price ? parseFloat(p.price) : 0,
          promotional_price: p.promotional_price ? parseFloat(p.promotional_price) : null,
          images: p.images || [],
          variations: p.variants || [],
          stock: stock,
          updated_at: new Date().toISOString()
        };
      });

      const { error } = await supabaseAdmin
        .from('products')
        .upsert(productsToUpsert, { onConflict: 'id' });

      if (error) {
        console.error('Supabase upsert error:', error);
        throw new Error(`Failed to sync products: ${error.message}`);
      }

      return new Response(JSON.stringify({ success: true, count: productsToUpsert.length }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error: any) {
      console.error('Sync error:', error);
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
});
