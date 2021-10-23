/*import { Request, Response } from "express";
import { ICrypticoEncryptedKey, Rsa } from "../auth/rsa/Rsa";
import { ApiKey } from "../entities/ApiKey";
import { User } from "../entities/User";
import { ServerError } from "../helpers/ServerError";

export const route = "/generate_api_key";

interface GenerateApiKeyResponse {
    api_key?: ApiKey,
    secret?: ICrypticoEncryptedKey,
    error?: ServerError | null
}

export const endpoint = async (req: Request, res: Response) => {
    let data: GenerateApiKeyResponse = {
        error: {
            name: "Internal Server Error",
            message: "Something at the server side went wrong!"
        }
    }
    if (req?.body?.public_key && req.body.user && req.body.note) {
        try {
            const u = await User.findOne(req.body.user);
            if (!u) {
                return res.send(data);
            }
            const key = await ApiKey.generate(u.id);
            const inKey = await ApiKey.insert(new ApiKey(req.body.note, key, u.id))
            const ak = await ApiKey.findOne({where: {id: inKey.identifiers[0].id}, relations: ["scopes"]});
            data = {
                api_key: ak,
                secret: Rsa.encrypt(key, req.body.public_key),
                error: null
            }
        } catch (err) {
            console.log(err);
        }
    }
    return res.send(data);
}
*/