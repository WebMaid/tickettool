let accessToken: string = "";

export const setAccessToken = (newAccessToken: string) => {
    accessToken = newAccessToken
}

export const getAccessToken = (): string => {
    return accessToken
}

export const getUserId = (): string => {
    if (!accessToken || !accessToken.includes(".")) {
        return "";
    }
    try {
        const body = accessToken.split(".")[1]
        const buffer = Buffer.from(body, 'base64');
        const json = JSON.parse(buffer.toString('ascii'));
        if (json?.id) {
            return json.id;
        }
    } catch (err) {
        console.log(err);
    }
    return "";
}