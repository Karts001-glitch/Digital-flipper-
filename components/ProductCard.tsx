
import React from 'react';
import type { Product } from '../types';
import Icon from './common/Icon';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const potentialProfit = product.suggestedSalePrice - product.estimatedAcquisitionCost;
  const profitMargin = (potentialProfit / product.suggestedSalePrice) * 100;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 flex flex-col group animate-fadeInUp">
      <div className="p-6 flex-grow">
        <span className="inline-block bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2 uppercase">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{product.productName}</h3>
        <p className="text-gray-400 text-sm mb-4">{product.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="bg-gray-700 p-2 rounded-md">
            <p className="text-gray-400">Acquisition Cost</p>
            <p className="font-bold text-red-400">${product.estimatedAcquisitionCost.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 p-2 rounded-md">
            <p className="text-gray-400">Sale Price</p>
            <p className="font-bold text-green-400">${product.suggestedSalePrice.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-gray-900 p-3 rounded-lg text-center group-hover:bg-gray-700/50 transition-colors">
            <p className="text-gray-300 font-semibold">Potential Profit</p>
            <p className="text-2xl font-bold text-green-300">${potentialProfit.toFixed(2)}</p>
            <p className="text-xs text-indigo-300">({profitMargin.toFixed(0)}% Margin)</p>
        </div>
      </div>
      <button 
        onClick={() => onSelect(product)} 
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold py-3 px-4 flex items-center justify-center"
      >
        <Icon name="rocket" className="mr-2 w-5 h-5"/>
        Start AI Autopilot
      </button>
    </div>
  );
};

export default ProductCard;