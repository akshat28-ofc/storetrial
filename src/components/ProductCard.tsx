import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="group product-card">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="product-card-overlay">
        <button 
          onClick={() => navigate(`/product/${product.id}`)}
          className="action-btn"
          title="View Details"
        >
          <Eye className="w-6 h-6" />
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart();
          }}
          className="action-btn"
          title="Add to Cart"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold tracking-wide">{product.name}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold">${product.price}</span>
          <span className="text-sm text-gray-400 capitalize">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;