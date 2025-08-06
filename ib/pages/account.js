import Head from 'next/head';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.push('/login');
      else setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Head>
        <title>Your Account | VORTEX.X</title>
      </Head>
      <main className="max-w-2xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Account</h1>
        {user && (
          <div className="space-y-4">
            <p>Email: {user.email}</p>
            <p>User ID: {user.id}</p>
            <button onClick={handleLogout} className="bg-vortex text-black px-6 py-2 rounded shadow-md mt-6">
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
