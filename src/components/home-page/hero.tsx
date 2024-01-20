import { AspectRatio } from "@mantine/core";
import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <AspectRatio ratio={16 / 9}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${Data.hero.videoId}`}
        frameBorder="0"
        style={{
          borderRadius: "var(--mantine-radius-md)",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
    </AspectRatio>
  );
};
