import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../theme";

const tradeIcons = ["🔌", "🚿", "🏗️", "❄️", "🔧", "🎨", "🪚", "📡", "🌱", "🏠", "🔐", "☀️"];

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgShift = interpolate(frame, [0, 90], [0, 15]);
  const logoIn = spring({ frame, fps, config: { damping: 12 } });
  const titleIn = spring({ frame: frame - 8, fps, config: { damping: 18 } });
  const ctaIn = spring({ frame: frame - 20, fps, config: { damping: 16 } });
  const iconsIn = spring({ frame: frame - 30, fps, config: { damping: 20 } });

  // CTA pulse
  const pulse = interpolate(
    Math.sin((frame - 30) * 0.1),
    [-1, 1],
    [1, 1.04]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(${135 + bgShift}deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        gap: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: 60,
          transform: `scale(${logoIn})`,
          marginBottom: 12,
        }}
      >
        ⚡
      </div>

      {/* Title */}
      <h1
        style={{
          color: colors.white,
          fontSize: 52,
          fontWeight: 900,
          margin: 0,
          opacity: interpolate(titleIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleIn, [0, 1], [20, 0])}px)`,
        }}
      >
        QuoteMatePro
      </h1>

      {/* Tagline */}
      <p
        style={{
          color: colors.gray[400],
          fontSize: 20,
          margin: "10px 0 30px 0",
          opacity: interpolate(titleIn, [0, 1], [0, 1]),
        }}
      >
        Quote smarter. Win more jobs.
      </p>

      {/* CTA */}
      <div
        style={{
          background: colors.brand[500],
          color: colors.white,
          fontWeight: 800,
          fontSize: 22,
          padding: "16px 48px",
          borderRadius: 16,
          opacity: interpolate(ctaIn, [0, 1], [0, 1]),
          transform: `scale(${frame >= 30 ? pulse : interpolate(ctaIn, [0, 1], [0.8, 1])})`,
        }}
      >
        Join the Waitlist &rarr;
      </div>

      {/* Trade icons strip */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 40,
          opacity: interpolate(iconsIn, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(iconsIn, [0, 1], [20, 0])}px)`,
        }}
      >
        {tradeIcons.map((icon, i) => (
          <div
            key={i}
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      <p
        style={{
          color: colors.gray[600],
          fontSize: 13,
          marginTop: 20,
          opacity: interpolate(iconsIn, [0, 1], [0, 1]),
        }}
      >
        Built for every trade. Trusted by tradies across Australia.
      </p>
    </div>
  );
};
