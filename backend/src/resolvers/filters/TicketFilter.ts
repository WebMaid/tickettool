import { Field, InputType, ObjectType } from "type-graphql";
import { DepartmentFilter } from "./DepartmentFilter";
import { ServiceFilter } from "./ServiceFilter";
import { TicketGroupFilter } from "./TicketGroupFilter";
import { UserFilter } from "./UserFilter";
import { IdFilter } from "./types/id/IdFilter";
import { StringFilter } from "./types/string/StringFilter";
import { EnumFilter } from "./types/enum/EnumFilter";
import { DateFilter, NullableDateFilter } from "./types/date/DateFilter";
import { Filter } from ".";

@InputType()
@ObjectType()
export class TicketFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  ticket_id?: StringFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  short_description?: StringFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  description?: StringFilter[];
  @Field(() => [EnumFilter], { defaultValue: [], nullable: true })
  type?: EnumFilter[];
  @Field(() => [EnumFilter], { defaultValue: [], nullable: true })
  status?: EnumFilter[];
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  responsible_user?: UserFilter;
  @Field(() => DepartmentFilter, { defaultValue: null, nullable: true })
  responsible_department?: DepartmentFilter;
  @Field(() => DepartmentFilter, { defaultValue: null, nullable: true })
  previous_responsible_department?: DepartmentFilter;
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  issuer?: UserFilter;
  @Field(() => DepartmentFilter, { defaultValue: null, nullable: true })
  issuer_department?: DepartmentFilter;
  @Field(() => ServiceFilter, { defaultValue: null, nullable: true })
  service?: ServiceFilter;
  @Field(() => TicketGroupFilter, { defaultValue: null, nullable: true })
  group?: TicketGroupFilter;
  @Field(() => TicketGroupFilter, { defaultValue: null, nullable: true })
  owner_group?: TicketGroupFilter;
  @Field(() => [DateFilter], { defaultValue: [], nullable: true })
  created_at?: DateFilter[];
  @Field(() => [DateFilter], { defaultValue: [], nullable: true })
  updated_at?: DateFilter[];
  @Field(() => [NullableDateFilter], { defaultValue: [], nullable: true })
  closed_at?: NullableDateFilter[];
}
