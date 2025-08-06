// pages/index.js
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Head>
        <title>VORTEX.X | All-in-One AI Platform</title>
      </Head>
      <header className="p-6 text-center bg-vortex shadow-lg">
        <h1 className="text-4xl font-bold">Welcome to VORTEX.X</h1>
        <p className="text-lg mt-2">Your all-in-one AI supertool. Built to dominate.</p>
      </header>
      <main className="p-10 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold">What can VORTEX.X do?</h2>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>Have intelligent conversations</li>
            <li>Upload files and ask questions</li>
            <li>Perform deep logic & analysis</li>
            <li>Store your chat history</li>
            <li>Upgrade your plan anytime</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Get Started</h2>
          <div className="flex space-x-6 mt-4">
            <Link href="/register" className="bg-vortex px-6 py-2 rounded shadow-md">Create Account</Link>
            <Link href="/login" className="border border-vortex px-6 py-2 rounded">Login</Link>
          </div>
        </section>
      </main>
      <footer className="text-center py-4 border-t border-gray-700 mt-10">
        <p>&copy; {new Date().getFullYear()} VORTEX.X. All rights reserved.</p>
      </footer>
    </div>
  );
}
