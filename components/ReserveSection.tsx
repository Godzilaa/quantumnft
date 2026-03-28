"use client";
import React, { useState, useEffect } from "react";

export default function ReserveSection() {
  const [content, setContent] = useState({
    reserveTitle: "RESERVE AND SELL YOUR NFT EASILY",
    reserveSubtitle: "Earning income in Treasure Fun is simple: just RESERVE and then TRADE to EARN"
  });

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => {
        if (data && data.reserveTitle) setContent(data);
      })
      .catch(err => console.error("Could not load dynamic content:", err));
  }, []);

  return (
    <section style={{ background: "white", padding: "80px 0" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        {/* Left: Overlapping NFT images */}
        <div style={{ position: "relative", height: "420px" }}>
          {/* Back-left image */}
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "60px",
              width: "220px",
              height: "260px",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#ffd166",
              transform: "rotate(-6deg)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              zIndex: 1,
            }}
          >
            <img
              src="https://picsum.photos/seed/ape-back/220/260"
              alt="NFT ape"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Main center image */}
          <div
            style={{
              position: "absolute",
              left: "90px",
              top: "10px",
              width: "260px",
              height: "360px",
              borderRadius: "16px",
              overflow: "hidden",
              background: "linear-gradient(135deg, #ffd166, #f4a261)",
              boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
              zIndex: 2,
            }}
          >
            <img
              src="https://picsum.photos/seed/ape-main/260/360"
              alt="NFT ape main"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Front-right image */}
          <div
            style={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
              width: "200px",
              height: "220px",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#e63946",
              transform: "rotate(5deg)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              zIndex: 3,
            }}
          >
            <img
              src="https://picsum.photos/seed/ape-front/200/220"
              alt="NFT ape front"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right: Text + Buttons */}
        <div>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "900",
              color: "#111",
              textTransform: "uppercase",
              lineHeight: "1.2",
              marginBottom: "20px",
              letterSpacing: "-0.3px",
            }}
          >
            {content.reserveTitle}
          </h2>
          <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.7", marginBottom: "32px" }}>
            {content.reserveSubtitle}
          </p>

          <div style={{ display: "flex", gap: "16px" }}>
            <button
              style={{
                padding: "14px 32px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
                background: "linear-gradient(135deg, #5de8d8 0%, #3dbfb8 50%, #2ea8a0 100%)",
                letterSpacing: "0.5px",
                boxShadow: "0 4px 16px rgba(61,191,184,0.35)",
              }}
            >
              GET TUFT
            </button>
            <button
              style={{
                padding: "14px 32px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "700",
                color: "white",
                background: "linear-gradient(135deg, #44cccc 0%, #3dbfb8 50%, #5de8d8 100%)",
                letterSpacing: "0.5px",
                boxShadow: "0 4px 16px rgba(61,191,184,0.25)",
              }}
            >
              AUCTION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
