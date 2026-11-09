import type { Metadata } from "next";
import LegalDocPage from "@/components/LegalDocPage";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Публічна оферта — Mage Food",
  description: "Публічна оферта для користувачів застосунку Mage Food: замовлення, оплата, доставка, повернення коштів.",
  alternates: { canonical: "https://www.magefood.com.ua/oferta" },
};

export default function OfertaPage() {
  return <LegalDocPage slug="terms" />;
}
