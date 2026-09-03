import api from './api';

export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP' | 'STOP_LIMIT';
export type OrderStatus = 'PENDING' | 'EXECUTED' | 'CANCELLED' | 'REJECTED';

export interface OrderCreate {
  symbol: string;
  side: OrderSide;
  order_type: OrderType;
  quantity: number;
  price?: number;
  trigger_price?: number;
  broker_account_id?: string;
}

export interface OrderResponse {
  id: string;
  user_id: string;
  symbol: string;
  side: OrderSide;
  order_type: OrderType;
  quantity: number;
  price?: number;
  trigger_price?: number;
  status: OrderStatus;
  broker_order_id?: string;
  created_at: string;
}

class OrderService {
  /**
   * Place a new 1-click trade via connected broker
   */
  async placeOrder(data: OrderCreate): Promise<OrderResponse> {
    const response = await api.post('/orders/place', data);
    return response.data;
  }

  /**
   * Fetch user's order history
   */
  async getHistory(): Promise<OrderResponse[]> {
    const response = await api.get('/orders/history');
    return response.data;
  }
}

export const orderService = new OrderService();
export default orderService;
