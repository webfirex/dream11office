import { ActionIcon, Center, Paper, Stack, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Children, useRef } from "react";
import { Data } from "~/lib/data";
import Autoplay from "embla-carousel-autoplay";
import { modals } from "@mantine/modals";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export const HomeResultComp = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  const VideoModal = (link: string) => {
    modals.open({
      centered: true,
      withCloseButton: false,
      padding: 0,
      size: "auto",
      children: (
        <>
          <video width="100%" height="100%" controls>
            <source src={link} type="video/mp4" />
          </video>
        </>
      ),
    });
  };

  return (
    <>
      <Stack py="md">
        <Title
          c="red"
          ta="center"
          order={4}
          p="md"
          style={{
            borderRadius: "var(--mantine-radius-md)",
            border: "1px solid var(--mantine-color-red-6)",
          }}
        >
          Last Match Result
        </Title>

        <Carousel
          withIndicators={false}
          withControls={false}
          height="fit-content"
          slideSize="50%"
          slideGap="xs"
          align="start"
          loop
          plugins={[autoplay.current]}
        >
          {Children.toArray(
            Data.result.map((resultLink) => (
              <Carousel.Slide>
                <Paper
                  style={{
                    backgroundImage: `url(${
                      resultLink.type === "video"
                        ? resultLink.thumbnail
                        : resultLink.src
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  radius="md"
                  h={400}
                  shadow="xl"
                  onClick={() => {
                    if (resultLink.type !== "video") return;

                    VideoModal(resultLink.src);
                  }}
                >
                  {resultLink.type === "video" && (
                    <Center h="100%">
                      <ActionIcon radius="xl" size="xl">
                        <IconPlayerPlayFilled />
                      </ActionIcon>
                    </Center>
                  )}
                </Paper>
              </Carousel.Slide>
            ))
          )}
        </Carousel>
      </Stack>
    </>
  );
};
