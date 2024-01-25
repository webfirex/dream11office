import { AspectRatio, Image, Stack } from "@mantine/core";

export const ViewMatchHeroComp = (props: { banner: string }) => {
  return (
    <Stack>
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/x.png"
          alt="Header Logo"
          style={{
            borderBottomLeftRadius: "var(--mantine-radius-xl)",
            borderBottomRightRadius: "var(--mantine-radius-xl)",
          }}
        />
      </AspectRatio>

      <Image
        w={180}
        mt={-50}
        mx="auto"
        src={props.banner}
        alt="Match Banner"
        radius="lg"
        style={{
          zIndex: 100,
        }}
      />
    </Stack>
  );
};
