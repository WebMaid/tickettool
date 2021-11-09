import { Field, InputType, ObjectType } from "type-graphql";
import { Filter } from ".";
import { TicketFilter } from "./TicketFilter";
import { IdFilter } from "./types/id/IdFilter";

@InputType()
@ObjectType()
export class TicketGroupFilter extends Filter {
  @Field(() => [IdFilter], { defaultValue: [], nullable: true })
  id?: IdFilter[];
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  owner?: TicketFilter;
  @Field(() => TicketFilter, { defaultValue: null, nullable: true })
  members?: TicketFilter;
}
