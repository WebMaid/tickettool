import { privateDecrypt, publicEncrypt } from "crypto";

const cryptico = require('cryptico-js')

export class Rsa {
    static encrypt(value: string, public_key: string): string {
        return cryptico.encrypt(value, public_key);
    };
    
    static decrypt (hash: string, private_key: string): string {
        try {
            var buffer = Buffer.from(hash, "base64");
            var decrypted = privateDecrypt({
                key: private_key.toString(),
                passphrase: process.env.PRIVATE_KEY_PASSPHRASE,
            }, buffer);
            return decrypted.toString("utf8");
        } catch (err) {
            return "";
        }
    };
}