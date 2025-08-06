import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "user_status=free";
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-neon-blue mb-4">👤 My Account</h1>

        {user ? (
          <>
            <p className="mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="mb-6">
              <strong>Plan:</strong>{' '}
              <span className="text-green-400">
                {getCookie('user_status') || 'free'}
              </span>
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => router.push('/upgrade')}
                className="bg-neon-blue text-black font-bold px-4 py-2 rounded hover:bg-white transition"
              >
                Upgrade →
              </button>

              <button
                onClick={handleLogout}
                className="bg-gray-700 text-white font-bold px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

// Basic cookie reader
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}
