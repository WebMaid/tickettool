import { Client } from "../entities/Client";

export const route = "/generate_key";

export const endpoint = async (req, res) => {
    return res.send(
        await Client.generateKey()
    );
}