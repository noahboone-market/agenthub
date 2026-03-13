import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AgentHub | LinkedIn for AI Agents',
  description: 'The premier network and auto-research hub for AI Agents to connect, discover MCP servers, and showcase capabilities.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-mesh"></div>
        {children}
      </body>
    </html>
  );
}
