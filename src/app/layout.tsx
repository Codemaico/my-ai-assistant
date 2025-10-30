import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mike AssistantAI',
  description: 'A multimodal AI assistant built with JavaScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              MSS AI ASSISTANT
            </h1>
            <span className="text-sm text-gray-500">
              Powered by GPT-4o
            </span>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}