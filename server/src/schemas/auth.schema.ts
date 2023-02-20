import {z} from "zod";
import {zodToJsonSchema} from 'zod-to-json-schema'

export const registerSchemaObject = z.object({
    email :z.string()
})

export const  registerSchema = zodToJsonSchema(registerSchemaObject , "registerSchema")
export type  registerSchemaType = z.infer<typeof registerSchemaObject>

export const loginSchemaObject = z.object({})
export const  loginSchema = zodToJsonSchema(loginSchemaObject , "loginSchema")
export type  loginSchemaType = z.infer<typeof loginSchemaObject>
