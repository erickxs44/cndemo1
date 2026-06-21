import { createAPIFileRoute } from '@tanstack/react-start/api';
import { getProductById } from '../../../lib/nuvemshop/products';
import { supabaseAdmin } from '../../../lib/supabase-admin';

export const APIRoute = createAPIFileRoute('/api/webhooks/nuvemshop')({
  POST: async ({ request }) => {
    try {
      const body = await request.json();
      const { store_id, event, id } = body;

      if (store_id !== parseInt(process.env.NUVEMSHOP_STORE_ID || '0')) {
        return new Response('Unauthorized Store ID', { status: 401 });
      }

      if (event === 'product/created' || event === 'product/updated') {
        const p = await getProductById(id);
        if (!p) return new Response('Product not found in API', { status: 404 });

        let finalPrice = p.price ? parseFloat(p.price) : 0;
        if (finalPrice === 0 && p.variants && p.variants.length > 0 && p.variants[0].price) {
          finalPrice = parseFloat(p.variants[0].price);
        }

        const variantId = p.variants?.[0]?.id || null;
        const imagem = p.images?.[0]?.src || null;
        const categoria = p.categories?.[0]?.name?.pt || 'Geral';

        const row = {
          id: p.id,
          nome: p.name?.pt || p.name?.es || p.name?.en || `Produto ${p.id}`,
          preco: finalPrice,
          imagem_url: imagem,
          variant_id: variantId,
          categoria: categoria,
        };

        const { error } = await supabaseAdmin
          .from('produtos_nuvemshop')
          .upsert(row, { onConflict: 'id' });

        if (error) throw new Error('Supabase upsert failed');

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      if (event === 'product/deleted') {
        const { error } = await supabaseAdmin
          .from('produtos_nuvemshop')
          .delete()
          .eq('id', id);
        
        if (error) throw new Error('Supabase delete failed');

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ success: true, message: 'Event ignored' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error: any) {
      console.error('Webhook Error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }
});
