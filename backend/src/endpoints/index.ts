import * as generateKey from './GeneratePublicKey';
import * as refreshToken from './RefreshTokenEndpoint';
import * as generateApiKey from './GenerateApiKey';

export const endpoints = {
    refreshToken: refreshToken,
    generateKey: generateKey,
    generateApiKey: generateApiKey
}