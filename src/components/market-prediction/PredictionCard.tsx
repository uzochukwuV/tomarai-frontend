import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Token } from '@/types';

interface PredictionCardProps {
  token: Token;
  className?: string;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ token, className }) => {
  const { symbol, token_id, token_trend, combined_score = 0, confidence = 0 } = token;
  
  // Format confidence for display
  const formattedConfidence = Math.round(confidence);
  const formattedScore = Math.round(combined_score * 100);
  
  // Determine trend color and icon
  const isBullish = token_trend === 1;
  
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            {symbol}
          </CardTitle>
          <Badge variant={isBullish ? "default" : "destructive"}>
            {isBullish ? (
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 mr-1" />
            )}
            {isBullish ? 'Bullish' : 'Bearish'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Combined Score</span>
              <span className="font-medium">{formattedScore}%</span>
            </div>
            <Progress value={formattedScore} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Confidence</span>
              <span className="font-medium">{formattedConfidence}%</span>
            </div>
            <Progress 
              value={formattedConfidence} 
              className="h-2"
              indicatorClassName={cn(
                formattedConfidence >= 70 ? "bg-green-500" : 
                formattedConfidence >= 40 ? "bg-yellow-500" : 
                "bg-red-500"
              )}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-muted-foreground">
        Token ID: {token_id}
      </CardFooter>
    </Card>
  );
};

export default PredictionCard;