import marketService from './market.service';

export interface PriceUpdate {
  symbol: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: string;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

type Listener = (prices: Record<string, PriceUpdate>) => void;

class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private status: WebSocketStatus = 'disconnected';
  private subscribedSymbols: Set<string> = new Set();
  private prices: Record<string, PriceUpdate> = {};
  private listeners: Set<Listener> = new Set();
  private pollTimer: any = null;

  private constructor() {
    this.startLiveFeed();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private startLiveFeed() {
    this.status = 'connected';
    
    // Connect live WebSocket if supported, fallback to periodic Groww market backend polling
    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/api/v1/market/ws/live';
    try {
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onopen = () => {
        this.status = 'connected';
        if (this.subscribedSymbols.size > 0) {
          this.ws?.send(JSON.stringify({ action: 'subscribe', symbols: Array.from(this.subscribedSymbols) }));
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.symbol && data.lastPrice) {
            this.prices[data.symbol] = {
              symbol: data.symbol,
              lastPrice: data.lastPrice,
              change: data.change || 0,
              changePercent: data.changePercent || 0,
              volume: data.volume || 0,
              timestamp: data.timestamp || new Date().toISOString(),
              high: data.high || data.lastPrice,
              low: data.low || data.lastPrice,
              open: data.open || data.lastPrice,
              previousClose: data.previousClose || data.lastPrice
            };
            this.notifyListeners();
          }
        } catch (e) {
          // ignore invalid WS frames
        }
      };

      this.ws.onerror = () => {
        this.status = 'disconnected';
      };
    } catch (err) {
      this.status = 'disconnected';
    }

    // Polling fallback every 10 seconds for backend Groww API batch quotes
    if (this.pollTimer) clearInterval(this.pollTimer);
    let isPolling = false;
    this.pollTimer = setInterval(async () => {
      if (isPolling) return;
      
      const symbols = Array.from(this.subscribedSymbols);
      if (symbols.length === 0) return;

      isPolling = true;
      try {
        const liveQuotes = await marketService.getBatchQuotes(symbols);
        let updated = false;

        Object.entries(liveQuotes).forEach(([sym, quote]) => {
          if (quote && quote.lastPrice) {
            this.prices[sym] = {
              symbol: sym,
              lastPrice: quote.lastPrice,
              change: quote.change,
              changePercent: quote.changePercent,
              volume: quote.volume,
              timestamp: new Date().toISOString(),
              high: quote.high,
              low: quote.low,
              open: quote.open,
              previousClose: quote.previousClose
            };
            updated = true;
          }
        });

        if (updated) {
          this.status = 'connected';
          this.notifyListeners();
        }
      } catch (err) {
        console.error("Polling error:", err);
      } finally {
        isPolling = false;
      }
    }, 10000);
  }

  public subscribe(symbol: string) {
    if (!symbol || typeof symbol !== 'string') return;
    const uppercaseSymbol = symbol.toUpperCase();
    this.subscribedSymbols.add(uppercaseSymbol);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ action: 'subscribe', symbols: [uppercaseSymbol] }));
    }
  }

  public unsubscribe(symbol: string) {
    if (!symbol || typeof symbol !== 'string') return;
    const uppercaseSymbol = symbol.toUpperCase();
    this.subscribedSymbols.delete(uppercaseSymbol);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ action: 'unsubscribe', symbols: [uppercaseSymbol] }));
    }
  }

  public addListener(listener: Listener) {
    this.listeners.add(listener);
    listener(this.prices);
  }

  public removeListener(listener: Listener) {
    this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener({ ...this.prices }));
  }

  public getStatus(): WebSocketStatus {
    return this.status;
  }

  public getPrices(): Record<string, PriceUpdate> {
    return { ...this.prices };
  }
}

export const wsService = WebSocketService.getInstance();
export default wsService;
