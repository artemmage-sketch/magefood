// /.well-known/apple-app-site-association (через rewrite у next.config.ts):
// iPhone з встановленим Mage Food відкриває посилання меню (/m/…) одразу в застосунку.
import { APPLE_TEAM_ID, IOS_BUNDLE_ID } from '@/lib/menu';

export function GET() {
  return Response.json(
    {
      applinks: {
        apps: [],
        details: [{ appIDs: [`${APPLE_TEAM_ID}.${IOS_BUNDLE_ID}`], components: [{ '/': '/m/*' }], paths: ['/m/*'] }],
      },
    },
    { headers: { 'Cache-Control': 'public, max-age=3600' } },
  );
}
