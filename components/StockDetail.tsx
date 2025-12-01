import React from 'react';
import { StockAnalysis } from '../types';
import { NeonButton } from './NeonButton';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  data: StockAnalysis;
  onBack: () => void;
}

// Generate some dummy chart data based on trend for visualization
const generateChartData = (trend: string) => {
  const data = [];
  let val = 100;
  for (let i = 0; i < 20; i++) {
    const change = trend === 'UP' ? Math.random() * 5 : trend === 'DOWN' ? Math.random() * -5 : (Math.random() - 0.5) * 5;
    val += change;
    data.push({ name: `T-${20-i}`, value: val });
  }
  return data;
};

export const StockDetail: React.FC<Props> = ({ data, onBack }) => {
  const isUp = data.signal === 'CALL';
  const colorClass = isUp ? 'text-neon-green' : 'text-neon-red';
  const borderColor = isUp ? 'border-neon-green' : 'border-neon-red';
  const shadowClass = isUp ? 'shadow-neon-green' : 'shadow-neon-red';
  const chartColor = isUp ? '#0aff00' : '#ff0000';
  const chartData = generateChartData(data.trendDirection);

  const FinancialCard = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-[#0f0f2d] border border-neon-blue/20 p-3 rounded hover:border-neon-blue transition-colors">
      <p className="text-gray-400 text-xs uppercase font-rajdhani mb-1">{label}</p>
      <p className="text-white font-orbitron text-lg">{value || 'N/A'}</p>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-6 max-w-5xl mx-auto p-4 pb-20">
      
      {/* Top Navigation Bar with Back Button */}
      <div className="flex justify-between items-center bg-black/80 border-b border-neon-blue/50 p-4 sticky top-0 z-50 backdrop-blur-md">
        <NeonButton onClick={onBack} variant="blue" className="text-sm shadow-neon-blue">
           ← BACK TO SEARCH
        </NeonButton>
        <h2 className="font-orbitron text-xl text-white hidden md:block">
          HIMANSHU MARKET YOU
        </h2>
      </div>

      <div className="px-2">
        {/* Header Info */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-gray-800 pb-4">
          <div>
            <h1 className="font-orbitron text-3xl md:text-5xl text-white font-bold tracking-wider">{data.name}</h1>
            <p className="font-rajdhani text-neon-blue text-2xl tracking-widest mt-1">{data.symbol}</p>
          </div>
          <div className="text-right mt-4 md:mt-0">
             <p className="font-orbitron text-4xl text-white">{data.currentPrice} <span className="text-sm text-gray-400">{data.currency}</span></p>
             <p className={`font-mono text-xl ${colorClass}`}>{data.changePercent}</p>
          </div>
        </div>

        {/* Main Robot Signal */}
        <div className={`relative bg-black/60 border-4 ${borderColor} rounded-2xl p-8 text-center overflow-hidden mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
          <div className={`absolute inset-0 opacity-10 ${isUp ? 'bg-neon-green' : 'bg-neon-red'}`}></div>
          
          <h2 className="text-white font-orbitron uppercase tracking-[0.3em] text-sm mb-4">ROBOT PREDICTION ENGINE</h2>
          
          <div className="flex flex-col items-center justify-center">
            <h1 className={`font-black font-orbitron text-7xl md:text-9xl ${colorClass} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
              {data.signal}
            </h1>
            <div className="mt-4 flex gap-4 items-center">
              <span className="text-gray-300 font-rajdhani text-xl">CONFIDENCE:</span>
              <span className="font-orbitron text-3xl text-white bg-white/10 px-3 py-1 rounded">{data.confidence}</span>
            </div>
          </div>

          {/* Trade Setup Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700/50">
            <div className="bg-black/40 p-3 rounded border border-gray-700">
              <p className="text-gray-400 text-xs uppercase font-rajdhani">Entry Price (Buy At)</p>
              <p className="text-neon-blue font-orbitron text-xl">{data.entryPrice || 'MARKET'}</p>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-700">
              <p className="text-gray-400 text-xs uppercase font-rajdhani">Target (Sell At)</p>
              <p className="text-neon-green font-orbitron text-xl">{data.predictedTarget || 'OPEN'}</p>
            </div>
            <div className="bg-black/40 p-3 rounded border border-gray-700">
              <p className="text-gray-400 text-xs uppercase font-rajdhani">Stop Loss (Safety)</p>
              <p className="text-neon-red font-orbitron text-xl">{data.stopLoss || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Financial Metrics Section */}
        {data.financials && (
          <div className="mb-8 bg-black/40 border border-gray-800 p-6 rounded-xl">
            <h3 className="font-orbitron text-white text-lg mb-4 flex items-center gap-2">
              <span className="text-neon-blue">📊</span> FINANCIAL HEALTH MATRIX
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FinancialCard label="P/E Ratio" value={data.financials.peRatio} />
              <FinancialCard label="P/B Ratio" value={data.financials.pbRatio} />
              <FinancialCard label="Debt to Equity" value={data.financials.debtToEquity} />
              <FinancialCard label="Book Value" value={data.financials.bookValue} />
              <FinancialCard label="ROE" value={data.financials.roe} />
              <FinancialCard label="EPS" value={data.financials.eps} />
              <FinancialCard label="Div Yield" value={data.financials.dividendYield} />
              <FinancialCard label="Market Cap" value={data.financials.marketCap} />
            </div>
          </div>
        )}

        {/* Analysis & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-neon-card/40 border border-neon-blue/30 p-6 rounded-xl">
             <h3 className="font-orbitron text-neon-blue text-lg mb-4">ROBOT REASONING</h3>
             <p className="font-rajdhani text-xl text-gray-200 leading-relaxed">
               {data.reasoning}
             </p>
          </div>

          <div className="bg-neon-card/40 border border-neon-blue/30 p-6 rounded-xl h-[300px]">
            <h3 className="font-orbitron text-neon-blue text-lg mb-4">TREND VISUALIZER</h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050510', borderColor: chartColor, color: '#fff' }}
                  itemStyle={{ color: chartColor }}
                />
                <Area type="monotone" dataKey="value" stroke={chartColor} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* News Section */}
        <div className="bg-black/50 border-t-2 border-neon-pink p-6 rounded-b-xl">
          <h3 className="font-orbitron text-neon-pink text-2xl mb-6 flex items-center gap-3">
             <span className="text-3xl">📰</span> GLOBAL NEWS WIRE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.news.map((item, idx) => (
              <a href={item.url} target="_blank" rel="noopener noreferrer" key={idx} className="block group bg-white/5 hover:bg-white/10 p-4 rounded-lg border border-transparent hover:border-neon-pink transition-all">
                <h4 className="font-rajdhani font-bold text-white text-lg leading-tight group-hover:text-neon-pink">
                  {item.title}
                </h4>
                <p className="text-neon-blue text-xs mt-2 font-orbitron uppercase">{item.source}</p>
              </a>
            ))}
            {data.news.length === 0 && <p className="text-gray-500">No news signals found.</p>}
          </div>
        </div>

      </div>
    </div>
  );
};