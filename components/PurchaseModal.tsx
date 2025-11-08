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
      