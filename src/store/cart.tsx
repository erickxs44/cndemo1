import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/lib/store-data";
import { createCartFn, updateCartFn } from "@/lib/queries/cart";

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (item: CartItem) => void;
  remove: (idx: number) => void;
  updateQty: (idx: number, q: number) => void;
  total: number;
  count: number;
  checkout: () => void;
  isSyncing: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [nuvemshopCartId, setNuvemshopCartId] = useState<number | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("nuvemshop_cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id) setNuvemshopCartId(parsed.id);
        if (parsed.url) setCheckoutUrl(parsed.url);
      } catch (e) {}
    }
  }, []);

  const syncCartWithNuvemshop = async (newItems: CartItem[]) => {
    setIsSyncing(true);
    try {
      const payload = newItems.map(item => ({
        variant_id: parseInt(item.product.variantId || "0", 10),
        quantity: item.quantity
      })).filter(i => i.variant_id > 0);
      
      if (payload.length === 0) return;

      let cart;
      if (nuvemshopCartId) {
        cart = await updateCartFn({ data: { cartId: nuvemshopCartId, items: payload } });
      } else {
        cart = await createCartFn({ data: payload });
      }
      
      setNuvemshopCartId(cart.id);
      setCheckoutUrl(cart.checkout_url);
      
      localStorage.setItem("nuvemshop_cart", JSON.stringify({
        id: cart.id,
        url: cart.checkout_url,
      }));
    } catch (err) {
      console.error("Failed to sync cart", err);
    } finally {
      setIsSyncing(false);
    }
  };

  const add = (item: CartItem) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.product.id === item.product.id && x.size === item.size && x.color === item.color);
      let newItems = [...prev];
      if (i >= 0) {
        newItems[i] = { ...newItems[i], quantity: newItems[i].quantity + item.quantity };
      } else {
        newItems = [...prev, item];
      }
      // Fire async sync without blocking UI
      syncCartWithNuvemshop(newItems);
      return newItems;
    });
    setOpen(true);
  };

  const remove = (idx: number) => setItems(prev => {
    const newItems = prev.filter((_, i) => i !== idx);
    syncCartWithNuvemshop(newItems);
    return newItems;
  });

  const updateQty = (idx: number, q: number) => setItems(prev => {
    const newItems = prev.map((it, i) => i === idx ? { ...it, quantity: Math.max(1, q) } : it);
    syncCartWithNuvemshop(newItems);
    return newItems;
  });

  const checkout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      console.warn("Checkout URL not available yet");
    }
  };

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, open, setOpen, add, remove, updateQty, total, count, checkout, isSyncing }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
