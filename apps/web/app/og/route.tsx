import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const geistSemiBold = await fetch(
    new URL("../fonts/GeistVF.woff", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <span
        style={{
          fontSize: 72,
          fontFamily: "Geist",
          fontWeight: 600,
          color: "white",
          letterSpacing: "-0.02em",
        }}
      >
        json-render
      </span>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Geist",
          data: geistSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
