import { LinkBodySchemaType } from "../schemas/link.schema";
import { resolveSrv } from "dns";
import { jwtTokenSchemaType } from "../schemas/global.schema";
import { getServerJwt, getUserByToken } from "../utils/security";
import { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { getServer } from "../app";
import { prismaClient } from "../utils/prisma";

export abstract class LinkService {
  static async generateLink(
    url: LinkBodySchemaType,
    token?: jwtTokenSchemaType,
    customName?: string
  ): Promise<string> {
    const date = new Date();
    if (token) {
      const { isPremium, user } = await this.isPremiumLink(token);
      // !generate premium link
      if (isPremium) {
        const newUrl = await prismaClient.link.create({
          data: {
            userId: user.id,
            destinyLink: url,
            sourceLink: customName
              ? customName + Math.floor(Math.random() * 100).toString()
              : user.email + Math.floor(Math.random() * 100).toString(),
            expiresIn: date.setDate(date.getDate() + 365).toString(),
          },
        });
        return newUrl.destinyLink;
      } else {
        const newUrl = await prismaClient.link.create({
          data: {
            userId: user.id,
            destinyLink: url,
            sourceLink: user.email + Math.floor(Math.random() * 100).toString(),
            expiresIn: date.setDate(date.getDate() + 30).toString(),
          },
        });
        return newUrl.destinyLink;
      }
    }
    const newUrl = await prismaClient.link.create({
      data: {
        destinyLink: url,
        sourceLink: Math.floor(Math.random() * 1000000).toString(),
        expiresIn: date.setDate(date.getDate() + 7).toString(),
      },
    });
    return newUrl.destinyLink;
  }
  static async defineLinkHost(url: LinkBodySchemaType): Promise<string> {
    const jwt = await getServerJwt();
    const urlJwt = url.split(process.env.BASE_URL + "/")[1];
    if (!urlJwt) throw new Error("invalid url");
    const urlOriginalPath = jwt.decode(url);
    return url;
  }
  static async isPremiumLink(token: string): Promise<isPremiumLink> {
    const user = await getUserByToken(token);
    return {
      isPremium: user.Plan === "Premium",
      user,
    };
  }
}

interface isPremiumLink {
  isPremium: boolean;
  user: User;
}
