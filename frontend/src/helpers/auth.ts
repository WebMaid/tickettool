import * as crypto from 'crypto';
const cryptico = require('cryptico-js');

export const encrypt_with_rsa_public_key = (value: string, public_key: string) => {
  var buffer = Buffer.from(value);
  var encrypted = crypto.publicEncrypt(public_key, buffer);
  return encrypted.toString("base64");
};

export const decrypt_with_rsa_private_key = (hash: string, private_key: string): string => {
  try {
    var buffer = Buffer.from(hash, "base64");
    var decrypted = crypto.privateDecrypt({
      key: private_key.toString(),
      passphrase: process.env.PRIVATE_KEY_PASSPHRASE,
    }, buffer);
    return decrypted.toString("utf8");
  } catch (err) {
    return "";
  }
};

interface RsaKeys {
  public_key: string | null;
  private_key: string | null;
}

export const generateRsaKeys = (password: string = ""): RsaKeys => {
  if (password === "") {
    password = "HELLOWORLD";
  }
  const privateKey = cryptico.generateRSAKey(password, 512);
  const publicKey = cryptico.publicKeyString(privateKey);
  return {
    public_key: publicKey,
    private_key: privateKey
  }
}

const SECRET_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()[]{}/+-_:.;,£àÀÉéÈè°ç\"<>`?'´=¬|¢~ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generate_random_secret = (lenght: number): string => {
  let password = "";
  for (let i = 0; i < lenght; i++) {
    const randomNumber = Math.floor(Math.random() * SECRET_CHARS.length);
    password += SECRET_CHARS.substring(randomNumber, randomNumber + 1);
  }
  return password;
}