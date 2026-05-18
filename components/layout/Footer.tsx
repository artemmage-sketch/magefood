import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div style={{ borderTop: "1px solid rgba(120,80,180,0.12)", padding: "48px 24px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 32 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src="/logo.svg" alt="Mage Food" style={{ width: 34, height: 34, borderRadius: 9 }} />
              <span style={{ fontWeight: 600, fontSize: 17, color: "#1a1025" }}>Mage Food</span>
            </div>
            <p style={{ color: "#6b5b8a", fontSize: 14, lineHeight: 1.85, maxWidth: 300 }}>
              Розумні інструменти для автоматизації закладів харчування. Більше часу для гостей — менше рутини.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, background: "#fff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 100, padding: "5px 12px", fontSize: 13, fontWeight: 500, color: "#4c1d95" }}>
              🇺🇦 Зроблено в Україні
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#9384b0", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Інструменти</p>
            {["Mage Delivery", "Mage Courier", "Mage Courier Service", "Mage QR Menu"].map(t => (
              <p key={t} style={{ color: "#6b5b8a", fontSize: 14, marginBottom: 9, lineHeight: 1.5 }}>{t}</p>
            ))}
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#9384b0", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Контакт</p>
            <p style={{ color: "#6b5b8a", fontSize: 14, marginBottom: 9 }}>hello@magefood.com</p>
            <p style={{ color: "#6b5b8a", fontSize: 14, marginBottom: 14 }}>@magefood</p>
            <Link href="/pricing" style={{ color: "#7c3aed", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Переглянути ціни →</Link>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(120,80,180,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, color: "#9384b0" }}>© {new Date().getFullYear()} Mage Food. Всі права захищено.</p>
          <p style={{ fontSize: 13, color: "#c4b5fd" }}>magefood.com</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:28px!important}}`}</style>
    </footer>
  );
}
