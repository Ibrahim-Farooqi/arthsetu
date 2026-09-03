import toast from 'react-hot-toast';

export const customToast = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        borderRadius: '16px',
        background: '#172033',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 700,
        padding: '12px 16px',
        boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)',
      },
      iconTheme: {
        primary: '#10B981',
        secondary: '#fff',
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      style: {
        borderRadius: '16px',
        background: '#172033',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 700,
        padding: '12px 16px',
        boxShadow: '0 10px 25px -5px rgba(244, 63, 94, 0.3)',
      },
      iconTheme: {
        primary: '#F43F5E',
        secondary: '#fff',
      },
    });
  },

  tradeExecuted: (symbol: string, type: 'BUY' | 'SELL', price: string, qty: number) => {
    toast.success(`${type} Order Executed: ${qty} shares of ${symbol} at ₹${price}`, {
      duration: 4000,
      style: {
        borderRadius: '18px',
        background: '#172033',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 800,
        border: '1px solid #6D4AFF',
      },
    });
  },

  depositSuccess: (amount: number) => {
    toast.success(`Deposit Confirmed! ₹${amount.toLocaleString('en-IN')} credited to wallet`, {
      duration: 4000,
      style: {
        borderRadius: '18px',
        background: '#172033',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 800,
        border: '1px solid #10B981',
      },
    });
  },

  connectionStatus: (status: 'connected' | 'disconnected') => {
    if (status === 'connected') {
      toast.success('Live market feed connected', { duration: 2000 });
    } else {
      toast.error('Reconnecting to live feed...', { duration: 3000 });
    }
  }
};

export default customToast;
