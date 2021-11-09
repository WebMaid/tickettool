import { Field, InputType, ObjectType } from "type-graphql";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class UserSettingInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  public_profile?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  day_theme?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  night_theme?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  notification_assign_ticket?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  notification_assigned_ticket_change?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  notification_watching_ticket_change?: boolean;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  user?: UserInclude;
}
