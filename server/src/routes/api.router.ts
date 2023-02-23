import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {authRouter} from "./auth.router";
import {linkRouter} from "./link.router";
import {userRoute} from "./user.router";

export async function apiRouter(fastify: FastifyInstance) {
    fastify.get("/", (req: FastifyRequest, rep: FastifyReply) => {
        rep.send("API ROUTE");
    });
    await fastify.register(authRouter, {
        prefix: "/auth",
    });
    await fastify.register(linkRouter, {
        prefix: "/link",
    });
    await fastify.register(userRoute, {
        prefix: "/user",
    });
}
