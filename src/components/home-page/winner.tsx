import { Carousel } from "@mantine/carousel";
import { Flex, Image, Paper, Stack, Title } from "@mantine/core";
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
      <Stack gap={5}>
        <Title c="black" fw={900} order={5}>
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
                <Paper
                  p={5}
                  radius="md"
                  withBorder
                >
                  <Stack gap={"2px"}>
                    <Image
                      radius="md"
                      src={winner.image}
                      h={150}
                      w={120}
                      fit="cover"
                      alt="winner"
                      onClick={() => VideoModal(winner.video)}
                    />
                    <p style={{ fontSize: '11px', margin: "3px 0 0 0", padding: 0}}> <b>Name :</b>  Rishav Singh</p>
                    <p style={{ fontSize: '11px', margin: "0 0 0 0", padding: 0, width: '100%', backgroundColor: '#a50c0c', color: 'white', borderRadius: '4px', textAlign: 'center'}}> <b>2 Crore Winner</b></p>
                  </Stack>
                </Paper>
              </Carousel.Slide>
            ))
          )}
        </Carousel>
      </Stack>
    </>
  );
};
