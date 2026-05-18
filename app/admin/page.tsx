"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, RefreshCw, Home, Package, DollarSign, Megaphone, ArrowLeft, Check } from "lucide-react";
import { TOOLS, PRICING } from "@/data/content";

type Tab = "hero" | "tools" | "pricing" | "banner";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = (session?.user as any)?.isAdmin;
  const [tab, setTab] = useState<Tab>("hero");
  const [overrides, setOverrides] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/auth/signin"); return; }
    if (status === "authenticated" && !isAdmin) { router.push("/"); return; }
    if (isAdmin) fetch("/api/admin").then(r => r.json()).then(setOverrides);
  }, [status, isAdmin]);

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(overrides) });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const set = (path: string, value: any) => {
    const keys = path.split(".");
    setOverrides((prev: any) => {
      const next = { ...prev };
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  if (status === "loading") return (
    <div style={{ minHeight: "100vh", background: "#f6efff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#9384b0" }}>Завантаження...</p>
    </div>
  );

  const inp: React.CSSProperties = { width: "100%", background: "#f6efff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#1a1025", outline: "none", fontFamily: "Inter, sans-serif" };
  const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, color: "#9384b0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 };
  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "hero", label: "Головна", icon: <Home size={15} /> },
    { id: "tools", label: "Інструменти", icon: <Package size={15} /> },
    { id: "pricing", label: "Ціни", icon: <DollarSign size={15} /> },
    { id: "banner", label: "Банер", icon: <Megaphone size={15} /> },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ background: "#1a0f2e", padding: "20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13 }}>✦</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "Inter, sans-serif" }}>Адмін</span>
        </div>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "10px 20px", color: tab === t.id ? "#fff" : "#a78bfa", background: tab === t.id ? "rgba(124,58,237,0.2)" : "none", borderTop: "none", borderRight: "none", borderBottom: "none", borderLeft: tab === t.id ? "2px solid #7c3aed" : "2px solid transparent", cursor: "pointer", fontSize: 14, fontFamily: "Inter, sans-serif", transition: "all .15s" }}>
            {t.icon} {t.label}
          </button>
        ))}
        <div style={{ padding: "20px", marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => router.push("/")} style={{ background: "none", border: "none", color: "#a78bfa", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, fontFamily: "Inter, sans-serif" }}>
            <ArrowLeft size={14} /> На сайт
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ padding: 28, background: "#f6efff" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1a1025", fontFamily: "Inter, sans-serif", marginBottom: 4 }}>
              {tabs.find(t => t.id === tab)?.label}
            </h1>
            <p style={{ fontSize: 13, color: "#9384b0" }}>Редагування контенту сайту</p>
          </div>
          <button onClick={save} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 7, background: saved ? "#059669" : "#7c3aed", color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "background .15s" }}>
            {saving ? <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Зберігаємо</> : saved ? <><Check size={14} /> Збережено!</> : <><Save size={14} /> Зберегти</>}
          </button>
        </div>

        <div style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 18, padding: 26 }}>
          {tab === "hero" && (
            <div>
              {[{ k: "heroTitle", l: "Заголовок Hero", p: "Автоматизація для закладів, що прагнуть більшого" }, { k: "heroSubtitle", l: "Підзаголовок", p: "AI-сканер чеків, управління кур'єрами..." }, { k: "heroCtaText", l: "Текст CTA кнопки", p: "Почати безкоштовно" }, { k: "contactEmail", l: "Email", p: "hello@magefood.com" }, { k: "contactTelegram", l: "Telegram", p: "@magefood" }].map(f => (
                <div key={f.k} style={{ marginBottom: 20 }}>
                  <label style={lbl}>{f.l}</label>
                  <input type="text" value={overrides[f.k] || ""} placeholder={f.p} onChange={e => set(f.k, e.target.value)} style={inp} />
                </div>
              ))}
            </div>
          )}

          {tab === "tools" && (
            <div>
              {TOOLS.map(tool => (
                <div key={tool.id} style={{ background: "#f6efff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 12, padding: 18, marginBottom: 12 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1025", marginBottom: 14, fontFamily: "Inter, sans-serif" }}>{tool.emoji} {tool.name}</p>
                  <div style={{ marginBottom: 14 }}>
                    <label style={lbl}>Короткий опис</label>
                    <input type="text" value={overrides?.tools?.[tool.id]?.shortDesc || ""} placeholder={tool.shortDesc} onChange={e => set(`tools.${tool.id}.shortDesc`, e.target.value)} style={inp} />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label style={lbl}>Повний опис</label>
                    <textarea rows={2} value={overrides?.tools?.[tool.id]?.description || ""} placeholder={tool.description} onChange={e => set(`tools.${tool.id}.description`, e.target.value)} style={{ ...inp, resize: "vertical" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={overrides?.tools?.[tool.id]?.available !== false} onChange={e => set(`tools.${tool.id}.available`, e.target.checked)} style={{ width: 16, height: 16, accentColor: "#7c3aed", cursor: "pointer" }} />
                    <label style={{ fontSize: 13, color: "#6b5b8a" }}>Доступний для покупки</label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "pricing" && (
            <div>
              {TOOLS.map(tool => {
                const p = PRICING[tool.id as keyof typeof PRICING];
                const isCustom = p && "customPricing" in p && (p as any).customPricing;
                return (
                  <div key={tool.id} style={{ background: "#f6efff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 12, padding: 18, marginBottom: 12 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1025", marginBottom: 14, fontFamily: "Inter, sans-serif" }}>{tool.emoji} {tool.name}</p>
                    {isCustom ? <p style={{ fontSize: 13, color: "#9384b0" }}>Індивідуальне ціноутворення</p> : (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                        {["monthly", "yearly", "trialDays"].map(field => (
                          <div key={field}>
                            <label style={lbl}>{field === "monthly" ? "Місяць (₴)" : field === "yearly" ? "Рік (₴)" : "Пробний (дні)"}</label>
                            <input type="number" value={overrides?.pricing?.[tool.id]?.[field] ?? ""} placeholder={String((p as any)[field] || "")} onChange={e => set(`pricing.${tool.id}.${field}`, Number(e.target.value))} style={inp} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "banner" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <label style={lbl}>Текст банера</label>
                <input type="text" value={overrides.announcementBanner || ""} placeholder="🎉 Нова функція: Інтеграція з Poster POS!" onChange={e => set("announcementBanner", e.target.value)} style={inp} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" id="banner-on" checked={overrides.announcementEnabled || false} onChange={e => set("announcementEnabled", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#7c3aed", cursor: "pointer" }} />
                <label htmlFor="banner-on" style={{ fontSize: 14, color: "#6b5b8a", cursor: "pointer" }}>Показувати банер на сайті</label>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
