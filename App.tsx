import React, { useState } from 'react';
import { analyzeStock } from './services/geminiService';
import { StockAnalysis, StockPreview } from './types';
import { NeonButton } from './components/NeonButton';
import { StockDetail } from './components/StockDetail';

// Expanded list of big companies as requested
const DEFAULT_STOCKS: StockPreview[] = [
  { symbol: 'HDFCBANK', name: 'HDFC Bank' },
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'AMZN', name: 'Amazon' },
  { symbol: 'TSM', name: 'TSMC' },
  { symbol: 'AAPL', name: 'Apple' },
  { symbol: 'TSLA', name: 'Tesla' },
  { symbol: 'TATAMOTORS', name: 'Tata Motors' },
  { symbol: 'NVDA', name: 'Nvidia' },
  { symbol: 'GOOGL', name: 'Alphabet' },
  { symbol: 'MSFT', name: 'Microsoft' },
  { symbol: 'TCS', name: 'TCS' },
  { symbol: 'INFY', name: 'Infosys' },
  { symbol: 'SBIN', name: 'SBI Bank' },
  { symbol: 'META', name: 'Meta' },
  { symbol: 'NFLX', name: 'Netflix' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank' },
  { symbol: 'WIPRO', name: 'Wipro' },
  { symbol: 'AMD', name: 'AMD' },
  { symbol: 'INTC', name: 'Intel' },
  { symbol: 'KO', name: 'Coca-Cola' }
];

const App: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<StockAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStockClick = async (symbol: string, name: string) => {
    setIsLoading(true);
    // Pass both name and symbol for better AI search context
    const data = await analyzeStock(`${name} (${symbol}) stock`);
    setSelectedStock(data);
    setIsLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    // Analyze whatever the user typed
    const data = await analyzeStock(`${searchTerm} stock`);
    setSelectedStock(data);
    setIsLoading(false);
  };

  const filteredStocks = DEFAULT_STOCKS.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If detailed view is active, show it
  if (selectedStock) {
    return <StockDetail data={selectedStock} onBack={() => setSelectedStock(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#050510] text-white p-4 font-orbitron overflow-x-hidden">
      
      {/* Header */}
      <header className="text-center mb-10 mt-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-blue/20 blur-[100px] rounded-full pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-pink drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
          HIMANSHU MARKET YOU
        </h1>
        <p className="text-gray-400 mt-2 font-rajdhani text-lg tracking-widest">
          ROBOT STOCK PREDICTOR • 99% ACCURACY MODEL
        </p>
      </header>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12 relative z-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search any company (e.g. Zomato, Gold, Bitcoin)..."
            className="w-full bg-[#0a0a1f] border-2 border-neon-blue/50 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-neon-pink focus:shadow-[0_0_15px_rgba(255,0,255,0.3)] transition-all font-rajdhani text-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <NeonButton type="submit" variant="pink" className="px-8 text-xl">
             GO
          </NeonButton>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
          <div className="w-24 h-24 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl text-neon-blue animate-pulse tracking-widest">ANALYZING MARKET DATA...</h2>
          <p className="text-gray-400 mt-2 font-rajdhani">Calculating Entry Points & Trends</p>
        </div>
      )}

      {/* Stock Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 pb-20">
        {filteredStocks.map((stock) => (
          <button
            key={stock.symbol}
            onClick={() => handleStockClick(stock.symbol, stock.name)}
            className="group relative bg-[#0a0a1f] border border-gray-800 hover:border-neon-green rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(10,255,0,0.2)] text-left"
          >
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-neon-green text-xs">● LIVE</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-neon-green">{stock.symbol}</h3>
            <p className="text-gray-400 font-rajdhani text-sm uppercase tracking-wider">{stock.name}</p>
            <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-gray-600 group-hover:bg-neon-green transition-colors"></div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur text-center py-3 border-t border-gray-900 z-40">
        <p className="text-gray-500 text-xs font-rajdhani">
          POWERED BY HIMANSHU AI • TRADING INVOLVES RISK
        </p>
      </footer>

    </div>
  );
};

export default App;