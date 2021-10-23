import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiScope } from "./ApiScope";
@ObjectType()
@Entity()
export class ApiScopeCategory extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field(() => [ApiScope])
    @OneToMany(type => ApiScope, as => as.category)
    scopes: ApiScope[];
}