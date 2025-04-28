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
      <Group px="md" bg="#fff" h={props.h ?? "100%"} style={{boxShadow: '0 0 10px #00000050', zIndex: '10000'}}>
        <ActionIcon
          variant="transparent"
          color="#a50c0c"
          onClick={() => (props.onBack ? props.onBack() : router.back())}
        >
          <IconArrowLeft size={18} />
        </ActionIcon>
      </Group>
    </>
  );
};
