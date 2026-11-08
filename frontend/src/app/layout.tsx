import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nunca Jamás · Tiramisú de Autor y los Niños Perdidos',
  description: 'Alta repostería artesanal inspirada en el Bosque de Nunca Jamás.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-moss-950 text-parchment">
        {children}
      </body>
    </html>
  );
}
