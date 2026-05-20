import { create } from "zustand";
import type { MenuItem } from "./menu";

type CartItem = MenuItem & { qty: number };

type CartState = {
  items: CartItem[];
  tableNumber: string | null;
  setTable: (t: string) => void;
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  total: () => number;
  estMins: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  tableNumber: null,
  setTable: (t) => set({ tableNumber: t }),
  add: (item) =>
    set((s) => {
      const existing = s.items.find((i) => i.id === item.id);
      if (existing) return { items: s.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)) };
      return { items: [...s.items, { ...item, qty: 1 }] };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  inc: (id) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) })),
  dec: (id) =>
    set((s) => ({
      items: s.items.flatMap((i) => (i.id === id ? (i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []) : [i])),
    })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
  estMins: () => Math.max(0, ...get().items.map((i) => i.prepMins)) + 5,
}));
