import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiKeyAuth } from "../auth/api/ApiKey";
import { generate_random_secret } from "../auth/auth";
import { Jwt } from "../auth/jwt/Jwt";
import { ApiScopeInput } from "../input-types/ApiScopeInput";
import { ApiScope } from "./ApiScope";
import { User } from "./User";
@ObjectType()
@Entity()
export class ApiKey extends BaseEntity {

    constructor(note: string, expire_date: Date, key: string, owner_id: string, scopes?: ApiScope[]) {
        super();
        this.note = note;
        this.key = ApiKeyAuth.hash_api_key(key);
        this.expires = expire_date;
        this.owner_id = owner_id;
        this.scopes = scopes ?? null;
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
            to: (value: string) => ApiKeyAuth.encrypt_api_key(value),
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

    @Field(() => [ApiScope], {nullable: true, defaultValue: null})
    @ManyToMany(type => ApiScope, as => as.keys)
    @JoinTable({ name: 'api_key_scope', inverseJoinColumn: { name: 'key_id', referencedColumnName: 'id' }, joinColumn: { name: 'scope_id', referencedColumnName: 'id' } })
    scopes: ApiScope[];

    public static async check(user_id: string, token: string): Promise<boolean> {
        try {
            const keys = await ApiKey.find({ where: { owner_id: user_id } });
            if (keys.length === 0) {
                return false;
            }
            for (let i = 0; i < keys.length; i++) {
                if (ApiKeyAuth.decrypt_api_key(keys[i].key) == ApiKeyAuth.hash_api_key(token)) {
                    return true;
                }
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    public static async generate(user_id, expires_in) {
        const secret = generate_random_secret(128);
        return await Jwt.generate_api_key(user_id, ApiKeyAuth.hash_api_key(secret), expires_in);
    }

    static async exists(id: string): Promise<boolean> {
        return (await ApiKey.findOne(id)) != null;
    }
}