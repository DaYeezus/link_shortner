import {FastifyInstance} from "fastify";
import {apiRouter} from "../routes/api.router";

export async function routesConf(server: FastifyInstance): Promise<void> {
    await server.register(apiRouter, {
        prefix: "/api/v1",
    });
}
