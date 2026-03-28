"use client";
import React, { useState, useEffect } from "react";

const MultiRewardIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="none" stroke="#444" strokeWidth="1.5" />
    <path d="M8 20h4v4H8zM14 16h4v8h-4zM20 12h4v12h-4z" fill="#444" opacity="0.7" />
    <path d="M6 10l4-4 4 4 4-4 4 4" stroke="#444" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EarnIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="none" stroke="#444" strokeWidth="1.5" />
    <rect x="7" y="10" width="18" height="14" rx="2" stroke="#444" strokeWidth="1.5" />
    <path d="M16 13v6M13 16h6" stroke="#444" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function Hero() {
  const [content, setContent] = useState({
    heroTitle: "DISCOVER, COLLECT, AND SELL EXTRAORDINARY NFTs",
    heroSubtitle: "Welcome to Quantum NFT - the world's first and largest digital marketplace for crypto collectibles. Start exploring and earning today."
  });

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => {
        if (data && data.heroTitle) setContent(data);
      })
      .catch(err => console.error("Could not load dynamic content:", err));
  }, []);

  return (
    <section
      style={{
        background:
          "linear-gradient(110deg, #ddeeff 0%, #c8f0e8 35%, #e8f5e8 55%, #f5ede0 80%, #fde8d8 100%)",
        padding: "80px 0 80px",
        minHeight: "320px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "48px",
          alignItems: "center",
        }}
      >
        {/* Left: Main Headline */}
        <div>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "900",
              color: "#111",
              lineHeight: "1.15",
              textTransform: "uppercase",
              letterSpacing: "-0.5px",
            }}
          >
            {content.heroTitle}
          </h1>
        </div>

        {/* Center: Multi-Reward */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <MultiRewardIcon />
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>
                Multi-Reward
              </h3>
              <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
                Quantum NFT leverages a proprietary AI-powered algorithmic trading model, and provides a dual earnings
                mechanism with trading rewards as well as referral rewards.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Earn Future Value */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <EarnIcon />
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>
                Earn Future Value
              </h3>
              <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
                Quantum NFT reduces the entry hurdles of the NFT market and expands the boundaries of the NFT
                collection &amp; trading through its innovative AI algorithmic trading process and rewarding financial
                model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
