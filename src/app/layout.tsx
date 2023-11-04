import "~/styles/globals.css";
import { Suspense, type ReactNode } from 'react';
import { Roboto } from 'next/font/google'
import Footer from "./components/footer";
import Loading from "./loading";

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
      <body className="bg-[#03001F] text-white">
        <Suspense fallback={<Loading/>}/>
        {children}
      </body>
    </html>
  );
}
