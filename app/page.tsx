"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/ui/ToolCard";
import ContactModal from "@/components/ui/ContactModal";
import { TOOLS, STATS } from "@/data/content";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main style={{ minHeight: "100vh", background: "#f6efff" }}>
      <Navbar />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      {/* HERO */}
      <section style={{ padding: "80px 24px 64px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div className="animate-fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#ede8f8", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 100, padding: "5px 16px", fontSize: 13, fontWeight: 600, color: "#6d28d9", marginBottom: 28 }}>
            ✦ Чотири інструменти. Один заклад.
          </div>
          <h1 className="animate-fade-up delay-100" style={{ fontSize: "clamp(40px,7vw,60px)", color: "#1a1025", marginBottom: 16, fontFamily: "Instrument Serif, serif" }}>
            Автоматизація для закладів,<br />що <em style={{ color: "#7c3aed", fontStyle: "italic" }}>прагнуть більшого</em>
          </h1>
          <p className="animate-fade-up delay-200" style={{ color: "#6b5b8a", fontSize: 18, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
            AI-сканер чеків, управління кур'єрами, QR-меню та власна кур'єрська служба — все в одній екосистемі.
          </p>
          <div className="animate-fade-up delay-300" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
            <button onClick={() => setContactOpen(true)} style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: 12, padding: "13px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "Inter, sans-serif", transition: "background .15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
              onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
            >Почати безкоштовно <ArrowRight size={16} /></button>
            <a href="#tools" style={{ background: "#fff", color: "#4c1d95", border: "1.5px solid rgba(124,58,237,0.22)", borderRadius: 12, padding: "13px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "Inter, sans-serif", transition: "border-color .15s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#7c3aed")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.22)")}
            >Переглянути інструменти</a>
          </div>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "#fff", borderRadius: 20, border: "1px solid rgba(120,80,180,0.12)", overflow: "hidden" }} className="stats-grid">
            {STATS.map((s, i) => (
              <div key={i} style={{ padding: "26px 16px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(120,80,180,0.1)" : "none" }}>
                <p style={{ fontFamily: "Instrument Serif, serif", fontSize: 32, color: "#4c1d95", marginBottom: 4 }}>{s.value}</p>
                <p style={{ fontSize: 13, color: "#9384b0" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" style={{ padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: "#7c3aed", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Наші інструменти</p>
          <h2 style={{ fontSize: "clamp(30px,4vw,40px)", color: "#1a1025", marginBottom: 12 }}>Все для вашого закладу</h2>
          <p style={{ color: "#6b5b8a", fontSize: 16, maxWidth: 440, lineHeight: 1.7, marginBottom: 36 }}>Обирайте окремі рішення або весь пакет — кожен інструмент вирішує конкретну задачу.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 14 }}>
            {TOOLS.map(tool => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section style={{ padding: "0 24px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} className="why-grid">
          {[
            { icon: "⚡", bg: "#ede8f8", color: "#7c3aed", title: "Швидко та просто", desc: "Підключення займає менше дня. Все налаштовується через зрозумілий інтерфейс без залучення розробників." },
            { icon: "🛡️", bg: "#ecfdf5", color: "#059669", title: "Надійно та безпечно", desc: "Uptime 99.9%. Дані зберігаються безпечно відповідно до українського законодавства." },
            { icon: "📊", bg: "#fdf4ff", color: "#a21caf", title: "Аналітика та звіти", desc: "Детальна статистика по кожному інструменту. Приймайте рішення на основі реальних даних." },
          ].map((w, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 18, padding: 24 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: w.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 14 }}>{w.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1a1025", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>{w.title}</h3>
              <p style={{ fontSize: 14, color: "#6b5b8a", lineHeight: 1.7 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ padding: "0 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ background: "#f0e8ff", border: "1.5px solid rgba(124,58,237,0.2)", borderRadius: 24, padding: "56px 40px", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,42px)", color: "#1a1025", marginBottom: 12 }}>Готові почати?</h2>
            <p style={{ color: "#6b5b8a", fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>14 днів безкоштовно. Без прив'язки картки. Скасуйте будь-коли.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setContactOpen(true)} style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: 11, padding: "13px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: 8, transition: "background .15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
                onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
              >Залишити заявку <ArrowRight size={16} /></button>
              <a href="https://t.me/magefood" style={{ background: "#fff", color: "#4c1d95", border: "1.5px solid rgba(124,58,237,0.25)", borderRadius: 11, padding: "13px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", fontFamily: "Inter, sans-serif" }}>Написати в Telegram</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <style>{`
        @media(max-width:768px){
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .why-grid{grid-template-columns:1fr!important;}
        }
      `}</style>
    </main>
  );
}
