import { Group, Image, Title } from "@mantine/core";

export const CommonHeader = () => {
  return (
    <>
      <Group h="100%" px="md" bg="#fff" display={"flex"} justify={"space-between"}>
        <Image src="/h-logo-w.png" alt="Header Logo" h={50} />
        <Title order={4} c={"#F40000"}>Dream 11</Title>
      </Group>
    </>
  );
};
