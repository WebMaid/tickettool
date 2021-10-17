import { url } from "inspector";
import { HttpMethodEnum, HttpProtcolEnum, Settings, WebsocketProtcolEnum } from "./helpers/settings";

export const settings: Settings = {
    protocol: {
        http: HttpProtcolEnum.INSECURE,
        websocket: WebsocketProtcolEnum.INSECURE
    },
    backend: {
        port: 3001,
        address: '127.0.0.1',
        api: {
            route: '/graphql',
            url: ""
        },
        subscription: {
            route: '/graphql',
            url: ""
        },
        refresh_token: {
            route: '/refresh_token',
            url: "",
            method: HttpMethodEnum.POST
        },
        generate_key: {
            route: '/generate_key',
            url: "",
            method: HttpMethodEnum.POST
        },
        generate_api_key: {
            route: '/generate_api_key',
            url: "",
            method: HttpMethodEnum.POST
        }
    }
};

const backend_url = `${settings.backend.address}:${settings.backend.port}`;
const http_url = `${settings.protocol.http}://${backend_url}`
const ws_url = `${settings.protocol.websocket}://${backend_url}`

settings.backend.api.url = `${http_url}${settings.backend.api.route}`;
settings.backend.subscription.url = `${ws_url}${settings.backend.subscription.route}`;
settings.backend.refresh_token.url = `${http_url}${settings.backend.refresh_token.route}`;
settings.backend.generate_key.url = `${http_url}${settings.backend.generate_key.route}`;
settings.backend.generate_api_key.url = `${http_url}${settings.backend.generate_api_key.route}`;