import { generateKeyPair } from "crypto";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, LessThan, PrimaryGeneratedColumn } from "typeorm";
import { decrypt_private_key, encrypt_private_key } from "../auth/auth";
import { ServerError } from "../helpers/ServerError";

@ObjectType()
class ClientKeyParams {
  @Field(() => ID)
  client_id: string;

  @Field()
  public_key: string;

  @Field()
  error: ServerError;
}
@ObjectType()
@Entity()
export class Client extends BaseEntity {

  constructor(key: string) {
    super();
    this.private_key = key;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar', length: 2048, transformer: {
      to: (value: string) => encrypt_private_key(value),
      from: (value) => decrypt_private_key(value),
    }
  })
  private_key: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  static async generateKey(): Promise<ClientKeyParams> {
    return new Promise((resolve, reject) => {
      generateKeyPair('rsa', {
        modulusLength: 512,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: process.env.PRIVATE_KEY_PASSPHRASE
        }
      }, async (err, publicKey, privateKey) => {
        if (err) {
          console.log(err);
          return resolve({
            client_id: null,
            public_key: null,
            error: {
              name: "Internal Server Error",
              message: "Something went wrong on the serverside, please try again"
            }
          });
        }
        try {
          await Client.deleteOldRows();
          const insert = await Client.insert(new Client(privateKey));
          const client_id = insert.identifiers[0].id;
          return resolve({
            client_id: client_id,
            public_key: publicKey,
            error: null
          });
        } catch (err) {
          console.log(err);
          return resolve({
            client_id: null,
            public_key: null,
            error: {
              name: "Internal Server Error",
              message: "Something went wrong on the serverside, please try again"
            }
          });
        }
      });
    });
  }
  static async deleteOldRows() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 1);
    const clients = await Client.find({ where: { created_at: LessThan(now) } })
    await Client.remove(clients);
  }
}
