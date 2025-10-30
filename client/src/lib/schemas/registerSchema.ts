import z from "zod";

export const registerSchema = z.object({
    email: z.email(),
    displayName: z.string().min(5),
    password: z.string().min(5)
})

export type RegisterSchema = z.infer<typeof registerSchema>