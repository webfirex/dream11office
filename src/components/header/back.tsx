import { ActionIcon, Group } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export const BackHeader = () => {
  const router = useRouter();

  return (
    <>
      <Group h="100%" px="md">
        <ActionIcon variant="transparent" color="white" onClick={() => router.back()}>
          <IconArrowLeft size={18} />
        </ActionIcon>
      </Group>
    </>
  );
};
