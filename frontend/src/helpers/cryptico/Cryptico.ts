import { ICryptico } from './ICryptico';
import { ICrypticoDecryptedKey } from './ICrypticoDecryptedKey';
import { ICrypticoEncryptedKey } from './ICrypticoEncryptedKey';
const cryptico = require('cryptico-js');

export class Cryptico implements ICryptico {
    constructor() {
        this.private_key = cryptico.generateRSAKey(this.generate_secret(), 512);
        if (!this.private_key) {
            this.error = "Unable to generate Private-Key";
            return;
        }
        this.public_key = cryptico.publicKeyString(this.private_key);
        if (!this.public_key) {
            this.error = "Unable to generate Public-Key";
            return;
        }
    }

    public_key: string | null = null;
    private_key: string;
    error: string | null = null;

    decrypt(value: ICrypticoEncryptedKey): string {
        if (value.status !== "success")
            return "";
        const decrypted: ICrypticoDecryptedKey = cryptico.decrypt(value.cipher, this.private_key);
        if (decrypted.status === "success")
            return decrypted.plaintext;
        return "";
    }

    private generate_secret(): string {
        const SECRET_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let secret = "";
        for (let i = 0; i < 64; i++) {
            const randomNumber = Math.floor(Math.random() * SECRET_CHARS.length);
            secret += SECRET_CHARS.substring(randomNumber, randomNumber + 1);
        }
        return secret;
    }
}