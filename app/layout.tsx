import '@/styles/globals.css'
import { main_font } from '@/lib/fonts'

export const metadata = {
  title: 'Project hermes',
  description: 'Proof of concept',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={main_font.className}>
      <body>{children}</body>
    </html>
  )
}
