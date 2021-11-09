import { Field, InputType, ObjectType } from "type-graphql";
import { DepartmentInclude } from "./DepartmentInclude";
import { ServiceInclude } from "./ServiceInclude";
import { TicketGroupInclude } from "./TicketGroupInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class TicketInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  ticket_id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  short_description?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  description?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  type?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  status?: boolean;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  responsible_user?: UserInclude;
  @Field(() => DepartmentInclude, { defaultValue: null, nullable: true })
  responsible_department?: DepartmentInclude;
  @Field(() => DepartmentInclude, { defaultValue: null, nullable: true })
  previous_responsible_department?: DepartmentInclude;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  issuer?: UserInclude;
  @Field(() => DepartmentInclude, { defaultValue: null, nullable: true })
  issuer_department?: DepartmentInclude;
  @Field(() => ServiceInclude, { defaultValue: null, nullable: true })
  service?: ServiceInclude;
  @Field(() => TicketGroupInclude, { defaultValue: null, nullable: true })
  group?: TicketGroupInclude;
  @Field(() => TicketGroupInclude, { defaultValue: null, nullable: true })
  owner_group?: TicketGroupInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  created_at?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  updated_at?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  closed_at?: boolean;
}
