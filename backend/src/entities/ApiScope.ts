import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiKey } from "./ApiKey";
import { ApiScopeCategory } from "./ApiScopeCategory";
@ObjectType()
@Entity()
export class ApiScope extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @ManyToMany(type => ApiKey, ak => ak.scopes)
    @JoinTable({ name: 'api_key_scope', inverseJoinColumn: { name: 'scope_id', referencedColumnName: 'id' }, joinColumn: { name: 'key_id', referencedColumnName: 'id' } })
    keys: ApiKey[];

    @Field(() => ID, {nullable: true, defaultValue: null})
    @Column({type: 'uuid'})
    category_id: string;

    @Field(() => [ApiScopeCategory], {nullable: true, defaultValue: null})
    @ManyToOne(type => ApiScopeCategory, asc => asc.scopes)
    @JoinColumn({name: "category_id"})
    category: ApiScopeCategory[];
}