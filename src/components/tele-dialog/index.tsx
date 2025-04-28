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
        <Link href="">
          <Image h={50} w={50} src="/contactbtn.png" className={"blink"} alt="Telegram"/>
        </Link>
      </Dialog>
    </>
  );
};
