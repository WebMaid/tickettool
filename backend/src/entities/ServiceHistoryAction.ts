import { Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServiceHistoryActionEnum } from "../enums/ServiceHistoryActionEnum";
import { ServiceHistory } from "./ServiceHistory";

@Entity()
export class ServiceHistoryAction extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => ServiceHistoryActionEnum)
    @Column({type: "enum", enum: ServiceHistoryActionEnum, default: null, nullable: true})
    type: ServiceHistoryActionEnum;

    @Field(() => String)
    @Column()
    value1: string;

    @Field(() => String)
    @Column()
    value2: string;

    @Field(() => String)
    @Column()
    value3: string;

    @Field(() => [ServiceHistory])
    @OneToMany(type => ServiceHistory, th => th.action)
    histories: ServiceHistory[];
}