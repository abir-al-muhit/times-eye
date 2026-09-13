import { createContext, useContext, useState, type ReactNode } from "react";
import type { Piece } from "../data/brand";

export type CartLine = {
  product: Piece;
  qty: number;
  meta?: string;   // "Frame · Lens · Rx"
  note?: string;   // full summary
  key: string;     // unique line key (product + config)
};

const CartCtx = createContext<{
  items: CartLine[];
  open: boolean;
  add: (p: Piece, conf?: { label: string; qty: number; note: string }) => void;
  setOpen: (v: boolean) => void;
  remove: (key: string) => void;
  count: number;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add = (p: Piece, conf?: { label: string; qty: number; note: string }) => {
    setItems((prev) => {
      const key = conf ? `${p.id}::${conf.label}` : p.id;
      const ex = prev.find((i) => i.key === key);
      if (ex) return prev;
      return [...prev, { product: p, qty: conf?.qty ?? 1, meta: conf?.label, note: conf?.note, key }];
    });
    setOpen(true);
  };

  const remove = (key: string) => setItems((prev) => prev.filter((i) => i.key !== key));

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