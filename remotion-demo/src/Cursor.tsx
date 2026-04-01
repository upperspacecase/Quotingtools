import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Cursor: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  moveStart?: number;
  moveDuration?: number;
  clickAt?: number;
}> = ({ startX, startY, endX, endY, moveStart = 0, moveDuration = 20, clickAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const moveProgress = spring({
    frame: frame - moveStart,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  const x = interpolate(moveProgress, [0, 1], [startX, endX]);
  const y = interpolate(moveProgress, [0, 1], [startY, endY]);

  const isClicking =
    clickAt !== undefined && frame >= clickAt && frame < clickAt + 6;
  const scale = isClicking ? 0.85 : 1;

  const ringOpacity =
    clickAt !== undefined
      ? interpolate(frame - clickAt, [0, 10], [0.6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;
  const ringScale =
    clickAt !== undefined
      ? interpolate(frame - clickAt, [0, 10], [0.5, 2], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  if (frame < moveStart) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      {/* Click ring */}
      <div
        style={{
          position: "absolute",
          width: 30,
          height: 30,
          borderRadius: "50%",
          border: "2px solid #f2b41d",
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />
      {/* Cursor */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ transform: `scale(${scale})`, transition: "transform 0.1s" }}
      >
        <path
          d="M5 3l14 8-7 2-3 7z"
          fill="#1a1a2e"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
