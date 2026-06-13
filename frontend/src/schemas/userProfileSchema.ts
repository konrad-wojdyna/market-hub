import * as z from "zod";

export const userProfileSchema = z.object({
  avatarUrl: z
    .string()
    .max(512, { error: "Avatar URL must be 512 characters max" }),
  bio: z.string(),
  city: z.string().max(100, { error: "City must be 100 characters max" }),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;
