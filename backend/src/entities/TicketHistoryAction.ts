import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TicketHistoryActionEnum } from "../enums/TicketHistoryActionEnum";
import { TicketHistory } from "./TicketHistory";

@ObjectType()
@Entity()
export class TicketHistoryAction extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column({type: "enum", enum: TicketHistoryActionEnum, default: null, nullable: true})
    type: TicketHistoryActionEnum;

    @Field(() => String)
    @Column({default: null, nullable: true})
    value1: string;

    @Field(() => String)
    @Column({default: null, nullable: true})
    value2: string;

    @Field(() => String)
    @Column({default: null, nullable: true})
    value3: string;

    @Field()
    @Column({type: "uuid"})
    history_id: string;

    @Field(() => TicketHistory)
    @ManyToOne(type => TicketHistory, th => th.actions)
    @JoinColumn({name: 'history_id'})
    history: TicketHistory;

    static async addToHistory(history: TicketHistory, type?: TicketHistoryActionEnum, param?: string, result_is_used?: boolean): Promise<TicketHistoryAction> {
        const used = result_is_used ?? true;
        const action = new TicketHistoryAction();
        if (type) {
            action.type = type;
            switch (type) {
                case TicketHistoryActionEnum.RETURN:    
                case TicketHistoryActionEnum.SEND_TO:
                case TicketHistoryActionEnum.SOLVE:
                case TicketHistoryActionEnum.GROUP_ADD:
                case TicketHistoryActionEnum.GROUP_REMOVE:
                    action.value2 = param;
                    break;
                case TicketHistoryActionEnum.CLOSE:
                case TicketHistoryActionEnum.REOPEN:
                    action.value1 = param;
                    break;
            }
        }
        action.history_id = history.id;
        const insert = await TicketHistoryAction.insert(action);
        if (used)
            return await TicketHistoryAction.findOne(insert.identifiers[0].id);
        else
            return null;
    }
}