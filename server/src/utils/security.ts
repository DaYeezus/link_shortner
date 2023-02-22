import { compare, genSalt, hash } from "bcrypt";
import { getServer } from "../app";
import { User } from "@prisma/client";
import { prismaClient } from "./prisma";
import { JWT } from "@fastify/jwt";

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
  const email = jwt.decode(token);
  if (!email) throw new Error("Invalid token");
  const user: User | null = await prismaClient.user.findFirst({
    where: { email },
  });
  if (!user) throw new Error("Invalid token");
  return user;
}

