import { useState, useEffect } from 'react';
import { wsService, type PriceUpdate, type WebSocketStatus } from '../services/websocket.service';

export interface UseWebSocketReturn {
  status: WebSocketStatus;
  prices: Record<string, PriceUpdate>;
  subscribe: (symbol: string) => void;
  unsubscribe: (symbol: string) => void;
  getPrice: (symbol: string) => PriceUpdate | undefined;
}

export const useWebSocket = (initialSymbols: string[] = []): UseWebSocketReturn => {
  const [status, setStatus] = useState<WebSocketStatus>(wsService.getStatus());
  const [prices, setPrices] = useState<Record<string, PriceUpdate>>(wsService.getPrices());

  useEffect(() => {
    initialSymbols.forEach((sym) => wsService.subscribe(sym));

    const handleUpdate = (updatedPrices: Record<string, PriceUpdate>) => {
      setPrices(updatedPrices);
      setStatus(wsService.getStatus());
    };

    wsService.addListener(handleUpdate);

    return () => {
      wsService.removeListener(handleUpdate);
    };
  }, [initialSymbols]);

  const subscribe = (symbol: string) => wsService.subscribe(symbol);
  const unsubscribe = (symbol: string) => wsService.unsubscribe(symbol);
  const getPrice = (symbol: string) => prices[symbol.toUpperCase()];

  return {
    status,
    prices,
    subscribe,
    unsubscribe,
    getPrice
  };
};
