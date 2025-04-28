"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Products, { Product } from '../components/Products';

const initialProducts: Product[] = [
  { id: 1, name: "Tênis Super Lowpro Black", description: "Descrição do produto 1", price: 549.99, quantity: 1, image: "/img/produto1.png" },
  { id: 2, name: "Produto 2", description: "Descrição do produto 2", price: 200, quantity: 1, image: "/img/produto2.png" },
  { id: 3, name: "Produto 3", description: "Descrição do produto 3", price: 300, quantity: 1, image: "/img/produto3.png" },
  { id: 4, name: "Produto 4", description: "Descrição do produto 4", price: 400, quantity: 1, image: "/img/produto4.png" }
];

export default function Home() {
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cartItems');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [newItemsCount, setNewItemsCount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems: Product[]) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setNewItemsCount(count => count + 1);
  };

  const incrementQuantity = (id: number) => {
    setCartItems((prevItems: Product[]) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
      )
    );
  };

  const decrementQuantity = (id: number) => {
    setCartItems((prevItems: Product[]) =>
      prevItems
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max((item.quantity ?? 1) - 1, 0) } : item
        )
        .filter(item => (item.quantity ?? 0) > 0)
    );
  };

  const openModal = () => {
    setIsCartOpen(true);
    setNewItemsCount(0);
  };

  const closeModal = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Header
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        openModal={openModal}
        closeModal={closeModal}
        newItemsCount={newItemsCount}
      />
      <Banner />
      <Products addToCart={addToCart} />
    </>
  );
}
