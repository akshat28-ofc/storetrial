import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { CartItem } from '../App';

type Category = 'all' | 'ebooks' | 'insights' | 'courses' | 'others';

interface StoreProps {
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (productId: string) => void;
}

const Store: React.FC<StoreProps> = ({ cart, setIsCartOpen, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const categories: Category[] = ['all', 'ebooks', 'insights', 'courses', 'others'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#14141B] to-[#1E1E2A]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#14141B]"></div>
        </div>
        <div className="container mx-auto px-4 text-center z-10 animate-fadeIn">
          <h1 className="text-6xl font-bold mb-6 tracking-wider">STOIC STORE</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover premium digital resources, insights, and courses designed to elevate your startup journey.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Store;