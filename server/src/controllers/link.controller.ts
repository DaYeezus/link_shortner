import {FastifyReply, FastifyRequest} from "fastify";

export class LinkController {
    async generateLink(req:FastifyRequest , rep:FastifyReply) {
        try{

        }catch (err:any){
            rep.status(500).send({
                message:err.message
            })
        }
    }
    async redirect(req:FastifyRequest , rep:FastifyReply) {
        try{

        }catch (err:any){
            rep.status(500).send({
                message:err.message
            })
        }
    }

}
