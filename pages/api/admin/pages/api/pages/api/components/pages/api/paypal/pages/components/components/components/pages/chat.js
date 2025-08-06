// pages/chat.js

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const uid = session?.user?.id;
      setUserId(uid);

      if (uid) {
        const { data } = await supabase
          .from('messages')
          .select('*')
          .eq('user_id', uid)
          .order('created_at', { ascending: true });

        if (data) setMessages(data.map((m) => ({ role: m.role, content: m.content })));
      }
    };

    init();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    await supabase.from('messages').insert({
      user_id: userId,
      role: 'user',
      content: input,
    });

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: newMessages }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    const botMessage = { role: 'assistant', content: data.reply };
    setMessages((prev) => [...prev, botMessage]);

    await supabase.from('messages').insert({
      user_id: userId,
      role: 'assistant',
      content: data.reply,
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">🧠 Vortex Chat</h1>

      <div className="flex-1 overflow-y-auto bg-[#1e293b] rounded-xl p-4 space-y
