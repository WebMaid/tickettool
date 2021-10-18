import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { decrypt_access_key, encrypt_access_key, generate_random_secret, hash_password } from "../auth/auth";
import { Jwt } from "../auth/jwt/Jwt";
import { User } from "./User";

@ObjectType()
@Entity()
export class ApiKey extends BaseEntity {

    constructor(key, owner_id) {
        super();
        this.note = "test";
        this.key = hash_password(key);
        this.owner_id = owner_id
    }

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'varchar', length: 64, nullable: false })
    note: string;

    @Field()
    @Column({
        type: 'varchar', length: 768, nullable: false, transformer: { // original 256
            to: (value: string) => encrypt_access_key(value),
            from: (value: string) => value
        }
    })
    key: string;

    @Field(() => Date, { nullable: true })
    @Column({ type: "timestamp", nullable: true, default: null })
    last_use: Date;

    @Field(() => Date, { nullable: true })
    @Column({ type: "timestamp", nullable: true, default: null })
    expires: Date;

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updated_at: Date;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: true, default: null })
    owner_id: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(type => User, u => u.api_keys)
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    // scopes

    public static async check(user_id: string, token: string): Promise<boolean> {
        try {
            const keys = await ApiKey.find({ where: { owner_id: user_id } });
            if (keys.length === 0) {
                return false;
            }
            for (let i = 0; i < keys.length; i++) {
                if (decrypt_access_key(keys[i].key) == hash_password(token)) {
                    return true;
                }
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public static async generate(user_id) {
        const secret = generate_random_secret(128);
        return await Jwt.generate_api_key(user_id, hash_password(secret));
    }
}