let accessToken: string = "";

export const setAccessToken = (newAccessToken: string) => {
    accessToken = newAccessToken
}

export const getAccessToken = (): string => {
    return accessToken
}