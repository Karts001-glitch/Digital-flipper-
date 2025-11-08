// This service has been refactored to communicate with a secure backend API.
// All Gemini AI calls are now handled by the server, not the client.
import type { Product, MarketingPlan, ChatMessage, ExpiredDomain, DomainSalePitch } from '../types';

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function findProductDeals(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products');
    const data = await handleResponse<{ products: Product[] }>(response);
    return data.products;
  } catch (error) {
    console.error("Error finding product deals:", error);
    throw new Error("Failed to fetch product ideas from the server. Please try again.");
  }
}

export async function generateMarketingPlan(product: Product): Promise<MarketingPlan> {
  try {
    const response = await fetch('/api/marketing-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product }),
    });
    return await handleResponse<MarketingPlan>(response);
  } catch (error) {
    console.error("Error generating marketing plan:", error);
    throw new Error("Failed to generate marketing plan from the server. Please try again.");
  }
}

export async function streamExpertAdvice(
    history: ChatMessage[], 
    newMessage: string, 
    onChunk: (chunk: string) => void
): Promise<void> {
    try {
        const response = await fetch('/api/expert-advice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ history, newMessage }),
        });

        if (!response.ok || !response.body) {
            const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
            throw new Error(errorData.message || 'Failed to get a response from the expert guide.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            onChunk(decoder.decode(value, { stream: true }));
        }
    } catch (error) {
        console.error("Error getting expert advice:", error);
        throw new Error("Failed to get a response from the expert guide's stream.");
    }
}

export async function findExpiredDomains(): Promise<ExpiredDomain[]> {
  try {
    const response = await fetch('/api/domains');
    const data = await handleResponse<{ domains: ExpiredDomain[] }>(response);
    return data.domains;
  } catch (error) {
    console.error("Error finding expired domains:", error);
    throw new Error("Failed to fetch domain ideas from the server. Please try again.");
  }
}

export async function generateDomainSalePitch(domain: ExpiredDomain): Promise<DomainSalePitch> {
  try {
    const response = await fetch('/api/domain-pitch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain }),
    });
    return await handleResponse<DomainSalePitch>(response);
  } catch (error) {
    console.error("Error generating domain sale pitch:", error);
    throw new Error("Failed to generate domain sale pitch from the server. Please try again.");
  }
}