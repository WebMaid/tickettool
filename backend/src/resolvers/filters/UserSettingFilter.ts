import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { BooleanFilter } from "./types/boolean/BooleanFilter";
import { EnumArrayFilter, EnumFilter } from "./types/enum/EnumFilter";
import { IdFilter } from "./types/id/IdFilter";
import { UserFilter } from "./UserFilter";

@InputType()
@ObjectType()
export class UserSettingFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [BooleanFilter], { defaultValue: [], nullable: true })
  public_profile?: BooleanFilter[];
  @Field(() => [EnumFilter], { defaultValue: [], nullable: true })
  day_theme?: EnumFilter[];
  @Field(() => [EnumFilter], { defaultValue: [], nullable: true })
  night_theme?: EnumFilter[];
  @Field(() => [EnumArrayFilter], { defaultValue: [], nullable: true })
  notification_assign_ticket?: EnumArrayFilter[];
  @Field(() => [EnumArrayFilter], { defaultValue: [], nullable: true })
  notification_assigned_ticket_change?: EnumArrayFilter[];
  @Field(() => [EnumArrayFilter], { defaultValue: [], nullable: true })
  notification_watching_ticket_change?: EnumArrayFilter[];
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  user?: UserFilter;
}
