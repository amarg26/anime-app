import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { Product } from '../api/types/Product';

export type CartItem = Product & { qty: number };

type CartState = { items: Record<string, CartItem> };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (p: Product, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

type Action =
  | { type: 'ADD'; product: Product; qty?: number }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };

const STORAGE_KEY = 'cart-state-v1';
const CartContext = createContext<CartContextValue | undefined>(undefined);

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const { product, qty = 1 } = action;
      const prev = state.items[product.id];
      const nextQty = (prev?.qty ?? 0) + qty;
      return {
        items: { ...state.items, [product.id]: { ...product, qty: nextQty } },
      };
    }
    case 'SET_QTY': {
      const next = { ...state.items };
      if (action.qty <= 0) {
        delete next[action.id];
      } else if (next[action.id]) {
        next[action.id] = { ...next[action.id], qty: action.qty };
      }
      return { items: next };
    }
    case 'REMOVE': {
      const next = { ...state.items };
      delete next[action.id];
      return { items: next };
    }
    case 'CLEAR':
      return { items: {} };
    default:
      return state;
  }
}

function initFromStorage(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartState;
      if (parsed?.items) return parsed;
    }
  } catch {}
  return { items: {} };
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [state, dispatch] = useReducer(reducer, undefined, initFromStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const value: CartContextValue = useMemo(() => {
    const items = Object.values(state.items);
    const count = items.reduce((acc, it) => acc + it.qty, 0);
    const subtotal = items.reduce((acc, it) => acc + it.qty * it.price, 0);
    return {
      items,
      count,
      subtotal,
      addItem: (product, qty = 1) => dispatch({ type: 'ADD', product, qty }),
      updateQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      removeItem: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
