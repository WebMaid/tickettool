import { createCipheriv, createDecipheriv, createHmac } from "crypto";

export class ApiKeyAuth {
    static algoritm = 'aes-256-ctr';
    static hash_algoritm = 'sha512'

    static decrypt_api_key(hash: string): string {
        const decipher = createDecipheriv(this.algoritm, process.env.API_ACCESSTOKEN_HASH_KEY, process.env.API_ACCESSTOKEN_CRYPTO_KEY);
    return Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();
    }
    static encrypt_api_key(key: string): string {
        const cipher = createCipheriv(this.algoritm, process.env.API_ACCESSTOKEN_HASH_KEY, process.env.API_ACCESSTOKEN_CRYPTO_KEY)
        return Buffer.concat([cipher.update(key), cipher.final()]).toString('hex');
    }
    static hash_api_key(key: string): string {
        if (!key) {
            return null;
        }
        return createHmac(this.hash_algoritm, process.env.API_KEY_HASH_KEY!)
            .update(key)
            .digest('hex')
    }
}