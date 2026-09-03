import api from './api';

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  plan_type: string;
  price: number;
  duration_days: number;
  is_active: boolean;
}

export interface OrderResponse {
  order_id: string;
  amount: number;
  currency: string;
  key_id: string;
}

class SubscriptionService {
  /**
   * Fetch all active subscription plans
   */
  async getPlans(): Promise<Plan[]> {
    const response = await api.get('/subscriptions/plans');
    return response.data;
  }

  /**
   * Create a Razorpay order for a specific plan
   */
  async createOrder(planId: string): Promise<OrderResponse> {
    const response = await api.post('/subscriptions/orders', { plan_id: planId });
    return response.data;
  }

  /**
   * Verify a successful Razorpay payment
   */
  async verifyPayment(orderId: string, paymentId: string, signature: string, planId: string): Promise<any> {
    const response = await api.post('/subscriptions/verify', {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      plan_id: planId
    });
    return response.data;
  }
}

export const subscriptionService = new SubscriptionService();
export default subscriptionService;
