import React, { useState, useEffect } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import WelcomeCard from './WelcomeCard';
import MetricCard from './MetricCard';
import { Coins, LineChart, AlertTriangle } from 'lucide-react';

const DashboardView: React.FC = () => {
  const { marketPrediction, tradingSignals, isConnected } = useWebSocket();
  const [tokensAnalyzed, setTokensAnalyzed] = useState<number>(0);
  const [prevTokensAnalyzed, setPrevTokensAnalyzed] = useState<number>(0);
  const [signalsDetected, setSignalsDetected] = useState<number>(0);
  const [prevSignalsDetected, setPrevSignalsDetected] = useState<number>(0);
  const [recentPrediction, setRecentPrediction] = useState<string>('');
  const [prevRecentPrediction, setPrevRecentPrediction] = useState<string>('');

  useEffect(() => {
    if (marketPrediction) {
      console.log('Market Prediction:', marketPrediction);
      const tokensAnalyzed = marketPrediction.symbols?.length;
      setPrevTokensAnalyzed(tokensAnalyzed);
      setTokensAnalyzed(prev => prev + marketPrediction.tokens?.length);
      
      setPrevRecentPrediction(recentPrediction);
      setRecentPrediction(marketPrediction.market_direction);
    }
  }, [marketPrediction]);

  useEffect(() => {
    if (tradingSignals && tradingSignals.length > 0) {
      setPrevSignalsDetected(signalsDetected);
      setSignalsDetected(prev => prev + tradingSignals.length);
    }
  }, [tradingSignals]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Total Tokens Analyzed"
          value={tokensAnalyzed}
          previousValue={prevTokensAnalyzed}
          icon={<Coins className="h-4 w-4 text-muted-foreground" />}
          trend="up"
        />
        
        <MetricCard
          title="Trading Signals Detected"
          value={signalsDetected}
          previousValue={prevSignalsDetected}
          icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
          trend="up"
        />
        
        <MetricCard
          title="Market Prediction"
          value={recentPrediction ? recentPrediction.toUpperCase() : 'Waiting for data...'}
          previousValue={prevRecentPrediction}
          icon={<LineChart className="h-4 w-4 text-muted-foreground" />}
          trend={recentPrediction === 'bullish' ? 'up' : recentPrediction === 'bearish' ? 'down' : 'neutral'}
          description={isConnected ? 'Live data updating in real-time' : 'Waiting for connection...'}
        />
      </div>
      
      <WelcomeCard />
    </div>
  );
};

export default DashboardView;