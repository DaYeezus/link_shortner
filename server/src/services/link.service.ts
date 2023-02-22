import { LinkBodySchemaType, UrlSchemaType } from "../schemas/link.schema";
import { resolveSrv } from "dns";
import { jwtTokenSchemaType } from "../schemas/global.schema";
import { getServerJwt, getUserByToken } from "../utils/security";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { getServer } from "../app";
import { prismaClient } from "../utils/prisma";

import { getExpiresDate } from "../utils/date";

export abstract class LinkService {
  static async generateLink(
    { customName, url }: LinkBodySchemaType,
    token?: jwtTokenSchemaType
  ): Promise<string> {
    if (token) {
      const user = await getUserByToken(token);

      if (user.Plan === "Premium") {
        const newUrl = await prismaClient.link.create({
          data: {
            userId: user.id,
            destinyLink: customName
              ? customName +
                "-" +
                Math.floor(Math.random() * 1000000).toString()
              : user.email +
                "-" +
                Math.floor(Math.random() * 1000000).toString(),
            sourceLink: url,
            expiresIn: getExpiresDate(360),
          },
        });
        return newUrl.destinyLink;
      } else {
        const newUrl = await prismaClient.link.create({
          data: {
            userId: user.id,
            destinyLink: user.email + "-" + crypto.randomUUID(),
            sourceLink: url,
            expiresIn: getExpiresDate(30),
          },
        });
        return newUrl.destinyLink;
      }
    }
    const newUrl = await prismaClient.link.create({
      data: {
        destinyLink: crypto.randomUUID(),
        sourceLink: url,
        expiresIn: getExpiresDate(7),
      },
    });
    return newUrl.destinyLink;
  }
  static async defineLinkHost({
    url,
  }: {
    url: UrlSchemaType;
  }): Promise<string> {
    console.log(url);

    const existUrl = await prismaClient.link.findFirst({
      where: {
        sourceLink: url,
      },
    });
    if (!existUrl) {
      throw new Error("Invalid url");
    }
    return existUrl.destinyLink;
  }
}
