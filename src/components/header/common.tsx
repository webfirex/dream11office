import { Group, Image, Title } from "@mantine/core";

export const CommonHeader = () => {
  return (
    <>
      <Group h="100%" px="xs" bg="#fff" display={"flex"} justify={"space-between"} style={{ boxShadow: '0 0 10px #00000050', borderTop: '1px', borderColor: '#00000050' }}>
        <Image src="/h-logo-w.png" alt="Header Logo" h={50} />
        <Image src="/contactus.png" alt="Header Logo" h={40} />
        {/* <Title order={4} c={"#F40000"}>Dream 11</Title> */}
      </Group>
    </>
  );
};
