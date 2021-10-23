import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ticket } from "./Ticket";
@ObjectType()
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
