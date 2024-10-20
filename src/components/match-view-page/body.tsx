import { Divider, Stack, Text, Title } from "@mantine/core";

export const ViewMatchBodyComp = (props: {
  title: string;
  subTitle: string;
  date: string;
  description: string;
}) => {
  return (
    <Stack gap="xs">
      <Title ta="center" order={2} c="red">
        {props.title}
      </Title>

      <Divider size="sm" color="red" />

      <Text fw="bold" size="sm">
        {props.subTitle}
      </Text>
 
      <Text fw="bold" size="sm">
        {props.date}
      </Text>

      <Text size="sm">Dream 11 Team, एक ऐसी Company है जो आपको 1 से लेकर 3 Rank तक की Winning Team provide करती है। आप चाहे किसी भी App पे हमारी टीम से खेलो आपकी Rank 100% Fix होगी। हम AI ( Artificial Intelligence) & Data Science का Use करके सबसे ज्यादा Point वाली टीम आपको देते है। आप अपनी Rank अभी Book करो हम आपको आज ही करोड़पति बना देंगे।</Text>
    </Stack>
  );
};
