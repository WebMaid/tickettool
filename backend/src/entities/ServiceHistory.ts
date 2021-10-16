import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./Service";
import { ServiceHistoryAction } from "./ServiceHistoryAction";
import { User } from "./User";

@ObjectType()
@Entity()
export class ServiceHistory extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: "uuid" })
    responsible_user_id: string;

    @Field(() => User)
    @ManyToOne(type => User, u => u.history_responsibilities)
    @JoinColumn({ name: 'responsible_user_id' })
    responsible_user: User;

    @Field()
    @Column({ type: "uuid" })
    action_id: string;

    @Field(() => ServiceHistoryAction)
    @ManyToOne(type => ServiceHistoryAction, sha => sha.histories)
    @JoinColumn({ name: 'action_id' })
    action: ServiceHistoryAction;

    @Field()
    @Column({ type: "uuid" })
    service_id: string;

    @Field(() => Service)
    @ManyToOne(type => Service, s => s.histories)
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;
}