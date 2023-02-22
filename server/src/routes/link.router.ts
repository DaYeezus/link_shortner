import {FastifyInstance} from "fastify";
import {LinkController} from "../controllers/link.controller";
import {LinkRouterSchema} from "../schemas/link.schema";


export async function linkRouter(fastify: FastifyInstance) {
    const linkController = new LinkController()
    fastify.post("/generate" , {schema:LinkRouterSchema} , linkController.generateLink)
    fastify.post("/redirect", {schema:LinkRouterSchema} , linkController.redirect)
}
