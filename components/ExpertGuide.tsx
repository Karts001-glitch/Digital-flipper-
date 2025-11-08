import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { getExpertAdvice } from '../services/geminiService';
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
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const modelResponse = await getExpertAdvice([...messages], input.trim());
      const modelMessage: ChatMessage = { role: 'model', content: modelResponse };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." };
      setMessages(prev => [...prev, errorMessage]);
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
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0"><Icon name="chatBubble" className="w-5 h-5 text-white"/></div>
                <div className="max-w-xs md:max-w-md lg:max-w-xs xl:max-w-sm rounded-lg px-4 py-2 bg-gray-700 text-gray-200 flex items-center">
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse mr-2"></div>
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse mr-2 delay-150"></div>
                    <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-300"></div>
                </div>
            </div>
        )}
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