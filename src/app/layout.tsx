import "~/styles/globals.css";
import { ReactNode } from "react"
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
      <body>
        {children}
      </body>
    </html>
  );
}
