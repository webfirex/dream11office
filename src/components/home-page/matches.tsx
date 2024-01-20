import {
  Anchor,
  Button,
  Divider,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import Link from "next/link";
import { Children } from "react";
import { Data } from "~/lib/data";

export const HomeMatchesComp = () => {
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

        <SimpleGrid cols={3} spacing="xs">
          {Children.toArray(
            Data.matches.slice(0, 3).map((match) => (
              <Paper
                p={5}
                radius="md"
                shadow="xl"
                component={Link}
                href={`/view/${match.uuid}`}
              >
                <Stack gap={5}>
                  <Image radius="md" src={match.banner} alt={match.title} />

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
              </Paper>
            ))
          )}
        </SimpleGrid>
      </Stack>
    </>
  );
};
