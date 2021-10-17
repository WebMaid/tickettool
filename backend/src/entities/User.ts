import { randomBytes } from "crypto";
import { Field, ObjectType } from "type-graphql";
import { AfterInsert, AfterLoad, AfterUpdate, BaseEntity, BeforeInsert, BeforeRemove, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { decrypt_personalized_data, decrypt_personalized_key, encrypt_personalized_data, encrypt_personalized_key, generate_random_secret, hash_password } from "../auth/auth";
import * as helper from '../helpers/UserData';
import { ApiKey } from "./ApiKey";
import { Department } from "./Department";
import { Permission } from "./Permission";
import { Role } from "./Role";
import { Ticket } from "./Ticket";
import { TicketComment } from "./TicketComment";
import { TicketHistory } from "./TicketHistory";
import { TicketTemplate } from "./TicketTemplate";
import { UserSetting } from "./UserSetting";


let key = "";


@ObjectType()
@Entity()
export class User extends BaseEntity {

    constructor(username: string, displayName: string, mail: string,
        password: string, department_id: string, phoneNumber?: string) {
        super();
        this.username = username;
        this.displayName = displayName;
        this.mail = mail;
        this.password = hash_password(password ?? "");
        this.department_id = department_id;
        this.phoneNumber = phoneNumber ?? null;
    }

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({
        type: 'varchar', length: 96, nullable: true, transformer: {  // original 32
            to: (value: string) => encrypt_personalized_data(value.toLowerCase(), key),
            from: (value: string) => value
        }
    })
    username: string;

    @Field()
    @Column({
        type: 'varchar', length: 192, nullable: true, transformer: {  // original 64
            to: (value: string) => encrypt_personalized_data(value, key),
            from: (value: string) => value
        }
    })
    displayName: string;

    @Field()
    @Column({
        type: 'varchar', length: 192, nullable: false, unique: true, transformer: { // original 64
            to: (value: string) => encrypt_personalized_data(value.toLowerCase(), key),
            from: (value: string) => value
        }
    })
    mail: string;

    @Column({
        type: 'varchar', length: 768, nullable: false, transformer: { // original 256
            to: (value: string) => encrypt_personalized_data(value, key),
            from: (value: string) => value
        }
    })
    password: string;

    @Field()
    @Column({
        type: 'varchar', length: 48, nullable: true, unique: true, transformer: { // original 16
            to: (value: string) => encrypt_personalized_data(value, key),
            from: (value: string) => value
        }
    })
    phoneNumber: string;

    @Column({
        type: 'varchar', length: 384, nullable: true, transformer: { // original 128
            to: (value: string) => encrypt_personalized_data(value, key),
            from: (value: string) => value
        }
    })
    two_factor_secret: string;

    @Column({
        type: 'varchar', length: 384, nullable: false, transformer: { // original 128
            to: (value: string) => encrypt_personalized_data(value, key),
            from: (value: string) => value
        }
    })
    jwt_secret: string;

    @Column("int", { default: 0, nullable: false })
    jwt_version: number;

    @Column({
        type: 'varchar', length: 32, nullable: false, transformer: {
            to: (value: string) => encrypt_personalized_key(value),
            from: (value: string) => decrypt_personalized_key(value)
        }
    })
    personalized_secret: string;

    @Field(() => String)
    @Column({ type: "uuid" })
    settings_id: string;

    @Field(() => UserSetting)
    @OneToOne(type => UserSetting, us => us.user)
    @JoinColumn({name: 'settings_id'})
    settings: UserSetting;

    @Field(() => [Role])
    @ManyToMany(type => Role, r => r.users)
    @JoinTable({ name: 'user_roles', inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }, joinColumn: { name: 'role_id', referencedColumnName: 'id' } })
    roles: Role[];

    @Field(() => [Permission])
    @ManyToMany(type => Permission, p => p.users)
    @JoinTable({ name: 'user_permissions', inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' }, joinColumn: { name: 'user_id', referencedColumnName: 'id' } })
    permissions: Permission[];

    @Field(() => [Ticket])
    @OneToMany(type => Ticket, t => t.responsible_user)
    ticket_responsibilities: Ticket[];

    @Field(() => [TicketTemplate])
    @OneToMany(type => TicketTemplate, tt => tt.responsible_user)
    template_responsibilities: TicketTemplate[];

    @Field(() => [TicketHistory])
    @OneToMany(type => TicketHistory, th => th.responsible_user)
    history_responsibilities: TicketHistory[];

    @Field(() => [TicketComment])
    @OneToMany(type => TicketComment, tc => tc.creator)
    ticket_comment_responsibilities: TicketComment[];

    @Field(() => [Ticket])
    @OneToMany(type => Ticket, t => t.issuer)
    issued: Ticket[];

    @Field()
    @Column({ type: "uuid" })
    department_id: string;

    @Field(() => Department)
    @ManyToOne(type => Department, d => d.users)
    @JoinColumn({ name: 'department_id' })
    department: Department;

    @Field(() => [ApiKey], { nullable: true })
    @OneToMany(type => ApiKey, ak => ak.owner)
    api_keys: ApiKey[];

    @BeforeInsert()
    private generateJwtSecret() {
        this.jwt_secret = generate_random_secret(128);
    }

    @BeforeInsert()
    private generatePersonalizedSecret() {
        this.personalized_secret = randomBytes(8).toString('hex');
    }

    @BeforeInsert()
    private async generateDefaultSettings() {
        const us = new UserSetting();
        const usin = await UserSetting.insert(us);
        this.settings_id = usin.identifiers[0].id;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private define_key_insert_update() {
        key = this.personalized_secret;
    }

    @AfterInsert()
    private async add_user() {
        await helper.add(this);
    }
    @AfterUpdate()
    private async update_user() {
        await helper.update(this);
    }

    @BeforeRemove()
    private async remove_user() {
        await helper.remove(this.id);
    }

    /*
     * Is only executed on direct find*
     * use await User.findOne(id) for relationships! 
     */
    @AfterLoad()
    private decrypt_data() {
        key = this.personalized_secret;
        this.username = decrypt_personalized_data(this.username, key);
        this.displayName = decrypt_personalized_data(this.displayName, key);
        this.mail = decrypt_personalized_data(this.mail, key);
        this.phoneNumber = decrypt_personalized_data(this.phoneNumber, key);
    }
}