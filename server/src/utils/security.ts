import {compare, genSalt, hash} from "bcrypt";
import {getServer} from "../app";
import {User} from "@prisma/client";
import {prismaClient} from "./prisma";
import {JWT} from "@fastify/jwt";
import {FastifyError, FastifyReply, FastifyRequest} from "fastify";

export async function hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
}

export async function comparePassword(
    password: string,
    hashedPass: string
): Promise<boolean> {
    return await compare(password, hashedPass);
}

export async function getServerJwt(): Promise<JWT> {
    const server = await getServer();
    return server.jwt;
}

export async function getUserByToken(token: string): Promise<User> {
    const jwt = await getServerJwt();
    const decoded: {
        id: string;
        iat: number;
        exp: number;
    } | null = jwt.decode(token);
    if (!decoded) throw new Error("Invalid token");
    const user = await prismaClient.user.findUnique({
        where: {id: Number(decoded.id)},
        select:{
            id:true,
            email:true,
            Role:true,
            Plan:true
        }
    });
    if (!user) throw new Error("Invalid token");
    return user as User;
}

export function getTokenFromHeader(req: FastifyRequest) {
    const authorization = req.headers.authorization;
    return authorization?.split("Bearer")[1]?.trim();
}

export async function isAuthenticated(
    req: FastifyRequest,
    rep: FastifyReply,
    done: (err?: FastifyError) => void
): Promise<void> {
    try {
        const token = getTokenFromHeader(req);
        if (!token)
            return rep.status(401).send({
                message: "Please login fist",
            });
        const user = await getUserByToken(token)
        if (!user) {
            return rep.status(401).send({
                message: "Please login fist",
            });
        }
        req.user =user
        done();
    } catch (err: any) {
        return rep.status(401).send({
            message: err?.message,
        });
    }
}
