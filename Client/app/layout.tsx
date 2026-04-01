import type { Metadata } from 'next';
import { Sora, Inter, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'ExpenseTrac',
    template: '%s | ExpenseTrac',
  },
  description: 'Next-generation personal finance management system',
  keywords: ['finance', 'budget', 'transactions', 'analytics'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${sora.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
