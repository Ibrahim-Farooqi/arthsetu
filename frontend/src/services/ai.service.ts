import api from './api';

export interface AiAnalysisRequest {
  symbol: string;
  timeframe?: string;
}

export interface AiRecommendationResponse {
  id: string;
  symbol: string;
  recommendation: string;
  confidence_score: number;
  analysis_text: string;
  created_at: string;
}

export interface AiChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AiChatRequest {
  messages: AiChatMessage[];
}

export interface AiChatResponse {
  text: string;
  confidence?: number;
  relatedStocks?: string[];
  relatedResearch?: string;
  type?: string;
}

export interface AiPortfolioAnalysisResponse {
  overall_health: string;
  health_score: number;
  top_performers: string[];
  weak_performers: string[];
  recommended_actions: string[];
  detailed_analysis: string;
}

export interface AiMarketMoversResponse {
  market_mood: string;
  best_returns: string[];
  worst_returns: string[];
  analysis_text: string;
}

class AiService {
  /**
   * Run an AI-based technical and sentiment analysis on a specific stock symbol.
   */
  async analyzeStock(request: AiAnalysisRequest): Promise<AiRecommendationResponse> {
    const response = await api.post('/ai/analyze', request);
    return response.data;
  }

  /**
   * Chat with the AI Copilot.
   */
  async chatWithCopilot(request: AiChatRequest): Promise<AiChatResponse> {
    const response = await api.post('/ai/chat', request);
    return response.data;
  }

  /**
   * Analyze the user's portfolio and provide actionable insights.
   */
  async analyzePortfolio(): Promise<AiPortfolioAnalysisResponse> {
    const response = await api.get('/ai/portfolio/analyze');
    return response.data;
  }

  /**
   * Analyze the best and worst performing stocks in the market today.
   */
  async analyzeMarketMovers(): Promise<AiMarketMoversResponse> {
    const response = await api.get('/ai/market/movers/analyze');
    return response.data;
  }

  /**
   * Fetch high-conviction AI picks including stocks and mutual funds with high return potential.
   */
  async getHighConvictionPicks(): Promise<any[]> {
    try {
      const response = await api.get('/ai/high-conviction-picks');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch real AI high-conviction picks', error);
      return [];
    }
  }
}

export const aiService = new AiService();
export default aiService;
