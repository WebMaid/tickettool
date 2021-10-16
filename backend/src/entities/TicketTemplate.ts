import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TicketTypeEnum } from "../enums/TicketTypeEnum";
import { Department } from "./Department";
import { Service } from "./Service";
import { TicketGroup } from "./TicketGroup";
import { User } from "./User";

@ObjectType()
@Entity()
export class TicketTemplate extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ default: null })
    short_description: string;

    @Field()
    @Column({ default: null })
    description: string;

    @Field(() => String)
    @Column({ type: "enum", enum: TicketTypeEnum, default: null })
    type: TicketTypeEnum;

    @Field(() => Boolean)
    @Column({ default: false })
    create_group: boolean;

    @Field()
    @Column({ type: "uuid", default: null })
    responsible_user_id: string;

    @Field(() => User)
    @ManyToOne(type => User, u => u.template_responsibilities)
    @JoinColumn({ name: 'responsible_user_id' })
    responsible_user: User;

    @Field()
    @Column({ type: "uuid", default: null })
    responsible_department_id: string;

    @Field(() => Department)
    @ManyToOne(type => Department, u => u.template_responsibilities)
    @JoinColumn({ name: 'responsible_department_id' })
    responsible_department: Department;

    @Field(() => ID)
    @Column({ type: "uuid", nullable: true, default: null })
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

    @Field()
    @Column({ type: "uuid", nullable: true, default: null })
    group_id: string;

    @Field(() => TicketGroup)
    @ManyToOne(type => TicketGroup, tg => tg.members)
    @JoinColumn({ name: 'group_id' })
    group: TicketGroup;
}