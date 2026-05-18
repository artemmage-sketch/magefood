"use client";
import { useState } from "react";
import { CheckCircle2, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/ui/ContactModal";
import { TOOLS, PRICING } from "@/data/content";

const BG_MAP: Record<string, string> = {
  "mage-delivery": "#ede8f8", "mage-courier": "#ecfdf5",
  "mage-courier-service": "#fdf2f8", "mage-qr-menu": "#fffbeb",
};

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [contactOpen, setContactOpen] = useState(false);
  const [contactTool, setContactTool] = useState<string>();

  return (
    <main style={{ minHeight: "100vh", background: "#f6efff" }}>
      <Navbar />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} toolName={contactTool} />

      <section style={{ padding: "80px 24px 80px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#7c3aed", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Ціни</p>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", color: "#1a1025", marginBottom: 12 }}>Прозорі ціни.<br />Жодних сюрпризів.</h1>
            <p style={{ color: "#6b5b8a", fontSize: 17, maxWidth: 400, margin: "0 auto 28px", lineHeight: 1.7 }}>Починайте з безкоштовного пробного періоду — без прив'язки картки.</p>
            <div style={{ display: "inline-flex", background: "#fff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 12, padding: 4 }}>
              <button onClick={() => setBilling("monthly")} style={{ background: billing === "monthly" ? "#7c3aed" : "transparent", color: billing === "monthly" ? "#fff" : "#6b5b8a", border: "none", borderRadius: 9, padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all .15s" }}>Щомісяця</button>
              <button onClick={() => setBilling("yearly")} style={{ background: billing === "yearly" ? "#7c3aed" : "transparent", color: billing === "yearly" ? "#fff" : "#6b5b8a", border: "none", borderRadius: 9, padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all .15s", display: "flex", alignItems: "center", gap: 8 }}>
                Щорічно <span style={{ background: "rgba(124,58,237,0.13)", color: "#6d28d9", borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>-17%</span>
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 14 }}>
            {TOOLS.map(tool => {
              const p = PRICING[tool.id as keyof typeof PRICING];
              const isCustom = p && "customPricing" in p && (p as any).customPricing;
              const price = !isCustom ? (billing === "monthly" ? (p as any).monthly : (p as any).yearly) : null;
              const trialDays = p && "trialDays" in p ? (p as any).trialDays : 0;
              const bg = BG_MAP[tool.id] || "#ede8f8";

              return (
                <div key={tool.id} style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 20, padding: 26, position: "relative", transition: "border-color .2s, transform .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${tool.color}44`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(120,80,180,0.1)"; e.currentTarget.style.transform = "none"; }}
                >
                  {trialDays > 0 && (
                    <div style={{ position: "absolute", top: 14, right: 14, background: bg, color: tool.color, borderRadius: 100, padding: "4px 12px", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                      <Zap size={11} /> {trialDays} днів безкоштовно
                    </div>
                  )}
                  <div style={{ fontSize: 30, marginBottom: 12 }}>{tool.emoji}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "#1a1025", marginBottom: 5, fontFamily: "Inter, sans-serif" }}>{tool.name}</h3>
                  <p style={{ fontSize: 13, color: "#9384b0", marginBottom: 18 }}>{tool.shortDesc}</p>

                  {isCustom ? (
                    <p style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, color: tool.color, marginBottom: 22 }}>Індивідуально</p>
                  ) : (
                    <div style={{ marginBottom: 22 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                        <span style={{ fontFamily: "Instrument Serif, serif", fontSize: 40, color: "#1a1025" }}>{price?.toLocaleString()}</span>
                        <span style={{ fontSize: 17, color: "#9384b0" }}>₴</span>
                        <span style={{ fontSize: 13, color: "#9384b0" }}>/{billing === "monthly" ? "місяць" : "рік"}</span>
                      </div>
                      {billing === "yearly" && (p as any).monthly && (
                        <p style={{ fontSize: 12, color: "#9384b0" }}>Ощадність {(((p as any).monthly * 12) - (p as any).yearly).toLocaleString()}₴/рік</p>
                      )}
                    </div>
                  )}

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px" }}>
                    {tool.features.map((f, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6b5b8a", marginBottom: 9 }}>
                        <CheckCircle2 size={14} color={tool.color} style={{ flexShrink: 0 }} /> {f}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => { setContactTool(tool.name); setContactOpen(true); }} style={{ width: "100%", background: isCustom ? "transparent" : tool.color, color: isCustom ? tool.color : "#fff", border: isCustom ? `1.5px solid ${tool.color}` : "none", borderRadius: 10, padding: "11px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "opacity .15s" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = ".85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >{isCustom ? "Запросити пропозицію →" : `Почати${trialDays ? " безкоштовно" : ""} →`}</button>
                </div>
              );
            })}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 48 }} className="faq-grid">
            {[
              { q: "Чи є безкоштовний пробний період?", a: "Так, більшість інструментів мають 14 днів безкоштовного доступу без прив'язки картки." },
              { q: "Як скасувати підписку?", a: "Скасувати можна будь-коли в особистому кабінеті. Ніяких штрафів або прихованих умов." },
              { q: "Є корпоративні пакети?", a: "Для мереж закладів — зв'яжіться з нами для отримання індивідуальної пропозиції." },
            ].map((faq, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 16, padding: 22 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#1a1025", marginBottom: 9, fontFamily: "Inter, sans-serif" }}>{faq.q}</h4>
                <p style={{ fontSize: 13, color: "#6b5b8a", lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:768px){.faq-grid{grid-template-columns:1fr!important;}}`}</style>
    </main>
  );
}
