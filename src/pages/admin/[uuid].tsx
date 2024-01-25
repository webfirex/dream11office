import {
  ActionIcon,
  Divider,
  Group,
  NumberInput,
  Pagination,
  ScrollArea,
  SegmentedControl,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDebouncedValue, useDidUpdate, useSetState } from "@mantine/hooks";
import { IconCheck, IconX } from "@tabler/icons-react";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { useRouter } from "next/router";
import { Children } from "react";
import { z } from "zod";
import { CommonLayout } from "~/components/layout/common";
import { db } from "~/server/database";
import { api } from "~/utils/api";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const AdminPass = "5c24e368-ea8a-4e27-a383-b75d08ba4923";

  const AdminSchema = z.object({
    uuid: z
      .string()
      .uuid()
      .refine((uuid) => uuid === AdminPass, "Invalid Admin Pass"),
    page: z.string().regex(/^\d+$/).transform(Number).default("1"),
    per: z.string().regex(/^\d+$/).transform(Number).default("10"),
    status: z.enum(["completed", "pending", "failed"]).optional(),
  });

  const AdminData = AdminSchema.safeParse({
    uuid: context.query.uuid,
    page: context.query.page,
    per: context.query.per,
    status:
      context.query.status === "" ||
      !context.query.status ||
      context.query.status === "all"
        ? undefined
        : context.query.status,
  });

  if (!AdminData.success) {
    return {
      notFound: true,
    };
  }

  if (AdminData.data.page < 1) {
    return {
      redirect: {
        destination: `/admin/${AdminData.data.uuid}?page=1`,
        permanent: false,
      },
    };
  }

  if (AdminData.data.per < 1) {
    return {
      redirect: {
        destination: `/admin/${AdminData.data.uuid}?per=10`,
        permanent: false,
      },
    };
  }

  const PageVisitsPromise = db.query.Visits.findMany();

  const TxnPromise = db.query.Transactions.findMany({
    where: (txn, { eq, isNotNull }) => {
      if (AdminData.data.status) {
        return eq(txn.status, AdminData.data.status);
      }

      return isNotNull(txn.status);
    },

    orderBy: (txn, { desc }) => {
      return [desc(txn.id)];
    },

    with: {
      match: {
        columns: {
          title: true,
        },
      },
    },

    columns: {
      amount: true,
      status: true,
      id: true,
      created_at: true,
      phone_number: true,
      rank: true,
      user_id: true,
    },

    limit: AdminData.data.per,
    offset: (AdminData.data.page - 1) * AdminData.data.per,
  });

  const TxnCountPromise = db.query.Transactions.findMany({
    where: (txn, { eq, isNotNull }) => {
      if (AdminData.data.status) {
        return eq(txn.status, AdminData.data.status);
      }

      return isNotNull(txn.status);
    },

    columns: {
      id: true,
    },
  });

  const [PageVisits, Txn, TxnCount] = await Promise.all([
    PageVisitsPromise,
    TxnPromise,
    TxnCountPromise,
  ]);

  return {
    props: {
      PageVisits,
      Txn: {
        data: Txn.map((txn) => {
          return {
            ...txn,
            match: txn.match ?? {
              title: "Deleted Match",
            },
          };
        }),
        count: TxnCount.length,
        page: AdminData.data.page,
        per: AdminData.data.per,
        status: AdminData.data.status ?? undefined,
        totalPage: Math.ceil(TxnCount.length / AdminData.data.per),
      },
    },
  };
}

export default function Admin({
  PageVisits,
  Txn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const [Query, setQuery] = useSetState<{
    status: string | undefined;
    page: number;
    per: number;
  }>({
    status: Txn.status,
    page: Txn.page,
    per: Txn.per,
  });

  const [DebouncedQuery] = useDebouncedValue(Query, 1000);

  useDidUpdate(() => {
    void router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        ...DebouncedQuery,
      },
    });
  }, [DebouncedQuery]);

  const UpdateApi = api.transaction.update.useMutation({
    onSuccess: () => {
      void router.reload();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <>
      <CommonLayout p="md" containerSize="xl">
        <Stack>
          <Title order={2}>Page Visits</Title>

          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text ta="center" fw="bold">
                    Page
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text ta="center" fw="bold">
                    URL
                  </Text>
                </Table.Th>

                <Table.Th>
                  <Text ta="center" fw="bold">
                    Count
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {Children.toArray(
                PageVisits.map((page) => {
                  return (
                    <Table.Tr>
                      <Table.Td>
                        <Text ta="center">{page.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text ta="center">{page.url}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text ta="center">{page.count}</Text>
                      </Table.Td>
                    </Table.Tr>
                  );
                })
              )}
            </Table.Tbody>
          </Table>
        </Stack>

        <Divider my="xl" color="red.9" />

        <Stack>
          <Group justify="space-between">
            <Title order={2}>Transactions</Title>

            <SegmentedControl
              data={[
                {
                  label: "All",
                  value: "all",
                },
                {
                  label: "Completed",
                  value: "completed",
                },
                {
                  label: "Pending",
                  value: "pending",
                },
                {
                  label: "Failed",
                  value: "failed",
                },
              ]}
              value={Query.status}
              onChange={(value) => setQuery({ status: value })}
              size="sm"
            />
          </Group>

          <ScrollArea type="never">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Text ta="center" fw="bold">
                      ID
                    </Text>
                  </Table.Th>

                  <Table.Th>
                    <Text ta="center" fw="bold">
                      User ID
                    </Text>
                  </Table.Th>

                  <Table.Th>
                    <Text ta="center" fw="bold">
                      Phone Number
                    </Text>
                  </Table.Th>

                  <Table.Th>
                    <Text ta="center" fw="bold">
                      Match
                    </Text>
                  </Table.Th>

                  <Table.Th>
                    <Text ta="center" fw="bold">
                      Rank
                    </Text>
                  </Table.Th>

                  <Table.Th>
                    <Text ta="center" fw="bold">
                      Status
                    </Text>
                  </Table.Th>

                  <Table.Th>
                    <Text ta="center" fw="bold">
                      Amount
                    </Text>
                  </Table.Th>

                  <Table.Th>
                    <Text ta="center" fw="bold">
                      Created At
                    </Text>
                  </Table.Th>

                  <Table.Th>
                    <Text ta="center" fw="bold">
                      Actions
                    </Text>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {Children.toArray(
                  Txn.data.map((txn) => {
                    return (
                      <Table.Tr>
                        <Table.Td>
                          <Text ta="center" fw="bold" c="dimmed">
                            {txn.id}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Text ta="center">{txn.user_id}</Text>
                        </Table.Td>

                        <Table.Td>
                          <Text ta="center">{txn.phone_number}</Text>
                        </Table.Td>

                        <Table.Td>
                          <Text ta="center">{txn.match.title}</Text>
                        </Table.Td>

                        <Table.Td>
                          <Text ta="center">{txn.rank}</Text>
                        </Table.Td>

                        <Table.Td>
                          <Text tt="capitalize" ta="center">
                            {txn.status}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Text ta="center">₹{txn.amount}</Text>
                        </Table.Td>

                        <Table.Td>
                          <Text ta="center">
                            {txn.created_at.toLocaleString("en-US", {
                              timeZone: "Asia/Kolkata",
                            })}
                          </Text>
                        </Table.Td>

                        <Table.Td>
                          <Group justify="center">
                            <ActionIcon
                              size="sm"
                              variant="outline"
                              disabled={txn.status !== "pending"}
                              loading={UpdateApi.isLoading}
                              onClick={() => {
                                UpdateApi.mutate({
                                  transaction_id: txn.id,
                                  status: "completed",
                                });
                              }}
                            >
                              <IconCheck size={18} />
                            </ActionIcon>

                            <ActionIcon
                              size="sm"
                              variant="outline"
                              disabled={txn.status !== "pending"}
                              loading={UpdateApi.isLoading}
                              onClick={() => {
                                UpdateApi.mutate({
                                  transaction_id: txn.id,
                                  status: "failed",
                                });
                              }}
                            >
                              <IconX size={18} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    );
                  })
                )}
              </Table.Tbody>
            </Table>
          </ScrollArea>

          <Group justify="space-between">
            <NumberInput
              placeholder="Per Page"
              min={1}
              max={100}
              value={Query.per}
              maw={85}
              size="xs"
              onChange={(value) => setQuery({ per: Number(value) })}
            />

            <Pagination
              size="sm"
              total={Txn.totalPage}
              value={Query.page}
              onChange={(value) => setQuery({ page: value })}
            />
          </Group>
        </Stack>
      </CommonLayout>
    </>
  );
}
