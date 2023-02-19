import { FastifyInstance} from 'fastify';
import { loginController } from '../controllers/auth/login.controller';
import { logoutController } from '../controllers/auth/logout.controller';
import  {registerController}  from '../controllers/auth/register.controller';

export async function authRouter(fastify: FastifyInstance) {
	fastify.post('/register',registerController(fastify))
	fastify.post('/login', loginController);
	fastify.get('/logout', logoutController);
}
