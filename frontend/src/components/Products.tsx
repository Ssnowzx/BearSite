"use client";

import React from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity?: number;
}

interface ProductsProps {
  addToCart: (product: Product) => void;
}

const products: Product[] = [
  { id: 1, name: "Tênis Super Lowpro Black", description: "Descrição do produto 1", price: 549.99, image: "/img/produto1.png" },
  { id: 2, name: "Produto 2", description: "Descrição do produto 2", price: 200, image: "/img/produto2.png" },
  { id: 3, name: "Produto 3", description: "Descrição do produto 3", price: 300, image: "/img/produto3.png" },
  { id: 4, name: "Produto 4", description: "Descrição do produto 4", price: 400, image: "/img/produto4.png" }
];

const Products: React.FC<ProductsProps> = ({ addToCart }) => {
  return (
    <section style={{ padding: "1rem", color: "white", marginLeft: "4cm", marginRight: "4cm" }}>
      <h2 style={{ marginBottom: "1rem", textAlign: "center", fontSize: "52px" }}>Produtos</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {products.map(product => (
          <div key={product.id} style={{ backgroundColor: "#222", padding: "1rem", borderRadius: "8px", flex: "1 1 calc(25% - 1rem)", boxSizing: "border-box", width: "calc(25% - 1rem)", height: "calc(25% - 1rem)", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={product.image} alt={product.name} style={{ maxWidth: "100%", maxHeight: "50%", objectFit: "contain", marginBottom: "0.5rem" }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>R$ {product.price.toFixed(2)}</strong></p>
            <button
              onClick={() => addToCart(product)}
              style={{
                marginTop: "auto",
                backgroundColor: "black",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                fontWeight: "bold",
                borderRadius: "4px"
              }}
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
