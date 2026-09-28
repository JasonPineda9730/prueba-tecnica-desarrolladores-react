import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems] = useState([]);
  const totalQuantity = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const value = useMemo(() => ({ cartItems, totalQuantity }), [cartItems, totalQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}