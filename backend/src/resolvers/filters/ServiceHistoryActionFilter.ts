import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { ServiceHistoryFilter } from "./ServiceHistoryFilter";
import { EnumFilter } from "./types/enum/EnumFilter";
import { IdFilter } from "./types/id/IdFilter";
import { NullableStringFilter } from "./types/string/StringFilter";

@InputType()
@ObjectType()
export class ServiceHistoryActionFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [EnumFilter], { defaultValue: [], nullable: true })
  type?: EnumFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  value1?: NullableStringFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  value2?: NullableStringFilter[];
  @Field(() => [NullableStringFilter], { defaultValue: [], nullable: true })
  value3?: NullableStringFilter[];
  @Field(() => ServiceHistoryFilter, { defaultValue: null, nullable: true })
  histories?: ServiceHistoryFilter;
}
