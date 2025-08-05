import { useState, useEffect } from 'react';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  // Load from localStorage on first load
  useEffect(() => {
    const savedUser = localStorage.getItem('vx_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('vx_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setShowSignup(false);
    localStorage.removeItem('vx_user');
  };

  if (user) return Dashboard({ user, onLogout: handleLogout });

  return showSignup
    ? Signup({ onSignup: handleLogin })
    : Login({ onLogin: handleLogin, switchToSignup: () => setShowSignup(true) });
}
