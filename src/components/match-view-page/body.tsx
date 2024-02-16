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

      <Text size="sm">इस मैच की 1 से लेकर 3 Rank तक आप Booking कर सकते हो। अलग अलग Rank का Booking charges अलग अलग है। आपकी Winnings 100% होगी। ये Booking सीधे Cricket 11 office से की जा रही है। आप जो भी Rank Book करोगे उसका Winning amount मैच खत्म होने के बाद सीधे आपके Cricket 11 wallet में भेज दिया जायेगा। आप अपने wallet से पैसा सीधे अपने बैंक में Transfer कर सकते है।</Text>
    </Stack>
  );
};
