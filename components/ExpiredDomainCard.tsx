
import React from 'react';
import type { ExpiredDomain } from '../types';
import Icon from './common/Icon';

interface ExpiredDomainCardProps {
  domain: ExpiredDomain;
  onSelect: (domain: ExpiredDomain) => void;
}

const ExpiredDomainCard: React.FC<ExpiredDomainCardProps> = ({ domain, onSelect }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
      <div className="p-6 flex-grow">
        <span className="inline-block bg-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full mb-2 uppercase">
          {domain.category}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2 font-mono">{domain.domainName}</h3>
        
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="bg-gray-700 p-2 rounded-md">
            <p className="text-gray-400">Acquisition Cost</p>
            <p className="font-bold text-red-400">${domain.acquisitionCost.toFixed(2)}</p>
          </div>
          <div className="bg-gray-700 p-2 rounded-md">
            <p className="text-gray-400">Potential Value</p>
            <p className="font-bold text-green-400">{domain.potentialValue}</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm">
            <span className="font-semibold text-gray-300">AI's Reasoning: </span>
            {domain.reasoning}
        </p>
      </div>
      <button 
        onClick={() => onSelect(domain)} 
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold py-3 px-4 flex items-center justify-center"
      >
        <Icon name="globe" className="mr-2 w-5 h-5"/>
        Flip this Domain
      </button>
    </div>
  );
};

export default ExpiredDomainCard;