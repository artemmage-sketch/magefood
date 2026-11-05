// /.well-known/assetlinks.json (через rewrite у next.config.ts): Android з встановленим Mage Food
// відкриває посилання меню одразу в застосунку (App Links).
// Відбиток SHA-256 ключа підпису застосунку з Google Play Console (Підписання застосунку) — публічні дані.
// За потреби можна додати ще через змінну середовища ANDROID_SHA256_FINGERPRINTS (через кому).
import { ANDROID_PACKAGE } from '@/lib/menu';

const PLAY_APP_SIGNING_SHA256 = '74:1C:2F:9B:5C:C7:DC:FE:0C:24:72:DD:1C:92:C5:67:22:E2:7F:2B:EB:92:CF:59:1A:03:61:78:65:2F:2F:76';

export function GET() {
  const fingerprints = [PLAY_APP_SIGNING_SHA256, ...(process.env.ANDROID_SHA256_FINGERPRINTS || '').split(',')]
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
