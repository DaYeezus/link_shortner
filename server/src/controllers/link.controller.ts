import {FastifyReply, FastifyRequest} from "fastify";
import {LinkBodySchemaType, UrlSchemaType} from "../schemas/link.schema";
import {LinkService} from "../services/link.service";
import {getTokenFromHeader} from "../utils/security";

export class LinkController {
    async generateLink(req: FastifyRequest, rep: FastifyReply) {
        try {
            const bodyData = req.body as LinkBodySchemaType;
            const token = getTokenFromHeader(req);
            const newURl = await LinkService.generateLink(bodyData, token);
            return rep.status(200).send({
                newURl,
            });
        } catch (err: any) {
            rep.status(500).send({
                error: err?.message,
            });
        }
    }

    async redirect(req: FastifyRequest, rep: FastifyReply) {
        try {
            const body = req.body as { url: UrlSchemaType };
            const destiny = await LinkService.defineLinkHost({url: body.url});
            rep.redirect(200, destiny);
        } catch (err: any) {
            rep.status(500).send({
                error: err?.message,
            });
        }
    }
}
