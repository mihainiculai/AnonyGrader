import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AnonyGrader',
  description: 'Anonymous grader for students',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
