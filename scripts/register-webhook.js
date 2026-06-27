const STORE_ID = '7800150';
const ACCESS_TOKEN = '8b8f9e2193c31a79474bd14e5d4d6aa18e20195a';
const WEBHOOK_URL = 'https://cndemo1.vercel.app/api/webhooks/nuvemshop';

const EVENTS = ["product/created", "product/updated", "product/deleted"];

async function registerWebhooks() {
  console.log(`Registrando webhooks para a loja ${STORE_ID}...`);
  console.log(`URL de destino: ${WEBHOOK_URL}\n`);

  for (const event of EVENTS) {
    try {
      const response = await fetch(`https://api.tiendanube.com/v1/${STORE_ID}/webhooks`, {
        method: 'POST',
        headers: {
          'Authentication': `bearer ${ACCESS_TOKEN}`,
          'User-Agent': 'CN-Store-Headless (contato@cnstore.com.br)',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event: event,
          url: WEBHOOK_URL
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`✅ Sucesso! Webhook [${event}] registrado com o ID: ${data.id}`);
      } else {
        if (data.code === 422) {
          console.log(`⚠️ Aviso: Webhook [${event}] já está registrado para esta URL.`);
        } else {
          console.error(`❌ Erro ao registrar [${event}]:`, data.message || data);
        }
      }
    } catch (err) {
      console.error(`❌ Erro de conexão ao registrar [${event}]:`, err.message);
    }
  }
  
  console.log("\nProcesso finalizado!");
}

registerWebhooks();
