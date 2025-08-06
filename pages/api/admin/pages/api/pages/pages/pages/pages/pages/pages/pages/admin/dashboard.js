export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card title="🧠 Total Users" value="7,481" />
        <Card title="💬 Conversations Today" value="1,204" />
        <Card title="🚀 Pro / Premium Users" value="264" />
        <Card title="📈 Page Views (24h)" value="18,976" />
        <Card title="🧾 Revenue (Monthly)" value="$5,340" />
        <Card title="📂 Files Uploaded" value="438" />
      </div>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 text-center shadow-lg">
      <h3 className="text-md font-semibold text-gray-400">{title}</h3>
      <p className="text-3xl font-bold text-neon-blue mt-2">{value}</p>
    </div>
  );
}
