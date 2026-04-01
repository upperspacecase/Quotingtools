import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export function useSlideIn(delay = 0, direction: "left" | "right" | "up" | "down" = "up") {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const axis = direction === "left" || direction === "right" ? "X" : "Y";
  const sign = direction === "right" || direction === "down" ? -1 : 1;
  const offset = interpolate(progress, [0, 1], [60 * sign, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return {
    transform: `translate${axis}(${offset}px)`,
    opacity,
  };
}

export function useFadeIn(delay = 0, durationFrames = 15) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, durationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity };
}

export function useTypewriter(text: string, startFrame = 0, charsPerFrame = 0.8) {
  const frame = useCurrentFrame();
  const charsToShow = Math.floor((frame - startFrame) * charsPerFrame);
  if (charsToShow <= 0) return "";
  return text.slice(0, Math.min(charsToShow, text.length));
}

export function useCounter(target: number, startFrame = 0, duration = 30) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - startFrame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.round(target * progress);
}
