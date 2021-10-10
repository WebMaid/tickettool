import { Field } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { User } from "./User";

@Entity()
export class Permission extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({type: 'text', nullable: false, unique: true})
    name: string;

    @Field(() => [Role])
    @ManyToMany(type => Role, r => r.permissions)
    @JoinTable({name: 'role_permissions', joinColumn: {name: 'permission_id', referencedColumnName: 'id'}, inverseJoinColumn: {name: 'role_id', referencedColumnName: 'id'}})
    roles: Role[];
    
    @Field(() => [User])
    @ManyToMany(type => User, u => u.permissions)
    @JoinTable({name: 'user_permissions', joinColumn: {name: 'permission_id', referencedColumnName: 'id'}, inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}})
    users: User[];
}