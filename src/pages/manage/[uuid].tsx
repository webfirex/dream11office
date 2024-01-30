import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconPlayerPlayFilled, IconPlus } from "@tabler/icons-react";
import { type GetServerSidePropsContext } from "next";
import Link from "next/link";
import { Children, useState } from "react";
import { z } from "zod";
import { CommonLayout } from "~/components/layout/common";
import { MatchCreateSchema, ResultCreateSchema } from "~/lib/zod";
import { api } from "~/utils/api";
import { DateTimePicker } from "@mantine/dates";
import { useDidUpdate } from "@mantine/hooks";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const AdminPass = "65749c58-b20c-4af8-86f3-74c71dbc4486";

  const AdminSchema = z.object({
    uuid: z
      .string()
      .uuid()
      .refine((uuid) => uuid === AdminPass, "Invalid Admin Pass"),
  });

  const AdminData = AdminSchema.safeParse({
    uuid: context.query.uuid,
  });

  if (!AdminData.success) {
    console.log(AdminData.error);

    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}

export default function Manage() {
  const ResultListApi = api.match.resultList.useQuery();

  const [ResultFormMode, setResultFormMode] = useState<
    "create" | number | null
  >(null);

  const ResultForm = useForm<z.infer<typeof ResultCreateSchema>>({
    initialValues: {
      type: "photo",
      src: "",
      thumbnail: "",
    },

    validate: zodResolver(ResultCreateSchema),
  });

  const ResultCreateApi = api.match.resultCreate.useMutation({
    onSuccess: () => {
      void ResultListApi.refetch();

      setResultFormMode(null);

      ResultForm.reset();
    },
  });

  const ResultEditApi = api.match.resultEdit.useMutation({
    onSuccess: () => {
      void ResultListApi.refetch();

      setResultFormMode(null);

      ResultForm.reset();
    },
  });

  const ResultDeleteApi = api.match.resultDelete.useMutation({
    onSuccess: () => {
      void ResultListApi.refetch();
    },
  });

  const MatchListApi = api.match.list.useQuery();

  const [MatchFormMode, setMatchFormMode] = useState<"create" | number | null>(
    null
  );

  const MatchForm = useForm<z.infer<typeof MatchCreateSchema>>({
    initialValues: {
      title: "",
      subTitle: "",
      date: "",
      banner: "",
      description: "",
      endDate: new Date(),
      ranks: [
        {
          prize: "",
          cost: 0,
        },
        {
          prize: "",
          cost: 0,
        },
        {
          prize: "",
          cost: 0,
        },
      ],
      startDate: new Date(),
    },

    validate: zodResolver(MatchCreateSchema),
  });

  useDidUpdate(() => {
    console.log("MatchForm.values", MatchForm.values);
    console.log("MatchForm.errors", MatchForm.errors);
  }, [MatchForm.errors]);

  const MatchCreateApi = api.match.create.useMutation({
    onSuccess: () => {
      void MatchListApi.refetch();
    },
  });

  const MatchEditApi = api.match.edit.useMutation({
    onSuccess: () => {
      void MatchListApi.refetch();
    },
  });

  const MatchDeleteApi = api.match.delete.useMutation({
    onSuccess: () => {
      void MatchListApi.refetch();
    },
  });

  const VideoModal = (link: string) => {
    modals.open({
      centered: true,
      withCloseButton: false,
      padding: 0,
      size: "auto",
      children: (
        <>
          <video width="100%" height="100%" controls>
            <source src={link} type="video/mp4" />
          </video>
        </>
      ),
    });
  };

  return (
    <>
      <CommonLayout p="md" containerSize="xl">
        <Group justify="space-between">
          <Title>Results Image</Title>

          <ActionIcon
            onClick={() => {
              if (ResultFormMode === "create") {
                setResultFormMode(null);

                return;
              }

              setResultFormMode("create");

              ResultForm.reset();
            }}
          >
            <IconPlus size={18} />
          </ActionIcon>
        </Group>

        {ResultFormMode && (
          <Paper withBorder p="md">
            <Stack>
              <Title order={3}>
                {ResultFormMode === "create" ? "Create" : "Edit"} Result
              </Title>

              <form
                onSubmit={ResultForm.onSubmit((values) => {
                  if (ResultFormMode === "create") {
                    void ResultCreateApi.mutate(values);
                  } else {
                    void ResultEditApi.mutate({
                      id: ResultFormMode,
                      ...values,
                    });
                  }
                })}
              >
                <Stack>
                  <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <TextInput
                      label="Src"
                      minLength={3}
                      maxLength={500}
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...ResultForm.getInputProps("src")}
                    />

                    <Select
                      data={["photo", "video"]}
                      label="Type"
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...ResultForm.getInputProps("type")}
                    />

                    <TextInput
                      label="Thumbnail"
                      minLength={3}
                      maxLength={500}
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...ResultForm.getInputProps("thumbnail")}
                    />
                  </SimpleGrid>

                  <Button
                    loading={
                      ResultFormMode === "create"
                        ? ResultCreateApi.isLoading
                        : ResultEditApi.isLoading
                    }
                    type="submit"
                  >
                    {ResultFormMode === "create" ? "Create" : "Update"}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Paper>
        )}

        {(() => {
          if (ResultListApi.isLoading) {
            return <Skeleton h={400} w="100%" />;
          }

          if (ResultListApi.isError) {
            return <Text>Error</Text>;
          }

          if (ResultListApi.data.total < 1) {
            return <Text>No Data</Text>;
          }

          return (
            <SimpleGrid cols={{ base: 1, md: 5 }}>
              {Children.toArray(
                ResultListApi.data.matches.map((resultLink) => (
                  <Stack>
                    <Paper
                      style={{
                        backgroundImage: `url(${
                          resultLink.type === "video"
                            ? resultLink.thumbnail
                            : resultLink.src
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      radius="md"
                      h={400}
                      shadow="xl"
                      onClick={() => {
                        if (resultLink.type !== "video") return;

                        VideoModal(resultLink.src);
                      }}
                    >
                      {resultLink.type === "video" && (
                        <Center h="100%">
                          <ActionIcon radius="xl" size="xl">
                            <IconPlayerPlayFilled />
                          </ActionIcon>
                        </Center>
                      )}
                    </Paper>

                    <Button
                      onClick={() => ResultDeleteApi.mutate(resultLink.id)}
                      loading={ResultDeleteApi.isLoading}
                    >
                      Delete
                    </Button>

                    <Button
                      onClick={() => {
                        setResultFormMode(resultLink.id);

                        ResultForm.setValues({
                          src: resultLink.src,
                          type: resultLink.type,
                          thumbnail: resultLink.thumbnail ?? undefined,
                        });
                      }}
                    >
                      Edit
                    </Button>
                  </Stack>
                ))
              )}
            </SimpleGrid>
          );
        })()}

        <Group justify="space-between">
          <Title>Matches</Title>

          <ActionIcon
            onClick={() => {

              if (MatchFormMode === "create") {
                setMatchFormMode(null);

                return;
              }

              setMatchFormMode("create");

              MatchForm.reset();
            }}
          >
            <IconPlus size={18} />
          </ActionIcon>
        </Group>

        {MatchFormMode && (
          <Paper withBorder p="md">
            <Stack>
              <Title order={3}>
                {MatchFormMode === "create" ? "Create" : "Edit"} Match
              </Title>

              <form
                onSubmit={MatchForm.onSubmit((values) => {
                  if (MatchFormMode === "create") {
                    void MatchCreateApi.mutate(values);
                  } else {
                    void MatchEditApi.mutate({
                      id: MatchFormMode,
                      ...values,
                    });
                  }
                })}
              >
                <Stack>
                  <SimpleGrid cols={{ base: 1, md: 2 }}>
                    <TextInput
                      label="Title"
                      minLength={3}
                      maxLength={500}
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...MatchForm.getInputProps("title")}
                    />

                    <TextInput
                      label="Sub Title"
                      minLength={3}
                      maxLength={500}
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...MatchForm.getInputProps("subTitle")}
                    />

                    <TextInput
                      label="Banner"
                      minLength={3}
                      maxLength={500}
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...MatchForm.getInputProps("banner")}
                    />

                    <TextInput
                      label="Description"
                      minLength={3}
                      maxLength={500}
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...MatchForm.getInputProps("description")}
                    />

                    <TextInput
                      label="Date"
                      minLength={3}
                      maxLength={500}
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...MatchForm.getInputProps("date")}
                    />

                    <DateTimePicker
                      label="Start Date"
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...MatchForm.getInputProps("startDate")}
                    />

                    <DateTimePicker
                      label="End Date"
                      disabled={
                        ResultFormMode === "create"
                          ? ResultCreateApi.isLoading
                          : ResultEditApi.isLoading
                      }
                      {...MatchForm.getInputProps("endDate")}
                    />

                    <Stack>
                      {Children.toArray(
                        MatchForm.values.ranks.map((r, index) => (
                          <Stack gap={5}>
                            <Divider label={`Rank ${index + 1}`} />

                            <TextInput
                              label="Prize"
                              minLength={3}
                              maxLength={500}
                              disabled={
                                ResultFormMode === "create"
                                  ? ResultCreateApi.isLoading
                                  : ResultEditApi.isLoading
                              }
                              {...MatchForm.getInputProps(
                                `ranks.${index}.prize`
                              )}
                            />

                            <NumberInput
                              label="Cost"
                              leftSection={<>₹</>}
                              minLength={3}
                              maxLength={500}
                              disabled={
                                ResultFormMode === "create"
                                  ? ResultCreateApi.isLoading
                                  : ResultEditApi.isLoading
                              }
                              {...MatchForm.getInputProps(
                                `ranks.${index}.cost`
                              )}
                            />
                          </Stack>
                        ))
                      )}
                    </Stack>
                  </SimpleGrid>

                  <Button
                    loading={
                      MatchFormMode === "create"
                        ? MatchCreateApi.isLoading
                        : MatchEditApi.isLoading
                    }
                    type="submit"
                  >
                    {MatchFormMode === "create" ? "Create" : "Update"}
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Paper>
        )}

        {(() => {
          if (MatchListApi.isLoading) {
            return <Skeleton h={400} w="100%" />;
          }

          if (MatchListApi.isError) {
            return <Text>Error</Text>;
          }

          if (MatchListApi.data.total < 1) {
            return <Text>No Data</Text>;
          }

          return (
            <SimpleGrid cols={{ base: 1, md: 5 }}>
              {Children.toArray(
                MatchListApi.data.matches.map((match) => (
                  <Stack>
                    <Paper
                      p="xs"
                      radius="md"
                      withBorder
                      component={Link}
                      href={`/view/${match.id}`}
                    >
                      <Group grow>
                        <Image
                          radius="md"
                          mih={90}
                          src={match.banner}
                          alt={match.title}
                        />

                        <Stack gap="xs">
                          <Text ta="center" fw="bold" size={rem(13)} c="black">
                            {match.title}
                          </Text>

                          <Divider color="dark.9" />

                          <Stack gap={3}>
                            <Text ta="center" size={rem(10)} c="dimmed">
                              {match.subTitle}
                            </Text>

                            <Text size={rem(10)} ta="center" c="dimmed">
                              {match.date}
                            </Text>
                          </Stack>

                          <Button size="compact-xs" radius="md">
                            <Text size={rem(11)} fw="bold">
                              Boost 1st Rank
                            </Text>
                          </Button>
                        </Stack>
                      </Group>
                    </Paper>

                    <Button
                      onClick={() => MatchDeleteApi.mutate(match.id)}
                      loading={MatchDeleteApi.isLoading}
                    >
                      Delete
                    </Button>

                    <Button
                      onClick={() => {
                        setMatchFormMode(match.id);

                        MatchForm.setValues({
                          title: match.title,
                          subTitle: match.subTitle,
                          banner: match.banner,
                          description: match.description,
                          endDate: match.endDate,
                          ranks: match.ranks,
                          date: match.date,
                          startDate: match.startDate,
                        });
                      }}
                    >
                      Edit
                    </Button>
                  </Stack>
                ))
              )}
            </SimpleGrid>
          );
        })()}
      </CommonLayout>
    </>
  );
}
