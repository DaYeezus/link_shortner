import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {authRouter} from './auth.router';

export async function apiRouter(fastify: FastifyInstance) {
    fastify.get('/', (req: FastifyRequest, rep: FastifyReply) => {
        rep.send('API ROUTE');
    });
    await fastify.register(authRouter, {
        prefix: '/auth',
    });
}
