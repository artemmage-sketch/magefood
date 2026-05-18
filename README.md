# 🧙 Mage Food — Інструкція з розгортання

## Технічний стек
- **Next.js 16** (App Router) — фреймворк
- **NextAuth v4** — авторизація через Google та GitHub (без телефону)
- **Tailwind CSS** — стилізація
- **Vercel** — рекомендований хостинг

---

## 1. Підготовка

```bash
cd magefood
npm install
cp .env.example .env.local
# відредагуйте .env.local
```

---

## 2. Налаштування OAuth

### Google OAuth
1. console.cloud.google.com → New Project → API & Services → Credentials → OAuth 2.0 Client ID
2. Authorized redirect URIs: `https://magefood.com/api/auth/callback/google`
3. Скопіюйте Client ID та Secret у .env.local

### GitHub OAuth
1. github.com → Settings → Developer settings → OAuth Apps → New
2. Callback URL: `https://magefood.com/api/auth/callback/github`
3. Скопіюйте Client ID та Secret у .env.local

---

## 3. .env.local

```env
NEXTAUTH_URL=https://magefood.com
NEXTAUTH_SECRET=згенеруйте-openssl-rand-base64-32

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

ADMIN_EMAILS=vash@email.com
```

---

## 4. Деплой на Vercel

1. Завантажте на GitHub
2. vercel.com → New Project → Import from GitHub
3. Додайте Environment Variables
4. Deploy!
5. Project Settings → Domains → додайте magefood.com

---

## 5. Адмін-панель

Зайдіть на `/admin` — доступно лише для email з ADMIN_EMAILS.
Редагування: заголовки, описи інструментів, ціни, банер оголошень.

---

## 6. Telegram-сповіщення (опціонально)

У `/app/api/contact/route.ts` розкоментуйте та додайте:
```env
TG_BOT_TOKEN=your-bot-token
TG_CHAT_ID=your-chat-id
```
