import {z} from "zod";
import {urlRegex} from "../utils/regex";
import {zodToJsonSchema} from "zod-to-json-schema";
import {FastifySchema} from "fastify";

export const UrlSchemaObject = z.string().regex(urlRegex, "Invalid link");
export const UrlSchema = zodToJsonSchema(UrlSchemaObject);
export type UrlSchemaType = z.infer<typeof UrlSchemaObject>;
export const LinkBodySchemaObject = z.object({
    url: UrlSchemaObject,
    customName: z.string().min(6).max(20).nullish(),
});
export const LinkBodySchema = zodToJsonSchema(
    LinkBodySchemaObject,
    "LinkBodySchema"
);
export type LinkBodySchemaType = z.infer<typeof LinkBodySchemaObject>;
export const LinkRouterSchema: FastifySchema = {
    body: LinkBodySchema,
};
