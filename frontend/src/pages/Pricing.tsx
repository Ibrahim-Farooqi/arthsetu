import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/atoms/Button';
import subscriptionService from '../services/subscription.service';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Pricing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await subscriptionService.getPlans();
        setPlans(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast.error('Please log in first');
      navigate('/login');
      return;
    }
    
    try {
      const order = await subscriptionService.createOrder(planId);
      
      // Mock Razorpay popup since we don't have the script loaded
      const mockSuccess = window.confirm(`Proceed with mock payment of ₹${order.amount / 100}?`);
      
      if (mockSuccess) {
        await subscriptionService.verifyPayment(
          order.order_id,
          `pay_${Math.random().toString(36).substr(2, 9)}`,
          "mock_signature",
          planId
        );
        toast.success('Subscription activated! Welcome to Premium.');
        window.location.reload();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Payment failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#172033] mb-4">
            Invest Smarter. Earn More.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Access high-conviction stock theses, transparent research update timelines, Opportunity Radar signals, and AI intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center text-slate-500">Loading plans...</div>
          ) : plans.length === 0 ? (
            <div className="col-span-full text-center text-slate-500">No active plans found. Please seed the database.</div>
          ) : (
            plans.map((plan, i) => (
              <motion.div 
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-3xl p-8 border ${
                  plan.plan_type === 'PREMIUM' 
                    ? 'border-primary shadow-xl shadow-[rgba(21,81,157,0.3)]/10 relative' 
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {plan.plan_type === 'PREMIUM' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold flex items-center">
                    <Zap className="w-3 h-3 mr-1 fill-white" /> MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-[#172033]">₹{plan.price}</span>
                  <span className="text-slate-500 font-medium">/ {plan.duration_days} days</span>
                </div>
                
                <p className="text-sm text-slate-600 mb-8 h-10">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {['High-Conviction Research Thesis', 'Timestamped Thesis Updates', 'Personalized AI Copilot'].map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm font-medium text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                  {plan.plan_type === 'PREMIUM' && (
                    <li className="flex items-center text-sm font-bold text-primary">
                      <div className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center mr-3 shrink-0">
                        <ShieldCheck className="w-3 h-3 text-primary" />
                      </div>
                      Opportunity Radar & Prime Collections
                    </li>
                  )}
                </ul>
                
                <Button 
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full"
                  variant={plan.plan_type === 'PREMIUM' ? 'primary' : 'secondary'}
                >
                  {user?.is_premium ? 'Extend Plan' : 'Subscribe Now'}
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
