// Публічне електронне меню закладу: www.magefood.com.ua/m/{slug}. Лише перегляд.
// Якщо встановлено застосунок Mage Food (1.0.6+), телефон відкриває це посилання одразу в застосунку (Universal / App Links).
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IOS_APP_ID, loadMenu, menuUrl } from '@/lib/menu';
import MenuView from './MenuView';
import { menuFonts } from './fonts';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await loadMenu(slug).catch(() => null);
  if (!data) return { title: 'Меню недоступне — Mage Food' };
  const { place } = data;
  const title = `${place.name} — меню`;
  const description = [place.cuisine, place.address, place.city].filter(Boolean).join(' · ') || 'Електронне меню в Mage Food';
  return {
    title,
    description,
    // Банер Safari «Відкрити / Завантажити Mage Food»
    other: { 'apple-itunes-app': `app-id=${IOS_APP_ID}, app-argument=${menuUrl(place.slug)}` },
    openGraph: { title, description, url: menuUrl(place.slug), siteName: 'Mage Food', images: place.logo_url ? [{ url: place.logo_url }] : undefined },
    icons: { icon: '/mage-food-app.png', apple: '/mage-food-app.png' },
    alternates: { canonical: menuUrl(place.slug) },
  };
}

export default async function MenuPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await loadMenu(slug).catch(() => null);
  if (!data) notFound();
  return <MenuView data={data} fontClass={menuFonts} />;
}
