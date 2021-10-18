import { Request, Response } from "express";
import { Rsa } from "../auth/rsa/Rsa";
import { ApiKey } from "../entities/ApiKey";
import { User } from "../entities/User";
import { ServerError } from "../helpers/ServerError";

export const route = "/generate_api_key";

interface ResponseData {
    api_key: string,
    error: ServerError | null
}

export const endpoint = async (req: Request, res: Response) => {
    let data: ResponseData = {
        api_key: "",
        error: {
            name: "Internal Server Error",
            message: "Something at the server side went wrong!"
        }
    }
    if (req?.body?.public_key && req.body.user) {
        try {
            const u = await User.findOne(req.body.user);
            if (!u) {
                return res.send(data);
            }
            const key = await ApiKey.generate(u.id);
            await ApiKey.insert(new ApiKey(key, u.id))
            data = {
                api_key: Rsa.encrypt(key, req.body.public_key),
                error: null
            }
        } catch (err) {
            console.log(err);
        }
    }
    return res.send(data);
}