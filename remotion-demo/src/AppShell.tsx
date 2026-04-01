import React from "react";
import { colors } from "./theme";

export const AppShell: React.FC<{
  children: React.ReactNode;
  title?: string;
}> = ({ children, title = "QuoteMatePro" }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: colors.gray[100],
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Top bar - app chrome */}
      <div
        style={{
          height: 48,
          background: colors.trade.dark,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 20 }}>&#9889;</span>
        <span
          style={{
            color: colors.white,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {title}
        </span>
        <div style={{ flex: 1 }} />
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: colors.brand[500],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.white,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          MK
        </div>
      </div>

      {/* Sidebar + Content */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 220,
            background: colors.trade.mid,
            padding: "16px 0",
            flexShrink: 0,
          }}
        >
          {[
            { icon: "📊", label: "Dashboard", active: false },
            { icon: "📝", label: "New Quote", active: true },
            { icon: "📋", label: "My Quotes", active: false },
            { icon: "👥", label: "Clients", active: false },
            { icon: "📦", label: "Materials", active: false },
            { icon: "⚙️", label: "Settings", active: false },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                color: item.active ? colors.brand[400] : colors.gray[400],
                background: item.active
                  ? "rgba(242, 180, 29, 0.1)"
                  : "transparent",
                borderLeft: item.active
                  ? `3px solid ${colors.brand[400]}`
                  : "3px solid transparent",
                fontSize: 14,
                fontWeight: item.active ? 600 : 400,
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
