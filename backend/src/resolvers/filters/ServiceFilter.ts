import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { ServiceHistoryFilter } from "./ServiceHistoryFilter";
import { TicketFilter } from "./TicketFilter";
import { IdFilter } from "./types/id/IdFilter";
import { StringFilter } from "./types/string/StringFilter";

@InputType()
@ObjectType()
export class ServiceFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  service_id?: StringFilter[];
  @Field(() => [StringFilter], { defaultValue: [], nullable: true })
  name?: StringFilter[];
  @Field(() => ServiceHistoryFilter, { defaultValue: null, nullable: true })
  histories?: ServiceHistoryFilter;
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  tickets?: TicketFilter;
}
