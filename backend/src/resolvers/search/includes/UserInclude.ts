import { Field, InputType, ObjectType } from "type-graphql";
import { DepartmentInclude } from "./DepartmentInclude";
import { PermissionInclude } from "./PermissionInclude";
import { RoleInclude } from "./RoleInclude";
import { TicketCommentInclude } from "./TicketCommentInclude";
import { TicketHistoryInclude } from "./TicketHistoryInclude";
import { TicketInclude } from "./TicketInclude";
import { TicketTemplateInclude } from "./TicketTemplateInclude";
import { UserSettingInclude } from "./UserSettingInclude";

@InputType()
@ObjectType()
export class UserInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  username?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  displayName?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  mail?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  phoneNumber?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  settings_id?: boolean;
  @Field(() => UserSettingInclude, { defaultValue: false, nullable: true })
  settings?: UserSettingInclude;
  @Field(() => RoleInclude, { defaultValue: false, nullable: true })
  roles?: RoleInclude;
  @Field(() => PermissionInclude, { defaultValue: false, nullable: true })
  permissions?: PermissionInclude;
  @Field(() => TicketInclude, { defaultValue: false, nullable: true })
  ticket_responsibilities?: TicketInclude;
  @Field(() => TicketTemplateInclude, { defaultValue: false, nullable: true })
  template_responsibilities?: TicketTemplateInclude;
  @Field(() => TicketHistoryInclude, { defaultValue: false, nullable: true })
  history_responsibilities?: TicketHistoryInclude;
  @Field(() => TicketCommentInclude, { defaultValue: false, nullable: true })
  ticket_comment_responsibilities?: TicketCommentInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  issued?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  department_id?: boolean;
  @Field(() => DepartmentInclude, { defaultValue: false, nullable: true })
  department?: DepartmentInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  api_keys?: boolean;
}
