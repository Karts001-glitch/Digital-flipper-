import React, { useState } from 'react';
import Icon from './common/Icon';

interface TransactionFormProps {
  type: 'deposit' | 'withdrawal';
  onSubmit: (amount: number) => void;
  onCancel: () => void;
  title: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, onSubmit, onCancel, title }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid, positive amount.');
      return;
    }
    setError('');
    onSubmit(numericAmount);
  };

  const buttonText = type === 'deposit' ? 'Deposit' : 'Withdraw';
  const buttonColor = type === 'deposit' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center">{title}</h2>
      
      <p className="text-xs text-yellow-400 bg-yellow-900/50 border border-yellow-600 rounded-md p-2 text-center">
        This is a simulation. Do not enter real card details.
      </p>

      <div>
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-300">
          Visa Card Number
        </label>
        <div className="relative mt-1">
          <input
            type="text"
            id="card-number"
            placeholder="4000 1234 5678 9010"
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue="4111111111111111"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
          <div className='col-span-2'>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-300">
                Expiry Date
            </label>
            <input type="text" id="expiry" placeholder="MM/YY" className="mt-1 w-full bg-gray-700 border-gray-600 text-white rounded-md p-2" defaultValue="12/28"/>
          </div>
           <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-300">
                CVV
            </label>
            <input type="text" id="cvv" placeholder="123" className="mt-1 w-full bg-gray-700 border-gray-600 text-white rounded-md p-2" defaultValue="123"/>
          </div>
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
          Amount
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 pl-7"
            placeholder="0.00"
            autoFocus
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-600 rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 text-sm font-medium text-white ${buttonColor} rounded-md`}
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;