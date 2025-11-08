
import React from 'react';
import Icon from './common/Icon';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-center text-center">
        <Icon name="rocket" className="w-10 h-10 mr-4 text-indigo-400" />
        <div>
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                AI Digital Product Flipper
            </h1>
            <p className="text-indigo-300">Your Autopilot for Digital Profits</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
