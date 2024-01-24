import { sql } from "drizzle-orm";
import { type GetServerSidePropsContext } from "next";
import { db } from "~/server/database";
import { Visits } from "~/server/database/schema";

export const ViewCount = async (params: {
  context: GetServerSidePropsContext;
  path: string;
  name: string;
}) => {
  const { context, path } = params;

  const { req, res } = context;

  const cookieName = `view-count-${path}`;

  const cookie = req.cookies[cookieName];

  if (cookie) {
    return;
  }

  res.setHeader(
    "Set-Cookie",
    `${cookieName}=1; path=/; max-age=86400; httponly`
  );

  await db
    .insert(Visits)
    .values({
      url: path,
      count: 1,
      name: params.name,
    })
    .onConflictDoUpdate({
      target: Visits.url,
      set: {
        count: sql`${Visits.count} + 1`,
      },
    });

  return;
};
