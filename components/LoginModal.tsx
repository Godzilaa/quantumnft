"use client";
import { useState, useEffect, useRef } from "react";
import WalletModal from "@/components/WalletModal";

/* ─── palette ─── */
const GRAD = "linear-gradient(to right, #54c8e8, #ff8c69)";
const CONFIRM_GRAD = "linear-gradient(to right, #4fc3f7, #4dd0e1 55%, #ffe0b2)";
const LINK = "#4fc3f7";
const ERR = "#e53935";
const HEADER_BG = `
  radial-gradient(ellipse at 18% 55%, #b2ece3 0%, transparent 52%),
  radial-gradient(ellipse at 78% 25%, #c6e8c6 0%, transparent 48%),
  radial-gradient(ellipse at 62% 88%, #ede8d8 0%, transparent 42%),
  linear-gradient(155deg, #c6ede8 0%, #d8f0da 38%, #f0ece4 68%, #e6e6de 100%)
`.trim();

/* ─── helpers ─── */
function GradWrap({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ padding: "1.5px", borderRadius: "10px", background: GRAD, ...style }}>
      {children}
    </div>
  );
}

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const WalletIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={LINK} strokeWidth="2" strokeLinecap="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h14v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
  </svg>
);

/* ─── logo ─── */
function ModalLogo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", paddingBottom: "28px" }}>
      <div style={{ position: "relative", width: "86px", height: "86px" }}>
        <div style={{
          width: "86px", height: "86px",
          background: "linear-gradient(140deg, #a8d4f5 0%, #c2b0f0 30%, #e0b8e8 55%, #9de8d8 80%, #b0d8f0 100%)",
          borderRadius: "22px", transform: "rotate(-6deg)", position: "absolute",
          boxShadow: "0 12px 40px rgba(160,110,240,0.28), inset 0 1px 0 rgba(255,255,255,0.5)",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)" }} />
        </div>
        <div style={{
          position: "absolute", left: "4px", bottom: "4px",
          width: "42px", height: "42px", borderRadius: "50%",
          background: "linear-gradient(135deg, #ffe066, #ffa500)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "22px", boxShadow: "0 3px 10px rgba(255,150,0,0.4)", zIndex: 2,
        }}>😊</div>
        <div style={{ position: "absolute", right: "8px", top: "8px", fontSize: "30px", fontWeight: "900", color: "white", textShadow: "0 2px 6px rgba(80,40,160,0.25)", letterSpacing: "-1px", zIndex: 2 }}>T</div>
        <span style={{ position: "absolute", top: "-10px", right: "-8px", fontSize: "18px", zIndex: 3 }}>✨</span>
        <span style={{ position: "absolute", top: "4px", left: "-10px", fontSize: "13px", zIndex: 3 }}>⭐</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
        <span style={{ fontSize: "22px", fontWeight: "800", color: "#111", letterSpacing: "-0.5px" }}>Quantum</span>
        <span style={{ fontSize: "22px", fontWeight: "400", color: "#111" }}>NFT</span>
      </div>
    </div>
  );
}

/* ─── controlled input with focus border ── */
function InputField({ placeholder, value, onChange, type }: {
  placeholder: string; value: string; onChange: (v: string) => void; type: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{
        width: "100%", padding: "13px 14px",
        border: `1.5px solid ${focused ? "#4fc3f7" : "#e4e8ed"}`,
        borderRadius: "8px", fontSize: "15px", color: "#1a1a1a",
        outline: "none", transition: "border-color 0.2s",
        background: "white", boxSizing: "border-box",
      }}
    />
  );
}

/* ─── types ─── */
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { username: string; token: string }) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* reset form on open/close */
  useEffect(() => {
    if (!isOpen) return;
    setError(""); setUsername(""); setPassword("");
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !walletOpen) onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, walletOpen]);

  if (!isOpen) return null;

  /* ── wallet connect success ── */
  async function handleWalletAddress(address: string) {
    setWalletOpen(false);
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: address }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Wallet auth failed."); setLoading(false); return; }
      localStorage.setItem("tf_token", data.token);
      localStorage.setItem("tf_user", JSON.stringify(data.user));
      onLoginSuccess({ username: data.user.username, token: data.token });
      onClose();
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  /* ── username/password login ── */
  async function handleLogin() {
    setError("");
    if (!username.trim()) { setError("Please enter your username."); return; }
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed."); setLoading(false); return; }
      localStorage.setItem("tf_token", data.token);
      localStorage.setItem("tf_user", JSON.stringify(data.user));
      onLoginSuccess({ username: data.user.username, token: data.token });
      onClose();
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <div
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(3px)", padding: "16px",
        }}
      >
        <div style={{
          width: "100%", maxWidth: "480px", background: "white",
          borderRadius: "20px", overflow: "hidden",
          boxShadow: "0 25px 80px rgba(0,0,0,0.22)",
          animation: "modalIn 0.22s ease",
        }}>
          {/* Holographic header */}
          <div style={{
            background: HEADER_BG, padding: "36px 24px 0",
            display: "flex", flexDirection: "column", alignItems: "center",
            minHeight: "200px", justifyContent: "flex-end",
          }}>
            <ModalLogo />
          </div>

          {/* Form body */}
          <div style={{ padding: "28px 32px 32px" }}>
            <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#111", textAlign: "center", marginBottom: "22px", letterSpacing: "-0.5px" }}>
              Log in
            </h2>

            {/* Wallet Connect button → opens WalletModal */}
            <GradWrap style={{ display: "block", marginBottom: "18px" }}>
              <button
                onClick={() => setWalletOpen(true)}
                disabled={loading}
                style={{
                  width: "100%", background: "white", borderRadius: "8.5px",
                  border: "none", cursor: loading ? "not-allowed" : "pointer",
                  padding: "13px 20px", fontSize: "15px", fontWeight: "500",
                  color: LINK, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                <WalletIcon /> Wallet Connect &gt;
              </button>
            </GradWrap>

            <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "20px" }} />

            {error && (
              <div style={{ color: ERR, fontSize: "13.5px", marginBottom: "12px", textAlign: "center", background: "#fff5f5", padding: "10px 14px", borderRadius: "8px", border: "1px solid #fdd" }}>
                {error}
              </div>
            )}

            {/* Username */}
            <label style={{ display: "block", marginBottom: "16px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a", marginBottom: "7px" }}>
                User name<span style={{ color: ERR, marginLeft: "2px" }}>*</span>
              </div>
              <InputField placeholder="User name" value={username} onChange={setUsername} type="text" />
            </label>

            {/* Password */}
            <label style={{ display: "block", marginBottom: "8px" }}>
              <div style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a", marginBottom: "7px" }}>
                Password<span style={{ color: ERR, marginLeft: "2px" }}>*</span>
              </div>
              <div style={{ position: "relative" }}>
                <InputField placeholder="Password" value={password} onChange={setPassword} type={showPw ? "text" : "password"} />
                <button
                  onClick={() => setShowPw(!showPw)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </label>

            <div style={{ textAlign: "right", marginBottom: "24px" }}>
              <span style={{ fontSize: "13.5px", cursor: "pointer" }}>
                <span style={{ color: LINK, fontWeight: "500" }}>Forgot</span>
                <span style={{ color: "#444" }}> Password?</span>
              </span>
            </div>

            {/* Cancel / Confirm */}
            <div style={{ display: "flex", gap: "14px", marginBottom: "20px" }}>
              <GradWrap style={{ flex: 1 }}>
                <button
                  onClick={onClose}
                  style={{ width: "100%", background: "white", borderRadius: "8.5px", border: "none", cursor: "pointer", padding: "13px", fontSize: "15px", fontWeight: "500", color: "#444" }}
                >
                  Cancel
                </button>
              </GradWrap>
              <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                  flex: 1, border: "none", cursor: loading ? "not-allowed" : "pointer",
                  padding: "13px", borderRadius: "10px",
                  background: loading ? "#d0d0d0" : CONFIRM_GRAD,
                  color: "white", fontSize: "15px", fontWeight: "600",
                  opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
                }}
              >
                {loading ? "…" : "Confirm"}
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: "14px", color: "#333", margin: 0 }}>
              Don&apos;t have an account?{" "}
              <a href="/register" style={{ color: LINK, fontWeight: "500", textDecoration: "none" }}>Sign up</a>
            </p>
          </div>
        </div>

        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: scale(0.94) translateY(12px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>

      {/* Wallet selection modal (z-index above login modal) */}
      <WalletModal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        onConnect={handleWalletAddress}
      />
    </>
  );
}
