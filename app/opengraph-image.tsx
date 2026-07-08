import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${siteConfig.colors.splash} 0%, #ffffff 100%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: 32,
            background: siteConfig.colors.accent,
            fontSize: 72,
            marginBottom: 32,
          }}
        >
          🙏
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#18122b",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#5b4b7a",
          }}
        >
          Pray · Together · Grow
        </div>
      </div>
    ),
    { ...size },
  );
}
