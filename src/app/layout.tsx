import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://loi-maroc-ai.vercel.app"),
  title: "LoiMaroc AI - Votre Expert Juridique",
  description: "Intelligence Artificielle au service du droit marocain. Réponses précises basées sur les textes de loi officiels.",
  icons: {
    icon: "/images/logo_LoiMaroc_AI.ico",
    shortcut: "/images/logo_LoiMaroc_AI.ico",
    apple: "/images/logo_LoiMaroc_AI.png",
  },
  openGraph: {
    title: "LoiMaroc AI - Votre Expert Juridique en Droit Marocain",
    description: "Posez vos questions juridiques et obtenez des réponses précises basées sur le Code du Travail Marocain grâce à l'IA.",
    url: "https://loi-maroc-ai.vercel.app",
    siteName: "LoiMaroc AI",
    images: [
      {
        url: "/images/logo_LoiMaroc_AI.png",
        width: 1200,
        height: 630,
        alt: "LoiMaroc AI - Assistant Juridique Marocain",
      },
    ],
    locale: "fr_MA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoiMaroc AI - Votre Expert Juridique",
    description: "L'IA au service du droit marocain. Réponses précises, sources citées.",
    images: ["/images/logo_LoiMaroc_AI.png"],
  },
  keywords: [
    "droit marocain",
    "code du travail maroc",
    "assistant juridique",
    "intelligence artificielle",
    "loi maroc",
    "avocat en ligne",
    "jurisprudence maroc",
  ],
  authors: [{ name: "LoiMaroc AI" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${outfit.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
