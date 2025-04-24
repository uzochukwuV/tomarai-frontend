import React, { createContext, useContext, useEffect, useState } from 'react';
import socket from '@/lib/socket';

interface WebSocketContextType {
  isConnected: boolean;
  marketPrediction: any;
  tradingSignals: any[];
  marketMetrics: any;
  connect: () => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [marketPrediction, setMarketPrediction] = useState<any>(null);
  const [tradingSignals, setTradingSignals] = useState<any[]>([]);
  const [marketMetrics, setMarketMetrics] = useState<any>(null);

  const handleConnect = () => {
    console.log('Connected to WebSocket');
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleMarketPrediction = (data: any) => {
    console.log('Market Prediction:', data);
    setMarketPrediction(data?.data);
  };

  const handleTradingSignals = (data: any) => {
    console.log('Trading Signals:', data);
    setTradingSignals(prev => [...data?.data, ...prev].slice(0, 50)); // Keep last 50 signals
  };

  const handleMarketMetrics = (data: any) => {
    console.log('Market Metrics:', data);
    setMarketMetrics(data);
  };

  const connect = () => {
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  useEffect(() => {
    // Set up event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('market_prediction', handleMarketPrediction);
    socket.on('trading_signals', handleTradingSignals);
    socket.on('market_metrics', handleMarketMetrics);

    // Connect to socket
    connect();

    // Clean up




    
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('market_prediction', handleMarketPrediction);
      socket.off('trading_signals', handleTradingSignals);
      socket.off('market_metrics', handleMarketMetrics);
      disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        marketPrediction,
        tradingSignals,
        marketMetrics,
        connect,
        disconnect
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};