"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Settings, LogOut, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [drop, setDrop] = useState(false);
  const [mobile, setMobile] = useState(false);
  const isAdmin = (session?.user as any)?.isAdmin;

  const links = [
    { href: "/#tools", label: "Інструменти" },
    { href: "/pricing", label: "Ціни" },
    { href: "/#contact", label: "Контакт" },
  ];

  const navStyle: React.CSSProperties = {
    position: "sticky", top: 0, zIndex: 50,
    background: "rgba(246,239,255,0.9)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(120,80,180,0.12)",
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.svg" alt="Mage Food" style={{ width: 34, height: 34, borderRadius: 9 }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 17, color: "#1a1025" }}>Mage Food</span>
          </Link>

          <div style={{ display: "flex", gap: 2 }} className="nav-desktop">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{ color: "#6b5b8a", textDecoration: "none", padding: "7px 15px", borderRadius: 8, fontSize: 14, fontWeight: 500, transition: "background .15s, color .15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#ede8f8"; e.currentTarget.style.color = "#4c1d95"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6b5b8a"; }}
              >{l.label}</Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {session ? (
              <div style={{ position: "relative" }}>
                <button onClick={() => setDrop(!drop)} style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 100, padding: "6px 14px 6px 8px", cursor: "pointer", color: "#1a1025" }}>
                  {session.user?.image
                    ? <img src={session.user.image} alt="" style={{ width: 24, height: 24, borderRadius: "50%" }} />
                    : <User size={16} color="#7c3aed" />}
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{session.user?.name?.split(" ")[0]}</span>
                </button>
                {drop && (
                  <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 14, padding: 6, minWidth: 180, zIndex: 100, boxShadow: "0 8px 32px rgba(120,80,180,0.12)" }}>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setDrop(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 9, color: "#7c3aed", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
                        <Settings size={15} /> Адмін-панель
                      </Link>
                    )}
                    <button onClick={() => signOut()} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", borderRadius: 9, color: "#6b5b8a", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>
                      <LogOut size={15} /> Вийти
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => signIn()} style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: 10, padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
                onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
              >Увійти</button>
            )}
            <button onClick={() => setMobile(!mobile)} className="nav-burger" style={{ display: "none", background: "none", border: "1px solid rgba(120,80,180,0.2)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#1a1025" }}>
              {mobile ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobile && (
          <div style={{ padding: "12px 0 16px", borderTop: "1px solid rgba(120,80,180,0.1)" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobile(false)} style={{ display: "block", color: "#6b5b8a", textDecoration: "none", padding: "11px 4px", fontSize: 15, fontWeight: 500 }}>{l.label}</Link>
            ))}
          </div>
        )}
      </div>
      <style>{`@media(max-width:768px){.nav-desktop{display:none!important}.nav-burger{display:flex!important}}`}</style>
    </nav>
  );
}
