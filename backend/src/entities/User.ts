import { createSecretKey, randomBytes } from "crypto";
import { Field, ObjectType } from "type-graphql";
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { generate_random_secret, hash_password } from "../auth/auth";
import { PersonalizedEncryption } from "../auth/encryption/PersonalizedEncryption";
import { ApiKey } from "./ApiKey";
import { Department } from "./Department";
import { Permission } from "./Permission";
import { Role } from "./Role";
import { ServiceHistory } from "./ServiceHistory";
import { Ticket } from "./Ticket";
import { TicketComment } from "./TicketComment";
import { TicketHistory } from "./TicketHistory";
import { TicketTemplate } from "./TicketTemplate";
import { UserSetting } from "./UserSetting";

let key = "";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  constructor(
    username: string,
    displayName: string,
    mail: string,
    password: string,
    department_id: string,
    phoneNumber?: string
  ) {
    super();
    this.username = username;
    this.displayName = displayName;
    this.mail = mail;
    this.password = hash_password(password ?? "");
    this.department_id = department_id;
    this.phoneNumber = phoneNumber ?? null;
  }

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({
    type: "varchar",
    length: 32,
    nullable: true,
    transformer: {
      // original 32
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value,
    },
  })
  username: string;

  @Field()
  @Column({
    type: "varchar",
    length: 64,
    nullable: true,
  })
  displayName: string;

  @Field()
  @Column({
    type: "varchar",
    length: 64,
    nullable: false,
    unique: true,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value,
    },
  })
  mail: string;

  @Column({
    type: "varchar",
    length: 256,
    nullable: false,
  })
  password: string;

  @Field()
  @Column({
    type: "varchar",
    length: 24,
    nullable: true,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: "varchar",
    length: 128,
    nullable: true,
  })
  two_factor_secret: string;

  @Column("int", { default: 0, nullable: false })
  jwt_version: number;

  @Field(() => String)
  @Column({ type: "uuid" })
  settings_id: string;

  @Field(() => UserSetting)
  @OneToOne((type) => UserSetting, (us) => us.user)
  @JoinColumn({ name: "settings_id" })
  settings: UserSetting;

  @Field(() => [Role])
  @ManyToMany((type) => Role, (r) => r.users)
  @JoinTable({
    name: "user_roles",
    inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
    joinColumn: { name: "role_id", referencedColumnName: "id" },
  })
  roles: Role[];

  @Field(() => [Permission])
  @ManyToMany((type) => Permission, (p) => p.users)
  @JoinTable({
    name: "user_permissions",
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" },
    joinColumn: { name: "user_id", referencedColumnName: "id" },
  })
  permissions: Permission[];

  @Field(() => [Ticket])
  @OneToMany((type) => Ticket, (t) => t.responsible_user)
  ticket_responsibilities: Ticket[];

  @Field(() => [TicketTemplate])
  @OneToMany((type) => TicketTemplate, (tt) => tt.responsible_user)
  template_responsibilities: TicketTemplate[];

  @Field(() => [TicketHistory])
  @OneToMany((type) => TicketHistory, (th) => th.responsible_user)
  ticket_history_responsibilities: TicketHistory[];

  @Field(() => [ServiceHistory])
  @OneToMany((type) => ServiceHistory, (th) => th.responsible_user)
  service_history_responsibilities: ServiceHistory[];

  @Field(() => [TicketComment])
  @OneToMany((type) => TicketComment, (tc) => tc.creator)
  ticket_comment_responsibilities: TicketComment[];

  @Field(() => [Ticket])
  @OneToMany((type) => Ticket, (t) => t.issuer)
  issued: Ticket[];

  @Field()
  @Column({ type: "uuid" })
  department_id: string;

  @Field(() => Department)
  @ManyToOne((type) => Department, (d) => d.users)
  @JoinColumn({ name: "department_id" })
  department: Department;

  @Field(() => [ApiKey], { nullable: true })
  @OneToMany((type) => ApiKey, (ak) => ak.owner)
  api_keys: ApiKey[];

  @BeforeInsert()
  private async generateDefaultSettings() {
    const us = new UserSetting();
    const usin = await UserSetting.insert(us);
    this.settings_id = usin.identifiers[0].id;
  }

  static async exists(id: string): Promise<boolean> {
    return (await User.findOne(id)) != null;
  }
}
