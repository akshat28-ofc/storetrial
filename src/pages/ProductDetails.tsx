import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import Navbar from '../components/Navbar';
import { CartItem } from '../App';

interface ProductDetailsProps {
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (productId: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ cart, setIsCartOpen, addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-white/80 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }
    setIsCartOpen(true);
  };

  return (
    <>
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <button 
          onClick={() => navigate('/')}
          className="text-white/80 hover:text-white flex items-center gap-2 mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Store</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Product Images */}
          <div className="space-y-8">
            {/* Main Image */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                width={600}
                height={600}
              />
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col lg:pt-12">
            <div className="mb-8">
              <div className="text-orange-500 font-medium uppercase tracking-wider mb-4">
                {product.category}
              </div>
              <h1 className="text-5xl font-bold mb-6 tracking-wide leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {product.description}
              </p>
            </div>

            <div className="space-y-8">
              {/* Price Section */}
              <div className="flex items-end gap-4">
                <span className="text-4xl font-bold">${product.price}</span>
                <span className="text-gray-400 line-through mb-1">${(product.price * 1.5).toFixed(2)}</span>
                <span className="text-orange-500 font-medium mb-1">50% OFF</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-6">
                <span className="text-gray-400">Quantity</span>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-white text-[#14141B] rounded-full font-bold hover:bg-white/90 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;