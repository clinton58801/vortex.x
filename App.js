import { useState } from 'react';
import Login from './Login.js';
import Dashboard from './Dashboard.js';

export default function App() {
  const [user, setUser] = useState(null);
  return user ? Dashboard({ user }) : Login({ onLogin: setUser });
}
