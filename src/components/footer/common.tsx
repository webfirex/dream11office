import { Button, Group, Stack, Text } from "@mantine/core";
import { IconHome, IconBallBaseball } from "@tabler/icons-react";
import Link from "next/link";
import { Children } from "react";

const Data = {
  links: [
    {
      name: "Home",
      link: "/",
      icon: IconHome,
    },
    {
      name: "Matches",
      link: "/matches",
      icon: IconBallBaseball,
    },
  ],
};

export const CommonFooter = () => {
  return (
    <>
      <Group h="100%" justify="space-evenly">
        {Children.toArray(
          Data.links.map((link) => (
            <>
              <Button component={Link} href={link.link} variant="transparent">
                <Stack gap={0} align="center">
                  <link.icon color="white" stroke={1.5} size={18} />

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
