import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "뚫어보카",
  description: "빈칸 문제 생성 AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || ""; // Assign an empty string as default value if NEXT_PUBLIC_GA_ID is undefined
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
      <GoogleAnalytics gaId={gaId} />
    </html>
  );
}
