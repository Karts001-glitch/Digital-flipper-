
import React from 'react';
import type { MarketingPlan, Product } from '../types';
import Loader from './common/Loader';
import Icon from './common/Icon';

interface MarketingAutopilotProps {
  product: Product | null;
  plan: MarketingPlan | null;
  isLoading: boolean;
  onLaunch: () => void;
  onBack: () => void;
}

const PlanSection: React.FC<{ icon: 'target' | 'megaphone' | 'pitch' | 'check'; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 mb-4">
    <h3 className="text-lg font-semibold text-indigo-300 flex items-center mb-2">
      <Icon name={icon} className="w-5 h-5 mr-2" />
      {title}
    </h3>
    <div className="text-gray-300 text-sm">{children}</div>
  </div>
);

const MarketingAutopilot: React.FC<MarketingAutopilotProps> = ({ product, plan, isLoading, onLaunch, onBack }) => {
  if (isLoading || !plan) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 h-full flex flex-col items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-indigo-300">AI Marketing Plan Generated!</h2>
          <p className="text-gray-400">Autopilot is ready for: <span className="font-bold text-white">{plan.productName}</span></p>
        </div>
        <button onClick={onBack} className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors">Back</button>
      </div>

      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        <PlanSection icon="target" title="Target Audience">
          <p>{plan.targetAudience}</p>
        </PlanSection>
        
        <PlanSection icon="megaphone" title="Marketing Channels">
          <ul className="list-disc list-inside">
            {plan.marketingChannels.map(channel => <li key={channel}>{channel}</li>)}
          </ul>
        </PlanSection>

        <PlanSection icon="pitch" title="Sales Pitch">
          <p className="italic">"{plan.salesPitch}"</p>
        </PlanSection>

        <div>
            <h3 className="text-lg font-semibold text-indigo-300 flex items-center mb-2">
                <Icon name="check" className="w-5 h-5 mr-2" />
                Ad Copy
            </h3>
            <div className="space-y-4">
                {plan.adCopy.map(ad => (
                    <div key={ad.platform} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <h4 className="font-bold text-md text-white">{ad.platform} Ad</h4>
                        <p className="text-sm text-gray-400 mt-1"><span className="font-semibold text-gray-300">Headline:</span> {ad.headline}</p>
                        <p className="text-sm text-gray-400 mt-1"><span className="font-semibold text-gray-300">Body:</span> {ad.body}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
      <button 
        onClick={onLaunch}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 transition-colors text-white font-bold py-4 px-4 rounded-lg flex items-center justify-center text-lg">
        <Icon name="rocket" className="mr-3 w-6 h-6"/>
        Launch Autopilot Campaign
      </button>
    </div>
  );
};

export default MarketingAutopilot;
