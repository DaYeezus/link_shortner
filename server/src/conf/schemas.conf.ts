import {FastifyInstance} from "fastify";
import {registerSchema} from "../schemas/auth.schema";

export default function (server:FastifyInstance) {
    server.addSchema(registerSchema)
}
