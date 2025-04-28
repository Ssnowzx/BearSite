"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from './Products';

interface HeaderProps {
  cartItems: Product[];
  isCartOpen: boolean;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  closeModal: () => void;
  openModal: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItems,
  isCartOpen,
  incrementQuantity,
  decrementQuantity,
  closeModal,
  openModal
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const headerStyle: React.CSSProperties = {
    backgroundColor: 'gray',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    zIndex: 1000
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: 'black',
    padding: '1.5rem 1.5rem 2rem 1.5rem',
    width: '280px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    position: 'relative',
    overflowY: 'auto',
    borderRadius: '8px',
    boxSizing: 'border-box'
  };

  const modalHeaderStyle: React.CSSProperties = {
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '1rem',
    marginBottom: '1rem',
    position: 'relative'
  };

  const closeIconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    border: 'none',
    background: 'none'
  };

  const cartItemStyle: React.CSSProperties = {
    display: 'flex',
    marginBottom: '1rem',
    borderBottom: '1px solid #ccc',
    paddingBottom: '1rem'
  };

  const cartItemImageStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    marginRight: '1rem',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.9rem'
  };

  const cartItemDetailsStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const quantityStyle: React.CSSProperties = {
    marginTop: '0.5rem'
  };

  const finalizeButtonStyle: React.CSSProperties = {
    marginTop: 'auto',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    padding: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem'
  };

  const notificationBadgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  };

  const totalItems = cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);
  const totalValue = cartItems.reduce((total, item) => total + (item.price * (item.quantity ?? 0)), 0);

  return (
    <>
      <header style={headerStyle}>
        <div>
          {/* Área para o logo */}
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <h1>Logo</h1>
          </Link>
        </div>
        <div style={{ position: 'relative' }}>
          {/* Ícone do carrinho */}
          <div onClick={openModal} style={{ cursor: 'pointer' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
              width="24"
              height="24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
              <circle cx="7" cy="21" r="1" fill="white"/>
              <circle cx="17" cy="21" r="1" fill="white"/>
            </svg>
            {mounted && cartItems.length > 0 && (
              <div style={notificationBadgeStyle}>{cartItems.length}</div>
            )}
          </div>
        </div>
      </header>
      {isCartOpen && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <div style={{ fontWeight: 'bold' }}>{totalItems} {totalItems === 1 ? 'Item' : 'Itens'}</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Carrinho de compras</div>
              <button onClick={closeModal} style={closeIconStyle} aria-label="Fechar carrinho">&times;</button>
            </div>
            {cartItems.length === 0 ? (
              <p>Carrinho vazio.</p>
            ) : (
              <>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cartItems.map(item => (
                    <li key={item.id} style={cartItemStyle}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={cartItemImageStyle} />
                      ) : (
                        <div style={cartItemImageStyle}>Sem imagem</div>
                      )}
                      <div style={cartItemDetailsStyle}>
                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                        <div>R$ {item.price.toFixed(2)}</div>
                        <div style={quantityStyle}>Quantidade: {item.quantity}</div>
                      </div>
                      <button onClick={() => decrementQuantity(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }} aria-label="Remover item">&times;</button>
                    </li>
                  ))}
                </ul>
                <div style={{ fontWeight: 'bold', marginTop: '1rem' }}>
                  Valor total: R$ {totalValue.toFixed(2)}
                </div>
                <button style={finalizeButtonStyle} onClick={() => alert('Finalizar compra clicado!')}>
                  Finalizar Compra
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
