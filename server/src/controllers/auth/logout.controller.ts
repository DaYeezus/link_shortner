import { FastifyReply, FastifyRequest } from 'fastify';

export async function logoutController(
	req: FastifyRequest,
	rep: FastifyReply,
) {
	try {
	} catch (err) {
		rep.code(500).send({
			message: err,
		});
	}
}
