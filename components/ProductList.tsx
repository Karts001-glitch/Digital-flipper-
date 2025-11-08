import React from 'react';
import type { Product } from '../types';
import ProductCard from './ProductCard';
import SkeletonCard from './common/SkeletonCard';
import Icon from './common/Icon';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isBackgroundLoading: boolean;
  onSelectProduct: (product: Product) => void;
  onRefresh: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading, isBackgroundLoading, onSelectProduct, onRefresh }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-300 flex items-center">
              Find Your Next Flip
              {isBackgroundLoading && <div title="Refreshing in background..." className="ml-3 w-3 h-3 bg-indigo-400 rounded-full animate-pulse"></div>}
            </h2>
            <button 
                onClick={onRefresh}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors">
                <Icon name="refresh" className={`w-5 h-5 mr-2 ${isLoading && !isBackgroundLoading ? 'animate-spin' : ''}`} />
                {isLoading && !isBackgroundLoading ? 'Searching...' : 'New Ideas'}
            </button>
        </div>
        <p className="text-gray-400 mb-6">Here are the latest digital product opportunities discovered by our AI. Choose one to launch a sales campaign.</p>
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading && products.length === 0 ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    products.map((p, index) => (
                        <ProductCard key={`${p.productName}-${index}`} product={p} onSelect={onSelectProduct} />
                    ))
                )}
            </div>
        </div>
    </div>
  );
};

export default ProductList;