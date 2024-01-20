import { Group, Image } from "@mantine/core";

export const CommonHeader = () => {
  return (
    <>
      <Group h="100%" px="md">
        <Image src="h-logo-w.png" alt="Header Logo" h={30} />
      </Group>
    </>
  );
};
