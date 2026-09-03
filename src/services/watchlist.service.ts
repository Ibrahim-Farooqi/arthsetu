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
  async getWatchlists(): Promise<Watchlist[] | null> {
    try {
      const response = await api.get('/watchlist/');
      if (response.data && response.data.length > 0) return response.data;
    } catch (error) {
      console.error('Failed to fetch watchlists from backend', error);
    }
    
    // Fallback to local storage
    const local = localStorage.getItem('univest_watchlists');
    return local ? JSON.parse(local) : null;
  }

  async createWatchlist(name: string, is_default: boolean = false): Promise<Watchlist | null> {
    try {
      const response = await api.post('/watchlist/', { name, is_default });
      return response.data;
    } catch (error) {
      console.error('Failed to create watchlist on backend', error);
    }
    
    // Fallback to local storage
    const local = localStorage.getItem('univest_watchlists');
    const watchlists = local ? JSON.parse(local) : [];
    const newW: Watchlist = {
      id: `wl_${Date.now()}`,
      name,
      user_id: 'local_user',
      is_default,
      created_at: new Date().toISOString(),
      items: []
    };
    watchlists.push(newW);
    localStorage.setItem('univest_watchlists', JSON.stringify(watchlists));
    return newW;
  }

  async addStockToWatchlist(watchlistId: string, symbol: string): Promise<WatchlistItem | null> {
    try {
      const response = await api.post(`/watchlist/${watchlistId}/items`, { symbol });
      return response.data;
    } catch (error) {
      console.error('Failed to add stock to backend watchlist', error);
    }
    
    // Fallback to local storage
    const local = localStorage.getItem('univest_watchlists');
    if (local) {
      const watchlists = JSON.parse(local);
      const wlIndex = watchlists.findIndex((w: any) => w.id === watchlistId);
      if (wlIndex !== -1) {
        const newItem: WatchlistItem = {
          id: `item_${Date.now()}`,
          watchlist_id: watchlistId,
          symbol,
          added_at: new Date().toISOString()
        };
        watchlists[wlIndex].items = watchlists[wlIndex].items || [];
        // Prevent duplicates
        if (!watchlists[wlIndex].items.some((i: any) => i.symbol === symbol)) {
          watchlists[wlIndex].items.push(newItem);
          localStorage.setItem('univest_watchlists', JSON.stringify(watchlists));
        }
        return newItem;
      }
    }
    return null;
  }
}

export const watchlistService = new WatchlistService();
export default watchlistService;
