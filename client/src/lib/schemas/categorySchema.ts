import z from "zod";

export const CategorySchema = z.object({
    name: z.string().min(5, "Minimum length should be 5 characters."),
    description: z.string().min(10, 'Minimum length is 10 characters.')
})