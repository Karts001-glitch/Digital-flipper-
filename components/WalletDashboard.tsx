import React, { useState } from 'react';
import type { Transaction } from '../types';
import Icon from './common/Icon';
import Modal from './common/Modal';
import TransactionForm from './TransactionForm';
import { useToast } from './common/Toast';


interface WalletDashboardProps {
  balance: number;
  transactions: Transaction[];
  onDeposit: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const isCredit = transaction.type === 'deposit' || transaction.type === 'sale';
  const amountColor = isCredit ? 'text-green-400' : 'text-red-400';
  const sign = isCredit ? '+' : '-';

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
      <div>
        <p className="font-semibold capitalize">{transaction.description}</p>
        <p className="text-xs text-gray-400">{transaction.date}</p>
      </div>
      <p className={`font-bold ${amountColor}`}>{`${sign}$${transaction.amount.toFixed(2)}`}</p>
    </div>
  );
};

const WalletDashboard: React.FC<WalletDashboardProps> = ({ balance, transactions, onDeposit, onWithdraw }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'deposit' | 'withdrawal'>('deposit');
  const toast = useToast();
  
  const openModal = (type: 'deposit' | 'withdrawal') => {
      setModalType(type);
      setIsModalOpen(true);
  }

  const handleTransaction = (amount: number) => {
    if (modalType === 'deposit') {
        onDeposit(amount);
    } else {
        if (amount > balance) {
            toast.show("Withdrawal amount cannot exceed current balance.", "error");
            return;
        }
        onWithdraw(amount);
    }
    setIsModalOpen(false);
  }

  return (
    <>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TransactionForm type={modalType} onSubmit={handleTransaction} onCancel={() => setIsModalOpen(false)} title={modalType === 'deposit' ? 'Make a Deposit' : 'Withdraw Funds'} />
    </Modal>
    <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700 flex flex-col">
      <h2 className="text-2xl font-bold mb-1 text-indigo-300 flex items-center">
        <Icon name="wallet" className="mr-3"/>
        Financials
      </h2>
       <p className="text-sm text-yellow-400 bg-yellow-900/50 border border-yellow-600 rounded-md p-2 mb-4">
        Note: Financial features are for demonstration purposes only. No real transactions are processed.
      </p>
      <div className="mb-6 text-center bg-gray-900 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">CURRENT BALANCE</p>
        <p className="text-4xl font-bold text-green-400 tracking-tight">${balance.toFixed(2)}</p>
      </div>
      <div className="flex space-x-4 mb-6">
        <button onClick={() => openModal('deposit')} className="flex-1 bg-green-600 hover:bg-green-700 transition-colors text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center">
          <Icon name="plus" className="mr-2 w-5 h-5"/> Deposit
        </button>
        <button onClick={() => openModal('withdrawal')} className="flex-1 bg-red-600 hover:bg-red-700 transition-colors text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center">
          <Icon name="minus" className="mr-2 w-5 h-5"/> Withdraw
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-300">Transaction History</h3>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2" style={{maxHeight: '200px'}}>
        {transactions.length > 0 ? (
          transactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)
        ) : (
          <p className="text-gray-500 text-center py-4">No transactions yet.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default WalletDashboard;