import React, { useState } from 'react';
import Icon from './common/Icon';
import Modal from './common/Modal';
import TransactionForm from './TransactionForm';

interface CreatorDashboardProps {
  revenue: number;
  onWithdraw: (amount: number) => void;
}

const CreatorDashboard: React.FC<CreatorDashboardProps> = ({ revenue, onWithdraw }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWithdrawal = (amount: number) => {
    onWithdraw(amount);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm
          type="withdrawal"
          onSubmit={handleWithdrawal}
          onCancel={() => setIsModalOpen(false)}
          title="Withdraw Earnings"
        />
      </Modal>
      <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-indigo-300 flex items-center">
          <Icon name="crown" className="mr-3" />
          Creator Earnings
        </h2>
        <div className="mb-6 text-center bg-gray-900 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">TOTAL REVENUE COLLECTED</p>
          <p className="text-4xl font-bold text-green-400 tracking-tight">${revenue.toFixed(2)}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={revenue <= 0}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
        >
          <Icon name="visa" className="mr-2 w-8 h-8" />
          Withdraw Earnings
        </button>
      </div>
    </>
  );
};

export default CreatorDashboard;
