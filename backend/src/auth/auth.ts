import * as crypto from 'crypto';

const personalized_data_algorithm = 'aes-256-ctr';


export const encrypt_personalized_data = (value: string, key: string): string => {
    const cipher = crypto.createCipheriv(personalized_data_algorithm, process.env.PERSONALIZED_DATA_HASH_KEY, key)
    return Buffer.concat([cipher.update(value), cipher.final()]).toString('hex');
}

export const encrypt_personalized_key = (key: string): string => {
    const cipher = crypto.createCipheriv(personalized_data_algorithm, process.env.PERSONALIZED_SECRET_HASH_KEY, process.env.PERSONALIZED_SECRET_CRYPTO_KEY)
    return Buffer.concat([cipher.update(key), cipher.final()]).toString('hex');
}

export const decrypt_personalized_data = (hash: string, key: string): string => {    
    const decipher = crypto.createDecipheriv(personalized_data_algorithm, process.env.PERSONALIZED_DATA_HASH_KEY, key);
    return Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();
}

export const decrypt_personalized_key = (hash: string): string => {
    const decipher = crypto.createDecipheriv(personalized_data_algorithm, process.env.PERSONALIZED_SECRET_HASH_KEY, process.env.PERSONALIZED_SECRET_CRYPTO_KEY);
    return Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();
}