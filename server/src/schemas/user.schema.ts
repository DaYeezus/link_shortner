import {zodToJsonSchema} from "zod-to-json-schema";
import {z} from "zod";
import {FastifySchema} from "fastify";
import {passwordRegex} from "../utils/regex";
import {resetPasswordBodySchemaObject} from "./auth.schema";


export const changePasswordBodySchema = zodToJsonSchema(
    resetPasswordBodySchemaObject,
    "changePasswordBody"
);
export type changePasswordBodyType = z.infer<
    typeof resetPasswordBodySchemaObject
>;
export const changePasswordRouterSchema: FastifySchema = {
    body: changePasswordBodySchema,

};
