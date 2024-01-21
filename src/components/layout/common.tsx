import { Flex } from "@mantine/core";
import dynamic from "next/dynamic";

const AppShell = dynamic(
  () => import("@mantine/core").then((mod) => mod.AppShell),
  {
    ssr: false,
  }
);

const AppShellHeader = dynamic(
  () => import("@mantine/core").then((mod) => mod.AppShellHeader),
  {
    ssr: false,
  }
);

const AppShellMain = dynamic(
  () => import("@mantine/core").then((mod) => mod.AppShellMain),
  {
    ssr: false,
  }
);

const AppShellFooter = dynamic(
  () => import("@mantine/core").then((mod) => mod.AppShellFooter),
  {
    ssr: false,
  }
);

const Container = dynamic(
  () => import("@mantine/core").then((mod) => mod.Container),
  {
    ssr: false,
  }
);

const Stack = dynamic(() => import("@mantine/core").then((mod) => mod.Stack), {
  ssr: false,
});

const CommonHeader = dynamic(
  () => import("../header/common").then((mod) => mod.CommonHeader),
  {
    ssr: false,
  }
);

const CommonFooter = dynamic(
  () => import("../footer/common").then((mod) => mod.CommonFooter),
  {
    ssr: false,
  }
);

interface CommonLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const CommonLayout = (props: CommonLayoutProps) => {
  return (
    <>
      <Container size="xs" p={0}>
        <AppShell header={{ height: 50 }} footer={{ height: 50 }} padding={0}>
          <AppShellHeader maw={"550"} bg={"#a50c0c"} style={{  
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
          }}>
              {props.header ?? <CommonHeader />}
          </AppShellHeader>

          <AppShellMain>
            <Stack p="sm">{props.children}</Stack>
          </AppShellMain>

          <AppShellFooter maw={"550"} bg={"#a50c0c"} style={{  
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
          }}>
            <CommonFooter />
          </AppShellFooter>
        </AppShell>
      </Container>
    </>
  );
};
