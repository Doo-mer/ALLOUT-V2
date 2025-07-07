'use client'

import localFont from 'next/font/local'
import "./globals.css";
import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css'
import AtomsDevtools from './AtomsDevtools';

const pretendard = localFont({
  src: '../public/PretendardVariable.woff2',
  display: "swap",
  weight: '100 900',
  variable: '--font-CSSpretendard'
})

const rix = localFont({
  src: '../public/RixInooAriDuri.ttf',
  display: "swap",
  weight: '100 900',
  variable: '--font-CSSrix'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${pretendard.variable + ' ' + rix.variable} font-pretendard `}>
        <Provider>
          <AtomsDevtools>
            <DevTools />
            {children}
          </AtomsDevtools>
        </Provider>
      </body>
    </html>
  );
}
