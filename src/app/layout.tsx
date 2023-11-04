import "~/styles/globals.css";
import { type ReactNode } from 'react';
import { Roboto } from 'next/font/google'
import Footer from "./components/footer";

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-roboto',
});


export default function RootLayout({
  children
} : {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR" className={` ${roboto.variable}`}>
      <title>MangaReader</title>
      <link rel="icon" href="/favicon.png" type='icon'/>
      <body className="bg-[#03001F]">
        {children}
      </body>
    </html>
  );
}
