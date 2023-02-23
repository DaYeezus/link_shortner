import {FastifyReply, FastifyRequest} from "fastify";
import AuthService from "../services/auth.service";
import {
  forgotPasswordBodyType,
  loginSchemaType,
  registerSchemaType,
  resetPasswordBodyType,
} from "../schemas/auth.schema";
import {jwtTokenSchema, jwtTokenSchemaType} from "../schemas/global.schema";

export default class AuthController {
    async register(req: FastifyRequest, rep: FastifyReply) {
        try {
            const bodyData = req.body as registerSchemaType;
            await AuthService.register(bodyData);
            return rep.status(200).send({
                message: "Registered successfully",
            });
        } catch (err: any) {
            rep.code(500).send({
                error: err?.message,
            });
        }
    }

    async login(req: FastifyRequest, rep: FastifyReply) {
        try {
            const bodyData = req.body as loginSchemaType;
            const userId = await AuthService.login(bodyData);
            const token = req.server.jwt.sign({id: userId.toString()});
            return rep.status(200).send({
                message: "Registered successfully",
                token,
            });
        } catch (err: any) {
            rep.code(500).send({
                error: err?.message,
            });
        }
    }

    async forgetPassword(req: FastifyRequest, rep: FastifyReply) {
        try {
            const bodyData = req.body as forgotPasswordBodyType;

            await AuthService.forgotPassword(bodyData, req.server.jwt);
            return rep.status(200).send({
                message: "Check your email inbox we have sent you a link",
            });
        } catch (err: any) {
            rep.code(500).send({
                error: err?.message,
            });
        }
    }

    async resetPassword(req: FastifyRequest, rep: FastifyReply) {
        try {
            const bodyData = req.body as resetPasswordBodyType;
            const {token} = req.query as { token: jwtTokenSchemaType };
            await jwtTokenSchema.parseAsync(token);
            await AuthService.resetPassword(bodyData, token, req.server.jwt);
            return rep.status(200).send({
                message: "Your password has been reset",
            });
        } catch (err: any) {
            rep.code(500).send({
                error: err?.message,
            });
        }
    }
}
