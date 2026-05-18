"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { X, Send, CheckCircle } from "lucide-react";

interface Props { open: boolean; onClose: () => void; toolName?: string; }

export default function ContactModal({ open, onClose, toolName }: Props) {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", phone: "", email: session?.user?.email || "", establishment: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, tool: toolName, user: session?.user || null }) });
      setDone(true);
    } catch {}
    setLoading(false);
  };

  const inp: React.CSSProperties = { width: "100%", background: "#f6efff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#1a1025", outline: "none", fontFamily: "Inter, sans-serif" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(26,16,37,0.5)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 24, padding: 40, maxWidth: 480, width: "100%", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#f6efff", border: "none", borderRadius: 8, color: "#9384b0", cursor: "pointer", padding: 8 }}><X size={17} /></button>

        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <CheckCircle size={52} color="#7c3aed" style={{ margin: "0 auto 20px", display: "block" }} />
            <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, color: "#1a1025", marginBottom: 10, fontWeight: 400 }}>Дякуємо!</h2>
            <p style={{ color: "#6b5b8a", fontSize: 15 }}>Ми отримали вашу заявку і зв'яжемося найближчим часом.</p>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: 26, color: "#1a1025", marginBottom: 8, fontWeight: 400 }}>{toolName ? `Замовити ${toolName}` : "Зв'язатися з нами"}</h2>
            <p style={{ color: "#9384b0", fontSize: 14, marginBottom: 24 }}>Заповніть форму — ми зв'яжемося протягом 24 годин.</p>

            <form onSubmit={handleSubmit}>
              {[
                { k: "name", l: "Ваше ім'я", p: "Іван Петренко", req: true, type: "text" },
                { k: "phone", l: "Телефон", p: "+380 99 123 45 67", req: true, type: "tel" },
                { k: "email", l: "Email (необов'язково)", p: "ivan@zaklad.ua", req: false, type: "email" },
                { k: "establishment", l: "Назва закладу", p: "Кафе «Смачно»", req: true, type: "text" },
              ].map(f => (
                <div key={f.k} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#9384b0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 }}>{f.l}</label>
                  <input type={f.type} placeholder={f.p} required={f.req} value={(form as any)[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} style={inp} />
                </div>
              ))}
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#9384b0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 }}>Повідомлення (необов'язково)</label>
                <textarea placeholder="Розкажіть про ваш заклад..." rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inp, resize: "vertical" }} />
              </div>
              <button type="submit" disabled={loading} style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, opacity: loading ? 0.7 : 1, transition: "background .15s" }}
                onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#6d28d9"; }}
                onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
              >{loading ? "Надсилаємо..." : <><Send size={15} /> Надіслати заявку</>}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}