import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
      <div className="p-6 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/4 mb-3"></div>
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-10 bg-gray-700 rounded w-full mb-6"></div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="h-16 bg-gray-700 rounded-md"></div>
          <div className="h-16 bg-gray-700 rounded-md"></div>
        </div>
        <div className="h-20 bg-gray-900 rounded-lg"></div>
      </div>
      <div className="h-12 bg-gray-700/50"></div>
    </div>
  );
};

export default SkeletonCard;
