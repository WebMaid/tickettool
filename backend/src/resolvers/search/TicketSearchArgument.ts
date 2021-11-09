import { Field, InputType } from "type-graphql";
import { TicketInclude } from "./includes/TicketInclude";

@InputType()
export class TicketSearchArgument {
  @Field()
  value: string;
  @Field(() => TicketInclude, { nullable: true, defaultValue: null })
  include: TicketInclude;
}
