import { Field, ID, ObjectType } from "type-graphql";
import { AfterInsert, AfterUpdate, BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TicketChangeParamEnum } from "../enums/TicketChangeParamEnum";
import { TicketHistoryActionEnum } from "../enums/TicketHistoryActionEnum";
import { TicketStatusEnum } from "../enums/TicketStatusEnum";
import { TicketTypeEnum } from "../enums/TicketTypeEnum";
import { add_ticket_count, ticket_count } from "../globals";
import { Department } from "./Department";
import { Service } from "./Service";
import { TicketGroup } from "./TicketGroup";
import { TicketHistory } from "./TicketHistory";
import { TicketHistoryAction } from "./TicketHistoryAction";
import { User } from "./User";

let last_ticket = null;

@ObjectType()
@Entity()
export class Ticket extends BaseEntity {

    constructor(short_description, description, type, responsible_user_id, responsible_department_id, issuer_id, issuer_department_id, service_id, group_id) {
        super()
        this.short_description = short_description;
        this.description = description;
        this.type = type;
        this.responsible_user_id = responsible_user_id;
        this.responsible_department_id = responsible_department_id;
        this.issuer_id = issuer_id;
        this.issuer_department_id = issuer_department_id;
        this.service_id = service_id;
        this.group_id = group_id;
    }

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column({ type: "varchar", length: 10, update: false, unique: true, nullable: false })
    ticket_id: string;

    @Field(() => String)
    @Column({ type: "varchar", length: 64, nullable: false })
    short_description: string;

    @Field()
    @Column({ type: "text", nullable: false })
    description: string;

    @Field(() => String)
    @Column({ type: "enum", enum: TicketTypeEnum, default: TicketTypeEnum.SERVICE_REQUEST, nullable: false })
    type: TicketTypeEnum;

    @Field(() => String)
    @Column({ type: "enum", enum: TicketStatusEnum, default: TicketStatusEnum.OPEN, nullable: false })
    status: TicketStatusEnum;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: true })
    responsible_user_id: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(type => User, u => u.ticket_responsibilities)
    @JoinColumn({ name: 'responsible_user_id' })
    responsible_user: User;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: false })
    responsible_department_id: string;

    @Field(() => Department)
    @ManyToOne(type => Department, u => u.ticket_responsibilities)
    @JoinColumn({ name: 'responsible_department_id' })
    responsible_department: Department;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: true, default: null })
    previous_responsible_department_id: string;

    @Field(() => Department)
    @ManyToOne(type => Department, u => u.previous_ticket_responsibilities, { nullable: true })
    @JoinColumn({ name: 'previous_responsible_department_id' })
    previous_responsible_department: Department;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: true, update: false })
    issuer_id: string;

    @Field(() => User, { nullable: true })
    @ManyToOne(type => User, u => u.issued)
    @JoinColumn({ name: 'issuer_id' })
    issuer: User;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: false, update: false })
    issuer_department_id: string;

    @Field(() => Department)
    @ManyToOne(type => Department, d => d.issued)
    @JoinColumn({ name: 'issuer_department_id' })
    issuer_department: Department;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: false })
    service_id: string;

    @Field(() => Service)
    @ManyToOne(type => Service, s => s.tickets)
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: true, default: null })
    group_id: string;

    @Field(() => TicketGroup, { nullable: true })
    @ManyToOne(type => TicketGroup, tg => tg.members)
    @JoinColumn({ name: 'group_id' })
    group: TicketGroup;

    @Field()
    @Column({ type: "uuid", default: null, nullable: true })
    owner_group_id: string;

    @Field(() => TicketGroup, { nullable: true })
    @OneToOne(type => TicketGroup, tg => tg.owner)
    @JoinColumn({ name: 'owner_group_id' })
    owner_group: TicketGroup;

    @Field(() => [TicketHistory])
    @OneToMany(type => TicketHistory, th => th.ticket)
    histories: TicketHistory[];

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updated_at: Date;

    @Field(() => Date, { nullable: true })
    @Column({ type: "timestamp", nullable: true, default: null })
    closed_at: Date;

    @BeforeInsert()
    generateNewTicketId() {
        const PREFIX = "TI-";
        add_ticket_count(1);
        let ticket_id = ticket_count.toString();
        while (ticket_id.length != 10 - PREFIX.length) {
            ticket_id = "0" + ticket_id;
        }
        this.ticket_id = PREFIX + ticket_id;
    }

    @AfterInsert()
    async generate_ticket_open_history_entry() {
        const history = await TicketHistory.generateFromTicket(this);
        await TicketHistoryAction.addToHistory(history, TicketHistoryActionEnum.OPEN, this.type, false);
    }

    @BeforeUpdate()
    private async define_last_ticket() {
        last_ticket = await Ticket.findOne(this.id);
        if (last_ticket.responsible_department_id != this.responsible_department_id) {
            this.previous_responsible_department_id = last_ticket.responsible_department_id;
        }
    }

    @AfterUpdate()
    private async add_history_action_entries() {
        const history = await TicketHistory.findOne({ where: { ticket_id: this.id }, order: { created_at: 'DESC' } });

        const actions = await TicketHistoryAction.find({ where: { history_id: history.id } });

        if (actions.length >= 1) {
            const action = actions[0];
            switch (action.type) {
                case TicketHistoryActionEnum.RETURN:
                case TicketHistoryActionEnum.SEND_TO:
                    const department = await Department.findOne(this.responsible_department_id)
                    action.value1 = department.name;
                    break;
                case TicketHistoryActionEnum.SOLVE:
                    action.value1 = "TODO ADD SOLVE STATUS"; // TODO: Add solve status
                    break;
                case TicketHistoryActionEnum.GROUP_ADD:
                case TicketHistoryActionEnum.GROUP_REMOVE:
                    const ticket = await Ticket.findOne({ where: { owner_group_id: this.group_id } })
                    action.value1 = ticket.ticket_id;
                    break;
            }
            await TicketHistoryAction.update(action.id, action);

        } else {
            let changed = false;
            if (this.short_description != last_ticket.short_description) {
                changed = true;
                await this.add_change_action_to_history(history, TicketChangeParamEnum.SHORT_DESCRIPTION, last_ticket.short_description, this.short_description);
            }
            if (this.description != last_ticket.description) {
                changed = true;
                await this.add_change_action_to_history(history, TicketChangeParamEnum.DESCRIPTION, last_ticket.description, this.description);
            }
            if (this.type != last_ticket.type) {
                changed = true;
                await this.add_change_action_to_history(history, TicketChangeParamEnum.TYPE, last_ticket.type, this.type);
            }
            if (this.status != last_ticket.status) {
                changed = true;
                await this.add_change_action_to_history(history, TicketChangeParamEnum.STATUS, last_ticket.status, this.status);
            }
            if (this.service_id != last_ticket.service_id) {
                changed = true;
                const last_service = await Service.findOne(last_ticket.service_id);
                const service = await Service.findOne(this.service_id);
                await this.add_change_action_to_history(history, TicketChangeParamEnum.SERVICE, service.service_id, last_service.service_id); // Todo: Add name to service
            }
        }
    }

    private async add_change_action_to_history(history: TicketHistory, column: string, old: string, current: string) {
        const id = await TicketHistoryAction.addToHistory(history);
        const action = await TicketHistoryAction.findOne(id);
        action.type = TicketHistoryActionEnum.CHANGE;
        action.value1 = column;
        action.value2 = old;
        action.value3 = current;
        await TicketHistoryAction.update(action.id, action);
    }

    // TODO: fix issue with constructor
    /*
        public static async fromTemplate(tt: TicketTemplate): Promise<Ticket> {
            const t = new Ticket();
            if (tt.short_description)
                t.short_description = tt.short_description;
            if (tt.description)
                t.description = tt.description;
            if (tt.type)
                t.type = tt.type;
            if (tt.create_group) {
                const insert = await TicketGroup.insert(new TicketGroup());
                t.owner_group_id = insert.identifiers[0].id;
            }
            if (tt.responsible_user_id)
                t.responsible_user_id = tt.responsible_user_id;
            if (tt.responsible_department_id)
                t.responsible_department_id = tt.responsible_department_id;
            if (tt.issuer_department)
                t.issuer_department_id = tt.issuer_department_id;
            if (tt.service_id)
                t.service_id = tt.service_id;
            if (tt.group_id)
                t.group_id = tt.group_id;
            return t;
        }
        */
}