import { Field, InputType, ObjectType } from "type-graphql";
import { RoleFilter } from "./RoleFilter";
import { TicketFilter } from "./TicketFilter";
import { TicketHistoryFilter } from "./TicketHistoryFilter";
import { TicketTemplateFilter } from "./TicketTemplateFilter";
import { UserFilter } from "./UserFilter";
import { IdFilter } from "./types/id/IdFilter";
import { StringFilter } from "./types/string/StringFilter";
import { Filter } from ".";

@InputType()
@ObjectType()
export class DepartmentFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  name?: StringFilter[];
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  users?: UserFilter;
  @Field(() => RoleFilter, { defaultValue: null, nullable: true })
  roles?: RoleFilter;
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  ticket_responsiblities?: TicketFilter;
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  previous_ticket_responsibilities?: TicketFilter;
  @Field(() => TicketTemplateFilter, { defaultValue: null, nullable: true })
  template_responsibilities?: TicketTemplateFilter;
  @Field(() => TicketHistoryFilter, { defaultValue: null, nullable: true })
  history_responsibilities?: TicketHistoryFilter;
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  issued?: TicketFilter;
}
