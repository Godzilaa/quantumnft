"use client";
import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   WalletModal
   Detects injected providers (MetaMask, Coinbase, Brave, etc.)
   and shows clear install prompts when none are present.
───────────────────────────────────────────────────────────── */

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called with the connected address on success */
  onConnect: (address: string) => void;
}

/* ── Known wallet descriptors ── */
const WALLETS = [
  {
    id: "phantom",
    name: "Phantom",
    description: "Connect with your Phantom Solana wallet",
    icon: (
      <svg viewBox="0 0 128 128" width="36" height="36">
        <circle cx="64" cy="64" r="64" fill="#534bbd" />
        <path fill="white" d="M84.7,46.3c-2.4-3.3-8.1-5-18.4-5.2c0,0-1.8-0.1-5.1-0.1c-13.4,0-26.6,5.3-33,14c-6.1,8.3-5.2,21.8,2,30.3c6.8,8,18.4,11.8,32.2,10.6c0,0,6.5-0.6,8.2-1.3c1.7-0.7,3-1.6,2.6-3.8c-0.2-1-2.1-1.6-4.5-1.5c0,0-8.8,0.7-18.7,0.3c-8.7-0.4-17.5-3.3-21.7-8.4c-4.3-5.3-3.6-13,0.7-18.7c4.6-5.5,12.5-9.1,23.3-10.1c6.5-0.6,13.7,0,18.5,2.1c3.9,1.7,7,4.8,8.2,9c0.8,2.7,0.7,5.5-0.1,8L76,71.2c-0.6,1.9-2.3,3.3-4.3,3.6c-2.5,0.4-4.8-1-5.3-3.6c-0.4-2.1,0.5-4.2,2.3-5.5c1.4-1.1,3.4-1.5,5.1-1.2c2.1,0.4,3.7,1.8,4.4,3.7c0.4,1,0.4,2,0.1,2.9L73,73.4c-2,6.4-7.2,11.5-13.7,13.4c-4.9,1.4-10.2,1.3-15-0.2c-7.9-2.5-14.3-9-16.1-17.2c-1.3-5.8-0.1-12,3.3-17.1c3.8-5.8,9.7-9.9,16.5-11.4c6.3-1.4,12.9-0.9,19.1,1.1c4.6,1.5,8.8,4.1,12.3,7.6c3.2,3.2,5.7,7,7.1,11.3c0.9,2.8,1.4,5.8,1.3,8.8c-0.1,3.6-1,7-2.6,10.2c-1.4,2.8-3.4,5.3-5.8,7.3c-2.5,2.1-5.5,3.6-8.7,4.4c-4,1-8.3,0.8-12.2-0.5c-4.4-1.5-8.3-4.3-10.9-8.2c-1.6-2.5-2.6-5.4-2.9-8.4c1.1,2.8,2.8,5.3,5.1,7.3c2.7,2.3,6.2,3.6,9.8,3.7c3.1,0.1,6.2-0.8,8.8-2.5c2.9-1.9,5.2-4.7,6.5-8c1.3-3.3,1.6-6.9,0.9-10.4c-0.7-3.7-2.4-7-4.9-9.8C89.3,50,87.3,47.9,84.7,46.3z" />
      </svg>
    ),
    detect: (win: any) => !!win.solana?.isPhantom,
    install: "https://phantom.app/",
  },
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect with your MetaMask browser extension",
    icon: (
      <svg viewBox="0 0 318 318" width="36" height="36">
        <polygon fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" points="274.1,35.5 174.6,109.4 193,65.8" />
        <polygon fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" points="44,35.5 142.7,110.1 125.1,65.8" />
        <polygon fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round" points="238.3,206.8 211.8,247.4 269.1,263.4 285.8,207.7" />
        <polygon fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round" points="32.3,207.7 48.9,263.4 106.2,247.4 79.7,206.8" />
        <polygon fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round" points="103,138.2 86.8,162.1 143.7,164.7 141.8,103.2" />
        <polygon fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round" points="215.1,138.2 176.4,102.5 174.6,164.7 231.4,162.1" />
        <polygon fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round" points="106.2,247.4 140.2,230.3 111,208.1" />
        <polygon fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round" points="177.9,230.3 212,247.4 207.1,208.1" />
        <polygon fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round" points="212,247.4 177.9,230.3 180.7,252 180.4,262.7" />
        <polygon fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round" points="106.2,247.4 137.7,262.7 137.5,252 140.2,230.3" />
        <polygon fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" points="138.1,193.5 110.2,185.3 129.9,176.4" />
        <polygon fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round" points="179.9,193.5 188.2,176.4 207.9,185.3" />
        <polygon fill="#C0AD9E" stroke="#C0AD9E" strokeLinecap="round" strokeLinejoin="round" points="212,247.4 180.4,262.7 183,282.2 211.8,247.4" />
        <polygon fill="#C0AD9E" stroke="#C0AD9E" strokeLinecap="round" strokeLinejoin="round" points="106.2,247.4 106.3,247.4 134.9,282.2 137.7,262.7" />
        <polygon fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" points="135.2,282.2 106.2,247.4 106.3,247.4" />
        <polygon fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round" points="183,282.2 212,247.4 211.9,247.4" />
      </svg>
    ),
    detect: (win: any) => !!win.ethereum?.isMetaMask,
    install: "https://metamask.io/download/",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect using Coinbase Wallet extension",
    icon: (
      <svg viewBox="0 0 256 256" width="36" height="36">
        <circle cx="128" cy="128" r="128" fill="#0052FF" />
        <path fill="white" d="M128 58C89.4 58 58 89.4 58 128s31.4 70 70 70 70-31.4 70-70-31.4-70-70-70zm-18 88v-36h36v36h-36z" />
      </svg>
    ),
    detect: (win: any) => !!win.ethereum?.isCoinbaseWallet || !!win.coinbaseWalletExtension,
    install: "https://www.coinbase.com/wallet/downloads",
  },
  {
    id: "brave",
    name: "Brave Wallet",
    description: "Built into the Brave browser",
    icon: (
      <svg viewBox="0 0 128 128" width="36" height="36">
        <circle cx="64" cy="64" r="64" fill="#ff5500" />
        <path fill="white" d="M64 18l-34 20v26c0 20 14.5 36 34 46 19.5-10 34-26 34-46V38L64 18z" />
      </svg>
    ),
    detect: (win: any) => !!win.ethereum?.isBraveWallet,
    install: "https://brave.com/download/",
  },
  {
    id: "any",
    name: "Browser Wallet",
    description: "Any injected Ethereum wallet extension",
    icon: (
      <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#6366f1" strokeWidth="1.8">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M16 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
      </svg>
    ),
    detect: (win: any) => !!win.ethereum,
    install: null,
  },
];

type Status = "idle" | "connecting" | "success" | "error";

export default function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [detectedIds, setDetectedIds] = useState<string[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* detect installed wallets on open */
  useEffect(() => {
    if (!isOpen) return;
    setStatus("idle");
    setErrorMsg("");
    const win = window as any;
    const found = WALLETS.filter((w) => w.detect(win)).map((w) => w.id);
    setDetectedIds(found);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function connectWith(walletId: string, installUrl: string | null) {
    const win = window as any;

    /* If not installed → open install page */
    const detected = WALLETS.find((w) => w.id === walletId)?.detect(win) ?? false;
    if (!detected) {
      if (installUrl) {
        window.open(installUrl, "_blank", "noopener");
        return;
      }
      setErrorMsg("No injected wallet detected. Please install a wallet extension.");
      return;
    }

    setStatus("connecting");
    setErrorMsg("");

    try {
      if (walletId === "phantom") {
        const provider = win.solana;
        if (!provider?.isPhantom) throw new Error("Phantom not found.");
        const resp = await provider.connect();
        setStatus("success");
        onConnect(resp.publicKey.toString());
        return;
      }

      let provider: any = win.ethereum;

      /* Handle multi-provider (MetaMask + Coinbase both installed) */
      if (provider?.providers?.length) {
        if (walletId === "metamask") {
          provider = provider.providers.find((p: any) => p.isMetaMask) ?? provider;
        } else if (walletId === "coinbase") {
          provider = provider.providers.find((p: any) => p.isCoinbaseWallet) ?? provider;
        }
      }

      /* Request accounts — triggers wallet popup */
      const accounts: string[] = await provider.request({ method: "eth_requestAccounts" });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned by wallet.");
      }

      setStatus("success");
      onConnect(accounts[0]);
    } catch (err: any) {
      /* User rejected (code 4001) or other error */
      if (err.code === 4001 || err.code === 4000) {
        setErrorMsg("Connection rejected. Please approve the request in your wallet.");
      } else {
        setErrorMsg(err.message || "Failed to connect wallet.");
      }
      setStatus("error");
    }
  }

  /* ── styles ── */
  const card: React.CSSProperties = {
    width: "100%", maxWidth: "420px",
    background: "white", borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 25px 80px rgba(0,0,0,0.22)",
    animation: "walletIn 0.22s ease",
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1100,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)", padding: "16px",
      }}
    >
      <div style={card}>
        {/* Header */}
        <div style={{
          padding: "22px 24px 18px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#111" }}>
              Connect Wallet
            </h3>
            <p style={{ margin: "3px 0 0", fontSize: "13px", color: "#888" }}>
              Choose your wallet to continue
            </p>
          </div>
          <button onClick={onClose} style={{
            background: "#f4f4f5", border: "none", cursor: "pointer",
            width: "32px", height: "32px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", color: "#666",
          }}>×</button>
        </div>

        {/* Wallet list */}
        <div style={{ padding: "12px 16px" }}>
          {WALLETS.map((w) => {
            const isDetected = detectedIds.includes(w.id);
            const isBusy = status === "connecting";

            return (
              <button
                key={w.id}
                disabled={isBusy}
                onClick={() => connectWith(w.id, w.install)}
                style={{
                  width: "100%", display: "flex", alignItems: "center",
                  gap: "14px", padding: "14px 12px",
                  background: "transparent", border: "1.5px solid #f0f0f0",
                  borderRadius: "12px", cursor: isBusy ? "not-allowed" : "pointer",
                  marginBottom: "8px", textAlign: "left",
                  transition: "all 0.15s",
                  opacity: isBusy ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isBusy) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#4fc3f7";
                    (e.currentTarget as HTMLButtonElement).style.background = "#f8fdff";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#f0f0f0";
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                {/* icon */}
                <div style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  background: "#fafafa", border: "1px solid #f0f0f0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>{w.icon}</div>

                {/* labels */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: "600", color: "#111" }}>{w.name}</div>
                  <div style={{ fontSize: "12.5px", color: "#888", marginTop: "2px" }}>{w.description}</div>
                </div>

                {/* status badge */}
                <div style={{
                  fontSize: "11.5px", fontWeight: "600", padding: "3px 9px",
                  borderRadius: "20px",
                  background: isDetected ? "#f0fff4" : "#fff8f0",
                  color: isDetected ? "#22c55e" : (w.install ? "#f97316" : "#aaa"),
                  border: `1px solid ${isDetected ? "#bbf7d0" : (w.install ? "#fed7aa" : "#e5e7eb")}`,
                  whiteSpace: "nowrap",
                }}>
                  {isDetected ? "Detected" : (w.install ? "Install" : "Not found")}
                </div>
              </button>
            );
          })}
        </div>

        {/* Status area */}
        <div style={{ padding: "0 16px 20px", minHeight: "48px" }}>
          {status === "connecting" && (
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "#f0f8ff", borderRadius: "10px", padding: "12px 14px",
              border: "1px solid #bae6fd",
            }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "2.5px solid #4fc3f7", borderTopColor: "transparent", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
              <span style={{ fontSize: "13.5px", color: "#0284c7", fontWeight: "500" }}>
                Waiting for wallet approval…
              </span>
            </div>
          )}

          {status === "error" && (
            <div style={{
              background: "#fff5f5", borderRadius: "10px", padding: "12px 14px",
              border: "1px solid #fca5a5", color: "#dc2626", fontSize: "13.5px",
            }}>
              {errorMsg}
            </div>
          )}

          {status === "success" && (
            <div style={{
              background: "#f0fff4", borderRadius: "10px", padding: "12px 14px",
              border: "1px solid #86efac", color: "#16a34a", fontSize: "13.5px", fontWeight: "500",
            }}>
              ✓ Wallet connected successfully!
            </div>
          )}

          {status === "idle" && detectedIds.length === 0 && (
            <div style={{
              background: "#fffbeb", borderRadius: "10px", padding: "12px 14px",
              border: "1px solid #fde68a", fontSize: "13px", color: "#92400e",
            }}>
              No wallet extension detected. Click <strong>Install</strong> next to any wallet above to get started, then refresh this page.
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes walletIn {
          from { opacity: 0; transform: scale(0.93) translateY(14px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
