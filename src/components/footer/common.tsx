import { Button, Group, Image, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { Children } from "react";

const Data = {
  links: [
    {
      name: "Home",
      link: "/app",
      icon: "/icons/1.png",
    },
    {
      name: "Matches",
      link: "/matches",
      icon: "/icons/2.png",
    },
    {
      name: "Support",
      link: "tel:8866076264",
      icon: "/icons/4.png",
    }
  ],
};

export const CommonFooter = () => {
  return (
    <>
      <Group h="100%" justify="space-evenly" bg="#a50c0c" gap={'0'}>
        {Children.toArray(
          Data.links.map((link) => (
            <div className="w-1/4">
              <Button component={Link} href={link.link} variant="transparent">
                <Stack gap={0} align="center">
                  <Image src={link.icon} w={"23"} />

                  <Text size="xs" c="white">
                    {link.name}
                  </Text>
                </Stack>
              </Button>
            </div>
          ))
        )}
        <div className="w-1/4">
          <Button component={Link} href={""} variant="transparent">
            <Stack gap={0} align="center">
              <Image src={"/tele.webp"} w={"18"} my={1} />

              <Text size="xs" c="white">
                Telegram
              </Text>
            </Stack>
          </Button>
        </div>
      </Group>
    </>
  );
};
