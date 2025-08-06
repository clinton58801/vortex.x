export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-neon-blue mb-4">💳 Vortex.X Plans</h1>
        <p className="text-gray-400 mb-10">Start free. Upgrade for full power.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Plan
            name="Free"
            price="$0"
            features={[
              'Basic chat access',
              'Limited DeepSeek usage',
              'Upload 1 file per day',
              'No save history',
            ]}
            button="Start Free"
          />

          <Plan
            name="Pro"
            price="$19.99/mo"
            features={[
              'Unlimited chat & memory',
              'Unlimited DeepSeek & file uploads',
              'Download chat history',
              'Basic analytics',
            ]}
            button="Upgrade to Pro"
            highlight
          />

          <Plan
            name="Premium"
            price="$39.99/mo"
            features={[
              'All Pro features',
              'Admin dashboard access',
              'Priority processing',
              'Early access to new tools',
            ]}
            button="Go Premium"
          />
        </div>

        <p className="text-sm text-gray-500 mt-10">Recurring billing via PayPal. Cancel anytime.</p>
      </section>
    </main>
  );
}

function Plan({ name, price, features, button, highlight }) {
  return (
    <div
      className={`bg-gray-900 rounded-lg p-6 shadow-lg ${
        highlight ? 'border-2 border-neon-blue' : 'border border-gray-800'
      }`}
    >
      <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
      <p className="text-3xl font-bold text-neon-blue mb-4">{price}</p>
      <ul className="text-sm text-gray-300 text-left space-y-2 mb-6">
        {features.map((f, i) => (
          <li key={i}>✅ {f}</li>
        ))}
      </ul>
      <button className="w-full bg-neon-blue text-black font-bold py-2 rounded-lg hover:bg-white transition">
        {button}
      </button>
    </div>
  );
}
