import {z} from "zod";
import {urlRegex} from "../utils/regex";
import {zodToJsonSchema} from "zod-to-json-schema";
import {FastifySchema} from "fastify";

export const LinkBodySchemaObject = z.string().regex(urlRegex , "Invalid link")
export const LinkBodySchema = zodToJsonSchema(LinkBodySchemaObject , "LinkBodySchema")
export type  LinkBodySchemaType = z.infer<typeof LinkBodySchemaObject>
export const LinkRouterSchema : FastifySchema = {
    body : LinkBodySchema
}
