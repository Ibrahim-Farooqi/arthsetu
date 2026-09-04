import api from './api';

export interface Watchlist {
  id: string;
  name: string;
  user_id: string;
  is_default: boolean;
  created_at: string;
  items?: WatchlistItem[];
}

export interface WatchlistItem {
  id: string;
  watchlist_id: string;
  symbol: string;
  added_at: string;
}

class WatchlistService {
  async getWatchlistItems(): Promise<WatchlistItem[]> {
    try {
      const response = await api.get('/watchlist');
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch watchlist from backend', error);
      return [];
    }
  }

  async addStockToWatchlist(stockId: string): Promise<boolean> {
    try {
      await api.post(`/watchlist/${stockId}`);
      return true;
    } catch (error) {
      console.error('Failed to add stock to backend watchlist', error);
      return false;
    }
  }

  async removeStockFromWatchlist(stockId: string): Promise<boolean> {
    try {
      await api.delete(`/watchlist/${stockId}`);
      return true;
    } catch (error) {
      console.error('Failed to remove stock from backend watchlist', error);
      return false;
    }
  }
}

export const watchlistService = new WatchlistService();
export default watchlistService;
