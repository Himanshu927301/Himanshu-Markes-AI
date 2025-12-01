export interface NewsItem {
  title: string;
  source: string;
  url?: string;
}

export interface Financials {
  peRatio: string;
  pbRatio: string;
  debtToEquity: string;
  marketCap: string;
  bookValue: string;
  dividendYield: string;
  roe: string; // Return on Equity
  eps: string; // Earning Per Share
}

export interface StockAnalysis {
  symbol: string;
  name: string;
  currentPrice: string;
  currency: string;
  changePercent: string;
  signal: 'CALL' | 'PUT' | 'HOLD'; // Buy/Sell/Hold
  confidence: string; // e.g. "98%"
  reasoning: string;
  news: NewsItem[];
  trendDirection: 'UP' | 'DOWN' | 'FLAT';
  predictedTarget?: string;
  entryPrice?: string; // Best price to buy
  stopLoss?: string; // Price to exit if wrong
  financials?: Financials;
}

export interface StockPreview {
  symbol: string;
  name: string;
}