import {FastifyInstance} from "fastify";
import {UserController} from "../controllers/user.controller";
import {isAuthenticated} from "../utils/security";
import {resetPasswordRouterSchema} from "../schemas/auth.schema";
import {changePasswordRouterSchema} from "../schemas/user.schema";

export async function userRoute(fastify: FastifyInstance) {
    const userController = new UserController();
    fastify.addHook("preHandler", isAuthenticated);
    fastify.post("/change-password" , {schema:changePasswordRouterSchema}, userController.changePassword);
    fastify.post("/update-account" , {schema:changePasswordRouterSchema}, userController.updateAccount);
    fastify.get("/all-links" , userController.getAllLinks);

}
