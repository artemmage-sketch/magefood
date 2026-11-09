// Юридичні документи Mage Food (оферти) — з бази застосунку (таблиця legal_documents, публічне читання).
// Редагуються в адмінці mage-admin.com → «Документи»; на сайті оновлюються протягом 5 хвилин.
const SUPABASE_URL = 'https://btandmkylcamwgcnkjld.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0YW5kbWt5bGNhbXdnY25ramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNjYxNTUsImV4cCI6MjA5Njg0MjE1NX0.P-FPiyV4V1jrAXZhkXAl8_1-hIav2YxO7m77-ezG-eo';

export type LegalDoc = { slug: string; title: string; content: string; updated_at: string | null };

export async function getLegalDoc(slug: string): Promise<LegalDoc | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/legal_documents?slug=eq.${encodeURIComponent(slug)}&select=slug,title,content,updated_at&limit=1`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }, next: { revalidate: 300 } },
  );
  if (!res.ok) return null;
  const rows = (await res.json()) as LegalDoc[];
  return rows[0] ?? null;
}

export type Block = { kind: 'p'; text: string } | { kind: 'list'; items: string[] };
export type Section = { title: string | null; blocks: Block[] };

// Текст документа → розділи: заголовок — рядок «N. Назва», абзаци — через порожній рядок, «- » — пункти списку.
// Рядки «Редакція…», «Постійна адреса…», «Дата набрання…» на самому початку — службові (показуються в шапці).
export function parseLegal(content: string): { meta: string[]; sections: Section[] } {
  const lines = content.replace(/\r/g, '').split('\n');
  const meta: string[] = [];
  const sections: Section[] = [];
  let cur: Section = { title: null, blocks: [] };
  let para: string[] = [];
  let list: string[] = [];
  let started = false;

  const flushPara = () => { if (para.length) { cur.blocks.push({ kind: 'p', text: para.join('\n') }); para = []; } };
  const flushList = () => { if (list.length) { cur.blocks.push({ kind: 'list', items: list }); list = []; } };
  const closeSection = () => { flushPara(); flushList(); if (cur.title || cur.blocks.length) sections.push(cur); };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!started && /^(Редакція|Постійна адреса|Дата набрання)/.test(line)) { meta.push(line); continue; }
    if (line.trim()) started = true;
    if (/^\d+\.\s+\S/.test(line) && !/^\d+\.\d/.test(line)) {
      closeSection();
      cur = { title: line, blocks: [] };
      continue;
    }
    if (!line.trim()) { flushPara(); flushList(); continue; }
    if (/^-\s+/.test(line)) { flushPara(); list.push(line.replace(/^-\s+/, '')); continue; }
    flushList();
    para.push(line);
  }
  closeSection();
  return { meta, sections };
}
