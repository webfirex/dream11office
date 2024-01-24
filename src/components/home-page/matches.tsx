import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  Button,
  Divider,
  Group,
  Image,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import Link from "next/link";
import { Children } from "react";
import { api } from "~/utils/api";

export const HomeMatchesComp = () => {
  const ListApi = api.match.list.useQuery();

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

        {(() => {
          if (ListApi.isLoading) {
            return <Skeleton h={150} w="100%" />;
          }

          if (ListApi.isError) {
            return <Text>Error</Text>;
          }

          if (ListApi.data.total < 1) {
            return <Text>No Data</Text>;
          }

          return (
            <Carousel
              withIndicators={false}
              withControls={false}
              height={150}
              slideSize="100%"
              slideGap="xs"
              align="start"
            >
              {Children.toArray(
                ListApi.data.matches.map((match) => (
                  <Carousel.Slide>
                    <Paper
                      p={5}
                      radius="md"
                      shadow="xl"
                      component={Link}
                      href={`/view/${match.id}`}
                    >
                      <Group grow>
                        <Image
                          radius="md"
                          src={match.banner}
                          alt={match.title}
                        />

                        <Stack>
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

                          <Button size="compact-xs" radius="md">
                            <Text size={rem(11)} fw="bold">
                              Boost 1st Rank
                            </Text>
                          </Button>
                        </Stack>
                      </Group>
                    </Paper>
                  </Carousel.Slide>
                ))
              )}
            </Carousel>
          );
        })()}
      </Stack>
    </>
  );
};
