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
  return nuvemshopFetch<NuvemshopCart>('/carts', {
    method: 'POST',
    body: JSON.stringify({ items }),
  });
}

// In Nuvemshop API, to update a cart you typically use PUT on /carts/:id
export async function updateCart(cartId: number, items: CartItem[]): Promise<NuvemshopCart> {
  // It usually replaces the whole cart or updates it. According to the docs:
  return nuvemshopFetch<NuvemshopCart>(`/carts/${cartId}`, {
    method: 'PUT',
    body: JSON.stringify({ items }),
  });
}
