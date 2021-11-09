import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { DepartmentFilter } from "./DepartmentFilter";
import { PermissionFilter } from "./PermissionFilter";
import { RoleFilter } from "./RoleFilter";
import { ServiceHistoryFilter } from "./ServiceHistoryFilter";
import { TicketCommentFilter } from "./TicketCommentFilter";
import { TicketFilter } from "./TicketFilter";
import { TicketHistoryFilter } from "./TicketHistoryFilter";
import { TicketTemplateFilter } from "./TicketTemplateFilter";
import { IdFilter } from "./types/id/IdFilter";
import {
  NullableStringFilter,
  StringFilter,
} from "./types/string/StringFilter";
import { UserSettingFilter } from "./UserSettingFilter";

@InputType()
@ObjectType()
export class UserFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  username?: StringFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  displayName?: NullableStringFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  mail?: StringFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  phoneNumber?: NullableStringFilter[];
  @Field(() => UserSettingFilter, { defaultValue: null, nullable: true })
  settings?: UserSettingFilter;
  @Field(() => RoleFilter, { defaultValue: null, nullable: true })
  roles?: RoleFilter;
  @Field(() => PermissionFilter, { defaultValue: null, nullable: true })
  permissions?: PermissionFilter;
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  ticket_responsibilities?: TicketFilter;
  @Field(() => TicketTemplateFilter, { defaultValue: null, nullable: true })
  template_responsibilities?: TicketTemplateFilter;
  @Field(() => TicketHistoryFilter, { defaultValue: null, nullable: true })
  ticket_history_responsibilities?: TicketHistoryFilter;
  @Field(() => ServiceHistoryFilter, { defaultValue: null, nullable: true })
  service_history_responsibilities?: ServiceHistoryFilter;
  @Field(() => TicketCommentFilter, { defaultValue: null, nullable: true })
  ticket_comment_responsibilities?: TicketCommentFilter;
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  issued?: TicketFilter;
  @Field(() => DepartmentFilter, { defaultValue: null, nullable: true })
  department?: DepartmentFilter;
}
