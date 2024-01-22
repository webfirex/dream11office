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

      <Text size="sm">{props.description}</Text>
    </Stack>
  );
};
