export default function Dashboard({ user }) {
  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Plan: {user.plan}</p>
      <button onClick={() => alert('Launching Agent...')}>Run AI Agent</button>
    </div>
  );
}
