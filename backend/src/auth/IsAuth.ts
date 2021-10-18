import { MiddlewareFn } from "type-graphql";
import { ApiKey } from "../entities/ApiKey";
import { ServerContext } from "../ServerContext";
import { Jwt } from "./jwt/Jwt";
import { JwtTypeEnum } from "./jwt/JwtTypeEnum";


export const isAuth: MiddlewareFn<ServerContext> = async ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
        context.payload = {
            id: null,
            error: {
                name: "Not authenticated",
                message: "Please authenticate with a key"
            }
        };
        return next();
    }
    try {
        const token = authorization.split(" ")[1];
        const payload: any = await Jwt.verify_data(token);
        if (payload.type == JwtTypeEnum.API_KEY) {
            if (!await ApiKey.check(payload.id, token)) {
                context.payload = {
                    id: null,
                    error: {
                        name: "Invalid Api-Key",
                        message: "The used api-key is expired or invalid!"
                    }
                };
                return next();
            }
        }
        context.payload = { id: payload.id };
    } catch (err) {
        // console.log(err);
        context.payload = {
            id: null,
            error: {
                name: "Invalid Key",
                message: "Please authenticate with a valid api-key"
            }
        };
    }

    return next();
}