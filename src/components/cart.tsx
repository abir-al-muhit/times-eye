import { createContext, useContext, useState, type ReactNode } from "react";
import type { Piece } from "../data/brand";

type CartItem = { product: Piece; qty: number };

const CartCtx = createContext<{
  items: CartItem[];
  open: boolean;
  add: (p: Piece) => void;
  setOpen: (v: boolean) => void;
  remove: (id: string) => void;
  count: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (p: Piece) => {
    setItems((prev) => {
      const ex = prev.find((i) => i.product.id === p.id);
      return ex
        ? prev.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { product: p, qty: 1 }];
    });
    setOpen(true);
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id));

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartCtx.Provider value={{ items, open, add, setOpen, remove, count }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}