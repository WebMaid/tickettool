import { createHmac } from "crypto";
import { Response } from "express";
import { sign, SignOptions, verify } from "jsonwebtoken";
import { User } from "../../entities/User";
import {
  AccessTokenData,
  ApiKeyData,
  RefreshTokenData,
} from "./JwtObjectTypes";
import { JwtTypeEnum } from "./JwtTypeEnum";

export class Jwt {
  static async verify_data(token: string) {
    if (!token || !token.includes(".")) throw new Error("invalid token");
    const body = token.split(".")[1];
    const data: ApiKeyData | AccessTokenData | RefreshTokenData = JSON.parse(
      Buffer.from(body, "base64").toString("ascii")
    );
    if (!data) throw new Error("invalid token");
    const hashedSecret = this.generate_hashed_secret(data.id, data.type);
    return verify(token, hashedSecret);
  }

  static async sign_data(
    data: AccessTokenData | RefreshTokenData | ApiKeyData,
    options: SignOptions = {},
    type: JwtTypeEnum = JwtTypeEnum.ACCESS_TOKEN
  ): Promise<string> {
    const hashedSecret = this.generate_hashed_secret(data.id, type);
    options.algorithm = "HS512";
    data.type = type;
    return sign(data, hashedSecret, options);
  }

  private static generate_hashed_secret(id: string, type: JwtTypeEnum): string {
    switch (type) {
      case JwtTypeEnum.ACCESS_TOKEN:
        return createHmac("sha512", process.env.REFRESH_TOKEN_SECRET!)
          .update(id)
          .digest("base64");
      case JwtTypeEnum.REFRESH_TOKEN:
        return createHmac("sha512", process.env.ACCESS_TOKEN_SECRET!)
          .update(id)
          .digest("base64");
      case JwtTypeEnum.API_KEY:
        return createHmac("sha512", process.env.API_KEY_SECRET!)
          .update(id)
          .digest("base64");
    }
  }

  static async generate_access_token(user: User): Promise<string> {
    return await this.sign_data({ id: user.id }, { expiresIn: "15m" });
  }

  static async generate_refresh_token(user: User): Promise<string> {
    return await this.sign_data(
      { id: user.id, version: user.jwt_version },
      { expiresIn: "7d" },
      JwtTypeEnum.REFRESH_TOKEN
    );
  }

  static async generate_api_key(
    user_id: string,
    secret: string,
    expires_in: string
  ): Promise<string> {
    return await this.sign_data(
      { id: user_id, secret: secret },
      { expiresIn: expires_in },
      JwtTypeEnum.API_KEY
    );
  }

  static send_refresh_token = (res: Response, token: string): void => {
    res.cookie("lid", token, {
      httpOnly: true,
    });
  };
}
