import { ICrypticoEncryptedKey } from "./ICrypticoEncryptedKey";

export interface ICryptico {
    private_key: string;
    public_key: string|null;
    error: string|null;

    decrypt(value: ICrypticoEncryptedKey, private_key: string): string;
}