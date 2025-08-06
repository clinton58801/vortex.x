import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      document.cookie = "user_status=free";
      router.push('/');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-neon-blue">🧠 Create Vortex.X Account</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-6 px-4 py-2 rounded bg-gray-800 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-neon-blue text-black font-bold py-2 rounded hover:bg-white transition"
        >
          Register →
        </button>
      </div>
    </main>
  );
}
