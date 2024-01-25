import { ActionIcon, Center, Paper, Skeleton, Stack, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Children, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { modals } from "@mantine/modals";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { api } from "~/utils/api";

export const HomeResultComp = () => {
  const ListApi = api.match.resultList.useQuery();

  const autoplay = useRef(Autoplay({ delay: 2000 }));

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
      <Stack py="md">
        <Title
          c="red"
          ta="center"
          order={4}
          p="md"
          style={{
            borderRadius: "var(--mantine-radius-md)",
            border: "1px solid var(--mantine-color-red-6)",
          }}
        >
          Last Match Result
        </Title>

        {(() => {
          if (ListApi.isLoading) {
            return <Skeleton h={400} w="100%" />;
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
              height="fit-content"
              slideSize="50%"
              slideGap="xs"
              align="start"
              loop
              plugins={[autoplay.current]}
            >
              {Children.toArray(
                ListApi.data.matches.map((resultLink) => (
                  <Carousel.Slide>
                    <Paper
                      style={{
                        backgroundImage: `url(${
                          resultLink.type === "video"
                            ? resultLink.thumbnail
                            : resultLink.src
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      radius="md"
                      h={400}
                      shadow="xl"
                      onClick={() => {
                        if (resultLink.type !== "video") return;

                        VideoModal(resultLink.src);
                      }}
                    >
                      {resultLink.type === "video" && (
                        <Center h="100%">
                          <ActionIcon radius="xl" size="xl">
                            <IconPlayerPlayFilled />
                          </ActionIcon>
                        </Center>
                      )}
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
