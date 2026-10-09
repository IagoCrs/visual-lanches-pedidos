import './globals.css';
import { Fredoka } from 'next/font/google';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-fredoka',
});

export const metadata = {
  title: 'Visual Lanches & Petiscos',
  description: 'O melhor da sua noite',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${fredoka.className} ${fredoka.variable} font-sans`}>{children}</body>
    </html>
  );
}

