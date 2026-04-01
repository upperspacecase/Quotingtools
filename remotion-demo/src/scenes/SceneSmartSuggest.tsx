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

const suggestions = [
  {
    icon: "💡",
    title: "Safety switch (RCD) upgrade",
    desc: "Required under AS/NZS 3000 for kitchen circuits",
    price: "$320",
    tag: "Compliance",
    tagColor: colors.red,
  },
  {
    icon: "🔌",
    title: "Dedicated oven circuit - 32A",
    desc: "Recommended for kitchen renovation with new appliances",
    price: "$450",
    tag: "Recommended",
    tagColor: colors.blue,
  },
  {
    icon: "📋",
    title: "As-built documentation",
    desc: "Updated switchboard diagram for client records",
    price: "$120",
    tag: "Best practice",
    tagColor: colors.green,
  },
];

export const SceneSmartSuggest: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 20 } });
  const panelIn = spring({ frame: frame - 8, fps, config: { damping: 18 } });

  // First suggestion gets "added" when cursor clicks
  const addFrame = 60;
  const isAdded = frame >= addFrame;

  // Added confirmation
  const addedIn = spring({
    frame: frame - addFrame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  return (
    <AppShell>
      <div style={{ padding: "24px 32px" }}>
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            marginBottom: 20,
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 800, color: colors.trade.dark, margin: 0 }}>
            Smart Suggestions
          </h2>
          <p style={{ color: colors.gray[500], fontSize: 14, margin: "6px 0 0 0" }}>
            AI-powered recommendations based on your job scope
          </p>
        </div>

        {/* AI thinking indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
            opacity: interpolate(panelIn, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: colors.green,
              boxShadow: `0 0 8px ${colors.green}`,
            }}
          />
          <span style={{ fontSize: 13, color: colors.gray[500] }}>
            Analysed job scope &bull; Found 3 items you may have missed
          </span>
        </div>

        {/* Suggestion cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {suggestions.map((s, i) => {
            const cardIn = spring({
              frame: frame - 12 - i * 10,
              fps,
              config: { damping: 18, stiffness: 100 },
            });

            const isFirst = i === 0;
            const showAdded = isFirst && isAdded;

            return (
              <div
                key={i}
                style={{
                  background: showAdded ? "#f0fdf4" : colors.white,
                  border: `1.5px solid ${showAdded ? colors.green : colors.gray[200]}`,
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: interpolate(cardIn, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(cardIn, [0, 1], [20, 0])}px)`,
                }}
              >
                <div style={{ fontSize: 32 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: colors.gray[800] }}>
                      {s.title}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: `${s.tagColor}18`,
                        color: s.tagColor,
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: colors.gray[500], margin: "4px 0 0 0" }}>
                    {s.desc}
                  </p>
                </div>
                <div style={{ textAlign: "right", minWidth: 100 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: colors.trade.dark }}>
                    {s.price}
                  </div>
                  {showAdded ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        marginTop: 6,
                        padding: "5px 14px",
                        borderRadius: 8,
                        background: colors.green,
                        color: colors.white,
                        fontSize: 12,
                        fontWeight: 700,
                        transform: `scale(${interpolate(addedIn, [0, 1], [0.5, 1])})`,
                        opacity: interpolate(addedIn, [0, 1], [0, 1]),
                      }}
                    >
                      ✓ Added
                    </div>
                  ) : (
                    <div
                      style={{
                        marginTop: 6,
                        padding: "5px 14px",
                        borderRadius: 8,
                        background: colors.brand[500],
                        color: colors.white,
                        fontSize: 12,
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      + Add
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cursor clicks first "Add" button */}
      <Cursor
        startX={700}
        startY={350}
        endX={870}
        endY={192}
        moveStart={30}
        clickAt={addFrame}
      />
    </AppShell>
  );
};
