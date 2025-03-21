import React from 'react';
import { X } from 'lucide-react';
import { products } from '../data/products';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Array<{ id: string; quantity: number }>;
  setCart: React.Dispatch<React.SetStateAction<Array<{ id: string; quantity: number }>>>;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cart, setCart }) => {
  if (!isOpen) return null;

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.id)!
  }));

  const total = cartItems.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-[#1E1E2A] w-full max-w-md p-6 h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold">{product.name}</h3>
                    <p className="text-gray-400">${product.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2 py-1 bg-white/10 rounded"
                      >-</button>
                      <span>{quantity}</span>
                      <button 
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2 py-1 bg-white/10 rounded"
                      >+</button>
                      <button 
                        onClick={() => removeFromCart(product.id)}
                        className="ml-auto text-red-400 hover:text-red-300"
                      >Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full py-3 bg-white text-[#14141B] rounded-full font-bold hover:bg-white/90 transition-colors">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartModal;