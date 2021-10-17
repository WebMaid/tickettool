import { generate_access_token, generate_refresh_token, send_refresh_token, verify_data_jwt } from "../auth/auth";
import { User } from "../entities/User";

export const route = "/refresh_token";

export const endpoint = async (req, res) => {
    const token = req.cookies.lid;
    if (!token) {
        return res.send({ ok: false, accessToken: '' })
    }
    let payload: any = null;
    try {
        payload = await verify_data_jwt(token);
    } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: '' });
    }
    // token is valid
    const user = await User.findOne({ id: payload.id });
    if (!user || user.jwt_version != payload.version) {
        return res.send({ ok: false, accessToken: '' });
    }
    await send_refresh_token(res, await generate_refresh_token(user));
    return res.send({ ok: true, accessToken: await generate_access_token(user) });
}