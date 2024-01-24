import { Image, Paper, Stack, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Children } from "react";
import { Data } from "~/lib/data";

export const HomeResultComp = () => {
  return (
    <>
      <Stack pb="md">
        <Title c="red" order={4} px="md">
          Recent Match Result
        </Title>

        <Carousel
          withIndicators={false}
          withControls={false}
          height="fit-content"
          slideSize="50%"
          slideGap="xs"
          align="start"
        >
          {Children.toArray(
            Data.result.map((resultLink) => (
              <Carousel.Slide>
                <Paper shadow="xl">
                  <Image radius="md" src={resultLink} alt="result" />
                </Paper>
              </Carousel.Slide>
            ))
          )}
        </Carousel>
      </Stack>
    </>
  );
};
