"use client";
import { useState } from "react";

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" fill="none" stroke="#333" strokeWidth="2" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.67a8.16 8.16 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ff0000" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M22.265 2.428a1.5 1.5 0 0 0-1.519-.234L2.165 9.25a1.5 1.5 0 0 0 .093 2.808l4.466 1.489 1.717 5.508a1.5 1.5 0 0 0 2.395.655l2.49-2.163 4.39 3.23a1.5 1.5 0 0 0 2.349-1.003l2.985-15.906a1.5 1.5 0 0 0-.785-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const AppleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
  </svg>
);

const socialLinks = [
  { icon: <EmailIcon />, bg: "#555", label: "Email" },
  { icon: <TikTokIcon />, bg: "#010101", label: "TikTok" },
  { icon: <YouTubeIcon />, bg: "#ff0000", label: "YouTube" },
  { icon: <TelegramIcon />, bg: "#2AABEE", label: "Telegram" },
  { icon: <FacebookIcon />, bg: "#1877f2", label: "Facebook" },
  { icon: <InstagramIcon />, bg: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", label: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0", paddingTop: "64px" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 48px 48px",
          display: "grid",
          gridTemplateColumns: "280px 1fr 1fr 1fr",
          gap: "60px",
        }}
      >
        {/* Column 1: Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
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
            <span style={{ fontSize: "16px", fontWeight: "900", color: "#111" }}>Quantum</span>
            <span style={{ fontSize: "16px", fontWeight: "400", color: "#111", marginLeft: "-6px" }}> NFT</span>
          </div>

          <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
            Quantum NFT is a Web3 revenue platform based on NFT collections
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {socialLinks.map((s) => (
              <button
                key={s.label}
                title={s.label}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Resources */}
        <div>
          <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "20px" }}>Resources</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {["Docs", "Invite friends", "How to buy", "Tutorials", "Artist Application Form"].map((link) => (
              <a
                key={link}
                href="#"
                style={{ fontSize: "14px", color: "#555", textDecoration: "none", cursor: "pointer" }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#3dbfb8")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#555")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Column 3: News */}
        <div>
          <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "20px" }}>News</h4>
          <a
            href="#"
            style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#3dbfb8")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#555")}
          >
            Blog
          </a>
        </div>

        {/* Column 4: Company + Download */}
        <div>
          <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "12px" }}>Company</h4>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
            Join our mailing list to stay in the loop with our newest feature releases, NFT listing, tips and tricks for
            navigating Quantum NFT webpage.
          </p>

          <div style={{ display: "flex", gap: "0", marginBottom: "36px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={{
                flex: 1,
                padding: "10px 16px",
                border: "1.5px solid #e0e0e0",
                borderRight: "none",
                borderRadius: "24px 0 0 24px",
                fontSize: "13px",
                outline: "none",
                color: "#333",
              }}
            />
            <button
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #5de8d8, #3dbfb8)",
                border: "none",
                borderRadius: "0 24px 24px 0",
                color: "white",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
          </div>

          <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "16px" }}>Download</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { label: "APP Store", icon: <AppleIcon />, gradient: "linear-gradient(135deg, #3dbfb8, #5de8d8)" },
              {
                label: "Google Play",
                icon: <PlayStoreIcon />,
                gradient: "linear-gradient(135deg, #5de8d8, #a0f0e8)",
              },
              { label: "APK", icon: null, gradient: "linear-gradient(135deg, #f4a261, #e8c0a0)" },
            ].map((btn) => (
              <button
                key={btn.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 16px",
                  background: btn.gradient,
                  border: "none",
                  borderRadius: "24px",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {btn.icon}
                {btn.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid #ebebeb",
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <span style={{ fontSize: "13px", color: "#888" }}>© 2023 - Quantum NFT Technology, Inc</span>
        <a href="#" style={{ fontSize: "13px", color: "#888", textDecoration: "none" }}>
          Privacy Policy
        </a>
        <a href="#" style={{ fontSize: "13px", color: "#888", textDecoration: "none" }}>
          Terms of service
        </a>
      </div>
    </footer>
  );
}
