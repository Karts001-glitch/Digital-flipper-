import React from 'react';
import type { IconName } from '../../types';
import Icon from './Icon';

interface PaymentButtonProps {
    iconName: IconName;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    balance?: number;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ iconName, label, onClick, disabled, balance }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-full flex items-center p-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed disabled:text-gray-500 rounded-lg transition-colors text-left"
        >
            <Icon name={iconName} className="w-8 h-8 mr-4" />
            <div>
                <span className="font-semibold">{label}</span>
                {balance !== undefined && (
                     <span className={`block text-xs ${disabled ? 'text-red-500' : 'text-gray-400'}`}>
                        {disabled ? 'Insufficient funds' : `Balance: $${balance.toFixed(2)}`}
                    </span>
                )}
            </div>
        </button>
    );
};

export default PaymentButton;
