export default function Login({ onLogin }) {
  return (
    <div>
      <h1>Login to VORTEX.X</h1>
      <button onClick={() => onLogin({ name: 'DemoUser', plan: 'Pro' })}>
        Login as Demo
      </button>
    </div>
  );
}
