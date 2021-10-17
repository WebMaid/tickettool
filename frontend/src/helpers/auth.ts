import * as crypto from 'crypto';

export const encrypt_with_rsa_public_key = (value: string, public_key: string) => {
    var buffer = Buffer.from(value);
    var encrypted = crypto.publicEncrypt(public_key, buffer);
    return encrypted.toString("base64");
};