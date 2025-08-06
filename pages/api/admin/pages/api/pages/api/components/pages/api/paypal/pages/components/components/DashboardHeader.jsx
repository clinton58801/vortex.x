// components/DashboardHeader.jsx

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const DashboardHeader = () => {
  const [user, setUser] = useState(null);
  const [tier, setTier] = useState('free');

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);

        const { data, error } = await supabase
          .from('users')
          .select('tier')
          .eq('id', session.user.id)
          .single();

        if (!error && data?.tier) {
          setTier(data.tier);
        }
      }
    };

    getUser();
  }, []);

  const badgeColor =
    tier === 'premium'
      ? 'bg-yellow-400 text-black'
      : tier === 'pro'
      ? 'bg-blue-500 text-white'
      : 'bg-gray-500 text-white';

  return (
    <div className="flex items-center justify-between bg-[#1e293b] p-4 rounded-xl mb-6 shadow text-white">
      <div>
        <p className="text-sm font-semibold">👤 {user?.email || 'Not logged in'}</p>
        <span className={`inline-block px-3 py-1 mt-1 rounded-full text-xs font-bold ${badgeColor}`}>
          {tier.toUpperCase()} Tier
        </span>
      </div>

      {tier !== 'premium' && (
        <Link href="/pricing">
          <button className="bg-neon-blue hover:bg-blue-600 px-4 py-2 rounded text-white text-sm font-semibold">
            Upgrade Plan
          </button>
        </Link>
      )}
    </div>
  );
};

export default DashboardHeader;
