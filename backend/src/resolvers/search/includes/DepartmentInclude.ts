import { Field, InputType, ObjectType } from "type-graphql";
import { RoleInclude } from "./RoleInclude";
import { TicketHistoryInclude } from "./TicketHistoryInclude";
import { TicketInclude } from "./TicketInclude";
import { TicketTemplateInclude } from "./TicketTemplateInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class DepartmentInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  name?: boolean;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  users?: UserInclude;
  @Field(() => RoleInclude, { defaultValue: null, nullable: true })
  roles?: RoleInclude;
  @Field(() => TicketInclude, { defaultValue: null, nullable: true })
  ticket_responsibilities?: TicketInclude;
  @Field(() => TicketInclude, { defaultValue: null, nullable: true })
  previous_ticket_responsibilities?: TicketInclude;
  @Field(() => TicketTemplateInclude, { defaultValue: null, nullable: true })
  template_responsibilities?: TicketTemplateInclude;
  @Field(() => TicketHistoryInclude, { defaultValue: null, nullable: true })
  history_responsiblities?: TicketHistoryInclude;
  @Field(() => TicketInclude, { defaultValue: null, nullable: true })
  issued?: TicketInclude;
}
