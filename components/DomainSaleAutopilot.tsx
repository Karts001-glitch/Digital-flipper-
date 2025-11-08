
import React, { useState, useEffect } from 'react';
import type { ExpiredDomain, DomainSalePitch } from '../types';
import Loader from './common/Loader';
import Icon from './common/Icon';

interface DomainSaleAutopilotProps {
  domain: ExpiredDomain | null;
  pitch: DomainSalePitch | null;
  isLoading: boolean;
  onLaunch: (price: number) => void;
  onBack: () => void;
}

const PitchSection: React.FC<{ icon: 'pitch' | 'check'; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mb-4">
    <h3 className="text-lg font-semibold text-indigo-300 flex items-center mb-2">
      <Icon name={icon} className="w-5 h-5 mr-2" />
      {title}
    </h3>
    <div className="text-gray-300 text-sm whitespace-pre-wrap">{children}</div>
  </div>
);

const DomainSaleAutopilot: React.FC<DomainSaleAutopilotProps> = ({ domain, pitch, isLoading, onLaunch, onBack }) => {
  const [listingPrice, setListingPrice] = useState<string>('');

  useEffect(() => {
    if (domain) {
      const suggestedPrice = parseInt(domain.potentialValue.replace(/[^0-9-]/g, '').split('-')[0].trim(), 10) || 500;
      setListingPrice(suggestedPrice.toString());
    }
  }, [domain]);


  if (isLoading || !pitch || !domain) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 h-full flex flex-col items-center justify-center">
        <Loader message="Generating professional sales pitch..." />
      </div>
    );
  }

  const handleLaunchClick = () => {
    const price = parseFloat(listingPrice);
    if (!isNaN(price) && price > 0) {
      onLaunch(price);
    } else {
      alert('Please enter a valid listing price.');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-indigo-300">AI Sales Pitch Generated!</h2>
          <p className="text-gray-400">Ready to sell: <span className="font-bold text-white font-mono">{domain.domainName}</span></p>
        </div>
        <button onClick={onBack} className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors">Back</button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        <PitchSection icon="pitch" title="Listing Headline">
          <p className="font-bold text-lg text-white">{pitch.headline}</p>
        </PitchSection>
        
        <PitchSection icon="check" title="Detailed Description">
          <p>{pitch.description}</p>
        </PitchSection>

         <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-indigo-300 flex items-center mb-2">
                <Icon name="dollar" className="w-5 h-5 mr-2" />
                Set Your Listing Price
            </h3>
            <p className="text-sm text-gray-400 mb-2">The AI estimates this domain's value is <span className="font-bold text-green-300">{domain.potentialValue}</span>. Set your price below.</p>
            <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-400 sm:text-sm">$</span>
                </div>
                <input
                    type="number"
                    value={listingPrice}
                    onChange={(e) => setListingPrice(e.target.value)}
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 pl-7"
                    placeholder="e.g., 499"
                />
            </div>
        </div>
      </div>

      <button 
        onClick={handleLaunchClick}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 transition-colors text-white font-bold py-4 px-4 rounded-lg flex items-center justify-center text-lg">
        <Icon name="dollar" className="mr-3 w-6 h-6"/>
        List Domain For ${listingPrice || '...'}
      </button>
    </div>
  );
};

export default DomainSaleAutopilot;