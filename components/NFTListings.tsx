const TokenBadge = ({ amount }: { amount: string }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      background: "#e8f8f0",
      border: "1px solid #3dbfb8",
      borderRadius: "12px",
      padding: "2px 8px",
    }}
  >
    <div
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #3dbfb8, #5de8d8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "9px",
        fontWeight: "900",
        color: "white",
      }}
    >
      T
    </div>
    <span style={{ fontSize: "12px", fontWeight: "600", color: "#3dbfb8" }}>{amount}</span>
  </div>
);

const nftItems = [
  {
    id: 1,
    name: "TheCryptoLuckyGirl_2000194",
    color: "#7b4fa6",
    accent: "#d4a0c8",
    imgType: "girl",
    large: true,
  },
  {
    id: 2,
    name: "TheCryptoLuckyGirl_0050398",
    color: "#8b5fb0",
    accent: "#e0b0d8",
    imgType: "girl2",
    large: false,
  },
];

const topCollections = [
  { rank: 1, name: "Penguin Pals", volume: "8480.71M", change: "+0%", color: "#4ecdc4" },
  { rank: 2, name: "YoungLady", volume: "5230.40M", change: "+2.1%", color: "#ff6b9d" },
  { rank: 3, name: "Pixels Punk", volume: "3120.55M", change: "-0.5%", color: "#ff9f43" },
  { rank: 4, name: "Crypto Lucky", volume: "2890.10M", change: "+1.3%", color: "#a29bfe" },
];

const NFTCard = ({
  name,
  color,
  large,
  imgSrc,
}: {
  name: string;
  color: string;
  large: boolean;
  imgSrc: string;
}) => (
  <div
    style={{
      borderRadius: "12px",
      overflow: "hidden",
      background: color,
      position: "relative",
      width: large ? "340px" : "160px",
      height: large ? "280px" : "130px",
      flexShrink: 0,
    }}
  >
    <img
      src={imgSrc}
      alt={name}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  </div>
);

export default function NFTListings() {
  return (
    <section style={{ background: "#fff", padding: "48px 0" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 380px",
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        {/* Left: Large Featured NFT */}
        <div>
          <div
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              background: "linear-gradient(135deg, #7b4fa6, #d4a0c8)",
              height: "320px",
              position: "relative",
            }}
          >
            <img
              src="https://picsum.photos/seed/nft-girl-main/400/320"
              alt="Featured NFT"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                padding: "16px",
              }}
            />
          </div>
        </div>

        {/* Center: NFT list items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { name: "TheCryptoLuckyGirl_2000194", price: "116K", color: "#7b4fa6" },
            { name: "TheCryptoLuckyGirl_0050398", price: "98K", color: "#8b5fb0" },
            { name: "YoungLady_0001234", price: "74K", color: "#4ecdc4" },
            { name: "PixelsPunk_0009871", price: "210K", color: "#e74c3c" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #f0f0f0",
                cursor: "pointer",
                transition: "box-shadow 0.2s",
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "10px",
                  background: item.color,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={`https://picsum.photos/seed/nft${i}/72/72`}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#111", marginBottom: "6px" }}>
                  {item.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${item.color}, #aaa)`,
                    }}
                  />
                  <TokenBadge amount={item.price} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Top Collections */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "6px",
            }}
          >
            <div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#111", lineHeight: "1.2" }}>
                TOP COLLECTIONS OVER
              </div>
              <div style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>Last 24 Hours</div>
            </div>
            <button
              style={{
                background: "white",
                border: "1.5px solid #e0e0e0",
                borderRadius: "20px",
                padding: "6px 18px",
                fontSize: "13px",
                cursor: "pointer",
                color: "#444",
              }}
            >
              More
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            {topCollections.map((col) => (
              <div
                key={col.rank}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: "1px solid #f5f5f5",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{ fontSize: "16px", fontWeight: "700", color: "#111", width: "20px", flexShrink: 0 }}
                >
                  {col.rank}
                </span>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: col.color,
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`https://picsum.photos/seed/col${col.rank}/40/40`}
                    alt={col.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>{col.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
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
                    <span style={{ fontSize: "12px", color: "#555" }}>{col.volume}</span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "600",
                    color: col.change.startsWith("+") ? "#22c55e" : col.change === "+0%" ? "#22c55e" : "#ef4444",
                  }}
                >
                  {col.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
