import api from './api';

export interface Holding {
  id: string;
  symbol: string;
  quantity: number;
  average_buy_price: number;
  last_synced_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  total_invested: number;
  current_value: number;
  unrealized_pnl: number;
  unrealized_pnl_percentage: number;
  cash_balance: number;
  holdings: Holding[];
}

class PortfolioService {
  /**
   * Fetch the current user's portfolio summary
   */
  async getPortfolio(): Promise<Portfolio> {
    const response = await api.get('/portfolio/');
    return response.data;
  }

  /**
   * Deposit funds into wallet
   */
  async depositFunds(amount: number): Promise<{ message: string, cash_balance: number }> {
    const response = await api.post('/portfolio/deposit', { amount });
    return response.data;
  }
}

export const portfolioService = new PortfolioService();
export default portfolioService;
