// Define all types used across the application

// Token and Prediction Types
export interface Token {
  token_id: number;
  symbol: string;
  name?: string;
  combined_score?: number;
  confidence?: number;
  token_trend?: number;
}

export interface MarketPrediction {
  market_direction: 'bullish' | 'bearish' | 'neutral';
  timestamp: string;
  tokens: Token[];
}

// Trading Signal Types
export interface TradingSignal {
  DATE: string;
  TOKEN_ID: number;
  TOKEN_NAME: string;
  TOKEN_SYMBOL: string;
  TOKEN_TREND: number;
  TRADING_SIGNAL: number;
  TM_TRADER_GRADE: number;
  HOLDING_RETURNS?: number;
  TRADING_SIGNALS_RETURNS?: number;
}

// Market Metrics Types
export interface MarketMetric {
  DATE: string;
  TOTAL_CRYPTO_MCAP: number;
  TM_GRADE_PERC_HIGH_COINS: number;
  TM_GRADE_SIGNAL: number;
  LAST_TM_GRADE_SIGNAL?: number;
}

export interface MarketMetricsData {
  data: MarketMetric[];
}

// Chatbot Types
export interface ChatMessage {
  user?: string;
  chatbot?: string;
}

export interface ChatResponse {
  success: boolean;
  message: string;
  answer: string;
  thread: ChatMessage[];
}

// Navigation
export interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}