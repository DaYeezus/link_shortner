import { compare, genSalt, hash } from "bcrypt";
import { getServer } from "../app";
import { User } from "@prisma/client";
import { prismaClient } from "./prisma";
import { DecodeCallback, DecodePayloadType, JWT } from "@fastify/jwt";
import { FastifyRequest } from "fastify";

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
  const user: User | null = await prismaClient.user.findUnique({
    where: { id: Number(decoded.id) },
  });
  if (!user) throw new Error("Invalid token");
  return user;
}

export function getTokenFromHeader(req: FastifyRequest) {
  const authorization = req.headers.authorization;
  return authorization?.split("Bearer")[1]?.trim();
}
