import {
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

export const MatchListComp = () => {
  const ListApi = api.match.list.useQuery();

  return (
    <>
      <Stack gap={'xs'}>
        <Title c="black" order={5}>
          Upcoming Matches
        </Title>

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
            <Stack>
              {Children.toArray(
                ListApi.data.matches.map((match) => (
                  <Paper
                    p="xs"
                    radius="md"
                    withBorder
                    component={Link}
                    href={`/view/${match.id}`}
                  >
                    <Group grow>
                      <Image
                        radius="md"
                        fit="cover"
                        src={match.banner}
                        alt={match.title}
                      />

                      <Stack gap="xs">
                        <Text ta="center"  fw="800" size={rem(13)} c="black">
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

                        <Button size="xs" radius="md">
                          <Text size="sm" fw="bold">
                            Boost 1st Rank
                          </Text>
                        </Button>
                      </Stack>
                    </Group>
                  </Paper>
                ))
              )}
            </Stack>
          );
        })()}
      </Stack>
    </>
  );
};
