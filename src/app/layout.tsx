import { Metadata, Viewport } from "next";
import { Inter, Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { TranslationProvider } from "@/context/TranslationContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-poppins',
});

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-opensans',
});

export const metadata: Metadata = {
  title: 'Lifeliner - Your Health Companion',
  description: 'Login to your Lifeliner account and manage your health journey',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/life.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lifeliner - Your Health Companion',
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: 'Lifeliner',
  authors: [{ name: 'Lifeliner Team' }],
  keywords: ['health', 'wellness', 'tracking', 'medical', 'accessibility'],
  category: 'Health & Wellness',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FC7A7A',
  viewportFit: 'cover',
  minimumScale: 1,
  maximumScale: 5, 
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
          <TranslationProvider>
            <ClientLayout>{children}</ClientLayout>
          </TranslationProvider>
      </body>
    </html>
  );
}