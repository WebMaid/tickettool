import * as crypto from 'crypto';
import { createHmac } from 'crypto';
import { PersonalizedEncryption } from './encryption/PersonalizedEncryption';

const ENCRYPTION_ALGORITHM = 'aes-256-ctr';
const PASSWORD_HASH_ALGORITHM = "sha512"

export const SECRET_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()[]{}/+-_:.;,£àÀÉéÈè°ç\"<>`?'´=¬|¢~ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const encrypt_private_key = (key: string): string => {
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, process.env.PRIVATE_KEY_HASH_KEY, process.env.PRIVATE_KEY_CRYPTO_KEY)
    return Buffer.concat([cipher.update(key), cipher.final()]).toString('hex');
}

export const decrypt_private_key = (hash: string): string => {
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, process.env.PRIVATE_KEY_HASH_KEY, process.env.PRIVATE_KEY_CRYPTO_KEY);
    return Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();
}

export const verify_password = (to_check: string, original: string, decrypt_key: string): boolean => {
    if (!decrypt_key) {
        return false;
    }
    return hash_password(to_check) == PersonalizedEncryption.decrypt_data(original, PersonalizedEncryption.decrypt_key(decrypt_key));
}

export const hash_password = (password: string): string => {
    if (password == undefined) {
        return null;
    }
    return createHmac(PASSWORD_HASH_ALGORITHM, process.env.PASSWORD_HASH_KEY!)
        .update(password)
        .digest('hex')
}

export const generate_random_secret = (lenght: number): string => {
    let password = "";
    for (let i = 0; i < lenght; i++) {
        const randomNumber = Math.floor(Math.random() * SECRET_CHARS.length);
        password += SECRET_CHARS.substring(randomNumber, randomNumber + 1);
    }
    return password;
}