export enum WebsocketProtcolEnum {
    SECURE = 'wss',
    INSECURE = 'ws'
}

export enum HttpProtcolEnum {
    SECURE = 'https',
    INSECURE = 'http'
}

export enum HttpMethodEnum {
    POST = 'post',
    GET = 'get'
}

interface ProtocolSettings {
    http: HttpProtcolEnum;
    websocket: WebsocketProtcolEnum;
}

interface ApiEndpointSettings {
    route: string;
    url: string;
}

interface CustomEndpointSettings {
    route: string;
    url: string;
    method: HttpMethodEnum
}

interface BackendSettings {
    port: number;
    address: string;
    api: ApiEndpointSettings;
    subscription: ApiEndpointSettings;
    refresh_token: CustomEndpointSettings;
    generate_key: CustomEndpointSettings;
    generate_api_key: CustomEndpointSettings;
}

export interface Settings {
    protocol: ProtocolSettings;
    backend: BackendSettings;
}