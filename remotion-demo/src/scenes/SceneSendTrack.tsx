import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AppShell } from "../AppShell";
import { colors } from "../theme";

export const SceneSendTrack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sending animation phases
  const sendStart = 5;
  const sendingIn = spring({ frame: frame - sendStart, fps, config: { damping: 18 } });

  // Progress bar
  const progressWidth = interpolate(frame - sendStart, [0, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sent confirmation
  const sentFrame = 40;
  const sentIn = spring({ frame: frame - sentFrame, fps, config: { damping: 12, stiffness: 120 } });
  const isSent = frame >= sentFrame;

  // Tracking events
  const events = [
    { time: "Just now", text: "Quote sent to james.patterson@email.com", icon: "📤", frame: sentFrame + 10 },
    { time: "2 min ago", text: "Client opened the quote", icon: "👀", frame: sentFrame + 30 },
    { time: "2 min ago", text: "Client viewing page 1 of 1", icon: "📄", frame: sentFrame + 40 },
  ];

  // Phone notification
  const notifFrame = sentFrame + 55;
  const notifIn = spring({ frame: frame - notifFrame, fps, config: { damping: 14 } });

  return (
    <AppShell>
      <div style={{ padding: "24px 32px", display: "flex", gap: 28 }}>
        {/* Left: Send panel */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: colors.trade.dark,
              margin: "0 0 20px 0",
            }}
          >
            Send Quote
          </h2>

          {/* Send card */}
          <div
            style={{
              background: colors.white,
              border: `1px solid ${colors.gray[200]}`,
              borderRadius: 12,
              padding: 20,
              opacity: interpolate(sendingIn, [0, 1], [0, 1]),
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: colors.brand[100],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                📧
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: colors.gray[800] }}>
                  james.patterson@email.com
                </div>
                <div style={{ fontSize: 12, color: colors.gray[400] }}>
                  Quote #QMP-2026-0047 &bull; $5,621.00
                </div>
              </div>
            </div>

            {/* Progress / Sent */}
            {!isSent ? (
              <div>
                <div
                  style={{
                    height: 6,
                    background: colors.gray[100],
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${progressWidth}%`,
                      height: "100%",
                      background: colors.brand[500],
                      borderRadius: 3,
                    }}
                  />
                </div>
                <div style={{ fontSize: 12, color: colors.gray[400], marginTop: 6 }}>
                  Sending...
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  background: "#f0fdf4",
                  border: `1px solid ${colors.green}`,
                  borderRadius: 8,
                  transform: `scale(${interpolate(sentIn, [0, 1], [0.8, 1])})`,
                  opacity: interpolate(sentIn, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: colors.green,
                    color: colors.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  ✓
                </div>
                <span style={{ fontWeight: 600, fontSize: 14, color: colors.green }}>
                  Quote sent successfully!
                </span>
              </div>
            )}
          </div>

          {/* Activity feed */}
          {isSent && (
            <div style={{ marginTop: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: colors.gray[600], marginBottom: 12 }}>
                Live Activity
              </h3>
              {events.map((ev, i) => {
                const evIn = spring({
                  frame: frame - ev.frame,
                  fps,
                  config: { damping: 18 },
                });
                if (frame < ev.frame) return null;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 12px",
                      marginBottom: 6,
                      background: colors.white,
                      borderRadius: 8,
                      border: `1px solid ${colors.gray[100]}`,
                      opacity: interpolate(evIn, [0, 1], [0, 1]),
                      transform: `translateX(${interpolate(evIn, [0, 1], [20, 0])}px)`,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{ev.icon}</span>
                    <span style={{ fontSize: 13, color: colors.gray[700], flex: 1 }}>{ev.text}</span>
                    <span style={{ fontSize: 11, color: colors.gray[400] }}>{ev.time}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Phone mockup with notification */}
        <div
          style={{
            width: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 220,
              height: 420,
              background: colors.gray[900],
              borderRadius: 28,
              padding: "40px 12px 20px 12px",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 60,
                height: 6,
                borderRadius: 3,
                background: colors.gray[700],
              }}
            />

            {/* Screen */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: colors.gray[800],
                borderRadius: 16,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 30,
              }}
            >
              {/* Time */}
              <div style={{ color: colors.white, fontSize: 36, fontWeight: 300, marginBottom: 4 }}>
                2:34
              </div>
              <div style={{ color: colors.gray[500], fontSize: 11, marginBottom: 30 }}>
                Tuesday, 1 April
              </div>

              {/* Push notification */}
              {frame >= notifFrame && (
                <div
                  style={{
                    width: "90%",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 14,
                    padding: "10px 12px",
                    opacity: interpolate(notifIn, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(notifIn, [0, 1], [-30, 0])}px)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 12 }}>⚡</span>
                    <span style={{ fontSize: 10, color: colors.gray[400], fontWeight: 600 }}>
                      QUOTEMATEPRO
                    </span>
                    <span style={{ fontSize: 10, color: colors.gray[500], marginLeft: "auto" }}>now</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: colors.white, marginBottom: 2 }}>
                    James opened your quote!
                  </div>
                  <div style={{ fontSize: 11, color: colors.gray[400] }}>
                    Quote #QMP-2026-0047 ($5,621) was just viewed. Tap to follow up.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
