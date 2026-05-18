"use client";
import { CheckCircle2 } from "lucide-react";
import { PRICING } from "@/data/content";

interface Tool {
  id: string; name: string; emoji: string; shortDesc: string;
  description: string; features: string[]; color: string;
  gradient: string; available: boolean;
}

const BG_MAP: Record<string, string> = {
  "mage-delivery": "#ede8f8",
  "mage-courier": "#ecfdf5",
  "mage-courier-service": "#fdf2f8",
  "mage-qr-menu": "#fffbeb",
};

export default function ToolCard({ tool }: { tool: Tool }) {
  const pricing = PRICING[tool.id as keyof typeof PRICING];
  const isCustom = pricing && "customPricing" in pricing && (pricing as any).customPricing;
  const bg = BG_MAP[tool.id] || "#ede8f8";

  return (
    <div style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 20, padding: 28, transition: "border-color .2s, transform .2s", cursor: "pointer" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${tool.color}44`; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(120,80,180,0.1)"; e.currentTarget.style.transform = "none"; }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{tool.emoji}</div>
        {isCustom ? (
          <span style={{ color: tool.color, fontSize: 13, fontWeight: 700 }}>Індивідуально</span>
        ) : pricing && (pricing as any).monthly ? (
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "#9384b0", fontSize: 11 }}>від</p>
            <p style={{ fontFamily: "Instrument Serif, serif", fontSize: 22, color: "#4c1d95", fontWeight: 400 }}>{(pricing as any).monthly?.toLocaleString()}</p>
            <p style={{ color: "#9384b0", fontSize: 11 }}>/міс</p>
          </div>
        ) : null}
      </div>

      <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1a1025", marginBottom: 8, fontFamily: "Inter, sans-serif" }}>{tool.name}</h3>
      <p style={{ color: "#6b5b8a", fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{tool.description}</p>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px" }}>
        {tool.features.slice(0, 3).map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b5b8a", fontSize: 13, marginBottom: 8 }}>
            <CheckCircle2 size={14} color={tool.color} style={{ flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>

      <button style={{ width: "100%", background: tool.color, color: "#fff", border: "none", borderRadius: 10, padding: "11px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "opacity .15s" }}
        onMouseEnter={e => (e.currentTarget.style.opacity = ".85")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        {isCustom ? "Запросити пропозицію →" : `Почати${(pricing as any)?.trialDays ? ` — ${(pricing as any).trialDays} днів безкоштовно` : ""} →`}
      </button>
    </div>
  );
}
