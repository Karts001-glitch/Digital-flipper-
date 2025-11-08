import React from 'react';
import Icon from './common/Icon';
import PaymentButton from './common/PaymentButton';

interface SubscriptionViewProps {
  onSubscribe: () => void;
}

const Feature: React.FC<{ icon: 'rocket' | 'globe' | 'chatBubble' | 'check'; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <Icon name={icon} className="h-6 w-6" />
            </div>
        </div>
        <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-white">{title}</h3>
            <p className="mt-2 text-base text-gray-400">{description}</p>
        </div>
    </div>
);


const SubscriptionView: React.FC<SubscriptionViewProps> = ({ onSubscribe }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
                <Icon name="rocket" className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    Unlock Your AI Profit Engine
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                    Join now to get unlimited access to AI-powered tools for finding and flipping digital assets.
                </p>
            </div>
            
            <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-indigo-300">Features Included:</h2>
                    <dl className="mt-6 space-y-6">
                       <Feature icon="rocket" title="AI Product Flipper" description="Discover hot digital products with high profit margins, identified by our advanced AI."/>
                       <Feature icon="globe" title="AI Domain Flipper" description="Find valuable, brandable domains with modern TLDs, ready to be flipped for profit."/>
                       <Feature icon="chatBubble" title="Expert AI Guide" description="Get 24/7 access to an AI marketing and sales expert to guide your strategy."/>
                       <Feature icon="check" title="Autopilot Marketing" description="Generate complete marketing campaigns and sales pitches with a single click."/>
                    </dl>
                </div>
                <div className="p-8 bg-gray-800/50 rounded-b-xl lg:rounded-r-xl lg:rounded-b-none flex flex-col justify-center">
                    <div className="text-center">
                        <p className="text-lg font-medium text-gray-300">Weekly Access</p>
                        <p className="mt-2 text-5xl font-extrabold text-white">
                            $36
                        </p>
                        <p className="mt-2 text-gray-400">per week, cancel anytime.</p>
                    </div>
                    <div className="mt-8 space-y-3">
                        <PaymentButton iconName="visa" label="Pay with Visa" onClick={onSubscribe} />
                        <PaymentButton iconName="stripe" label="Pay with Stripe" onClick={onSubscribe} />
                        <PaymentButton iconName="paypal" label="Pay with PayPal" onClick={onSubscribe} />
                        <PaymentButton iconName="googlePay" label="Pay with Google Pay" onClick={onSubscribe} />
                    </div>
                    <p className="text-xs text-yellow-400 bg-yellow-900/50 border border-yellow-600 rounded-md p-2 mt-6 text-center">
                        This is a simulation for demonstration purposes. No real payment will be processed.
                    </p>
                </div>
            </div>
        </div>
         <footer className="text-center p-4 text-gray-500 text-xs mt-8">
            Powered by Gemini AI.
        </footer>
    </div>
  );
};

export default SubscriptionView;