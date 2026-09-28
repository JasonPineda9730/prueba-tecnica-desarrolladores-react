import { createContext, useCallback, useMemo, useState } from 'react';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const addItem = useCallback((product, quantity = 1) => {
    const amount = Number(quantity);
    const stock = product?.stock == null || product.stock === '' ? Infinity : Number(product.stock);
    if (product?.id == null || !Number.isInteger(amount) || amount < 1) {
      return { success: false, message: 'Selecciona una cantidad válida.' };
    }
    if (!Number.isFinite(Number(product.price)) || Number(product.price) < 0) {
      return { success: false, message: 'No podemos agregar un producto con precio inválido.' };
    }
    if (Number.isNaN(stock) || stock < 0) {
      return { success: false, message: 'No podemos confirmar el stock de este producto.' };
    }
    const existingItem = cartItems.find((item) => item.id === product.id);
    // El límite se comprueba contra lo que ya está en el carrito, no solo contra el nuevo incremento.
    const nextQuantity = (existingItem?.quantity || 0) + amount;
    if (Number.isFinite(stock) && nextQuantity > stock) {
      return { success: false, message: 'No hay suficiente stock para esa cantidad.' };
    }
    setCartItems((currentItems) => {
      const currentItem = currentItems.find((item) => item.id === product.id);
      if (currentItem) {
        return currentItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + amount } : item);
      }
      return [...currentItems, { ...product, quantity: amount }];
    });
    return { success: true, message: 'Agregado al carrito.' };
  }, [cartItems]);
  const removeItem = useCallback((id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);
  const clearCart = useCallback(() => setCartItems([]), []);
  const getItemQuantity = useCallback((id) => cartItems.find((item) => item.id === id)?.quantity || 0, [cartItems]);
  const totalQuantity = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const total = useMemo(() => cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [cartItems]);
  const value = useMemo(() => ({ cartItems, addItem, removeItem, clearCart, getItemQuantity, totalQuantity, total }), [cartItems, addItem, removeItem, clearCart, getItemQuantity, totalQuantity, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}