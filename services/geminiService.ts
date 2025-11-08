import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { Product, MarketingPlan, ChatMessage, ExpiredDomain, DomainSalePitch } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chatHistoryToGemini = (history: ChatMessage[]) => {
    return history.map(message => ({
        role: message.role,
        parts: [{ text: message.content }]
    }));
};

export async function findProductDeals(): Promise<Product[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a list of 5 diverse and potentially profitable digital products that can be flipped (bought and resold). For each product, provide a name, a brief description, a category (e.g., 'eBook', 'Software', 'Online Course'), an estimated acquisition cost, and a suggested sale price.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            products: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  productName: { type: Type.STRING },
                  description: { type: Type.STRING },
                  category: { type: Type.STRING },
                  estimatedAcquisitionCost: { type: Type.NUMBER },
                  suggestedSalePrice: { type: Type.NUMBER },
                },
                required: ['productName', 'description', 'category', 'estimatedAcquisitionCost', 'suggestedSalePrice'],
              },
            },
          },
        },
      },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse.products;
  } catch (error) {
    console.error("Error finding product deals:", error);
    throw new Error("Failed to fetch product ideas from AI. Please check your API key and try again.");
  }
}

export async function generateMarketingPlan(product: Product): Promise<MarketingPlan> {
  const prompt = `You are an expert digital marketing AI. For the following product:
    - Name: ${product.productName}
    - Description: ${product.description}
    - Price: $${product.suggestedSalePrice}

    Generate a comprehensive marketing plan. The plan should include:
    1. A detailed description of the primary target audience.
    2. A list of three effective marketing channels.
    3. Two distinct ad copy examples, one for Facebook and one for Google Ads, each with a headline and body.
    4. A concise and compelling sales pitch.

    Return the result in a structured JSON format.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    productName: { type: Type.STRING },
                    targetAudience: { type: Type.STRING },
                    marketingChannels: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    adCopy: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                platform: { type: Type.STRING },
                                headline: { type: Type.STRING },
                                body: { type: Type.STRING }
                            },
                             required: ['platform', 'headline', 'body'],
                        }
                    },
                    salesPitch: { type: Type.STRING }
                },
                required: ['productName', 'targetAudience', 'marketingChannels', 'adCopy', 'salesPitch'],
            },
        },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating marketing plan:", error);
    throw new Error("Failed to generate marketing plan. Please try again.");
  }
}

let expertChat: Chat | null = null;

export async function getExpertAdvice(history: ChatMessage[], newMessage: string): Promise<string> {
    try {
        if (!expertChat) {
            expertChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                history: chatHistoryToGemini(history),
                 config: {
                    systemInstruction: 'You are an expert guide specializing in flipping digital products for profit. Provide concise, actionable advice. You are friendly, encouraging, and an expert in digital marketing, product valuation, and online sales strategies.',
                },
            });
        }
        
        const response = await expertChat.sendMessage({ message: newMessage });
        return response.text;

    } catch (error) {
        console.error("Error getting expert advice:", error);
        throw new Error("Failed to get a response from the expert guide.");
    }
}

export async function findExpiredDomains(): Promise<ExpiredDomain[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Act as a domain flipper expert. You have just scanned GoDaddy and Dynadot for the best deals. Generate a list of 5 potentially valuable, available-sounding domain names that are profitable to flip. For each domain, provide: a creative domain name ending with a .io, .ai, .xyz, or .app TLD; a standard acquisition cost under $10 (e.g., 9.99); a potential value range (e.g., '$500 - $1500'); a clear explanation on why it has the potential of selling out fast (e.g., short, brandable, high-traffic keywords); and a category (e.g., 'Tech Startup', 'AI Project').",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            domains: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  domainName: { type: Type.STRING },
                  potentialValue: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                  category: { type: Type.STRING },
                  acquisitionCost: { type: Type.NUMBER },
                },
                required: ['domainName', 'potentialValue', 'reasoning', 'category', 'acquisitionCost'],
              },
            },
          },
        },
      },
    });

    const jsonResponse = JSON.parse(response.text);
    return jsonResponse.domains;
  } catch (error) {
    console.error("Error finding expired domains:", error);
    throw new Error("Failed to fetch domain ideas from AI. Please check your API key and try again.");
  }
}

export async function generateDomainSalePitch(domain: ExpiredDomain): Promise<DomainSalePitch> {
  const prompt = `You are an expert domain broker. Create a compelling sales pitch for the domain name: "${domain.domainName}". 
  
  The domain's estimated value is ${domain.potentialValue} because: "${domain.reasoning}".
  
  The pitch should include:
  1. A catchy and professional listing headline.
  2. A detailed description highlighting the domain's strengths, brandability, and potential uses for businesses or projects.
  
  The tone should be professional and persuasive. Return the result as a JSON object.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    headline: { type: Type.STRING },
                    description: { type: Type.STRING },
                },
                required: ['headline', 'description'],
            },
        },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error generating domain sale pitch:", error);
    throw new Error("Failed to generate domain sale pitch. Please try again.");
  }
}