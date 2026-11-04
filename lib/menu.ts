// Електронне QR-меню закладів Mage Food: www.magefood.com.ua/m/{slug}.
// Дані — з бази застосунку Mage Food (публічне читання меню, анонімний ключ). Керування — в адмінці mage-admin.com → «QR-меню».

export const MENU_ORIGIN = 'https://www.magefood.com.ua';
export const menuUrl = (slug: string) => `${MENU_ORIGIN}/m/${slug}`;

export const APP_SCHEME = 'magefood';
export const IOS_APP_ID = '6782863093';
export const APPLE_TEAM_ID = 'VNHU9R93XW';
export const IOS_BUNDLE_ID = 'com.magefood.app';
export const ANDROID_PACKAGE = 'com.magefood.app';
export const APP_STORE_URL = 'https://apps.apple.com/app/id6782863093';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.magefood.app';

const SUPABASE_URL = 'https://btandmkylcamwgcnkjld.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0YW5kbWt5bGNhbXdnY25ramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjYxNTUsImV4cCI6MjA5Njg0MjE1NX0.P-FPiyV4V1jrAXZhkXAl8_1-hIav2YxO7m77-ezG-eo';

export type MenuItem = {
  id: number; name: string; description: string | null; price: number; image_url: string | null;
  category: string; weight: string | null; allergens: string[]; badge_ids: number[];
};
export type MenuData = {
  place: { id: number; name: string; cuisine: string | null; address: string | null; city: string | null; logo_url: string | null; slug: string };
  items: MenuItem[];
  categories: { name: string; category_type: string | null }[];
  badges: { id: number; name: string; color: string | null }[];
  allergens: { key: string; label: string }[];
};

type Row = Record<string, unknown>;

async function rest(path: string): Promise<Row[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    next: { revalidate: 60 }, // меню оновлюється на сторінці не пізніше ніж за хвилину
  });
  if (!res.ok) throw new Error(`menu ${res.status}`);
  return res.json() as Promise<Row[]>;
}

const str = (v: unknown) => (typeof v === 'string' && v ? v : null);

export async function loadMenu(slug: string): Promise<MenuData | null> {
  const s = slug.toLowerCase();
  if (!/^[a-z0-9-]{3,40}$/.test(s)) return null;
  const [place] = await rest(`places?select=id,name,cuisine,address,city,logo_url,menu_slug,qr_menu_enabled,is_active&menu_slug=eq.${s}&limit=1`);
  if (!place || !place.qr_menu_enabled || place.is_active === false) return null;

  const [items, categories, badges, allergens] = await Promise.all([
    rest(`menu_items?select=id,name,description,price,image_url,category,weight,allergens,badge_ids,hidden_by_category&place_id=eq.${place.id}&is_active=eq.true&order=id`),
    rest(`menu_categories?select=name,category_type&place_id=eq.${place.id}&order=id`),
    rest('menu_badges?select=id,name,color'),
    rest('menu_allergens?select=key,label'),
  ]);

  return {
    place: {
      id: Number(place.id), name: String(place.name), cuisine: str(place.cuisine), address: str(place.address),
      city: str(place.city), logo_url: str(place.logo_url), slug: String(place.menu_slug),
    },
    items: items.filter(i => !i.hidden_by_category).map(i => ({
      id: Number(i.id), name: String(i.name), description: str(i.description), price: Number(i.price) || 0,
      image_url: str(i.image_url), category: str(i.category) || 'Інше', weight: str(i.weight),
      allergens: Array.isArray(i.allergens) ? (i.allergens as string[]) : [],
      badge_ids: Array.isArray(i.badge_ids) ? (i.badge_ids as number[]) : [],
    })),
    categories: categories.map(c => ({ name: String(c.name), category_type: str(c.category_type) })),
    badges: badges.map(b => ({ id: Number(b.id), name: String(b.name), color: str(b.color) })),
    allergens: allergens.map(a => ({ key: String(a.key), label: String(a.label) })),
  };
}
