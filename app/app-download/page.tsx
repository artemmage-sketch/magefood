"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ✅ Щоб змінити посилання — просто відредагуйте ці два рядки:
const APP_STORE_URL = "https://apps.apple.com/us/app/mage-food-app/id6782863093";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.magefood.app&pcampaignid=web_share";

export default function AppPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f6efff" }}>
      <Navbar />

      <section style={{ padding: "100px 24px 100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#ede8f8", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 100, padding: "5px 16px", fontSize: 13, fontWeight: 600, color: "#6d28d9", marginBottom: 28 }}>
            ✦ Mage Food App
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(36px, 6vw, 56px)", color: "#1a1025", marginBottom: 16, fontWeight: 400, lineHeight: 1.1 }}>
            Завантажуй наш застосунок
          </h1>
          <p style={{ color: "#6b5b8a", fontSize: 17, lineHeight: 1.7, marginBottom: 56, maxWidth: 420, margin: "0 auto 56px" }}>
            Замовляй їжу, відстежуй доставку та керуй бонусами — все в одному застосунку.
          </p>

          {/* Store buttons */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>

            {/* App Store */}
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "#1a1025", borderRadius: 16, padding: "14px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, minWidth: 200, transition: "transform .2s, box-shadow .2s", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(26,16,37,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                {/* Apple logo SVG */}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginBottom: 2 }}>Завантажити в</p>
                  <p style={{ color: "#fff", fontSize: 18, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>App Store</p>
                </div>
              </div>
            </a>

            {/* Google Play */}
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "#1a1025", borderRadius: 16, padding: "14px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, minWidth: 200, transition: "transform .2s, box-shadow .2s", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(26,16,37,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                {/* Google Play logo SVG */}
                <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z" fill="#4CAF50"/>
                  <path d="M3 3.5l10.5 8.5L3 20.5V3.5z" fill="#81C784"/>
                  <path d="M13.5 12L3 3.5l12 6.8-1.5 1.7z" fill="#F44336"/>
                  <path d="M13.5 12l-1.5 1.7 12 6.8-10.5-8.5z" fill="#FFEB3B"/>
                  <path d="M15 10.3L3 3.5l12.5 7.1-.5-.3z" fill="#F44336" opacity=".5"/>
                </svg>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginBottom: 2 }}>Завантажити в</p>
                  <p style={{ color: "#fff", fontSize: 18, fontWeight: 600, fontFamily: "Inter, sans-serif" }}>Google Play</p>
                </div>
              </div>
            </a>

          </div>

          {/* Trust badge */}
          <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            {["Безкоштовно", "iOS та Android", "Оновлення регулярні"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, color: "#9384b0", fontSize: 14 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", display: "inline-block" }}></span>
                {t}
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
