import { Field, ID, ObjectType } from "type-graphql";
import { AfterUpdate, BaseEntity, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketHistoryActionEnum } from "../enums/TicketHistoryActionEnum";
import { Department } from "./Department";
import { Ticket } from "./Ticket";
import { TicketHistoryAction } from "./TicketHistoryAction";
import { User } from "./User";

@ObjectType()
@Entity()
export class TicketHistory extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({type: "uuid"})
    responsible_user_id: string;

    @Field(() => User)
    @ManyToOne(type => User, u => u.history_responsibilities)
    @JoinColumn({name: 'responsible_user_id'})
    responsible_user: User;

    @Field()
    @Column({type: "uuid"})
    responsible_department_id: string;

    @Field(() => Department)
    @ManyToOne(type => Department, u => u.history_responsibilities)
    @JoinColumn({name: 'responsible_department_id'})
    responsible_department: Department;
    
    @Field(() => [TicketHistoryAction])
    @OneToMany(type => TicketHistoryAction, tha => tha.history)
    actions: TicketHistoryAction[];

    @Field()
    @Column({type: "uuid"})
    ticket_id: string;
    
    @Field(() => Ticket)
    @ManyToOne(type => Ticket, s => s.histories)
    @JoinColumn({name: 'ticket_id'})
    ticket: Ticket;

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;

    public static async generateFromTicket(t: Ticket): Promise<TicketHistory> {
        const th = new TicketHistory();
        th.responsible_user_id = t.responsible_user_id;
        th.responsible_department_id = t.responsible_department_id;
        th.ticket_id = t.id;
        const ins = await TicketHistory.insert(th);
        return await TicketHistory.findOne(ins.identifiers[0].id);
    }
}