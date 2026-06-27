import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/lib/store-data";
import { buildCheckoutUrl } from "@/lib/store-data";
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

  const checkout = async () => {
    if (items.length === 0) return;

    setIsSyncing(true);
    try {
      // Separate real Nuvemshop products (have a real variant_id from the API)
      // from mock/demo products (fake variant IDs like 10001, 20001, 30001)
      // Real synced products come from Supabase and have variant_id stored as-is from Nuvemshop
      const checkoutItems = items.map(item => ({
        variantId: item.product.variantId || "",
        quantity: item.quantity,
      })).filter(i => i.variantId !== "");

      if (checkoutItems.length === 0) {
        window.location.href = "https://cnstore1.lojavirtualnuvem.com.br";
        return;
      }

      // Build direct checkout URL — works for ALL products (real + mock)
      const directUrl = buildCheckoutUrl(checkoutItems);

      // For real products (not mock — mock IDs are 10001-30004), try Cart API
      // Real Nuvemshop variant_ids are large numbers (millions)
      const realItems = checkoutItems.filter(i => {
        const n = parseInt(i.variantId, 10);
        return n > 100000; // Real Nuvemshop variant IDs are large numbers
      });

      if (realItems.length > 0) {
        try {
          const apiPayload = realItems.map(i => ({
            variant_id: parseInt(i.variantId, 10),
            quantity: i.quantity,
          }));

          let cart;
          if (nuvemshopCartId) {
            cart = await updateCartFn({ data: { cartId: nuvemshopCartId, items: apiPayload } });
          } else {
            cart = await createCartFn({ data: apiPayload });
          }

          if (cart?.checkout_url) {
            setNuvemshopCartId(cart.id);
            setCheckoutUrl(cart.checkout_url);
            localStorage.setItem("nuvemshop_cart", JSON.stringify({ id: cart.id, url: cart.checkout_url }));
            window.location.href = cart.checkout_url;
            return;
          }
        } catch (apiErr) {
          console.warn("Cart API failed, falling back to direct URL:", apiErr);
        }
      }

      // Fallback: direct add-to-cart URL (always works)
      window.location.href = directUrl;
    } catch (err) {
      console.error("Checkout failed:", err);
      // Last resort: go to the store homepage
      window.location.href = "https://cnstore1.lojavirtualnuvem.com.br";
    } finally {
      setIsSyncing(false);
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
