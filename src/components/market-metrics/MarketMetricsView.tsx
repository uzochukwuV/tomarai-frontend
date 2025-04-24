import React from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import MetricsChart from './MetricsChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MarketMetricsView: React.FC = () => {
  const { marketMetrics, isConnected } = useWebSocket();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Market Metrics</h1>
        <p className="text-muted-foreground">
          Overall market trends and metrics visualization
        </p>
      </div>
      
      {marketMetrics && marketMetrics.data?.length > 0 ? (
        <>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Current Market Status</CardTitle>
                {marketMetrics.data[0].TM_GRADE_SIGNAL === 1 ? (
                  <Badge className="bg-green-500">Positive</Badge>
                ) : marketMetrics.data[0].TM_GRADE_SIGNAL === -1 ? (
                  <Badge variant="destructive">Negative</Badge>
                ) : (
                  <Badge variant="outline">Neutral</Badge>
                )}
              </div>
              <CardDescription>
                Based on the percentage of high-grade coins and overall market cap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="text-sm text-muted-foreground">Total Crypto Market Cap</span>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      notation: 'compact',
                      maximumFractionDigits: 2
                    }).format(marketMetrics.data[0].TOTAL_CRYPTO_MCAP)}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">High Grade Coins Percentage</span>
                  <div className="text-2xl font-bold">
                    {marketMetrics.data[0].TM_GRADE_PERC_HIGH_COINS.toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <MetricsChart 
            data={marketMetrics.data} 
            title="Market Trends" 
            description="Total crypto market cap and percentage of high-grade coins over time"
          />
        </>
      ) : (
        <div className="flex h-[400px] w-full items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <PieChart className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">No market metrics available</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {isConnected 
                ? "Waiting for market metrics data to arrive..." 
                : "Connection lost. Reconnecting to the server..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketMetricsView;