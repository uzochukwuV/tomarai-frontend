import React from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import SignalsTable from './SignalsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from 'lucide-react';

const TradingSignalsView: React.FC = () => {
  const { tradingSignals, isConnected } = useWebSocket();
  console.log(tradingSignals)
  // Count buy and sell signals
  const buySignals = tradingSignals?.filter(signal => signal.TRADING_SIGNAL === 1).length || 0;
  const sellSignals = tradingSignals?.filter(signal => signal.TRADING_SIGNAL === -1).length || 0;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trading Signals</h1>
        <p className="text-muted-foreground">
          Real-time trading signals with buy/sell recommendations
        </p>
      </div>
      
      {tradingSignals && tradingSignals.length > 0 ? (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Signal Summary</CardTitle>
                <CardDescription>
                  Overview of current trading signals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-muted-foreground">Buy Signals</span>
                    <span className="text-2xl font-bold text-green-600">{buySignals}</span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-muted-foreground">Sell Signals</span>
                    <span className="text-2xl font-bold text-red-600">{sellSignals}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <SignalsTable data={tradingSignals} />
        </>
      ) : (
        <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <Activity className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">No trading signals available</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {isConnected 
                ? "Waiting for trading signals to arrive..." 
                : "Connection lost. Reconnecting to the server..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingSignalsView;