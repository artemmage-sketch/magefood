"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

const CITIES = ["Тернопіль","Львів","Хмельницький","Рівне","Київ","Дніпро","Запоріжжя","Інше місто"];
const AGE_OPTIONS = Array.from({ length: 33 }, (_, i) => i + 18);

type Form = { name: string; city: string; customCity: string; age: string; phone: string; experience: string; transport: string; reservation: string; };
const EMPTY: Form = { name: "", city: "", customCity: "", age: "", phone: "", experience: "", transport: "", reservation: "" };

export default function CourierPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const set = (k: keyof Form, v: string) => { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: "" })); };

  const handlePhone = (raw: string) => {
    let digits = raw.replace(/\D/g, "");
    if (digits.startsWith("380")) digits = digits.slice(3);
    else if (digits.startsWith("38")) digits = digits.slice(2);
    if (digits.length > 0 && digits[0] !== "0") digits = "0" + digits;
    digits = digits.slice(0, 10);
    set("phone", digits);
  };

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) e.name = "Введи ім'я";
    if (!form.city) e.city = "Обери місто";
    if (form.city === "Інше місто" && !form.customCity.trim()) e.customCity = "Введи місто";
    if (!form.age) e.age = "Обери вік";
    if (!form.phone || form.phone.length < 10) e.phone = "Введи коректний номер";
    if (!form.experience) e.experience = "Обери варіант";
    if (!form.transport) e.transport = "Обери варіант";
    if (!form.reservation) e.reservation = "Обери варіант";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await fetch("/api/courier", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, phone: "+38" + form.phone }) });
      setDone(true);
    } catch {}
    setLoading(false);
  };

  const inp: React.CSSProperties = { width: "100%", background: "#f6efff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 10, padding: "11px 14px", fontSize: 15, color: "#1a1025", outline: "none", fontFamily: "Inter, sans-serif", boxSizing: "border-box" };
  const errInp: React.CSSProperties = { ...inp, border: "1.5px solid #e53e3e", background: "#fff5f5" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, color: "#9384b0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 7 };
  const errMsg: React.CSSProperties = { fontSize: 12, color: "#e53e3e", marginTop: 4 };

  const RadioGroup = ({ field, options }: { field: keyof Form; options: string[] }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((opt) => {
        const selected = form[field] === opt;
        return (
          <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${selected ? "#7c3aed" : "rgba(120,80,180,0.15)"}`, background: selected ? "#f0e8ff" : "#faf7ff", transition: "all .15s", fontFamily: "Inter, sans-serif", fontSize: 14, color: selected ? "#4c1d95" : "#4a3f6b", fontWeight: selected ? 600 : 400 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${selected ? "#7c3aed" : "rgba(120,80,180,0.3)"}`, background: selected ? "#7c3aed" : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {selected && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "block" }} />}
            </span>
            <input type="radio" style={{ display: "none" }} checked={selected} onChange={() => set(field, opt)} />
            {opt}
          </label>
        );
      })}
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", background: "#f6efff", fontFamily: "Inter, sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(246,239,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(120,80,180,0.12)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b5b8a", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
            <ArrowLeft size={16} /> Назад
          </Link>
        </div>
      </div>

      <section style={{ padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ marginBottom: 36, textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#ede8f8", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 100, padding: "5px 16px", fontSize: 13, fontWeight: 600, color: "#6d28d9", marginBottom: 20 }}>
              🛵 Стати кур'єром Mage Food
            </div>
            <h1 style={{ fontSize: "clamp(28px,5vw,40px)", color: "#1a1025", marginBottom: 10, fontFamily: "Instrument Serif, serif", fontWeight: 400 }}>Приєднуйся до команди</h1>
            <p style={{ color: "#6b5b8a", fontSize: 15, lineHeight: 1.7 }}>Заповни анкету — ми зв'яжемося з тобою найближчим часом.</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.13)", borderRadius: 24, padding: "40px 36px" }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <CheckCircle size={56} color="#7c3aed" style={{ margin: "0 auto 20px", display: "block" }} />
                <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, color: "#1a1025", marginBottom: 12, fontWeight: 400 }}>Дякуємо!</h2>
                <p style={{ color: "#6b5b8a", fontSize: 15, lineHeight: 1.75, maxWidth: 340, margin: "0 auto" }}>
                  Отримали твою заявку. Напишемо тобі у Telegram або подзвонимо. Очікуй, будь ласка.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Ім'я</label>
                  <input type="text" placeholder="Олексій" value={form.name} onChange={(e) => set("name", e.target.value)} style={errors.name ? errInp : inp} />
                  {errors.name && <p style={errMsg}>{errors.name}</p>}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Місто</label>
                  <select value={form.city} onChange={(e) => set("city", e.target.value)} style={{ ...(errors.city ? errInp : inp), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239384b0' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36, cursor: "pointer" }}>
                    <option value="">Обери місто</option>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <p style={errMsg}>{errors.city}</p>}
                </div>

                {form.city === "Інше місто" && (
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Вкажи своє місто</label>
                    <input type="text" placeholder="Назва міста" value={form.customCity} onChange={(e) => set("customCity", e.target.value)} style={errors.customCity ? errInp : inp} autoFocus />
                    {errors.customCity && <p style={errMsg}>{errors.customCity}</p>}
                  </div>
                )}

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Вік</label>
                  <select value={form.age} onChange={(e) => set("age", e.target.value)} style={{ ...(errors.age ? errInp : inp), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239384b0' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36, cursor: "pointer" }}>
                    <option value="">Скільки тобі років?</option>
                    {AGE_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  {errors.age && <p style={errMsg}>{errors.age}</p>}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Номер телефону</label>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ background: "#ede8f8", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 10, padding: "11px 14px", fontSize: 15, color: "#4c1d95", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>+38</span>
                    <input type="tel" placeholder="0XX XXX XX XX" value={form.phone} onChange={(e) => handlePhone(e.target.value)} style={{ ...(errors.phone ? errInp : inp) }} maxLength={10} inputMode="numeric" />
                  </div>
                  {errors.phone && <p style={errMsg}>{errors.phone}</p>}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Досвід роботи кур'єром?</label>
                  <RadioGroup field="experience" options={["Маю досвід", "Без досвіду"]} />
                  {errors.experience && <p style={errMsg}>{errors.experience}</p>}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Чи маєш транспорт?</label>
                  <RadioGroup field="transport" options={["Так, електроскутер", "Так, електроавто", "Інший тип транспорту", "Власний транспорт відсутній"]} />
                  {errors.transport && <p style={errMsg}>{errors.transport}</p>}
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>Чи потрібне тобі бронювання?</label>
                  <RadioGroup field="reservation" options={["Так", "Ні"]} />
                  {errors.reservation && <p style={errMsg}>{errors.reservation}</p>}
                </div>

                <button type="submit" disabled={loading} style={{ width: "100%", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, opacity: loading ? 0.7 : 1, transition: "background .15s" }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#6d28d9"; }}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#7c3aed")}
                >
                  {loading ? "Надсилаємо..." : <><Send size={15} /> Надіслати анкету</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
