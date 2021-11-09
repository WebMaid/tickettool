import { Field, InputType, ObjectType } from "type-graphql";
import { DepartmentInclude } from "./DepartmentInclude";
import { TicketHistoryActionInclude } from "./TicketHistoryActionInclude";
import { TicketInclude } from "./TicketInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class TicketHistoryInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  responsible_user_id?: boolean;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  responsible_user?: UserInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  responsible_department_id?: boolean;
  @Field(() => DepartmentInclude, { defaultValue: null, nullable: true })
  responsible_department?: DepartmentInclude;
  @Field(() => TicketHistoryActionInclude, {
    defaultValue: null,
    nullable: true,
  })
  actions?: TicketHistoryActionInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  ticket_id?: boolean;
  @Field(() => TicketInclude, { defaultValue: null, nullable: true })
  ticket?: TicketInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  created_at?: boolean;
}
