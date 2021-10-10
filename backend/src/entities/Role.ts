import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./Department";
import { Permission } from "./Permission";
import { User } from "./User";

@ObjectType()
@Entity()
export class Role extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({type: 'text', nullable: false, unique: true})
    name: string;

    @Field(() => [User])
    @ManyToMany(type => User, u => u.roles)
    @JoinTable({name: 'user_roles', joinColumn: {name: 'user_id', referencedColumnName: 'id'}, inverseJoinColumn: {name: 'role_id', referencedColumnName: 'id'}})
    users: User[];

    @Field(() => [Permission])
    @ManyToMany(type => Permission, p => p.roles)
    @JoinTable({name: 'role_permissions', inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}, joinColumn: {name: 'role_id', referencedColumnName: 'id'}})
    permissions: Permission[];

    @Field(() => [Department])
    @ManyToMany(type => Department, r => r.users)
    @JoinTable({name: 'department_roles', joinColumn: {name: 'department_id', referencedColumnName: 'id'}, inverseJoinColumn: {name: 'role_id', referencedColumnName: 'id'}})
    departments: Department[];
}