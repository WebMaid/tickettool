import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiScopeEntityEnum } from "../enums/ApiScopeEntityEnum";
import { ApiScopeTypeEnum } from "../enums/ApiScopeTypeEnum";
import { ApiKey } from "./ApiKey";

@ObjectType()
@Entity()
export class ApiScope extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: "enum", enum: ApiScopeEntityEnum })
    entity: ApiScopeEntityEnum;

    @Field()
    @Column({ type: "enum", enum: ApiScopeTypeEnum })
    type: ApiScopeTypeEnum;

    @ManyToMany(type => ApiKey, ak => ak.scopes)
    @JoinTable({ name: 'api_key_scope', inverseJoinColumn: { name: 'scope_id', referencedColumnName: 'id' }, joinColumn: { name: 'key_id', referencedColumnName: 'id' } })
    keys: ApiKey[];
}