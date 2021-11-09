import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { DepartmentFilter } from "./DepartmentFilter";
import { TicketFilter } from "./TicketFilter";
import { TicketHistoryActionFilter } from "./TicketHistoryActionFilter";
import { DateFilter } from "./types/date/DateFilter";
import { IdFilter } from "./types/id/IdFilter";
import { UserFilter } from "./UserFilter";

@InputType()
@ObjectType()
export class TicketHistoryFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  responsible_user?: UserFilter;
  @Field(() => DepartmentFilter, { defaultValue: null, nullable: true })
  responsible_department?: DepartmentFilter;
  @Field(() => TicketHistoryActionFilter, {
    defaultValue: null,
    nullable: true,
  })
  actions?: TicketHistoryActionFilter;
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  ticket?: TicketFilter;
  @Field(() => [DateFilter], { defaultValue: [], nullable: true })
  created_at?: DateFilter[];
}
