import { ActionIcon, Group } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

interface BackHeaderProps {
  h?: string;
  onBack?: () => void;
}

export const BackHeader = (props: BackHeaderProps) => {
  const router = useRouter();

  return (
    <>
      <Group px="md" bg="#a50c0c" h={props.h ?? "100%"}>
        <ActionIcon
          variant="transparent"
          color="white"
          onClick={() => (props.onBack ? props.onBack() : router.back())}
        >
          <IconArrowLeft size={18} />
        </ActionIcon>
      </Group>
    </>
  );
};
