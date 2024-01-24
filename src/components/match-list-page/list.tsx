import {
  Button,
  Divider,
  Image,
  Paper,
  SimpleGrid,
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
      <Stack>
        <Title c="red" order={4}>
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
            <SimpleGrid cols={2} spacing="xs">
              {Children.toArray(
                ListApi.data.matches.map((match) => (
                  <Paper
                    p={5}
                    radius="md"
                    shadow="xl"
                    component={Link}
                    href={`/view/${match.id}`}
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
          );
        })()}
      </Stack>
    </>
  );
};
