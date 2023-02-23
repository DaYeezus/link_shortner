import {FastifyReply, FastifyRequest} from "fastify";
import {resetPasswordBodyType} from "../schemas/auth.schema";
import AuthService from "../services/auth.service";
import {UserService} from "../services/user.service";
import {User} from "@prisma/client";

export class UserController {
    async changePassword(req: FastifyRequest, rep: FastifyReply) {
        try{
            const {password} = req.body as resetPasswordBodyType
            await UserService.resetPassword(password,req.user as User)
            return rep.send({
                message: "password changed successfully",
            });
        }catch (err:any){
            rep.status(500).send({
                error:err?.message
            })
        }
    }
    async updateAccount(req: FastifyRequest, rep: FastifyReply) {
        try{

        }catch (err:any){
            rep.status(500).send({
                error:err?.message
            })
        }
    }
    async getAllLinks(req: FastifyRequest, rep: FastifyReply) {
        try{
            const links = await UserService.getUserLinks(req.user as User)
            return rep.status(200).send({
                links
            })

        }catch (err:any){
            rep.status(500).send({
                error:err?.message
            })
        }
    }
}
