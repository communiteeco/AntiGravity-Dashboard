import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { N8nStatusIndicator } from '@/app/N8nStatusIndicator';

export const metadata: Metadata = {
  title: 'CommuniTee Admin | Pixel Office',
  description: 'AI Agent Dashboard Boilerplate',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center pt-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">

        {/* Main Interface Window (The Game Boy/Retro PC Screen) */}
        <div className="w-full max-w-6xl pixel-box h-[85vh] flex flex-col bg-white overflow-hidden">

          {/* Top Navigation Bar */}
          <header className="border-b-[4px] border-[var(--pixel-border)] bg-[#c0c0c0] p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold tracking-tighter text-blue-900 drop-shadow-md">
                CommuniTee HQ
              </h1>
              <nav className="flex gap-2">
                <Link href="/" className="pixel-btn text-xs px-3 py-1">Company</Link>
                <Link href="/agents" className="pixel-btn text-xs px-3 py-1">Agents Menu</Link>
                <Link href="/tasks" className="pixel-btn text-xs px-3 py-1">Active Plans</Link>
              </nav>
            </div>

            <N8nStatusIndicator />
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto bg-[var(--background)] p-6 relative">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
