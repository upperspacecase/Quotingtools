import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const titleSlide = spring({ frame: frame - 10, fps, config: { damping: 20 } });
  const subtitleSlide = spring({ frame: frame - 20, fps, config: { damping: 20 } });
  const taglineSlide = spring({ frame: frame - 35, fps, config: { damping: 20 } });

  const bgShift = interpolate(frame, [0, 90], [0, 20]);

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
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: 80,
          transform: `scale(${logoScale})`,
          marginBottom: 20,
        }}
      >
        &#9889;
      </div>

      {/* Title */}
      <h1
        style={{
          color: colors.white,
          fontSize: 64,
          fontWeight: 900,
          margin: 0,
          opacity: interpolate(titleSlide, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleSlide, [0, 1], [40, 0])}px)`,
        }}
      >
        QuoteMatePro
      </h1>

      {/* Subtitle */}
      <p
        style={{
          color: colors.brand[400],
          fontSize: 28,
          fontWeight: 600,
          margin: "12px 0 0 0",
          opacity: interpolate(subtitleSlide, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(subtitleSlide, [0, 1], [30, 0])}px)`,
        }}
      >
        The Quoting Assistant for Tradies
      </p>

      {/* Tagline */}
      <p
        style={{
          color: colors.gray[400],
          fontSize: 20,
          margin: "24px 0 0 0",
          opacity: interpolate(taglineSlide, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(taglineSlide, [0, 1], [20, 0])}px)`,
        }}
      >
        Stop guessing. Start quoting with confidence.
      </p>
    </div>
  );
};
