"use client";
import { useState } from "react";

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

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("Explore");

  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1px solid #f0f0f0",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, #ffd700, #ff6b9d, #4ecdc4, #45b7d1)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            💎
          </div>
          <span style={{ fontSize: "16px", fontWeight: "900", color: "#111" }}>Treasure</span>
          <span style={{ fontSize: "16px", fontWeight: "400", color: "#111", marginLeft: "-6px" }}> Fun</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Explore", "Earn", "Reserve"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveNav(item)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: activeNav === item ? "600" : "400",
                color: "#222",
                padding: "4px 0",
                borderBottom: activeNav === item ? "2px solid #3dbfb8" : "2px solid transparent",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: "300px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#f8f8f8",
              border: "1.5px solid #e8e8e8",
              borderRadius: "24px",
              padding: "8px 16px",
            }}
          >
            <span style={{ color: "#aaa", fontSize: "14px" }}>Select</span>
            <div style={{ marginLeft: "auto", color: "#999" }}>
              <SearchIcon />
            </div>
          </div>
        </div>

        {/* Right Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "auto" }}>
          {/* Bell */}
          <div style={{ position: "relative", cursor: "pointer" }}>
            <BellIcon />
            <div
              style={{
                position: "absolute",
                top: "-2px",
                right: "-2px",
                width: "8px",
                height: "8px",
                background: "#ff4444",
                borderRadius: "50%",
                border: "1.5px solid white",
              }}
            />
          </div>

          {/* Airdrop */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "500",
              color: "#222",
            }}
          >
            Airdrop
          </button>

          {/* Profile Avatar */}
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "2px solid #3dbfb8",
              background: "linear-gradient(135deg, #3dbfb8, #5de8d8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            E
          </div>

          {/* Telegram */}
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#2AABEE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <TelegramIcon />
          </div>

          {/* Globe */}
          <div style={{ cursor: "pointer" }}>
            <GlobeIcon />
          </div>

          {/* Hamburger */}
          <div style={{ cursor: "pointer" }}>
            <MenuIcon />
          </div>
        </div>
      </div>
    </nav>
  );
}
