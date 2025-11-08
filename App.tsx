import React, { useState, useEffect, useCallback } from 'react';
import type { Product, MarketingPlan, Transaction, Tool, ExpiredDomain, DomainSalePitch, PurchasableItem } from './types';
import { findProductDeals, generateMarketingPlan, findExpiredDomains, generateDomainSalePitch } from './services/geminiService';
import Header from './components/Header';
import ProductList from './components/ProductList';
import MarketingAutopilot from './components/MarketingAutopilot';
import WalletDashboard from './components/WalletDashboard';
import ExpertGuide from './components/ExpertGuide';
import ToolSelector from './components/ToolSelector';
import ExpiredDomainList from './components/ExpiredDomainList';
import DomainSaleAutopilot from './components/DomainSaleAutopilot';
import PurchaseModal from './components/PurchaseModal';
import SubscriptionView from './components/SubscriptionView';
import CreatorDashboard from './components/CreatorDashboard';
import { ToastProvider, useToast } from './components/common/Toast';

const AppContent: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [platformRevenue, setPlatformRevenue] = useState(0);

  const [currentTool, setCurrentTool] = useState<Tool>('products');
  const [view, setView] = useState<'finding' | 'autopilot'>('finding');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackgroundLoading, setIsBackgroundLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  
  // Product State
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [marketingPlan, setMarketingPlan] = useState<MarketingPlan | null>(null);

  // Domain State
  const [domains, setDomains] = useState<ExpiredDomain[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<ExpiredDomain| null>(null);
  const [domainSalePitch, setDomainSalePitch] = useState<DomainSalePitch | null>(null);
  
  // Purchase Modal State
  const [itemToPurchase, setItemToPurchase] = useState<PurchasableItem | null>(null);


  // Wallet State
  const [balance, setBalance] = useState<number>(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([
      {id: 'tx1', type: 'deposit', description: 'Initial Balance', amount: 1000, date: new Date().toLocaleDateString()}
  ]);

  const handleError = (err: unknown, message: string) => {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    setError(errorMessage);
    toast.show(message, 'error');
  };

  const loadProducts = useCallback(async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    else setIsBackgroundLoading(true);
    setError(null);
    try {
      const fetchedProducts = await findProductDeals();
      setProducts(fetchedProducts);
    } catch (err) {
      handleError(err, 'Failed to load products.');
    } finally {
      if (!isBackground) setIsLoading(false);
      else setIsBackgroundLoading(false);
    }
  }, [toast]);

  const loadDomains = useCallback(async (isBackground = false) => {
    if (!isBackground) setIsLoading(true);
    else setIsBackgroundLoading(true);
    setError(null);
    try {
        const fetchedDomains = await findExpiredDomains();
        setDomains(fetchedDomains);
    } catch (err) {
       handleError(err, 'Failed to load domains.');
    } finally {
        if (!isBackground) setIsLoading(false);
        else setIsBackgroundLoading(false);
    }
  }, [toast]);


  useEffect(() => {
    if(isSubscribed) {
        if(currentTool === 'products') {
            loadProducts();
        } else {
            loadDomains();
        }
    }
  }, [currentTool, isSubscribed]);

  useEffect(() => {
    if (!isSubscribed || view !== 'finding') return;

    const interval = setInterval(() => {
        if (currentTool === 'products') {
            loadProducts(true);
        } else {
            loadDomains(true);
        }
    }, 30000); // Auto-refresh every 30 seconds

    return () => clearInterval(interval);
  }, [isSubscribed, view, currentTool, loadProducts, loadDomains]);


  const handleInitiatePurchase = (item: PurchasableItem) => {
      setItemToPurchase(item);
  };

  const handleConfirmPurchase = async (item: PurchasableItem) => {
    setItemToPurchase(null); // Close modal immediately
    setIsLoading(true);
    setView('autopilot');
    setError(null);
  
    if ('productName' in item) { // It's a Product
      setSelectedProduct(item);
      setBalance(prev => prev - item.estimatedAcquisitionCost);
      setTransactions(prev => [
        { id: `tx${prev.length + 1}`, type: 'purchase', description: `Purchase: ${item.productName}`, amount: item.estimatedAcquisitionCost, date: new Date().toLocaleDateString() },
        ...prev
      ]);
      toast.show(`${item.productName} acquired! Generating marketing plan...`, 'info');
  
      try {
        const plan = await generateMarketingPlan(item);
        setMarketingPlan(plan);
      } catch (err) {
        handleError(err, 'Failed to generate marketing plan.');
        setView('finding');
      } finally {
        setIsLoading(false);
      }
    } else { // It's an ExpiredDomain
      setSelectedDomain(item);
      setBalance(prev => prev - item.acquisitionCost);
      setTransactions(prev => [
        { id: `tx${prev.length + 1}`, type: 'purchase', description: `Register: ${item.domainName}`, amount: item.acquisitionCost, date: new Date().toLocaleDateString() },
        ...prev
      ]);
      toast.show(`${item.domainName} acquired! Generating sales pitch...`, 'info');
  
      try {
        const pitch = await generateDomainSalePitch(item);
        setDomainSalePitch(pitch);
      } catch (err) {
        handleError(err, 'Failed to generate sales pitch.');
        setView('finding');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handleLaunchCampaign = () => {
    if (!selectedProduct) return;
    const profit = selectedProduct.suggestedSalePrice - selectedProduct.estimatedAcquisitionCost;
    toast.show(`Campaign for ${selectedProduct.productName} launched! Profit of $${profit.toFixed(2)} added to balance.`, 'success');
    
    setBalance(prev => prev + selectedProduct.suggestedSalePrice);
    setTransactions(prev => [
      { id: `tx${prev.length + 1}`, type: 'sale', description: `Sale: ${selectedProduct.productName}`, amount: selectedProduct.suggestedSalePrice, date: new Date().toLocaleDateString() },
      ...prev
    ]);

    setView('finding');
    setSelectedProduct(null);
    setMarketingPlan(null);
    loadProducts();
  };

  const handleListDomainForSale = (salePrice: number) => {
    if (!selectedDomain) return;
    const profit = salePrice - selectedDomain.acquisitionCost;
    toast.show(`${selectedDomain.domainName} listed! Profit of $${profit.toFixed(2)} added to balance.`, 'success');
    
    setBalance(prev => prev + salePrice);
     setTransactions(prev => [
      { id: `tx${prev.length + 1}`, type: 'sale', description: `Sale: ${selectedDomain.domainName}`, amount: salePrice, date: new Date().toLocaleDateString() },
      ...prev
    ]);

    setView('finding');
    setSelectedDomain(null);
    setDomainSalePitch(null);
    loadDomains();
  }

  const handleDeposit = (amount: number) => {
      setBalance(prev => prev + amount);
      setTransactions(prev => [
          {id: `tx${prev.length+1}`, type: 'deposit', description: 'Card Deposit', amount, date: new Date().toLocaleDateString()},
          ...prev
      ]);
      toast.show(`$${amount.toFixed(2)} successfully deposited.`, 'success');
  }

  const handleWithdrawal = (amount: number) => {
      setBalance(prev => prev - amount);
      setTransactions(prev => [
          {id: `tx${prev.length+1}`, type: 'withdrawal', description: 'Card Withdrawal', amount, date: new Date().toLocaleDateString()},
          ...prev
      ]);
      toast.show(`$${amount.toFixed(2)} successfully withdrawn.`, 'success');
  }

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setPlatformRevenue(prev => prev + 36);
    toast.show('Subscription successful! Welcome aboard.', 'success');
  };

  const handleWithdrawRevenue = (amount: number) => {
    if (amount > platformRevenue) {
        toast.show("Withdrawal amount cannot exceed available revenue.", 'error');
        return;
    }
    setPlatformRevenue(prev => prev - amount);
    toast.show(`Withdrawal of $${amount.toFixed(2)} initiated to your Visa card.`, 'success');
  };


  const renderMainContent = () => {
    if (error && view === 'finding' && products.length === 0 && domains.length === 0) {
      return (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-6 rounded-lg text-center h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2">An Error Occurred</h2>
              <p>{error}</p>
              <button onClick={() => { setError(null); currentTool === 'products' ? loadProducts() : loadDomains(); }} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mx-auto">
                  Try Again
              </button>
          </div>
      );
    }

    if (view === 'autopilot') {
        if(currentTool === 'products') {
            return <MarketingAutopilot 
                      product={selectedProduct} 
                      plan={marketingPlan} 
                      isLoading={isLoading} 
                      onLaunch={handleLaunchCampaign}
                      onBack={() => { setView('finding'); setError(null); }}
                    />;
        }
        if (currentTool === 'domains') {
            return <DomainSaleAutopilot 
                      domain={selectedDomain} 
                      pitch={domainSalePitch} 
                      isLoading={isLoading} 
                      onLaunch={handleListDomainForSale}
                      onBack={() => { setView('finding'); setError(null); }}
                    />;
        }
    }

    if (view === 'finding') {
         if(currentTool === 'products') {
            return <ProductList 
                      products={products} 
                      isLoading={isLoading} 
                      isBackgroundLoading={isBackgroundLoading}
                      onSelectProduct={handleInitiatePurchase}
                      onRefresh={() => loadProducts()}
                    />;
        }
        if (currentTool === 'domains') {
            return <ExpiredDomainList 
                        domains={domains}
                        isLoading={isLoading}
                        isBackgroundLoading={isBackgroundLoading}
                        onSelectDomain={handleInitiatePurchase}
                        onRefresh={() => loadDomains()}
                    />
        }
    }
    
    return null;
  };

  if (!isSubscribed) {
    return <SubscriptionView onSubscribe={handleSubscribe} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
       <style>{`
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
      `}</style>
      <Header />
      <PurchaseModal
        isOpen={!!itemToPurchase}
        onClose={() => setItemToPurchase(null)}
        item={itemToPurchase}
        balance={balance}
        onConfirm={handleConfirmPurchase}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              <div className="lg:col-span-2 h-[85vh] flex flex-col">
                 <ToolSelector currentTool={currentTool} setTool={setCurrentTool} />
                 <div className="flex-grow mt-4">
                    {renderMainContent()}
                 </div>
              </div>
              <div className="lg:col-span-1 h-[85vh] overflow-y-auto pr-2 -mr-2 space-y-8">
                  <WalletDashboard 
                      balance={balance} 
                      transactions={transactions}
                      onDeposit={handleDeposit}
                      onWithdraw={handleWithdrawal}
                  />
                  <ExpertGuide />
                  <CreatorDashboard revenue={platformRevenue} onWithdraw={handleWithdrawRevenue} />
              </div>
          </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-xs">
          Powered by Gemini AI. All data is AI-generated for demonstration purposes.
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <ToastProvider>
    <AppContent />
  </ToastProvider>
);

export default App;