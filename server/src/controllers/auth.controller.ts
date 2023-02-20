import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import AuthService from "../services/auth.service";

export default class AuthController {
    private readonly _serverInstance:FastifyInstance;
    private readonly _authService:AuthService;
    constructor(private readonly serverInstance:FastifyInstance) {
        this._serverInstance= this.serverInstance
        this._authService = new AuthService()
    }

    public async register(req: FastifyRequest, rep: FastifyReply){
        try {
        } catch (err) {
            rep.code(500).send({
                message: err,
            });
        }
    }
    public async login(req: FastifyRequest, rep: FastifyReply){
        try {
        } catch (err) {
            rep.code(500).send({
                message: err,
            });
        }
    }
    public async logout(req: FastifyRequest, rep: FastifyReply){
        try {
        } catch (err) {
            rep.code(500).send({
                message: err,
            });
        }
    }
}
