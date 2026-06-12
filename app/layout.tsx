import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mercedes Salon — Premium Beauty in Baytown, TX',
  description:
    'Professional hair, nails, beauty & barber services in Baytown, Texas. Book your appointment online or via WhatsApp.',
  openGraph: {
    title: 'Mercedes Salon — Premium Beauty in Baytown, TX',
    description: 'Hair · Nails · Beauty · Barber — Baytown, Texas',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-[#FAFAFA] text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
