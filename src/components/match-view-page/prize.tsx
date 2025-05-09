import { Divider, Flex, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { IconTicket } from "@tabler/icons-react";
import { useSetAtom } from "jotai";
import { Children } from "react";
import { LetterModal } from "~/lib/jotai";
import { type MatchType } from "~/lib/type";

const RankImage = (params: { rank: number }) => {
  switch (params.rank) {
    case 1:
      return "/first-place.png";

    case 2:
      return "/2nd-place.png";

      case 3:
        return "/3rd-place.png";
        
      case 3:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";

      case 4:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";
        
      case 5:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";

      case 6:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";
        
      case 7:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";

      case 8:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";
        
      case 9:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";

      case 10:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";

      case 11:
        return "https://imagetolink.com/ib/KFAMsGYVAw.png";

    default:
      throw new Error("Invalid rank");
  }
};

export const ViewMatchPrizeComp = (props: { match: MatchType }) => {
  const setModalState = useSetAtom(LetterModal);

  return (
    <Stack gap="md" pb={'100px'}>
      {Children.toArray(
        props.match.ranks.map((prize, rank) => (
          <Paper
            withBorder
            shadow="xl"
            radius="lg"
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              setModalState({ match: props.match, rank: rank + 1 })
            }
          >
            <Flex justify="space-between" h="100%">
              <Flex gap="md" p="md">
                <Image
                  src={RankImage({ rank: rank + 1 })}
                  width={50}
                  height={50} 
                  alt="Rank"
                  my="auto"
                />

                <Divider orientation="vertical" color="dark.9" />

                <Stack gap={0}>
                  <Text size="xs">
                    {rank + 1} Prize | {prize.prize}
                  </Text>
                  <Title order={2}>₹{prize.cost}</Title>
                </Stack>
              </Flex>

              <Paper radius="md" bg="red.9" p="md" m={5}>
                <Stack m="auto" gap={0} align="center">
                  <IconTicket color="#fff" size={16} />
                  <Text c="white" size="xs">
                    Book Now
                  </Text>
                </Stack>
              </Paper>
            </Flex>
          </Paper>
        ))
      )}
    </Stack>
  );
};
