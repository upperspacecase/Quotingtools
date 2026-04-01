import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AppShell } from "../AppShell";
import { colors } from "../theme";
import { useCounter } from "../helpers";

interface LineItem {
  description: string;
  qty: number;
  unit: string;
  rate: number;
  total: number;
}

const lineItems: LineItem[] = [
  { description: "Switchboard upgrade - 3 phase", qty: 1, unit: "ea", rate: 1850, total: 1850 },
  { description: "LED downlights supply & install", qty: 12, unit: "ea", rate: 95, total: 1140 },
  { description: "Power point relocation", qty: 4, unit: "ea", rate: 120, total: 480 },
  { description: "Smoke alarm replacement (AS3786)", qty: 6, unit: "ea", rate: 85, total: 510 },
  { description: "Cable run - TPS 2.5mm²", qty: 35, unit: "m", rate: 18, total: 630 },
  { description: "Electrical compliance certificate", qty: 1, unit: "ea", rate: 180, total: 180 },
];

const subtotal = lineItems.reduce((s, i) => s + i.total, 0);
const gst = Math.round(subtotal * 0.1);
const total = subtotal + gst;

export const SceneQuoteBuilder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 20 } });

  // Client info appears first
  const clientIn = spring({ frame: frame - 5, fps, config: { damping: 20 } });

  // Each row appears staggered
  const rowDelay = 12;
  const rowStart = 15;

  // Totals section
  const totalsStart = rowStart + lineItems.length * rowDelay + 5;
  const totalsIn = spring({
    frame: frame - totalsStart,
    fps,
    config: { damping: 18 },
  });

  const animatedTotal = useCounter(total, totalsStart, 20);

  return (
    <AppShell>
      <div style={{ padding: "24px 32px", overflow: "hidden" }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            marginBottom: 16,
          }}
        >
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: colors.trade.dark, margin: 0 }}>
              New Quote
            </h2>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: colors.brand[50],
                border: `1px solid ${colors.brand[200]}`,
                borderRadius: 6,
                padding: "3px 10px",
                marginTop: 6,
                fontSize: 12,
                color: colors.brand[600],
                fontWeight: 600,
              }}
            >
              🔌 Electrician Template
            </div>
          </div>
          <div style={{ fontSize: 13, color: colors.gray[400] }}>QMP-2026-0047</div>
        </div>

        {/* Client info */}
        <div
          style={{
            background: colors.white,
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 16,
            border: `1px solid ${colors.gray[200]}`,
            display: "flex",
            gap: 32,
            opacity: interpolate(clientIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(clientIn, [0, 1], [15, 0])}px)`,
            fontSize: 13,
          }}
        >
          <div>
            <span style={{ color: colors.gray[400] }}>Client: </span>
            <span style={{ fontWeight: 600, color: colors.gray[800] }}>James Patterson</span>
          </div>
          <div>
            <span style={{ color: colors.gray[400] }}>Address: </span>
            <span style={{ fontWeight: 600, color: colors.gray[800] }}>14 Banksia Ave, Thornleigh NSW 2120</span>
          </div>
          <div>
            <span style={{ color: colors.gray[400] }}>Job: </span>
            <span style={{ fontWeight: 600, color: colors.gray[800] }}>Kitchen renovation - electrical</span>
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            background: colors.white,
            borderRadius: 12,
            border: `1px solid ${colors.gray[200]}`,
            overflow: "hidden",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 0.5fr 0.5fr 0.7fr 0.7fr",
              padding: "10px 18px",
              background: colors.gray[50],
              borderBottom: `1px solid ${colors.gray[200]}`,
              fontSize: 12,
              fontWeight: 600,
              color: colors.gray[500],
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            <div>Description</div>
            <div style={{ textAlign: "center" }}>Qty</div>
            <div style={{ textAlign: "center" }}>Unit</div>
            <div style={{ textAlign: "right" }}>Rate</div>
            <div style={{ textAlign: "right" }}>Total</div>
          </div>

          {/* Rows */}
          {lineItems.map((item, i) => {
            const rowIn = spring({
              frame: frame - rowStart - i * rowDelay,
              fps,
              config: { damping: 20, stiffness: 120 },
            });

            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 0.5fr 0.5fr 0.7fr 0.7fr",
                  padding: "12px 18px",
                  borderBottom: `1px solid ${colors.gray[100]}`,
                  fontSize: 13,
                  color: colors.gray[700],
                  opacity: interpolate(rowIn, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(rowIn, [0, 1], [40, 0])}px)`,
                }}
              >
                <div style={{ fontWeight: 500 }}>{item.description}</div>
                <div style={{ textAlign: "center" }}>{item.qty}</div>
                <div style={{ textAlign: "center", color: colors.gray[400] }}>{item.unit}</div>
                <div style={{ textAlign: "right" }}>${item.rate.toLocaleString()}</div>
                <div style={{ textAlign: "right", fontWeight: 600, color: colors.trade.dark }}>
                  ${item.total.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 16,
            opacity: interpolate(totalsIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(totalsIn, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              background: colors.white,
              borderRadius: 10,
              padding: "14px 24px",
              border: `1px solid ${colors.gray[200]}`,
              minWidth: 240,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: colors.gray[500],
                marginBottom: 6,
              }}
            >
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 13,
                color: colors.gray[500],
                marginBottom: 10,
              }}
            >
              <span>GST (10%)</span>
              <span>${gst.toLocaleString()}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 20,
                fontWeight: 800,
                color: colors.trade.dark,
                borderTop: `2px solid ${colors.gray[200]}`,
                paddingTop: 10,
              }}
            >
              <span>Total</span>
              <span>${animatedTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
