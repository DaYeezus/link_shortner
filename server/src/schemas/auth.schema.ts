import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";
import {passwordRegex} from "../utils/regex";
import {FastifySchema} from "fastify";

export const registerBodySchemaObject = z.object({
    email: z.string().email({message: "Not a valid email"}),
    password: z.string().min(8).max(16).regex(passwordRegex, {
        message:
            "Password must be at least 6 characters long and no more than 16 characters",
    }),
});
export const registerBodySchema = zodToJsonSchema(
    registerBodySchemaObject,
    "registerBodySchema"
);
export type registerSchemaType = z.infer<typeof registerBodySchemaObject>;
export const registerRouterSchema: FastifySchema = {
    body: registerBodySchema,
};

export const loginBodySchemaObject = z.object({
    email: z.string().email({message: "Not a valid email"}),
    password: z.string().min(8).max(16).regex(passwordRegex, {
        message:
            "Password must be at least 6 characters long and no more than 16 characters",
    }),
});
export const loginBodySchema = zodToJsonSchema(
    loginBodySchemaObject,
    "loginSchema"
);
export type loginSchemaType = z.infer<typeof loginBodySchemaObject>;
export const loginRouterSchema: FastifySchema = {
    body: loginBodySchema,
};

export const forgotPasswordBodySchemaObject = z.object({
    email: z.string().email({message: "Not a valid email"}),
});
export const forgotPasswordBodySchema = zodToJsonSchema(
    forgotPasswordBodySchemaObject,
    "forgotPasswordBody"
);
export type forgotPasswordBodyType = z.infer<
    typeof forgotPasswordBodySchemaObject
>;
export const forgotPasswordRouterSchema: FastifySchema = {
    body: forgotPasswordBodySchema,
};

export const resetPasswordBodySchemaObject = z
    .object({
        password: z.string().min(8).max(16).regex(passwordRegex, {
            message:
                "Password must be at least 6 characters long and no more than 16 characters",
        }),
        confirmPassword: z.string().min(8).max(16).regex(passwordRegex, {
            message:
                "Password must be at least 6 characters long and no more than 16 characters",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const resetPasswordBodySchema = zodToJsonSchema(
    resetPasswordBodySchemaObject,
    "resetPasswordBody"
);
export type resetPasswordBodyType = z.infer<
    typeof resetPasswordBodySchemaObject
>;
export const resetPasswordRouterSchema: FastifySchema = {
    body: resetPasswordBodySchema,
    querystring: {
        type: "object",
        properties: {
            token: {
                type: "string",
            },
        },
        required: ["token"],
    },
};
