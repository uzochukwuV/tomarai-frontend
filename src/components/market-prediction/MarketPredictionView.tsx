import React, { useState, useEffect } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import PredictionCard from './PredictionCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LineChart, Search } from 'lucide-react';
import { Token } from '@/types';
import { formatDistanceToNow } from 'date-fns';

const MarketPredictionView: React.FC = () => {
  const { marketPrediction, isConnected } = useWebSocket();
  const [searchTerm, setSearchTerm] = useState('');
  const [formattedTime, setFormattedTime] = useState<string>('');
  
  useEffect(() => {
    if (marketPrediction?.timestamp) {
      const date = new Date(marketPrediction.timestamp);
      setFormattedTime(formatDistanceToNow(date, { addSuffix: true }));
      
      // Update the "time ago" text every minute
      const intervalId = setInterval(() => {
        setFormattedTime(formatDistanceToNow(date, { addSuffix: true }));
      }, 60000);
      
      return () => clearInterval(intervalId);
    }
  }, [marketPrediction?.timestamp]);
  
  // Filter tokens based on search term
  const filteredTokens = marketPrediction?.tokens?.filter((token: Token) => 
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Prediction</h1>
          <p className="text-muted-foreground">
            Real-time token predictions with trend analysis and confidence scores
          </p>
        </div>
      </div>
      
      {marketPrediction ? (
        <>
          <Card className="overflow-hidden border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                Market Direction: {marketPrediction.market_direction.toUpperCase()}
              </CardTitle>
              <CardDescription>
                Last updated: {formattedTime}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our AI predicts a <strong>{marketPrediction.market_direction}</strong> trend in the market based on 
                analysis of {marketPrediction.tokens?.length || 0} tokens. 
                Review individual token predictions below.
              </p>
            </CardContent>
          </Card>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tokens..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTokens.map((token: Token) => (
              <PredictionCard key={`${token.token_id}-${token.symbol}`} token={token} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <LineChart className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">No prediction data available</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {isConnected 
                ? "Waiting for market prediction data to arrive..." 
                : "Connection lost. Reconnecting to the server..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPredictionView;