export interface Product {
  productName: string;
  description: string;
  category: string;
  estimatedAcquisitionCost: number;
  suggestedSalePrice: number;
}

export interface AdCopy {
  platform: string;
  headline: string;
  body: string;
}

export interface MarketingPlan {
  productName:string;
  targetAudience: string;
  marketingChannels: string[];
  adCopy: AdCopy[];
  salesPitch: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'sale' | 'purchase';
  description: string;
  amount: number;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface ExpiredDomain {
    domainName: string;
    potentialValue: string;
    reasoning: string;
    category: string;
    acquisitionCost: number;
}

export interface DomainSalePitch {
    headline: string;
    description: string;
}

export type IconName = 'dollar' | 'rocket' | 'target' | 'megaphone' | 'pitch' | 'check' | 'loading' | 'wallet' | 'plus' | 'minus' | 'refresh' | 'chatBubble' | 'globe' | 'visa' | 'stripe' | 'paypal' | 'googlePay' | 'lock' | 'crown' | 'info' | 'error';

export type AppView = 'finding' | 'generating' | 'campaign';
export type Tool = 'products' | 'domains';
export type PurchasableItem = Product | ExpiredDomain;