import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "JanaOilGreen | Buy & Sell Used Cooking Oil",
  description: "Turn your waste oil into value with JanaOilGreen. We make used cooking oil collection easy and profitable.",
  verification: {
    google: "L3en7SfwnWQP7JVIpu2eU2rrdFd9SRwS-gi3IGYQINI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) { 
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 flex flex-col font-sans" suppressHydrationWarning>
        {/* Google Translate Integration */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false },
                'google_translate_element'
              );
            }
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
