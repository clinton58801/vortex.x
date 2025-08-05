import { useState } from 'react';

export default function Signup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState('Free');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Create Your VX Account</h1>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', margin: '10px' }}
      />
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="Free">Free</option>
        <option value="Pro">Pro</option>
        <option value="Premium">Premium</option>
      </select>
      <br />
      <button
        onClick={() => {
          if (!email) return alert('Enter your email');
          onSignup({ name: email.split('@')[0], plan });
        }}
        style={{ padding: '10px 20px', marginTop: '10px' }}
      >
        Sign Up
      </button>
    </div>
  );
}
