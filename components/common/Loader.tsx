
import React, { useState, useEffect } from 'react';
import Icon from './Icon';

const loadingMessages = [
  "Analyzing market trends...",
  "Scouting for digital gold...",
  "Crafting winning ad copy...",
  "Identifying target audiences...",
  "Calibrating the AI autopilot...",
  "Finalizing your profit strategy...",
];

interface LoaderProps {
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if(!message) {
        const interval = setInterval(() => {
            setCurrentMessage(prev => {
                const currentIndex = loadingMessages.indexOf(prev);
                const nextIndex = (currentIndex + 1) % loadingMessages.length;
                return loadingMessages[nextIndex];
            });
        }, 2000);
        return () => clearInterval(interval);
    }
  }, [message]);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-lg">
      <Icon name="loading" className="w-16 h-16 text-indigo-400 animate-spin" />
      <p className="mt-4 text-xl font-semibold text-indigo-300">
        {message || currentMessage}
      </p>
      <p className="mt-2 text-gray-400">Please wait a moment.</p>
    </div>
  );
};

export default Loader;
