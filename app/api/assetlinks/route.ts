// /.well-known/assetlinks.json (через rewrite у next.config.ts): Android з встановленим Mage Food
// відкриває посилання меню одразу в застосунку (App Links).
// Відбитки SHA-256 ключа підпису — змінна середовища ANDROID_SHA256_FINGERPRINTS (через кому):
// Google Play Console → Тестування й випуск → Цілісність застосунку → Підписання застосунку.
import { ANDROID_PACKAGE } from '@/lib/menu';

export function GET() {
  const fingerprints = (process.env.ANDROID_SHA256_FINGERPRINTS || '')
    .split(',')
    .map(x => x.trim().toUpperCase())
    .filter(Boolean);
  return Response.json(
    fingerprints.length
      ? [{
          relation: ['delegate_permission/common.handle_all_urls'],
          target: { namespace: 'android_app', package_name: ANDROID_PACKAGE, sha256_cert_fingerprints: fingerprints },
        }]
      : [],
    { headers: { 'Cache-Control': 'public, max-age=3600' } },
  );
}
