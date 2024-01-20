import { Paper, Text } from "@mantine/core";
import Ticker from "framer-motion-ticker";
import { Data } from "~/lib/data";

export const HomeTickerComp = () => {
  return (
    <>
      <Paper bg="red" py="sm" radius="md">
        <Ticker duration={20}>
          {Array.from({ length: 1 }).map((_, i) => (
            <Text mx="sm" c="white" size="md" fw="bold" key={i}>
              {Data.ticker.text}
            </Text>
          ))}
        </Ticker>
      </Paper>
    </>
  );
};
