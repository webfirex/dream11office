import { Flex, Group, Image, Text, Title } from "@mantine/core";

export default function RankTimer() {

    const ranksA = 11

    return (
        <Group flex={'column'} bg={'url(/stad-bg.png)'} bgsz={'cover'} bgp={'center bottom'} w={'100%'} px={'20px'} py={'15px'} style={{ 
            borderRadius: '15px',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'flex-start',
         }}>
            <Title order={3} c={'white'} bg={'#a50c0c'} ta={'center'} mb={'10px'} py={'10px'} w={'100%'} style={{
                borderRadius: '10px'
            }}>Rank Bookings</Title>
            <Flex w={'100%'} direction={'column'} gap={'10px'}>
                <Flex w={'100%'} direction={'row'} justify={'space-evenly'}>
                    <Text c={'white'}> <b>Ranks Available : </b>{ranksA}</Text>
                    <Text c={'white'}> <b>Winning Prize : </b>1 Crore</Text>
                </Flex>
                <Flex w={'100%'}>
                    <Image src={'/book-btn.png'} alt="book now" />
                </Flex>
            </Flex>
         </Group>
    )
}