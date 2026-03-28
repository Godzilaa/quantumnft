"use client";
import { useState, useRef, useEffect } from "react";
import LoginModal from "@/components/LoginModal";

/* ─── top-bar icons ─── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);
const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M22.265 2.428a1.5 1.5 0 0 0-1.519-.234L2.165 9.25a1.5 1.5 0 0 0 .093 2.808l4.466 1.489 1.717 5.508a1.5 1.5 0 0 0 2.395.655l2.49-2.163 4.39 3.23a1.5 1.5 0 0 0 2.349-1.003l2.985-15.906a1.5 1.5 0 0 0-.785-1.44zM10 15.5l-.8 2.5-1.2-4 9-7-7 8.5z" />
  </svg>
);

/* ─── hamburger dropdown icons ─── */
const DropBallotIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="14" rx="2" />
    <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    <path d="M9 15l2 2 4-4" />
  </svg>
);
const DropHeadsetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 1 18 0" />
    <rect x="2" y="11" width="4" height="7" rx="1.5" />
    <rect x="18" y="11" width="4" height="7" rx="1.5" />
    <path d="M22 18a3 3 0 0 1-3 3h-2" />
  </svg>
);
const DropAccountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.4">
    <circle cx="12" cy="12" r="10" fill="url(#acctGrad)" />
    <ellipse cx="12" cy="12" rx="4" ry="10" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
    <path d="M2.5 12h19" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
    <defs>
      <radialGradient id="acctGrad" cx="38%" cy="32%" r="70%">
        <stop offset="0%" stopColor="#d8b4fe" />
        <stop offset="45%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#3730a3" />
      </radialGradient>
    </defs>
  </svg>
);
const DropWalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h14v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
    <circle cx="18" cy="14" r="0.6" fill="#444" stroke="none" />
  </svg>
);
const DropMessageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 8l10 6 10-6" />
  </svg>
);
const DropShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 6v6c0 5.25 3.9 10.15 9 11.35C17.1 22.15 21 17.25 21 12V6L12 2z" />
    <circle cx="12" cy="11" r="2.2" />
    <path d="M12 13.2v2.5" />
    <path d="M10.8 15.2h2.4" />
  </svg>
);
const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const MENU_ITEMS = [
  { Icon: DropBallotIcon,  label: "TreasureFun", chevron: true  },
  { Icon: DropHeadsetIcon, label: "Service",      chevron: false },
  { Icon: DropAccountIcon, label: "Account",      chevron: false },
  { Icon: DropWalletIcon,  label: "Wallet",       chevron: false },
  { Icon: DropMessageIcon, label: "Message",      chevron: false },
  { Icon: DropShieldIcon,  label: "Security TAP", chevron: false },
];

/* ─── auth user type ─── */
interface AuthUser { username: string; token: string; }

export default function Navbar() {
  const [activeNav,   setActiveNav]   = useState("Explore");
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [loginOpen,   setLoginOpen]   = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [user,        setUser]        = useState<AuthUser | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* restore session from localStorage */
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tf_user");
      const token  = localStorage.getItem("tf_token");
      if (stored && token) {
        const parsed = JSON.parse(stored);
        setUser({ username: parsed.username, token });
      }
    } catch { /* ignore */ }
  }, []);

  /* close hamburger on outside click */
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  function handleLoginSuccess(u: AuthUser) { setUser(u); }

  function handleLogout() {
    localStorage.removeItem("tf_token");
    localStorage.removeItem("tf_user");
    setUser(null);
    setMenuOpen(false);
  }

  const initials = user ? user.username.slice(0, 2).toUpperCase() : "E";

  return (
    <>
      <nav style={{
        background: "white",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "0 24px", height: "64px",
          display: "flex", alignItems: "center", gap: "32px",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <div style={{
              width: "36px", height: "36px",
              background: "linear-gradient(135deg, #ffd700, #ff6b9d, #4ecdc4, #45b7d1)",
              borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
            }}>💎</div>
            <span style={{ fontSize: "16px", fontWeight: "900", color: "#111" }}>Treasure</span>
            <span style={{ fontSize: "16px", fontWeight: "400", color: "#111", marginLeft: "-6px" }}> Fun</span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {["Explore", "Earn", "Reserve"].map((item) => (
              <button key={item} onClick={() => setActiveNav(item)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "15px", fontWeight: activeNav === item ? "600" : "400",
                color: "#222", padding: "4px 0",
                borderBottom: activeNav === item ? "2px solid #3dbfb8" : "2px solid transparent",
              }}>{item}</button>
            ))}
          </div>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: "300px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "#f8f8f8", border: "1.5px solid #e8e8e8",
              borderRadius: "24px", padding: "8px 16px",
            }}>
              <span style={{ color: "#aaa", fontSize: "14px" }}>Select</span>
              <div style={{ marginLeft: "auto", color: "#999" }}><SearchIcon /></div>
            </div>
          </div>

          {/* Right icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "auto" }}>
            {/* Bell */}
            <div style={{ position: "relative", cursor: "pointer" }}>
              <BellIcon />
              <div style={{
                position: "absolute", top: "-2px", right: "-2px",
                width: "8px", height: "8px",
                background: "#ff4444", borderRadius: "50%",
                border: "1.5px solid white",
              }} />
            </div>

            {/* Airdrop */}
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "15px", fontWeight: "500", color: "#222",
            }}>Airdrop</button>

            {/* Avatar / Log In */}
            {user ? (
              <div
                onClick={handleLogout}
                title={`Logged in as ${user.username} — click to log out`}
                style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  border: "2px solid #3dbfb8",
                  background: "linear-gradient(135deg, #3dbfb8, #5de8d8)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "white",
                  fontSize: "12px", fontWeight: "700",
                }}
              >{initials}</div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                style={{
                  padding: "7px 16px", borderRadius: "20px",
                  border: "1.5px solid #3dbfb8",
                  background: "none", cursor: "pointer",
                  fontSize: "14px", fontWeight: "600", color: "#3dbfb8",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0fffe")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >Log In</button>
            )}

            {/* Telegram */}
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "#2AABEE",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}><TelegramIcon /></div>

            {/* Globe */}
            <div style={{ cursor: "pointer" }}><GlobeIcon /></div>

            {/* Hamburger + dropdown */}
            <div ref={menuRef} style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "2px",
                }}
              ><MenuIcon /></button>

              {menuOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 12px)", right: 0,
                  width: "244px", background: "#ffffff",
                  borderRadius: "14px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.07), 0 10px 30px -5px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.04)",
                  overflow: "hidden", zIndex: 200,
                }}>
                  {/* User info row */}
                  {user && (
                    <div style={{
                      padding: "14px 16px", background: "#f9f9f9",
                      borderBottom: "1px solid #f0f0f0",
                    }}>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#222" }}>{user.username}</div>
                      <div style={{ fontSize: "12px", color: "#888", marginTop: "2px" }}>Logged in</div>
                    </div>
                  )}

                  {MENU_ITEMS.map(({ Icon, label, chevron }, i) => (
                    <div
                      key={label}
                      onMouseEnter={() => setHoveredItem(label)}
                      onMouseLeave={() => setHoveredItem(null)}
                      style={{
                        display: "flex", alignItems: "center",
                        padding: "0 16px", height: "58px",
                        cursor: "pointer",
                        borderBottom: i < MENU_ITEMS.length - 1 ? "1px solid #f3f3f3" : "none",
                        background: hoveredItem === label ? "#fafafa" : "transparent",
                        transition: "background 0.12s ease",
                      }}
                    >
                      <div style={{
                        width: "38px", height: "38px", borderRadius: "10px",
                        background: label === "Account" ? "transparent" : "#f4f4f5",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}><Icon /></div>
                      <span style={{
                        marginLeft: "13px", fontSize: "15px", fontWeight: "500",
                        color: "#1a1a1a", flex: 1, letterSpacing: "-0.01em",
                      }}>{label}</span>
                      {chevron && <div style={{ flexShrink: 0 }}><ChevronDown /></div>}
                    </div>
                  ))}

                  {/* Logout / Login row */}
                  <div
                    onMouseEnter={() => setHoveredItem("__auth")}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={user ? handleLogout : () => { setMenuOpen(false); setLoginOpen(true); }}
                    style={{
                      display: "flex", alignItems: "center",
                      padding: "0 16px", height: "52px",
                      cursor: "pointer",
                      borderTop: "1px solid #f0f0f0",
                      background: hoveredItem === "__auth" ? "#fafafa" : "transparent",
                      transition: "background 0.12s",
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: "600", color: user ? "#e53935" : "#4fc3f7" }}>
                      {user ? "Log Out" : "Log In"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
