// components/PricingPlans.jsx

import React from 'react';
import axios from 'axios';

const plans = [
  {
    name: 'Free',
    tier: 'free',
    price: '$0/mo',
    features: ['Limited AI Agent Access', 'Basic Chat', 'No File Uploads'],
    button: null,
  },
  {
    name: 'Pro',
    tier: 'pro',
    price: '$19.99/mo',
    features: ['Chat + Code + FileBrain', 'Priority AI Bandwidth', 'PDF Parsing', 'Save History'],
    button: 'Upgrade to Pro',
  },
  {
    name: 'Premium',
    tier: 'premium',
    price: '$39.99/mo',
    features: ['All Pro Features', 'DeepSeek + Memory Engine', 'Early Agent Access', 'Admin Bypass Tools'],
    button: 'Upgrade to Premium',
  },
];

const PricingPlans = ({ userId }) => {
  const handleSubscribe = async (tier) => {
    try {
      const res = await axios.post('/api/paypal/subscribe', {
        plan: tier,
        userId,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error('Subscription error:', err.message);
      alert('Failed to start subscription.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-16">
      <h2 className="text-4xl font-bold text-center text-neon-blue mb-12">💳 Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {plans.map((plan) => (
          <div key={plan.tier} className="bg-[#1e293b] p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-neon-blue text-2xl font-semibold">{plan.price}</p>

            <ul className="my-4 space-y-2 text-sm">
              {plan.features.map((f, i) => (
                <li key={i} className="text-gray-300">✔️ {f}</li>
              ))}
            </ul>

            {plan.button ? (
              <button
                onClick={() => handleSubscribe(plan.tier)}
                className="w-full bg-neon-blue hover:bg-blue-600 mt-4 py-2 rounded font-semibold"
              >
                {plan.button}
              </button>
            ) : (
              <div className="mt-6 text-sm text-gray-400">You are currently on Free Tier</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
