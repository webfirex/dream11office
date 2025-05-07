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
          <Image h={50} w={50} src="https://img.favpng.com/5/2/4/whatsapp-logo-icon-png-png-favpng-2afidVbQGYeKuKGEPQEa56myz.jpg" className={"blink"} alt="Telegram" radius={'100%'}/>
        </Link>
      </Dialog>
    </>
  );
};
