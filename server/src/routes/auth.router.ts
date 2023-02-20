import { FastifyInstance} from 'fastify';
import AuthController from "../controllers/auth.controller";

export async function authRouter(fastify: FastifyInstance) {
	const authController = new AuthController(fastify)
	fastify.post('/register',authController.register)
	fastify.post('/login', authController.login);
	fastify.get('/logout', authController.logout);
}
