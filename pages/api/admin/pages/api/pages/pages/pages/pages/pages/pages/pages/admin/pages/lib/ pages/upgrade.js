import { paypalPlans } from '../lib/paypalPlans';

export default function UpgradePage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-neon-blue mb-4">🔓 Upgrade Access</h1>
        <p className="text-gray-400 mb-10">Unlock full Vortex.X power with a recurring PayPal subscription.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <UpgradeCard plan="pro" />
          <UpgradeCard plan="premium" />
        </div>
      </section>
    </main>
  );
}

function UpgradeCard({ plan }) {
  const { name, price, paypalButtonId } = paypalPlans[plan];

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-left">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <p className="text-xl text-neon-blue font-bold mb-4">${price} / month</p>

      <ul className="text-sm text-gray-300 space-y-2 mb-6">
        <li>✅ Unlimited usage</li>
        <li>✅ Priority access</li>
        <li>✅ Admin dashboard (Premium only)</li>
        <li>✅ Chat memory, file upload, and more</li>
      </ul>

      <div dangerouslySetInnerHTML={{ __html: generatePayPalHTML(paypalButtonId) }} />
    </div>
  );
}

// 💰 Replace with real PayPal smart button if needed
function generatePayPalHTML(buttonId) {
  return `
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
      <input type="hidden" name="cmd" value="_s-xclick">
      <input type="hidden" name="hosted_button_id" value="${buttonId}">
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
      <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
    </form>
  `;
}
