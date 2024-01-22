import { AspectRatio, Image, Stack } from "@mantine/core";

export const ViewMatchHeroComp = (props: { banner: string }) => {
  return (
    <Stack mb={60}>
      <AspectRatio ratio={16 / 9}>
        <Image
          src="https://dream11office.com/public/images/matches/banner/x.png"
          alt="Header Logo"
          style={{
            borderBottomLeftRadius: "var(--mantine-radius-xl)",
            borderBottomRightRadius: "var(--mantine-radius-xl)",
          }}
        />
      </AspectRatio>

      <Image
        h={120}
        w={150}
        src={props.banner}
        alt="Match Banner"
        radius="lg"
        style={{
          position: "absolute",
          top: "290px",
          right: "50%",
          transform: "translateX(50%)",
        }}
      />
    </Stack>
  );
};
