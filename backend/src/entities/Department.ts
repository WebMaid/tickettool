import { Field } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";
import { Ticket } from "./Ticket";
import { TicketHistory } from "./TicketHistory";
import { User } from "./User";

@Entity()
export class Department extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({type: 'varchar', length: 16, nullable: false, unique: true})
    name: string;

    @Field(() => [User])
    @OneToMany(type => User, u => u.department)
    users: User[];

    @Field(() => [Role])
    @ManyToMany(type => Role, r => r.users)
    @JoinTable({name: 'department_roles', inverseJoinColumn: {name: 'department_id', referencedColumnName: 'id'}, joinColumn: {name: 'role_id', referencedColumnName: 'id'}})
    roles: Role[];

    @Field(() => [Ticket])
    @OneToMany(type => Ticket, t => t.responsible_department)
    ticket_responsibilities: Ticket[];

    @Field(() => [Ticket])
    @OneToMany(type => Ticket, t => t.previous_responsible_department)
    previous_ticket_responsibilities: Ticket[];

    @Field(() => [Ticket])
    @OneToMany(type => Ticket, t => t.responsible_department)
    template_responsibilities: Ticket[];

    @Field(() => [TicketHistory])
    @OneToMany(type => TicketHistory, t => t.responsible_department)
    history_responsibilities: TicketHistory[];

    @Field(() => [Ticket])
    @OneToMany(type => Ticket, t => t.issuer)
    issued: Ticket[];
}