import { createContext, useState, useEffect } from 'react';

// Создаем сам контекст
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Инициализируем корзину, пытаясь достать данные из LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Каждый раз, когда корзина меняется, сохраняем её в LocalStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Функция добавления товара
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        // Если товар уже есть, увеличиваем количество
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Если товара нет, добавляем его с количеством 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Функция удаления товара
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Функция очистки всей корзины (понадобится для оформления заказа)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};