"use client";
import { useState } from "react";

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="16" y2="12" /><line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

const nfts = [
  { id: 1, name: "Stake_2000190", price: "497 USDT", color: "#7b4fa6", seed: "stake1" },
  { id: 2, name: "Stake_2000131", price: "500 USDT", color: "#4ecdc4", seed: "stake2" },
  { id: 3, name: "Stake_2000602", price: "492 USDT", color: "#ffd166", seed: "stake3" },
  { id: 4, name: "Stake_2000875", price: "587 USDT", color: "#333", seed: "stake4" },
  { id: 5, name: "Stake_2001023", price: "445 USDT", color: "#e63946", seed: "stake5" },
  { id: 6, name: "Stake_2001456", price: "612 USDT", color: "#4361ee", seed: "stake6" },
  { id: 7, name: "Stake_2001789", price: "533 USDT", color: "#9b5de5", seed: "stake7" },
  { id: 8, name: "Stake_2002011", price: "478 USDT", color: "#f77f00", seed: "stake8" },
];

const tabs = ["Stake", "PolygonNFT", "Art", "Collectibles"];

export default function DiscoverNFTs() {
  const [activeTab, setActiveTab] = useState("Stake");

  return (
    <section
      style={{
        background: "linear-gradient(110deg, #ddeeff 0%, #c8f0e8 35%, #e8f5e8 60%, #f5ede0 85%, #fde8d8 100%)",
        padding: "60px 0 80px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "900",
              color: "#111",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            DISCOVER MORE NFTS
          </h2>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "white",
              border: "1.5px solid #ddd",
              borderRadius: "20px",
              padding: "7px 16px",
              fontSize: "13px",
              cursor: "pointer",
              color: "#444",
              fontWeight: "500",
            }}
          >
            <FilterIcon />
            All Filters
          </button>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "7px 20px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: activeTab === tab ? "700" : "500",
                color: activeTab === tab ? "white" : "#444",
                background:
                  activeTab === tab
                    ? "linear-gradient(135deg, #5de8d8, #3dbfb8)"
                    : "transparent",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* NFT Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {nfts.map((nft) => (
            <div
              key={nft.id}
              style={{
                background: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: "220px",
                  background: nft.color,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={`https://picsum.photos/seed/${nft.seed}/280/220`}
                  alt={nft.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Stake badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: "20px",
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#3dbfb8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "8px",
                      fontWeight: "900",
                      color: "white",
                    }}
                  >
                    S
                  </div>
                  <span style={{ fontSize: "11px", color: "white", fontWeight: "600" }}>Stake</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                  {nft.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3dbfb8, #5de8d8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "8px",
                      fontWeight: "900",
                      color: "white",
                    }}
                  >
                    T
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#22c55e" }}>{nft.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
