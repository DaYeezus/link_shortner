import {z} from "zod";
import {jwtRegex} from "../utils/regex";

export const jwtTokenSchema = z
    .string()
    .regex(jwtRegex, "not a valid jwt token");
export type jwtTokenSchemaType = z.infer<typeof jwtTokenSchema>;
