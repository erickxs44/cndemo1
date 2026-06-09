import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/lib/store-data";

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
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (item: CartItem) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.product.id === item.product.id && x.size === item.size && x.color === item.color);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], quantity: copy[i].quantity + item.quantity };
        return copy;
      }
      return [...prev, item];
    });
    setOpen(true);
  };
  const remove = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx));
  const updateQty = (idx: number, q: number) => setItems(prev => prev.map((it, i) => i === idx ? { ...it, quantity: Math.max(1, q) } : it));

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, open, setOpen, add, remove, updateQty, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
