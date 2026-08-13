import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "FreeMapScrapper — Find Local Businesses & Export Real Leads";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          fontFamily: "sans-serif",
          padding: "80px",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "30px",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "#1A73E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              F
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.5px",
              }}
            >
              FreeMapScrapper
            </span>
          </div>
          {/* Badge */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#f1f5f9",
              border: "1px solid #cbd5e1",
              borderRadius: "20px",
              padding: "6px 14px",
              fontSize: "12px",
              fontWeight: 700,
              color: "#334155",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            FREE • NO SIGNUP • REAL DATA
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 900,
              color: "#0f172a",
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            Find Local Businesses.
          </h1>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 900,
              color: "#188038", // Google green highlight
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: "-1.5px",
            }}
          >
            Get Real Leads.
          </h1>
        </div>

        {/* Small Mock Table */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            marginTop: "30px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#475569",
              padding: "12px 20px",
            }}
          >
            <div style={{ flex: 2 }}>Business Name</div>
            <div style={{ flex: 1.5 }}>Phone</div>
            <div style={{ flex: 2 }}>Email</div>
            <div style={{ flex: 1 }}>Rating</div>
            <div style={{ flex: 1.5 }}>Socials</div>
          </div>
          {/* Table Row 1 */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #f1f5f9",
              fontSize: "13px",
              color: "#334155",
              padding: "12px 20px",
            }}
          >
            <div style={{ flex: 2, fontWeight: 600 }}>Metro Dental Clinic</div>
            <div style={{ flex: 1.5, color: "#1A73E8" }}>+91 98765 43210</div>
            <div style={{ flex: 2, color: "#1A73E8" }}>hello@metrodental.com</div>
            <div style={{ flex: 1 }}>4.8 ★ (120)</div>
            <div style={{ flex: 1.5, color: "#475569" }}>Instagram, FB</div>
          </div>
          {/* Table Row 2 */}
          <div
            style={{
              display: "flex",
              fontSize: "13px",
              color: "#334155",
              padding: "12px 20px",
            }}
          >
            <div style={{ flex: 2, fontWeight: 600 }}>Iron Gym Indiranagar</div>
            <div style={{ flex: 1.5, color: "#1A73E8" }}>+91 91234 56789</div>
            <div style={{ flex: 2, color: "#1A73E8" }}>contact@irongym.in</div>
            <div style={{ flex: 1 }}>4.9 ★ (340)</div>
            <div style={{ flex: 1.5, color: "#475569" }}>Instagram, WhatsApp</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
