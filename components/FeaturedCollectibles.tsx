const AvatarCircle = ({ color, letter }: { color: string; letter: string }) => (
  <div
    style={{
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
      fontWeight: "700",
      color: "white",
      flexShrink: 0,
    }}
  >
    {letter}
  </div>
);

const TotalBadge = () => (
  <div
    style={{
      background: "linear-gradient(135deg, #5de8d8, #3dbfb8)",
      borderRadius: "12px",
      padding: "3px 10px",
      fontSize: "11px",
      fontWeight: "600",
      color: "white",
    }}
  >
    Total 4 Items
  </div>
);

export default function FeaturedCollectibles() {
  return (
    <section
      style={{
        background: "linear-gradient(110deg, #ddeeff 0%, #c8f0e8 35%, #e8f5e8 60%, #f5ede0 85%, #fde8d8 100%)",
        padding: "60px 0 80px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px" }}>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: "900",
            color: "#111",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "32px",
          }}
        >
          FEATURED NFT COLLECTIBLES
        </h2>

        {/* Masonry-style grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", alignItems: "start" }}>
          {/* Collection 1: The Crypto Lucky Girl - single tall card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "linear-gradient(135deg, #f5e6f0, #e8d0f0)",
                height: "360px",
              }}
            >
              <img
                src="https://picsum.photos/seed/lucky-girl-main/300/360"
                alt="The Crypto Lucky Girl"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ paddingTop: "8px" }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#111", marginBottom: "6px" }}>
                The Crypto Lucky Girl
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <AvatarCircle color="#9b59b6" letter="C" />
                <span style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}>by CHRISTABEL</span>
              </div>
            </div>
          </div>

          {/* Collection 2: YoungLady - mosaic of 4 images */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              <div
                style={{
                  gridColumn: "1 / -1",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #c8f0e8, #a0e8d8)",
                  height: "200px",
                }}
              >
                <img
                  src="https://picsum.photos/seed/younglady-main/280/200"
                  alt="YoungLady main"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: `hsl(${160 + i * 20}, 60%, 80%)`,
                    height: "100px",
                  }}
                >
                  <img
                    src={`https://picsum.photos/seed/younglady-${i}/130/100`}
                    alt={`YoungLady ${i}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <div style={{ paddingTop: "8px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#111" }}>YoungLady</div>
                <TotalBadge />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <AvatarCircle color="#2ecc71" letter="E" />
                <span style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}>by EVANGELINA</span>
              </div>
            </div>
          </div>

          {/* Collection 3: YoungLady extras - tall center */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: `hsl(${200 + i * 25}, 50%, 75%)`,
                    height: "155px",
                  }}
                >
                  <img
                    src={`https://picsum.photos/seed/extra${i}/140/155`}
                    alt={`NFT ${i}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Collection 4: Pixels Punk */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                background: "#c0392b",
                height: "240px",
              }}
            >
              <img
                src="https://picsum.photos/seed/pixels-punk-main/300/240"
                alt="Pixels Punk"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {[1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: `hsl(${10 + i * 40}, 70%, 55%)`,
                    height: "90px",
                  }}
                >
                  <img
                    src={`https://picsum.photos/seed/punk${i}/130/90`}
                    alt={`Punk ${i}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
            <div style={{ paddingTop: "4px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#111" }}>Pixels Punk</div>
                <TotalBadge />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <AvatarCircle color="#e67e22" letter="G" />
                <span style={{ fontSize: "12px", color: "#666", fontWeight: "500" }}>by GWENDOLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
