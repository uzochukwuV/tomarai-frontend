import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';

const WelcomeCard: React.FC = () => {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Welcome to Token Metrics AI</CardTitle>
        <CardDescription>
          Real-time cryptocurrency market predictions and analysis powered by advanced AI algorithms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary dark:bg-primary/20">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Live Market Data</p>
              <p className="text-sm text-muted-foreground">
                All data is updated in real-time via WebSocket connections. Green indicator means you're receiving live updates.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary dark:bg-primary/20">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">AI-Powered Analysis</p>
              <p className="text-sm text-muted-foreground">
                Use the AI Chatbot to ask complex questions about market trends and receive data-backed insights.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1.5 text-primary dark:bg-primary/20">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Trading Signals</p>
              <p className="text-sm text-muted-foreground">
                View and filter trading signals to identify potential market opportunities across different tokens.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;