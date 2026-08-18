import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeatX Fitness Studio | Transform Your Body. Transform Your Life.',
  description:
    'World-class rhythm fitness studio offering high-intensity cycle, boxing HIIT, reformer sculpt, and infrared yoga under immersive acoustics and lightscapes.',
  keywords: [
    'Rhythm Fitness',
    'HIIT Boxing',
    'Spin Studio',
    'Reformer Pilates',
    'Infrared Yoga',
    'BeatX Fitness',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0B0B0B] text-white antialiased selection:bg-[#FF3B30] selection:text-white">
        {children}
      </body>
    </html>
  );
}
