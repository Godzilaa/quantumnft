"use client";

export default function VideoSection() {
  return (
    <section style={{ background: "white", padding: "60px 0" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px" }}>
        {/* Scroll hint */}
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "#f5f5f5",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>

        {/* Video container */}
        <div
          style={{
            width: "100%",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#0a0a0a",
            position: "relative",
            aspectRatio: "16/7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Placeholder video with holographic cube visual */}
          <video
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            controls
            poster=""
          >
            <source src="" type="video/mp4" />
          </video>

          {/* Fallback overlay when no video */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 70%)",
              pointerEvents: "none",
            }}
          >
            {/* Holographic cube */}
            <div
              style={{
                width: "140px",
                height: "140px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Outer glow */}
              <div
                style={{
                  position: "absolute",
                  width: "180px",
                  height: "180px",
                  background:
                    "radial-gradient(circle, rgba(61,191,184,0.2) 0%, rgba(93,232,216,0.1) 50%, transparent 70%)",
                  borderRadius: "50%",
                }}
              />
              {/* Cube shape */}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  background:
                    "linear-gradient(135deg, #a8edea 0%, #5de8d8 25%, #4ecdc4 50%, #a29bfe 75%, #fd79a8 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    "0 0 60px rgba(61,191,184,0.6), 0 0 120px rgba(93,232,216,0.3), inset 0 0 30px rgba(255,255,255,0.2)",
                  transform: "perspective(300px) rotateX(15deg) rotateY(15deg)",
                }}
              >
                <span style={{ fontSize: "48px", fontWeight: "900", color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                  T
                </span>
              </div>
              {/* Sparkle dots */}
              {[
                { top: "10px", left: "50px", size: "8px" },
                { top: "30px", right: "10px", size: "6px" },
                { bottom: "20px", left: "15px", size: "5px" },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: pos.size,
                    height: pos.size,
                    background: "white",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px rgba(255,255,255,0.8)",
                    ...pos,
                  }}
                />
              ))}
            </div>

            {/* Pink dot decoration */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "10%",
                width: "80px",
                height: "80px",
                background: "radial-gradient(circle, rgba(255,100,150,0.3), transparent)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "12%",
                width: "8px",
                height: "8px",
                background: "#ff6b9d",
                borderRadius: "2px",
                opacity: 0.5,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
