"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import WalletModal from "@/components/WalletModal";

const GRAD = "linear-gradient(to right, #54c8e8, #ff8c69)";
const CONFIRM_GRAD = "linear-gradient(to right, #4fc3f7, #4dd0e1 55%, #ffe0b2)";
const LINK = "#4fc3f7";
const ERR = "#e53935";

const COUNTRIES = [
  { code: "+91", label: "India" },
  { code: "+1",  label: "USA"   },
  { code: "+44", label: "UK"    },
  { code: "+86", label: "China" },
  { code: "+81", label: "Japan" },
  { code: "+49", label: "Germany" },
  { code: "+61", label: "Australia" },
  { code: "+65", label: "Singapore" },
];

/* ─── NFT image placeholders ─── */
const NFT_TILES = [
  { top: 0,   left: 190, w: 120, h: 120, bg: "#9fd8cc", delay: 0   },
  { top: 0,   left: 320, w: 100, h: 100, bg: "#b0e4d8", delay: 50  },
  { top: 80,  left: 0,   w: 130, h: 160, bg: "#4a7a6e", img: "ape",  delay: 80  },
  { top: 110, left: 140, w: 110, h: 140, bg: "#c75a6e", img: "pink", delay: 120 },
  { top: 80,  left: 260, w: 90,  h: 90,  bg: "#a0d4cc", delay: 150 },
  { top: 180, left: 320, w: 130, h: 160, bg: "#8fa0b8", img: "knight", delay: 180 },
  { top: 260, left: 0,   w: 130, h: 160, bg: "#3d6e5a", img: "ape2",  delay: 200 },
  { top: 290, left: 140, w: 110, h: 120, bg: "#79c0b8", delay: 220 },
  { top: 350, left: 260, w: 130, h: 160, bg: "#c8a076", img: "woman", delay: 240 },
];

/* ─── gradient border wrapper ─── */
function GradWrap({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ padding: "1.5px", borderRadius: "10px", background: GRAD, ...style }}>
      {children}
    </div>
  );
}


const WalletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={LINK} strokeWidth="2" strokeLinecap="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h14v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
  </svg>
);

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8">
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

/* ─── NFT decorative collage ─── */
function NftCollage() {
  const chars: Record<string, string> = {
    ape:    "🦍",
    pink:   "🤖",
    knight: "🧜",
    ape2:   "🐒",
    woman:  "👸",
  };
  return (
    <div style={{ position: "relative", width: "100%", height: "520px", overflow: "hidden" }}>
      {NFT_TILES.map((t, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: t.top,
            left: t.left,
            width: t.w,
            height: t.h,
            borderRadius: "14px",
            background: t.bg,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            animation: `floatIn 0.5s ${t.delay}ms both`,
          }}
        >
          {t.img ? (
            <div style={{
              width: "100%", height: "100%",
              background: `linear-gradient(135deg, ${t.bg} 0%, ${t.bg}cc 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "52px",
            }}>
              {chars[t.img] || "🎭"}
            </div>
          ) : null}
        </div>
      ))}
      <style>{`
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [username,   setUsername]   = useState("");
  const [password,   setPassword]   = useState("");
  const [confirmPw,  setConfirmPw]  = useState("");
  const [mobile,     setMobile]     = useState("");
  const [countryCode,setCountryCode]= useState("+91");
  const [email,      setEmail]      = useState("");
  const [emailCode,  setEmailCode]  = useState("");
  const [referral,   setReferral]   = useState("");
  const [showPw,     setShowPw]     = useState(false);
  const [showCpw,    setShowCpw]    = useState(false);
  const [error,      setError]      = useState("");
  const [success,    setSuccess]    = useState("");
  const [loading,    setLoading]    = useState(false);
  const [codeSent,   setCodeSent]   = useState(false);
  const [codeLoading,setCodeLoading]= useState(false);
  const [focused,    setFocused]    = useState<Record<string, boolean>>({});

  const fo = (k: string) => ({ onFocus: () => setFocused(p => ({ ...p, [k]: true })), onBlur: () => setFocused(p => ({ ...p, [k]: false })) });

  const inputSt = (k: string): React.CSSProperties => ({
    width: "100%", padding: "13px 14px",
    border: `1.5px solid ${focused[k] ? "#4fc3f7" : "#e4e8ed"}`,
    borderRadius: "8px", fontSize: "14.5px",
    color: "#1a1a1a", outline: "none",
    transition: "border-color 0.2s", background: "white",
    boxSizing: "border-box",
  });

  const [walletOpen, setWalletOpen] = useState(false);

  const canSubmit = username && password && confirmPw && email;

  async function handleWalletAddress(address: string) {
    setWalletOpen(false);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: address }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      localStorage.setItem("tf_token", data.token);
      localStorage.setItem("tf_user", JSON.stringify(data.user));
      router.push("/");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  async function handleSendCode() {
    if (!email.includes("@")) { setError("Enter a valid email first."); return; }
    setCodeLoading(true);
    const res = await fetch("/api/auth/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setCodeLoading(false);
    if (!res.ok) { setError(data.error); return; }
    setCodeSent(true);
    // In dev, auto-fill the code:
    if (data._devCode) setEmailCode(data._devCode);
    setError("");
  }

  async function handleSubmit() {
    setError("");
    if (password !== confirmPw) { setError("Passwords do not match."); return; }
    if (password.length < 6)   { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password,
          confirmPassword: confirmPw,
          email: email.trim(),
          mobile: countryCode + mobile,
          referralCode: referral,
          verificationCode: emailCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registration failed."); setLoading(false); return; }
      localStorage.setItem("tf_token", data.token);
      localStorage.setItem("tf_user", JSON.stringify(data.user));
      setSuccess("Account created! Redirecting…");
      setTimeout(() => router.push("/"), 1200);
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <main style={{ minHeight: "100vh", background: "white" }}>
      <Navbar />

      {/* Hero banner */}
      <div style={{
        background: `
          radial-gradient(ellipse at 15% 60%, #b2ece3 0%, transparent 50%),
          radial-gradient(ellipse at 80% 25%, #c6e8c6 0%, transparent 45%),
          radial-gradient(ellipse at 65% 85%, #ede8d8 0%, transparent 42%),
          linear-gradient(155deg, #c6ede8 0%, #d8f0da 38%, #f0ece4 68%, #e4e4dc 100%)
        `,
        padding: "40px 48px 32px",
      }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#111", margin: 0, letterSpacing: "-0.5px" }}>
          Sign up
        </h1>
      </div>

      {/* Two-column body */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "flex", gap: "60px",
        padding: "48px 48px 80px",
        alignItems: "flex-start",
      }}>

        {/* ── Form column ── */}
        <div style={{ flex: "0 0 420px", maxWidth: "420px" }}>

          {/* Wallet button */}
          <GradWrap style={{ display: "block", marginBottom: "24px" }}>
            <button
              onClick={() => setWalletOpen(true)}
              disabled={loading}
              style={{
                width: "100%", background: "white", borderRadius: "8.5px",
                border: "none", cursor: "pointer",
                padding: "13px 20px", fontSize: "15px", fontWeight: "500",
                color: LINK, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              <WalletIcon /> Sign Up With Wallet &gt;
            </button>
          </GradWrap>

          {error && (
            <div style={{ color: ERR, fontSize: "13.5px", marginBottom: "16px", background: "#fff5f5", padding: "10px 14px", borderRadius: "8px", border: "1px solid #fdd" }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ color: "#22c55e", fontSize: "13.5px", marginBottom: "16px", background: "#f0fff4", padding: "10px 14px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
              {success}
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "7px" }}>
              User name<span style={{ color: ERR, marginLeft: "2px" }}>*</span>
            </div>
            <input placeholder="Please enter user name" value={username}
              onChange={e => setUsername(e.target.value)} {...fo("un")} style={inputSt("un")} />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "7px" }}>
              Password<span style={{ color: ERR, marginLeft: "2px" }}>*</span>
            </div>
            <div style={{ position: "relative" }}>
              <input placeholder="Please enter your password" value={password} type={showPw ? "text" : "password"}
                onChange={e => setPassword(e.target.value)} {...fo("pw")} style={inputSt("pw")} />
              <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <EyeIcon open={showPw} />
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "7px" }}>
              Confirm password<span style={{ color: ERR, marginLeft: "2px" }}>*</span>
            </div>
            <div style={{ position: "relative" }}>
              <input placeholder="Please re-enter your password" value={confirmPw} type={showCpw ? "text" : "password"}
                onChange={e => setConfirmPw(e.target.value)} {...fo("cpw")} style={inputSt("cpw")} />
              <button onClick={() => setShowCpw(!showCpw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                <EyeIcon open={showCpw} />
              </button>
            </div>
          </div>

          {/* Mobile */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "7px" }}>Mobile no.</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                style={{
                  padding: "13px 10px", border: "1.5px solid #e4e8ed", borderRadius: "8px",
                  fontSize: "14px", color: "#1a1a1a", background: "white", cursor: "pointer",
                  width: "148px", flexShrink: 0, outline: "none",
                }}
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code}({c.label})</option>
                ))}
              </select>
              <input placeholder="Enter Mobile No." value={mobile} type="tel"
                onChange={e => setMobile(e.target.value)} {...fo("mob")} style={{ ...inputSt("mob"), flex: 1 }} />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "7px" }}>
              Email<span style={{ color: ERR, marginLeft: "2px" }}>*</span>
            </div>
            <input placeholder="Please enter your email" value={email} type="email"
              onChange={e => setEmail(e.target.value)} {...fo("em")} style={inputSt("em")} />
          </div>

          {/* Email verification */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                placeholder="Email verification code"
                value={emailCode}
                onChange={e => setEmailCode(e.target.value)}
                {...fo("ec")}
                style={{ ...inputSt("ec"), flex: 1 }}
              />
              <GradWrap style={{ flexShrink: 0 }}>
                <button
                  onClick={handleSendCode}
                  disabled={codeLoading || codeSent}
                  style={{
                    background: "white", borderRadius: "8.5px", border: "none",
                    cursor: codeSent ? "default" : "pointer",
                    padding: "13px 20px", fontSize: "14.5px", fontWeight: "600",
                    color: LINK, whiteSpace: "nowrap",
                  }}
                >
                  {codeLoading ? "…" : codeSent ? "Sent ✓" : "Get"}
                </button>
              </GradWrap>
            </div>
            {codeSent && (
              <p style={{ fontSize: "12px", color: "#22c55e", marginTop: "6px" }}>
                Code sent! Check your email (or console in dev mode).
              </p>
            )}
          </div>

          {/* Referral */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "7px" }}>
              Referral code<span style={{ color: ERR, marginLeft: "2px" }}>*</span>
            </div>
            <input placeholder="Please enter your Referral Code" value={referral}
              onChange={e => setReferral(e.target.value)} {...fo("ref")} style={inputSt("ref")} />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            style={{
              width: "100%", padding: "14px",
              borderRadius: "10px", border: "none",
              background: canSubmit && !loading ? CONFIRM_GRAD : "#c8c8c8",
              color: "white", fontSize: "16px", fontWeight: "700",
              cursor: canSubmit && !loading ? "pointer" : "not-allowed",
              marginBottom: "20px",
              transition: "background 0.3s",
            }}
          >
            {loading ? "Creating account…" : "Sign up"}
          </button>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#333", margin: 0 }}>
            Have an account?{" "}
            <a href="/" style={{ color: LINK, fontWeight: "500", textDecoration: "none" }}>Log in</a>
          </p>
        </div>

        {/* ── Decorative NFT collage ── */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", paddingTop: "20px" }}>
          <NftCollage />
        </div>
      </div>

      <WalletModal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        onConnect={handleWalletAddress}
      />
    </main>
  );
}
