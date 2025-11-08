
import React from 'react';
import type { Tool } from '../types';
import Icon from './common/Icon';

interface ToolSelectorProps {
  currentTool: Tool;
  setTool: (tool: Tool) => void;
}

const ToolButton: React.FC<{
  label: string;
  iconName: 'rocket' | 'globe';
  isActive: boolean;
  onClick: () => void;
}> = ({ label, iconName, isActive, onClick }) => {
  const activeClasses = 'bg-indigo-600 text-white';
  const inactiveClasses = 'bg-gray-700 text-gray-300 hover:bg-gray-600';

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center p-3 rounded-md transition-colors text-sm font-semibold ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon name={iconName} className="w-5 h-5 mr-2" />
      {label}
    </button>
  );
};

const ToolSelector: React.FC<ToolSelectorProps> = ({ currentTool, setTool }) => {
  return (
    <div className="flex items-center space-x-2 bg-gray-800 border border-gray-700 p-1 rounded-lg">
      <ToolButton
        label="Product Flipper"
        iconName="rocket"
        isActive={currentTool === 'products'}
        onClick={() => setTool('products')}
      />
      <ToolButton
        label="Domain Flipper"
        iconName="globe"
        isActive={currentTool === 'domains'}
        onClick={() => setTool('domains')}
      />
    </div>
  );
};

export default ToolSelector;
