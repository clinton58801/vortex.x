import { getFeaturesForPlan } from './SubscriptionManager.js';

export default function Dashboard({ user }) {
  const features = getFeaturesForPlan(user.plan);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user.name}</h2>
      <p>Plan: <strong>{user.plan}</strong></p>

      <h3>Your Features:</h3>
      <ul>
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <button onClick={() => alert('Launching Agent...')}>
        Run AI Agent
      </button>

      <br /><br />
      <button onClick={() => alert('Cancel subscription logic here')}>
        Cancel Subscription
      </button>
    </div>
  );
}
