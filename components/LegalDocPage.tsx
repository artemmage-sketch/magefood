import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getLegalDoc, parseLegal } from "@/lib/legal";

const text = { color: "#6b5b8a", fontSize: 15, lineHeight: 1.8, marginBottom: 12, whiteSpace: "pre-line" as const };

// Сторінка юридичного документа (оферти) у стилі сторінки «Політика конфіденційності»
export default async function LegalDocPage({ slug }: { slug: string }) {
  const doc = await getLegalDoc(slug);
  if (!doc) notFound();
  const { meta, sections } = parseLegal(doc.content);
  const badges = meta.filter(m => !m.startsWith("Постійна адреса"));

  return (
    <main style={{ minHeight: "100vh", background: "#f6efff" }}>
      <Navbar />
      <section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ color: "#7c3aed", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Юридична інформація
            </p>
            <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(30px, 5vw, 46px)", color: "#1a1025", marginBottom: 16, fontWeight: 400, lineHeight: 1.15 }}>
              {doc.title}
            </h1>
            {badges.map((m) => (
              <div key={m} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 100, padding: "6px 16px" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
                <span style={{ fontSize: 13, color: "#6b5b8a" }}>{m}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {sections.map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 20, padding: "28px clamp(20px, 4vw, 32px)" }}>
                {s.title && (
                  <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: 22, color: "#1a1025", marginBottom: 16, fontWeight: 400 }}>{s.title}</h2>
                )}
                {s.blocks.map((b, j) => b.kind === "p" ? (
                  <p key={j} style={text}>{b.text}</p>
                ) : (
                  <ul key={j} style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
                    {b.items.map((item, k) => (
                      <li key={k} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#6b5b8a", fontSize: 15, lineHeight: 1.8, marginBottom: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", flexShrink: 0, marginTop: 11 }}></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
