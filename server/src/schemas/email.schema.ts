import {z} from "zod";

const forgotPasswordEmail = z.object({
    message: z.string(),
    to: z.string().email(),
});
export type forgotPasswordEmailType = z.infer<typeof forgotPasswordEmail>;
