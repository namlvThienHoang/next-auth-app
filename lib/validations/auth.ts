import * as z from "zod";

export const userAuthSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(5, { message: "min 5 characters" })
    .max(20, { message: "max 20 characters" })
    .refine(
      (val) => {
        return !val.includes("!");
      },
      { message: "Not Allow contains !" }
    ),
  password: z.string().min(6).max(20),
});