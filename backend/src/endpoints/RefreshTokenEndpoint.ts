export const route = "/refresh_token";

export const endpoint = async (req, res) => {
    // TODO: Implement refresh-token-endpoint
    //const token = req.cookies.lid;
    /*if (!token) {
        return res.send({ok: false, accessToken: ''})
    }
    let payload: any = null;
    try {
        payload = await verifyDataJWT(token, true);
    } catch (err) {
        console.log(err);
        return res.send({ok: false, accessToken: ''});
    }
    // token is valid
    const user = await User.findOne({id: payload.sub});
    
    if (!user || user.jwt_version != payload.version) {
        return res.send({ok: false, accessToken: ''});
    }
    await sendRefreshToken(res, await generateRefreshToken(user));
    return res.send({ok: true, accessToken: await generateAccessToken(user)});*/
    return res.send({ ok: true });
}