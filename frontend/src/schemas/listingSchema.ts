import * as z from "zod";

export const listingSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(3, { error: "Min 3 characters" })
    .max(50, { error: "Max 50 characters" }),
  description: z.string().optional(),
  price: z
    .number({ error: "Price is required" })
    .positive({ error: "Price must be positive" }),
  categoryId: z
    .number({ error: "Category is required" })
    .positive({ error: "Category must be greater than 0" }),
  location: z.string().optional(),
});

export type ListingFormData = z.infer<typeof listingSchema>;
