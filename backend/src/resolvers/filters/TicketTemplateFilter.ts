import { Field, InputType, ObjectType } from "type-graphql";
import { DepartmentFilter } from "./DepartmentFilter";
import { ServiceFilter } from "./ServiceFilter";
import { TicketGroupFilter } from "./TicketGroupFilter";
import { UserFilter } from "./UserFilter";
import { IdFilter } from "./types/id/IdFilter";
import { NullableStringFilter } from "./types/string/StringFilter";
import { NullableEnumFilter } from "./types/enum/EnumFilter";
import { BooleanFilter } from "./types/boolean/BooleanFilter";
import { Filter } from ".";

@InputType()
@ObjectType()
export class TicketTemplateFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  short_description?: NullableStringFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  description?: NullableStringFilter[];
  @Field(() => [NullableEnumFilter], { defaultValue: [], nullable: true })
  type?: NullableEnumFilter[];
  @Field(() => [BooleanFilter], { defaultValue: [], nullable: true })
  create_group?: BooleanFilter[];
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  responsible_user?: UserFilter;
  @Field(() => DepartmentFilter, { defaultValue: null, nullable: true })
  responsible_department?: DepartmentFilter;
  @Field(() => UserFilter, { defaultValue: null, nullable: true })
  issuer_department?: UserFilter;
  @Field(() => ServiceFilter, { defaultValue: null, nullable: true })
  service?: ServiceFilter;
  @Field(() => TicketGroupFilter, { defaultValue: null, nullable: true })
  group?: TicketGroupFilter;
}
