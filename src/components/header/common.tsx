import { Group, Image, Title } from "@mantine/core";

export const CommonHeader = () => {
  return (
    <>
      <Group h="100%" px="xs" bg="#fff" display={"flex"} justify={"space-between"} style={{ boxShadow: '0 0 10px #00000050', borderTop: '1px', borderColor: '#00000050', flexWrap: 'nowrap' }}>
        <Image src="/h-logo-w.png" alt="Header Logo" h={50} />
        <div style={{display: 'flex', gap: '5px', alignItems: 'center', justifyContent: 'end', height: '100%'}}>
          <Image src="/contactus.png" alt="Header Logo" h={40} />
          <Image src="https://i.ibb.co/z7fBxBH/pofpic-451687-1727852968461.png" alt="Header Logo" h={40} w={40} radius={'100%'} />
        </div>
        {/* <Title order={4} c={"#F40000"}>Dream 11</Title> */}
      </Group>
    </>
  );
};
