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
      name: "Refer",
      link: "/refer",
      icon: "/icons/3.png",
    },
    {
      name: "Support",
      link: "https://t.me/+3FMI1LP_nPZhMmJl",
      icon: "/icons/4.png",
    },
  ],
};

export const CommonFooter = () => {
  return (
    <>
      <Group h="100%" justify="space-evenly" bg="#a50c0c">
        {Children.toArray(
          Data.links.map((link) => (
            <>
              <Button component={Link} href={link.link} variant="transparent">
                <Stack gap={0} align="center">
                  <Image src={link.icon} w={"23"} />

                  <Text size="xs" c="white">
                    {link.name}
                  </Text>
                </Stack>
              </Button>
            </>
          ))
        )}
      </Group>
    </>
  );
};
