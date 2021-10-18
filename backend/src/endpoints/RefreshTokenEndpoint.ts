import { Jwt } from "../auth/jwt/Jwt";
import { User } from "../entities/User";

export const route = "/refresh_token";

export const endpoint = async (req, res) => {
    const token = req.cookies.lid;
    if (!token) {
        return res.send({ ok: false, accessToken: '' })
    }
    let payload: any = null;
    try {
        payload = await Jwt.verify_data(token);
    } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: '' });
    }
    // token is valid
    const user = await User.findOne({ id: payload.id });
    if (!user || user.jwt_version != payload.version) {
        return res.send({ ok: false, accessToken: '' });
    }
    await Jwt.send_refresh_token(res, await Jwt.generate_refresh_token(user));
    return res.send({ ok: true, accessToken: await Jwt.generate_access_token(user) });
}