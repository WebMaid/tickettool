import { createCipheriv, createDecipheriv } from "crypto";

export abstract class PersonalizedEncryption {
  static algorithm = "aes-256-ctr";

  static encrypt_key(key: string): string {
    if (!key) {
      console.log("Error: Encrypt-Key is invalid");
      return "";
    }
    const cipher = createCipheriv(
      this.algorithm,
      process.env.PERSONALIZED_SECRET_HASH_KEY,
      process.env.PERSONALIZED_SECRET_CRYPTO_KEY
    );
    return Buffer.concat([cipher.update(key), cipher.final()]).toString("hex");
  }

  static decrypt_key(hash: string): string {
    if (!hash) {
      console.log("Error: Decrypt-Hash is invalid");
      return null;
    }
    const decipher = createDecipheriv(
      this.algorithm,
      process.env.PERSONALIZED_SECRET_HASH_KEY,
      process.env.PERSONALIZED_SECRET_CRYPTO_KEY
    );
    return Buffer.concat([
      decipher.update(Buffer.from(hash, "hex")),
      decipher.final(),
    ]).toString();
  }
}
