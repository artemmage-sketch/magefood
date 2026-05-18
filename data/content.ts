export const SITE_CONFIG = {
  name: "Mage Food",
  tagline: "Розумні інструменти для сучасних закладів харчування",
  description: "Автоматизуйте доставку, меню та управління кур'єрами з AI-рішеннями Mage Food",
  email: "hello@magefood.com",
  telegram: "@magefood",
};

export const TOOLS = [
  {
    id: "mage-delivery",
    name: "Mage Delivery",
    emoji: "🧾",
    shortDesc: "AI-сканер розпізнавання чеків",
    description:
      "Інноваційний AI-сканер, який автоматично розпізнає чеки у вашому закладі. Гість сканує чек — кур'єр викликається в один клік. Жодних зайвих кроків, жодних помилок.",
    features: [
      "Миттєве розпізнавання чеків за допомогою AI",
      "Виклик кур'єра в один клік",
      "Інтеграція з вашою POS-системою",
      "Статистика та аналітика замовлень",
      "Підтримка 24/7",
    ],
    color: "#FF6B35",
    gradient: "from-orange-500 to-red-500",
    available: true,
  },
  {
    id: "mage-courier",
    name: "Mage Courier",
    emoji: "🛵",
    shortDesc: "Веб-застосунок для власних кур'єрів",
    description:
      "Кастомний веб-застосунок для управління власними кур'єрами. Відстежуйте, призначайте та координуйте доставки в реальному часі — все в одному зручному інтерфейсі.",
    features: [
      "Управління кур'єрами в реальному часі",
      "Автоматичний розподіл замовлень",
      "GPS-трекінг кур'єрів",
      "Мобільний додаток для кур'єрів",
      "Звіти та аналітика ефективності",
    ],
    color: "#4ECDC4",
    gradient: "from-teal-400 to-cyan-500",
    available: true,
  },
  {
    id: "mage-courier-service",
    name: "Mage Courier Service",
    emoji: "🚀",
    shortDesc: "Кур'єрська служба повного циклу",
    description:
      "Повноцінна кур'єрська служба для вашого закладу. Ми беремо на себе весь процес доставки — від прийому замовлення до вручення гостю. Ідеально для закладів-партнерів.",
    features: [
      "Власний штат кур'єрів",
      "Покриття по всьому місту",
      "Гарантія часу доставки",
      "Страхування замовлень",
      "Персональний менеджер",
    ],
    color: "#A855F7",
    gradient: "from-purple-500 to-violet-600",
    available: true,
  },
  {
    id: "mage-qr-menu",
    name: "Mage QR Menu",
    emoji: "📱",
    shortDesc: "Електронне меню по QR-коду",
    description:
      "Сучасне електронне меню з QR-кодом для вашого закладу. Інтегрується з обліковими системами Poster та Syrve. Оновлення меню в реальному часі без перевидання.",
    features: [
      "Унікальний QR-код для кожного столика",
      "Інтеграція з Poster та Syrve",
      "Оновлення меню в реальному часі",
      "Мультимовна підтримка",
      "Аналітика переглядів та замовлень",
    ],
    color: "#10B981",
    gradient: "from-emerald-400 to-green-500",
    available: true,
  },
];

export const PRICING = {
  "mage-delivery": {
    monthly: 1499,
    yearly: 14990,
    currency: "₴",
    trialDays: 14,
  },
  "mage-courier": {
    monthly: 1999,
    yearly: 19990,
    currency: "₴",
    trialDays: 14,
  },
  "mage-courier-service": {
    monthly: null,
    yearly: null,
    currency: "₴",
    trialDays: 0,
    customPricing: true,
    contactForPrice: true,
  },
  "mage-qr-menu": {
    monthly: 999,
    yearly: 9990,
    currency: "₴",
    trialDays: 14,
  },
};

export const STATS = [
  { value: "200+", label: "Закладів-партнерів" },
  { value: "50K+", label: "Доставок щомісяця" },
  { value: "99.9%", label: "Uptime сервісів" },
  { value: "4.9★", label: "Середня оцінка" },
];
