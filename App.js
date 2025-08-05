import { useState } from 'react';
import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';

export default function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setShowSignup(false);
  };

  if (user) return Dashboard({ user, onLogout: handleLogout });

  return showSignup
    ? Signup({ onSignup: setUser })
    : Login({ onLogin: setUser, switchToSignup: () => setShowSignup(true) });
}
