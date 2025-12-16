import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'Ber Tadilat',
  description: 'Ber Tadilat ile evinizi hayalinizdeki gibi yenileyin. Dekorasyon, restorasyon, boya badana ve daha fazlası için profesyonel çözümler.',
  icons: {
    icon: '/favicon/ber1-tadilat.png',
    apple: '/favicon/ber1-tadilat.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

