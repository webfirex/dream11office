import {
  ActionIcon,
  Center,
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
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
        <Title c="red" order={4}>
          Our Winners
        </Title>

        <SimpleGrid cols={3} spacing="xs">
          {Children.toArray(
            Data.winners.map((winner) => (
              <Paper
                style={{
                  backgroundImage: `url(${winner.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                radius="md"
                h={150}
                shadow="xl"
                onClick={() => VideoModal(winner.video)}
              >
                <Center h="72%">
                  <ActionIcon radius="xl" size="xl">
                    <IconPlayerPlayFilled />
                  </ActionIcon>
                </Center>
                <Flex
                  direction="column"
                  justify="flex-end"
                  align="center"
                  wrap="wrap"
                >
                  <Paper bg="white" m="xs" px="xs" py={3}>
                    <Text size="xs" ta="center" fw="bold" c="red">
                      {winner.prize}
                    </Text>
                  </Paper>
                </Flex>
              </Paper>
            ))
          )}
        </SimpleGrid>
      </Stack>
    </>
  );
};
