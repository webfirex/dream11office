import {
  ActionIcon,
  AspectRatio,
  Center,
  Divider,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Children, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { modals } from "@mantine/modals";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { type RouterOutputs } from "~/utils/api";

interface HomeResultProps {
  results: RouterOutputs["match"]["resultList"]["matches"];
}

export const HomeResultComp = (props: HomeResultProps) => {
  const autoplay = useRef(Autoplay({ delay: 4000 }));

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
      <Paper withBorder p="md" radius="lg">
        <Stack>
          <Title c="white" ta="center" bg={"#a50c0c"} fw={900} order={4} style={{ borderRadius: "5px", border: "1px solid #00000020", padding: "5px 0 10px 0" }}>
            Last Match Results
          </Title>

          <Carousel
            withIndicators={false}
            withControls={false}
            height="fit-content"
            slideSize="50%"
            slideGap="sm"
            align="start"
            loop
            plugins={[autoplay.current]}
          >
            {Children.toArray(
              props.results.map((resultLink) => (
                <Carousel.Slide p={'xs'} style={{border: '1px solid #00000020', borderRadius:'7px', margin: '0 5px'}}>
                  <AspectRatio ratio={9 / 20}>
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
                  </AspectRatio>
                </Carousel.Slide>
              ))
            )}
          </Carousel>
        </Stack>
      </Paper>
    </>
  );
};
