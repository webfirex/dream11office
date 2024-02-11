import { Dialog, Image } from "@mantine/core";
import Link from "next/link";

export const TelegramDialog = () => {
  return (
    <>
      <Dialog
        opened
        withCloseButton={false}
        onClose={() => void 0}
        size="auto"
        radius="xl"
        p={0}
        position={{
          bottom: 65,
          right: 20,
        }}
      >
        <Link href="https://t.me/+3FMI1LP_nPZhMmJl">
          <Image h={50} w={50} src="/tele.webp" className={"blink"} alt="Telegram"/>
        </Link>
      </Dialog>
    </>
  );
};
