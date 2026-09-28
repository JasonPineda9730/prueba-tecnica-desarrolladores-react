import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const contextSource = (await readFile(new URL('../src/context/CartContext.jsx', import.meta.url), 'utf8'))
  .replace(/^import .*react';\r?\n/m, '')
  .replace('export const CartContext = createContext(null);', 'const CartContext = {};')
  .replace('export function CartProvider({ children }) {', 'function CartProvider({ children }) {')
  .replace('return <CartContext.Provider value={value}>{children}</CartContext.Provider>;', 'return { cartItems, addItem, removeItem, clearCart, getItemQuantity, totalQuantity, total };');
const CartProvider = new Function('createContext', 'useCallback', 'useMemo', 'useState', `${contextSource}; return CartProvider;`)(
  () => ({}),
  (callback) => callback,
  (factory) => factory(),
  (initialValue) => [initialValue, () => {}],
);

function createCart() {
  let state = [];
  const render = () => new Function('createContext', 'useCallback', 'useMemo', 'useState', `
    ${contextSource}
    return CartProvider;
  `)(() => ({}), (callback) => callback, (factory) => factory(), (initialValue) => [state.length ? state : initialValue, (update) => { state = typeof update === 'function' ? update(state) : update; }])({ children: null });

  return {
    addItem: (...args) => render().addItem(...args),
    removeItem: (...args) => render().removeItem(...args),
    clearCart: (...args) => render().clearCart(...args),
    getItemQuantity: (...args) => render().getItemQuantity(...args),
    get cartItems() { return render().cartItems; },
    get totalQuantity() { return render().totalQuantity; },
    get total() { return render().total; },
  };
}

test('adds a product and increments its existing quantity without duplicates', () => {
  const cart = createCart();
  const product = { id: 7, title: 'Headphones', price: 40, stock: 8 };

  assert.equal(cart.addItem(product, 2).success, true);
  assert.equal(cart.addItem(product, 1).success, true);
  assert.equal(cart.cartItems.length, 1);
  assert.equal(cart.cartItems[0].quantity, 3);
  assert.equal(cart.getItemQuantity(7), 3);
});

test('rejects invalid quantity and stock overflow', () => {
  const cart = createCart();
  const product = { id: 4, price: 25, stock: 2 };

  assert.equal(cart.addItem(product, 0).success, false);
  assert.equal(cart.addItem(product, 3).success, false);
  assert.equal(cart.cartItems.length, 0);
});

test('removes one product and calculates quantity and total', () => {
  const cart = createCart();
  cart.addItem({ id: 1, price: 12.5, stock: 5 }, 2);
  cart.addItem({ id: 2, price: 7, stock: 5 }, 3);

  assert.equal(cart.totalQuantity, 5);
  assert.equal(cart.total, 46);
  cart.removeItem(1);
  assert.equal(cart.cartItems.length, 1);
  assert.equal(cart.total, 21);
});

test('clears all cart items and returns empty totals', () => {
  const cart = createCart();
  cart.addItem({ id: 1, price: 10, stock: 4 }, 2);
  cart.clearCart();

  assert.deepEqual(cart.cartItems, []);
  assert.equal(cart.totalQuantity, 0);
  assert.equal(cart.total, 0);
});