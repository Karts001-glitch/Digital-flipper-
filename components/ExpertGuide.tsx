import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { streamExpertAdvice } from '../services/geminiService';
import Icon from './common/Icon';

const ExpertGuide: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm your AI expert guide. How can I help you profit from digital products today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const currentInput = input.trim();
    const userMessage: ChatMessage = { role: 'user', content: currentInput };
    
    // Add user message and an empty placeholder for the model's response
    setMessages(prev => [...prev, userMessage, { role: 'model', content: '' }]);
    setInput('');
    setIsLoading(true);

    try {
      await streamExpertAdvice(
        [...messages, userMessage], // Send history including the new user message
        currentInput, 
        (chunk) => {
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            const updatedLastMessage = { ...lastMessage, content: lastMessage.content + chunk };
            return [...prev.slice(0, -1), updatedLastMessage];
          });
        }
      );
    } catch (error) {
      setMessages(prev => {
          const lastMessage = prev[prev.length - 1];
          const updatedLastMessage = { ...lastMessage, content: "Sorry, I'm having trouble connecting right now. Please try again later." };
          return [...prev.slice(0, -1), updatedLastMessage];
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
          handleSendMessage();
      }
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-indigo-300 flex items-center">
        <Icon name="chatBubble" className="mr-3"/>
        Expert Guide
      </h2>
      <div className="flex-grow overflow-y-auto mb-4 pr-2 -mr-2 space-y-4" style={{maxHeight: '300px'}}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
             {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"><Icon name="chatBubble" className="w-5 h-5 text-white"/></div>}
            <div className={`max-w-xs md:max-w-md lg:max-w-xs xl:max-w-sm rounded-lg px-4 py-2 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
              <p className="text-sm whitespace-pre-wrap">
                {msg.content}
                {isLoading && index === messages.length -1 && <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span>}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask for advice..."
          disabled={isLoading}
          className="flex-grow bg-gray-700 border-gray-600 text-white rounded-l-lg p-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold p-2 rounded-r-lg disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ExpertGuide;