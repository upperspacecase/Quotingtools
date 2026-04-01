import React from "react";
import { Composition } from "remotion";
import { QuoteMateDemoVideo } from "./QuoteMateDemoVideo";

export const RemotionRoot: React.FC = () => {
  // Total: 90 + 90 + 150 + 120 + 100 + 150 + 90 = 790 frames @ 30fps = ~26s
  const totalDuration = 790;

  return (
    <>
      <Composition
        id="QuoteMatePro-Demo"
        component={QuoteMateDemoVideo}
        durationInFrames={totalDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
