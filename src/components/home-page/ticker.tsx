import { Paper, Text } from "@mantine/core";
import Ticker from "framer-motion-ticker";
import { Data } from "~/lib/data";

export const HomeTickerComp = () => {
  return (
    <>
      <Paper bg="#a50c0c" py="md" radius="md">
        <Ticker duration={10}>
          {Array.from({ length: 1 }).map((_, i) => (
            <Text mx="sm" c="white" size="sm" fw="bold" key={i}>
              {Data.ticker.text}
            </Text>
          ))}
        </Ticker>
      </Paper>
    </>
  );
};
