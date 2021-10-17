import * as generateApiKey from './GenerateApiKey';
import * as generateKey from './GeneratePublicKey';
import * as refreshToken from './RefreshTokenEndpoint';

export const endpoints = {
    refreshToken: refreshToken,
    generateKey: generateKey,
    generateApiKey: generateApiKey
}