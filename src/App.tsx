import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { products } from './data/products';
import Store from './pages/Store';
import ProductDetails from './pages/ProductDetails';
import CartModal from './components/CartModal';

export type CartItem = { id: string; quantity: number };

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#14141B] text-white">
        <Routes>
          <Route 
            path="/" 
            element={
              <Store 
                cart={cart}
                setIsCartOpen={setIsCartOpen}
                addToCart={addToCart}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetails 
                cart={cart}
                setIsCartOpen={setIsCartOpen}
                addToCart={addToCart}
              />
            } 
          />
        </Routes>

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          setCart={setCart}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;