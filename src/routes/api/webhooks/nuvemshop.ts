import { createAPIFileRoute } from '@tanstack/react-start/api';
import { getProductById } from '../../../lib/nuvemshop/products';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export const APIRoute = createAPIFileRoute('/api/webhooks/nuvemshop')({
  POST: async ({ request }) => {
    try {
      // Nuvemshop typically sends JSON payload
      const body = await request.json();
      const { store_id, event, id } = body;

      // Verify the store_id matches our store (optional security check)
      if (store_id !== parseInt(process.env.NUVEMSHOP_STORE_ID || '0')) {
        return new Response('Unauthorized Store ID', { status: 401 });
      }

      // Handle product events
      if (event === 'product/created' || event === 'product/updated') {
        const p = await getProductById(id);

        if (!p) {
          return new Response('Product not found in API', { status: 404 });
        }

        let stock = 0;
        if (p.variants && p.variants.length > 0) {
          stock = p.variants.reduce((acc, v) => acc + (v.stock || 0), 0);
        } else if (p.stock) {
          stock = p.stock;
        }

        const productData = {
          id: p.id,
          name: p.name?.pt || JSON.stringify(p.name),
          price: p.price ? parseFloat(p.price) : 0,
          promotional_price: p.promotional_price ? parseFloat(p.promotional_price) : null,
          images: p.images || [],
          variations: p.variants || [],
          stock: stock,
          updated_at: new Date().toISOString()
        };

        const { error } = await supabaseAdmin
          .from('products')
          .upsert(productData, { onConflict: 'id' });

        if (error) {
          console.error('Webhook upsert error:', error);
          throw new Error('Supabase upsert failed');
        }

        return new Response(JSON.stringify({ success: true, message: `Product ${id} synced` }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (event === 'product/deleted') {
        const { error } = await supabaseAdmin
          .from('products')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error('Webhook delete error:', error);
          throw new Error('Supabase delete failed');
        }

        return new Response(JSON.stringify({ success: true, message: `Product ${id} deleted` }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Other events are ignored
      return new Response(JSON.stringify({ success: true, message: 'Event ignored' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error: any) {
      console.error('Webhook Error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
});
