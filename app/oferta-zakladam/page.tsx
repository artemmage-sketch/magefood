import type { Metadata } from "next";
import LegalDocPage from "@/components/LegalDocPage";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Договір про надання послуг технічного характеру — Mage Food",
  description: "Публічний договір для закладів-партнерів Mage Food: послуги технічного характеру, комісія 12% від вартості продукції, розщеплення платежів через monobank.",
  alternates: { canonical: "https://www.magefood.com.ua/oferta-zakladam" },
};

export default function PartnerOfferPage() {
  return <LegalDocPage slug="partner-offer" />;
}
