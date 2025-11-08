import React from 'react';
import type { PurchasableItem } from '../types';
import Modal from './common/Modal';
import PaymentButton from './common/PaymentButton';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PurchasableItem | null;
  balance: number;
  onConfirm: (item: PurchasableItem) => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, item, balance, onConfirm }) => {
  if (!isOpen || !item) return null;

  const isProduct = 'productName' in item;
  const name = isProduct ? item.productName : item.domainName;
  const cost = isProduct ? item.estimatedAcquisitionCost : item.acquisitionCost;
  const isBalanceSufficient = balance >= cost;

  const handleConfirm = () => {
    onConfirm(item);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-2">
        <h2 className="text-2xl font-bold text-white text-center mb-2">Confirm Acquisition</h2>
        <p className="text-center text-gray-400 mb-4">You are about to acquire the following digital asset:</p>

        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-6 text-center">
            <p className={`text-xl font-bold ${isProduct ? 'text-white' : 'text-white font-mono'}`}>{name}</p>
            <p className="text-gray-400 text-sm">Acquisition Cost: <span className="text-red-400 font-bold">${cost.toFixed(2)}</span></p>
        </div>

        <h3 className="text-lg font-semibold text-indigo-300 mb-3">Choose Payment Method</h3>
        <div className="space-y-3">
             <PaymentButton 
                iconName="wallet" 
                label="Pay with Balance" 
                onClick={handleConfirm}
                disabled={!isBalanceSufficient}
                balance={balance}
            />
            <PaymentButton iconName="visa" label="Pay with Visa" onClick={handleConfirm} />
            <PaymentButton iconName="stripe" label="Pay with Stripe" onClick={handleConfirm} />
            <PaymentButton iconName="paypal" label="Pay with PayPal" onClick={handleConfirm} />
            <PaymentButton iconName="googlePay" label="Pay with Google Pay" onClick={handleConfirm} />
        </div>
         <div className="mt-6 text-center">
             <button
                onClick={onClose}
                className="text-sm text-gray-400 hover:text-white"
             >
                Cancel
             </button>
         </div>
      </div>
    </Modal>
  );
};

export default PurchaseModal;