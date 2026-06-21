import { createServerFn } from '@tanstack/react-start';
import { createCart, updateCart, getCart, CartItem } from '../nuvemshop/cart';

export const getCartFn = createServerFn({ method: 'GET' })
  .validator((d: number) => d)
  .handler(async ({ data: cartId }) => {
    return getCart(cartId);
  });

export const createCartFn = createServerFn({ method: 'POST' })
  .validator((items: CartItem[]) => items)
  .handler(async ({ data: items }) => {
    return createCart(items);
  });

export const updateCartFn = createServerFn({ method: 'POST' })
  .validator((d: { cartId: number; items: CartItem[] }) => d)
  .handler(async ({ data }) => {
    return updateCart(data.cartId, data.items);
  });
