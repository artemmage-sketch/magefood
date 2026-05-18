import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Mage Food — Розумні інструменти для закладів харчування",
  description: "AI-рішення для автоматизації доставки, меню та управління кур'єрами у ресторанах та кафе",
  keywords: ["ресторан", "доставка", "QR меню", "кур'єр", "автоматизація"],
  openGraph: {
    title: "Mage Food",
    description: "Розумні інструменти для сучасних закладів харчування",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
