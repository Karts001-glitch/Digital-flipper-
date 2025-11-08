import React from 'react';
import type { ExpiredDomain } from '../types';
import ExpiredDomainCard from './ExpiredDomainCard';
import SkeletonCard from './common/SkeletonCard';
import Icon from './common/Icon';

interface ExpiredDomainListProps {
  domains: ExpiredDomain[];
  isLoading: boolean;
  onSelectDomain: (domain: ExpiredDomain) => void;
  onRefresh: () => void;
}

const ExpiredDomainList: React.FC<ExpiredDomainListProps> = ({ domains, isLoading, onSelectDomain, onRefresh }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-indigo-300">Find Your Next Domain Flip</h2>
            <button 
                onClick={onRefresh}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors">
                <Icon name="refresh" className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Searching...' : 'New Domains'}
            </button>
        </div>
        <p className="text-gray-400 mb-6">The AI has scanned sources like GoDaddy and Dynadot to find these available domains. Choose one to generate a sales pitch.</p>
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {isLoading && domains.length === 0 ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    domains.map((d, index) => (
                        <ExpiredDomainCard key={`${d.domainName}-${index}`} domain={d} onSelect={onSelectDomain} />
                    ))
                )}
            </div>
        </div>
    </div>
  );
};

export default ExpiredDomainList;