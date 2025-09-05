import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DELIS FOOD MARKET',
  description: 'Boutique de produits frais et de qualité',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
