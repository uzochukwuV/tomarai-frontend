import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types';
import { Button } from '../ui/button';

const exampleQuestions = [
  "What's the next 100x coin?",
  "Which tokens have the highest confidence scores right now?",
  "What are the current market trends for Bitcoin?",
  "What trading signals were detected in the last 24 hours?",
];

// Mock the API call for demonstration
const askTMAI = async (question: string) => {
  // Simulate API response time
  const res = await fetch(`http://localhost:5000/api/ask-tmai?q=${question}`, )
  const data = await res.json();
  console.log("API call to Token Metrics AI");
  console.log("Response:", data);
  
  return {
    success: true,
    message: "AI Chatbot response successful",
    answer: `Based on the current market data and Token Metrics AI analysis, ${question.includes('100x') ? 
        'the tokens with the highest growth potential in our analysis are Solana (SOL) and Avalanche (AVAX). Both show strong fundamentals and technical indicators that suggest significant upside potential. However, please remember that all investments carry risk, and past performance is not indicative of future results.' : 
        'we\'ve analyzed the current market conditions and found that the overall sentiment is cautiously optimistic. Bitcoin has shown resilience above key support levels, and Ethereum continues to demonstrate strong network growth. Our analysis indicates that the market may experience moderate growth in the coming weeks, though volatility remains a factor to consider in your trading strategy.'}`,
    thread: [
      {
        user: question
      },
      {
        chatbot: `Based on the current market data and Token Metrics AI analysis, ${question.includes('100x') ? 
        'the tokens with the highest growth potential in our analysis are Solana (SOL) and Avalanche (AVAX). Both show strong fundamentals and technical indicators that suggest significant upside potential. However, please remember that all investments carry risk, and past performance is not indicative of future results.' : 
        'we\'ve analyzed the current market conditions and found that the overall sentiment is cautiously optimistic. Bitcoin has shown resilience above key support levels, and Ethereum continues to demonstrate strong network growth. Our analysis indicates that the market may experience moderate growth in the coming weeks, though volatility remains a factor to consider in your trading strategy.'}`
      }
    ]
  };
};

const ChatbotView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(false);
  
  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessageType = { user: message };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setLoading(true);
    
    try {
      // Call AI API
      const response = await askTMAI(message);
      
      if (response.success) {
        // Add bot response
        const botMessage: ChatMessageType = { chatbot: response.answer };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: ChatMessageType = { 
        chatbot: "Sorry, I encountered an error processing your request. Please try again." 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Chatbot</h1>
        <p className="text-muted-foreground">
          Ask questions about crypto markets and get AI-powered insights
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b bg-muted/50">
              <CardTitle>Token Metrics AI Chat</CardTitle>
              <CardDescription>
                Get insights about market trends and token predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Bot className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Welcome to Token Metrics AI</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mt-2">
                      Ask me anything about cryptocurrency markets, token predictions, or trading signals.
                    </p>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                  ))
                )}
                {loading && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                    </div>
                    <span>Token Metrics AI is thinking...</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Example Questions
              </CardTitle>
              <CardDescription>
                Try asking these questions to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {exampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => !loading && handleSendMessage(question)}
                    disabled={loading}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatbotView;