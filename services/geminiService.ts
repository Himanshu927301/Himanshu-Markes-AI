import { GoogleGenAI } from "@google/genai";
import { StockAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeStock = async (companyName: string): Promise<StockAnalysis> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    You are "Himanshu Market You", an advanced Robot Stock Market Analyst.
    
    Analyze the company: "${companyName}".
    
    Use Google Search to find:
    1. Latest REAL-TIME stock price and today's percentage change.
    2. KEY FINANCIAL RATIOS: P/E Ratio, P/B Ratio, Debt-to-Equity, Market Cap, Book Value, Dividend Yield, ROE, and EPS.
    3. Breaking news and market sentiment.
    
    Determine EXACTLY when to buy (Call) or sell (Put) with high precision.
    
    CRITICAL: You must return the response as a valid JSON object string. Do not wrap it in markdown.
    
    The JSON structure must be:
    {
      "symbol": "Ticker Symbol (e.g. HDFCBANK, AMZN)",
      "name": "Full Company Name",
      "currentPrice": "Real-time price",
      "currency": "Currency (INR, USD, etc.)",
      "changePercent": "Today's change %",
      "signal": "CALL" or "PUT",
      "confidence": "98% or 99%",
      "trendDirection": "UP" or "DOWN",
      "entryPrice": "Best price to enter trade",
      "stopLoss": "Stop loss price",
      "predictedTarget": "Short term target price",
      "reasoning": "Explain simply when to buy and why. Mention key financials if relevant.",
      "financials": {
        "peRatio": "Value or N/A",
        "pbRatio": "Value or N/A",
        "debtToEquity": "Value or N/A",
        "marketCap": "Value or N/A",
        "bookValue": "Value or N/A",
        "dividendYield": "Value or N/A",
        "roe": "Value or N/A",
        "eps": "Value or N/A"
      },
      "news": [
        { "title": "Headline 1", "source": "Source" },
        { "title": "Headline 2", "source": "Source" }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.3, 
      },
    });

    let text = response.text || "{}";
    
    // Clean up potential markdown formatting
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    
    if (start !== -1 && end !== -1) {
        text = text.substring(start, end + 1);
    }

    const data = JSON.parse(text) as StockAnalysis;
    return data;
  } catch (error) {
    console.error("Analysis failed:", error);
    return {
      symbol: "ERR",
      name: companyName,
      currentPrice: "---",
      currency: "",
      changePercent: "0.00%",
      signal: "HOLD",
      confidence: "0%",
      trendDirection: "FLAT",
      reasoning: "Connection error. Please try again.",
      news: [],
      financials: {
        peRatio: "-", pbRatio: "-", debtToEquity: "-", marketCap: "-", 
        bookValue: "-", dividendYield: "-", roe: "-", eps: "-"
      }
    };
  }
};