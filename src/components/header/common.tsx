import { Group, Image } from "@mantine/core";

export const CommonHeader = () => {
  return (
    <>
      <Group h="100%" px="md" bg="#a50c0c">
        <Image src="h-logo-w.png" alt="Header Logo" h={50} />
      </Group>
    </>
  );
};
