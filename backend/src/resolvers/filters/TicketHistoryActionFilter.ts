import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { TicketHistoryFilter } from "./TicketHistoryFilter";
import { NullableEnumFilter } from "./types/enum/EnumFilter";
import { IdFilter } from "./types/id/IdFilter";
import { NullableStringFilter } from "./types/string/StringFilter";

@InputType()
@ObjectType()
export class TicketHistoryActionFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [NullableEnumFilter], { defaultValue: [], nullable: true })
  type?: NullableEnumFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  value1?: NullableStringFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  value2?: NullableStringFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  value3?: NullableStringFilter[];
  @Field(() => TicketHistoryFilter, { defaultValue: null, nullable: true })
  history?: TicketHistoryFilter;
}
