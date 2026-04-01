import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AppShell } from "../AppShell";
import { Cursor } from "../Cursor";
import { colors } from "../theme";

const trades = [
  { icon: "🔌", label: "Electrician" },
  { icon: "🚿", label: "Plumber" },
  { icon: "🏗️", label: "Builder" },
  { icon: "❄️", label: "HVAC / Aircon" },
  { icon: "🔧", label: "Engineer" },
  { icon: "🎨", label: "Painter" },
  { icon: "🪚", label: "Carpenter" },
  { icon: "📡", label: "Data / Comms" },
  { icon: "🌱", label: "Landscaper" },
  { icon: "🏠", label: "Roofer" },
  { icon: "🔐", label: "Locksmith" },
  { icon: "☀️", label: "Solar Installer" },
];

export const SceneTradeSelect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 20 } });

  // Electrician is index 0 - cursor moves there and clicks
  const clickFrame = 55;
  const selected = frame >= clickFrame;

  // Highlight pulse
  const highlightOpacity = selected
    ? interpolate(
        frame - clickFrame,
        [0, 8, 30],
        [0, 0.3, 0],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
      )
    : 0;

  return (
    <AppShell>
      <div style={{ padding: 32 }}>
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerIn, [0, 1], [20, 0])}px)`,
            marginBottom: 8,
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: colors.trade.dark,
              margin: 0,
            }}
          >
            Select Your Trade
          </h2>
          <p style={{ color: colors.gray[500], fontSize: 15, margin: "6px 0 0 0" }}>
            Choose your trade type to load specialised templates and pricing
          </p>
        </div>

        {/* Trade grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginTop: 24,
          }}
        >
          {trades.map((trade, i) => {
            const cardIn = spring({
              frame: frame - 8 - i * 3,
              fps,
              config: { damping: 18, stiffness: 120 },
            });

            const isTarget = i === 0;
            const isSelected = isTarget && selected;

            return (
              <div
                key={trade.label}
                style={{
                  background: isSelected ? colors.brand[50] : colors.white,
                  border: `2px solid ${isSelected ? colors.brand[500] : colors.gray[200]}`,
                  borderRadius: 14,
                  padding: "20px 16px",
                  textAlign: "center",
                  opacity: interpolate(cardIn, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(cardIn, [0, 1], [30, 0])}px) scale(${isSelected ? 1.03 : 1})`,
                  transition: "border-color 0.2s, background 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Highlight flash */}
                {isTarget && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: colors.brand[400],
                      opacity: highlightOpacity,
                      borderRadius: 12,
                    }}
                  />
                )}
                {/* Checkmark */}
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: colors.brand[500],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.white,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                )}
                <div style={{ fontSize: 36, marginBottom: 8 }}>{trade.icon}</div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isSelected ? colors.brand[600] : colors.gray[700],
                  }}
                >
                  {trade.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cursor */}
      <Cursor
        startX={600}
        startY={400}
        endX={155}
        endY={195}
        moveStart={20}
        clickAt={clickFrame}
      />
    </AppShell>
  );
};
