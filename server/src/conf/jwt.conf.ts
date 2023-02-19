import fastifyJwt from "@fastify/jwt"
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify"

export async function jwtConf(server: FastifyInstance) {
    await server.register(fastifyJwt, {
        secret: "somesecret",
        logLevel: "info",
        sign: {expiresIn: new Date().getDate() + 30}
    })
    await server.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })
} 
