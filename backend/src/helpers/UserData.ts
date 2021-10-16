import { createCipheriv, createDecipheriv, createHmac, randomBytes } from "crypto";
import { Field, ObjectType } from "type-graphql";
import { User } from "../entities/User";

@ObjectType()
class FindParams {
    @Field()
    username?: string;

    @Field()
    mail?: string;

    @Field()
    displayName?: string;
}

const HASH_KEY = "HELLOWORLDHELLOWORLDHELLOWORLD00"
const IV = randomBytes(8).toString('hex');

@ObjectType()
class UserData {
    @Field()
    id: string;

    @Field()
    username: string;

    @Field()
    mail: string;

    @Field()
    displayName: string;
}

export let users: UserData[] = [];
export const define = async () => {
    (await User.find()).forEach(u => {
        users.push({
            id: u.id,
            username: encrypt_local_personalized_data(u.username),
            mail: encrypt_local_personalized_data(u.mail),
            displayName: encrypt_local_personalized_data(u.displayName)
        })
    })
}

export const encrypt_local_personalized_data = (value: string): string => {
    if (!value)
        return null;    
    
    const cipher = createCipheriv('aes-256-ctr', HASH_KEY, IV)
    return Buffer.concat([cipher.update(value), cipher.final()]).toString('hex');
}
export const decrypt_local_personalized_data = (hash: string): string => {
    if (!hash)
        return null;    
    const decipher = createDecipheriv('aes-256-ctr', HASH_KEY, IV);
    return Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]).toString();
}

export const find = async (where: FindParams): Promise<UserData> => {
    if (where.mail) {
        return await users.find(u => u.mail == encrypt_local_personalized_data(where.mail));
    } else if (where.username) {
        return await users.find(u => u.username == encrypt_local_personalized_data(where.username));
    } else if (where.displayName) {
        return await users.find(u => u.displayName == encrypt_local_personalized_data(where.displayName));
    }
    return null;
}

export const findStartingWith = async (where: FindParams): Promise<|UserData[]> => {
    if (where.mail) {
        return await users.filter(u => decrypt_local_personalized_data(u.mail).startsWith(where.mail.toLowerCase()))
    } else if (where.username) {
        return await users.filter(u => decrypt_local_personalized_data(u.username).startsWith(where.username.toLowerCase()))
    } else if (where.displayName) {
        return await users.filter(u => decrypt_local_personalized_data(u.displayName).toLowerCase().startsWith(where.displayName.toLowerCase()))
    }
    return null;
}

export const add = (u: User) => {
    users.push({
        id: u.id,
        username: encrypt_local_personalized_data(u.username),
        mail: encrypt_local_personalized_data(u.mail),
        displayName: encrypt_local_personalized_data(u.displayName)
    });
}

export const update = async (user: User) => {
    users[await users.findIndex(u => u.id == user.id)] = {
        id: user.id,
        username: encrypt_local_personalized_data(user.username),
        mail: encrypt_local_personalized_data(user.mail),
        displayName: encrypt_local_personalized_data(user.displayName)
    };
}
export const remove = async (user_id: string) => {
    await users.splice(users.findIndex(u => u.id == user_id));
}