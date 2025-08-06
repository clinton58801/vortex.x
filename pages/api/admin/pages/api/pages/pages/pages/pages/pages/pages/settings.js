import { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    // Fake chat export logic
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">⚙️ Settings</h1>

      <div className="max-w-xl mx-auto space-y-6 bg-gray-900 p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold">🌙 Dark Mode</label>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 font-bold rounded ${
              darkMode ? 'bg-neon-blue text-black' : 'bg-gray-700 text-white'
            }`}
          >
            {darkMode ? 'On' : 'Off'}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <label className="text-lg font-semibold">💾 Export Chat History</label>
          <button
            onClick={handleExport}
            className="bg-neon-blue text-black px-4 py-2 font-bold rounded hover:bg-white transition"
          >
            Export
          </button>
        </div>

        {exported && <p className="text-green-400 mt-4">✅ Chat history exported!</p>}
      </div>
    </main>
  );
}
