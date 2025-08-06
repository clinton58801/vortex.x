// pages/payment-success.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default function PaymentSuccess() {
  const router = useRouter();
  const { userId, tier } = router.query;

  const [status, setStatus] = useState('Processing your upgrade...');

  useEffect(() => {
    if (userId && tier) {
      upgradeUser();
    }

    async function upgradeUser() {
      const { error } = await supabase
        .from('users')
        .update({ tier })
        .eq('id', userId);

      if (error) {
        setStatus('Upgrade failed. Please contact support.');
        console.error('Upgrade error:', error.message);
      } else {
        setStatus(`✅ Upgrade to "${tier}" successful!`);
      }
    }
  }, [userId, tier]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-6">
      <div className="bg-[#1e293b] p-8 rounded-xl shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-neon-blue mb-4">🎉 Payment Success</h1>
        <p>{status}</p>
        <a
          href="/dashboard"
          className="mt-6 inline-block bg-neon-blue px-6 py-2 rounded text-white font-semibold"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
