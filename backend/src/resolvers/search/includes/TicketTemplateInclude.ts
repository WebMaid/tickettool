import { Field, InputType, ObjectType } from "type-graphql";
import { DepartmentInclude } from "./DepartmentInclude";
import { ServiceInclude } from "./ServiceInclude";
import { TicketGroupInclude } from "./TicketGroupInclude";
import { UserInclude } from "./UserInclude";

@InputType()
@ObjectType()
export class TicketTemplateInclude {
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  id?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  short_description?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  description?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  type?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  create_group?: boolean;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  responsible_user_id?: boolean;
  @Field(() => UserInclude, { defaultValue: null, nullable: true })
  responsible_user?: UserInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  responsible_department_id?: boolean;
  @Field(() => DepartmentInclude, { defaultValue: null, nullable: true })
  responsible_department?: DepartmentInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  issuer_department_id?: boolean;
  @Field(() => DepartmentInclude, { defaultValue: null, nullable: true })
  issuer_department?: DepartmentInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  service_id?: boolean;
  @Field(() => ServiceInclude, { defaultValue: null, nullable: true })
  service?: ServiceInclude;
  @Field(() => Boolean, { defaultValue: false, nullable: true })
  group_id?: boolean;
  @Field(() => TicketGroupInclude, { defaultValue: null, nullable: true })
  group?: TicketGroupInclude;
}
