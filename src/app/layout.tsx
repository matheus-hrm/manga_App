import "~/styles/globals.css";
import { type ReactNode } from 'react';
import { Roboto } from 'next/font/google'


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
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="MangaReader" />
      <meta property="og:description" content="Leitura de mangás online com a api do mangadex.org" />
      <meta property="og:image" content="/1124794.png" />

      <title>MangaReader</title>
      <link rel="icon" href="/favicon.png" type='icon'/>
      <body className="bg-[#03001F] text-white">
        
        {children}
      </body>
    </html>
  );
}
