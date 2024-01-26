import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  Button,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import Link from "next/link";
import { Children, useRef } from "react";
import { type RouterOutputs } from "~/utils/api";
import Autoplay from "embla-carousel-autoplay";

interface HomeMatchesCompProps {
  matches: RouterOutputs["match"]["list"]["matches"];
}

export const HomeMatchesComp = (props: HomeMatchesCompProps) => {
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Title c="red" order={4}>
            Upcoming Matches
          </Title>

          <Anchor href="/matches" size="xs">
            View All -&gt;
          </Anchor>
        </Group>

        <Carousel
          withIndicators={false}
          withControls={false}
          plugins={[autoplay.current]}
          height="fit-content"
          slideSize="30%"
          slideGap="xs"
          align="start"
          loop
        >
          {Children.toArray(
            props.matches.map((match) => (
              <Carousel.Slide>
                <Paper
                  p={5}
                  radius="md"
                  withBorder
                  component={Link}
                  href={`/view/${match.id}`}
                >
                  <Stack>
                    <Image
                      radius="md"
                      fit="cover"
                      src={match.banner}
                      alt={match.title}
                    />

                    <Stack gap={5}>
                      <Text ta="center" fw="bold" size={rem(13)} c="black">
                        {match.title}
                      </Text>

                      <Divider color="dark.9" />

                      <Stack gap={3}>
                        <Text ta="center" size={rem(10)} c="dimmed">
                          {match.subTitle}
                        </Text>

                        <Text size={rem(10)} ta="center" c="dimmed">
                          {match.date}
                        </Text>
                      </Stack>

                      <Button size="compact-xs" radius="sm">
                        <Text size="sm" fw="bold">
                          Boost 1st Rank
                        </Text>
                      </Button>
                    </Stack>
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
