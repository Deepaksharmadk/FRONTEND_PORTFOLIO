import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().trim().min(3, {
    message: "Full name is required.",
  }),

  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  resume: z.instanceof(File, {
    message: "Resume must be a file.",
  }),
  avatar: z.instanceof(File, {
    message: "Avatar must be a file.",
  }),
  aboutMe: z.string().min(10, {
    message: "About me is required.",
  }),
});
