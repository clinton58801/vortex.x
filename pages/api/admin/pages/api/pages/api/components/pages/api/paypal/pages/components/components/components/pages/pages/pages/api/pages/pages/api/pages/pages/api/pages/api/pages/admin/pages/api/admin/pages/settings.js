// pages/settings.js

import { useState, useEffect } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [memoryEnabled, setMemoryEnabled] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  const toggleMemory = () => {
    setMemoryEnabled(!memoryEnabled);
    localStorage.setItem('memory', JSON.stringify(!memoryEnabled));
  };

  const exportChat = () => {
    const chat = localStorage.getItem('chatHistory') || 'No chat history found.';
    const blob = new Blob([chat], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'VortexX_Chat_History.txt';
    link.click();
  };

  useEffect(() => {
    const savedDark = JSON.parse(localStorage.getItem('darkMode') || 'true');
    const savedMemory = JSON.parse(localStorage.getItem('memory') || 'true');

    setDarkMode(savedDark);
    setMemoryEnabled(savedMemory);

    if (savedDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">⚙️ User Settings</h1>

      <div className="space-y-6">
        <SettingSwitch
          label="🌙 Dark Mode"
          isOn={darkMode}
          toggle={toggleDarkMode}
        />

        <SettingSwitch
          label="🧠 Chat Memory"
          isOn={memoryEnabled}
          toggle={toggleMemory}
        />

        <div>
          <h2 className="text-lg mb-2">🗃️ Export Chat History</h2>
          <button
            onClick={exportChat}
            className="bg-neon-blue text-black px-4 py-2 rounded font-semibold"
          >
            Download .txt
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingSwitch({ label, isOn, toggle }) {
  return (
    <div className="flex items-center justify-between bg-[#1e293b] p-4 rounded-lg">
      <span>{label}</span>
      <button
        onClick={toggle}
        className={`w-14 h-7 flex items-center rounded-full px-1 ${
          isOn ? 'bg-green-400' : 'bg-gray-600'
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full transform duration-300 ${
            isOn ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
