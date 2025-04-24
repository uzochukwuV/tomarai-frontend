import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardView from '@/components/dashboard/DashboardView';
import MarketPredictionView from '@/components/market-prediction/MarketPredictionView';
import TradingSignalsView from '@/components/trading-signals/TradingSignalsView';
import MarketMetricsView from '@/components/market-metrics/MarketMetricsView';
import ChatbotView from '@/components/chatbot/ChatbotView';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WebSocketProvider } from '@/contexts/WebSocketContext';

function App() {
  return (
    <ThemeProvider>
      <WebSocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DashboardView />} />
              <Route path="market-prediction" element={<MarketPredictionView />} />
              <Route path="trading-signals" element={<TradingSignalsView />} />
              <Route path="market-metrics" element={<MarketMetricsView />} />
              <Route path="chatbot" element={<ChatbotView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </WebSocketProvider>
    </ThemeProvider>
  );
}

export default App;