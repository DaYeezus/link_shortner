import {FastifyInstance} from 'fastify';
import AuthController from "../controllers/auth.controller";
import {
	forgotPasswordRouterSchema,
	loginRouterSchema,
	registerRouterSchema,
	resetPasswordRouterSchema
} from "../schemas/auth.schema";

export async function authRouter(fastify: FastifyInstance) {
    const authController = new AuthController()
    fastify.post('/register', {schema: registerRouterSchema}, authController.register)
    fastify.post('/login', {schema: loginRouterSchema}, authController.login);
    fastify.post('/forgot-password', {schema: forgotPasswordRouterSchema}, authController.forgetPassword);
    fastify.post('/reset-password', {schema: resetPasswordRouterSchema}, authController.resetPassword);
}
