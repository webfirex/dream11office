import { Carousel } from "@mantine/carousel";
import { Image, Stack, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Children } from "react";
import { Data } from "~/lib/data";

export const HomeWinnerComp = () => {
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
      <Stack>
        <Title c="red" fw={"800"} order={4}>
          Our Winners
        </Title>

        <Carousel
          withIndicators={false}
          withControls={false}
          height="fit-content"
          slideSize="25%"
          slideGap="xs"
          align="start"
          loop
        >
          {Children.toArray(
            Data.winners.map((winner) => (
              <Carousel.Slide>
                <Image
                  radius="md"
                  src={winner.image}
                  h={150}
                  w={120}
                  fit="cover"
                  alt="winner"
                  onClick={() => VideoModal(winner.video)}
                />
              </Carousel.Slide>
            ))
          )}
        </Carousel>
      </Stack>
    </>
  );
};
