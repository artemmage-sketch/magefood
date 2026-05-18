"use client";
import { signIn, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [providers, setProviders] = useState<any>(null);
  useEffect(() => { getProviders().then(setProviders); }, []);

  const icons: Record<string, string> = { google: "🔵", github: "⚫" };
  const labels: Record<string, string> = { google: "Увійти через Google", github: "Увійти через GitHub" };

  return (
    <div style={{ minHeight: "100vh", background: "#f6efff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.12)", borderRadius: 24, padding: "44px 36px", maxWidth: 360, width: "100%", textAlign: "center" }}>
        <div style={{ width: 52, height: 52, background: "#7c3aed", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, color: "#fff", margin: "0 auto 18px" }}>✦</div>
        <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, color: "#1a1025", marginBottom: 8, fontWeight: 400 }}>Вхід до Mage Food</h1>
        <p style={{ fontSize: 14, color: "#9384b0", marginBottom: 28, lineHeight: 1.6 }}>Оберіть спосіб входу — без номера телефону</p>

        {providers && Object.values(providers).map((p: any) => (
          <button key={p.id} onClick={() => signIn(p.id, { callbackUrl: "/" })} style={{ width: "100%", background: "#f6efff", border: "1.5px solid rgba(120,80,180,0.15)", borderRadius: 12, padding: "13px 18px", color: "#1a1025", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, fontSize: 15, fontWeight: 500, marginBottom: 10, fontFamily: "Inter, sans-serif", transition: "border-color .15s, background .15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.background = "#ede8f8"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(120,80,180,0.15)"; e.currentTarget.style.background = "#f6efff"; }}
          >
            <span style={{ fontSize: 20 }}>{icons[p.id] || "🔐"}</span>
            {labels[p.id] || `Увійти через ${p.name}`}
          </button>
        ))}

        <p style={{ fontSize: 12, color: "#9384b0", marginTop: 20, lineHeight: 1.7 }}>Входячи, ви погоджуєтесь з умовами використання та політикою конфіденційності Mage Food.</p>
      </div>
    </div>
  );
}
