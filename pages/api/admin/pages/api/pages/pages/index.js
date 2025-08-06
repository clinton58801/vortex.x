export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-neon-blue mb-6 drop-shadow-lg">
          Vortex.X
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8">
          The Ultimate All-In-One AI Agent<br /> ChatGPT × Replit × DeepSeek × FileBrain
        </p>

        <div className="text-left mx-auto max-w-2xl space-y-4 mb-10">
          <Feature title="🧠 Chat Like a Genius" desc="Advanced AI conversations with memory, dark mode, and downloadable history." />
          <Feature title="💻 Replit Power" desc="Generate and test real code on the fly with a built-in developer brain." />
          <Feature title="🔍 DeepSeek AI" desc="Research anything, break down articles, and analyze data with powerful summarization." />
          <Feature title="📂 FileBrain Uploads" desc="Upload PDFs, Docs, or notes and ask questions directly. Instant insights." />
          <Feature title="📊 Admin Dashboard" desc="Built-in metrics and user analytics. No extra tools needed." />
        </div>

        <a
          href="/chat"
          className="bg-neon-blue text-black text-lg px-6 py-3 font-bold rounded-full shadow-xl hover:bg-white transition"
        >
          Enter the Vortex →
        </a>

        <p className="mt-6 text-sm text-gray-500">Free trial available. No monthly credits. Just raw power.</p>
      </section>
    </main>
  );
}

function Feature({ title, desc }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}
