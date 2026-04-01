import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { SceneIntro } from "./scenes/SceneIntro";
import { SceneTradeSelect } from "./scenes/SceneTradeSelect";
import { SceneQuoteBuilder } from "./scenes/SceneQuoteBuilder";
import { SceneSmartSuggest } from "./scenes/SceneSmartSuggest";
import { SceneQuotePreview } from "./scenes/SceneQuotePreview";
import { SceneSendTrack } from "./scenes/SceneSendTrack";
import { SceneOutro } from "./scenes/SceneOutro";

// Crossfade transition wrapper
const FadeTransition: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
}> = ({ children, durationInFrames }) => {
  const frame = useCurrentFrame();
  const fadeInDuration = 10;
  const fadeOutStart = durationInFrames - 10;

  const opacity = interpolate(
    frame,
    [0, fadeInDuration, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

export const QuoteMateDemoVideo: React.FC = () => {
  // Scene durations in frames (at 30fps)
  const intro = 90;       // 3s
  const trade = 90;       // 3s
  const builder = 150;    // 5s
  const suggest = 120;    // 4s
  const preview = 100;    // 3.3s
  const send = 150;       // 5s
  const outro = 90;       // 3s

  let offset = 0;

  const scenes = [
    { Component: SceneIntro, duration: intro },
    { Component: SceneTradeSelect, duration: trade },
    { Component: SceneQuoteBuilder, duration: builder },
    { Component: SceneSmartSuggest, duration: suggest },
    { Component: SceneQuotePreview, duration: preview },
    { Component: SceneSendTrack, duration: send },
    { Component: SceneOutro, duration: outro },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
      {scenes.map(({ Component, duration }, i) => {
        const from = offset;
        offset += duration;
        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <FadeTransition durationInFrames={duration}>
              <AbsoluteFill>
                <Component />
              </AbsoluteFill>
            </FadeTransition>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
