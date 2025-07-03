import localFont from 'next/font/local'
import "./globals.css";

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
    <html>
      <body className={`${pretendard.variable} ${rix.variable} font-pretendard`} >  
        {children}
      </body>
    </html>
  );
}
