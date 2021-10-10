import { Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";

@Entity()
export class TicketGroup extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Ticket)
    @OneToOne(type => Ticket, t => t.owner_group)
    owner: Ticket;

    @Field(() => [Ticket])
    @OneToMany(type => Ticket, t => t.group)
    members: Ticket[];
}
