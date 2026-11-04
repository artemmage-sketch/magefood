import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/menu';
import s from './menu.module.css';

import { menuFonts } from './fonts';

export default function MenuNotFound() {
  return (
    <main className={`${s.root} ${menuFonts} ${s.empty}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/mage-food-app.png" alt="Mage Food" className={s.emptyLogo} />
      <h1 className={s.emptyTitle}>Меню зараз недоступне</h1>
      <p className={s.emptyText}>Можливо, заклад оновлює меню. Усі заклади міста — у застосунку Mage Food.</p>
      <div className={s.emptyBtns}>
        <a href={APP_STORE_URL} className={s.btnDark}>App Store</a>
        <a href={PLAY_STORE_URL} className={s.btnLight}>Google Play</a>
      </div>
    </main>
  );
}
