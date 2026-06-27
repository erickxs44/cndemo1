// Sincroniza produtos da Nuvemshop para a tabela produtos_nuvemshop do Supabase
// Rode com: node scripts/sync-nuvemshop.js

const STORE_ID = '7800150';
const ACCESS_TOKEN = '8b8f9e2193c31a79474bd14e5d4d6aa18e20195a';
const SUPABASE_URL = 'https://sbqrugvbhqmtdjuowhqe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicXJ1Z3ZiaHFtdGRqdW93aHFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTgzNzUzNCwiZXhwIjoyMDk3NDEzNTM0fQ.G3Dv1ebVXWSCVWzsmDh8nTX0uSLW4cHBxX43ebDbhuE';

async function fetchProducts(page = 1) {
  const res = await fetch(`https://api.tiendanube.com/v1/${STORE_ID}/products?per_page=50&page=${page}`, {
    headers: {
      'Authentication': `bearer ${ACCESS_TOKEN}`,
      'User-Agent': 'CNStore/1.0 (erickxs44@gmail.com)',
    }
  });
  if (!res.ok) throw new Error(`Nuvemshop API error: ${res.status} - ${await res.text()}`);
  return res.json();
}

async function upsertToSupabase(products) {
  for (const p of products) {
    const variantId = p.variants?.[0]?.id || null;
    const imagem = p.images?.[0]?.src || null;
    const categoria = p.categories?.[0]?.name?.pt || 'Geral';

    let finalPrice = p.price ? parseFloat(p.price) : 0;
    if (finalPrice === 0 && p.variants && p.variants.length > 0 && p.variants[0].price) {
      finalPrice = parseFloat(p.variants[0].price);
    }

    const row = {
      id: p.id,
      nome: p.name?.pt || p.name?.es || p.name?.en || `Produto ${p.id}`,
      preco: finalPrice,
      imagem_url: imagem,
      variant_id: variantId,
      categoria: categoria,
      variations: p.variants || [],
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/produtos_nuvemshop?on_conflict=id`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify(row)
    });

    const status = res.status;
    if (status === 200 || status === 201 || status === 204) {
      console.log(`✅ [${p.id}] ${row.nome} — R$${row.preco} — ${categoria}`);
    } else {
      const err = await res.text();
      console.error(`❌ [${p.id}] ${row.nome}: ${err}`);
    }
  }
}

async function main() {
  console.log('🔄 Sincronizando Nuvemshop → Supabase (produtos_nuvemshop)...\n');
  let page = 1, total = 0;

  while (true) {
    const products = await fetchProducts(page);
    if (!products || products.length === 0) break;
    console.log(`📦 Página ${page}: ${products.length} produto(s)`);
    await upsertToSupabase(products);
    total += products.length;
    if (products.length < 50) break;
    page++;
  }

  console.log(`\n✅ Pronto! ${total} produto(s) sincronizado(s).`);
}

main().catch(err => { console.error('❌ Erro:', err.message); process.exit(1); });
