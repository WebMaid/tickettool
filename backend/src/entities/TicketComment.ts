import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
@ObjectType()
@Entity()
export class TicketComment extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    content: string;

    @Field()
    @Column({ type: "uuid" })
    creator_id: string;

    @Field(() => User)
    @ManyToOne(type => User, u => u.ticket_comment_responsibilities)
    @JoinColumn({ name: 'creator_id' })
    creator: User;

    @Field(() => Date)
    @CreateDateColumn()
    created_at: Date;
}