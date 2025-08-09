import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import '../src/components/ui/scrollbar.css'

export const metadata: Metadata = {
  title: 'Prototype UGO',
  description: 'A prototype application for UGO',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
body {
  margin: 0 !important;
  padding: 0 !important;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
