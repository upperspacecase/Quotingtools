import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors } from "../theme";

export const SceneQuotePreview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pageIn = spring({ frame: frame - 5, fps, config: { damping: 14 } });
  const stampIn = spring({ frame: frame - 45, fps, config: { damping: 10, stiffness: 120 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.gray[200],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* PDF "page" */}
      <div
        style={{
          width: 580,
          background: colors.white,
          borderRadius: 8,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          padding: "36px 40px",
          opacity: interpolate(pageIn, [0, 1], [0, 1]),
          transform: `scale(${interpolate(pageIn, [0, 1], [0.9, 1])})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Company header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 24 }}>⚡</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: colors.trade.dark }}>
                Mick's Electrical
              </span>
            </div>
            <div style={{ fontSize: 11, color: colors.gray[400], marginTop: 4 }}>
              Lic# 247891 &bull; ABN 12 345 678 901 &bull; Fully Insured
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: colors.trade.dark }}>QUOTE</div>
            <div style={{ fontSize: 11, color: colors.gray[400] }}>QMP-2026-0047</div>
            <div style={{ fontSize: 11, color: colors.gray[400] }}>1 April 2026</div>
          </div>
        </div>

        {/* Client */}
        <div
          style={{
            background: colors.gray[50],
            borderRadius: 6,
            padding: "10px 14px",
            marginBottom: 20,
            fontSize: 12,
          }}
        >
          <div style={{ fontWeight: 700, color: colors.gray[800] }}>James Patterson</div>
          <div style={{ color: colors.gray[500] }}>14 Banksia Ave, Thornleigh NSW 2120</div>
          <div style={{ color: colors.gray[500] }}>Kitchen renovation - electrical works</div>
        </div>

        {/* Mini table */}
        <div style={{ fontSize: 11 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 0.5fr 1fr",
              padding: "6px 0",
              borderBottom: `1.5px solid ${colors.gray[300]}`,
              fontWeight: 700,
              color: colors.gray[500],
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            <div>Item</div>
            <div style={{ textAlign: "center" }}>Qty</div>
            <div style={{ textAlign: "right" }}>Amount</div>
          </div>
          {[
            { item: "Switchboard upgrade - 3 phase", qty: 1, amt: "$1,850" },
            { item: "LED downlights supply & install", qty: 12, amt: "$1,140" },
            { item: "Power point relocation", qty: 4, amt: "$480" },
            { item: "Smoke alarm replacement (AS3786)", qty: 6, amt: "$510" },
            { item: "Cable run - TPS 2.5mm²", qty: 35, amt: "$630" },
            { item: "Safety switch (RCD) upgrade", qty: 1, amt: "$320" },
            { item: "Electrical compliance certificate", qty: 1, amt: "$180" },
          ].map((row, i) => {
            const rowIn = spring({
              frame: frame - 15 - i * 4,
              fps,
              config: { damping: 20, stiffness: 150 },
            });
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3fr 0.5fr 1fr",
                  padding: "5px 0",
                  borderBottom: `1px solid ${colors.gray[100]}`,
                  color: colors.gray[700],
                  opacity: interpolate(rowIn, [0, 1], [0, 1]),
                }}
              >
                <div>{row.item}</div>
                <div style={{ textAlign: "center" }}>{row.qty}</div>
                <div style={{ textAlign: "right", fontWeight: 600 }}>{row.amt}</div>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <div style={{ width: 180, fontSize: 11 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: colors.gray[500] }}>
              <span>Subtotal</span><span>$5,110</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", color: colors.gray[500] }}>
              <span>GST (10%)</span><span>$511</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "6px 0",
                borderTop: `2px solid ${colors.trade.dark}`,
                marginTop: 4,
                fontWeight: 800,
                fontSize: 15,
                color: colors.trade.dark,
              }}
            >
              <span>Total (inc. GST)</span><span>$5,621</span>
            </div>
          </div>
        </div>

        {/* Footer terms */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 12,
            borderTop: `1px solid ${colors.gray[200]}`,
            fontSize: 9,
            color: colors.gray[400],
            lineHeight: 1.6,
          }}
        >
          Quote valid for 30 days. 50% deposit required to commence work. All work
          compliant with AS/NZS 3000:2018 Wiring Rules. Warranty: 12 months on workmanship.
          Payment terms: Balance due on completion. Generated by QuoteMatePro.
        </div>

        {/* Professional stamp */}
        <div
          style={{
            position: "absolute",
            top: 180,
            right: 50,
            transform: `rotate(-15deg) scale(${interpolate(stampIn, [0, 1], [0, 1])})`,
            opacity: interpolate(stampIn, [0, 1], [0, 0.9]),
            border: `3px solid ${colors.brand[500]}`,
            borderRadius: 12,
            padding: "8px 20px",
            color: colors.brand[500],
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: 2,
          }}
        >
          READY TO SEND
        </div>
      </div>
    </div>
  );
};
