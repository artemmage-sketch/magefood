'use client';

// Інтерфейс електронного меню: розділи за типом, категорії з підсвіткою, пошук, картка страви,
// плашка «Замовляй у застосунку Mage Food» (відкрити / встановити).
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight, Menu as MenuIcon, MapPin, Search, ShoppingBag, Sparkles, UtensilsCrossed, X } from 'lucide-react';
import { APP_SCHEME, APP_STORE_URL, PLAY_STORE_URL, type MenuData, type MenuItem } from '@/lib/menu';
import s from './menu.module.css';

const TYPE_LABELS: Record<string, string> = {
  main: 'Страви', snack: 'Закуски', side: 'Гарніри', dessert: 'Десерти', drink: 'Напої', other: 'Інше',
};
const TYPE_ORDER = ['main', 'snack', 'side', 'dessert', 'drink', 'other'];

// Кнопка «Замовити в застосунку» в картці страви — поки прихована (лише деталі страви)
const SHOW_ORDER_BUTTON = false;

const isImage = (u?: string | null) => !!u && /^https?:\/\//.test(u);
const price = (n: number) => `${Math.round(n * 100) / 100} ₴`;
const anchor = (c: string) => `cat-${encodeURIComponent(c)}`;

type Platform = 'ios' | 'android' | 'other';

export default function MenuView({ data, fontClass }: { data: MenuData; fontClass: string }) {
  const { place, items, categories, badges, allergens } = data;
  const [q, setQ] = useState('');
  const [type, setType] = useState('all');
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<MenuItem | null>(null);
  const [platform, setPlatform] = useState<Platform>('other');
  const [bannerHidden, setBannerHidden] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [listOpen, setListOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Висота закріпленої панелі категорій → відступ, щоб заголовок категорії ставав одразу під нею
  useEffect(() => {
    const nav = navRef.current, root = rootRef.current;
    if (!nav || !root) return;
    const ro = new ResizeObserver(() => root.style.setProperty('--nav-h', `${nav.offsetHeight}px`));
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent;
    const t = setTimeout(() => {
      setPlatform(/iPhone|iPad|iPod/i.test(ua) ? 'ios' : /Android/i.test(ua) ? 'android' : 'other');
      try { setBannerHidden(sessionStorage.getItem('mf-menu-banner') === '0'); } catch { /* без сховища — показуємо */ }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Тип категорії (страви / напої / десерти…) — з налаштувань меню закладу
  const typeOf = useMemo(() => {
    const m = new Map<string, string>();
    categories.forEach(c => m.set(c.name, c.category_type || 'other'));
    return (cat: string) => m.get(cat) || 'other';
  }, [categories]);

  const types = useMemo(() => {
    const set = new Set(items.map(i => typeOf(i.category)));
    return TYPE_ORDER.filter(t => set.has(t));
  }, [items, typeOf]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter(i =>
      (type === 'all' || typeOf(i.category) === type) &&
      (!term || i.name.toLowerCase().includes(term) || (i.description || '').toLowerCase().includes(term)));
  }, [items, q, type, typeOf]);

  // Категорії в порядку появи в меню (як у застосунку)
  const groups = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, MenuItem[]>();
    visible.forEach(i => {
      if (!map.has(i.category)) { map.set(i.category, []); order.push(i.category); }
      map.get(i.category)!.push(i);
    });
    return order.map(c => ({ category: c, items: map.get(c)! }));
  }, [visible]);

  // Підсвічуємо категорію, яку зараз видно
  useEffect(() => {
    const els = groups.map(g => document.getElementById(anchor(g.category))).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      const top = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (top) setActive(decodeURIComponent(top.target.id.slice(4)));
    }, { rootMargin: '-140px 0px -60% 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [groups]);

  useEffect(() => {
    if (!active || !chipsRef.current) return;
    chipsRef.current.querySelector<HTMLElement>(`[data-cat="${CSS.escape(active)}"]`)
      ?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  useEffect(() => {
    if (!open && !listOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(null); setListOpen(false); } };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open, listOpen]);

  // «Список»: перейти до категорії
  function goToCategory(category: string) {
    setListOpen(false);
    setTimeout(() => {
      document.getElementById(anchor(category))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(category);
    }, 50);
  }

  const storeUrl = platform === 'android' ? PLAY_STORE_URL : APP_STORE_URL;

  // Відкрити заклад у застосунку; якщо застосунку немає — через мить ведемо в магазин
  function openInApp() {
    const started = Date.now();
    window.location.href = `${APP_SCHEME}://menu/${place.slug}`;
    setTimeout(() => {
      if (document.visibilityState === 'visible' && Date.now() - started < 2500) window.location.href = storeUrl;
    }, 1400);
  }

  function hideBanner() {
    setBannerHidden(true);
    try { sessionStorage.setItem('mf-menu-banner', '0'); } catch { /* не критично */ }
  }

  const badgeById = (id: number) => badges.find(b => b.id === id);
  const allergenLabel = (key: string) => allergens.find(a => a.key === key)?.label || key;
  const renderBadges = (ids: number[]) => {
    const list = ids.map(badgeById).filter(Boolean);
    if (!list.length) return null;
    return (
      <div className={s.badges}>
        {list.map(b => <span key={b!.id} className={s.badge} style={{ backgroundColor: b!.color || '#FF6B35' }}>{b!.name}</span>)}
      </div>
    );
  };

  return (
    <div ref={rootRef} className={`${s.root} ${fontClass}`}>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.placeRow}`}>
          {isImage(place.logo_url) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={place.logo_url!} alt="" className={s.logo} />
          ) : (
            <span className={s.logoStub}><UtensilsCrossed size={28} aria-hidden /></span>
          )}
          <div className={s.placeText}>
            <h1 className={s.placeName}>{place.name}</h1>
            {place.cuisine && <p className={s.placeCuisine}>{place.cuisine}</p>}
            {place.address && (
              <p className={s.placeMeta}>
                <MapPin size={14} aria-hidden className={s.placeMetaIcon} />
                <span>{place.address}</span>
              </p>
            )}
          </div>
        </div>
        <div className={`${s.wrap} ${s.search}`}>
          <label htmlFor="menu-q" className={s.srOnly}>Пошук у меню</label>
          <Search size={18} className={s.searchIcon} aria-hidden />
          <input id="menu-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Пошук у меню" className={s.searchInput} />
        </div>
      </header>

      <nav ref={navRef} className={s.nav} aria-label="Категорії меню">
        <div className={s.wrap}>
          {types.length > 1 && (
            <div className={s.types} role="tablist">
              {['all', ...types].map(t => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={type === t}
                  onClick={() => { setType(t); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`${s.typeBtn} ${type === t ? s.typeBtnActive : ''}`}
                >
                  {t === 'all' ? 'Усе' : TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          )}
          <div className={s.chipsRow}>
          <button type="button" onClick={() => setListOpen(true)} className={s.listBtn} aria-label="Список усіх категорій">
            <MenuIcon size={20} aria-hidden />
            <span>Список</span>
          </button>
          <div ref={chipsRef} className={s.chips}>
            {groups.map(g => (
              <a key={g.category} href={`#${anchor(g.category)}`} data-cat={g.category} className={`${s.chip} ${(active ?? groups[0]?.category) === g.category ? s.chipActive : ''}`}>
                {g.category}
              </a>
            ))}
          </div>
          </div>
        </div>
      </nav>

      <main className={`${s.wrap} ${s.main}`}>
        {groups.length === 0 ? (
          <p className={s.nothing}>{items.length === 0 ? 'Меню ще наповнюється.' : 'Нічого не знайдено.'}</p>
        ) : groups.map(g => (
          <section key={g.category} id={anchor(g.category)} className={s.section}>
            <h2 className={s.sectionTitle}>{g.category}</h2>
            <ul className={s.list}>
              {g.items.map(item => (
                <li key={item.id}>
                  <button type="button" onClick={() => setOpen(item)} className={s.card}>
                    <div className={s.cardBody}>
                      {renderBadges(item.badge_ids)}
                      <h3 className={s.itemName}>{item.name}</h3>
                      {item.description && <p className={s.itemDesc}>{item.description}</p>}
                      <div className={s.priceRow}>
                        <span className={s.price}>{price(item.price)}</span>
                        {item.weight && <span className={s.weight}>{item.weight}</span>}
                      </div>
                    </div>
                    {isImage(item.image_url) && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image_url!} alt="" loading="lazy" className={s.thumb} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className={s.note}>Меню від Mage Food · ціни в гривнях</p>
      </main>

      {!bannerHidden && !open && !listOpen && (
        <div className={s.banner}>
          <div className={s.bannerCard}>
            <div className={s.bannerTop}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/mage-food-app.png" alt="" className={s.bannerIcon} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className={s.bannerTitle}>Замовляй у застосунку Mage Food</p>
                <p className={s.bannerText}>Кешбек з кожного замовлення · доставка · ачівки й призи</p>
              </div>
              <button type="button" onClick={hideBanner} aria-label="Сховати" className={s.bannerClose}><X size={18} aria-hidden /></button>
            </div>
            <div className={s.bannerBtns}>
              {platform === 'other' ? (
                <>
                  <a href={APP_STORE_URL} className={s.btnWhite}>App Store</a>
                  <a href={PLAY_STORE_URL} className={s.btnWhite}>Google Play</a>
                </>
              ) : (
                <>
                  <button type="button" onClick={openInApp} className={s.btnPrimary}><Sparkles size={16} aria-hidden />Відкрити</button>
                  <a href={storeUrl} className={s.btnWhite}>Встановити</a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {listOpen && (
        <div className={s.overlay} onClick={() => setListOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Категорії меню" onClick={(e) => e.stopPropagation()} className={`${s.sheet} ${s.listSheet}`}>
            <div className={s.listHead}>
              <h3 className={s.listTitle}>Меню</h3>
              <button type="button" onClick={() => setListOpen(false)} aria-label="Закрити" className={s.listClose}><X size={20} aria-hidden /></button>
            </div>
            <ul className={s.catList}>
              {groups.map(g => {
                const current = (active ?? groups[0]?.category) === g.category;
                return (
                  <li key={g.category}>
                    <button type="button" onClick={() => goToCategory(g.category)} className={`${s.catItem} ${current ? s.catItemActive : ''}`}>
                      <span className={s.catName}>{g.category}</span>
                      <span className={s.catCount}>{g.items.length}</span>
                      <ChevronRight size={18} aria-hidden className={s.catChevron} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {open && (
        <div className={s.overlay} onClick={() => setOpen(null)}>
          <div role="dialog" aria-modal="true" aria-label={open.name} onClick={(e) => e.stopPropagation()} className={s.sheet}>
            <div className={s.sheetCloseBar}>
              <button type="button" onClick={() => setOpen(null)} aria-label="Закрити" className={s.sheetClose}><X size={20} aria-hidden /></button>
            </div>
            <div className={s.sheetMedia}>
              {isImage(open.image_url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={open.image_url!} alt={open.name} className={s.sheetImg} />
              ) : (
                <div className={s.sheetStub}><UtensilsCrossed size={48} aria-hidden /></div>
              )}
            </div>
            <div className={s.sheetBody}>
              {renderBadges(open.badge_ids)}
              <h3 className={s.sheetTitle}>{open.name}</h3>
              <div className={s.sheetPriceRow}>
                <span className={s.sheetPrice}>{price(open.price)}</span>
                {open.weight && <span className={s.weight}>{open.weight}</span>}
              </div>
              {open.description && <p className={s.sheetDesc}>{open.description}</p>}
              {open.allergens.length > 0 && (
                <div>
                  <p className={s.allergenTitle}>Алергени</p>
                  <div className={s.allergens}>{open.allergens.map(a => <span key={a} className={s.allergen}>{allergenLabel(a)}</span>)}</div>
                </div>
              )}
              {SHOW_ORDER_BUTTON && (
                <button type="button" onClick={platform === 'other' ? () => { window.location.href = APP_STORE_URL; } : openInApp} className={s.orderBtn}>
                  <ShoppingBag size={18} aria-hidden />Замовити в застосунку Mage Food
                </button>
              )}
              <button type="button" onClick={() => setOpen(null)} className={s.backBtn}>Назад до меню</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
