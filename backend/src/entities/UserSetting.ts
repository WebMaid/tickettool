import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";
import { WebsiteThemeEnum } from "../enums/WebsiteThemeEnum";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserSetting extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Boolean)
    @Column({type: 'boolean', default: true})
    public_profile: boolean;

    @Field(() => String)
    @Column({ type: "enum", enum: WebsiteThemeEnum, default: WebsiteThemeEnum.DARK_DIMMED, nullable: false })
    day_theme: WebsiteThemeEnum;

    @Field(() => String)
    @Column({ type: "enum", enum: WebsiteThemeEnum, default: WebsiteThemeEnum.DARK, nullable: false })
    night_theme: WebsiteThemeEnum;

    @Field(() => [String])
    @Column({ type: "enum", enum: NotificationTypeEnum, array: true, default: `{${NotificationTypeEnum.MAIL}, ${NotificationTypeEnum.WEB}}` })
    notification_assign_ticket: NotificationTypeEnum[];

    @Field(() => [String])
    @Column({ type: "enum", enum: NotificationTypeEnum, array: true, default: `{${NotificationTypeEnum.MAIL}, ${NotificationTypeEnum.WEB}}` })
    notification_assigned_ticket_change: NotificationTypeEnum[];

    @Field(() => [String])
    @Column({ type: "enum", enum: NotificationTypeEnum, array: true, default: `{${NotificationTypeEnum.MAIL}, ${NotificationTypeEnum.WEB}}` })
    notification_watching_ticket_change: NotificationTypeEnum[];

    @Field(() => User)
    @OneToOne(type => User, u => u.settings)
    user: User;
}