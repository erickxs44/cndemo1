import { nuvemshopFetch } from './client';

export interface CartItem {
  id?: number;
  variant_id: number;
  quantity: number;
}

export interface NuvemshopCart {
  id: number;
  checkout_url: string;
  total: string;
  subtotal: string;
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: string;
    variant_id: number;
  }>;
}

export async function getCart(cartId: number): Promise<NuvemshopCart> {
  return nuvemshopFetch<NuvemshopCart>(`/carts/${cartId}`);
}

export async function createCart(items: CartItem[]): Promise<NuvemshopCart> {
  // Nuvemshop doesn't have a public POST /carts API for headless checkouts.
  // We use the Draft Orders API to generate an abandoned_checkout_url.
  const payload = {
    contact_name: 'Visitante',
    contact_lastname: 'Loja',
    contact_email: 'checkout@cnstore1.lojavirtualnuvem.com.br',
    products: items.map(item => ({
      variant_id: item.variant_id,
      quantity: item.quantity
    }))
  };

  const response = await nuvemshopFetch<any>('/draft_orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return {
    id: response.id,
    checkout_url: response.abandoned_checkout_url,
    total: response.total,
    subtotal: response.subtotal,
    items: response.products || [],
  };
}

export async function updateCart(cartId: number, items: CartItem[]): Promise<NuvemshopCart> {
  // Update the draft order
  const payload = {
    products: items.map(item => ({
      variant_id: item.variant_id,
      quantity: item.quantity
    }))
  };

  const response = await nuvemshopFetch<any>(`/draft_orders/${cartId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return {
    id: response.id,
    checkout_url: response.abandoned_checkout_url,
    total: response.total,
    subtotal: response.subtotal,
    items: response.products || [],
  };
}
