import { z } from "zod";

export const ResultBaseSchema = z.object({
  id: z.number(),
  src: z.string().min(1).max(500),
  type: z.enum(["video", "photo"]),
  thumbnail: z.string().max(500).optional(),
});

export const ResultCreateSchema = ResultBaseSchema.omit({
  id: true,
}).superRefine((data, ctx) => {
  if (data.type === "video") {
    if (!data.thumbnail || data.thumbnail.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "thumbnail is required for video",
        path: ["thumbnail"],
      });
    }
  }
});

export const MatchBaseSchema = z.object({
  id: z.number(),
  banner: z.string().min(1).max(500),
  title: z.string().min(1).max(256),
  subTitle: z.string().min(1).max(256),
  date: z.string().min(1).max(500),
  description: z.string().min(1).max(500),
  startDate: z.date(),
  endDate: z.date(),
  ranks: z.array(
    z.object({
      prize: z.string().min(1).max(500),
      cost: z.number().min(0),
    })
  ),
});

export const MatchCreateSchema = MatchBaseSchema.omit({
  id: true,
});
